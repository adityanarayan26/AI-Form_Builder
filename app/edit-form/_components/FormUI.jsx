import React, { useEffect, useRef, useState } from 'react';
import { Radio, RadioGroup } from '@mui/joy';
import FormEdit from './FormEdit';
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { UserResponses } from '@/configs/schema';
import { db } from '@/configs';
import moment from 'moment';
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from '@/components/ui/toaster';

const FormUI = ({ formdata, selectedTheme, FormFieldUpdate, deleteField, style1, editable = true, formID = 0 }) => {
  const { toast } = useToast();
  const formRef = useRef(null);
  const [InputData, setInputData] = useState([]);

  const handleInputData = (e) => {
    const { name, value } = e.target;

    setInputData({
      ...InputData, [name]: value
    });
  };

  const handleSelectData = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...InputData, [name]: value
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const result = await db.insert(UserResponses).values({
      responses: InputData,
      createdAt: moment().format('DD/MM/yyyy'),
      FormRef:formID
    });

    if (result) {
      if (formRef.current) {
        formRef.current.reset();
      }
      toast({
        description: "Response Submitted Successfully!",
      });
    } else {
      toast({
        description: "Internal server error!",
      });
    }
  };

  return (
    <form ref={formRef} onSubmit={handleOnSubmit} className={` ${style1 && 'border-2 border-zinc-50'}  p-10 w-[35rem]`} data-theme={selectedTheme}>
      <h2 className='font-bold text-center text-2xl'>
        <Toaster />
        {formdata.formTitle}
      </h2>
      <h2 className='text-sm text-gray-700 text-center'>
        {formdata.formSubheading}
      </h2>
      <div>
        {formdata.formFields?.map((item, index) => (
          <div key={index} className='my-5 flex items-center gap-x-3'>
            <div className='w-full'>
              <h1 className='font-medium capitalize text-sm pb-1'>
                {item.fieldName}
              </h1>
              {item.fieldType === 'select' ? (
                <select name={item.fieldName} onChange={(e) => handleSelectData(e)} required={item?.fieldRequired || item?.required} defaultValue='' className='w-full rounded-md p-2 border bg-transparent'>
                  <option value="" disabled>Select an option</option>
                  {item.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : item.fieldType === 'radio' ? (
                <RadioGroup
                  defaultValue="outlined"
                  name={`radio-buttons-group-${index}`} // Add unique names for each RadioGroup
                  className=''
                >
                  <div className='flex gap-5 justify-around border rounded-lg p-4'>
                    {item.options.map((option) => (
                      <div key={option} className='flex items-center justify-center gap-1 p-2'>
                        <label className='font-medium text-sm'>{option.label || option} :</label>
                        <Radio
                          value={option.label || option} // Use label if available, otherwise fallback to option
                          label={option.label || option} // Use label if available, otherwise fallback to option
                          size="sm"
                          className='capitalize'
                          variant="solid"
                          required={formdata?.formFields.fieldRequired || item?.required}
                        />
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              ) : item.fieldType === 'checkbox' ? (
                <div className='flex gap-3 justify-center items-center'>
                  <input type={item.fieldType} required={item?.fieldRequired || item?.required} className="checkbox checkbox-info" />
                  <h1>{item.formLabel || item.label}</h1>
                </div>
              ) : item.fieldType === ('tel' || 'number') ? (
                <div>
                  <input name={item.fieldName} onChange={(e) => handleInputData(e)} className='mt-1 outline-none w-full rounded-md border-[1px] bg-transparent sm:text-sm p-2' placeholder={item.placeholder || item.placeholderName} type='number' />
                </div>
              ) : (
                <input name={item.fieldName} className='mt-1 outline-none w-full rounded-md border-[1px] bg-transparent sm:text-sm p-2'
                  onChange={(e) => handleInputData(e)}
                  placeholder={item.placeholder || item.placeholderName}
                  type={item.fieldType}
                  required={item?.fieldRequired || item?.required}
                />
              )}
            </div>
            {editable && <FormEdit defaultValue={item} editedForm={(value) => FormFieldUpdate(value, index)} deleteField={() => deleteField(index)} />}
          </div>
        ))}
        <SignedIn>
          <button className="btn btn-primary" type='submit'>Submit</button>
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <button className="btn btn-primary">Sign in</button>
          </SignInButton>
        </SignedOut>
      </div>
    </form>
  );
};

export default FormUI;
