# ============================================
# Script de Teste - Novas Features (PowerShell)
# ============================================
# Features testadas:
# 1. Radar com filtro de companhia aérea
# 2. Radar de ida e volta
# 3. Sistema de Feedback
# ============================================

# Configurações
$API_URL = "http://localhost:8080/api/v1"
$TOKEN = "seu_token_aqui"  # ⚠️ SUBSTITUA PELO SEU TOKEN

Write-Host "`n============================================" -ForegroundColor Blue
Write-Host "   TESTE DAS NOVAS FEATURES - ECONOTRIP" -ForegroundColor Blue
Write-Host "============================================`n" -ForegroundColor Blue

# ============================================
# 1. TESTE: RADAR COM FILTRO DE COMPANHIA
# ============================================
Write-Host "[1/6] Testando Radar com Filtro de Companhia Aérea (LATAM)..." -ForegroundColor Yellow

$body1 = @{
    origin = "GRU"
    destination = "LIS"
    type = "AIRMILES"
    airline = "LATAM"
    tripType = "ONE_WAY"
    start = "2025-03-01"
    end = "2025-03-31"
} | ConvertTo-Json

try {
    $response1 = Invoke-RestMethod -Uri "$API_URL/radars" -Method Post `
        -Headers @{ "Authorization" = "Bearer $TOKEN"; "Content-Type" = "application/json" } `
        -Body $body1
    Write-Host ($response1 | ConvertTo-Json -Depth 10) -ForegroundColor Green
    Write-Host "`n✓ Teste 1 concluído`n" -ForegroundColor Green
} catch {
    Write-Host "✗ Erro no teste 1: $_" -ForegroundColor Red
}
Start-Sleep -Seconds 2

# ============================================
# 2. TESTE: RADAR COM FILTRO DE COMPANHIA (GOL)
# ============================================
Write-Host "[2/6] Testando Radar com Filtro de Companhia Aérea (GOL)..." -ForegroundColor Yellow

$body2 = @{
    origin = "GRU"
    destination = "FOR"
    type = "MONEY"
    airline = "GOL"
    tripType = "ONE_WAY"
    value = 500
    start = "2025-02-15"
    end = "2025-02-28"
} | ConvertTo-Json

try {
    $response2 = Invoke-RestMethod -Uri "$API_URL/radars" -Method Post `
        -Headers @{ "Authorization" = "Bearer $TOKEN"; "Content-Type" = "application/json" } `
        -Body $body2
    Write-Host ($response2 | ConvertTo-Json -Depth 10) -ForegroundColor Green
    Write-Host "`n✓ Teste 2 concluído`n" -ForegroundColor Green
} catch {
    Write-Host "✗ Erro no teste 2: $_" -ForegroundColor Red
}
Start-Sleep -Seconds 2

# ============================================
# 3. TESTE: RADAR IDA E VOLTA (15 DIAS)
# ============================================
Write-Host "[3/6] Testando Radar de Ida e Volta (15 dias de intervalo)..." -ForegroundColor Yellow

$body3 = @{
    origin = "GRU"
    destination = "MAD"
    type = "MONEY"
    tripType = "ROUND_TRIP"
    returnDateRange = 15
    value = 3000
    start = "2025-04-01"
    end = "2025-04-15"
} | ConvertTo-Json

try {
    $response3 = Invoke-RestMethod -Uri "$API_URL/radars" -Method Post `
        -Headers @{ "Authorization" = "Bearer $TOKEN"; "Content-Type" = "application/json" } `
        -Body $body3
    Write-Host ($response3 | ConvertTo-Json -Depth 10) -ForegroundColor Green
    Write-Host "`n✓ Teste 3 concluído`n" -ForegroundColor Green
} catch {
    Write-Host "✗ Erro no teste 3: $_" -ForegroundColor Red
}
Start-Sleep -Seconds 2

# ============================================
# 4. TESTE: RADAR IDA E VOLTA COM COMPANHIA
# ============================================
Write-Host "[4/6] Testando Radar Ida/Volta + Filtro de Companhia..." -ForegroundColor Yellow

$body4 = @{
    origin = "GRU"
    destination = "EZE"
    type = "AIRMILES"
    airline = "LATAM"
    tripType = "ROUND_TRIP"
    returnDateRange = 7
    value = 25000
    start = "2025-03-10"
    end = "2025-03-20"
} | ConvertTo-Json

try {
    $response4 = Invoke-RestMethod -Uri "$API_URL/radars" -Method Post `
        -Headers @{ "Authorization" = "Bearer $TOKEN"; "Content-Type" = "application/json" } `
        -Body $body4
    Write-Host ($response4 | ConvertTo-Json -Depth 10) -ForegroundColor Green
    Write-Host "`n✓ Teste 4 concluído`n" -ForegroundColor Green
} catch {
    Write-Host "✗ Erro no teste 4: $_" -ForegroundColor Red
}
Start-Sleep -Seconds 2

