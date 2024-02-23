import { login } from "@/actions/auth.actions";
import SubmitButton from "@/components/SubmitButton";
import Link from "next/link";

export default function Login() {
  return (
    <main className=" min-h-screen p-10 md:p-20 max-w-xl mx-auto">
      <form className="flex flex-col gap-4 font-medium text-lg " action={login}>
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
          text={"Log in"}
          pendingText={"verifying user..."}
        />
      </form>
      <p className="mt-5">
        Don't have an account ?{" "}
        <Link href="/signup" className="text-blue-500 hover:underline">
          create an account
        </Link>
      </p>
    </main>
  );
}
