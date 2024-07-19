import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from "jsonwebtoken";
import { parse } from 'cookie';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_secret_key';

export function middleware(request: NextRequest) {
    const cookies = request.headers.get('cookie');
    if (!cookies) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const parsedCookies = parse(cookies);
    const token = parsedCookies.token;

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        jwt.verify(token, SECRET_KEY);
        return NextResponse.next();
    } catch (err) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/protected/:path*'],
};
