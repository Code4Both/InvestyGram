"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { MatchMeter } from "@/components/MatchMeter";
import { IStartup } from "@/models/Startup";

interface MatchScores {
  visionAlignment: { score: number; reason: string };
  domainMatch: { score: number; reason: string };
  growthPotential: { score: number; reason: string };
}

interface StartupData {
  companyImage: {
    url: string;
    fileType: string;
    originalName: string;
  };
  name: string;
  tagline: string;
  fundingInfo: {
    amountRaised: number;
    targetAmount: number;
    currentRound: string;
  };
  socialProof: {
    instagramFollowers: number;
  };
  investorPrefs: {
    minInvestment: number;
    preferredIndustries: string[];
  };
  matchScores?: MatchScores;
}

const gradientClasses = [
  "bg-gradient-to-br from-blue-500/20 to-purple-500/20",
  "bg-gradient-to-br from-green-500/20 to-cyan-500/20",
  "bg-gradient-to-br from-orange-500/20 to-red-500/20",
  "bg-gradient-to-br from-pink-500/20 to-purple-500/20",
];

export function StartupsReel() {
  const [startups, setStartups] = useState<StartupData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentInvestorId] = useState("1");

  // In your StartupsReel component
  const fetchData = async () => {
    try {
      const investorId = localStorage.getItem("clientId");
      if (!investorId) throw new Error("Investor not logged in");

      // First get startup IDs
      const startupsRes = await fetch("/api/startups");
      const startupsData = await startupsRes.json();

      if (startupsData.success) {
        // Then get scores for all startups
        const scoresRes = await fetch("/api/match-score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            investorId,
            startupIds: startupsData.data, // array of ID strings
          }),
        });

        // ... handle response ...
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await fetch("/api/startups");
        const data = await response.json();
        if (data.success) {
          setStartups(data.data);
        }
      } catch (error) {
        console.error("Error fetching startups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

  if (loading) {
    return (
      <div className="h-screen snap-y snap-mandatory overflow-y-scroll">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-screen w-screen snap-start snap-always p-4">
            <Skeleton className="h-full w-full rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="h-screen snap-y snap-mandatory overflow-y-scroll scrollbar-hide"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {startups.map((startup, index) => (
        <section key={index} className="h-full w-md snap-start snap-always p-4">
          <Card
            className={`h-full w-full overflow-hidden relative ${
              gradientClasses[index % gradientClasses.length]
            }`}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-3xl">{startup.name}</CardTitle>
              <CardDescription className="text-lg">
                {startup.tagline}
              </CardDescription>
            </CardHeader>

            <CardContent className="h-[60vh] flex flex-col gap-4">
              <div className="relative h-48 w-full rounded-xl overflow-hidden">
                <img
                  src={startup.companyImage?.url || ""}
                  alt={startup.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                  <div className="flex justify-between text-white text-sm">
                    <span>🏷️ {startup.fundingInfo.currentRound}</span>
                    <span>
                      📸{" "}
                      {startup.socialProof.instagramFollowers.toLocaleString()}{" "}
                      followers
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 flex-grow">
                <div className="space-y-1">
                  <div className="flex justify-between font-medium">
                    <span>Raised</span>
                    <span>Target</span>
                  </div>
                  <Progress
                    value={
                      (startup.fundingInfo.amountRaised /
                        startup.fundingInfo.targetAmount) *
                      100
                    }
                    className="h-3 bg-gray-200"
                  />
                  <div className="flex justify-between text-sm">
                    <span>
                      ${startup.fundingInfo.amountRaised.toLocaleString()}
                    </span>
                    <span>
                      ${startup.fundingInfo.targetAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-background/50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">Minimum Investment</h3>
                      <p className="text-2xl font-bold text-primary">
                        ${startup.investorPrefs.minInvestment.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <h3 className="font-semibold">Preferred Industries</h3>
                      <p className="text-sm text-muted-foreground">
                        {startup.investorPrefs.preferredIndustries.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {startup.matchScores && (
                  <>
                    <MatchMeter
                      value={startup.matchScores.visionAlignment.score}
                      label="Vision Match"
                    />
                    <MatchMeter
                      value={startup.matchScores.domainMatch.score}
                      label="Domain Match"
                    />
                    <MatchMeter
                      value={startup.matchScores.growthPotential.score}
                      label="Growth Potential"
                    />
                  </>
                )}
              </div>
              {startup.matchScores && (
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>💡 {startup.matchScores.visionAlignment.reason}</p>
                  <p>🎯 {startup.matchScores.domainMatch.reason}</p>
                  <p>📈 {startup.matchScores.growthPotential.reason}</p>
                </div>
              )}
            </CardContent>

            <CardFooter className="absolute bottom-0 w-full bg-background/80 border-t">
              <div className="w-full text-center py-2 animate-pulse text-sm text-muted-foreground">
                Swipe up for next opportunity ↓
              </div>
            </CardFooter>
          </Card>
        </section>
      ))}
    </motion.div>
  );
}
