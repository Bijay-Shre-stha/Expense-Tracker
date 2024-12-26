import React from 'react'

const CreateBudget = () => {
    return (
        <>
            <div className="bg-slate-300 p-10 rounded-md hover:shadow-md flex flex-col items-center justify-center space-x-4 border-2 border-dashed cursor-pointer">
                <h2 className='text-3xl'>+</h2>
                <h2 className='font-semibold'>Create New Budget</h2>
            </div>
        </>
    )
}

export default CreateBudget
