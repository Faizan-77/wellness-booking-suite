
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User, LogOut } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"patient" | "doctor" | "admin" | null>(null);
  
  // This would be replaced with actual authentication logic
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold">HB</span>
          </div>
          <span className="font-bold text-lg text-primary">HealthBooker</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link to="/doctors" className="text-sm font-medium hover:text-primary">
            Find Doctors
          </Link>
          <Link to="/services" className="text-sm font-medium hover:text-primary">
            Services
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary">
            About
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link to={`/${userRole}-dashboard`} className="flex items-center gap-2 w-full">
                    My Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/profile" className="flex items-center gap-2 w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <div className="flex items-center gap-2 w-full">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup" className="hidden md:block">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
          
          {/* Mobile menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <Link to="/" className="w-full">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/doctors" className="w-full">Find Doctors</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/services" className="w-full">Services</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/about" className="w-full">About</Link>
                </DropdownMenuItem>
                {!isLoggedIn && (
                  <DropdownMenuItem>
                    <Link to="/signup" className="w-full">Sign Up</Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
