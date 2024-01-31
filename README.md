# Drizzle Demo

Live example: https://drizzle-demo.vercel.app/

## Get Started:

1. Create a postgres DB and fill in the connection details in .env
2. Get your new DB in sync with your drizzle schema `bun run db:push`
3. Run the app in Dev mode `bun run dev`

## Running migrations

1. Create any necessary migrations if you have made changes to the schema by running `bun run db:generate`
2. Run the migrations `bun run db:migrate`