"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, UserPlus, Briefcase, Handshake } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { checkUserAuth } from "@/lib/auth";

const StartupTutorialSection = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in as startup using utility function
    const { isLoggedIn, userType } = checkUserAuth();
    
    if (!isLoggedIn || userType !== "startup") {
      // If not logged in or wrong user type, redirect to login
      router.replace("/auth/login");
      return;
    }
    
    setIsLoading(false);
  }, [router]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <section
      id="how-it-works"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/90 to-purple-600 text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <Badge 
            variant="outline" 
            className="mb-4 bg-white/10 border-white/30 text-white transition-all duration-300 hover:bg-white/20 backdrop-blur-md"
          >
            Startup Guide
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
            How to Attract Investors
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Showcase your startup and secure funding in three simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection lines */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-white/20 -z-10 transform -translate-y-1/2"></div>

          {[
            {
              title: "Create Your Profile",
              desc: "Register your startup and provide essential details like your business model, domain, and funding needs.",
              icon: <UserPlus size={32} />,
              step: 1,
            },
            {
              title: "Showcase Your Business",
              desc: "Upload your pitch deck, financials, and social proof to highlight your startup's potential.",
              icon: <Briefcase size={32} />,
              step: 2,
            },
            {
              title: "Connect with Investors",
              desc: "Get matched with investors who align with your vision and funding requirements.",
              icon: <Handshake size={32} />,
              step: 3,
            },
          ].map((item, index) => (
            <Card
              key={index}
              className="border-2 border-white/20 group hover:border-white/40 bg-black/30 hover:bg-black/40 shadow-xl shadow-black/30 hover:shadow-2xl hover:shadow-black/50 transition-all duration-500 backdrop-blur-lg overflow-hidden "
            >
              <CardHeader className="pb-2 relative">
                <div className="flex justify-between items-center mb-2">
                  <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-white transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-md shadow-black/20">
                    {item.icon}
                  </div>
                  <Badge 
                    variant="outline" 
                    className="bg-black/20 border-white/20 text-white transition-colors duration-300 group-hover:bg-black/30 group-hover:border-white/30 backdrop-blur-sm shadow-sm"
                  >
                    Step {item.step}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-white transition-all duration-300 drop-shadow-md">
                  {item.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="relative">
                <p className="text-white/80 group-hover:text-white transition-colors duration-300">
                  {item.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/startups/liveFunding">
            <Button 
              className="group bg-white text-primary hover:bg-white/90 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transition-all duration-300 backdrop-blur-sm hover:scale-105"
              onClick={() => {
                router.push('/startups/liveFunding');
              }}
            >
              <span className="relative z-10">LiveFunding</span>
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default StartupTutorialSection;