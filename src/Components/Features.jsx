import React from 'react'
import Card from './Card'
function Features() {
  return (
    <div>
        <h1 className='mt-5 py-10 text-[45px] font-bold text-blue-900 flex justify-center align-center'> Features </h1>
        <Card></Card>

        <div className='mt-[-375px] flex flex-col min-h-screen'>
            <div className="mt-auto bg-gray-100 text-center py-4 bottom-0 w-full">
              <p>&copy; 2024 Secure-Docs. All rights reserved.</p>
            </div>
        </div>
    </div>
  )
}

export default Features