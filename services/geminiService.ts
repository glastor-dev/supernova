import { Theme } from "../types";

export const generateThemeFromDescription = async (description: string): Promise<Theme> => {
  try {
    const response = await fetch("/api/generate-theme", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description }),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(`Gemini proxy failed (${response.status}): ${text || response.statusText}`);
    }

    return (await response.json()) as Theme;
  } catch (error) {
    console.error("Error generating theme:", error);
    throw error;
  }
};
