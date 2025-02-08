import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const getSession = async () => {
  try {
    const session = await auth();
    return session;
  } catch (error) {
    console.error("Error fetching session:", error);
    return null;
  }
};

export const validateSession = async () => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      redirect("/signin"); 
      return null; // Ensure function does not continue execution after redirect
    }

    return session;
  } catch (error) {
    console.error("Error validating session:", error);
    return null;
  }
};
