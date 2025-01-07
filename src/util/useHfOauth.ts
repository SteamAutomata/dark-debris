import { useState, useEffect } from "react";
import {
  oauthLoginUrl,
  oauthHandleRedirectIfPresent,
  type OAuthResult,
} from "@huggingface/hub";

export function useHfOauth() {
  const [oauthResult, setOauthResult] = useState<OAuthResult | null>(null);
  const [oauthloading, setLoading] = useState(true);
  const [oautherror, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleOAuth = async () => {
      try {
        setLoading(true);
        const result = await oauthHandleRedirectIfPresent();

        if (result) {
          setOauthResult(result);
        }
      } catch (err) {
        console.error("Error during OAuth:", err);
        setError("Une erreur s'est produite pendant l'authentification.");
      } finally {
        setLoading(false);
      }
    };

    handleOAuth();
  }, []);

  return { oauthResult, oauthloading, oautherror };
}
