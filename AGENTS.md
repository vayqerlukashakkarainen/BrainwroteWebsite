# Agent Guidelines for TranscribrWebsite

## Build/Test Commands
- `npm install` - Install dependencies
- `npm run dev` - Start development server with live reload on port 3050
- `npm start` - Start local server on port 3050
- `npm run build` - Build the project (copies assets, no compilation needed)
- `npm run deploy` - Deploy to GitHub Pages using gh-pages
- `npm run preview` - Preview the built site locally

## Code Style Guidelines

### General
- Follow existing code patterns and conventions in the codebase
- Check neighboring files for framework choices, naming patterns, and structure
- Never assume libraries are available - check package.json first

### Imports & Dependencies
- Group imports: external libraries first, then relative imports
- Use absolute imports when available (check tsconfig.json baseUrl/paths)
- Import only what you need, prefer named imports over default when possible

### TypeScript & Types
- Use strict TypeScript - enable all strict mode flags
- Prefer interfaces over types for object shapes
- Use proper return types for all functions
- Avoid `any` - use `unknown` or proper typing instead

### Naming Conventions
- camelCase for variables, functions, and properties
- PascalCase for components, classes, and types
- SCREAMING_SNAKE_CASE for constants
- kebab-case for file names and CSS classes

### Error Handling
- Use proper error boundaries in React applications
- Handle async operations with try/catch or .catch()
- Return Result types or throw meaningful errors with context
- Log errors with sufficient context for debugging

### Security
- Never commit secrets, API keys, or sensitive data
- Validate all user inputs and sanitize outputs
- Use environment variables for configuration