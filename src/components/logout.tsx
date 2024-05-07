"use client";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { signOut, useSession } from "next-auth/react";
import { LoaderCircle, LogOut } from "lucide-react";

const Logout = ({ className }: { className?: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut({
        redirect: false,
      });
      toast({
        title: "Logged out successfully. 👋",
        description:
          "You have been successfully logged out. We hope to seeing you again soon!",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error signing out.",
        description:
          "We encountered an error while signing out. Please try signing out again.",
      });
    }
    setIsLoading(false);
  };

  return session ? (
    <AlertDialog>
      <AlertDialogTrigger
        asChild
        className={`w-full max-w-[236px] h-12 ${className}`}
      >
        <Button className={`w-full max-w-[236px] h-12 ${className}`}>
          {isLoading ? (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="mr-2 h-4 w-4" />
          )}
          Log out
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to log out? You will need to log in again to
              continue using our services.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ) : null;
};

export default Logout;
