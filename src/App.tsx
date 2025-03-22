
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FieldsProvider } from "@/context/FieldsContext";

// Pages
import Index from "./pages/Index";
import Fields from "./pages/Fields";
import CreateField from "./pages/CreateField";
import FieldDetail from "./pages/FieldDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <FieldsProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/fields" replace />} />
            <Route path="/welcome" element={<Index />} />
            <Route path="/fields" element={<Fields />} />
            <Route path="/create" element={<CreateField />} />
            <Route path="/field/:id" element={<FieldDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </FieldsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
