import axios from 'axios';

interface DestinoDetalhado {
  cidade: string;
  dias: number;
  interesses?: string[];
}

interface TravelParams {
  destinos: DestinoDetalhado[];
  origem: string;
  inicio: string;
  duracao: number;
  numerosPessoas: number;
  estiloViagem: 'econômico' | 'médio' | 'luxo';
  interesses?: string[];
}

interface AIConfig {
  provider: 'openai' | 'claude';
  apiKey: string;
  model?: string;
}

export interface EstimativaViagem {
  resumo_viagem: {
    destino: string;
    origem: string;
    duracao_dias: number;
    numero_pessoas: number;
    periodo: string;
    estilo_viagem: string;
  };
  custos_estimados: {
    passagens_aereas: {
      valor_por_pessoa: number;
      valor_total: number;
      observacoes: string;
    };
    hospedagem: {
      valor_por_noite: number;
      total_noites: number;
      valor_total: number;
      tipo_acomodacao: string;
      observacoes: string;
    };
    alimentacao: {
      valor_por_pessoa_por_dia: number;
      valor_total: number;
      observacoes: string;
    };
    transporte_local: {
      valor_total: number;
      tipos_incluidos: string[];
      observacoes: string;
    };
    atividades_turismo: {
      valor_total: number;
      principais_atividades: string[];
      observacoes: string;
    };
    outros_gastos: {
      valor_total: number;
      itens_incluidos: string[];
      observacoes: string;
    };
  };
  resumo_financeiro: {
    custo_total_viagem: number;
    custo_por_pessoa: number;
    distribuicao_por_categoria: any;
    moeda: string;
  };
  dicas_economia: string[];
  dicas_otimizacao_tempo: string[];
  observacoes_importantes: string[];
  informacoes_praticas: any;
  itinerario_detalhado?: any[];
  data_estimativa: string;
}

export class AITravelEstimator {
  private aiConfig: AIConfig;

  private promptTemplate: string;

  constructor(aiConfig: AIConfig) {
    this.aiConfig = aiConfig;
    this.promptTemplate = this.createPromptTemplate();
  }

  private createPromptTemplate(): string {
    return `
Você é um especialista em planejamento de viagens e análise de custos. Sua tarefa é fornecer uma estimativa detalhada e realista dos custos de viagem, incluindo um itinerário dia a dia com atividades específicas e seus respectivos custos.

## Instruções:

Analise cuidadosamente as seguintes informações de entrada:
- **Destinos**: {destinos}
- **Origem**: {origem}  
- **Inicio da Viagem**: {inicio}
- **Duração Total (em dias)**: {duracao}
- **Número de pessoas**: {numerosPessoas}
- **Estilo de viagem**: {estiloViagem}
- **Interesses**: {interesses}

## Formatação de Datas:
- O campo "periodo" deve estar no formato: DD/MM/YYYY a DD/MM/YYYY
- Calcule a data de fim baseada na data de início + duração em dias

## Múltiplos Destinos:
- Considere os custos de transporte entre as cidades dos destinos
- Distribua os custos de hospedagem proporcionalmente aos dias em cada destino
- Adapte as atividades turísticas para cada cidade específica

## IMPORTANTE:
- Use valores REALISTAS baseados em dados atuais de mercado para {ano}
- Considere variações sazonais para o período especificado
- Adapte as estimativas ao perfil socioeconômico brasileiro
- Apresente valores em reais brasileiros (BRL)
- Considere que 1 EUR ≈ R$ 6,00, 1 USD ≈ R$ 5,50

## Formato de Resposta:

Forneça a estimativa EXCLUSIVAMENTE no seguinte formato JSON em português brasileiro:

{jsonSchema}

## Diretrizes Importantes:

1. **Precisão**: Use valores realistas baseados em dados atuais de mercado
2. **Detalhamento**: Inclua observações específicas para cada categoria
3. **Flexibilidade**: Considere variações sazonais e eventos especiais
4. **Moeda**: Apresente valores em reais brasileiros (BRL)
5. **Contexto**: Adapte as estimativas ao perfil socioeconômico brasileiro
6. **Transparência**: Mencione quando houver incertezas ou variações significativas

## Categorias de Custos:

- **Passagens Aéreas**: Considere classe econômica como padrão, ida e volta
- **Hospedagem**: Hotéis/hostels de acordo com o estilo escolhido
- **Alimentação**: Misture refeições em restaurantes locais e opções econômicas
- **Transporte Local**: Táxis, transporte público, transfers aeroporto
- **Atividades**: Principais pontos turísticos, tours, ingressos baseados nos interesses
- **Outros**: Seguro viagem, compras, emergências (5-10% do total)

Responda APENAS com o JSON solicitado, sem texto adicional.
`;
  }

