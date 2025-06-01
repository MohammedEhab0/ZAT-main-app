import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { levels as initialLevels } from "@/data/dummyData";
import { useToast } from "@/components/ui/use-toast";
import LevelTable from "@/pages/admin/AdminLevels/LevelTable";
import LevelDialog from "@/pages/admin/AdminLevels/LevelDialog";

interface Level {
  id: string;
  name: string;
  score: number;
}

export default function AdminLevels() {
  const { toast } = useToast();
  const [levels, setLevels] = useState<Level[]>(initialLevels);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentLevel, setCurrentLevel] = useState<Level>({
    id: "",
    name: "",
    score: 0,
  });
  /// Open the  Dialog
  /// and set the current level to edit or create a new one
  const handleOpenDialog = (level?: Level) => {
    if (level) {
      setCurrentLevel(level);
      setIsEditing(true);
    } else {
      setCurrentLevel({ id: "", name: "", score: 0 });
      setIsEditing(false);
    }
    setIsDialogOpen(true);
  };
  /// Handle input changes in the dialog
  /// Update the current level state
  /// Parse the score to a float if it's a number
  /// Otherwise, keep it as a string
  /// Set the current level state with the new value
  /// Update the score to 0 if the value is not a number
  /// Set the current level state with the new value
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentLevel((prev) => ({
      ...prev,
      [name]: name === "score" ? parseFloat(value) || 0 : value,
    }));
  };
  /// Generate a unique ID for the level
  const generateId = (name: string) => name.toLowerCase().replace(/\s+/g, "");

  /// Handle saving the level
  /// Check if the level name is empty
  /// If it is, show an error toast

  const handleSave = () => {
    if (!currentLevel.name) {
      toast({
        title: "Error",
        description: "Level name is required",
        variant: "destructive",
      });
      return;
    }
    /// If the level is being edited, update the existing level
    /// Otherwise, create a new level
    if (isEditing) {
      setLevels(
        levels.map((level) =>
          level.id === currentLevel.id ? currentLevel : level
        )
      );
      toast({ title: "Updated", description: `${currentLevel.name} updated.` });
    } else {
      const newLevel = { ...currentLevel, id: generateId(currentLevel.name) };
      setLevels([...levels, newLevel]);
      toast({ title: "Added", description: `${newLevel.name} added.` });
    }

    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setLevels(levels.filter((level) => level.id !== id));
    toast({ title: "Deleted", description: "Level removed." });
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Levels Management</h1>
        <p className="text-muted-foreground">
          Create and manage skill assessment difficulty levels.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between flex-wrap">
          <CardTitle className="text-lg md:text-3xl">Skill Levels</CardTitle>
          <Button
            className="flex items-center gap-2 bg-[#5300B3] text-white hover:bg-[#ac6af7]"
            onClick={() => handleOpenDialog()}
          >
            <Plus className="h-4 w-4" />
            Add Level
          </Button>
        </CardHeader>
        <CardContent>
          <LevelTable
            levels={levels}
            onEdit={handleOpenDialog}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <LevelDialog
        isOpen={isDialogOpen}
        isEditing={isEditing}
        level={currentLevel}
        onChange={handleChange}
        onSave={handleSave}
        onClose={() => setIsDialogOpen(false)}
      />
    </AdminLayout>
  );
}
