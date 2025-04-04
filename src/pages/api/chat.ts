import type { APIRoute } from "astro";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: import.meta.env.OPENAI_API_KEY });

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    if (!data.message) {
      return new Response(JSON.stringify({ error: "El mensaje está vacío." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Llamada a OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Eres un asistente que ayuda a los clientes de Ezequiel Mendoza a conocer sus servicios. Solo responde sobre desarrollo web y sus proyectos.`,
        },
        { role: "user", content: data.message },
      ],
    });

    return new Response(
      JSON.stringify({
        reply:
          response.choices[0]?.message?.content ||
          "No pude generar una respuesta.",
      }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error en la API de Chat:", error);
    return new Response(
      JSON.stringify({ error: "Hubo un problema al procesar la solicitud." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
