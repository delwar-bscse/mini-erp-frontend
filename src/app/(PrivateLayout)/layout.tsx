import Sidebar from "@/components/layout/Sidebar";
import { OrderProvider } from "@/context/OrderContext";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />
      <main className="flex-1 p-6">
        <OrderProvider>{children}</OrderProvider>
      </main>
    </div>
  );
}