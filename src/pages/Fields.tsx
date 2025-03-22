
import React from "react";
import { Link } from "react-router-dom";
import { useFields } from "@/context/FieldsContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Trash2, Grid } from "lucide-react";

const Fields = () => {
  const { fields, setCurrentField, deleteField } = useFields();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <header className="max-w-5xl mx-auto mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">My Farm Fields</h1>
        <p className="text-muted-foreground">View and manage your farm fields</p>
      </header>

      <main className="max-w-5xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Your Fields</h2>
          <Link to="/create">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Field
            </Button>
          </Link>
        </div>

        {fields.length === 0 ? (
          <Card className="bg-muted/50">
            <CardContent className="pt-6 text-center">
              <p className="mb-4 text-muted-foreground">You haven't created any fields yet.</p>
              <Link to="/create">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Your First Field
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fields.map((field) => (
              <Card key={field.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle>{field.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="grid gap-0.5 border rounded-md p-1 bg-soil-dark mb-2"
                    style={{ 
                      gridTemplateColumns: `repeat(${Math.min(field.cols, 5)}, 1fr)`,
                      height: '100px'
                    }}
                  >
                    {field.cells.slice(0, Math.min(field.cols, 5) * Math.min(field.rows, 5)).map((cell) => (
                      <div
                        key={cell.id}
                        className={`${
                          (cell.row + cell.col) % 2 === 0 ? "bg-soil-light" : "bg-soil"
                        } aspect-square flex items-center justify-center`}
                      >
                        {cell.tree && (
                          <span className="text-xl">{cell.tree.type.icon}</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {field.rows} rows × {field.cols} columns
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <Link 
                    to={`/field/${field.id}`}
                    onClick={() => setCurrentField(field.id)}
                  >
                    <Button variant="outline" size="sm">
                      <Grid className="mr-2 h-4 w-4" />
                      Manage
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => deleteField(field.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>

      <footer className="max-w-5xl mx-auto mt-12 text-center text-sm text-muted-foreground">
        <p>Farm Field Management App &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Fields;
