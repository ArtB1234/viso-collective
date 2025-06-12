"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SignInButtonProps {
  provider?: string;
  className?: string;
}

export function SignInButton({ provider = "google", className }: SignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn(provider, { callbackUrl: "/" });
    } catch (error) {
      console.error("Error signing in:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleSignIn} 
      disabled={isLoading}
      className={className}
    >
      {isLoading ? "Signing in..." : `Sign in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`}
    </Button>
  );
}
