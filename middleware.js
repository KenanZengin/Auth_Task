import { NextResponse } from "next/server";
export {default} from "next-auth/middleware"


export function middleware(request){

    const path = request.nextUrl.pathname;
    
    const isPublicPath = path === "/login"  || path === "/register";
    
    const token = request.cookies.get(process.env.SESSION_NAME)?.value;

  

    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL(`${process.env.NEXTAUTH_URL}login`),request.nextUrl);
    }
}


export const config = {
    matcher : [
        "/login",
        "/register",
        "/",
    ]
}