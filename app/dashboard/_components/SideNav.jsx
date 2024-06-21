"use client"

import { HandCoins, LibraryBig, MessageSquareQuote } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { JsonForms } from '@/configs/schema'
import { db } from '@/configs'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { Progress } from "@/components/ui/progress"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Textarea } from '@mui/joy'
import Button from '@mui/joy/Button';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"


const SideNav = () => {
    const path = usePathname()
    const [formdata, setformdata] = useState()
    const { user } = useUser()
    const [percent, setpercent] = useState()
    useEffect(() => {
        user && GetFormData()
    }, [user])
    const GetFormData = async () => {
        const result = await db.select().from(JsonForms).where(eq(JsonForms?.createdBy, user?.primaryEmailAddress?.emailAddress))
        setformdata(result)
        console.log(result)
        setpercent((result?.length / 3) * 100)
    }

    const menulist = [
        {
            id: 1,
            name: 'My Forms',
            icon: <LibraryBig />,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Responses',
            icon: <MessageSquareQuote />,
            path: '/dashboard/responses'
        },

        {
            id: 3,
            name: 'Pricing',
            icon: <HandCoins />,
            path: '/dashboard/setting'
        },
    ]

    const [open, setOpen] = React.useState(false);
    const [loading, setloading] = React.useState(false)
    const handleClickOpen = () => {
        setOpen(true);
    };
    const OnCreateForm = async () => {
        if (value === '') {

            toast({
                description: "Write an input to create form !",
            })
        }
        else {
            setloading(true)

            const result = await AiChatSession.sendMessage("Description" + value + PROMPT);
            console.log(result.response.text());
            if (result.response.text()) {
                const resp = await db.insert(JsonForms).values({
                    jsonform: result.response.text(),
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format("DD/MM/yyyy")
                }).returning({ id: JsonForms.id });
                console.log('new form id : ', resp[0].id);
                if (resp[0].id) {
                    route.push('/edit-form/' + resp[0].id)
                }
                setloading(false)
            }
            setloading(false)
        }
    }

    const handleClose = () => {
        setOpen(false);
        setvalue('')
    };

    const [value, setvalue] = React.useState('')

    return (
        <div className='min-h-screen bg-zinc-100 border shadow-sm pt-5'>
            <div className='p-5'>

                {menulist.map((item, index) => (
                    <Link href={item.path}><h2 key={index} className={`flex gap-3 mb-3  items-center hover:bg-black hover:text-zinc-100 p-5 rounded  cursor-pointer ${path == item.path && 'bg-primary text-zinc-100'}`}>{item.icon} {item.name}</h2></Link>
                ))}
            </div>
            <div className='flex flex-col items-center'>
                {formdata?.length == 3 ?
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger><Button className='cursor-not-allowed hover:bg-zinc-400'> + Create Form</Button></TooltipTrigger>
                            <TooltipContent className='select-none bg-indigo-700 text-white font-light'>
                                <p >Upgrade Subscription to create more ai forms✨</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    : < Button className='bg-indigo-600 capitalize' onClick={handleClickOpen}> + create form</Button>}

                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            const email = formJson.email;
                            console.log(email);
                            handleClose();
                        },
                    }}
                >
                    <DialogTitle>Create Form </DialogTitle>
                    <DialogContent className='w-[30rem] '>


                        <Textarea
                            minRows={5}
                            placeholder="write description for your form..."
                            variant="soft"
                            value={value}
                            onChange={(e) => setvalue(e.target.value)}
                            className='pt-3' />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} size="md" variant='soft' color="danger" >
                            Cancel
                        </Button>

                        <Button onClick={OnCreateForm} size="md" variant='soft' color="success">{loading ? <Loader2 className='animate-spin' /> : 'Create'}</Button>
                    </DialogActions>
                </Dialog>
                <div className='my-10 px-5  '>
                    <Progress value={percent} />

                    <div className='flex w-full justify-center items-center flex-col '>

                        <h2 className='text-sm text-gray-600 mt-2 capitalize'><strong>{formdata?.length}</strong> out of<strong> 3</strong> files created</h2>
                        <h2 className='text-sm text-gray-600 mt-2 capitalize'>upgrade your plan for unlimited ai form</h2>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default SideNav
