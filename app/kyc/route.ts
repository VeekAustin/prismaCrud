import prisma from "@/prisma/prisma.connect";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const kyc = await prisma.kyc.create({ data: { ...body } });
        return Response.json(kyc);
    } catch (error) {
        console.log(error);
        return Response.json({ error: "Failed to create kyc Record" });
    }
}

export async function GET(req: Request) {
    try{
        const records = await prisma.kyc.findMany({ 
            include: {user: true}            
        });
        return Response.json(records);
    }catch(error) {
        return Response.json({message:"something went wrong"});
    }
}

export async function PUT(req: Request) {
    const {id, ...others} = await req.json()
    try{
        const updateKyc = await prisma.kyc.update({ 
            where:{id},
            data: {...others},            
        });
        return Response.json(updateKyc);
    }catch(error) {
        return Response.json({message:"something went wrong"});
    }
}

export async function DELETE(req: Request) {
    const {id} = await req.json();
    try{
        const records = await prisma.kyc.findMany({ 
            include: {user: true}            
        });
        return Response.json(records);
    }catch(error) {
        return Response.json({message:"something went wrong"});
    }
}
