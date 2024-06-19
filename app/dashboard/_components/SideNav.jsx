"use client"

import { AreaChart, LibraryBig, MessageSquareQuote, ShieldPlus } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { JsonForms } from '@/configs/schema'
import { db } from '@/configs'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { Progress } from "@/components/ui/progress"


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
            name: 'Upgrade',
            icon: <ShieldPlus />,
            path: '/dashboard/setting'
        },
    ]
    return (
        <div className='min-h-screen bg-zinc-100 border shadow-sm pt-5'>
            <div className='p-5'>

                {menulist.map((item, index) => (
                    <Link href={item.path}><h2 key={index} className={`flex gap-3 mb-3  items-center hover:bg-black hover:text-zinc-100 p-5 rounded  cursor-pointer ${path == item.path && 'bg-primary text-zinc-100'}`}>{item.icon} {item.name}</h2></Link>
                ))}
            </div>
            <div className='flex flex-col items-center'>
                <Button className='bg-indigo-600 capitalize'> + create form</Button>
                <div className='my-10 px-5  '>
                <Progress value={percent} />

                    <div className='flex w-full justify-center items-center flex-col '>

                        <h2 className='text-sm text-gray-600 mt-2 capitalize'><strong>{formdata?.length}</strong> out of<strong> 3</strong> files created</h2>
                        <h2 className='text-sm text-gray-600 mt-2 capitalize'>upgrade your plan for unlimited ai form</h2>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SideNav
