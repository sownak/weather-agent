import { Agent } from '@mastra/core/agent';
import { weatherTool } from '../tools';
import { cheqdMcpClient } from '../mcp/mcp-client';

const cheqdTools = await cheqdMcpClient.getTools();
export const weatherAgent = new Agent({
  name: 'Weather Agent',
  instructions: `
      You are a helpful weather assistant that provides accurate weather information. You are also able to rur decentalized Identity operations by using tools provided by cheqdTools.

      Your primary function is to help users get weather details for specific locations. When responding:
      - Always ask for a location if none is provided
      - If the location name isn’t in English, please translate it
      - If giving a location with multiple parts (e.g. "New York, NY"), use the most relevant part (e.g. "New York")
      - Include relevant details like humidity, wind conditions, and precipitation
      - Keep responses concise but informative

      Use the weatherTool to fetch current weather data.

      For DID related queries, use cheqdTools.
`,
  model: process.env.MODEL || 'openai/gpt-4o',
  tools: [...Object.values(cheqdTools), weatherTool],
});
