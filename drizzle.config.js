/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.jsx",
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://neondb_owner:kTQWNzu84gVF@ep-floral-brook-a5x3vv69.us-east-2.aws.neon.tech/Expense-Tracker?sslmode=require",
  }
};
