// Authentication utility functions

export interface AuthUser {
  isLoggedIn: boolean;
  userType: "startup" | "investor" | null;
  userId?: string;
}

/**
 * Check if user is authenticated and get user type
 */
export const checkUserAuth = (): AuthUser => {
  if (typeof window === "undefined") {
    return { isLoggedIn: false, userType: null };
  }

  const startupId = localStorage.getItem("StartupId");
  const investorId = localStorage.getItem("InvestorId");
  
  if (startupId) {
    return { isLoggedIn: true, userType: "startup", userId: startupId };
  } else if (investorId) {
    return { isLoggedIn: true, userType: "investor", userId: investorId };
  } else {
    return { isLoggedIn: false, userType: null };
  }
};

/**
 * Clear all authentication data
 */
export const clearAuthData = () => {
  if (typeof window === "undefined") return;
  
  localStorage.removeItem("UserId");
  localStorage.removeItem("StartupId");
  localStorage.removeItem("InvestorId");
  localStorage.removeItem("userName");
};

/**
 * Check if user can access a specific route
 */
export const canAccessRoute = (route: string, userType: "startup" | "investor" | null): boolean => {
  if (!userType) return false;
  
  if (route.startsWith("/startups") && userType !== "startup") {
    return false;
  }
  
  if (route.startsWith("/investor") && userType !== "investor") {
    return false;
  }
  
  return true;
};
