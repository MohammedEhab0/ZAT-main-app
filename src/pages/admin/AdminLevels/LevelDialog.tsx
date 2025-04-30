import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Level } from "@/data/dummyData"; // Adjust the import path as necessary

interface Props {
  isOpen: boolean;
  isEditing: boolean;
  level: Level;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onClose: () => void;
}

export default function LevelDialog({
  isOpen,
  isEditing,
  level,
  onChange,
  onSave,
  onClose,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Level" : "Add New Level"}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? "Update the existing level details below." : "Enter the details for the new level."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={level.name}
              onChange={onChange}
              className="col-span-3"
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
                value={level.id}
                readOnly
                disabled
                className="col-span-3"
              />
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="score" className="text-right">
              Score
            </Label>
            <Input
              id="score"
              name="score"
              type="number"
              step="0.01"
              value={level.score}
              onChange={onChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onSave}>
            {isEditing ? "Save Changes" : "Add Level"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
