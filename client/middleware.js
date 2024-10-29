import { NextResponse } from 'next/server';

async function isAuthenticated(request) {
    let cookie = req.Cookie

    const response = await fetch("http://localhost:5000/auth/api/validarFront", {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': request.headers.get('cookie') || '',
        },
    });

    if (response.status === 200) {
        const data = await response.json();
        return data;
    }

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