# ============================================
# 5. TESTE: FEEDBACK - FEATURE REQUEST
# ============================================
Write-Host "[5/6] Testando Sistema de Feedback (Feature Request)..." -ForegroundColor Yellow

$body5 = @{
    category = "FEATURE_REQUEST"
    subject = "Adicionar filtro de preço máximo"
    message = "Seria muito útil ter um filtro para definir o preço máximo que estou disposto a pagar nas buscas de voos. Isso economizaria muito tempo!"
    rating = 5
    email = "usuario@teste.com"
} | ConvertTo-Json

try {
    $response5 = Invoke-RestMethod -Uri "$API_URL/feedback" -Method Post `
        -Headers @{ "Authorization" = "Bearer $TOKEN"; "Content-Type" = "application/json" } `
        -Body $body5
    Write-Host ($response5 | ConvertTo-Json -Depth 10) -ForegroundColor Green
    Write-Host "`n✓ Teste 5 concluído`n" -ForegroundColor Green
} catch {
    Write-Host "✗ Erro no teste 5: $_" -ForegroundColor Red
}
Start-Sleep -Seconds 2

# ============================================
# 6. TESTE: FEEDBACK - BUG CRÍTICO
# ============================================
Write-Host "[6/6] Testando Feedback de Bug Crítico (deve enviar alerta)..." -ForegroundColor Yellow

$body6 = @{
    category = "BUG"
    subject = "App crashando ao buscar voos"
    message = "O aplicativo fecha sozinho toda vez que tento buscar voos internacionais para a Europa. Testei em GRU->LIS e GRU->MAD. O problema acontece imediatamente após clicar em Buscar."
    rating = 1
    email = "usuario@teste.com"
} | ConvertTo-Json

try {
    $response6 = Invoke-RestMethod -Uri "$API_URL/feedback" -Method Post `
        -Headers @{ "Authorization" = "Bearer $TOKEN"; "Content-Type" = "application/json" } `
        -Body $body6
    Write-Host ($response6 | ConvertTo-Json -Depth 10) -ForegroundColor Green
    Write-Host "`n✓ Teste 6 concluído`n" -ForegroundColor Green
} catch {
    Write-Host "✗ Erro no teste 6: $_" -ForegroundColor Red
}
Start-Sleep -Seconds 2

# ============================================
# TESTE ADICIONAL: LISTAR FEEDBACKS
# ============================================
Write-Host "[EXTRA] Listando todos os feedbacks do usuário..." -ForegroundColor Yellow

$bodyList = @{
    offset = 0
    limit = 10
} | ConvertTo-Json

try {
    $responseList = Invoke-RestMethod -Uri "$API_URL/feedback/list" -Method Post `
        -Headers @{ "Authorization" = "Bearer $TOKEN"; "Content-Type" = "application/json" } `
        -Body $bodyList
    Write-Host ($responseList | ConvertTo-Json -Depth 10) -ForegroundColor Green
    Write-Host "`n✓ Listagem concluída`n" -ForegroundColor Green
} catch {
    Write-Host "✗ Erro na listagem: $_" -ForegroundColor Red
}

# ============================================
# RESUMO FINAL
# ============================================
Write-Host "`n============================================" -ForegroundColor Blue
Write-Host "   TODOS OS TESTES CONCLUÍDOS!" -ForegroundColor Blue
Write-Host "============================================`n" -ForegroundColor Blue

Write-Host "✓ Radares criados:" -ForegroundColor Green
Write-Host "  1. Radar GRU→LIS (LATAM, Somente Ida)"
Write-Host "  2. Radar GRU→FOR (GOL, Somente Ida, R$ 500)"
Write-Host "  3. Radar GRU→MAD (Ida e Volta, 15 dias, R$ 3000)"
Write-Host "  4. Radar GRU→EZE (LATAM, Ida e Volta, 7 dias, 25k milhas)"
Write-Host ""
Write-Host "✓ Feedbacks enviados:" -ForegroundColor Green
Write-Host "  1. Feature Request (Rating 5/5)"
Write-Host "  2. Bug Crítico (Rating 1/5 - deve ter gerado alerta)"
Write-Host ""
Write-Host "Próximos passos:" -ForegroundColor Yellow
Write-Host "  1. Verificar se os radares foram salvos no banco"
Write-Host "  2. Verificar se os feedbacks estão visíveis"
Write-Host "  3. Se o SMTP estiver configurado, verificar emails recebidos"
Write-Host ""
Write-Host "Para listar seus radares:" -ForegroundColor Cyan
Write-Host "  Invoke-RestMethod -Uri '$API_URL/radars/list' -Method Post -Headers @{'Authorization'='Bearer $TOKEN'; 'Content-Type'='application/json'} -Body '{}'"
Write-Host ""
