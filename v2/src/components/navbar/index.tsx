"use client";

import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import SearchBar from "../search-bar";
import { Button, Sheet, SheetContent, SheetTrigger } from "../ui";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  };

  return (
    <header className="sticky top-0 z-50 flex h-20 items-center gap-4 border-b bg-background px-6 sm:px-16 md:px-10 lg:px-24 xl:px-32">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="text-2xl transition-colors text-primary font-bold"
        >
          Fenix
        </Link>
        <Link
          href="/categories"
          className={`transition-colors ${
            isLinkActive("/categories")
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Categorii
        </Link>
        <Link
          href="/products"
          className={`transition-colors ${
            isLinkActive("/products")
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Produse
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Comutare meniu de navigare</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="text-2xl transition-colors text-primary font-bold"
            >
              Fenix
            </Link>
            <Link
              href="/categories"
              className={`transition-colors ${
                isLinkActive("/categories")
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Categorii
            </Link>
            <Link
              href="/products"
              className={`transition-colors ${
                isLinkActive("/products")
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Produse
            </Link>
            <a
              href="tel:+37368898900"
              className="flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              <Phone className="mr-2 h-4 w-4" />
              +(373) 688-98-900
            </a>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex flex-row items-center gap-8 flex-1 sm:flex-initial">
          <a
            href="tel:+37368898900"
            className="hidden md:flex items-center text-xs font-semibold text-muted-foreground hover:text-foreground md:text-sm whitespace-nowrap"
          >
            <Phone className="mr-2 h-4 w-4" />
            +(373) 688-98-900
          </a>
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
