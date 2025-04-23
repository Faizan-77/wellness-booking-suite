
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
  };

  // Get navigation items based on user role
  const getNavItems = () => {
    if (!isAuthenticated) {
      return [
        { to: "/", label: "Home" },
        { to: "/doctors", label: "Find Doctors" },
        { to: "/services", label: "Services" },
        { to: "/about", label: "About" },
      ];
    }

    if (user?.role === "doctor") {
      return [
        { to: "/", label: "Home" },
        { to: "/doctor-dashboard", label: "My Dashboard" },
        { to: "/appointments", label: "My Appointments" },
        { to: "/services", label: "Services" },
      ];
    }

    if (user?.role === "patient") {
      return [
        { to: "/", label: "Home" },
        { to: "/doctors", label: "Find Doctors" },
        { to: "/patient-dashboard", label: "My Dashboard" },
        { to: "/services", label: "Services" },
      ];
    }

    return [];
  };

  const navItems = getNavItems();

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
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link to={`/${user?.role}-dashboard`} className="flex items-center gap-2 w-full">
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
                {navItems.map((item) => (
                  <DropdownMenuItem key={item.to}>
                    <Link to={item.to} className="w-full">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                {!isAuthenticated && (
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
