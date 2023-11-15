import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import Cookies from 'js-cookie';
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // const role: string | undefined = Cookies.get('role');

    const path = request.nextUrl.pathname
    const userPath = "/user"
    const adminPath = "/admin"
    const instructorPath = "/admin"
    const publicPath = path === '/login' || path === "/register"
    const token = request.cookies.get('token')?.value || ''
    const role = request.cookies.get('role')?.value || null

    if ((path === userPath) && role !== "1") {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    } 

    if ((path === adminPath) && role !== "2") {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }


    if ((path === instructorPath) && role !== "3") {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if (publicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if (!publicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

}

export const config = {
    matcher: ['/', '/login', '/register','/instructor', '/admin', '/user'],
}