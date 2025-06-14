"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { db } from "@/utils/dbConfig";
import { ShareAndInvest } from "@/utils/schema";
import { Loader, Pencil, Save, X, Trash2 } from "lucide-react";
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
    const [allocated, setAllocated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [investments, setInvestments] = useState([]);
    const [monthlyInvestments, setMonthlyInvestments] = useState([]);

    // Edit State
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editAmount, setEditAmount] = useState("");
    const [editAllocated, setEditAllocated] = useState(false);

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
    }, [userId]);

    const addNewInvestment = async () => {
        if (!userId) return;

        setLoading(true);
        try {
            const result = await db
                .insert(ShareAndInvest)
                .values({
                    name,
                    amount,
                    createdAt: moment().format("DD/MM/YYYY"),
                    createdBy: userId,
                    allocated,
                })
                .returning({ insertedId: ShareAndInvest.id });

            setName("");
            setAmount("");
            setAllocated(false);

            if (result) {
                refreshData();
                toast({
                    title: "Investment Added",
                    description: "Your investment has been recorded successfully!",
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to add investment. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const startEdit = (item) => {
        setEditId(item.id);
        setEditName(item.name);
        setEditAmount(item.amount);
        setEditAllocated(item.allocated);
    };

    const cancelEdit = () => {
        setEditId(null);
        setEditName("");
        setEditAmount("");
        setEditAllocated(false);
    };

    const saveEditedInvestment = async (id) => {
        if (!userId) return;

        setLoading(true);
        try {
            await db
                .update(ShareAndInvest)
                .set({
                    name: editName,
                    amount: editAmount,
                    allocated: editAllocated
                })
                .where(eq(ShareAndInvest.id, id));

            cancelEdit();
            refreshData();
            toast({
                title: "Investment Updated",
                description: "Changes saved successfully!"
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update investment. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const deleteInvestment = async (id) => {
        if (!userId) return;

        setLoading(true);
        try {
            await db
                .delete(ShareAndInvest)
                .where(eq(ShareAndInvest.id, id));

            refreshData();
            toast({
                title: "Investment Deleted",
                description: "Investment has been removed successfully!",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete investment. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border p-5 rounded-lg">
            {/* Add New Investment Form */}
            <div className="mt-2">
                <h2 className="text-black font-bold">Investment Name</h2>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Tesla Stock, Mutual Fund"
                />
            </div>

            <div className="mt-2">
                <h2 className="text-black font-bold">Investment Amount</h2>
                <Input
                    value={amount}
                    type="number"
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g., 10000"
                />
            </div>

            <div className="mt-2 flex items-center gap-2">
                <input
                    type="checkbox"
                    id="allocated"
                    checked={allocated}
                    onChange={(e) => setAllocated(e.target.checked)}
                />
                <label htmlFor="allocated" className="text-black">Allocated</label>
            </div>

            <Button
                onClick={addNewInvestment}
                disabled={!(name && amount) || loading}
                className="mt-3 w-full"
            >
                {loading ? <Loader className="animate-spin" /> : "Add Investment"}
            </Button>

            {/* Investment List */}
            <div className="mt-5">
                <h2 className="font-bold text-lg">Your Investments</h2>
                {investments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
                        {investments.map((item) => (
                            <div key={item.id} className="p-4 bg-white shadow-lg rounded-lg border relative">
                                {editId === item.id ? (
                                    <>
                                        <Input
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            placeholder="Edit name"
                                            className="mb-2"
                                        />
                                        <Input
                                            value={editAmount}
                                            onChange={(e) => setEditAmount(e.target.value)}
                                            placeholder="Edit amount"
                                            type="number"
                                            className="mb-2"
                                        />
                                        <div className="mb-3 flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id={`edit-allocated-${item.id}`}
                                                checked={editAllocated}
                                                onChange={(e) => setEditAllocated(e.target.checked)}
                                            />
                                            <label htmlFor={`edit-allocated-${item.id}`} className="text-black text-sm">
                                                Allocated
                                            </label>
                                        </div>
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                size="sm"
                                                onClick={() => saveEditedInvestment(item.id)}
                                                disabled={loading}
                                            >
                                                {loading ? (
                                                    <Loader size={16} className="animate-spin mr-1" />
                                                ) : (
                                                    <Save size={16} className="mr-1" />
                                                )}
                                                Save
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={cancelEdit}
                                                disabled={loading}
                                            >
                                                <X size={16} className="mr-1" />
                                                Cancel
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                                <p className="text-gray-700 font-medium">Rs. {item.amount}</p>
                                                <p className="text-sm text-gray-500">Date: {item.createdAt}</p>
                                                <p className={`text-sm font-medium ${item.allocated ? "text-green-600" : "text-red-600"}`}>
                                                    {item.allocated ? "Allocated" : "Not Allocated"}
                                                </p>
                                            </div>
                                            <div className="flex gap-1">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() => startEdit(item)}
                                                    className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                                                    title="Edit investment"
                                                >
                                                    <Pencil size={16} />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() => deleteInvestment(item.id)}
                                                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    title="Delete investment"
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        </div>
                                    </>
                                )}
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
