import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import connectMongoDB from "../../../../database/conn";
import Users from "../../../../models/schema";


export async function POST(request){

    //DB'ye bağlanıyoruz
    connectMongoDB().catch(error => NextResponse.json({error: "Database connection failed"},{status: 500}));

    //POST methodu ile ilettiğimiz dataları request.json() ile alıyoruz
    const body = await request.json();
    if(!body) return NextResponse.json({message: "Data not found"},{status: 404});

    //Mail ve Name'in daha önce alınıp alınmadığını kontrol ediyoruz
    const {name,email,password} = body;
    
    const checkexistingMail = await Users.findOne({email});
    const checkexistingName = await Users.findOne({name});

    if(checkexistingMail) return NextResponse.json({message : "Mail already exists"},{status : 403}); 
    if(checkexistingName) return NextResponse.json({message : "Name already exists"},{status : 403});

    //Daha önce alınmadı ise name veya email kullanıcıyı DB'de oluşturuyoruz.
    Users.create({name,email,password: await hash(password,12)});

    return NextResponse.json(body,{status : 201});

}