import React from 'react'
import BudgetList from './_components/BudgetList'

const BudgetPage = () => {
    return (
        <div className='p-10'>
            <h2 className="text-2xl font-semibold text-gray-800">My Budgets</h2>
            <BudgetList />
        </div>
    )
}

export default BudgetPage
