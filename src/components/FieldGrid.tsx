
import React, { useState } from "react";
import { Field, GridCell, TreeHistoryEntry, TreeType } from "@/types";
import { addTreeHistory, plantTree, removeTree } from "@/utils/fieldUtils";
import TreeSelector from "./TreeSelector";
import TreeCard from "./TreeCard";
import TreeHistory from "./TreeHistory";

interface FieldGridProps {
  field: Field;
  onFieldUpdate: (updatedField: Field) => void;
}

const FieldGrid: React.FC<FieldGridProps> = ({ field, onFieldUpdate }) => {
  const [selectedCell, setSelectedCell] = useState<GridCell | null>(null);
  const [showTreeSelector, setShowTreeSelector] = useState(false);
  const [showTreeDetails, setShowTreeDetails] = useState(false);

  const handleCellClick = (cell: GridCell) => {
    setSelectedCell(cell);
    
    if (cell.tree) {
      setShowTreeDetails(true);
      setShowTreeSelector(false);
    } else {
      setShowTreeSelector(true);
      setShowTreeDetails(false);
    }
  };

  const handleTreeSelect = (treeType: TreeType) => {
    if (selectedCell) {
      const updatedField = plantTree(field, selectedCell.id, treeType);
      onFieldUpdate(updatedField);
      
      // Find the updated cell to select it with the new tree
      const updatedCell = updatedField.cells.find(c => c.id === selectedCell.id) || null;
      setSelectedCell(updatedCell);
      setShowTreeSelector(false);
      setShowTreeDetails(true);
    }
  };

  const handleAddTreeHistory = (action: TreeHistoryEntry["action"], notes: string) => {
    if (selectedCell && selectedCell.tree) {
      const updatedField = addTreeHistory(field, selectedCell.id, action, notes);
      onFieldUpdate(updatedField);
      
      // Find the updated cell to select it with the updated tree
      const updatedCell = updatedField.cells.find(c => c.id === selectedCell.id) || null;
      setSelectedCell(updatedCell);
    }
  };

  const handleRemoveTree = () => {
    if (selectedCell) {
      const updatedField = removeTree(field, selectedCell.id);
      onFieldUpdate(updatedField);
      setSelectedCell(null);
      setShowTreeDetails(false);
    }
  };

  const handleCloseDetails = () => {
    setSelectedCell(null);
    setShowTreeDetails(false);
    setShowTreeSelector(false);
  };

  // Generate alternating cell colors (chessboard style)
  const getCellClass = (row: number, col: number) => {
    const isEven = (row + col) % 2 === 0;
    return isEven ? "bg-soil-light" : "bg-soil";
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 animate-fade-in">
      <div className="flex-1">
        <div 
          className="grid gap-1 border rounded-lg p-2 bg-soil-dark shadow-inner"
          style={{ 
            gridTemplateColumns: `repeat(${field.cols}, 1fr)`,
            maxWidth: `${Math.min(field.cols * 80, 800)}px`,
          }}
        >
          {field.cells.map((cell) => (
            <div
              key={cell.id}
              className={`${getCellClass(cell.row, cell.col)} aspect-square rounded flex items-center justify-center cursor-pointer transition-all duration-200 hover:opacity-90 ${
                selectedCell?.id === cell.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleCellClick(cell)}
            >
              {cell.tree ? (
                <span className="text-3xl animate-grow">{cell.tree.type.icon}</span>
              ) : (
                <div className="w-3/4 h-3/4 rounded-full border-2 border-dashed border-soil-dark/30 flex items-center justify-center">
                  <span className="text-xl text-soil-dark/30">+</span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <h3 className="font-medium">{field.name}</h3>
          <p className="text-sm text-muted-foreground">{field.rows} rows × {field.cols} columns</p>
        </div>
      </div>

      <div className="md:w-[350px]">
        {showTreeSelector && (
          <TreeSelector 
            onSelect={handleTreeSelect} 
            onCancel={handleCloseDetails} 
          />
        )}
        
        {showTreeDetails && selectedCell?.tree && (
          <div className="space-y-4">
            <TreeCard 
              tree={selectedCell.tree} 
              onAddHistory={handleAddTreeHistory} 
              onRemove={handleRemoveTree} 
            />
            
            <TreeHistory history={selectedCell.tree.history} />
            
            <div className="text-center">
              <button 
                onClick={handleCloseDetails}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Close Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldGrid;
