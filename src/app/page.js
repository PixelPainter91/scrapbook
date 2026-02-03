import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-linear-to-br from-yellow-50 to-white">
      <h1 className="text-5xl font-extrabold tracking-tight">
        Scrapbook
      </h1>

      <SignedOut>
        <div className="flex gap-4">
          <SignInButton>
            <button className="px-6 py-3 rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-800 transition">
              Sign In
            </button>
          </SignInButton>

          <SignUpButton>
            <button className="px-6 py-3 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </SignedOut>

      <SignedIn>
        <UserButton />
        <p className="text-gray-600">You are signed in</p>
      </SignedIn>
    </main>
  );
}
