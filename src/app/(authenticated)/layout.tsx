import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    // const { userId } = await auth();

    // if (!userId) redirect('/');

    return (
        <div className="min-h-screen bg-gray-100">
            {children}
        </div>
    );
}
