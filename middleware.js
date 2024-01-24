import { NextResponse } from "next/server";
export {default} from "next-auth/middleware"


//Kullanıcının token'ı olup olmadığını kontrol ettiğimiz yer.
export function middleware(request){

    const path = request.nextUrl.pathname; // url bilgisini alıyoruz
    
    const isPublicPath = path === "/login"  || path === "/register";


    const token = request.cookies.get(process.env.SESSION_NAME)?.value; // kullanıcının tokenı olup olmadığını kontrol ediyoruz

    if(isPublicPath && token){ // Kullanıcı tokenı var ise , url'den login veya register sayfasına girmeye çalışırsa direk onu ana sayfaya yönlendiriyoruz.
        return NextResponse.redirect(new URL("/",request.nextUrl))
    }

    if(!isPublicPath && !token){ // Kullanıcı tokenı yok ve ana sayfaya girmeye çalışırsa onu login sayfasına yönlendiriyoruz
        return NextResponse.redirect(new URL(`${process.env.NEXTAUTH_URL}login`),request.nextUrl);
    }
}


export const config = { // middleware fonksiyonu içinde kullancağımız sayfaları tanımlıyoruz
    matcher : [
        "/login",
        "/register",
        "/",
    ]
}