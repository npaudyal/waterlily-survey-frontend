import { validateAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await validateAuth();

    if (!user) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen">
            {children}
        </div>
    );
}