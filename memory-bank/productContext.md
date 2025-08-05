# Product Context

This file provides a high-level overview of the project and the expected product that will be created. Initially it is based upon projectBrief.md (if provided) and all other available project-related information in the working directory. This file is intended to be updated as the project evolves, and should be used to inform all other modes of the project's goals and context.
2025-08-05 15:41:13 - Initial Memory Bank creation based on project structure analysis.

## Project Goal

TrackMate is a financial tracking application designed to help users manage their personal finances. The application consists of a React Native frontend and a Go backend, providing a comprehensive solution for financial management.

## Key Features

- **User Authentication**: Integration with Auth0 for secure user authentication
- **Financial Tracking**: Core functionality for tracking income, expenses, and transactions
- **Account Management**: Users can create and manage multiple financial accounts
- **Budget Management**: Tools for setting and monitoring budgets
- **Financial Insights**: Analytics and visualizations to help users understand their financial patterns
- **Goal Setting**: Ability to set and track financial goals
- **Category Management**: Organize transactions by categories
- **Multi-platform Support**: Native mobile applications for iOS and Android

## Overall Architecture

**Frontend (React Native)**:
- Built with Expo and React Native
- Uses Expo Router for navigation
- Styled with TailwindCSS and NativeWind
- UI components from Gluestack UI
- State management with Zustand
- Data fetching with TanStack Query
- Form handling with React Hook Form and Zod validation
- Authentication via Auth0

**Backend (Go)**:
- RESTful API built with Gin framework
- MongoDB database for data persistence
- JWT-based authentication middleware
- Clean architecture with domain-driven design
- Structured into layers: domain, infrastructure, use case, and application
- Modular design with clear separation of concerns

**Technology Stack**:
- Frontend: React Native, Expo, TypeScript, TailwindCSS
- Backend: Go, Gin, MongoDB
- Authentication: Auth0
- State Management: Zustand, TanStack Query
- UI: Gluestack UI components