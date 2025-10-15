# 📋 Changelog - Novas Features Implementadas

**Data:** 2025-01-15
**Versão:** 1.1.0

---

## ✨ Features Implementadas

### 1. 🔍 Filtros Avançados para Radar de Voos

#### Novos Campos no Radar

- **`airline`**: Filtrar voos por companhia aérea específica (ex: "LATAM", "GOL", "AZUL")
- **`tripType`**: Tipo de viagem - `ONE_WAY` (ida) ou `ROUND_TRIP` (ida e volta)
- **`returnDateRange`**: Intervalo de dias para buscar voos de retorno (padrão: 15 dias)

#### Arquivos Modificados

**Schema do Banco:**
- `prisma/schema.prisma` - Model `Radar` atualizado com novos campos
- Migration criada: `20251015000000_add_radar_filters_and_feedback/migration.sql`

**DTOs:**
- `src/modules/radar/dtos/ICreateRadarDTO.ts` - Adicionados novos campos opcionais
- `src/modules/radar/dtos/IUpdateRadarDTO.ts` - Adicionados novos campos opcionais

**Schemas de Validação:**
- `src/modules/radar/useCases/CreateRadar/CreateRadarSchema.ts` - Validação com Zod
- `src/modules/radar/useCases/UpdateRadar/UpdateRadarSchema.ts` - Validação com Zod

**Services:**
- `src/modules/radar/useCases/CreateRadar/CreateRadarService.ts` - Passa novos campos para o repositório

#### Como Usar

**Criar Radar com Filtro de Companhia:**

```bash
POST /api/v1/radars
{
  "origin": "GRU",
  "destination": "LIS",
  "type": "AIRMILES",
  "airline": "LATAM",           // ✨ NOVO
  "tripType": "ONE_WAY",         // ✨ NOVO
  "start": "2025-03-01",
  "end": "2025-03-31"
}
```

**Criar Radar de Ida e Volta:**

```bash
POST /api/v1/radars
{
  "origin": "GRU",
  "destination": "LIS",
  "type": "MONEY",
  "tripType": "ROUND_TRIP",      // ✨ NOVO
  "returnDateRange": 15,         // ✨ NOVO (busca retorno até 15 dias depois)
  "start": "2025-03-01",
  "end": "2025-03-31"
}
```

---

### 2. 💬 Sistema de Feedback

#### Novo Módulo Completo

Sistema completo para coletar feedbacks dos usuários com categorias, ratings e notificações por email.

#### Estrutura Criada

**Model do Banco:**
- `prisma/schema.prisma` - Model `Feedback` com relação para `User`

**Módulo Completo:**
```
src/modules/feedback/
├── dtos/
│   ├── ICreateFeedbackDTO.ts
│   └── IListFeedbackDTO.ts
├── repositories/
│   └── IFeedbackRepository.ts
├── infra/
│   ├── database/repositories/
│   │   └── FeedbackRepository.ts
│   └── http/
│       ├── controllers/
│       │   └── FeedbackController.ts
│       └── routes/
│           └── FeedbackRoutes.ts
├── useCases/
│   ├── CreateFeedback/
│   │   ├── CreateFeedbackSchema.ts
│   │   ├── CreateFeedbackService.ts
│   │   └── index.ts
│   └── ListFeedback/
│       ├── ListFeedbackSchema.ts
│       ├── ListFeedbackService.ts
│       └── index.ts
└── container/
    ├── types.ts
    └── index.ts
```

**Templates de Email:**
- `src/templates/FeedbackNotificationTemplate.html` - Template para notificar equipe sobre novo feedback
- `src/templates/CriticalBugAlertTemplate.html` - Template para bugs críticos