  private getTipoAcomodacao(estiloViagem: string): string {
    switch (estiloViagem) {
    case 'luxo':
      return 'Hotel 4-5 estrelas';
    case 'médio':
      return 'Hotel 3 estrelas';
    default:
      return 'Hostel/Pousada';
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  private async callOpenAIWithRetry(prompt: string, attempt: number = 1): Promise<string> {
    const maxRetries = 3;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: this.aiConfig.model || 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: 'Você é um especialista em planejamento de viagens que gera estimativas detalhadas de custos em formato JSON.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.3,
          response_format: { type: 'json_object' },
        },
        {
          headers: {
            Authorization: `Bearer ${this.aiConfig.apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 60000, // 60 segundos de timeout
        },
      );

      return response.data.choices[0].message.content;
    } catch (error: any) {
      // Verificar se é erro 429 (Rate limit) ou 503 (Service unavailable)
      if ((error.response?.status === 429 || error.response?.status === 503) && attempt < maxRetries) {
        // Backoff exponencial: 2^attempt * 1000ms (1s, 2s, 4s)
        const waitTime = (2 ** attempt) * 1000;
        console.log(`⏳ Rate limit atingido (tentativa ${attempt}/${maxRetries}). Aguardando ${waitTime}ms...`);

        // Verificar se há header Retry-After
        const retryAfter = error.response?.headers['retry-after'];
        const finalWaitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : waitTime;

        await this.sleep(finalWaitTime);
        return this.callOpenAIWithRetry(prompt, attempt + 1);
      }

      // Se não for erro de rate limit ou esgotaram as tentativas
      console.error('❌ Erro na chamada OpenAI:', error.response?.data || error.message);

      if (error.response?.status === 429) {
        throw new Error('Rate limit da OpenAI atingido. Tente novamente em alguns minutos.');
      }

      throw new Error('Falha ao gerar estimativa com OpenAI');
    }
  }

  private async callOpenAI(prompt: string): Promise<string> {
    return this.callOpenAIWithRetry(prompt);
  }

  private buildPrompt(params: TravelParams): string {
    const ano = new Date().getFullYear();

    // Formatar destinos para o prompt
    const destinosFormatados = params.destinos
      .map((dest) => `${dest.cidade} (${dest.dias} dias)`)
      .join(', ');

    const jsonSchema = `
{
  "resumo_viagem": {
    "destino": "string",
    "origem": "string",
    "duracao_dias": number,
    "numero_pessoas": number,
    "periodo": "DD/MM/YYYY a DD/MM/YYYY",
    "estilo_viagem": "string"
  },
  "custos_estimados": {
    "passagens_aereas": {
      "valor_por_pessoa": number,
      "valor_total": number,
      "observacoes": "string"
    },
    "hospedagem": {
      "valor_por_noite": number,
      "total_noites": number,
      "valor_total": number,
      "tipo_acomodacao": "string",
      "observacoes": "string"
    },
    "alimentacao": {
      "valor_por_pessoa_por_dia": number,
      "valor_total": number,
      "observacoes": "string"
    },
    "transporte_local": {
      "valor_total": number,
      "tipos_incluidos": ["string"],
      "observacoes": "string"
    },
    "atividades_turismo": {
      "valor_total": number,
      "principais_atividades": ["string"],
      "observacoes": "string"
    },
    "outros_gastos": {
      "valor_total": number,
      "itens_incluidos": ["string"],
      "observacoes": "string"
    }
  },
  "resumo_financeiro": {
    "custo_total_viagem": number,
    "custo_por_pessoa": number,
    "distribuicao_por_categoria": {
      "passagens": number,
      "hospedagem": number,
      "alimentacao": number,
      "transporte_local": number,
      "atividades": number,
      "outros": number
    },
    "moeda": "string"
  },
  "dicas_economia": ["string"],
  "dicas_otimizacao_tempo": ["string"],
  "observacoes_importantes": ["string"],
  "informacoes_praticas": {
    "melhor_epoca_visitar": "string",
    "documentos_necessarios": ["string"],
    "fuso_horario": "string",
    "idioma_local": "string",
    "moeda_local": "string",
    "voltagem": "string"
  },
  "data_estimativa": "string"
}`;

    return this.promptTemplate
      .replace('{destinos}', destinosFormatados)
      .replace('{origem}', params.origem)
      .replace('{inicio}', `${params.inicio}`)
      .replace('{duracao}', `${params.duracao}`)
      .replace('{numerosPessoas}', params.numerosPessoas.toString())
      .replace('{estiloViagem}', params.estiloViagem)
      .replace('{interesses}', params.interesses?.join(', ') || 'cultura, gastronomia')
      .replace('{ano}', ano.toString())
      .replace('{jsonSchema}', jsonSchema);
  }

  private parseAIResponse(response: string): EstimativaViagem {
    try {
      // Limpar possíveis caracteres extras da resposta
      const cleanResponse = response.trim();

      // Tentar extrair JSON se houver texto extra
      const jsonStart = cleanResponse.indexOf('{');
      const jsonEnd = cleanResponse.lastIndexOf('}') + 1;

      if (jsonStart === -1 || jsonEnd === 0) {
        throw new Error('Resposta da IA não contém JSON válido');
      }

      const jsonString = cleanResponse.substring(jsonStart, jsonEnd);
      const parsedResponse = JSON.parse(jsonString);

      // Validar estrutura básica
      if (!parsedResponse.resumo_viagem || !parsedResponse.custos_estimados) {
        throw new Error('Estrutura de resposta inválida');
      }

      return parsedResponse as EstimativaViagem;
    } catch (error) {
      console.error('Erro ao parsear resposta da IA:', error);
      console.error('Resposta recebida:', response);
      throw new Error('Falha ao processar resposta da IA');
    }
  }

  public async gerarEstimativa(params: TravelParams): Promise<EstimativaViagem> {
    try {
      const prompt = this.buildPrompt(params);
      console.log('🤖 Gerando estimativa com IA...');

      let aiResponse: string;

      if (this.aiConfig.provider === 'openai') {
        console.log('📡 Consultando OpenAI...');
        aiResponse = await this.callOpenAI(prompt);
      } else {
        throw new Error('Provider de IA não suportado');
      }

      console.log('✅ Resposta da IA recebida, processando...');
      const estimativa = this.parseAIResponse(aiResponse);

      // Adicionar metadados da geração
      estimativa.data_estimativa = new Date().toLocaleDateString('pt-BR');

      return estimativa;
    } catch (error) {
      console.error('❌ Erro ao gerar estimativa:', error);

      // Se for erro de rate limit, tentar fallback
      if (error instanceof Error && error.message.includes('Rate limit')) {
        console.log('🔄 Tentando fallback devido ao rate limit...');
        return this.createFallbackEstimate(params);
      }

      throw error;
    }
  }

  private createFallbackEstimate(params: TravelParams): EstimativaViagem {
    console.log('⚠️ Gerando estimativa básica (fallback)...');

    const totalDays = params.duracao;
    const people = params.numerosPessoas;
    const destinations = params.destinos.map((d) => d.cidade).join(', ');

    // Estimativas básicas por pessoa/dia
    const dailyCosts = {
      econômico: { hospedagem: 80, alimentacao: 60, atividades: 40, transporte: 30 },
      médio: { hospedagem: 150, alimentacao: 100, atividades: 80, transporte: 50 },
      luxo: { hospedagem: 300, alimentacao: 200, atividades: 150, transporte: 100 },
    };

    const costs = dailyCosts[params.estiloViagem] || dailyCosts.econômico;

    // Calcular custos
    const hospedagemTotal = costs.hospedagem * totalDays * people;
    const alimentacaoTotal = costs.alimentacao * totalDays * people;
    const atividadesTotal = costs.atividades * totalDays * people;
    const transporteLocal = costs.transporte * totalDays * people;
    const passagensAereas = params.destinos.length * 800 * people; // Estimativa básica
    const outros = (hospedagemTotal + alimentacaoTotal + atividadesTotal + transporteLocal + passagensAereas) * 0.1;

    const custoTotal = hospedagemTotal + alimentacaoTotal + atividadesTotal + transporteLocal + passagensAereas + outros;

    return {
      resumo_viagem: {
        destino: destinations,
        origem: params.origem,
        duracao_dias: totalDays,
        numero_pessoas: people,
        periodo: this.formatPeriod(params.inicio, totalDays),
        estilo_viagem: params.estiloViagem,
      },
      custos_estimados: {
        passagens_aereas: {
          valor_por_pessoa: passagensAereas / people,
          valor_total: passagensAereas,
          observacoes: 'Estimativa básica para múltiplos destinos',
        },
        hospedagem: {
          valor_por_noite: costs.hospedagem,
          total_noites: totalDays,
          valor_total: hospedagemTotal,
          tipo_acomodacao: this.getTipoAcomodacao(params.estiloViagem),
          observacoes: 'Valores médios distribuídos entre os destinos',
        },
        alimentacao: {
          valor_por_pessoa_por_dia: costs.alimentacao,
          valor_total: alimentacaoTotal,
          observacoes: 'Inclui café da manhã, almoço e jantar',
        },
        transporte_local: {
          valor_total: transporteLocal,
          tipos_incluidos: ['transporte público', 'táxi', 'uber'],
          observacoes: 'Deslocamentos internos em cada cidade',
        },
        atividades_turismo: {
          valor_total: atividadesTotal,
          principais_atividades: ['pontos turísticos', 'museus', 'tours'],
          observacoes: 'Estimativa para atividades principais',
        },
        outros_gastos: {
          valor_total: outros,
          itens_incluidos: ['seguro viagem', 'compras', 'emergências'],
          observacoes: '10% dos custos totais para imprevistos',
        },
      },
      resumo_financeiro: {
        custo_total_viagem: custoTotal,
        custo_por_pessoa: custoTotal / people,
        distribuicao_por_categoria: {
          passagens: Math.round((passagensAereas / custoTotal) * 100),
          hospedagem: Math.round((hospedagemTotal / custoTotal) * 100),
          alimentacao: Math.round((alimentacaoTotal / custoTotal) * 100),
          transporte_local: Math.round((transporteLocal / custoTotal) * 100),
          atividades: Math.round((atividadesTotal / custoTotal) * 100),
          outros: Math.round((outros / custoTotal) * 100),
        },
        moeda: 'BRL',
      },
      dicas_economia: [
        'Considere viajar em baixa temporada',
        'Compare preços de hospedagem com antecedência',
        'Use transporte público quando possível',
        'Procure restaurantes locais fora das áreas turísticas',
      ],
      dicas_otimizacao_tempo: [
        'Reserve atrações principais com antecedência',
        'Planeje deslocamentos entre cidades',
        'Considere a proximidade entre pontos turísticos',
      ],
      observacoes_importantes: [
        '⚠️ Esta é uma estimativa básica gerada automaticamente',
        'Os valores podem variar conforme disponibilidade e temporada',
        'Recomenda-se pesquisar preços específicos para datas exatas',
      ],
      informacoes_praticas: {
        melhor_epoca_visitar: 'Varia conforme o destino',
        documentos_necessarios: ['RG ou Passaporte'],
        fuso_horario: 'Verificar para cada destino',
        idioma_local: 'Português',
        moeda_local: 'Real (BRL)',
        voltagem: '110V/220V',
      },
      data_estimativa: new Date().toLocaleDateString('pt-BR'),
    };
  }

  private formatPeriod(startDate: string, duration: number): string {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(end.getDate() + duration - 1);

    const formatDate = (date: Date) => date.toLocaleDateString('pt-BR').split('/').reverse().join('/');

    return `${formatDate(start)} a ${formatDate(end)}`;
  }
}
