"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { db } from "@/db"
import { Budgets } from "@/db/schema"
import { useUser } from "@clerk/nextjs"
import EmojiPicker from "emoji-picker-react"
import { useState } from "react"
import { toast } from "sonner"

const CreateBudget = () => {
    const [emojiIcon, setEmojiIcon] = useState('🙂')
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)

    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')

    const { user } = useUser()

    const onCreateBudget = async () => {
        const result = await db.insert(Budgets)
            .values({
                name: name,
                amount: amount,
                icon: emojiIcon,
                createdBy: user?.primaryEmailAddress?.emailAddress || '',
            }).returning({
                insertedId: Budgets.id
            })
        if (result) {
            toast("Budget Created Successfully")
        }
    }

    return (
        <>
            <div className="bg-slate-300 p-10 rounded-md hover:shadow-md flex flex-col items-center justify-center space-x-4 border-2 border-dashed cursor-pointer">
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="flex flex-col items-center justify-center space-x-4">
                            <h2 className='text-3xl'>+</h2>
                            <h2 className='font-semibold'>Create New Budget</h2>
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Create New Budget
                            </DialogTitle>
                            <DialogDescription asChild>
                                <div className="mt-5">
                                    <Button variant={"outline"}
                                        className="text-lg"
                                        onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                                    >{emojiIcon}</Button>
                                    <div className="mt-3 absolute">
                                        <EmojiPicker
                                            open={openEmojiPicker}
                                            onEmojiClick={(emojiObject) => {
                                                setEmojiIcon(emojiObject.emoji)
                                                setOpenEmojiPicker(false)
                                            }}
                                        />
                                    </div>
                                    <div className="mt-3">
                                        <h2 className="text-black font-medium my-2">Budge Name</h2>
                                        <Input placeholder="Example: Home, Finance"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="mt-3">
                                        <h2 className="text-black font-medium my-2">Budget Amount</h2>
                                        <Input placeholder="Example: Rs.1000"
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                        />
                                    </div>

                                </div>
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button
                                    disabled={!(name && amount)}
                                    onClick={() => {
                                        onCreateBudget()
                                    }}
                                    className="mt-5 w-full">Create Budget</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div >
        </>
    )
}

export default CreateBudget
