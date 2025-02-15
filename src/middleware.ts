import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { data: { user } } = await supabase.auth.getUser();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const pathname = req.nextUrl.pathname;

  const protectedRoutes = [
    '/profile',
    '/dashboard',
    '/admin/:path*',
  ];

  const isProtectedRoute = protectedRoutes.some(route => {
    if (route.endsWith('*')) {
      const basePath = route.slice(0, -2);
      return pathname.startsWith(basePath);
    }
    return pathname === route;
  });

  if (isProtectedRoute) {
    if (!user) {
      const url = req.nextUrl.clone();
      url.pathname = '/auth/login';
      return NextResponse.redirect(url);
    }

    if (pathname.startsWith('/admin')) {
        const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      if (!profile || profile?.role !== 'admin') {
        return NextResponse.redirect(new URL('/', baseUrl));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|auth).*)'],
};