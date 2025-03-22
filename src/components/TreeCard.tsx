
import React from "react";
import { Tree, TreeHistoryEntry } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TreeCardProps {
  tree: Tree;
  onAddHistory: (action: TreeHistoryEntry["action"], notes: string) => void;
  onRemove: () => void;
}

const TreeCard: React.FC<TreeCardProps> = ({ tree, onAddHistory, onRemove }) => {
  const lastAction = tree.history.length > 0 ? tree.history[tree.history.length - 1] : null;
  
  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-4xl">{tree.type.icon}</span>
            <div>
              <CardTitle>{tree.type.name}</CardTitle>
              <CardDescription>Planted: {new Date(tree.plantedDate).toLocaleDateString()}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="text-sm">
          <h4 className="font-medium mb-1">Last Activity:</h4>
          {lastAction ? (
            <p className="text-muted-foreground">
              {new Date(lastAction.date).toLocaleDateString()} - {lastAction.action}: {lastAction.notes}
            </p>
          ) : (
            <p className="text-muted-foreground">No activity recorded</p>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-wrap gap-2 pt-0">
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => onAddHistory("pruned", `Pruned ${tree.type.name}`)}
        >
          Prune
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => onAddHistory("maintained", `Maintained ${tree.type.name}`)}
        >
          Maintain
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => onAddHistory("harvested", `Harvested ${tree.type.name}`)}
        >
          Harvest
        </Button>
        <Button 
          size="sm" 
          variant="destructive" 
          onClick={onRemove}
        >
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TreeCard;
