import { NextResponse } from 'next/server';
import httpClient from './app/utils/httpClient';


async function isAuthenticated(request) {

    let cookie = request.cookies.get("chave")
    cookie = cookie.value;

    const response = await httpClient.get_headers("/auth/api/validarFront", cookie);

    if (response.status === 200) {
        const data = await response.json();
        return data;
    }

    console.log(response.status);
    return false;
}

export async function middleware(request) {
    const pathname = request.nextUrl.pathname;
    
    const autenticado = await isAuthenticated(request);
    
    console.log(`Requisição para: ${pathname}, autenticado:`, autenticado);
    if (!autenticado) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: '/salas/:path*',
};