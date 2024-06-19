
import Popper from '@mui/material/Popper';

import { FilePenLine, Trash2Icon } from 'lucide-react'
import React, { useState } from 'react'
import { Button, Input } from '@mui/joy';

import AlertOnTrashIcon from '@/app/dashboard/_components/_mui_components/AlertOnTrashIcon';




const FormEdit = ({ defaultValue, editedForm, deleteField }) => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [FormName, setFormName] = useState(defaultValue?.fieldName)
    const [FormPlaceholder, setFormPlaceholder] = useState(defaultValue?.placeholderName || defaultValue.placeholder)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'transition-popper' : undefined;

    return (
        <div className='flex gap-2 '>
            <div className='text-gray-700  cursor-pointer '>
                <FilePenLine className='h-5 w-6' onClick={handleClick} />
                <Popper id={id} open={open} anchorEl={anchorEl}>

                    <div className='border border-indigo-800 p-5 rounded bg-zinc-50 flex flex-col gap-3 shadow-inner'>
                        <h1 className='capitalize text-lg font-semibold'>Edit form</h1>
                        <div>
                            <label htmlFor="" className='capitalize text-sm font-medium'>label name</label>
                            <Input value={FormName} onChange={(e) => setFormName(e.target.value)} placeholder={defaultValue.fieldName} className='p-3' />
                        </div>
                        <div>
                            <label htmlFor="" className='capitalize text-sm font-medium'>placeholder name</label>
                            <Input value={FormPlaceholder} onChange={(e) => setFormPlaceholder(e.target.value)} placeholder={defaultValue.placeholder || defaultValue.placeholderName} className='p-3' />
                        </div>
                        <Button onClick={() => {
                            editedForm({
                                FormPlaceholder: FormPlaceholder,
                                FormName: FormName,

                            }), setOpen((previousOpen) => !previousOpen)
                        }}>Update</Button>

                    </div>

                </Popper>
            </div>
            <div className='text-rose-700  cursor-pointer'>

                <AlertOnTrashIcon deleteField={deleteField} />
            </div>
        </div>
    )
}

export default FormEdit
