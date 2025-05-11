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
  SheetDescription,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const toggleLoginState = () => {
    setIsLoggedIn(!isLoggedIn);
  };

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
            />{" "}
            {/* Add the logo */}
            ZAT
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
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
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant={
                      location.pathname === "/login" ? "default" : "ghost"
                    }
                    className={
                      location.pathname === "/login"
                        ? "bg-[#5300B3] text-white hover:bg-[#5300B3]"
                        : "hover:bg-[#ac6af7] hover:text-white"
                    }
                  >
                    Login
                  </Button>
                </Link>

                <Link to="/register">
                  <Button
                    variant={
                      location.pathname === "/register" ? "default" : "ghost"
                    }
                    className={
                      location.pathname === "/register"
                        ? "bg-[#5300B3] text-white hover:bg-[#5300B3]"
                        : "hover:bg-[#ac6af7] hover:text-white"
                    }
                  >
                    Get Started
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLoginState}
                  className="text-xs opacity-50"
                >
                  Demo: Switch to logged-in view
                </Button>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Navigation Menu</SheetTitle>
                  <SheetDescription>
                    Access all navigation options
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-4 py-4">
                  <Link
                    to={isLoggedIn ? "/dashboard" : "/"}
                    className="text-2xl font-bold text-primary mb-6"
                  >
                    SkillQuest
                  </Link>

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
                      <Button
                        className={`w-full justify-start ${
                          location.pathname === "/quiz"
                            ? "bg-[#5300B3] text-white hover:bg-[#5300B3]"
                            : "hover:bg-[#ac6af7] hover:text-white"
                        }`}
                        variant="default"
                        onClick={toggleLoginState}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <Button
                          variant={
                            location.pathname === "/login" ? "default" : "ghost"
                          }
                          className={`w-full justify-start ${
                            location.pathname === "/login"
                              ? "bg-[#5300B3] text-white hover:bg-[#5300B3]"
                              : "hover:bg-[#ac6af7] hover:text-white"
                          }`}
                        >
                          Login
                        </Button>
                      </Link>
                      <Link to="/register">
                        <Button
                          variant={
                            location.pathname === "/register"
                              ? "default"
                              : "ghost"
                          }
                          className={`w-full justify-start ${
                            location.pathname === "/register"
                              ? "bg-[#5300B3] text-white hover:bg-[#5300B3]"
                              : "hover:bg-[#ac6af7] hover:text-white"
                          }`}
                        >
                          Get Started
                        </Button>
                      </Link>
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
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
