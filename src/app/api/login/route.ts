import { signJwtAccessToken } from "@/lib/jwt"
import prisma from "@/lib/prisma"
import * as bcrypt from "bcrypt"
interface RequestBody{
    email:string
    password:string
}
export async function POST(request:Request) {
const body:RequestBody=await request.json()

const user=await prisma.user.findFirst({
    where:{
        email:body.email
    }
})
if(!user) return "User not found"
const isPasswordValid=await bcrypt.compare(body.password,user.password)
if(user && isPasswordValid){
  const {password,...userWithoutPass}=user
  const accessToken=signJwtAccessToken(userWithoutPass)
  const result={
    ...userWithoutPass,
    accessToken
  }
  return new Response(JSON.stringify(result))
}else{
    return new Response(JSON.stringify(null))
}

}