import { Link, useLocation } from "wouter";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { 
  Leaf, 
  Menu, 
  X, 
  LogOut, 
  LayoutDashboard, 
  BookOpen, 
  Sprout, 
  Library 
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { user, logout } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/lessons", label: "Lessons" },
    { href: "/projects", label: "Projects" },
    { href: "/resources", label: "Resources" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2 group">
              <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight text-foreground">
                GreenSteps
              </span>
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(link.href)
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </nav>

          {/* Auth / User Menu */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.role === 'admin' ? 'Administrator' : 'Student'}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={user.role === 'admin' ? "/admin" : "/dashboard"}>
                      <div className="flex items-center cursor-pointer w-full">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()} className="text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth">
                  <Button variant="ghost">Log in</Button>
                </Link>
                <Link href="/auth">
                  <Button>Get Started</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b bg-white px-4 py-4 space-y-4 animate-in slide-in-from-top-5">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className="block py-2 text-base font-medium hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              </Link>
            ))}
            <div className="pt-4 border-t">
              {user ? (
                <>
                  <Link href={user.role === 'admin' ? "/admin" : "/dashboard"}>
                    <Button className="w-full mb-2" variant="outline">Dashboard</Button>
                  </Link>
                  <Button className="w-full" variant="destructive" onClick={() => logout()}>
                    Log out
                  </Button>
                </>
              ) : (
                <Link href="/auth">
                  <Button className="w-full">Log in / Sign up</Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-1.5 rounded-full">
                <Leaf className="h-5 w-5 text-primary" />
              </div>
              <span className="font-heading font-bold text-lg">GreenSteps</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering students to build a sustainable future, one step at a time.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Learn</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/lessons">All Lessons</Link></li>
              <li><Link href="/projects">Eco Projects</Link></li>
              <li><Link href="/resources">Resources</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground">IG</div>
              <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground">YT</div>
              <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground">TW</div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © 2025 GreenSteps. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
