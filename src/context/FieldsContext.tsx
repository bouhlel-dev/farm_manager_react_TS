
import React, { createContext, useContext, useState, useEffect } from "react";
import { FieldsState, Field } from "@/types";
import { createField } from "@/utils/fieldUtils";

type FieldsContextType = {
  fields: Field[];
  currentField: Field | null;
  addField: (name: string, rows: number, cols: number) => void;
  setCurrentField: (fieldId: string | null) => void;
  updateField: (field: Field) => void;
  deleteField: (fieldId: string) => void;
};

const FieldsContext = createContext<FieldsContextType | undefined>(undefined);

export const useFields = () => {
  const context = useContext(FieldsContext);
  if (!context) {
    throw new Error("useFields must be used within a FieldsProvider");
  }
  return context;
};

export const FieldsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<FieldsState>(() => {
    // Try to load from localStorage on initial render
    const savedState = localStorage.getItem("farm-fields");
    return savedState 
      ? JSON.parse(savedState) 
      : { fields: [], currentField: null };
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("farm-fields", JSON.stringify(state));
  }, [state]);

  const addField = (name: string, rows: number, cols: number) => {
    const newField = createField(name, rows, cols);
    setState(prev => ({
      fields: [...prev.fields, newField],
      currentField: newField
    }));
    return newField;
  };

  const setCurrentField = (fieldId: string | null) => {
    if (!fieldId) {
      setState(prev => ({ ...prev, currentField: null }));
      return;
    }
    
    const field = state.fields.find(f => f.id === fieldId) || null;
    setState(prev => ({ ...prev, currentField: field }));
  };

  const updateField = (updatedField: Field) => {
    setState(prev => ({
      fields: prev.fields.map(field => 
        field.id === updatedField.id ? updatedField : field
      ),
      currentField: prev.currentField?.id === updatedField.id 
        ? updatedField 
        : prev.currentField
    }));
  };

  const deleteField = (fieldId: string) => {
    setState(prev => ({
      fields: prev.fields.filter(field => field.id !== fieldId),
      currentField: prev.currentField?.id === fieldId ? null : prev.currentField
    }));
  };

  return (
    <FieldsContext.Provider 
      value={{
        fields: state.fields,
        currentField: state.currentField,
        addField,
        setCurrentField,
        updateField,
        deleteField
      }}
    >
      {children}
    </FieldsContext.Provider>
  );
};
