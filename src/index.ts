import { MCPServer } from '@anthropic-ai/mcp-server';
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize GitHub client
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Create MCP server
const server = new MCPServer({
  port: parseInt(process.env.PORT || '3000'),
  host: process.env.HOST || 'localhost',
});

// Define functions for GitHub operations
const githubFunctions = {
  // Search repositories
  searchRepositories: async ({ query, page = 1, perPage = 10 }) => {
    const result = await octokit.search.repos({
      q: query,
      page,
      per_page: perPage,
    });
    return result.data;
  },
  
  // Get repository contents
  getRepoContents: async ({ owner, repo, path = '' }) => {
    const result = await octokit.repos.getContent({
      owner,
      repo,
      path,
    });
    return result.data;
  },
  
  // Create or update file
  createOrUpdateFile: async ({ owner, repo, path, message, content, branch, sha }) => {
    const result = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message,
      content: Buffer.from(content).toString('base64'),
      branch,
      ...(sha ? { sha } : {}),
    });
    return result.data;
  }
};

// Register functions with the MCP server
Object.entries(githubFunctions).forEach(([name, fn]) => {
  server.registerFunction(name, fn);
});

// Start the server
server.start().then(() => {
  console.log(`MCP Server started on ${process.env.HOST || 'localhost'}:${process.env.PORT || '3000'}`);
});