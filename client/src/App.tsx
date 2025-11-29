import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StoreProvider } from "@/lib/store";
import { Layout } from "@/components/layout";
import NotFound from "@/pages/not-found";

// Pages
import Home from "@/pages/home";
import AuthPage from "@/pages/auth";
import Dashboard from "@/pages/dashboard";
import Lessons from "@/pages/lessons";
import Projects from "@/pages/projects";
import Resources from "@/pages/resources";

// Admin Pages
import AdminDashboard from "@/pages/admin/dashboard";
import ManageLessons from "@/pages/admin/manage-lessons";
import ManageProjects from "@/pages/admin/manage-projects";
import ManageResources from "@/pages/admin/manage-resources";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/auth" component={AuthPage} />
        
        {/* User Routes */}
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/lessons" component={Lessons} />
        <Route path="/projects" component={Projects} />
        <Route path="/resources" component={Resources} />

        {/* Admin Routes */}
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/lessons" component={ManageLessons} />
        <Route path="/admin/projects" component={ManageProjects} />
        <Route path="/admin/resources" component={ManageResources} />

        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </StoreProvider>
    </QueryClientProvider>
  );
}

export default App;
