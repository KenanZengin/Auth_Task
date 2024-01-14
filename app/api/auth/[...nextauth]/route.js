import { NextResponse } from "next/server";
import  NextAuth from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import connectMongoDB from "@/database/conn";
import Users from "@/models/schema";
import { compare } from "bcrypt";
  
export const authOptions = ({

    //Form'dan gelen datayı burada kontrol ediyoruz. Email ve Password DB'de oluşmuş ise kullanıcının ana sayfaya girmesine izin veriyoruz
    providers:[
        CredentialsProvider({
            name : "Credentials",
            async authorize(credentials){

                connectMongoDB().catch(error => "connection failed");

                const result = await Users.findOne({email: credentials.email});

                if(!result)  throw new Error("Email not found!");

                const checkPassword = await compare(credentials.password, result.password);

                if(!checkPassword) throw new Error("Wrong password!");

                return NextResponse.json(result,{status: 200});

            }

        })
    ],
    secret : process.env.NEXTAUTH_SECRET,
})

const handler = NextAuth(authOptions);

export {handler as GET , handler as POST}