import React, { useState } from 'react';
import Theme from './Theme';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import GradientBg from './GradientBg';



const Controller = ({ selectedTheme, selectedBackground, style1 }) => {

    const [showMore, setShowmore] = useState(6)

    const Style = [
        {
            name: 'style1'
        },
        {
            name: 'style2'
        },
        {
            name: 'style3'
        },
    ]

    return (
        <div>
            {/* background theme */}
            <h2 className='font-medium pb-2'>Select Theme</h2>
            <Select onValueChange={(value) => selectedTheme(value)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Themes" />
                </SelectTrigger>
                <SelectContent>
                    {Theme.map((item, id) => (
                        <SelectItem value={item} key={id}>{item}</SelectItem>
                    ))}

                </SelectContent>
            </Select>

            {/* gradient bg */}
            <h2 className='font-medium pb-2 mt-10'>Select Background Theme</h2>
            <div className='grid grid-cols-3 gap-2'>
                {
                    GradientBg.map((item, id) => (id < showMore) && (
                        <>
                            <div key={id} onClick={() => selectedBackground(item.gradient)} className='w-full h-20 font-medium hover:border-2 cursor-pointer border-zinc-900 rounded-md flex items-center justify-center' style={{ background: item.gradient }}>{id == 0 && 'None'}</div>
                        </>
                    ))
                }



            </div>
            <button className='btn mt-3 w-full btn-accent' onClick={() => setShowmore(showMore > 6 ? 6 : 20)}>{showMore > 6 ? 'show less' : 'show more'}</button>


            {/* style */}

            <div>
                <h2 className='font-medium pb-2 mt-10 capitalize '>style</h2>
                <div className='flex flex-wrap gap-5 w-full justify-start pl-4 pt-4 '>
                    {Style.map((item, id) => (
                        id == 1 ? <div className="box bg-gray-400 rounded-md h-28 w-[8vw] relative cursor-pointer" onClick={() => style1(true)}>
                            <div className='absolute bg-zinc-100 right-0 top-0 h-1/2 w-1/2 border-l-2 rounded-bl-md border-b-2 border-zinc-900'>

                            </div>
                        </div> :
                            <div key={id} className="box bg-gray-400 rounded-md h-28 w-[8vw] relative cursor-pointer"></div>
                    ))}
                </div>
            </div>



        </div>
    );
};

export default Controller;
