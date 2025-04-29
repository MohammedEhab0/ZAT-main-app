
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // In a real app, this would come from your auth state
  const location = useLocation();
  
  // Toggle login state for demo purposes
  const toggleLoginState = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to={isLoggedIn ? "/dashboard" : "/"} className="text-2xl font-bold text-primary">
            ZAT
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Link to="/quiz">
                  <Button variant="ghost">Take Quiz</Button>
                </Link>
                <Button variant="ghost" onClick={toggleLoginState}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Get Started</Button>
                </Link>
                {/* For demo purposes only - allows toggling the navigation state */}
                <Button variant="ghost" size="sm" onClick={toggleLoginState} className="text-xs opacity-50">
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
                        <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
                      </Link>
                      <Link to="/quiz">
                        <Button variant="ghost" className="w-full justify-start">Take Quiz</Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={toggleLoginState}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <Button variant="ghost" className="w-full justify-start">Login</Button>
                      </Link>
                      <Link to="/register">
                        <Button className="w-full">Get Started</Button>
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
