
export type TreeType = {
  id: string;
  name: string;
  icon: string;
};

export type TreeHistoryEntry = {
  id: string;
  date: string;
  action: "planted" | "pruned" | "harvested" | "maintained";
  notes: string;
};

export type Tree = {
  id: string;
  type: TreeType;
  plantedDate: string;
  history: TreeHistoryEntry[];
};

export type GridCell = {
  id: string;
  row: number;
  col: number;
  tree: Tree | null;
};

export type Field = {
  id: string;
  name: string;
  rows: number;
  cols: number;
  cells: GridCell[];
};
