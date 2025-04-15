import Link from 'next/link';
import React from 'react';

function BudgetItem({ budget }) {
  const calculateProgress = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    return Math.min(100, Math.max(0, perc.toFixed(2)));
  };

  const remaining = budget.amount - (budget.totalSpend || 0);
  const exceeded = remaining < 0;

  return (
    <Link href={`/dashboard/transactions/${budget?.id}`}>
      <div className="p-5 border rounded-2xl shadow-sm hover:shadow-lg transition duration-300 ease-in-out cursor-pointer bg-white h-auto">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-3xl p-3 px-4 bg-slate-100 rounded-full">
              {budget?.icon}
            </div>
            <div>
              <h2 className="font-bold text-lg sm:text-xl">{budget?.name}</h2>
              <p className="text-sm text-gray-500">{budget?.totalItem} Item</p>
            </div>
          </div>

          <div className="text-right">
            <h2 className="font-semibold text-lg text-primary">NRP. {budget?.amount}</h2>
          </div>
        </div>

        <div className="mt-4 space-y-1">
          <div className="flex justify-between text-xs sm:text-sm text-gray-500">
            <p>NRP. {budget?.totalSpend || 0} Spent</p>
            <p className={`${exceeded ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
              {exceeded
                ? `Exceeded by NRP. ${Math.abs(remaining)}`
                : `NRP. ${remaining} Remaining`}
            </p>
          </div>

          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
