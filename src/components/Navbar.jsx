import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div className='bg-[#ADE0C8] text-lg font-semibold'>
            <div className='flex flex-row-reverse justify-around ml-[50%] py-4'>
                <Link to="/">Mentel Health</Link>
                <Link to="/chatapp">Service</Link>
                <div>About Us</div>
            </div>
        </div>
    )
}
