import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./config/schema.tsx",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://account:2Ms6eIUNmHnK@ep-calm-river-a5i08u84.us-east-2.aws.neon.tech/ai-kids-story?sslmode=require',
  },
  verbose: true,
  strict: true,
})