# System Patterns *Optional*

This file documents recurring patterns and standards used in the project.
It is optional, but recommended to be updated as the project evolves.
2025-08-05 15:41:55 - Initial system patterns documentation based on project structure analysis.

## Coding Patterns

**Error Handling with neverthrow**
- Use Result<T, Error> type for all async operations
- Pattern: `const result = await someOperation(); if (result.isErr()) { return result; }`
- Consistent error handling across the application

**TypeScript Best Practices**
- Strict typing with interfaces and types
- Generic types for reusable components
- Union types for flexible data structures
- Optional chaining and null safety

**Go Backend Patterns**
- Repository pattern for data access
- Handler functions for HTTP endpoints
- Middleware for cross-cutting concerns
- Struct tags for JSON serialization
- Error wrapping with context

## Architectural Patterns

**Frontend Architecture**
- Component-based design with clear separation
- Custom hooks for reusable logic
- Provider pattern for global state
- Navigation with Expo Router file-based routing

**Backend Architecture**
- Clean Architecture with DDD principles
- Dependency injection for testability
- Middleware composition for request processing
- Repository pattern for data abstraction

**API Design Patterns**
- RESTful endpoints with consistent naming
- JSON request/response format
- JWT authentication for protected routes
- Standardized error responses

## Testing Patterns

**Frontend Testing**
- React Testing Library for component tests
- Jest for unit tests and mocking
- Integration tests for API calls
- Visual regression testing for UI consistency

**Backend Testing**
- Go testing package with table-driven tests
- Mock repositories for unit tests
- Integration tests with test database
- Benchmarking for performance optimization
content>
<line_count>45</line_count>
</write_to_file>
2025-08-06 12:52:32 - Implemented React Query pattern for account creation with neverthrow error handling and modular architecture

2025-08-07 13:10:36 - Established pattern for API response interfaces with success/data/message structure and static service methods using ResultAsync with consistent error mapping