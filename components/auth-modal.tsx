import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MagicCard } from "@/components/magicui/magic-card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import ReactDOM from "react-dom";
import { useState } from "react";

interface AuthModalProps {
  type: "signIn" | "signUp";
  isVisible: boolean;
  onClose: () => void;
  onGoogleSignIn: () => void;
  onSubmit: (email: string, password: string, name?: string) => Promise<void>;
  theme: string;
}

export default function AuthModal({
  type,
  isVisible,
  onClose,
  onGoogleSignIn,
  onSubmit,
  theme,
}: AuthModalProps) {
  const [authType, setAuthType] = useState(type); // Manage local state for toggling

  if (!isVisible) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="p-0 max-w-sm w-full shadow-none border-none">
        <MagicCard gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"} className="p-0">
          <CardHeader className="border-b border-border p-4 [.border-b]:pb-4">
            <CardTitle>{authType === "signIn" ? "Sign In" : "Sign Up"}</CardTitle>
            <CardDescription>
              {authType === "signIn"
                ? "Enter your credentials to access your account"
                : "Create a new account to start your journey with us"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const email = (e.target as any).email.value;
                const password = (e.target as any).password.value;
                const name = authType === "signUp" ? (e.target as any).name?.value : undefined;

                try {
                  await onSubmit(email, password, name); // Call the onSubmit function
                  onClose(); // Close the modal after successful submission
                  toast.success(
                    authType === "signIn"
                      ? "Successfully signed in!"
                      : "Account successfully created!"
                  );
                } catch (error) {
                  console.error("Error during authentication:", error);
                  toast.error(
                    authType === "signIn"
                      ? "Invalid email or password. Please try again."
                      : "Error creating account. Please try again."
                  );
                }
              }}
            >
              <div className="grid gap-4">
                {authType === "signUp" && (
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      className="placeholder:text-slate-400 text-black border-slate-400"
                    />
                  </div>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="placeholder:text-slate-400 text-black border-slate-400"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="placeholder:text-slate-400 text-black border-slate-400"
                  />
                </div>
              </div>
              <CardFooter className="grid grid-cols-2 gap-3 p-4 border-t border-border">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg"
                >
                  {authType === "signIn" ? "Sign In" : "Sign Up"}
                </Button>
              </CardFooter>
            </form>
            <div className="text-center mt-2">
              <p className="text-sm text-slate-600">Or</p>
              <Button
                className="mt-4 w-full bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg"
                onClick={onGoogleSignIn}
              >
                {authType === "signIn" ? "Sign In with Google" : "Sign Up with Google"}
              </Button>
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-slate-600">
                {authType === "signIn" ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => setAuthType(authType === "signIn" ? "signUp" : "signIn")}
                >
                  {authType === "signIn" ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>
          </CardContent>
        </MagicCard>
      </Card>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}
