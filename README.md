# MFE New Project - Module Federation Architecture

A modern Micro Frontend architecture using Webpack Module Federation with React 19.

## Project Structure

```
MFE_NewProject/
├── host/          # Main shell application (port 6000)
├── shared/        # Shared components MFE (port 6002)
├── products/      # Products remote MFE (port 6001)
├── orders/        # Orders remote MFE (port 6003)
└── customers/     # Customers remote MFE (port 6004)
```

## Architecture

- **Shared as MFE**: Common components, utilities, and theme exposed via Module Federation
- **Independent Dependencies**: Each MFE has its own node_modules
- **No NPM Packages**: Shared functionality loaded at runtime via federation

## Technology Stack

- React 19.2.3
- TypeScript 5.9.3
- Webpack 5 with Module Federation
- AG Grid for data tables
- Material-UI for components
- TanStack Query for data fetching
- React Router for navigation

## Getting Started

### Install All Dependencies

```bash
.\install-all.ps1
```

### Start All Applications

```bash
.\start-all.ps1
```

### Start Individual Applications

```bash
# Shared (must start first)
cd shared
npm start

# Host
cd host
npm start

# Remotes
cd products
npm start

cd orders
npm start

cd customers
npm start
```

## Ports

- Host: http://localhost:6000
- Shared: http://localhost:6002
- Products: http://localhost:6001
- Orders: http://localhost:6003
- Customers: http://localhost:6004

## Development

Each MFE is independently deployable and has its own:
- Dependencies
- Build configuration
- Dev server
- TypeScript configuration
