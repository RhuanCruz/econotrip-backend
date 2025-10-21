# 🧪 Guia de Testes - Novas Features

## 📋 Pré-requisitos

1. ✅ Aplicação rodando: `yarn dev`
2. ✅ Banco de dados conectado e migration aplicada
3. ✅ Token de autenticação válido (obtido via login)

---

## 🚀 Como Obter o Token de Autenticação

Primeiro, faça login para obter o token:

### Windows (PowerShell):
```powershell
$loginBody = @{
    login = "seu-usuario"
    password = "sua-senha"
} | ConvertTo-Json

$loginResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/v1/auth/login" -Method Post `
    -Headers @{ "Content-Type" = "application/json" } `
    -Body $loginBody

$TOKEN = $loginResponse.token
Write-Host "Seu token: $TOKEN" -ForegroundColor Green
```

### Linux/Mac (Bash):
```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "login": "seu-usuario",
    "password": "sua-senha"
  }' | jq -r '.token'
```

---

## 🎯 Executar Testes Automáticos

Criei 2 scripts prontos que testam **TODAS** as novas funcionalidades:

### Windows (PowerShell):

1. **Abra o arquivo** `test-new-features.ps1`
2. **Substitua** `seu_token_aqui` pelo token obtido acima (linha 11)
3. **Execute:**
   ```powershell
   .\test-new-features.ps1
   ```

### Linux/Mac (Bash):

1. **Torne o script executável:**
   ```bash
   chmod +x test-new-features.sh
   ```

2. **Edite** o token na linha 11:
   ```bash
   nano test-new-features.sh
   # Substitua: TOKEN="seu_token_aqui"
   ```

3. **Execute:**
   ```bash
   ./test-new-features.sh
   ```

---

## 🧪 O Que os Scripts Testam

Os scripts executam **6 testes** automaticamente:

### ✈️ Testes de Radar (4 testes)

#### ✅ Teste 1: Radar com Filtro de Companhia (LATAM)
- Origem: GRU → Destino: LIS
- Tipo: AIRMILES
- **Novidade:** Filtra apenas voos da LATAM
- Tipo de viagem: Somente Ida

#### ✅ Teste 2: Radar com Filtro de Companhia (GOL)
- Origem: GRU → Destino: FOR
- Tipo: MONEY
- **Novidade:** Filtra apenas voos da GOL
- Valor máximo: R$ 500

#### ✅ Teste 3: Radar de Ida e Volta
- Origem: GRU → Destino: MAD
- Tipo: MONEY
- **Novidade:** Busca ida E volta
- **Novidade:** Retorno em até 15 dias após a ida
- Valor máximo: R$ 3000

#### ✅ Teste 4: Radar Completo (Ida/Volta + Companhia)
- Origem: GRU → Destino: EZE (Buenos Aires)
- Tipo: AIRMILES
- **Novidade:** LATAM + Ida e Volta + 7 dias de intervalo
- Valor máximo: 25.000 milhas

### 💬 Testes de Feedback (2 testes)

#### ✅ Teste 5: Feature Request
- Categoria: FEATURE_REQUEST
- Assunto: "Adicionar filtro de preço máximo"
- Rating: 5/5 estrelas
- **Resultado:** Feedback salvo + email enviado (se SMTP configurado)

#### ✅ Teste 6: Bug Crítico
- Categoria: BUG
- Assunto: "App crashando ao buscar voos"
- Rating: 1/5 estrelas
- **Resultado:** Feedback salvo + **2 emails enviados** (notificação + alerta crítico)

### ➕ Teste Extra: Listar Feedbacks
- Lista todos os feedbacks criados pelo usuário
- Paginação: 10 por página

---

## 🔍 Testes Manuais Individuais

Se preferir testar cada feature manualmente:

### 1️⃣ Criar Radar com Filtro de Companhia

**PowerShell:**
```powershell
$TOKEN = "seu_token_aqui"

$body = @{
    origin = "GRU"
    destination = "LIS"
    type = "AIRMILES"
    airline = "LATAM"
    tripType = "ONE_WAY"
    start = "2025-03-01"
    end = "2025-03-31"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8080/api/v1/radars" -Method Post `
    -Headers @{ "Authorization" = "Bearer $TOKEN"; "Content-Type" = "application/json" } `
    -Body $body
```

**Bash:**
```bash
TOKEN="seu_token_aqui"

curl -X POST http://localhost:8080/api/v1/radars \
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
  }'
```

### 2️⃣ Criar Radar de Ida e Volta

**PowerShell:**
```powershell
$body = @{
    origin = "GRU"
    destination = "MAD"
    type = "MONEY"
    tripType = "ROUND_TRIP"
    returnDateRange = 15
    value = 3000
    start = "2025-04-01"
    end = "2025-04-15"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8080/api/v1/radars" -Method Post `
    -Headers @{ "Authorization" = "Bearer $TOKEN"; "Content-Type" = "application/json" } `
    -Body $body
```

