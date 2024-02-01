import "@/globals.css";
import Link from "next/link";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="container px-0">
        <header className="sticky py-2.5 px-5 mb-5 top-0 z-50 w-full border-b">
          <div className="flex h-10 max-w-screen-2xl items-center justify-between">
            <Link href="/">HOME</Link>
            <p>PORT: {process.env.PORT}</p>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
