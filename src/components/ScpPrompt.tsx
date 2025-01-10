import { oauthHandleRedirectIfPresent, oauthLoginUrl } from "@huggingface/hub";
import { useEffect } from "react";
import { useHfOauth } from "../util/useHfOauth";
import SignWithHuggingFace from "./SignWithHuggingFace";
import SubmitButton from "../layouts/SubmitButton.astro";

export default function ScpPrompt() {
  const { oauthResult } = useHfOauth();

  let submitButton;
  if (oauthResult) {
    submitButton = (
      <>
        <input type="hidden" value={oauthResult?.accessToken} />
        <SubmitButton />
      </>
    );
  } else {
    submitButton = <SignWithHuggingFace />;
  }

  return (
    <form
      action="/api/submit-scp"
      method="post"
      className="flex flex-col gap-3 p-8"
    >
      <textarea
        name="prompt"
        className="border-opacity-50 border border-indigo-800 rounded-sm"
        required
      />
      <select name="class" className="p-2 rounded-md">
        <option value="Safe">Safe</option>
        <option value="Euclid">Euclid</option>
        <option value="Keter">Keter</option>
      </select>
      {submitButton}
    </form>
  );
}
