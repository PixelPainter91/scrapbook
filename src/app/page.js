
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">📒 Scrapbook</h1>

      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <UserButton />
        <p>You are signed in</p>
      </SignedIn>
    </main>
  );
}
