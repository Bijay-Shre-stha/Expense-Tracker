import { eq } from "drizzle-orm";
import { db } from "../index";
import { Budgets } from "../schema";

export async function checkUserBudget (userPromise:Promise<{ primaryEmailAddress: { emailAddress: string }}>){
    const user = await userPromise;
        await db.select()
    .from(Budgets)
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
}