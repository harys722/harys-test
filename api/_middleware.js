import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api/')) {
    // You can implement route validation here
    const validRoutes = ['/api/known-route', '/api/another-route'];
    
    if (!validRoutes.some(route => pathname.startsWith(route))) {
      // Return custom JSON error for invalid API route
      return NextResponse.json({ error: 'Invalid API route' }, { status: 400 });
    }
  }

  return NextResponse.next();
}
