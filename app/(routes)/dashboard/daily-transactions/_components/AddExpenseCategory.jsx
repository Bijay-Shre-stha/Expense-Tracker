import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { db } from '@/utils/dbConfig';
import { Budgets, Transactions } from '@/utils/schema';
import { Loader } from 'lucide-react';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';

function AddExpenseCategory({ user }) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [budgetId, setBudgetId] = useState('');
    const [loading, setLoading] = useState(false);
    const [budgets, setBudgets] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const refreshData = async () => {
        const budgetList = await db.select().from(Budgets);
        setBudgets(budgetList);
        const transactionList = await db.select().from(Transactions);
        setTransactions(transactionList);
    };

    useEffect(() => {
        refreshData();
    }, []);

    const getRemainingAmount = (budget) => {
        const totalSpent = transactions
            .filter(transaction => transaction.budgetId === budget.id)
            .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
        return budget.amount - totalSpent;
    };

    // Add new transaction
    const addNewTransaction = async () => {
        setLoading(true);
        const result = await db.insert(Transactions).values({
            name,
            amount,
            budgetId,
            createdAt: moment().format('DD/MM/YYYY'),
        }).returning({ insertedId: Transactions.id });

        setAmount('');
        setName('');
        setBudgetId('');
        
        if (result) {
            setLoading(false);
            refreshData();
            toast({
                title: "Transaction Added",
                description: "Success!",
            });
        }
        setLoading(false);
    };

    return (
        <div className='border p-5 rounded-lg'>
            <h2 className='font-bold text-lg'>Add Transactions</h2>
            
            <div className='mt-2'>
                <h2 className='text-black bold'>Select Budget Category</h2>
                <Select value={budgetId} onValueChange={setBudgetId}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a budget category" />
                    </SelectTrigger>
                    <SelectContent>
                        {budgets.map((budget) => (
                            <SelectItem key={budget.id} value={budget.id.toString()}>
                                {budget.name} - Remaining: Rs. {getRemainingAmount(budget)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className='mt-2'>
                <h2 className='text-black bold'>Transaction Name</h2>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="eg. First Semester" />
            </div>
            
            <div className='mt-2'>
                <h2 className='text-black bold'>Transaction Amount</h2>
                <Input value={amount} type="number" onChange={(e) => setAmount(e.target.value)} placeholder="eg. 200000" />
            </div>
            
            <Button onClick={addNewTransaction} disabled={!(name && amount && budgetId)} className="mt-3 w-full">
                {loading ? <Loader className='animate-spin' /> : "Add Transaction"}
            </Button>
        </div>
    );
}

export default AddExpenseCategory;
