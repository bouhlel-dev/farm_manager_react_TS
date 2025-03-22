
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CreateFieldForm from "@/components/CreateFieldForm";
import { useFields } from "@/context/FieldsContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CreateField = () => {
  const { addField } = useFields();
  const navigate = useNavigate();

  const handleFieldCreation = (name: string, rows: number, cols: number) => {
    addField(name, rows, cols);
    navigate("/fields");
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <header className="max-w-5xl mx-auto mb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Create New Field</h1>
        <p className="text-muted-foreground">Set up a new field for your farm</p>
      </header>

      <main className="max-w-5xl mx-auto">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Field Details</CardTitle>
            <CardDescription>
              Define your field dimensions to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateFieldForm onFieldCreated={handleFieldCreation} />
          </CardContent>
        </Card>
      </main>

      <footer className="max-w-5xl mx-auto mt-12 text-center text-sm text-muted-foreground">
        <p>Farm Field Management App &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default CreateField;
