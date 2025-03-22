
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createField } from "@/utils/fieldUtils";

interface CreateFieldFormProps {
  onFieldCreated: (name: string, rows: number, cols: number) => void;
}

const CreateFieldForm: React.FC<CreateFieldFormProps> = ({ onFieldCreated }) => {
  const [name, setName] = useState("My Farm Field");
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError("Please enter a field name");
      return;
    }
    
    if (rows < 1 || cols < 1) {
      setError("Dimensions must be at least 1x1");
      return;
    }
    
    if (rows > 10 || cols > 10) {
      setError("Maximum field size is 10x10");
      return;
    }
    
    onFieldCreated(name, rows, cols);
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-card rounded-lg border shadow-sm space-y-4 animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="name">Field Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter field name"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rows">Rows</Label>
          <Input
            id="rows"
            type="number"
            min={1}
            max={10}
            value={rows}
            onChange={(e) => setRows(parseInt(e.target.value) || 1)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cols">Columns</Label>
          <Input
            id="cols"
            type="number"
            min={1}
            max={10}
            value={cols}
            onChange={(e) => setCols(parseInt(e.target.value) || 1)}
          />
        </div>
      </div>
      
      {error && <p className="text-destructive text-sm">{error}</p>}
      
      <Button type="submit" className="w-full">Create Field</Button>
    </form>
  );
};

export default CreateFieldForm;
