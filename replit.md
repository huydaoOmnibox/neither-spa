# Full-Stack Express React Application

## Overview

This is a full-stack web application built with Express.js backend and React frontend, using TypeScript throughout. The application follows a modern development stack with Drizzle ORM for database operations, TanStack React Query for state management, and shadcn/ui for the component library.

## User Preferences

Preferred communication style: Simple, everyday language.
Design preferences: Pastel pink as primary color, modern web design with cute elements, eye-catching animations.
Project focus: Nail salon website for "Nails of the Netherlands Leeuwarden" with professional services and cute aesthetic.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Components**: shadcn/ui component library based on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **API Pattern**: RESTful APIs with `/api` prefix
- **Development**: Hot reloading with tsx in development mode

### Build System
- **Development**: Vite dev server with Express backend running simultaneously
- **Production**: Vite builds static assets, esbuild bundles the server
- **TypeScript**: Shared types between frontend and backend via `shared/` directory

## Key Components

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Connection**: Neon Database serverless connection
- **Schema**: Located in `shared/schema.ts` with Zod validation schemas
- **Migrations**: Managed through Drizzle Kit in `migrations/` directory

### API Layer
- **Storage Interface**: Abstract storage interface with in-memory implementation for development
- **Route Registration**: Centralized route registration in `server/routes.ts`
- **Error Handling**: Global error handler with proper HTTP status codes
- **Logging**: Request/response logging middleware for API endpoints

### Frontend Components
- **UI Library**: Complete shadcn/ui component set with customizable variants
- **Form Handling**: React Hook Form with Zod resolvers for validation
- **Responsive Design**: Mobile-first responsive design patterns
- **Toast Notifications**: Built-in toast system for user feedback

### Development Tools
- **Replit Integration**: Cartographer plugin for Replit development environment
- **Runtime Error Overlay**: Development error modal for better debugging
- **Type Safety**: Strict TypeScript configuration across the entire stack

## Data Flow

1. **Client Requests**: React components use TanStack React Query for API calls
2. **API Processing**: Express routes handle business logic and database operations
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **Response Handling**: Standardized JSON responses with proper error handling
5. **State Management**: React Query manages caching, background updates, and loading states

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL for production
- **Connection Pooling**: Built-in connection management through Neon serverless

### UI and Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography

### Development
- **Replit Platform**: Cloud development environment with hot reloading
- **TypeScript**: Type safety across frontend, backend, and shared code

## Deployment Strategy

### Development
- **Local Development**: Vite dev server proxies API requests to Express backend
- **Hot Reloading**: Both frontend and backend support hot reloading
- **Environment Variables**: DATABASE_URL required for database connection

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: esbuild bundles Express server to `dist/index.js`
- **Static Serving**: Express serves built frontend assets in production
- **Database Migrations**: Manual migration management through `npm run db:push`

### Architecture Decisions

1. **Monorepo Structure**: Single repository with client/, server/, and shared/ directories for easier development and type sharing
2. **In-Memory Storage**: Development uses in-memory storage for quick iteration, with easy migration to PostgreSQL for production
3. **API-First Design**: Clear separation between frontend and backend with RESTful API design
4. **Component Library**: shadcn/ui provides consistent, accessible components with customizable styling
5. **Type Safety**: Shared TypeScript types ensure consistency between frontend and backend data models