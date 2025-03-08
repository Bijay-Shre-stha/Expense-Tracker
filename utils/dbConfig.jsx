import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon("postgresql://neondb_owner:kTQWNzu84gVF@ep-floral-brook-a5x3vv69.us-east-2.aws.neon.tech/Expense-Tracker?sslmode=require");
export const db = drizzle(sql, { schema });


