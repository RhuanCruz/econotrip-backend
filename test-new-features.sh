#!/bin/bash

# ============================================
# Script de Teste - Novas Features
# ============================================
# Features testadas:
# 1. Radar com filtro de companhia aérea
# 2. Radar de ida e volta
# 3. Sistema de Feedback
# ============================================

# Configurações
API_URL="http://localhost:8080/api/v1"
TOKEN="seu_token_aqui"  # ⚠️ SUBSTITUA PELO SEU TOKEN

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}   TESTE DAS NOVAS FEATURES - ECONOTRIP${NC}"
echo -e "${BLUE}============================================${NC}\n"

# ============================================
# 1. TESTE: RADAR COM FILTRO DE COMPANHIA
# ============================================
echo -e "${YELLOW}[1/6] Testando Radar com Filtro de Companhia Aérea (LATAM)...${NC}"
curl -X POST "$API_URL/radars" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "GRU",
    "destination": "LIS",
    "type": "AIRMILES",
    "airline": "LATAM",
    "tripType": "ONE_WAY",
    "start": "2025-03-01",
    "end": "2025-03-31"
  }' | jq .

echo -e "\n${GREEN}✓ Teste 1 concluído${NC}\n"
sleep 2

# ============================================
# 2. TESTE: RADAR COM FILTRO DE COMPANHIA (GOL)
# ============================================
echo -e "${YELLOW}[2/6] Testando Radar com Filtro de Companhia Aérea (GOL)...${NC}"
curl -X POST "$API_URL/radars" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "GRU",
    "destination": "FOR",
    "type": "MONEY",
    "airline": "GOL",
    "tripType": "ONE_WAY",
    "value": 500,
    "start": "2025-02-15",
    "end": "2025-02-28"
  }' | jq .

echo -e "\n${GREEN}✓ Teste 2 concluído${NC}\n"
sleep 2

# ============================================
# 3. TESTE: RADAR IDA E VOLTA (15 DIAS)
# ============================================
echo -e "${YELLOW}[3/6] Testando Radar de Ida e Volta (15 dias de intervalo)...${NC}"
curl -X POST "$API_URL/radars" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "GRU",
    "destination": "MAD",
    "type": "MONEY",
    "tripType": "ROUND_TRIP",
    "returnDateRange": 15,
    "value": 3000,
    "start": "2025-04-01",
    "end": "2025-04-15"
  }' | jq .

echo -e "\n${GREEN}✓ Teste 3 concluído${NC}\n"
sleep 2

# ============================================
# 4. TESTE: RADAR IDA E VOLTA COM COMPANHIA
# ============================================
echo -e "${YELLOW}[4/6] Testando Radar Ida/Volta + Filtro de Companhia...${NC}"
curl -X POST "$API_URL/radars" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "GRU",
    "destination": "EZE",
    "type": "AIRMILES",
    "airline": "LATAM",
    "tripType": "ROUND_TRIP",
    "returnDateRange": 7,
    "value": 25000,
    "start": "2025-03-10",
    "end": "2025-03-20"
  }' | jq .

echo -e "\n${GREEN}✓ Teste 4 concluído${NC}\n"
sleep 2

# ============================================
# 5. TESTE: FEEDBACK - FEATURE REQUEST
# ============================================
echo -e "${YELLOW}[5/6] Testando Sistema de Feedback (Feature Request)...${NC}"
curl -X POST "$API_URL/feedback" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "category": "FEATURE_REQUEST",
    "subject": "Adicionar filtro de preço máximo",
    "message": "Seria muito útil ter um filtro para definir o preço máximo que estou disposto a pagar nas buscas de voos. Isso economizaria muito tempo!",
    "rating": 5,
    "email": "usuario@teste.com"
  }' | jq .

echo -e "\n${GREEN}✓ Teste 5 concluído${NC}\n"
sleep 2

# ============================================
# 6. TESTE: FEEDBACK - BUG CRÍTICO
# ============================================
echo -e "${YELLOW}[6/6] Testando Feedback de Bug Crítico (deve enviar alerta)...${NC}"
curl -X POST "$API_URL/feedback" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "category": "BUG",
    "subject": "App crashando ao buscar voos",
    "message": "O aplicativo fecha sozinho toda vez que tento buscar voos internacionais para a Europa. Testei em GRU->LIS e GRU->MAD. O problema acontece imediatamente após clicar em Buscar.",
    "rating": 1,
    "email": "usuario@teste.com"
  }' | jq .

echo -e "\n${GREEN}✓ Teste 6 concluído${NC}\n"
sleep 2

# ============================================
# TESTE ADICIONAL: LISTAR FEEDBACKS
# ============================================
echo -e "${YELLOW}[EXTRA] Listando todos os feedbacks do usuário...${NC}"
curl -X POST "$API_URL/feedback/list" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "offset": 0,
    "limit": 10
  }' | jq .

echo -e "\n${GREEN}✓ Listagem concluída${NC}\n"

# ============================================
# RESUMO FINAL
# ============================================
echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}   TODOS OS TESTES CONCLUÍDOS!${NC}"
echo -e "${BLUE}============================================${NC}\n"

echo -e "${GREEN}✓ Radares criados:${NC}"
echo -e "  1. Radar GRU→LIS (LATAM, Somente Ida)"
echo -e "  2. Radar GRU→FOR (GOL, Somente Ida, R$ 500)"
echo -e "  3. Radar GRU→MAD (Ida e Volta, 15 dias, R$ 3000)"
echo -e "  4. Radar GRU→EZE (LATAM, Ida e Volta, 7 dias, 25k milhas)"
echo -e ""
echo -e "${GREEN}✓ Feedbacks enviados:${NC}"
echo -e "  1. Feature Request (Rating 5/5)"
echo -e "  2. Bug Crítico (Rating 1/5 - deve ter gerado alerta)"
echo -e ""
echo -e "${YELLOW}Próximos passos:${NC}"
echo -e "  1. Verificar se os radares foram salvos no banco"
echo -e "  2. Verificar se os feedbacks estão visíveis"
echo -e "  3. Se o SMTP estiver configurado, verificar emails recebidos"
echo -e ""
echo -e "${BLUE}Para listar seus radares:${NC}"
echo -e "  curl -X POST $API_URL/radars/list -H 'Authorization: Bearer $TOKEN' -H 'Content-Type: application/json' -d '{}' | jq ."
echo -e ""