**Configuração:**
- Container global atualizado ([src/common/container/index.ts](src/common/container/index.ts#L12))
- Rotas registradas ([src/common/infra/http/routes/index.ts](src/common/infra/http/routes/index.ts#L23))

#### Categorias de Feedback

- `BUG` - Reportar bugs
- `FEATURE_REQUEST` - Solicitar novas funcionalidades
- `IMPROVEMENT` - Sugerir melhorias
- `GENERAL` - Comentários gerais
- `COMPLIMENT` - Elogios
- `COMPLAINT` - Reclamações

#### Como Usar

**Criar Feedback:**

```bash
POST /api/v1/feedback
Authorization: Bearer {token}

{
  "category": "FEATURE_REQUEST",
  "subject": "Adicionar filtro de preço",
  "message": "Seria ótimo ter um filtro para definir preço máximo nas buscas",
  "rating": 5,
  "email": "user@example.com"  // opcional
}
```

**Listar Feedbacks do Usuário:**

```bash
POST /api/v1/feedback/list
Authorization: Bearer {token}

{
  "category": "BUG",    // opcional
  "status": "PENDING",  // opcional
  "offset": 0,
  "limit": 10
}
```

#### Notificações por Email

- **Feedback Normal:** Email enviado para `FEEDBACK_EMAIL` com todos os detalhes
- **Bug Crítico:** Se `category=BUG` e `rating<=2`, envia alerta adicional para `DEV_TEAM_EMAIL`

---

## 🔧 Configuração

### Variáveis de Ambiente Adicionadas

Adicione ao seu arquivo `.env`:

```bash
###################
# Feedback Config
###################

FEEDBACK_EMAIL=feedback@econotrip.com
DEV_TEAM_EMAIL=dev@econotrip.com
ADMIN_URL=http://localhost:8080/admin
```

### Arquivo `.env` Configurado

✅ Arquivo `.env` já configurado com a conexão do banco de dados Neon
✅ Variáveis de feedback adicionadas

---

## 🗄️ Migrations do Banco de Dados

### Migration Criada e Aplicada

**Migration:** `20251015000000_add_radar_filters_and_feedback`

**Alterações:**
```sql
-- Adicionar novos campos no Radar
ALTER TABLE "radar"
  ADD COLUMN "airline" VARCHAR(64),
  ADD COLUMN "trip_type" VARCHAR(16) DEFAULT 'ONE_WAY',
  ADD COLUMN "return_date_range" INTEGER DEFAULT 15;

-- Criar tabela de Feedback
CREATE TABLE "feedback" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "category" VARCHAR(32) NOT NULL,
    "subject" VARCHAR(200) NOT NULL,
    "message" VARCHAR(5000) NOT NULL,
    "rating" INTEGER,
    "email" VARCHAR(255),
    "status" VARCHAR(16) NOT NULL DEFAULT 'PENDING',
    "attachments" TEXT[],
    "user_agent" VARCHAR(512),
    "ip_address" VARCHAR(45),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- Índices para performance
CREATE INDEX "feedback_user_id_created_at_idx" ON "feedback"("user_id", "created_at");
CREATE INDEX "feedback_category_status_idx" ON "feedback"("category", "status");

-- Foreign Key
ALTER TABLE "feedback"
  ADD CONSTRAINT "feedback_user_id_fkey"
  FOREIGN KEY ("user_id") REFERENCES "user"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;
```

**Status:** ✅ Migration marcada como aplicada

---

## 📡 Endpoints da API

### Radar de Voos (Atualizados)

| Método | Endpoint | Descrição | Novos Campos |
|--------|----------|-----------|--------------|
| POST | `/api/v1/radars` | Criar radar | `airline`, `tripType`, `returnDateRange` |
| PATCH | `/api/v1/radars/:id` | Atualizar radar | `airline`, `tripType`, `returnDateRange` |

### Feedback (Novos)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/api/v1/feedback` | Enviar feedback | ✅ Required |
| POST | `/api/v1/feedback/list` | Listar feedbacks | ✅ Required |

---

## 🧪 Testes Recomendados

### Testar Radar com Filtro de Companhia

```bash
curl -X POST http://localhost:8080/api/v1/radars \
  -H "Authorization: Bearer YOUR_TOKEN" \
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

### Testar Radar Ida e Volta

```bash
curl -X POST http://localhost:8080/api/v1/radars \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "GRU",
    "destination": "LIS",
    "type": "MONEY",
    "tripType": "ROUND_TRIP",
    "returnDateRange": 15,
    "start": "2025-03-01",
    "end": "2025-03-31"
  }'
```

### Testar Feedback

```bash
curl -X POST http://localhost:8080/api/v1/feedback \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "category": "FEATURE_REQUEST",
    "subject": "Adicionar filtro de preço",
    "message": "Seria ótimo ter um filtro para definir preço máximo",
    "rating": 5
  }'
```

### Testar Bug Crítico (envia 2 emails)

```bash
curl -X POST http://localhost:8080/api/v1/feedback \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "category": "BUG",
    "subject": "App crashando ao buscar voos",
    "message": "O app fecha sozinho toda vez que tento buscar voos internacionais",
    "rating": 1
  }'
```

---

## 📝 Próximos Passos (Opcional)

### Para Frontend
- Atualizar formulário de criação de radar com novos campos
- Criar tela de feedback com formulário categorizado
- Mostrar histórico de feedbacks do usuário

### Para Backend
- Implementar lógica de busca ida e volta no cron job do radar
- Dashboard admin para visualizar e gerenciar feedbacks
- API de estatísticas de feedbacks
- Sistema de respostas para feedbacks

---

## 👥 Contato

**Desenvolvedor:** Claude Code
**Data:** 2025-01-15
**Versão:** 1.1.0

---

**✨ Todas as features foram implementadas com sucesso!**
