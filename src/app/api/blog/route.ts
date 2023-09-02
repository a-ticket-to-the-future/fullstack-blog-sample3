import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function main() {
try {
    await prisma.$connect(); //これでDB接続が開始される
} catch (error) {
    return Error("DB接続に失敗しました")
}
}

//ブログの全記事取得用API
export const GET = async (req:Request, res:NextResponse) => {

    try {
        await main(); //上で記述したDB接続

        //接続させたらsupabaseのテーブルの中からデータを取得させる

        const posts = await prisma.post.findMany(); //findMany()全記事取得の関数
        return NextResponse.json({message:"success",posts},{status:200});

    } catch (err) {
        return NextResponse.json({massage:"Error",err},{status:500});
    }finally{
        await prisma.$disconnect();
    }

};



//ブログ投稿用API
export const POST = async (req:Request, res:NextResponse) => {

    try {

        const {title, description} = await req.json();

        await main(); //上で記述したDB接続

        //接続させたらsupabaseのテーブルの中からデータを取得させる

        const post = await prisma.post.create({data: {title, description}}); //create
        return NextResponse.json({message:"success",post},{status:201});

    } catch (err) {
        return NextResponse.json({massage:"Error",err},{status:500});
    }finally{
        await prisma.$disconnect();
    }

};