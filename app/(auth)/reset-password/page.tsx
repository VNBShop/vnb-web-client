import ForgotPasswordForm from '@/contents/auth/forgot-password'

export default function ResetPassword() {
  return (
    <section className=" space-y-4">
      <h1 className=" text-xl font-semibold">Find your account</h1>

      <p className="text-sm text-gray-500">
        Please enter your email address to search for your account
      </p>

      <ForgotPasswordForm />
    </section>
  )
}
