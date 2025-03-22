
import { Field, GridCell, Tree, TreeHistoryEntry, TreeType } from "@/types";

// Sample tree types
export const treeTypes: TreeType[] = [
  { id: "1", name: "Oak", icon: "🌳" },
  { id: "2", name: "Pine", icon: "🌲" },
  { id: "3", name: "Palm", icon: "🌴" },
  { id: "4", name: "Apple", icon: "🍎" },
  { id: "5", name: "Cherry", icon: "🍒" },
  { id: "6", name: "Lemon", icon: "🍋" },
];

// Create a new field with empty cells
export const createField = (name: string, rows: number, cols: number): Field => {
  const cells: GridCell[] = [];
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push({
        id: `cell-${r}-${c}`,
        row: r,
        col: c,
        tree: null,
      });
    }
  }
  
  return {
    id: `field-${Date.now()}`,
    name,
    rows,
    cols,
    cells,
  };
};

// Plant a tree in a specific cell
export const plantTree = (field: Field, cellId: string, treeType: TreeType): Field => {
  const updatedCells = field.cells.map((cell) => {
    if (cell.id === cellId) {
      const newTree: Tree = {
        id: `tree-${Date.now()}`,
        type: treeType,
        plantedDate: new Date().toISOString().split('T')[0],
        history: [
          {
            id: `history-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            action: "planted",
            notes: `Planted ${treeType.name}`,
          },
        ],
      };
      return { ...cell, tree: newTree };
    }
    return cell;
  });

  return { ...field, cells: updatedCells };
};

// Add a history entry to a tree
export const addTreeHistory = (
  field: Field, 
  cellId: string, 
  action: TreeHistoryEntry["action"], 
  notes: string
): Field => {
  const updatedCells = field.cells.map((cell) => {
    if (cell.id === cellId && cell.tree) {
      const newHistoryEntry: TreeHistoryEntry = {
        id: `history-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        action,
        notes,
      };
      
      return {
        ...cell,
        tree: {
          ...cell.tree,
          history: [...cell.tree.history, newHistoryEntry],
        },
      };
    }
    return cell;
  });

  return { ...field, cells: updatedCells };
};

// Remove a tree from a cell
export const removeTree = (field: Field, cellId: string): Field => {
  const updatedCells = field.cells.map((cell) => {
    if (cell.id === cellId) {
      return { ...cell, tree: null };
    }
    return cell;
  });

  return { ...field, cells: updatedCells };
};
