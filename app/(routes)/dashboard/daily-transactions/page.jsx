"use client"
import React from 'react'
import AddExpenseCategory from './_components/AddExpenseCategory'
import { useUser } from '@clerk/nextjs'

const DailyTransaction = () => {
  const authUser = useUser()
  return (
    <div className='p-5'>
      <h1 className='font-bold text-3xl'>
        Insert Daily Expense on Your Category Budget
      </h1>
      <AddExpenseCategory />
    </div>
  )
}

export default DailyTransaction
