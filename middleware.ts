import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define the public routes using createRouteMatcher
const isPublicRoute = createRouteMatcher(['/', '/api/webhooks/clerk', '/api/webhooks/stripe']);

// Use clerkMiddleware with a function to handle the request
export default clerkMiddleware((auth, request) => {
  // Protect routes that are not public
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};