import { GoogleGenAI } from "@google/genai";
import type { APIRoute } from "astro";

const ai = new GoogleGenAI({ apiKey: import.meta.env.GEMINI_API_KEY });

// Datos de tu experiencia y trabajos (reemplaza con tu información real)
const experienciaLaboral = `
Soy un desarrollador web frontend & mobile con experiencia en react, react-native, nextjs, css, librerias componentes, laravel, firebase, MySQL, Supabase
He trabajado en proyectos como e-commerce, apps nativas radios y chats, dashboard y software a medida
Soy desarrollador de software frontend con más de 15 años de experiencia en la industria. Soy de Corrientes, Argentina. 
Mi enfoque principal ha sido siempre crear experiencias de usuario excepcionales a través de interfaces atractivas y funcionales. 
He trabajado con una variedad de tecnologías y herramientas, incluyendo React, React Native, Next.js, Tailwind y MUI, 
lo que me ha permitido desarrollar aplicaciones web y móviles innovadoras.
Dada mi experiencia mi seniority es Sr
Tengo conocimientos de base de datos MySQL, Supabase, Firebase, Supabase
Puedes ver más detalles de mis proyectos en mi portafolio: https://ezequielmendoza-dev.github.io/ezequiel.mendoza#projects
Puedes ver mi experiencia aqui: https://ezequielmendoza-dev.github.io/ezequiel.mendoza#experience
`;

const serviciosOfrecidos = `
Ofrezco servicios de desarrollo web front-end, back-end y full-stack.
Mis principales servicios incluyen:
- Desarrollo de sitios web a medida.
- Desarrollo de aplicaciones web.
- Desarrollo de aplicaciones mobiles
- Desarrollo de APIs.
- Mantenimiento y optimización de sitios web.
- Consultoría técnica para proyectos web.
Si tienes un proyecto en mente, no dudes en contactarme para discutir cómo puedo ayudarte.
`;

const informacionContacto = `
Puedes contactarme a través de los siguientes medios:
- Correo electrónico: ezequielmendoza.dev@gmail.com
- LinkedIn: https://www.linkedin.com/in/ezequiel-mendoza
- Instagrma: https://www.instagram.com/ezequielmendoza.dev/
Estoy disponible para discutir nuevas oportunidades y colaborar en proyectos interesantes.
`;
const skillsTools = `
React, Next.js, Tailwind, MUI, MySQL, Supabase, Firebase, React Native, Zustand, Context API, Axios, CSS, Git, GitHub, Javascript,
Typescript, HTML, Astro, CI/CD, PWA, Material UI, FCM, OneSignal, Pasarelas de Pago, Gemini AI, AWS, Trabajo en equipo, Inglés
`;
async function generarRespuesta(pregunta: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // Puedes probar con otros modelos según tus necesidades y presupuesto
      contents: `
        Eres un asistente virtual para un sitio web profesional de un desarrollador de software.
        Tu objetivo es responder preguntas de los visitantes sobre la experiencia laboral, los proyectos y los servicios ofrecidos por el desarrollador, con el fin de captar nuevos clientes.
        En caso que tus respuestas contengan enlaces externos, crear link para poder abrir la url en una nueva pestaña. No muestres la URL completa y resalta los enlaces en otro color
        Asegúrate de que la respuesta sea clara y concisa, evitando respuestas largas o complejas.
        Detecta el idioma en el que escribe el usuario y responde en el mismo idioma.
        **Formatea tu respuesta usando Markdown.**
        En caso que tus respuestas contengan enlaces externos, inclúyelos en formato Markdown para que sean clickables. Por ejemplo, en lugar de escribir "Visita mi portafolio en https://...", escribe "Visita mi portafolio en [Mi Portafolio](https://...)".
        Utiliza listas Markdown para enumerar elementos.
        Utiliza encabezados Markdown si es apropiado.
        Evita usar etiquetas HTML directamente en tu respuesta.        
        Utiliza la siguiente información para responder a las preguntas:

        --- Información del Desarrollador ---
        ${experienciaLaboral}

        --- Servicios Ofrecidos ---
        ${serviciosOfrecidos}

        --- Información de Contacto ---
        ${informacionContacto}

        --- Habilidades y Herramientas ---
        ${skillsTools}

        Pregunta del visitante: ${pregunta}

        Respuesta:
      `,
    });
    return response.text!;
  } catch (error) {
    console.error("Error al comunicarse con Gemini:", error);
    return "Lo siento, no pude procesar tu solicitud en este momento. Por favor, intenta de nuevo más tarde.";
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const preguntaUsuario = body.pregunta;

    if (!preguntaUsuario) {
      return new Response(
        JSON.stringify({ error: "Falta el parámetro 'pregunta'" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const respuestaAsistente = await generarRespuesta(preguntaUsuario);

    return new Response(JSON.stringify({ respuesta: respuestaAsistente }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
