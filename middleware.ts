import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/create-story(.*)'])

export default clerkMiddleware(async (auth, req, res) => {
  if (isProtectedRoute(req)) {
    const { userId, redirectToSignIn } = await auth(); // Get the auth object

    // If the user is not signed in, redirect them to the sign-in page
    if (!userId) {
      return redirectToSignIn();
    }
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};