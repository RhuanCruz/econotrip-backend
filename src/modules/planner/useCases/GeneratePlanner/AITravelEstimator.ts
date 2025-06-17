import axios from 'axios';

interface TravelParams {
  destino: string;
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
  itinerario_detalhado: any[];
  alternativas_atividades: any[];
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
- **Destino**: {destino}
- **Origem**: {origem}  
- **Inicio da Viagem**: {inicio}
- **Duração(em dias)**: {duracao}
- **Número de pessoas**: {numerosPessoas}
- **Estilo de viagem**: {estiloViagem}
- **Interesses**: {interesses}

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

## Itinerário Detalhado:

- Organize atividades por proximidade geográfica
- Considere tempo de deslocamento entre atividades
- Misture diferentes tipos de experiências
- Deixe tempo livre para exploração espontânea
- Classifique atividades como "imperdível", "recomendada" ou "opcional"
- Considere horários de funcionamento e melhores momentos para visitar
- **Inclua as refeições (café da manhã, almoço, jantar, etc.) como atividades no array de atividades, usando a categoria "refeição". Não utilize um array separado para refeições.**
- **Não inclua atividades de categoria "transporte" ou "acomodação" no array de atividades do itinerário detalhado. Transporte e acomodação devem ser detalhados apenas nos campos apropriados, não como atividades.**

Responda APENAS com o JSON solicitado, sem texto adicional.
`;
  }

  private async callOpenAI(prompt: string): Promise<string> {
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
        },
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Erro na chamada OpenAI:', error);
      throw new Error('Falha ao gerar estimativa com OpenAI');
    }
  }

  private buildPrompt(params: TravelParams): string {
    const ano = new Date().getFullYear();

    const jsonSchema = `
{
  "resumo_viagem": {
    "destino": "string",
    "origem": "string",
    "duracao_dias": number,
    "numero_pessoas": number,
    "periodo": "string",
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
  "itinerario_detalhado": [
    {
      "dia": number,
      "data": "string",
      "tema_do_dia": "string",
      "atividades": [
        {
          "horario": "string",
          "nome_atividade": "string",
          "descricao": "string",
          "duracao_estimada": "string",
          "custo_por_pessoa": number,
          "custo_total": number,
          "categoria": "string", // Inclua refeições como atividades, usando categoria "refeição" para café da manhã, almoço, jantar, etc.
          "nivel_prioridade": "string",
          "dicas": "string",
          "endereco_aproximado": "string"
        }
      ],
      "transporte_do_dia": {
        "meios_utilizados": ["string"],
        "custo_total": number,
        "observacoes": "string"
      },
      "custo_total_dia": number,
      "tempo_livre": "string",
      "observacoes_dia": "string"
    }
  ],
  "alternativas_atividades": [
    {
      "atividade_original": "string",
      "alternativas": [
        {
          "nome": "string",
          "custo_por_pessoa": number,
          "motivo_alternativa": "string"
        }
      ]
    }
  ],
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
      .replace('{destino}', params.destino)
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
      console.log(prompt);
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
      throw error;
    }
  }
}
