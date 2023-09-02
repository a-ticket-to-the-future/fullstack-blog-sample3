import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { main } from "../route";



const prisma = new PrismaClient();

//ブログの詳細記事取得用API
export const GET = async (req:Request, res:NextResponse) => {

    try {

        const id:number= parseInt(req.url.split("/blog/")[1]); //parseIntは整数変換

        await main(); //上で記述したDB接続

        //接続させたらsupabaseのテーブルの中からデータを取得させる

        const post = await prisma.post.findFirst({where:{id}}); //http://localhost:3000/api/blog/id
        return NextResponse.json({message:"success",post},{status:200});

    } catch (err) {
        return NextResponse.json({massage:"Error",err},{status:500});
    }finally{
        await prisma.$disconnect();
    }

};





//ブログ編集用API
export const PUT = async (req:Request, res:NextResponse) => {

    try {

        const id:number= parseInt(req.url.split("/blog/")[1]); //parseIntは整数変換

        const {title,description} = await req.json();

        await main(); //上で記述したDB接続

        //接続させたらsupabaseのテーブルの中からデータを取得させる

        const post = await prisma.post.update({
            data:{title, description},
            where:{id},
        })
        return NextResponse.json({message:"success",post},{status:200});

    } catch (err) {
        return NextResponse.json({massage:"Error",err},{status:500});
    }finally{
        await prisma.$disconnect();
    }

};



//ブログ削除用API
export const DELETE = async (req:Request, res:NextResponse) => {

    try {

        const id:number= parseInt(req.url.split("/blog/")[1]); //parseIntは整数変換

        

        await main(); //上で記述したDB接続

        //接続させたらsupabaseのテーブルの中からデータを取得させる

        const post = await prisma.post.delete({
            where:{id},
        });
        return NextResponse.json({message:"success",post},{status:200});

    } catch (err) {
        return NextResponse.json({massage:"Error",err},{status:500});
    }finally{
        await prisma.$disconnect();
    }

};