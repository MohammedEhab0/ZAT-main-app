import { useState } from "react";
import { skills as initialSkills } from "@/data/dummyData";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash, Brain, Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface Skill {
  id: string;
  name: string;
  dimension: "heart" | "brain";
  definition: string;
}

export default function AdminSkills() {
  const { toast } = useToast();
  const [skills, setSkills] = useState(initialSkills);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSkill, setCurrentSkill] = useState<Skill>({
    id: "",
    name: "",
    dimension: "brain",
    definition: "",
  });
  /// open the dialog
  /// and set the current skill to edit or create a new one
  const handleOpenDialog = (skill?: Skill) => {
    if (skill) {
      setCurrentSkill(skill);
      setIsEditing(true);
    } else {
      setCurrentSkill({ id: "", name: "", dimension: "brain", definition: "" });
      setIsEditing(false);
    }
    setIsDialogOpen(true);
  };
  /// handle input change
  /// update the current skill state
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentSkill({
      ...currentSkill,
      [name]: value,
    });
  };

  const handleDimensionChange = (value: "heart" | "brain") => {
    setCurrentSkill({
      ...currentSkill,
      dimension: value,
    });
  };
  /// generate a unique ID for the skill
  const generateId = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, "");
  };
  /// handle save skill
  /// check if the skill name and definition are not empty

  const handleSaveSkill = () => {
    if (!currentSkill.name || !currentSkill.definition) {
      toast({
        title: "Error",
        description: "Skill name and definition are required",
        variant: "destructive",
      });
      return;
    }
    /// if they are not empty, check if we are editing or creating a new skill
    /// if we are editing, update the skill
    /// if we are creating a new skill, add it to the skills array
    if (isEditing) {
      setSkills(
        skills.map((skill) =>
          skill.id === currentSkill.id ? currentSkill : skill
        )
      );
      toast({
        title: "Skill updated",
        description: `${currentSkill.name} has been updated successfully.`,
      });
    } else {
      const newSkill = {
        ...currentSkill,
        id: currentSkill.id || generateId(currentSkill.name),
      };

      setSkills([...skills, newSkill]);
      toast({
        title: "Skill added",
        description: `${newSkill.name} has been added successfully.`,
      });
    }

    setIsDialogOpen(false);
  };
  /// handle delete skill
  /// filter the skills array to remove the skill with the given id
  /// show a toast message to confirm deletion
  const handleDeleteSkill = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id));
    toast({
      title: "Skill deleted",
      description: "The skill has been deleted successfully.",
    });
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Skills Management</h1>
        <p className="text-muted-foreground">
          Create and manage skill definitions and categories.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Skills Library</CardTitle>
          <Button
            className="flex items-center gap-2"
            onClick={() => handleOpenDialog()}
          >
            <Plus className="h-4 w-4" />
            Add Skill
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Dimension</TableHead>
                <TableHead>Definition</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skills.map((skill) => (
                <TableRow key={skill.id}>
                  <TableCell className="font-mono text-sm">
                    {skill.id}
                  </TableCell>
                  <TableCell className="font-medium">{skill.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {skill.dimension === "heart" ? (
                        <>
                          <Heart className="h-4 w-4 text-red-500" />
                          <span>Heart</span>
                        </>
                      ) : (
                        <>
                          <Brain className="h-4 w-4 text-blue-500" />
                          <span>Brain</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell
                    className="max-w-xs truncate"
                    title={skill.definition}
                  >
                    {skill.definition.length > 60
                      ? `${skill.definition.substring(0, 60)}...`
                      : skill.definition}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenDialog(skill)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => handleDeleteSkill(skill.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Skill" : "Add New Skill"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={currentSkill.name}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="e.g., Leadership"
              />
            </div>
            {isEditing && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id" className="text-right">
                  ID
                </Label>
                <Input
                  id="id"
                  name="id"
                  value={currentSkill.id}
                  className="col-span-3"
                  readOnly
                  disabled
                />
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dimension" className="text-right">
                Dimension
              </Label>
              <Select
                value={currentSkill.dimension}
                onValueChange={(value) =>
                  handleDimensionChange(value as "heart" | "brain")
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a dimension" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="heart">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span>Heart</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="brain">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-blue-500" />
                      <span>Brain</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="definition" className="text-right pt-2">
                Definition
              </Label>
              <Textarea
                id="definition"
                name="definition"
                value={currentSkill.definition}
                onChange={handleInputChange}
                className="col-span-3 min-h-[100px]"
                placeholder="Provide a clear definition of this skill..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSaveSkill}>
              {isEditing ? "Save Changes" : "Add Skill"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
