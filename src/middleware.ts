// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('token')?.value;
  
  // Log para depuración
  console.log('Middleware ejecutándose para:', request.nextUrl.pathname);
  console.log('Token presente:', !!session);

  // Rutas públicas que no requieren autenticación
  const publicPaths = ['/login', '/register', '/_next', '/api/auth', '/api/public'];
  const isPublicPath = publicPaths.some(path => request.nextUrl.pathname.startsWith(path));
  
  if (isPublicPath) {
    console.log('Ruta pública, permitiendo acceso');
    return NextResponse.next();
  }

  // Si no hay sesión, redirigir al login
  if (!session) {
    console.log('No hay sesión, redirigiendo a login');
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Si hay sesión, permitir acceso sin verificación adicional
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};