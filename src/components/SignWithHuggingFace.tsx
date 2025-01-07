import { oauthLoginUrl } from "@huggingface/hub";
import { ASTRO_HUGGING_FACE_CLIENT_ID } from "astro:env/client";

export default function SignWithHuggingFace() {
  return (
    <img
      src="https://huggingface.co/datasets/huggingface/badges/resolve/main/sign-in-with-huggingface-xl-dark.svg"
      alt="Sign in with Hugging Face"
      style={{ cursor: "pointer" }}
      onClick={async () => {
        window.location.href = await oauthLoginUrl({
          clientId: ASTRO_HUGGING_FACE_CLIENT_ID,
        }); // + "&prompt=consent";
      }}
    />
  );
}
