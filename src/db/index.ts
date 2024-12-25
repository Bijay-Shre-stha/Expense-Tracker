// import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { config } from 'dotenv';
config({ path: '.env' });

const sql = "postgresql://neondb_owner:kTQWNzu84gVF@ep-floral-brook-a5x3vv69.us-east-2.aws.neon.tech/Expense-Tracker?sslmode=require"

export const db = drizzle(sql);
