"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Define the form schema
const formSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  equity: z.string().min(1, "Equity percentage is required"),
  royalty: z.string().min(1, "Royalty percentage is required"),
  conditions: z.string().min(1, "Conditions are required"),
  status: z.enum(['pending', 'accepted', 'rejected']).default('pending'),
});

// Type for the form input values
type FormValues = z.infer<typeof formSchema>;

// Type for processed data after transformation
interface ProcessedFormData {
  amount: number;
  equity: number;
  royalty: number;
  conditions: string[];
  status: 'pending' | 'accepted' | 'rejected';
}

export default function MakeOffer() {
  const router = useRouter();
  const params = useParams<{ startupId: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      equity: "",
      royalty: "",
      conditions: "",
      status: "pending",
    },
  });

  const saveOfferToDatabase = async (values: ProcessedFormData) => {
    try {
      const investorId = localStorage.getItem("InvestorId");
      
      if (!investorId) {
        toast.error("Please log in to make an offer");
        setIsSubmitting(false);
        return;
      }

      const response = await fetch("/api/bids", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startupId: params.startupId,
          investorId,
          ...values,
          status: "pending",
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Offer submitted successfully!");
        router.push(`/investor/discover/${params.startupId}`);
      } else {
        toast.error(data.error || "Failed to submit offer");
        setIsSubmitting(false);
      }
    } catch (error) {
      toast.error("An error occurred while submitting offer");
      console.error("Error submitting offer:", error);
      setIsSubmitting(false);
    }
  };

  async function onSubmit(values: FormValues) {
    try {
      setIsSubmitting(true);

      // Process and validate form values
      const processedValues: ProcessedFormData = {
        amount: Number(values.amount),
        equity: Number(values.equity),
        royalty: Number(values.royalty),
        conditions: values.conditions.split('\n').filter((line: string) => line.trim() !== ''),
        status: values.status
      };
      
      // Validate the numbers
      if (isNaN(processedValues.amount) || processedValues.amount <= 0) {
        toast.error("Please enter a valid positive amount");
        setIsSubmitting(false);
        return;
      }
      
      if (isNaN(processedValues.equity) || processedValues.equity < 0 || processedValues.equity > 100) {
        toast.error("Please enter a valid equity percentage (0-100%)");
        setIsSubmitting(false);
        return;
      }
      
      if (isNaN(processedValues.royalty) || processedValues.royalty < 0 || processedValues.royalty > 100) {
        toast.error("Please enter a valid royalty percentage (0-100%)");
        setIsSubmitting(false);
        return;
      }
      
      // Submit to database
      await saveOfferToDatabase(processedValues);
      
    } catch (error) {
      console.error("Error submitting offer:", error);
      toast.error("Failed to submit offer. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container max-w-3xl mx-auto p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Make an Offer</CardTitle>
          <CardDescription>
            Submit your investment offer for this startup. Please review all terms carefully before submitting.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Investment Amount ($)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="100000"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the amount you wish to invest
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="equity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Equity Percentage (%)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="10"
                          type="number"
                          min="0"
                          max="100"
                          step="0.01"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Requested equity share
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="royalty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Royalty Percentage (%)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="5"
                          type="number"
                          min="0"
                          max="100"
                          step="0.01"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Requested royalty percentage
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="conditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investment Conditions</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter each condition on a new line:
1. Board seat requirement
2. Monthly performance reports
3. First right of refusal for future rounds"
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      List your conditions, one per line
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                <h3 className="text-lg font-medium text-blue-800 mb-2">Important Notice</h3>
                <p className="text-blue-700 text-sm">
                  This offer will be submitted to the startup for review. The startup will be notified of your offer and can accept, reject, or negotiate the terms.
                </p>
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Offer"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
} 