import {  integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const Budgets = pgTable('budgets', {
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    amount:varchar('amount').notNull(),
    icon:varchar('icon'),
    createdBy: varchar('created_by').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const Expenses = pgTable('expenses', {
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    amount:varchar('amount').notNull().default('0'),
    budgetId:integer('budget_id').references(()=>Budgets.id),
    createdAt: varchar('created_at').notNull(),
})

export type Budget = typeof  Budgets.$inferInsert;
export type Expense = typeof  Expenses.$inferInsert;