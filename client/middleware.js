import { NextResponse } from 'next/server';


async function isAuthenticated(request) {
    let chave = request.cookies.get("chave")
    console.log(chave)
    const response = await fetch("http://localhost:5000/auth/api/validarFront", {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ chave }),
        headers: {
            'Content-Type': 'application/json',
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
    
    console.log(`Requisição para: ${pathname}, autenticado:`, autenticado.id);

    if (!autenticado) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/salas/:path*',
};
