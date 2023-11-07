import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import Cookies from 'js-cookie';
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const role: string | undefined = Cookies.get('role');

    const path = request.nextUrl.pathname
    const userPath = "/user"
    // const adminPath = "/admin"
    // const instructPath = "/admin/instructor"
    const publicPath = path === '/login' || path === "/register"
    const token = request.cookies.get('token')?.value || ''

    if ((path === userPath) && role !== "1") {
        // return NextResponse.redirect(new URL('/', request.nextUrl))
        // console.log((role))
    } 

    // if ((path === adminPath) && role !== "admin") {
    //     return NextResponse.redirect(new URL('/', request.nextUrl))
    // }


    // if ((path === instructPath) && role !== "instructor") {
    //     return NextResponse.redirect(new URL('/', request.nextUrl))
    // }

    if (publicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if (!publicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/', '/login', '/register', '/admin', '/user', '/admin/instructor'],
}