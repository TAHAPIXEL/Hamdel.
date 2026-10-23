"use client";

import { useEffect, useState } from "react";
import { currentUser, ensureSeed, logout, type User } from "@/lib/model";
import { Splash, ToastProvider } from "@/components/ui";
import Auth from "@/components/Auth";
import Shell from "@/components/Shell";

export default function Page() {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    ensureSeed();
    const u = currentUser();
    setUser(u);
    const t = setTimeout(() => setReady(true), 1400);
    return () => clearTimeout(t);
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <ToastProvider>
      {!ready ? (
        <Splash />
      ) : user ? (
        <Shell user={user} onLogout={handleLogout} />
      ) : (
        <Auth onAuth={(u) => setUser(u)} />
      )}
    </ToastProvider>
  );
}
