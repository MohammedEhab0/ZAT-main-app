import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { quizQuestions, skills } from "@/data/dummyData";

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("");

  const totalQuestions = quizQuestions.length;
  const totalTimeInSeconds = totalQuestions * 30;
  const [timeLeft, setTimeLeft] = useState(totalTimeInSeconds);
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  useEffect(() => {
    if (timeLeft <= 0) {
      console.log("⏰ Time's up! Auto-submitting answers:", answers);
      // You can add navigation or a completion screen here
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, answers]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getSkillName = (skillId: string) => {
    return skills.find((skill) => skill.id === skillId)?.name || skillId;
  };

  const handleNext = () => {
    if (!selectedValue) return;

    const newAnswers = [...answers, selectedValue];
    setAnswers(newAnswers);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedValue("");
    } else {
      console.log("✅ Quiz completed, all answers:", newAnswers);
      // Navigate to summary or show result
    }
  };

  if (!currentQuestion) {
    return <div>No Questions Available</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light to-white">
      <Navigation />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Timer */}
          <div className="text-center text-lg mb-2 text-muted-foreground font-semibold">
            Time Left:{" "}
            <span className="text-primary">{formatTime(timeLeft)}</span>
          </div>

          <div className="mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-base font-medium">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <span className="text-base font-medium">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-6" />
          </div>

          {/* Question Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {currentQuestion.questionText}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="bg-secondary p-6 rounded-lg">
                  <h3 className="text-lg font-bold mb-2">
                    {getSkillName(currentQuestion.skillLeft)}
                  </h3>
                  <p className="text-gray-600">
                    {currentQuestion.skillLeftDefinition}
                  </p>
                </div>
                <div className="bg-secondary p-6 rounded-lg">
                  <h3 className="text-lg font-bold mb-2">
                    {getSkillName(currentQuestion.skillRight)}
                  </h3>
                  <p className="text-gray-600">
                    {currentQuestion.skillRightDefinition}
                  </p>
                </div>
              </div>

              {/* Answer Options */}
              <RadioGroup
                value={selectedValue}
                onValueChange={setSelectedValue}
                className="space-y-4"
              >
                {[
                  { value: "100-0", left: 100, right: 0 },
                  { value: "75-25", left: 75, right: 25 },
                  { value: "50-50", left: 50, right: 50 },
                  { value: "25-75", left: 25, right: 75 },
                  { value: "0-100", left: 0, right: 100 },
                ].map(({ value, left, right }, i) => (
                  <div className="flex items-center space-x-2" key={i}>
                    <RadioGroupItem value={value} id={`r${i}`} />
                    <Label htmlFor={`r${i}`} className="text-base">
                      {left}% {getSkillName(currentQuestion.skillLeft)} /{" "}
                      {right}% {getSkillName(currentQuestion.skillRight)}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              onClick={handleNext}
              disabled={!selectedValue}
              className="transition-all duration-200 hover:scale-105"
            >
              {currentQuestionIndex === totalQuestions - 1
                ? "Complete Quiz"
                : "Next Question"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
