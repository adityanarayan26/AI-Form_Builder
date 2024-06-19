"use client"


import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'

import { and, desc, eq } from 'drizzle-orm'
import { EditIcon, Loader, Loader2, LoaderCircleIcon, Share2, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import './_mui_components/loader.css'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { RWebShare } from 'react-web-share'
import { usePathname } from 'next/navigation'

const AllFormlists = () => {
    const path = usePathname()
    const [formlist, setformlist] = useState([])
    const [loading, setloading] = useState(false)

    const { user } = useUser()

    useEffect(() => {
        if (user) {
            GetFormdata()
        }
    }, [user])

    const GetFormdata = async () => {
        setloading(true)
        const result = await db.select().from(JsonForms)
            .where(eq(JsonForms.createdBy, user?.primaryEmailAddress.emailAddress))
            .orderBy(desc(JsonForms.id))
        setformlist(result);
        setloading(false)
    }

    const DeleteForm = async (formId) => {
        await db.delete(JsonForms)
            .where(and(eq(JsonForms.id, formId), eq(JsonForms.createdBy, user?.primaryEmailAddress.emailAddress)))

        GetFormdata()
    }

    return (
        loading ?
            <div className='w-full h-full bg-zinc-300 flex justify-center items-center'>
                <div className="spinner center ">
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                </div>
            </div>
            :
            <div className='mt-10 '>
                {formlist?.map((item, index) => {
                    let jsonformdata = JSON.parse(item.jsonform)
                    return (

                        <div className="card w-96 glass mt-10 shadow-2xl">

                            <div className="card-body ">
                                <div className='w-full flex justify-end text-rose-500 cursor-pointer'>
                                    <AlertDialog>
                                        <AlertDialogTrigger><TrashIcon /></AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete your form
                                                    and remove your data from our servers.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => DeleteForm(item.id)}>Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                                <h2 className="card-title text-lg ">{jsonformdata.formTitle}</h2>
                                <p className='text-base font-light'>{jsonformdata.formSubheading}</p>
                                <div className="card-actions justify-end">
                                    <div className='w-full h-[1px] bg-zinc-700 my-3'></div>
                                    <div className='flex gap-4 w-full justify-end'>
                                        <Link href={'/edit-form/' + item.id}>
                                            <button className='btn text-zinc-50 bg-indigo-700 font-normal capitalize px-3 '>
                                                <EditIcon className='w-5 mr-1' />Edit
                                            </button>
                                        </Link>

                                        <RWebShare
                                            data={{
                                                text: jsonformdata.formSubheading,
                                                url: process.env.NEXT_PUBLIC_URL + '/Form/' + item?.id,
                                                title: jsonformdata.title,
                                            }}
                                            onClick={() => console.log("shared successfully!")}
                                        >
                                            <button className='btn text-zinc-50 bg-green-700 font-normal capitalize w-fit px-2'>
                                                <Share2 className='w-5 mr-1' /> Share
                                            </button>
                                        </RWebShare>

                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                })}
            </div >
    )
}

export default AllFormlists
