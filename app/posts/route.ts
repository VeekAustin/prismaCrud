import prisma from "@/prisma/prisma.connect";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const post = await prisma.post.create({data: {...body } });
    return Response.json(post);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Failed to create post" });
  }
}

export async function GET(req: Request) {
    try{
        const posts = await prisma.post.findMany({ 
            include:{author: true}
        });
        return Response.json(posts);
    }catch(error) {
        return Response.json({message:"something went wrong"});
    }
}

export async function PUT(req: Request) {
    const {id, ...others} = await req.json();
    try{
        const updatePost = await prisma.post.update({ 
            where:{id},
            data: { ...others}
        });
        return Response.json(updatePost);
    }catch(error) {
        return Response.json({message:"something went wrong"});
    }
}

export async function DELETE(req: Request) {
    const {id} = await req.json();
    try{
        const deletedPost = await prisma.user.delete({ 
            where:{id},
            select: {id: true }
        });
        return Response.json(deletedPost);
    }catch(error) {
        return Response.json({message:"something went wrong"});
    }
}