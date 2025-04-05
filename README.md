# My MCP Server

A Model Context Protocol server implementation with GitHub API integration.

## Setup

1. Clone this repository
2. Copy `.env.example` to `.env` and fill in your GitHub token
3. Install dependencies: `npm install`
4. Build the project: `npm run build`
5. Start the server: `npm start`

## Development

For development with auto-reloading:

```
npm run dev
```

## Available Functions

This MCP server exposes the following GitHub operations:

- `searchRepositories`: Search for GitHub repositories
- `getRepoContents`: Get contents of a repository
- `createOrUpdateFile`: Create or update a file in a repository

## Adding New Functions

To add new GitHub operations, extend the `githubFunctions` object in `src/index.ts`.
