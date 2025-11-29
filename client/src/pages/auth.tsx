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
    message: "Please solve the math problem.",
  }),
});

export default function AuthPage() {
  const { login, user } = useStore();
  const { toast } = useToast();
  const [_, setLocation] = useLocation();
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: 0 });

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    setCaptcha({ num1, num2, answer: num1 + num2 });
  };

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      setLocation(user.role === 'admin' ? '/admin' : '/dashboard');
    }
  }, [user, setLocation]);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      captcha: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>, role: 'student' | 'admin') {
    if (parseInt(values.captcha) !== captcha.answer) {
      toast({
        variant: "destructive",
        title: "Incorrect Captcha",
        description: "Please check your math and try again.",
      });
      generateCaptcha();
      form.setValue("captcha", "");
      return;
    }

    if (role === 'admin') {
      if (values.username !== 'adim123' || values.password !== 'admin') {
        toast({
          variant: "destructive",
          title: "Invalid Credentials",
          description: "Please check your username and password.",
        });
        return;
      }
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
            Log in to continue your sustainable journey
          </p>
        </div>

        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your username and password to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>

              <TabsContent value="student">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit((v) => onSubmit(v, 'student'))} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="student123" {...field} />
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
                            <Input type="password" placeholder="Enter password here" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Captcha Field */}
                    <FormField
                      control={form.control}
                      name="captcha"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Human Verification</FormLabel>
                          <div className="flex gap-2">
                            <div className="flex items-center justify-center bg-muted px-4 py-2 rounded-md font-mono font-bold text-lg select-none min-w-[80px]">
                              {captcha.num1} + {captcha.num2} = ?
                            </div>
                            <Button type="button" variant="ghost" size="icon" onClick={generateCaptcha} tabIndex={-1}>
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          </div>
                          <FormControl>
                            <Input placeholder="Enter answer" {...field} type="number" />
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
              </TabsContent>

              <TabsContent value="admin">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit((v) => onSubmit(v, 'admin'))} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="admin" {...field} />
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
                            <Input type="password" placeholder="Enter password here" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Captcha Field */}
                    <FormField
                      control={form.control}
                      name="captcha"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Human Verification</FormLabel>
                          <div className="flex gap-2">
                            <div className="flex items-center justify-center bg-muted px-4 py-2 rounded-md font-mono font-bold text-lg select-none min-w-[80px]">
                              {captcha.num1} + {captcha.num2} = ?
                            </div>
                            <Button type="button" variant="ghost" size="icon" onClick={generateCaptcha} tabIndex={-1}>
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          </div>
                          <FormControl>
                            <Input placeholder="Enter answer" {...field} type="number" />
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
