"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { db } from "@/utils/dbConfig";
import { ExtraExpense } from "@/utils/schema"; // import your schema
import { Loader } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    LineChart,
    Line,
} from "recharts";

const AddExtraExpense = () => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [monthlyExpenses, setMonthlyExpenses] = useState([]);

    const refreshData = async () => {
        const expenseList = await db.select().from(ExtraExpense);
        setExpenses(expenseList);
        groupExpensesByMonth(expenseList);
    };

    const groupExpensesByMonth = (expenseList) => {
        const grouped = expenseList.reduce((acc, expense) => {
            const month = moment(expense.createdAt, "DD/MM/YYYY").format("MMMM YYYY");
            if (!acc[month]) {
                acc[month] = { name: month, totalAmount: 0 };
            }
            acc[month].totalAmount += parseFloat(expense.amount);
            return acc;
        }, {});

        const monthlyData = Object.values(grouped);
        setMonthlyExpenses(monthlyData);
    };

    useEffect(() => {
        refreshData();
    }, []);

    const addNewExpense = async () => {
        setLoading(true);
        const result = await db
            .insert(ExtraExpense)
            .values({
                name,
                amount,
                createdAt: moment().format("DD/MM/YYYY"),
            })
            .returning({ insertedId: ExtraExpense.id });

        setAmount("");
        setName("");

        if (result) {
            setLoading(false);
            refreshData();
            toast({
                title: "Expense Added",
                description: "Your extra expense has been recorded successfully!",
            });
        }
        setLoading(false);
    };

    return (
        <div className="border p-5 rounded-lg">

            <div className="mt-2">
                <h2 className="text-black bold">Expense Name</h2>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Shopping" />
            </div>

            <div className="mt-2">
                <h2 className="text-black bold">Expense Amount</h2>
                <Input value={amount} type="number" onChange={(e) => setAmount(e.target.value)} placeholder="e.g., 2000" />
            </div>

            <Button onClick={addNewExpense} disabled={!(name && amount)} className="mt-3 w-full">
                {loading ? <Loader className="animate-spin" /> : "Add Expense"}
            </Button>

            {/* Expense List */}
            <div className="mt-5">
                <h2 className="font-bold text-lg">Your Extra Expenses</h2>
                {expenses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
                        {expenses.map((expense) => (
                            <div key={expense.id} className="p-4 bg-white shadow-lg rounded-lg border">
                                <h3 className="text-lg font-semibold">{expense.name}</h3>
                                <p className="text-gray-700">Rs. {expense.amount}</p>
                                <p className="text-sm text-gray-500">Date: {expense.createdAt}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No extra expenses added yet.</p>
                )}
            </div>

            {/* Bar Chart */}
            {expenses.length > 0 && (
                <div className="mt-8">
                    <h2 className="font-bold text-lg">Expense Overview</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={expenses}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="amount" fill="#F87171" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* Line Chart */}
            {monthlyExpenses.length > 0 && (
                <div className="mt-8">
                    <h2 className="font-bold text-lg">Expense Trend by Month</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyExpenses}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="totalAmount" stroke="#EF4444" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

export default AddExtraExpense;
