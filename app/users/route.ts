import prisma from "@/prisma/prisma.connect";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await prisma.user.create({ 
        data: {...body } 
    });
    return Response.json(user);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Failed to create user" });
  }
}

export async function GET(req: Request) {
    try{
        const users = await prisma.user.findMany({ 
            include: {posts: true}
        });
        return Response.json(users);

    }catch(error) {
        return Response.json({message:"something went wrong"});
    }
}

export async function PUT(req: Request) {
    const {id, ...others} = await req.json();
    try{
        const updateUsers = await prisma.user.update({ 
            where:{id},
            data: { ...others}
        });
        return Response.json(updateUsers);
    }catch(error) {
        return Response.json({message:"something went wrong"});
    }
}

export async function DELETE(req: Request) {
    const {id} = await req.json();
    try{
        const deletedUsers = await prisma.user.delete({ 
            where:{id},
            select: {id: true }
        });
        return Response.json(deletedUsers);
    }catch(error) {
        return Response.json({message:"something went wrong"});
    }
}