import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
const prisma = new PrismaClient()

export async function POST() {
   try {
       const user = await prisma.user.create({
           data: {

               name: "Søren Bramer-Schmidt",
               email: "schmidt@prisma.io",
               role: "ADMIN",

           },
       });

       return NextResponse.json(user)
   } catch (error) {
       return NextResponse.json(error)
   }


}