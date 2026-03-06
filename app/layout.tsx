import "@/helper/style/globals.css";

import { fontClassName } from "@/helper/fonts/Fonts";

import { metadata } from "@/helper/meta/Metadata";

import { getSession } from "@/hooks/get-session";

export { metadata };

import Providers from "@/helper/routing/Provider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialSession = await getSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontClassName}>
        <Providers initialSession={initialSession}>{children}</Providers>
      </body>
    </html>
  );
}
