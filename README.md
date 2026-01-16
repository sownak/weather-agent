# Weather Agent

A weather agent built with the Mastra framework that provides weather information and supports decentralized identity (DID) operations via cheqd MCP tools.

## Features

- **Weather Information**: Get current weather for any location using the Open-Meteo API
- **DID Operations**: Create and manage decentralized identifiers on cheqd network
- **Credential Management**: Accept credentials, respond to proof requests, and manage connections

## Prerequisites

- Node.js 20+
- Docker and Docker Compose
- pnpm (or npm)
- Access to the `mcp-toolkit` repository (should be at `../mcp-toolkit`)

## Running Locally

### 1. Start the Local MCP Server

The weather agent connects to a local MCP server for DID operations. Start it using Docker:

```bash
# From the weather-agent directory
docker compose up -d

# Check logs to ensure it's running
docker compose logs -f

# Wait for the server to be healthy (~60 seconds)
```

The MCP server will be available at `http://localhost:3001/mcp`.

### 2. Configure Environment Variables

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
# Required: Your Anthropic API key (or OpenAI if using GPT models)
ANTHROPIC_API_KEY=your-api-key-here

# Model to use (default: openai/gpt-4o)
MODEL=anthropic/claude-opus-4-5

# MCP Server URL (default points to local Docker server)
MCP_SERVER_URL=http://localhost:3001/mcp

# Cheqd wallet mnemonic for DID operations
CHEQD_MNEMONIC=your-mnemonic-phrase-here
```

### 3. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 4. Run the Agent

```bash
pnpm dev
# or
npm run dev
```

## Available Tools

### Weather Tool
- `get-weather`: Get current weather for a location (temperature, humidity, wind, conditions)

### DID Tools (prefixed with `cheqd_`)
- `cheqd_create-did`: Create a new DID on cheqd network (testnet/mainnet)
- `cheqd_list-did`: List all DIDs in your wallet
- `cheqd_resolve-did`: Resolve a DID document

### Connection Tools
- `cheqd_accept-connection-invitation-didcomm`: Accept DIDComm connection invitations
- `cheqd_list-connections-didcomm`: List your connections
- `cheqd_get-connection-record-didcomm`: Get connection details

### Credential Tools
- `cheqd_accept-credential-offer`: Accept credential offers
- `cheqd_list-credentials`: List your credentials
- `cheqd_get-credential-record`: Get credential details

### Proof Tools
- `cheqd_accept-proof-request`: Respond to proof requests
- `cheqd_list-proofs`: List proof exchanges
- `cheqd_get-proof-record`: Get proof details

## DID Initialization

On first startup, the agent automatically:
1. Checks if a DID already exists in the wallet
2. If no DID exists, creates a new one on the cheqd testnet

## Stopping the MCP Server

```bash
docker compose down
```

## Troubleshooting

### MCP Server not connecting
- Ensure Docker is running
- Check that port 3001 is not in use
- Verify the `MCP_SERVER_URL` in `.env` matches the Docker port

### DID operations failing
- Ensure `CHEQD_MNEMONIC` is set correctly in `.env`
- Check the MCP server logs: `docker compose logs mcp-server`

## Project Structure

```
weather-agent/
├── src/mastra/
│   ├── agents/index.ts    # Weather agent definition
│   ├── mcp/mcp-client.ts  # MCP client configuration
│   ├── tools/index.ts     # Weather tool implementation
│   └── workflows/index.ts # Weather workflow
├── docker-compose.yml     # Local MCP server setup
└── .env                   # Environment configuration
```
