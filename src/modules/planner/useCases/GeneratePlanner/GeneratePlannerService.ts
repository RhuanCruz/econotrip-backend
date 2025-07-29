import { Body, Post, Route, Tags, Security, OperationId } from 'tsoa';
import { injectable, inject } from 'inversify';

import { GeneratePlannerType } from './GeneratePlannerSchema';

import { AITravelEstimator, EstimativaViagem } from './AITravelEstimator';
import Config from '@src/config';
import ProviderTypes from '@common/providers/container/types';
import IGooglePlacesProvider from '@common/providers/GooglePlacesProvider/repositories/IGooglePlacesProvider';
import { GooglePlace } from '@common/providers/GooglePlacesProvider/responses/ISearchTouristPlacesResponse';

@injectable()
@Route('planners')
@Tags('Planner')
class GeneratePlannerService {
  constructor(
    @inject(ProviderTypes.GooglePlacesProvider)
    private googlePlacesProvider: IGooglePlacesProvider,
  ) {}

  @Post('/generate')
  @Security('BearerAuth')
  @OperationId('generate_planner')
  public async execute(@Body() data: GeneratePlannerType): Promise<EstimativaViagem> {
    // 1. Gerar estimativa de custos
    const estimator = new AITravelEstimator({
      apiKey: Config.openai.apiKey,
      provider: 'openai',
    });

    const response = await estimator.gerarEstimativa({
      destino: data.destination,
      estiloViagem: 'econômico',
      numerosPessoas: data.amountPeople ?? 1,
      origem: data.origin,
      inicio: data.start,
      duracao: data.duration,
    });

    // 2. Buscar pontos turísticos do destino via Google Places
    try {
      const placesResponse = await this.googlePlacesProvider.searchTouristPlaces({
        cityName: data.destination,
        language: 'pt',
      });

      // 3. Gerar itinerário baseado nos pontos turísticos encontrados
      const itinerario = this.generateItinerary(
        placesResponse.results,
        data.duration,
        data.start,
      );

      // 4. Adicionar itinerário à resposta
      response.itinerario_detalhado = itinerario;
    } catch (error) {
      console.error('Erro ao buscar pontos turísticos:', error);
      // Continue sem itinerário se houver erro na busca de pontos turísticos
    }

    return response;
  }

  private generateItinerary(places: GooglePlace[], duration: number, startDate: string): any[] {
    const itinerario = [];

    // Garantir pelo menos 2-3 atividades por dia
    const minActivitiesPerDay = 2;
    const maxActivitiesPerDay = 4;

    // Se não temos pontos turísticos suficientes, duplicar alguns para preencher os dias
    const allPlaces = [...places];

    // Calcular quantas atividades precisamos no total
    const totalNeededActivities = duration * minActivitiesPerDay;

    // Se não temos pontos suficientes, duplicar os existentes com variações
    while (allPlaces.length < totalNeededActivities && places.length > 0) {
      const originalPlace = places[allPlaces.length % places.length];
      allPlaces.push({
        ...originalPlace,
        place_id: `${originalPlace.place_id}-variation-${Math.floor(allPlaces.length / places.length)}`,
        name: `${originalPlace.name} (Visita Estendida)`,
        formatted_address: originalPlace.formatted_address,
      });
    }

    for (let day = 1; day <= duration; day += 1) {
      const dayDate = new Date(startDate);
      dayDate.setDate(dayDate.getDate() + (day - 1));

      // Distribuir pontos turísticos de forma mais equilibrada
      const activitiesForDay = Math.min(
        Math.max(minActivitiesPerDay, Math.floor(allPlaces.length / duration)),
        maxActivitiesPerDay,
      );

      const startIndex = (day - 1) * activitiesForDay;
      const endIndex = Math.min(startIndex + activitiesForDay, allPlaces.length);
      let dayPlaces = allPlaces.slice(startIndex, endIndex);

      // Se ainda não temos atividades suficientes para este dia, pegar das restantes
      if (dayPlaces.length < minActivitiesPerDay && day === duration) {
        const remainingPlaces = allPlaces.slice(endIndex);
        dayPlaces = [...dayPlaces, ...remainingPlaces];
      }

      // Se ainda não temos o mínimo, criar atividades genéricas
      while (dayPlaces.length < minActivitiesPerDay) {
        dayPlaces.push({
          place_id: `generic-${day}-${dayPlaces.length}`,
          name: `Exploração Local ${dayPlaces.length + 1}`,
          formatted_address: 'Endereço não disponível',
          rating: 4.0,
          types: ['point_of_interest'],
          geometry: {
            location: {
              lat: 0,
              lng: 0,
            },
          },
          price_level: 1,
        });
      }

      const atividades = dayPlaces.map((place, index) => ({
        horario: this.getActivityTime(index),
        nome_atividade: place.name,
        descricao: `Visita à ${place.name}`,
        duracao_estimada: '2-3 horas',
        custo_por_pessoa: this.estimateGooglePlaceCost(place.price_level),
        custo_total: this.estimateGooglePlaceCost(place.price_level) * 1, // Will be multiplied by number of people later
        categoria: 'turismo',
        nivel_prioridade: place.rating && place.rating > 4.0 ? 'imperdível' : 'recomendada',
        dicas: `Rating: ${place.rating || 'N/A'}/5`,
        endereco_aproximado: place.formatted_address || 'Endereço não disponível',
      }));

      itinerario.push({
        dia: day,
        data: dayDate.toISOString().split('T')[0],
        tema_do_dia: this.getDayTheme(dayPlaces),
        atividades: atividades.sort((a, b) => a.horario.localeCompare(b.horario)),
        transporte_do_dia: {
          meios_utilizados: ['transporte público', 'caminhada'],
          custo_total: 15,
          observacoes: 'Considere usar transporte público ou caminhar entre atrações próximas',
        },
        custo_total_dia: atividades.reduce((sum, atividade) => sum + atividade.custo_por_pessoa, 15),
        tempo_livre: '30-60 minutos entre atividades',
        observacoes_dia: `Dia focado em ${this.getDayTheme(dayPlaces).toLowerCase()}`,
      });
    }

    return itinerario;
  }

  private getActivityTime(index: number): string {
    const times = ['09:00', '10:30', '13:00', '14:30', '16:00', '17:30'];
    return times[index] || `${9 + Math.floor(index / 2)}:${index % 2 === 0 ? '00' : '30'}`;
  }

  private estimateGooglePlaceCost(priceLevel?: number): number {
    switch (priceLevel) {
    case 0:
      return 0; // Free
    case 1:
      return 15; // Inexpensive
    case 2:
      return 30; // Moderate
    case 3:
      return 50; // Expensive
    case 4:
      return 80; // Very Expensive
    default:
      return 25; // Default cost
    }
  }

  private getDayTheme(places: GooglePlace[]): string {
    if (places.length === 0) return 'Exploração livre';

    const types = places.flatMap((place) => place.types.map((type) => type.toLowerCase()));

    if (types.includes('museum') || types.includes('art_gallery')) return 'Cultura e História';
    if (types.includes('park') || types.includes('natural_feature')) return 'Natureza e Lazer';
    if (types.includes('tourist_attraction') || types.includes('point_of_interest')) return 'Pontos Turísticos';
    if (types.includes('restaurant') || types.includes('food')) return 'Gastronomia';
    if (types.includes('shopping_mall') || types.includes('store')) return 'Compras';

    return 'Descoberta local';
  }
}

export { GeneratePlannerService };
