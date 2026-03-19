"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "@/context/AuthContext";

import Pathname from "@/helper/routing/Pathname";

const queryClient = new QueryClient();

export default function Providers({
  children,
  initialSession,
}: {
  children: React.ReactNode;
  initialSession: Accounts | null;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider initialSession={initialSession}>
        <Pathname>{children}</Pathname>
      </AuthProvider>
    </QueryClientProvider>
  );
}
