'use client'

import FormUI from '@/app/edit-form/_components/FormUI';
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import { eq } from 'drizzle-orm'
import { Loader2, LoaderCircle, LoaderCircleIcon } from 'lucide-react';
import { Button } from '@mui/joy';


const LiveAiForm = ({ params }) => {
    const { user } = useUser()
    const [record, setrecord] = useState()
    const [formdata, setformdata] = useState([])
    useEffect(() => {
        user && GetFormData()

    }, [user])
    const GetFormData = async () => {
        const result = await db.select()
        .from(JsonForms)
        .where(
          
          eq(JsonForms.id, Number(params?.formid))
        );
      

        setrecord(result[0]);
        setformdata(JSON.parse(result[0].jsonform))

    }

    GetFormData()
    return (

        record ?

            <div className='min-h-screen w-full flex justify-center items-center p-5' style={{ background: record?.GradientBG }
            } >

                <FormUI formdata={formdata} selectedTheme={record?.theme} FormFieldUpdate={() => console.log} deleteField={() => console.log} editable={false} />
            </div >

            :

            <div className='h-screen w-full flex justify-center items-center bg-zinc-700'>
                <Loader2 className='animate-spin text-zinc-50 h-10 w-10' />

            </div>





    )
}

export default LiveAiForm
