"use client"
import React from 'react'
import SignInButton from './SignInButton'
import Link from 'next/link'

export default function AppBar() {
  return (
    <div className='bg-white py-2 h-16'>
        <div className='px-2 flex justify-between items-center'>
          <Link href="/">
        <button >Home</button>
        </Link>
        <Link href={"/UserPost"}>
        <button >User Post Page</button>
        </Link>
        <SignInButton/>
        </div>
    </div>
  )
}
