import { getUserName } from "@/actions/user.actions";
import { cookies } from "next/headers";
import Link from "next/link";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = cookies().get("user")?.value;
  var username = null;
  if (userId) {
    const response = await getUserName(userId);
    username = response.username;
  }
  return (
    <>
      <header className="flex absolute top-5 w-full px-4">
        <div className="flex-grow"></div>
        {username ? (
          <h1 className="font-bold font-mono">{username}</h1>
        ) : (
          <Link href={"/signup"} className="text-blue-500">
            sign up
          </Link>
        )}
      </header>
      <main className="pl-2 md:pl-10 h-screen">{children}</main>
    </>
  );
}
