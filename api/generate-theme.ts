import { GoogleGenAI, Type } from "@google/genai";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Allow", "POST");
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method Not Allowed" }));
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Missing GEMINI_API_KEY on server" }));
    return;
  }

  const body = req.body;
  const description = isRecord(body) ? body.description : undefined;

  if (typeof description !== "string" || description.trim().length === 0) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Missing 'description'" }));
    return;
  }

  const safeDescription = description.trim().slice(0, 400);

  try {
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a high-end cinematic visualizer theme for this vibe: "${safeDescription}".\nRequirements:\n- Premium color palettes (e.g., deep purples, gold, electric cyan).\n- Sophisticated background gradients.\n- Smooth rotation speeds.\nReturn the configuration in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            primaryColor: { type: Type.STRING, description: "Main vibrant hex color" },
            secondaryColor: { type: Type.STRING, description: "Deep accent hex color" },
            particleCount: { type: Type.INTEGER, minimum: 100, maximum: 500 },
            glowIntensity: { type: Type.INTEGER, minimum: 20, maximum: 80 },
            barWidth: { type: Type.INTEGER },
            rotationSpeed: { type: Type.NUMBER },
            backgroundGradient: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "2 deep hex colors for the atmosphere",
            },
          },
          required: [
            "name",
            "primaryColor",
            "secondaryColor",
            "particleCount",
            "glowIntensity",
            "barWidth",
            "rotationSpeed",
            "backgroundGradient",
          ],
        },
      },
    });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(response.text);
  } catch (error: any) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        error: "Failed to generate theme",
        details: error?.message ?? String(error),
      })
    );
  }
}
