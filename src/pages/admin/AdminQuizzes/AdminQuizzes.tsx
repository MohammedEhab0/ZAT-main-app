import { useState } from "react";
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
import { Plus, Edit, Trash, FileQuestion } from "lucide-react";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useToast } from "@/components/ui/use-toast";
import {
  levels,
  skills,
  quizQuestions as initialQuestions,
} from "@/data/dummyData";

interface Level {
  id: string;
  name: string;
  score: number;
}

interface Skill {
  id: string;
  name: string;
  dimension: "heart" | "brain";
  definition: string;
}

interface QuizQuestion {
  id: string;
  level: string;
  questionText: string;
  skillLeft: string;
  skillRight: string;
  skillLeftDefinition: string;
  skillRightDefinition: string;
}

export default function AdminQuizzes() {
  const { toast } = useToast();

  // Mock data now imported from centralized dummy data
  const [questions, setQuestions] = useState(initialQuestions);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion>({
    id: "",
    level: "",
    questionText: "",
    skillLeft: "",
    skillRight: "",
    skillLeftDefinition: "",
    skillRightDefinition: "",
  });
  ///  open  the dialog for creating a new question or editing an existing one
  const handleOpenDialog = (question?: QuizQuestion) => {
    if (question) {
      setCurrentQuestion(question);
      setIsEditing(true);
    } else {
      setCurrentQuestion({
        id: `q${questions.length + 1}`,
        level: levels[0].id,
        questionText: "",
        skillLeft: "",
        skillRight: "",
        skillLeftDefinition: "",
        skillRightDefinition: "",
      });
      setIsEditing(false);
    }
    setIsDialogOpen(true);
  };
  ///handle input changes for text and textarea fields

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentQuestion({
      ...currentQuestion,
      [name]: value,
    });
  };
  ///handle select changes for dropdown fields
  ///update the current question state with the selected value
  const handleSelectChange = (field: string, value: string) => {
    setCurrentQuestion({
      ...currentQuestion,
      [field]: value,
    });
  };
  ///handle save question
  ///check if all required fields are filled
  ///if not, show a toast notification
  const handleSaveQuestion = () => {
    if (
      !currentQuestion.questionText ||
      !currentQuestion.level ||
      !currentQuestion.skillLeft ||
      !currentQuestion.skillRight ||
      !currentQuestion.skillLeftDefinition ||
      !currentQuestion.skillRightDefinition
    ) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }
    ///check if left and right skills are different
    if (currentQuestion.skillLeft === currentQuestion.skillRight) {
      toast({
        title: "Error",
        description: "Left and right skills must be different",
        variant: "destructive",
      });
      return;
    }
    ///replace old question with new one with same id
    ///or add new question to the list
    ///and show a toast notification
    if (isEditing) {
      setQuestions(
        questions.map((q) =>
          q.id === currentQuestion.id ? currentQuestion : q
        )
      );
      toast({
        title: "Question updated",
        description: "Quiz question has been updated successfully.",
      });
    } else {
      setQuestions([...questions, currentQuestion]);
      toast({
        title: "Question added",
        description: "New quiz question has been added successfully.",
      });
    }

    setIsDialogOpen(false);
  };
  ///handle delete question
  ///delete question by filtering out the one with the given id
  ///and show a toast notification
  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
    toast({
      title: "Question deleted",
      description: "The quiz question has been deleted successfully.",
    });
  };
  ///get level name by id
  ///find the level object in the levels array that matches the given id
  ///and return its name or the id if not found
  const getLevelNameById = (levelId: string) => {
    return levels.find((level) => level.id === levelId)?.name || levelId;
  };
  ///get skill name by id
  ///find the skill object in the skills array that matches the given id
  ///and return its name or the id if not found
  const getSkillNameById = (skillId: string) => {
    return skills.find((skill) => skill.id === skillId)?.name || skillId;
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Quizzes Management</h1>
        <p className="text-muted-foreground">
          Create and manage skill assessment quiz questions.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <FileQuestion className="h-5 w-5" />
            <CardTitle>Assessment Questions</CardTitle>
          </div>
          <Button
            className="flex items-center gap-2"
            onClick={() => handleOpenDialog()}
          >
            <Plus className="h-4 w-4" />
            Create Question
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Question</TableHead>
                <TableHead>Left Skill</TableHead>
                <TableHead>Right Skill</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {questions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell className="font-mono text-sm">
                    {question.id}
                  </TableCell>
                  <TableCell>{getLevelNameById(question.level)}</TableCell>
                  <TableCell
                    className="max-w-xs truncate"
                    title={question.questionText}
                  >
                    {question.questionText.length > 50
                      ? `${question.questionText.substring(0, 50)}...`
                      : question.questionText}
                  </TableCell>
                  <TableCell>{getSkillNameById(question.skillLeft)}</TableCell>
                  <TableCell>{getSkillNameById(question.skillRight)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenDialog(question)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => handleDeleteQuestion(question.id)}
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
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Question" : "Create New Question"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {isEditing && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id" className="text-right">
                  Question ID
                </Label>
                <Input
                  id="id"
                  name="id"
                  value={currentQuestion.id}
                  className="col-span-3"
                  readOnly
                  disabled
                />
              </div>
            )}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="level" className="text-right">
                Difficulty Level
              </Label>
              <Select
                value={currentQuestion.level}
                onValueChange={(value) => handleSelectChange("level", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level.id} value={level.id}>
                      {level.name} (Score: {level.score.toFixed(2)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="questionText" className="text-right pt-2">
                Question Text
              </Label>
              <Textarea
                id="questionText"
                name="questionText"
                value={currentQuestion.questionText}
                onChange={handleInputChange}
                className="col-span-3 min-h-[80px]"
                placeholder="Enter the question that will be presented to the user..."
              />
            </div>

            <Collapsible className="border rounded-md p-4">
              <CollapsibleTrigger asChild>
                <div className="flex justify-between cursor-pointer py-2">
                  <h3 className="font-semibold">Left Skill Options</h3>
                  <Button variant="ghost" size="sm">
                    Details
                  </Button>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-4 pt-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="skillLeft" className="text-right">
                      Left Skill
                    </Label>
                    <Select
                      value={currentQuestion.skillLeft}
                      onValueChange={(value) =>
                        handleSelectChange("skillLeft", value)
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select skill" />
                      </SelectTrigger>
                      <SelectContent>
                        {skills.map((skill) => (
                          <SelectItem key={skill.id} value={skill.id}>
                            {skill.name} ({skill.dimension})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label
                      htmlFor="skillLeftDefinition"
                      className="text-right pt-2"
                    >
                      Left Skill Definition
                    </Label>
                    <Textarea
                      id="skillLeftDefinition"
                      name="skillLeftDefinition"
                      value={currentQuestion.skillLeftDefinition}
                      onChange={handleInputChange}
                      className="col-span-3 min-h-[80px]"
                      placeholder="Specific definition for this question..."
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="border rounded-md p-4">
              <CollapsibleTrigger asChild>
                <div className="flex justify-between cursor-pointer py-2">
                  <h3 className="font-semibold">Right Skill Options</h3>
                  <Button variant="ghost" size="sm">
                    Details
                  </Button>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-4 pt-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="skillRight" className="text-right">
                      Right Skill
                    </Label>
                    <Select
                      value={currentQuestion.skillRight}
                      onValueChange={(value) =>
                        handleSelectChange("skillRight", value)
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select skill" />
                      </SelectTrigger>
                      <SelectContent>
                        {skills.map((skill) => (
                          <SelectItem key={skill.id} value={skill.id}>
                            {skill.name} ({skill.dimension})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label
                      htmlFor="skillRightDefinition"
                      className="text-right pt-2"
                    >
                      Right Skill Definition
                    </Label>
                    <Textarea
                      id="skillRightDefinition"
                      name="skillRightDefinition"
                      value={currentQuestion.skillRightDefinition}
                      onChange={handleInputChange}
                      className="col-span-3 min-h-[80px]"
                      placeholder="Specific definition for this question..."
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSaveQuestion}>
              {isEditing ? "Save Changes" : "Create Question"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
