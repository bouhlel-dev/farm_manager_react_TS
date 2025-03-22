
import React from "react";
import { TreeHistoryEntry } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TreeHistoryProps {
  history: TreeHistoryEntry[];
}

const TreeHistory: React.FC<TreeHistoryProps> = ({ history }) => {
  const sortedHistory = [...history].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getActionColor = (action: TreeHistoryEntry["action"]) => {
    switch (action) {
      case "planted":
        return "text-foliage-dark";
      case "pruned":
        return "text-amber-600";
      case "harvested":
        return "text-orange-600";
      case "maintained":
        return "text-blue-600";
      default:
        return "text-foreground";
    }
  };

  const getActionIcon = (action: TreeHistoryEntry["action"]) => {
    switch (action) {
      case "planted":
        return "🌱";
      case "pruned":
        return "✂️";
      case "harvested":
        return "🧺";
      case "maintained":
        return "🔧";
      default:
        return "📝";
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">Tree History</CardTitle>
      </CardHeader>
      <CardContent>
        {sortedHistory.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No history yet</p>
        ) : (
          <div className="space-y-3">
            {sortedHistory.map((entry) => (
              <div key={entry.id} className="flex items-start gap-2 pb-3 border-b last:border-0">
                <span className="text-xl mt-0.5">{getActionIcon(entry.action)}</span>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(entry.date).toLocaleDateString()}
                  </p>
                  <p className={`font-medium capitalize ${getActionColor(entry.action)}`}>
                    {entry.action}
                  </p>
                  <p className="text-sm">{entry.notes}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TreeHistory;
