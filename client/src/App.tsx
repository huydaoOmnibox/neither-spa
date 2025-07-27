import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { Box } from "@/pages/Box";
import { Products } from "@/pages/Products";
import { Gallery } from "@/pages/Gallery";
import { Pricelist } from "@/pages/Pricelist";
import { Contact } from "@/pages/Contact";
import { Admin } from "@/pages/Admin";
import { Login } from "@/pages/Login";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Protected Route Component
function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const token = localStorage.getItem('adminToken');
  
  if (!token) {
    // Redirect to login if no token
    window.location.href = '/login';
    return null;
  }
  
  return <Component />;
}

function Router() {
  return (
    <Switch>
      {/* Add pages below */}
              <Route path="/" component={Box} />
        <Route path="/products" component={Products} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/pricelist" component={Pricelist} />
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={Login} />
        <Route path="/admin" component={() => <ProtectedRoute component={Admin} />} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Router />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
