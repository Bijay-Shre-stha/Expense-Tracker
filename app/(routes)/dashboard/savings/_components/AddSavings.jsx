"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { db } from "@/utils/dbConfig";
import { Savings } from "@/utils/schema";
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

function AddSavings() {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [savings, setSavings] = useState([]);
    const [monthlySavings, setMonthlySavings] = useState([]);

    const refreshData = async () => {
        const savingsList = await db.select().from(Savings);
        setSavings(savingsList);
        groupSavingsByMonth(savingsList);  // Group savings by month
    };

    const groupSavingsByMonth = (savingsList) => {
        // Group by month and calculate total savings per month
        const grouped = savingsList.reduce((acc, saving) => {
            const month = moment(saving.createdAt, "DD/MM/YYYY").format("MMMM YYYY");
            if (!acc[month]) {
                acc[month] = { name: month, totalAmount: 0 };
            }
            acc[month].totalAmount += parseFloat(saving.amount);
            return acc;
        }, {});

        // Convert to array and set monthly savings
        const monthlyData = Object.values(grouped);
        setMonthlySavings(monthlyData);
    };

    useEffect(() => {
        refreshData();
    }, []);

    // Add new savings entry
    const addNewSaving = async () => {
        setLoading(true);
        const result = await db
            .insert(Savings)
            .values({
                name,
                amount,
                createdAt: moment().format("DD/MM/YYYY"),
            })
            .returning({ insertedId: Savings.id });

        setAmount("");
        setName("");

        if (result) {
            setLoading(false);
            refreshData();
            toast({
                title: "Saving Added",
                description: "Your savings have been recorded successfully!",
            });
        }
        setLoading(false);
    };

    return (
        <div className="border p-5 rounded-lg">

            <div className="mt-2">
                <h2 className="text-black bold">Savings Name</h2>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Emergency Fund" />
            </div>

            <div className="mt-2">
                <h2 className="text-black bold">Savings Amount</h2>
                <Input value={amount} type="number" onChange={(e) => setAmount(e.target.value)} placeholder="e.g., 5000" />
            </div>

            <Button onClick={addNewSaving} disabled={!(name && amount)} className="mt-3 w-full">
                {loading ? <Loader className="animate-spin" /> : "Add Saving"}
            </Button>

            {/* Savings List - Enhanced UI */}
            <div className="mt-5">
                <h2 className="font-bold text-lg">Your Savings</h2>
                {savings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
                        {savings.map((saving) => (
                            <div key={saving.id} className="p-4 bg-white shadow-lg rounded-lg border">
                                <h3 className="text-lg font-semibold">{saving.name}</h3>
                                <p className="text-gray-700">Rs. {saving.amount}</p>
                                <p className="text-sm text-gray-500">Date: {saving.createdAt}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No savings added yet.</p>
                )}
            </div>

            {/* Bar Chart - Showing individual savings */}
            {savings.length > 0 && (
                <div className="mt-8">
                    <h2 className="font-bold text-lg">Savings Overview</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={savings}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="amount" fill="#4CAF50" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* Line Chart - Showing savings trend per month */}
            {monthlySavings.length > 0 && (
                <div className="mt-8">
                    <h2 className="font-bold text-lg">Savings Trend by Month</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlySavings}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}

export default AddSavings;
