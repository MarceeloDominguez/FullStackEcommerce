import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("auth-token"); // Token de las cookies

  // Si el user esta autenticado, continua
  if (isAuthenticated) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/auth/login", request.url);

  // Evitar redirección infinita si ya estamos en /auth/login
  if (request.nextUrl.pathname === "/auth/login") {
    return NextResponse.next();
  }

  return NextResponse.redirect(loginUrl);
}

// Rutas donde se aplica el middleware
export const config = {
  matcher: ["/", "/orders", "/product/:path*"],
};
