'use client'

import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import { ArrowLeft, Share2, SquareArrowOutUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FormUI from '../_components/FormUI'

import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Controller from '../_components/Controller'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { RWebShare } from 'react-web-share'





const EditForm = ({ params }) => {
    const route = useRouter()
    const { user } = useUser()
    const [formdata, setformdata] = useState([])
    const [record, setrecord] = useState([])

    const [selectedBackground, setselectedBackground] = useState()

    const [selectedTheme, setselectedTheme] = useState('cupcake')

    useEffect(() => {
        user && Getformdata()
    }, [user])

    const Getformdata = async () => {


        const result = await db.select().from(JsonForms).where(and(eq(JsonForms.id, params?.formid), eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)))

        setrecord(result[0])
        setformdata((JSON.parse(result[0].jsonform)))
        setselectedBackground(result[0].GradientBG);
        setselectedTheme(result[0].theme);

    }
    const [updateTrigger, setupdateTrigger] = useState()

    useEffect(() => {
        setformdata(formdata)
        OnUpdateJsonFormInDb()
    }, [updateTrigger])

    const FormFieldUpdate = (value, index) => {
        formdata.formFields[index].fieldName = value.FormName
        formdata.formFields[index].placeholder = value.FormPlaceholder
        setupdateTrigger(Date.now())
        toast.success('Updated successfully !', {
            position: "top-center",
            autoClose: 200,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        });
    }

    const OnUpdateJsonFormInDb = async () => {
        const result = await db.update(JsonForms).set({
            jsonform: formdata
        }).where(and(eq(JsonForms.id, record.id), eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)))

    }

    const deleteField = (indexToRemove) => {
        const result = formdata.formFields.filter((item, index) => index != indexToRemove)
        formdata.formFields = result
        setupdateTrigger(Date.now())
        toast.success('Deleted successfully !', {
            position: "top-center",
            autoClose: 200,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        });
    }

    const updateControllerFields = async (value, columnName) => {
        try {
            toast.success('Applied', {
                position: "top-center",
                autoClose: 200,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Slide,
            });


            const result = await db.update(JsonForms).set({
                [columnName]: value
            }).where(and(eq(JsonForms.id, record.id), eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))).returning({ id: JsonForms.id })


        }
        catch (err) {
            console.error(err);
        }




    }



    const [style1, setstyle1] = useState()

    return (


        <div className='p-10'>
            <div className='w-full flex justify-between'>

                <div onClick={() => route.back()} className='flex w-fit h-fit  mb-10 gap-1 cursor-pointer hover:-translate-x-2 transition-transform duration-200 ease-linear'>
                    <ArrowLeft />
                    <h1 className=' capitalize font-medium '>back</h1>
                </div>
                <div className='flex gap-3 '>
                    <Link href={'/Form/' + record?.id} target='_blank'>
                        <Button className='capitalize flex gap-2 bg-rose-700 hover:bg-rose-900'> <SquareArrowOutUpRight className='h-5 w-5' />live preview</Button>
                    </Link>

                    <RWebShare
                        data={{
                            text: formdata.formSubheading,
                            url: process.env.NEXT_PUBLIC_URL + '/Form/' + record?.id,
                            title: formdata.title,
                        }}
                        onClick={() => console.log("shared successfully!")}
                    >
                        <Button className='bg-green-700 font-normal capitalize w-fit px-2'>
                            <Share2 className='w-5 mr-1' /> Share
                        </Button>
                    </RWebShare>

                </div>

            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                <div className='p-5 border  rounded-lg '>
                    <Controller style1={(e) => setstyle1(e)} selectedTheme={(value) => {
                        setselectedTheme(value)
                        updateControllerFields(value, 'theme')
                    }
                    }
                        selectedBackground={(value) => {
                            updateControllerFields(value, 'GradientBG')
                            setselectedBackground(value)
                        }}

                    />
                </div>

                <div className='md:col-span-2 border rounded-lg p-5 min-h-screen flex items-center justify-center' style={{ background: selectedBackground }}>
                    <FormUI style1={style1} formdata={formdata} selectedTheme={selectedTheme} FormFieldUpdate={FormFieldUpdate} deleteField={(index) => deleteField(index)} formID={record.id} />
                </div>

            </div>
            <ToastContainer stacked />
        </div>

    )
}

export default EditForm
