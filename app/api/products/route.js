import { NextResponse } from "next/server";
import Products from "../../../data/data"

export async function GET(){

    try{

        return NextResponse.json(Products,{status : 200});
    
    }catch (error){
   
        return NextResponse.json({message : error},{status : 404});
   
    }
}
