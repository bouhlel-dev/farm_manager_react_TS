
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Field } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <header className="max-w-5xl mx-auto mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Farm Field Manager</h1>
        <p className="text-muted-foreground">Create and manage your farm fields with ease</p>
      </header>

      <main className="max-w-5xl mx-auto">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Welcome to Farm Field Manager</CardTitle>
            <CardDescription>
              An easy way to manage your farm fields and trees
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>This application helps you:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Create virtual representations of your fields</li>
              <li>Plant different types of trees in your fields</li>
              <li>Track the history of each tree (planting, pruning, harvesting)</li>
              <li>Manage multiple fields in one place</li>
            </ul>
            <Button 
              onClick={() => navigate("/fields")} 
              className="w-full mt-4"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </main>

      <footer className="max-w-5xl mx-auto mt-12 text-center text-sm text-muted-foreground">
        <p>Farm Field Management App &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Index;
