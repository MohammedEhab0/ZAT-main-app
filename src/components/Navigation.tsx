import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ZatBrand from "@/assets/images/ZatBrand.png";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  // Section links for the Index.tsx (homepage) when NOT logged in
  const loggedOutSectionLinks = [
    { to: "/#story-us", label: "Story of Us" },
    { to: "/#features", label: "Assessment" },
  ];

  // Links for logged-in users (basic/premium users)
  const loggedInLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/quiz", label: "Take Quiz" },
    // Add more links for basic/premium users here if needed
  ];

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to homepage after logout
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md border-b">
      <div className="container mx-auto px-5 py-5">
        <div className="flex items-center justify-between h-3 md:h-8">
          <Link
            to={isAuthenticated ? "/dashboard" : "/"}
            className="flex items-center text-2xl md:text-5xl font-bold text-color #000000"
          >
            <img
              src={ZatBrand}
              alt="ZAT Logo"
              className="h-8 md:h-16 w-22 mr-2"
            />
            ZAT
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                {/* Links for logged-out users (sections on homepage) */}
                {loggedOutSectionLinks.map((link) => (
                  <a // Use <a> for hash links to scroll within the page
                    key={link.to}
                    href={link.to}
                    className={
                      location.hash === link.to.substring(link.to.indexOf("#"))
                        ? "bg-[#5300B3] text-white hover:bg-[#5300B3] rounded-md px-3 py-2 transition-colors font-bold"
                        : "hover:bg-[#ac6af7] hover:text-white rounded-md px-3 py-2 transition-colors font-bold"
                    }
                  >
                    {link.label}
                  </a>
                ))}
                {/* Only the Register button, linking to the Tabs section on the homepage */}
                <a href="/#register-login-section">
                  <Button
                    variant={
                      location.hash === "#register-login-section"
                        ? "default"
                        : "ghost"
                    }
                    className={
                      location.hash === "#register-login-section"
                        ? "bg-[#5300B3] text-white hover:bg-[#5300B3]"
                        : "hover:bg-[#ac6af7] hover:text-white"
                    }
                  >
                    Register
                  </Button>
                </a>
              </>
            ) : (
              <>
                {/* Links for logged-in users (basic/premium) */}
                {loggedInLinks.map((link) => (
                  <Link key={link.to} to={link.to}>
                    <Button
                      variant={
                        location.pathname === link.to ? "default" : "ghost"
                      }
                      className={
                        location.pathname === link.to
                          ? "bg-[#5300B3] text-white hover:bg-[#5300B3]"
                          : "hover:bg-[#ac6af7] hover:text-white"
                      }
                    >
                      {link.label}
                    </Button>
                  </Link>
                ))}

                {/* Logout Button */}
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="hover:bg-[#ac6af7] hover:text-white"
                >
                  Logout
                </Button>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden bg-transparent backdrop-blur-md">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-7 w-7 text-[#5300B3]" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader className="flex flex-row items-center justify-center gap-2">
                  <SheetTitle className="text-4xl font-bold">ZAT</SheetTitle>
                  <img src={ZatBrand} alt="ZAT Logo" className="size-9" />
                </SheetHeader>
                <div className="flex flex-col gap-4 py-4">
                  {!isAuthenticated ? (
                    <>
                      {/* Links for logged-out users (sections on homepage) */}
                      {loggedOutSectionLinks.map((link) => (
                        <a // Use <a> for hash links to scroll within the page
                          key={link.to}
                          href={link.to}
                          className={
                            location.hash ===
                            link.to.substring(link.to.indexOf("#"))
                              ? "bg-[#5300B3] text-white hover:bg-[#5300B3] rounded-md px-3 py-2 transition-colors"
                              : "hover:bg-[#ac6af7] hover:text-white rounded-md px-3 py-2 transition-colors"
                          }
                        >
                          {link.label}
                        </a>
                      ))}
                      {/* Only the Register button for mobile */}
                      <a href="/#register-login-section#register">
                        <Button
                          variant={
                            location.hash === "#register-login-section#register"
                              ? "default"
                              : "ghost"
                          }
                          className={`w-full justify-start ${
                            location.hash === "#register-login-section#register"
                              ? "bg-[#5300B3] text-white hover:bg-[#5300B3]"
                              : "hover:bg-[#ac6af7] hover:text-white"
                          }`}
                        >
                          Register
                        </Button>
                      </a>
                    </>
                  ) : (
                    <>
                      {/* Links for logged-in users */}
                      {loggedInLinks.map((link) => (
                        <Link key={link.to} to={link.to}>
                          <Button
                            variant={
                              location.pathname === link.to
                                ? "default"
                                : "ghost"
                            }
                            className={`w-full justify-start ${
                              location.pathname === link.to
                                ? "bg-[#5300B3] text-white hover:bg-[#5300B3]"
                                : "hover:bg-[#ac6af7] hover:text-white"
                            }`}
                          >
                            {link.label}
                          </Button>
                        </Link>
                      ))}

                      {/* Logout Button */}
                      <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="w-full justify-start hover:bg-[#ac6af7] hover:text-white"
                      >
                        Logout
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
