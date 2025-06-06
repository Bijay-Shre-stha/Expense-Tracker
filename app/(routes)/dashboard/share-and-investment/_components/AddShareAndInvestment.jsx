"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { db } from "@/utils/dbConfig";
import { ShareAndInvest } from "@/utils/schema";
import { Loader } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
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
import { eq } from "drizzle-orm";

function AddShareAndInvestment() {
    const { user } = useUser();
    const userId = user?.primaryEmailAddress?.emailAddress;
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [investments, setInvestments] = useState([]);
    const [monthlyInvestments, setMonthlyInvestments] = useState([]);

    const refreshData = async () => {
        if (!userId) return;

        const list = await db
            .select()
            .from(ShareAndInvest)
            .where(eq(ShareAndInvest.createdBy, userId))
            .orderBy(ShareAndInvest.createdAt, "desc");

        setInvestments(list);
        groupInvestmentsByMonth(list);
    };

    const groupInvestmentsByMonth = (list) => {
        const grouped = list.reduce((acc, item) => {
            const month = moment(item.createdAt, "DD/MM/YYYY").format("MMMM YYYY");
            if (!acc[month]) {
                acc[month] = { name: month, totalAmount: 0 };
            }
            acc[month].totalAmount += parseFloat(item.amount);
            return acc;
        }, {});
        setMonthlyInvestments(Object.values(grouped));
    };

    useEffect(() => {
        refreshData();
    }, []);

    const addNewInvestment = async () => {
        if (!userId) return;

        setLoading(true);
        const result = await db
            .insert(ShareAndInvest)
            .values({
                name,
                amount,
                createdAt: moment().format("DD/MM/YYYY"),
                createdBy: userId,
            })
            .returning({ insertedId: ShareAndInvest.id });

        setName("");
        setAmount("");
        setLoading(false);

        if (result) {
            refreshData();
            toast({
                title: "Investment Added",
                description: "Your investment has been recorded successfully!",
            });
        }
    };

    return (
        <div className="border p-5 rounded-lg">
            <div className="mt-2">
                <h2 className="text-black bold">Investment Name</h2>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Tesla Stock, Mutual Fund" />
            </div>

            <div className="mt-2">
                <h2 className="text-black bold">Investment Amount</h2>
                <Input value={amount} type="number" onChange={(e) => setAmount(e.target.value)} placeholder="e.g., 10000" />
            </div>

            <Button onClick={addNewInvestment} disabled={!(name && amount)} className="mt-3 w-full">
                {loading ? <Loader className="animate-spin" /> : "Add Investment"}
            </Button>

            <div className="mt-5">
                <h2 className="font-bold text-lg">Your Investments</h2>
                {investments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
                        {investments.map((item) => (
                            <div key={item.id} className="p-4 bg-white shadow-lg rounded-lg border">
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <p className="text-gray-700">Rs. {item.amount}</p>
                                <p className="text-sm text-gray-500">Date: {item.createdAt}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No investments added yet.</p>
                )}
            </div>

            {/* Bar Chart */}
            {investments.length > 0 && (
                <div className="mt-8">
                    <h2 className="font-bold text-lg">Investment Overview</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={investments}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="amount" fill="#007bff" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* Line Chart */}
            {monthlyInvestments.length > 0 && (
                <div className="mt-8">
                    <h2 className="font-bold text-lg">Investment Trend by Month</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyInvestments}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="totalAmount" stroke="#ff9800" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}

export default AddShareAndInvestment;
