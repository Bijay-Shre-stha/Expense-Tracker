"use client"
import React, { useEffect } from 'react'
import CreateBudget from './CreateBudget'
import { db } from '@/db'
import { eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '@/db/schema'

const BudgetList = () => {


    const getBudgetList = async () => {
        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend: sql`sum (${Expenses.amount})`.mapWith(Number),
            totalItem: sql`count (${Expenses.id})`.mapWith(Number)
        }).from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .groupBy(Budgets.id)
            .orderBy(Budgets.id)
        console.log(result)
    }

    useEffect(() => {
        getBudgetList()
    }, [])

    return (
        <div className='mt-6'>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <CreateBudget />

            </div>
        </div>
    )
}

export default BudgetList
