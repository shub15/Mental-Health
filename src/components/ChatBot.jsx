import React from 'react'

export default function ChatBot({ props }) {
    return (
        <div className='bg-slate-300 w-1/2 rounded-lg p-4'>
            <p>
                {props}
            </p>
        </div>
    )
}
