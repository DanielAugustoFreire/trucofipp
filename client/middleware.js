import { NextResponse } from 'next/server';
import httpClient from './app/utils/httpClient';
import Cookies from 'js-cookie';


async function isAuthenticated(request) {

    try{
        let cookie = request.cookies.get("chave")
        cookie = cookie.value;
    
        const response = await httpClient.get_headers("/auth/api/validarFront", cookie);
    
        if (response.status === 200) {
            const data = await response.json();
            return data;
        }
    
        return false;
    }
    catch(ex){
        return false;
    }
}

export async function middleware(request) {
    
    const autenticado = await isAuthenticated(request);
    
    Cookies.set("chave", autenticado, { 
        expires: 2 / 24,
        path: '/',
        sameSite: 'None',
        secure: false,
      });

    if (!autenticado) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: '/salas/:path*',
};