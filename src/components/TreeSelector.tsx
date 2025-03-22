
import React from "react";
import { TreeType } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { treeTypes } from "@/utils/fieldUtils";

interface TreeSelectorProps {
  onSelect: (treeType: TreeType) => void;
  onCancel: () => void;
}

const TreeSelector: React.FC<TreeSelectorProps> = ({ onSelect, onCancel }) => {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Select Tree Type</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {treeTypes.map((tree) => (
            <Button
              key={tree.id}
              variant="outline"
              className="h-20 flex flex-col gap-1"
              onClick={() => onSelect(tree)}
            >
              <span className="text-2xl">{tree.icon}</span>
              <span className="text-xs">{tree.name}</span>
            </Button>
          ))}
        </div>
        <Button 
          onClick={onCancel} 
          variant="ghost" 
          className="w-full mt-4"
        >
          Cancel
        </Button>
      </CardContent>
    </Card>
  );
};

export default TreeSelector;
