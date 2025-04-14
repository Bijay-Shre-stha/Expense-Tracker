import React from 'react'
import AddExtraExpense from './_components/ExtraExpenses'
const page = () => {
    return (
        <div className='p-5'>
            <h1 className='font-bold text-3xl'>
                Insert Extra Expense
            </h1>
            <AddExtraExpense />
        </div>
    )
}

export default page
