import {
  oauthHandleRedirect,
  oauthHandleRedirectIfPresent,
  oauthLoginUrl,
} from "@huggingface/hub";
import { chatCompletion } from "@huggingface/inference";
import type { APIRoute } from "astro";
import { ASTRO_HUGGING_CHAT_TOKEN, getSecret } from "astro:env/server";

export const prerender = false;

interface ScpFormData extends FormData {
  prompt: string;
  class: "Euclid" | "Keter" | "Safe";
}

const possibleClasses = new Set(["Euclid", "Keter", "Safe"]);

function GenerationFail(reason: string) {
  return Response.json(
    { reason: `Bad LLM response (${reason})` },
    { status: 500 }
  );
}

async function generateScp(request: Request, token: any) {
  const formData = (await request.formData()) as ScpFormData;

  const scpClass = formData.get("class") as String;
  const scpPrompt = formData.get("prompt") as String;

  console.log(scpClass);
  console.log(scpPrompt);

  if (typeof scpClass !== "string" || typeof scpPrompt !== "string") {
    return Response.json({ reason: "Inputs must be string" }, { status: 400 });
  }

  if (!scpClass || !scpPrompt) {
    return Response.json(
      { reason: "No class or prompt defined" },
      { status: 400 }
    );
  }
  if (!possibleClasses.has(scpClass)) {
    return Response.json(
      { reason: "Invalid containment class" },
      { status: 400 }
    );
  }
  if (scpPrompt.length > 2048) {
    return Response.json({ reason: "Too long" }, { status: 400 });
  }

  const out = await chatCompletion({
    model: "mistralai/Mistral-7B-Instruct-v0.2",
    messages: [
      {
        role: "user",
        content: `Create a ${scpClass} SCP entry based on this prompt: "${scpPrompt}" Format the response as JSON with the following structure: {
          "description": "Detailed description of the anomaly in markdown as a string",
          "procedures": "Special containement procedures in markdown as a string",
          "nickname": "The nickname of the anomaly as a string"
        }`,
      },
    ],
    accessToken: token,
    max_tokens: 2048,
    temperature: 0.1,
    seed: 0,
  });

  const message = out.choices[0].message.content;

  if (!message) {
    return GenerationFail("No answer");
  }

  try {
    const result = JSON.parse(message);
    console.log(result);
    if (
      !result["description"] ||
      !result["procedures"] ||
      !result["nickname"]
    ) {
      return GenerationFail("Doesn't match the structure asked");
    }

    return Response.json(result, { status: 500 });
  } catch (err) {
    console.warn(err);
    return GenerationFail(String(err));
  }
}

export async function POST({ request }: { request: Request }) {
  return Response.json(request);
  // return await generateScp(request, oauthResult.accessToken);
}
