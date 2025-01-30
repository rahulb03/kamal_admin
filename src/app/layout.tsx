"use client";


import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { AuthProvider } from "@/lib/context/auth-context";
import { Toaster } from "@/components/ui/toaster";
import { ProductProvider } from "@/lib/context/product-context";
import { CategoryProvider } from "@/lib/context/category-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <ProductProvider >
            <CategoryProvider >
        {loading ? <Loader /> : children}
        </CategoryProvider>
        <Toaster />
        </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
