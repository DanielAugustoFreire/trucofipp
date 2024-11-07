import { NextResponse } from 'next/server';

export function middleware(request){

    if(!request.cookies.get("token")){
        return NextResponse.redirect(new URL("/login", request.url));
    }
}
export const config = {
    matcher: '/salas/:path*',
};