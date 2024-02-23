import { Share, SquareStack } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly p-10 md:p-20">
      <h1 className="text-5xl md:text-9xl">
        <span className="font-bold text-emerald-700">Poll</span>
        <span className="font-mono">Up</span>
      </h1>
      <section className="flex flex-col md:flex-row mt-10 md:mt-20 gap-20 max-w-3xl text-center">
        <div className="flex  flex-col items-center justify-between">
          <SquareStack size={60} />
          <h4 className="text-3xl md:text-5xl font-semibold font-sans">
            Create Polls
          </h4>

          <p className="text-xl">Create and manage your polls</p>
        </div>
        <div className="flex  flex-col items-center justify-between">
          <Share size={50} />
          <h4 className="text-3xl md:text-5xl font-semibold font-sans">
            Share Polls
          </h4>
          <p className="text-xl">Easy to share a poll, simply send a link</p>
        </div>
      </section>
      <Link href="/signup" className="w-full max-w-3xl">
        <h4 className="bg-blue-600 text-2xl text-center py-4 rounded">
          Sign Up Today
        </h4>
      </Link>
      <Link href="/login" className="w-full max-w-3xl">
        <h4 className="text-blue-600 text-2xl text-center py-4 rounded">
          Log in
        </h4>
      </Link>
    </main>
  );
}
