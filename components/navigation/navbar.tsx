import Link from "next/link";
import Logo from "@/components/shared/logo";
import Container from "@/components/shared/container";

export default function Navbar() {
  return (
    <header className="border-b">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Logo />

          <div className="flex items-center gap-6">
            <Link href="/">Features</Link>
            <Link href="/">Pricing</Link>
            <Link href="/">Docs</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/sign-in">Sign In</Link>
            <Link
              href="/sign-up"
              className="rounded-md bg-black px-4 py-2 text-white dark:bg-white dark:text-black"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  );
}
