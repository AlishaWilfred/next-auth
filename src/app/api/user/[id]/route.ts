import { verifyJwt } from "@/lib/jwt";
import prisma from "@/lib/prisma";

interface createBody{
    title:string
    content?: string | null;
    published:boolean

}
export async function GET(request:Request,{params}:{params:{id:number}}) {
    const accessToken=request.headers.get("authorization")
    if(!accessToken || !verifyJwt(accessToken)){
        return new Response(JSON.stringify({
            error:"unauthorized"
        }),
        {
            status:401
        }
        
        )

    }
    const userPost = await prisma.post.findMany({
       where:{
        authorId:+params.id
       } ,
       include:{
        author:{
            select:{
                email:true,
                name:true
            }
        }
       }
    })
    return new Response(JSON.stringify(userPost))
}

export async function POST(request:Request,{params}:{params:{id:number}}) {
    const body:createBody=await request.json()
    const createPost=await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            published:body.published,
            authorId : +params.id,
            },
            include:{
                author:true
            }
            
    })
    return new Response(JSON.stringify(createPost))
}