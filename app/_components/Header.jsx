"use client"
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Button from '@mui/joy/Button';

import { usePathname } from 'next/navigation'



export const Header = () => {
    const {isSignedIn } = useUser()
    const path = usePathname()

    return !path.includes('Form') && (
        <div className='h-20 w-full' >
            <div className='flex  justify-between h-full w-full items-center px-8 shadow-lg '>
                <Link href={'/'}>
                    <div className='flex items-center gap-2'>
                        <Image src={'/logo.svg'} width={30} height={10} />
                        <h1>AI FORM BUILDER</h1>
                    </div>
                </Link>
                <div>
                    {
                        isSignedIn ?
                            <div className='flex items-center gap-5'>
                                <Link href={'/dashboard'}> <Button variant='soft' className='capitalize font-medium text-base'>Dashboard</Button>
                                </Link>

                                <UserButton />

                            </div> : <SignInButton>

                                <button className="rounded px-3 py-2 font-medium font-sans hover:text-zinc-100 transition-colors duration-200 linear bg-[#99b2cc] text-zinc-800">Get Started </button>
                            </SignInButton>

                    }


                </div>
            </div>
        </div>
    )
}
