import Logo from "@/components/Logos/Logo";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col md:flex-row px-2 gap-4 md:px-10 justify-center items-center">
      <section className="w-full">
        <header className="">
          <Logo></Logo>
        </header>

        <p className="font-sans text-lg p-2">
          Quick Poll® is a free web app,that allows users to quickly create and
          share polls. No sign up required. However creating an account will
          give you access to a dashboard for better managing your polls
        </p>
      </section>
      <section className="w-full text-lg">
        <div className="border-x-4 border-b-4 border-[#2E1BB7]">
          <header className="font-bold bg-[#2E1BB7] text-white">
            Get Started
          </header>
          <div className="p-2 [&>*]:p-2 [&>*]:block [&>*]:mb-2">
            <Link
              className="hover:bg-[#ffffff80] border border-black rounded"
              href="/dashboard"
            >
              Create a Poll{" "}
            </Link>
            <Link
              className="hover:bg-[#ffffff80] border border-black rounded"
              href="/login"
            >
              Log in
            </Link>
            <Link
              className="hover:bg-[#ffffff80] border border-black rounded"
              href="/signup"
            >
              Sign up
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
