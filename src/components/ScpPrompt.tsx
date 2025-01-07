import { oauthHandleRedirectIfPresent, oauthLoginUrl } from "@huggingface/hub";
import { useEffect } from "react";
import { useHfOauth } from "../util/useHfOauth";
import SignWithHuggingFace from "./SignWithHuggingFace";

export default function ScpPrompt() {
  const { oauthResult } = useHfOauth();

  let submitButton;
  if (oauthResult) {
    submitButton = (
      <>
        <input type="hidden" value={oauthResult?.accessToken} />
        <input type="submit" />
      </>
    );
  } else {
    submitButton = <SignWithHuggingFace />;
  }

  return (
    <form action="/api/submit-scp" method="post">
      <textarea name="prompt" required></textarea>
      <select name="class">
        <option value="Safe">Safe</option>
        <option value="Euclid">Euclid</option>
        <option value="Keter">Keter</option>
      </select>
      {submitButton}
    </form>
  );
}
