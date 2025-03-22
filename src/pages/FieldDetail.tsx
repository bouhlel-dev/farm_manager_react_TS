
import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useFields } from "@/context/FieldsContext";
import FieldGrid from "@/components/FieldGrid";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const FieldDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { fields, currentField, setCurrentField, updateField } = useFields();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setCurrentField(id);
    }
  }, [id, setCurrentField]);

  // If the field doesn't exist, redirect to fields page
  useEffect(() => {
    if (id && fields.length > 0 && !fields.some(f => f.id === id)) {
      navigate("/fields");
    }
  }, [id, fields, navigate]);

  if (!currentField) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading field...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <header className="max-w-5xl mx-auto mb-8">
        <Link to="/fields">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Fields
          </Button>
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{currentField.name}</h1>
        <p className="text-muted-foreground">
          Manage your {currentField.rows}×{currentField.cols} field
        </p>
      </header>

      <main className="max-w-5xl mx-auto">
        <FieldGrid 
          field={currentField} 
          onFieldUpdate={updateField} 
        />
      </main>

      <footer className="max-w-5xl mx-auto mt-12 text-center text-sm text-muted-foreground">
        <p>Farm Field Management App &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default FieldDetail;
