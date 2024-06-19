"use client";

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs';
import { JsonForms, UserResponses } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import * as XLSX from 'xlsx';
import { Loader } from 'lucide-react';

const Page = () => {
    const { user } = useUser();
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(null); // Use null or form ID to track loading state

    useEffect(() => {
        if (user) {
            getFormData();
        }
    }, [user]);

    const getFormData = async () => {
        try {
            const result = await db.select().from(JsonForms).where(eq(JsonForms.createdBy, user.primaryEmailAddress.emailAddress));
            setFormData(result);
        } catch (error) {
            console.error("Error fetching form data:", error);
        }
    };

    const getResponse = async (formId, formTitle) => {
        const jsonDATA = [];
        setLoading(formId);
        try {
            const result = await db.select().from(UserResponses).where(eq(UserResponses.FormRef, formId));
            if (result) {
                result.forEach((item) => {
                    jsonDATA.push(item.responses);
                });
            }
            exportData(jsonDATA, formTitle);
        } catch (error) {
            console.error("Error fetching responses:", error);
        } finally {
            setLoading(null);
        }
    };

    const exportData = (jsonDATA, formTitle) => {
        const worksheet = XLSX.utils.json_to_sheet(jsonDATA);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
        XLSX.writeFile(workbook, `${formTitle}.xlsx`);
    };

    return (
        <div className='min-h-screen w-full p-10 bg-zinc-300'>
            <h1 className='font-bold text-3xl capitalize'>responses</h1>
            {formData?.map((item, index) => {
                const data = JSON.parse(item.jsonform);
                return (
                    <div key={index} className="card w-96 glass mt-10 shadow-2xl">
                        <div className="card-body">
                            <h2 className="card-title">{data.formTitle}</h2>
                            <p>{data.formSubheading}</p>
                            <div className="card-actions flex items-center justify-between">
                                <h1><strong>45 </strong>Responses</h1>
                                <button
                                    className="btn btn-primary w-20"
                                    onClick={() => getResponse(item.id, data.formTitle)}
                                    disabled={loading === item.id}
                                >
                                    {loading === item.id ? (
                                        <Loader className='animate-spin text-zinc-900' />
                                    ) : 'export'}
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Page;
