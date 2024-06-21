
"use client";

import { Button } from '@/components/ui/button';
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Link from 'next/link'

import React from 'react'

const Hero = () => {

    useGSAP(() => {
        gsap.from(".h1", {
            opacity: 0,
            duration: 4,
            ease: "slow(0.7,0.7,false)",
        })
        gsap.from(".p", {
            delay: .5,
            opacity: 0,
            duration: 4,
            ease: "slow(0.7,0.7,false)",
        })
        gsap.from(".h2 ", {
            delay: 1,
            opacity: 0,
            duration: 4,
            ease: "slow(0.7,0.7,false)",
            stagger:.3
        })


    }, [])

    return (
        <section className="bg-gray-900 text-white">
            <div className="mx-auto max-w-screen-xl min-h-screen px-4 py-32 lg:flex lg:h-screen lg:items-center">
                <div className="mx-auto max-w-3xl text-center">
                    <h1
                        className="h1 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
                    >
                        Create form in a flash

                        <span className=" sm:block text-2xl pt-2"> Boost efficiency. Build forms faster than ever before. </span>
                    </h1>

                    <p className="p mx-auto mt-4 max-w-xl sm:text-xl/relaxed pt-2">
                        AI-powered form builders leverage artificial intelligence to revolutionize the form creation process. They offer significant advantages for businesses seeking to:
                    </p>


                    <div className=" mt-8 flex flex-wrap justify-center gap-4 ">
                        <Link href={'/dashboard'}><h1
                            className="h2 block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                            href="#"
                        >
                            Get Started
                        </h1></Link>

                        <h1
                            className="h2 block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                            href="#"
                        >
                            Learn More
                        </h1>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
