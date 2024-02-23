import { signup } from "@/actions/auth.actions";
import SubmitButton from "@/components/SubmitButton";
import Link from "next/link";

export default function SignUp() {
  return (
    <main className=" min-h-screen p-10 md:p-20 max-w-xl mx-auto">
      <h1 className="text-xl">Sign Up</h1>
      <form
        className="flex flex-col gap-4 font-medium text-lg "
        action={signup}
      >
        <label className="w-full " htmlFor="username">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          required
          className="input"
        />
        <label className="w-full" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="input"
        />
        <label className="w-full " htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="input"
        />
        <SubmitButton
          className="w-full bg-blue-700 rounded p-2"
          text={"Create Account"}
          pendingText={"setting up account..."}
        />
      </form>
      <p className="mt-5">
        Already have an account ?{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </main>
  );
}
