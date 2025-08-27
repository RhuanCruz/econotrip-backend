# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Setup & Installation
```bash
yarn install
```

### Running the Application
```bash
# Development mode with hot reload
yarn dev

# Production mode
yarn start

# Build the application
yarn build
```

### Database Operations
```bash
# Create and apply new migration
yarn migration <migration_name>

# Create migration without applying (dry run)
yarn migration <migration_name> --create-only

# Apply existing migrations (for new environments)
yarn migrate

# Run database seeds
yarn seed
```

### Documentation & Code Quality
```bash
# Generate Swagger/OpenAPI documentation
yarn swagger

# Run TypeScript compilation
yarn build

# Run ESLint
npx eslint src/
```

### Testing & Debugging
```bash
# Run a single script/utility
yarn script <path-to-script>
```

## Architecture Overview

### Core Technologies
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **API Documentation**: TSOA (TypeScript OpenAPI)
- **Dependency Injection**: Inversify
- **Logging**: Winston

### Project Structure

The codebase follows a **modular clean architecture** with dependency injection:

```
src/
├── common/           # Shared infrastructure and utilities
│   ├── container/    # Main IoC container setup
│   ├── providers/    # External service providers (Amadeus, OpenAI, etc.)
│   ├── errors/       # Custom error handling
│   └── infra/        # Infrastructure (HTTP server, middleware)
├── modules/          # Business domains (user, location, flights, radar, planner)
│   └── [domain]/
│       ├── container/      # Module-specific IoC bindings
│       ├── repositories/   # Data access interfaces
│       ├── services/       # Business logic
│       ├── controllers/    # HTTP endpoints
│       └── dtos/          # Data transfer objects
├── config/           # Configuration and environment variables
└── swagger/          # Generated API documentation
```

### Key Architectural Patterns

**Dependency Injection Container**: Uses Inversify for IoC. Each module has its own container that gets merged into the main `AppContainer`. This enables clean separation of concerns and easy testing.

**Repository Pattern**: Data access is abstracted through repository interfaces, with implementations in `infra/database/repositories/`.

**Provider Pattern**: External services (Amadeus, OpenAI, SeatsAero, etc.) are wrapped in provider interfaces for consistent usage and easier mocking.

**TSOA Service Architecture**: Controllers are automatically generated from service classes decorated with TSOA annotations. Services ending in `*Service.ts` are automatically picked up for route generation.

### External Integrations

The application integrates with multiple external APIs:
- **Amadeus**: Flight search and booking data
- **OpenAI**: AI-powered travel planning
- **SeatsAero**: Flight seat availability
- **GeoNames**: Location and geographic data
- **TripAdvisor**: Travel content and reviews
- **Google Places**: Location search and details
- **SerpAPI**: Web scraping for travel data

### Database Schema

Key entities include:
- **User Management**: Users, roles, permissions with flexible RBAC
- **Location**: Cities, airports, and geographic data
- **Flights**: Search history and offer tracking
- **Radar**: Price monitoring for specific routes
- **Planner**: Trip planning with AI assistance

### Path Aliases

The project uses extensive TypeScript path mapping:
- `@src/*` → `./src/*`
- `@common/*` → `./src/common/*`
- `@modules/*` → `./src/modules/*`
- `@repositories/*` → Repository interfaces across modules
- `@providers/*` → External service providers

### Environment Configuration

Configuration is centralized in `src/config/` with Zod schema validation. All environment variables are defined in `env.example` and include:
- Database connection
- External API keys and endpoints
- Authentication secrets
- Email configuration
- Firebase credentials

### Docker Support

The application includes Docker support with automatic migration and seeding on startup via `entrypoint.sh`.
