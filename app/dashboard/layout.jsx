import { SignedIn } from '@clerk/nextjs'
import React from 'react'
import SideNav from './_components/SideNav'
import { Header } from '../_components/Header'
const DashboardLayout = ({ children }) => {
    return (
        <SignedIn>
            <div className=''>

                <div className='flex '>
                    <SideNav />
                    {children}
                </div>
            </div>
        </SignedIn>
    )
}

export default DashboardLayout
