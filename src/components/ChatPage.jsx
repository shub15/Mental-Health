import React, { useEffect, useState } from 'react'
import ChatUser from './ChatUser'
import ChatBot from './ChatBot'
import Search from '../assets/search.png'

export default function ChatPage() {
    const ai = "I am a bot";
    const [type, setType] = useState()

    // const handleChange = (e, i) => {
    //     const inputData = [...type]
    //     inputData[i] = e.target.value.toLowerCase();
    //     setType(inputData);

    // }
    let data = [];
    const handleChange = (e, i) => {
        const inputData = e.target.value.toLowerCase();
        data.add(inputData);
        setType(data);

    }
    console.log(type, "data");


    return (
        <div>
            <div className='h-[80vh] p-12'>
                <div className='pb-6'>
                    Bratha Shri
                </div>
                <ChatBot props={ai} />
                <div className='flex flex-row-reverse'>
                    <ChatUser props={type} />
                </div>
            </div>
            <div className='container flex items-center p-6 '>
                <img src={Search} alt="search" className='absolute size-6 ml-4' />
                <input type="search" name="search_location" id="1" className='bg-slate-200 px-12 py-2 w-full outline-cyan-500 rounded-full focus:bg-blue-100' placeholder='Search computer engineering' onKeyDown={(e, i) => {
                    if (e.key === 'Enter') {
                        handleChange(e, i)
                    }
                }} />
            </div>
        </div>
    )
}
