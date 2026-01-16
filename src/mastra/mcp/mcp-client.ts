import { MCPClient } from "@mastra/mcp";

const MCP_SERVER_URL = process.env.MCP_SERVER_URL || "http://localhost:3001/mcp";

export const cheqdMcpClient = new MCPClient({
  id: "cheqd-mcp-client",
  servers: {
    cheqd: {
      url: new URL(MCP_SERVER_URL),
    },
  },
});

// Receiver tools that the weather agent should have access to
export const RECEIVER_TOOL_NAMES = [
  "create-did",
  "list-did",
  "resolve-did",
  "accept-connection-invitation-didcomm",
  "list-connections-didcomm",
  "get-connection-record-didcomm",
  "accept-credential-offer",
  "list-credentials",
  "get-credential-record",
  "list-credential-exchange-records",
  "accept-proof-request",
  "list-proofs",
  "get-proof-record",
];

// Server name prefix used by MCPClient
const MCP_SERVER_NAME = "cheqd";

export async function getReceiverTools() {
  const allTools = await cheqdMcpClient.getTools();

  const filteredTools: Record<string, typeof allTools[string]> = {};

  // Create set of prefixed tool names for fast lookup
  const allowedToolNames = new Set(
    RECEIVER_TOOL_NAMES.map(name => `${MCP_SERVER_NAME}_${name}`)
  );

  for (const [name, tool] of Object.entries(allTools)) {
    if (allowedToolNames.has(name)) {
      filteredTools[name] = tool;
    }
  }

  console.log('[MCP Client] Loaded receiver tools:', Object.keys(filteredTools));
  return filteredTools;
}