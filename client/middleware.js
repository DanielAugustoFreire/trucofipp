import { NextResponse } from 'next/server';

async function isAuthenticated(request) {
    const response = await fetch("http://localhost:5000/auth/api/validarFront", {
        method: 'GET',
        credentials: 'include', // Inclui cookies na requisição
        headers: {
            'Content-Type': 'application/json',
            'Cookie': request.headers.get('cookie') || '', // Passa os cookies da requisição
        },
    });

    if (response.status === 200) {
        const data = await response.json();
        return data; // Ajuste conforme a estrutura de resposta do seu backend
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