**Bash:**
```bash
curl -X POST http://localhost:8080/api/v1/radars \
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
  }'
```

### 3️⃣ Enviar Feedback

**PowerShell:**
```powershell
$body = @{
    category = "FEATURE_REQUEST"
    subject = "Adicionar filtro de preço"
    message = "Seria ótimo ter um filtro para preço máximo"
    rating = 5
    email = "usuario@teste.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8080/api/v1/feedback" -Method Post `
    -Headers @{ "Authorization" = "Bearer $TOKEN"; "Content-Type" = "application/json" } `
    -Body $body
```

**Bash:**
```bash
curl -X POST http://localhost:8080/api/v1/feedback \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "category": "FEATURE_REQUEST",
    "subject": "Adicionar filtro de preço",
    "message": "Seria ótimo ter um filtro para preço máximo",
    "rating": 5,
    "email": "usuario@teste.com"
  }'
```

### 4️⃣ Listar Radares Criados

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/v1/radars/list" -Method Post `
    -Headers @{ "Authorization" = "Bearer $TOKEN"; "Content-Type" = "application/json" } `
    -Body '{}'
```

**Bash:**
```bash
curl -X POST http://localhost:8080/api/v1/radars/list \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### 5️⃣ Listar Feedbacks Criados

**PowerShell:**
```powershell
$body = @{
    offset = 0
    limit = 10
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8080/api/v1/feedback/list" -Method Post `
    -Headers @{ "Authorization" = "Bearer $TOKEN"; "Content-Type" = "application/json" } `
    -Body $body
```

**Bash:**
```bash
curl -X POST http://localhost:8080/api/v1/feedback/list \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "offset": 0,
    "limit": 10
  }'
```

---

## ✅ Validação dos Resultados

### O que verificar após os testes:

#### Radares:
- ✅ Response retorna o radar criado com ID
- ✅ Campos `airline`, `tripType`, `returnDateRange` presentes na resposta
- ✅ Ao listar radares, todos aparecem com os novos campos

#### Feedbacks:
- ✅ Response retorna o feedback criado com ID
- ✅ Status inicial é "PENDING"
- ✅ Categoria, subject, message e rating corretos
- ✅ Ao listar feedbacks, todos aparecem
- ✅ Se SMTP configurado: 1 email para feedback normal, 2 emails para bug crítico

---

## 🐛 Troubleshooting

### Erro: "Unauthorized"
- ✅ Verifique se o token está correto
- ✅ Token pode ter expirado - faça login novamente

### Erro: "Network error" / "Connection refused"
- ✅ Verifique se a aplicação está rodando (`yarn dev`)
- ✅ Confirme a porta (padrão: 8080)

### Radar criado mas sem dados de voos
- ⚠️ Normal! Os voos são buscados pelo **cron job** que roda periodicamente
- ✅ Para testar imediatamente, execute o cron job manualmente

### Feedback criado mas sem email
- ⚠️ Normal se SMTP não estiver configurado
- ✅ Feedback ainda é salvo no banco normalmente
- ✅ Configure SMTP no `.env` para receber emails

---

## 📊 Categorias de Feedback Disponíveis

| Categoria | Quando Usar | Rating |
|-----------|-------------|--------|
| `BUG` | Reportar problemas/erros | Recomendado |
| `FEATURE_REQUEST` | Solicitar nova funcionalidade | Opcional |
| `IMPROVEMENT` | Sugerir melhoria em feature existente | Opcional |
| `COMPLIMENT` | Elogiar algo que gostou | Opcional |
| `COMPLAINT` | Reclamar de algo | Recomendado |
| `GENERAL` | Comentário geral | Opcional |

---

## 📧 Emails de Feedback (Se SMTP Configurado)

### Feedback Normal
- **Para:** `FEEDBACK_EMAIL` (configurado no .env)
- **Assunto:** `[CATEGORIA] Assunto do feedback`
- **Template:** `FeedbackNotificationTemplate.html`

### Bug Crítico (rating ≤ 2)
- **Para:** `DEV_TEAM_EMAIL` (configurado no .env)
- **Assunto:** `🚨 BUG CRÍTICO REPORTADO - Econotrip`
- **Template:** `CriticalBugAlertTemplate.html`
- **Conteúdo:** Inclui User-Agent, IP, detalhes técnicos

---

## 🎉 Pronto!

Execute os scripts e veja as novas features em ação! 🚀

Se tiver problemas, consulte o [CHANGELOG_FEATURES.md](CHANGELOG_FEATURES.md) para mais detalhes.
