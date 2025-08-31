"use client"
// import CustomLayout from "../customLanding"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Footer from "@/components/Footer"
import {
  UploadCloud,
  Share2,
  Download,
  Shield,
  Cloud,
  Zap,
  ChevronRight,
  Github,
  Twitter,
  Linkedin,
  Menu,
  X,
  Clock,
  BarChart,
  Star,
  Briefcase,
  UserPlus,
  DollarSign,
  FileText,
  Instagram,
  Handshake,
  Settings,
  Search,
  MessageCircle,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ChatBot from "@/components/ChatBot"
import { motion } from "framer-motion";
import Image from "next/image"
import { checkUserAuth } from "@/lib/auth"

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [currentImageSrc, setCurrentImageSrc] = useState("/logo.webp")
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Function to check if user is logged in and get user type
  const checkUserAuthLocal = () => {
    return checkUserAuth()
  }

  // Function to handle navigation based on user type
  const handleNavigation = (targetType: "startup" | "investor") => {
    const { isLoggedIn, userType } = checkUserAuthLocal()
    
    if (!isLoggedIn) {
      // If not logged in, redirect to login page
      router.push("/auth/login")
      return
    }
    
    if (userType === targetType) {
      // If user is already the target type, redirect to their dashboard
      router.push(targetType === "startup" ? "/startups" : "/investor")
    } else {
      // If user is different type, redirect to login page
      router.push("/auth/login")
    }
  }

  // Function to handle "Get Started" button
  const handleGetStarted = () => {
    const { isLoggedIn, userType } = checkUserAuthLocal()
    
    if (!isLoggedIn) {
      // If not logged in, redirect to register page
      router.push("/auth/register")
      return
    }
    
    // If logged in, redirect to appropriate dashboard
    if (userType === "startup") {
      router.push("/startups")
    } else if (userType === "investor") {
      router.push("/investor")
    }
  }

  return (
    <>
      {/* <CustomLayout> */}
      <div className="min-h-screen flex flex-col bg-background">
        {/* Hero Section */}
        <header className="relative pt-16 pb-24 overflow-hidden bg-gradient-to-br from-primary/90 to-purple-600 text-primary-foreground">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left space-y-6">
                <Badge variant="secondary" className="mb-4 text-sm px-3 py-1">
                  Where Startups Meet Investors
                </Badge>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  From Pitch <span className="text-white">to Partnership,</span> Seamlessly
                </h1>

                <p className="text-lg md:text-xl opacity-90 max-w-xl mx-auto md:mx-0">
                  From Ideas to Impact – Get Started Now.              </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button 
                    size="lg" 
                    className="bg-green-300 text-primary hover:bg-green-300/70 w-full sm:w-auto"
                    onClick={handleGetStarted}
                  >
                    Get Started
                  </Button>
                  {/* <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-black text-white hover:bg-white/10 w-full sm:w-auto"
                      onClick={() => handleNavigation("startup")}
                    >
                      For Startups
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-black border-none text-white hover:bg-white/10 w-full sm:w-auto"
                      onClick={() => handleNavigation("investor")}
                    >
                      For Investors
                    </Button>
                  </div> */}
                </div>

                <div className="text-sm opacity-80 pt-2">Invest Today, Empower Tomorrow – Your Future Starts Here.</div>
              </div>

              <div className="hidden md:block relative">
                <div className="relative bg-white/10 backdrop-blur-sm rounded-lg shadow-2xl border border-white/20 p-2 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                  <div className="relative">
                    {!imageError ? (
                      <img
                        src={currentImageSrc}
                        width={800}
                        height={600}
                        alt="InvestyGram Dashboard"
                        className="rounded shadow-lg"
                        onError={() => {
                          if (currentImageSrc === "/logo.webp") {
                            setCurrentImageSrc("/logo2.png");
                          } else if (currentImageSrc === "/logo2.png") {
                            setCurrentImageSrc("/logo3.jpeg");
                          } else if (currentImageSrc === "/logo3.jpeg") {
                            setCurrentImageSrc("/logo4.jpg");
                          } else {
                            setImageError(true);
                          }
                        }}
                      />
                    ) : (
                      <div className="w-[800px] h-[600px] bg-gradient-to-br from-primary/20 to-purple-600/20 rounded shadow-lg flex items-center justify-center">
                        <div className="text-center">
                          <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
                          <p className="text-primary font-medium">InvestyGram Dashboard</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white backdrop-blur-xl p-4 rounded-lg border border-white/20 shadow-xl">
                  <div className="flex items-center gap-2">
                    <Shield className="h-8 w-8 text-green-300" />
                    <div className="text-black">
                      <div className="font-medium">End-to-End Secure</div>
                      <div className="text-sm ">Invest Smart, Grow Forever</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </header>

        {/* Stats Section */}
        {/* <section className="py-8 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Startups Funded", value: "100+" },
              { label: "Investors Active", value: "1000+" },
              { label: "Total Match", value: "5k+" },
              { label: "Global Reach", value: "50+" },
            ].map((stat, index) => (
              <div key={index} className="space-y-1">
                <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

        {/* How It Works */}
        <section id="startup-flow" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 to-purple-600/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge
                variant="outline"
                className="mb-4 bg-primary/10 border-primary/30 text-primary transition-all duration-300 hover:bg-primary/20 backdrop-blur-md"
              >
                Startup Journey
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 drop-shadow-md">
                How It Works for Startups
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Follow these simple steps to register your startup and connect with investors.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connection lines (only visible on md and up) */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary/20 -z-10 transform -translate-y-1/2"></div>

              {[
                {
                  title: "Register Your Startup",
                  desc: "Provide basic information about your startup, including area of interest, domain, and capital.",
                  icon: <UserPlus size={32} className="text-primary" />,
                  step: 1,
                },
                {
                  title: "Business & Product Info",
                  desc: "Share details about your business model, product, and market.",
                  icon: <Briefcase size={32} className="text-primary" />,
                  step: 2,
                },
                {
                  title: "Financial & Funding Info",
                  desc: "Provide financial details and funding requirements.",
                  icon: <DollarSign size={32} className="text-primary" />,
                  step: 3,
                },
                {
                  title: "Pitch & Supporting Docs",
                  desc: "Upload your pitch deck and any supporting documents.",
                  icon: <FileText size={32} className="text-primary" />,
                  step: 4,
                },
                {
                  title: "Social Proof",
                  desc: "Showcase your social media presence and followers.",
                  icon: <Instagram size={32} className="text-primary" />,
                  step: 5,
                },
                {
                  title: "Investor Preferences",
                  desc: "Specify your preferred investors and investment terms.",
                  icon: <Handshake size={32} className="text-primary" />,
                  step: 6,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-2 border-primary/20 group hover:border-primary/40 bg-white shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-500 backdrop-blur-lg overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    <CardHeader className="pb-2 relative z-10">
                      <div className="flex justify-between items-center mb-2">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-primary/20 shadow-md shadow-primary/20">
                          {item.icon}
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-primary/10 border-primary/20 text-primary transition-colors duration-300 group-hover:bg-primary/20 group-hover:border-primary/30 backdrop-blur-sm shadow-sm"
                        >
                          Step {item.step}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl text-gray-900 transition-all duration-300 drop-shadow-md">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                        {item.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button 
                className="group bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 backdrop-blur-sm hover:animate-none"
                onClick={() => handleNavigation("startup")}
              >
                Get Started
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </section>


        <section id="investor-flow" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 to-purple-600/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge
                variant="outline"
                className="mb-4 bg-primary/10 border-primary/30 text-primary transition-all duration-300 hover:bg-primary/20 backdrop-blur-md"
              >
                Investor Journey
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 drop-shadow-md">
                How It Works for Investors
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Follow these simple steps to find and invest in promising startups.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connection lines (only visible on md and up) */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary/20 -z-10 transform -translate-y-1/2"></div>

              {[
                {
                  title: "Set Preferences",
                  desc: "Define your area of interest, domain, and capital investment range.",
                  icon: <Settings size={32} className="text-primary" />,
                  step: 1,
                },
                {
                  title: "Review Startups",
                  desc: "Browse through startups that match your preferences.",
                  icon: <Search size={32} className="text-primary" />,
                  step: 2,
                },
                {
                  title: "Evaluate Pitch",
                  desc: "Review the startup's pitch, past funding, and vision.",
                  icon: <FileText size={32} className="text-primary" />,
                  step: 3,
                },
                {
                  title: "Provide Feedback",
                  desc: "Offer feedback and score the startup out of 100.",
                  icon: <MessageCircle size={32} className="text-primary" />,
                  step: 4,
                },
                {
                  title: "Make an Offer",
                  desc: "Submit your investment offer based on your evaluation.",
                  icon: <Handshake size={32} className="text-primary" />,
                  step: 5,
                },
                {
                  title: "Track Investment",
                  desc: "Monitor the progress and growth of your investment.",
                  icon: <TrendingUp size={32} className="text-primary" />,
                  step: 6,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-2 border-primary/20 group hover:border-primary/40 bg-white shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-500 backdrop-blur-lg overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    <CardHeader className="pb-2 relative z-10">
                      <div className="flex justify-between items-center mb-2">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-primary/20 shadow-md shadow-primary/20">
                          {item.icon}
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-primary/10 border-primary/20 text-primary transition-colors duration-300 group-hover:bg-primary/20 group-hover:border-primary/30 backdrop-blur-sm shadow-sm"
                        >
                          Step {item.step}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl text-gray-900 transition-all duration-300 drop-shadow-md">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                        {item.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button 
                className="group bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 backdrop-blur-sm  hover:animate-none"
                onClick={() => handleNavigation("investor")}
              >
                Get Started
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 to-purple-600/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge
                variant="outline"
                className="mb-4 bg-primary/10 border-primary/30 text-primary transition-all duration-300 hover:bg-primary/20 backdrop-blur-md"
              >
                Powerful Features
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 drop-shadow-md">
                Everything Startups & Investors Need
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Connect startups with investors through smart matching, secure deals, and real-time collaboration.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "AI Profile Matching",
                  desc: "Smart algorithm connects startups with ideal investors based on domain, capital, and preferences.",
                  icon: <Shield className="h-10 w-10 text-primary" />,
                },
                {
                  title: "Investor Network",
                  desc: "Access verified investors worldwide with transparent funding histories and preferences.",
                  icon: <Cloud className="h-10 w-10 text-primary" />,
                },
                {
                  title: "Live Funding Deals",
                  desc: "Real-time investment offers with terms comparison and instant negotiation capabilities.",
                  icon: <Zap className="h-10 w-10 text-primary" />,
                },
                {
                  title: "Capital Security",
                  desc: "Escrow-protected transactions with milestone-based fund release for risk mitigation.",
                  icon: <Shield className="h-10 w-10 text-primary" />,
                },
                {
                  title: "ROI Tracking",
                  desc: "Dashboard to monitor investment performance and startup growth metrics in real-time.",
                  icon: <Clock className="h-10 w-10 text-primary" />,
                },
                {
                  title: "Pitch Analytics",
                  desc: "Detailed insights on investor engagement and pitch performance metrics.",
                  icon: <BarChart className="h-10 w-10 text-primary" />,
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-2 border-primary/20 group hover:border-primary/40 bg-white shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-500 backdrop-blur-lg overflow-hidden relative h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    <CardHeader className="pb-2 relative z-10">
                      <div className="mb-4">{feature.icon}</div>
                      <CardTitle className="text-xl text-gray-900 transition-all duration-300 drop-shadow-md">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                        {feature.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Testimonials */}
        <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 to-purple-600/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge
                variant="outline"
                className="mb-4 bg-primary/10 border-primary/30 text-primary transition-all duration-300 hover:bg-primary/20 backdrop-blur-md"
              >
                Success Stories
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 drop-shadow-md">
                What Our Community Says
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Join successful startups and investors who found perfect matches through our platform.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Rahul Verma",
                  role: "Startup Founder",
                  review:
                    "The AI matching connected us with ideal investors in 72 hours. We secured 1.8Cr funding at better terms than expected!",
                  avatar: "/user1.png",
                },
                {
                  name: "Priya Khanna",
                  role: "Angel Investor",
                  review:
                    "Found 3 high-potential startups in my niche this quarter. The live deal feature makes due diligence and negotiations seamless.",
                  avatar: "/user3.png",
                },
                {
                  name: "Arjun Mehta",
                  role: "Venture Partner",
                  review:
                    "Our fund deployed ₹25Cr through this platform. The security & ROI tracking features give us complete confidence.",
                  avatar: "/user2.png",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-2 border-primary/20 group hover:border-primary/40 bg-white shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-500 backdrop-blur-lg overflow-hidden relative h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    <CardContent className="pt-6 relative z-10">
                      <div className="flex items-center gap-2 mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="mt-4 text-gray-600 group-hover:text-gray-900 transition-colors duration-300 italic">
                        "{testimonial.review}"
                      </p>
                      <div className="mt-6 flex items-center">
                        <Image
                          src={testimonial.avatar || "/user1.png"}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="rounded-full mr-4"
                          onError={(e) => {
                            // Fallback to a default avatar if image fails to load
                            e.currentTarget.src = "/user1.png";
                          }}
                        />
                        <div>
                          <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Future?</h2>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join hundreds of startups and investors achieving growth through smart matches and secure deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="w-full sm:w-auto"
                onClick={handleGetStarted}
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-black hover:bg-black hover:text-white w-full sm:w-auto"
                onClick={() => handleNavigation("investor")}
              >
                Explore Investor Plans
              </Button>
            </div>
            <p className="mt-6 text-sm opacity-80">  Fuel Dreams, Fund Futures – Where Investors Meet Innovation</p>
          </div>
        </section>

        {/* Footer */}
        <Footer />
        <ChatBot />
      </div>
      {/* </CustomLayout> */}
    </>
  )
}

export default LandingPage
