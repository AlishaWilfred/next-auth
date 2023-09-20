import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
const handler=NextAuth({
    providers: [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "email", type: "text", placeholder: "abc@example.com" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      // Add logic here to look up the user from the credentials supplied
      const res=await fetch("http://localhost:3000/api/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:credentials?.email,
            password:credentials?.password
        })
      })
      const user = await res.json()
      if (user) {
        return user
      } else {
        return null

      }
    }
  })
],
pages:{
  signIn:"/auth/signIn"
},
callbacks:{
  async jwt({token,user}){
    return {
      ...token,
      ...user
    }
  },
  async session({session,token}){
    session.user=token as any
    return session
  }
}

})

export {handler as GET,handler as POST}