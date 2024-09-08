import React from 'react'
import instagram from '../assets/instagram.png'
import twitter from '../assets/twitter.png'
import facebook from '../assets/facebook.png'

export default function Footer() {
    return (
        <div className='bg-[#ADE0C8] p-5'>
            <div className='flex justify-between items-center'>
                <div className='text-blue-500 text-2xl font-semibold px-4'>Useful links</div>
                <div className='flex p-4 h-16 space-x-5'>
                    <img src={instagram} alt="instagram" />
                    <img src={twitter} alt="twitter" />
                    <img src={facebook} alt="facebook" />
                </div>
            </div>
            <div className='text-2xl font-semibold px-4'>Contact us : abc@gmail.com</div>
        </div>
    )
}
