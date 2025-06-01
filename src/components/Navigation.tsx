import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import ZatBrand from "@/assets/images/ZatBrand.png";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const toggleLoginState = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  // Section links for Index.tsx
  const sectionLinks = [
    { to: "#story-us", label: "Story of Us" },
    { to: "#features", label: "Assesement" },
    { to: "#register", label: "Register" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md border-b ">
      <div className="container mx-auto px-5 py-5">
        <div className="flex items-center justify-between h-3 md:h-8">
          <Link
            to={isLoggedIn ? "/dashboard" : "/"}
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
            {!isLoggedIn && (
              <>
                {/* Section Links */}
                {sectionLinks.map((link) => (
                  <a
                    key={link.to}
                    href={link.to}
                    className={
                      location.hash === link.to
                        ? "bg-[#5300B3] text-white hover:bg-[#5300B3] rounded-md px-3 py-2 transition-colors font-bold"
                        : "hover:bg-[#ac6af7] hover:text-white rounded-md px-3 py-2 transition-colors font-bold"
                    }
                  >
                    {link.label}
                  </a>
                ))}

                {/* Demo Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLoginState}
                  className="text-xs opacity-50 transition delay-150 duration-300 ease-in-out"
                >
                  Demo: Switch to logged-in view
                </Button>
              </>
            )}
            {isLoggedIn ? (
              <>
                <Link to="/dashboard">
                  <Button
                    variant={
                      location.pathname === "/dashboard" ? "default" : "ghost"
                    }
                    className={
                      location.pathname === "/dashboard"
                        ? "bg-[#5300B3] text-white hover:bg-[#5300B3]"
                        : "hover:bg-[#ac6af7] hover:text-white"
                    }
                  >
                    Dashboard
                  </Button>
                </Link>
                <Link to="/quiz">
                  <Button
                    variant={
                      location.pathname === "/quiz" ? "default" : "ghost"
                    }
                    className={
                      location.pathname === "/quiz"
                        ? "bg-[#5300B3] text-white hover:bg-[#5300B3]"
                        : "hover:bg-[#ac6af7] hover:text-white"
                    }
                  >
                    Take Quiz
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="ghost" onClick={toggleLoginState}>
                    Logout
                  </Button>
                </Link>
              </>
            ) : null}
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
                <SheetHeader className="flex  flex-row items-center justify-center gap-2">
                  <SheetTitle className="text-4xl font-bold">ZAT</SheetTitle>
                  <img src={ZatBrand} alt="ZAT Logo" className="size-9" />
                </SheetHeader>
                <div className="flex flex-col gap-4 py-4">
                  {!isLoggedIn && (
                    <>
                      {sectionLinks.map((link) => (
                        <a
                          key={link.to}
                          href={link.to}
                          className={
                            location.hash === link.to
                              ? "bg-[#5300B3] text-white hover:bg-[#5300B3] rounded-md px-3 py-2 transition-colors"
                              : "hover:bg-[#ac6af7] hover:text-white rounded-md px-3 py-2 transition-colors"
                          }
                        >
                          {link.label}
                        </a>
                      ))}

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleLoginState}
                        className="text-xs opacity-50 w-full justify-start mt-4"
                      >
                        Demo: Switch to logged-in view
                      </Button>
                    </>
                  )}
                  {isLoggedIn ? (
                    <>
                      <Link to="/dashboard">
                        <Button
                          variant={
                            location.pathname === "/dashboard"
                              ? "default"
                              : "ghost"
                          }
                          className={`w-full justify-start ${
                            location.pathname === "/dashboard"
                              ? "bg-[#5300B3] text-white hover:bg-[#5300B3]"
                              : "hover:bg-[#ac6af7] hover:text-white"
                          }`}
                        >
                          Dashboard
                        </Button>
                      </Link>
                      <Link to="/quiz">
                        <Button
                          variant={
                            location.pathname === "/quiz" ? "default" : "ghost"
                          }
                          className={`w-full justify-start ${
                            location.pathname === "/quiz"
                              ? "bg-[#5300B3] text-white hover:bg-[#5300B3]"
                              : "hover:bg-[#ac6af7] hover:text-white"
                          }`}
                        >
                          Take Quiz
                        </Button>
                      </Link>
                      <Link to="/">
                        <Button
                          variant="ghost"
                          onClick={toggleLoginState}
                          className="w-full justify-start hover:bg-[#ac6af7] hover:text-white"
                        >
                          Logout
                        </Button>
                      </Link>
                    </>
                  ) : null}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
