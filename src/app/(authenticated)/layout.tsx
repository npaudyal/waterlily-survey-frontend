import Navbar from "@/components/layout/Navbar";
import { syncUser } from "@/lib/user-actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { userId } = await auth();

    if (!userId) redirect('/');

    await syncUser();

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            {children}
        </div>
    );
}
