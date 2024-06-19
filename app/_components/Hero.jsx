

import React from 'react'

const Hero = () => {

    return (

        <section className="" data-theme='dim'>
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl capitalize">
                        create your form
                        <strong className="font-extrabold text-red-700 sm:block"> in seconds not in hours </strong>
                    </h1>

                    <p className="mt-4 sm:text-xl/relaxed">


                        "Create your form in seconds, not hours, with intuitive tools and seamless integration for a streamlined experience. Simplify the process and enhance productivity effortlessly."
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <a
                            className="capitalize block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                            href="#"
                        >
                            + create form
                        </a>

                        <a
                            className="block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
                            href="#"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Hero
