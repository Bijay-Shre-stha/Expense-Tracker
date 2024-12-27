"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import EmojiPicker from "emoji-picker-react"
import { useState } from "react"

const CreateBudget = () => {
    const [emojiIcon, setEmojiIcon] = useState('🙂')
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
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
                                        <Input placeholder="Example: Home, Finance" />
                                    </div>
                                    <div className="mt-3">
                                        <h2 className="text-black font-medium my-2">Budget Amount</h2>
                                        <Input placeholder="Example: Rs.1000" />
                                    </div>
                                    <Button className="mt-5 w-full">Create Budget</Button>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

            </div >
        </>
    )
}

export default CreateBudget
