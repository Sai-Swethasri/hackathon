import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useStore } from "@/lib/store";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
  captcha: z.string().min(1, {
    message: "Please enter the captcha.",
  }),
});

export default function AuthPage() {
  const { login, user } = useStore();
  const { toast } = useToast();
  const [_, setLocation] = useLocation();
  const [captcha, setCaptcha] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  // ⭐ Username placeholder state
  const [usernamePlaceholder, setUsernamePlaceholder] = useState("Enter username");

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
  };

  // Redirect if logged in
  useEffect(() => {
    if (user) {
      setLocation(user.role === 'admin' ? '/admin' : '/dashboard');
    }
  }, [user, setLocation]);

  useEffect(() => {
    generateCaptcha();
  }, []);

  // ⭐ Change username placeholder when switching login/signup
  useEffect(() => {
    if (isSignUp) {
      setUsernamePlaceholder("Choose a username");
    } else {
      setUsernamePlaceholder("Enter username");
    }
  }, [isSignUp]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      captcha: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>, role: 'student' | 'admin') {
    if (values.captcha.toUpperCase() !== captcha) {
      toast({
        variant: "destructive",
        title: "Incorrect Captcha",
        description: "Please enter the characters exactly as shown.",
      });
      generateCaptcha();
      form.setValue("captcha", "");
      return;
    }

    if (!isSignUp && role === 'admin') {
      if (values.username !== 'adim123' || values.password !== 'admin') {
        toast({
          variant: "destructive",
          title: "Invalid Credentials",
          description: "Please check your username and password.",
        });
        return;
      }
    }

    if (isSignUp) {
      toast({
        title: "Account Created!",
        description: "Welcome to GreenSteps. You are now logged in.",
      });
    }

    login(values.username, role);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="bg-primary/10 p-3 rounded-full mb-2">
            <Leaf className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-heading font-bold">Welcome to GreenSteps</h1>
          <p className="text-muted-foreground">
            {isSignUp
              ? "Create an account to start your journey"
              : "Log in to continue your sustainable journey"}
          </p>
        </div>

        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>{isSignUp ? "Create Account" : "Login"}</CardTitle>
            <CardDescription>
              {isSignUp
                ? "Enter a username and password to get started."
                : "Enter your username and password to access your account."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSignUp ? (
              // SIGNUP FORM
              <div className="space-y-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit((v) => onSubmit(v, "student"))} className="space-y-4">

                    {/* Username */}
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder={usernamePlaceholder} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Password */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Create a password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* CAPTCHA */}
                    <FormField
                      control={form.control}
                      name="captcha"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Enter Characters</FormLabel>
                          <div className="flex gap-2">
                            <div className="flex items-center justify-center bg-muted px-4 py-2 rounded-md font-mono font-bold text-xl tracking-widest select-none min-w-[120px]">
                              {captcha}
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={generateCaptcha}
                              tabIndex={-1}
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          </div>
                          <FormControl>
                            <Input placeholder="Type characters above" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full text-base">
                      Sign Up
                    </Button>
                  </form>
                </Form>

                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsSignUp(false)}
                    className="font-semibold text-primary hover:underline"
                  >
                    Log in
                  </button>
                </div>
              </div>
            ) : (
              // LOGIN FORM WITH TABS
              <Tabs
                defaultValue="student"
                className="w-full"
                onValueChange={(tab) => {
                  setUsernamePlaceholder(
                    tab === "admin" ? "Enter admin username" : "Enter student username"
                  );
                }}
              >
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="student">Student</TabsTrigger>
                  <TabsTrigger value="admin">Admin</TabsTrigger>
                </TabsList>

                {/* STUDENT LOGIN */}
                <TabsContent value="student">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit((v) => onSubmit(v, "student"))}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder={usernamePlaceholder} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Enter password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="captcha"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Enter Characters</FormLabel>
                            <div className="flex gap-2">
                              <div className="flex items-center justify-center bg-muted px-4 py-2 rounded-md font-mono font-bold text-xl">
                                {captcha}
                              </div>
                              <Button type="button" variant="ghost" size="icon" onClick={generateCaptcha}>
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                            </div>
                            <FormControl>
                              <Input placeholder="Type characters above" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full text-base">
                        Login as Student
                      </Button>
                    </form>
                  </Form>

                  <div className="mt-4 text-center text-sm">
                    New here?{" "}
                    <button
                      onClick={() => setIsSignUp(true)}
                      className="font-semibold text-primary hover:underline"
                    >
                      Create account
                    </button>
                  </div>
                </TabsContent>

                {/* ADMIN LOGIN */}
                <TabsContent value="admin">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit((v) => onSubmit(v, "admin"))}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder={usernamePlaceholder} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Enter password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="captcha"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Enter Characters</FormLabel>
                            <div className="flex gap-2">
                              <div className="flex items-center justify-center bg-muted px-4 py-2 rounded-md font-mono font-bold text-xl">
                                {captcha}
                              </div>
                              <Button type="button" variant="ghost" size="icon" onClick={generateCaptcha}>
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                            </div>
                            <FormControl>
                              <Input placeholder="Type characters above" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full text-base" variant="secondary">
                        Login as Admin
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
