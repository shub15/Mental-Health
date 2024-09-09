import React from 'react'

export default function ChatUser({props}) {
  return (
    
    (props && <div className='bg-slate-300 w-1/2 rounded-lg p-4 my-4 flex flex-col relative'>
      <p>
        {props}
      </p>
    </div>)
  )
}
