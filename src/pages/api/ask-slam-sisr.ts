import {
  oauthHandleRedirect,
  oauthHandleRedirectIfPresent,
  oauthLoginUrl,
} from "@huggingface/hub";
import { chatCompletion } from "@huggingface/inference";
import type { APIRoute } from "astro";
import { ASTRO_HUGGING_CHAT_TOKEN, getSecret } from "astro:env/server";

export const prerender = false;

export async function POST({ request }: { request: Request }) {
  const prompt = await request.text();

  if (!prompt) {
    return new Response("Ecris quelque chose!", { status: 400 });
  }
  if (prompt.length > 2048) {
    return new Response("Trop long!", { status: 400 });
  }

  const out = await chatCompletion({
    model: "mistralai/Mistral-7B-Instruct-v0.2",
    messages: [
      {
        role: "user",
        content: `
          "${prompt}"

          Est ce que cela relève du domaine du BTS SIO Option SLAM (Solution Logicielles Applications Métier) ou du BTS SIO Option SISR (Solutions d'Infrastructure, Systèmes et Réseaux) ?

          Répond de manière courte, concis en une seule phrase.
        `,
      },
    ],
    accessToken: ASTRO_HUGGING_CHAT_TOKEN,
    max_tokens: 128,
    temperature: 0.1,
    seed: 0,
  });

  const message = out.choices[0].message.content;

  if (!message) {
    return new Response("Aucune réponse ??", { status: 400 });
  }
  console.log(message);
  return new Response(message, { status: 200 });
}
