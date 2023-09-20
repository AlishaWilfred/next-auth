"use client"
import { signIn } from 'next-auth/react'
import React, { useRef } from 'react'

export default function page() {
    const username=useRef("")
    const password=useRef("")

    const handleSubmit=async()=>{
        const result= await signIn("credentials",{
            email:username.current,
            password:password.current,
            redirect:true,
            callbackUrl:"/"
        })

        console.log({username,password})
    }

    return (
    <div  className="flex min-h-screen flex-col items-center justify-between p-24">
        
<div className='bg-white border px-4 w-[30%] h-full py-8 rounded-lg' >
  <div className="mb-6">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input
    onChange={(e)=>username.current=e.target.value}
    type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com" required/>
  </div>
  <div className="mb-6">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input
    onChange={(e)=>password.current=e.target.value}
    
    type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
  </div>

  <button
  onClick={handleSubmit}
  type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">LogIn</button>
</div>

    </div>
  )
}
