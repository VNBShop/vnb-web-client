import Link from 'next/link'

import GoogleOAuth from '@/contents/auth/google-auth'
import SignInForm from '@/contents/auth/signin'

export default function SignIn() {
  return (
    <>
      <h1 className=" text-xl font-semibold">Sign in</h1>
      <p className="my-4 text-sm text-gray-500">
        Choose your preferred sign in method
      </p>

      <GoogleOAuth />

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="text-muted-foreground bg-white px-2">
            Or continue with
          </span>
        </div>
      </div>

      <SignInForm />

      <section className="mb-2 mt-6 flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm">
          <span className="text-gray-500">Don&apos;t have an account?</span>
          <Link className="text-gray-700 hover:underline" href="/signup">
            Sign up
          </Link>
        </div>

        <Link
          href="/reset-password"
          className="text-sm text-gray-700 hover:underline"
        >
          Reset password
        </Link>
      </section>
    </>
  )
}
