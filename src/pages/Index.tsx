
import React, { useState } from "react";
import { Field } from "@/types";
import { createField } from "@/utils/fieldUtils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CreateFieldForm from "@/components/CreateFieldForm";
import FieldGrid from "@/components/FieldGrid";

const Index = () => {
  const [field, setField] = useState<Field | null>(null);

  const handleFieldCreation = (name: string, rows: number, cols: number) => {
    const newField = createField(name, rows, cols);
    setField(newField);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <header className="max-w-5xl mx-auto mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Farm Field Manager</h1>
        <p className="text-muted-foreground">Create and manage your farm fields with ease</p>
      </header>

      <main className="max-w-5xl mx-auto">
        {!field ? (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Create New Field</CardTitle>
              <CardDescription>
                Define your field dimensions to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CreateFieldForm onFieldCreated={handleFieldCreation} />
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Field Management</h2>
              <button
                onClick={() => setField(null)}
                className="text-sm text-primary hover:text-primary/80"
              >
                Create New Field
              </button>
            </div>
            
            <FieldGrid field={field} onFieldUpdate={setField} />
          </div>
        )}
      </main>

      <footer className="max-w-5xl mx-auto mt-12 text-center text-sm text-muted-foreground">
        <p>Farm Field Management App &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Index;
