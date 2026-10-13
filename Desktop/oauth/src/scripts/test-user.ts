import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();



const user = async () => {
    const result = await prisma.user.create({

        data: {
            email: "test3@example.com",
            passwordHash: "dummyHash",
        },
    });
    console.log(result);
};

const findUser = async ()=>{
    const result = await prisma.user.findUnique({
        where:{
            email: "test3@example.com",
        },
    })
    console.log(result);
}

findUser();