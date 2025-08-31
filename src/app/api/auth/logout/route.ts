import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete("token");

        // Create a response that also clears the token cookie on the client side
        const response = NextResponse.json({ message: "Logged out successfully" });
        
        // Clear the token cookie on the client side as well
        response.cookies.delete("token");
        
        return response;
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json(
            { error: "Failed to logout" },
            { status: 500 }
        );
    }
} 