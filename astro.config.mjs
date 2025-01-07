// @ts-check
import { defineConfig, envField } from "astro/config";

import db from "@astrojs/db";

import react from "@astrojs/react";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [db(), react()],
  adapter: netlify(),
  env: {
    schema: {
      ASTRO_HUGGING_CHAT_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
      ASTRO_HUGGING_FACE_CLIENT_ID: envField.string({
        context: "client",
        access: "public",
      }),
    },
  },
});
