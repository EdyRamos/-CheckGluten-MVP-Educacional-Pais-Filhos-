import React from "react";

interface AppLayoutProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function AppLayout({ children, footer }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#4F9DDE] to-[#FFFFFF]">
      <header className="fixed top-0 left-0 right-0 flex items-center gap-2 p-4 z-10 bg-[#4F9DDE] text-white">
        <img src="/icons/icon-192.png" alt="CheckGluten logo" className="h-8 w-8" />
        <span className="text-xl font-bold">CheckGluten</span>
      </header>
      <main className="flex-1 pt-16 p-4">{children}</main>
      {footer && <footer className="p-4">{footer}</footer>}
    </div>
  );
}
