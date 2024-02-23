import { cookies } from "next/headers";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const username = cookies().get("user")?.value;
  return (
    <>
      <header className="flex absolute top-5 w-full">
        <div className="flex-grow"></div>
        <h1 className="px-4 font-bold font-mono">{username}</h1>
      </header>
      <main className="pl-2 md:pl-10 h-screen">{children}</main>
    </>
  );
}
