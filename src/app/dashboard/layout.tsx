import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Dashboard",
};
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const username = cookies().get("user")?.value;
  return (
    <>
      <main className="pl-2 md:pl-10 h-screen">{children}</main>
    </>
  );
}
