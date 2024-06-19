
import AllFormlists from './_components/AllFormlists'
import FormDialog from './_components/_mui_components/FormDialog'
import React from 'react'

const page = () => {

  return (
    <div className='p-10 w-full bg-zinc-200 min-h-[92vh]'>

      <div className='font-bold text-3xl capitalize  '>
        <h1 className='flex justify-between items-center'>
          dashboard
          <FormDialog />
        </h1>

        <AllFormlists />
      </div>



    </div>
  )
}

export default page
