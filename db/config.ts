import { column, defineDb, defineTable } from "astro:db";

const ScpBase = {
  text: column.text(),
  class: column.text(),
  title: column.text(),
};

const ScpDraft = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    prompt: column.text(),
    ...ScpBase,
  },
});

const ScpDescription = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    ...ScpBase,
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { ScpDraft, ScpDescription },
});
