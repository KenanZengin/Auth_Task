import { NextResponse } from "next/server";
export {default} from "next-auth/middleware"


export function middleware(request){

    const path = request.nextUrl.pathname;
    
    const isPublicPath = path === "/login"  || path === "/register";
    
    const token = request.cookies.get("next-auth.session-token")?.value;

  

    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL("http://localhost:3000/login"),request.nextUrl);
    }
}


export const config = {
    matcher : [
        "/login",
        "/register",
        "/",
    ]
}