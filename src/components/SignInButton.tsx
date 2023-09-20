"use client"

import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

export default function SignInButton() {
    const {data:session}=useSession()
    console.log(session?.user)
    if(session && session.user){
        return(
            <div>
                <p>{session.user.name}</p>
                <button onClick={()=>signOut()} className='text-red-500'>Sign Out</button>
            </div>
        )
    }
  return (
    <button onClick={()=>signIn()} className='text-green-500'>Sign In</button>
  )
}
