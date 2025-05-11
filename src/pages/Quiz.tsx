import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider"; // Import your slider component
import { quizQuestions, skills } from "@/data/dummyData";

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("50"); // Default to 50
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const totalQuestions = quizQuestions.length;
  const totalTimeInSeconds = totalQuestions * 30;
  const [timeLeft, setTimeLeft] = useState(totalTimeInSeconds);
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = (currentQuestionIndex / totalQuestions) * 100;

  useEffect(() => {
    if (timeLeft <= 0) {
      console.log("⏰ Time's up! Auto-submitting answers:", answers);
      navigate("/report"); // Use navigate instead of window.location.href
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, answers, navigate]);

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

    const leftPercentage = 100 - parseInt(selectedValue);
    const rightPercentage = parseInt(selectedValue);
    const answer = `${leftPercentage}% ${getSkillName(
      currentQuestion.skillLeft
    )} / ${rightPercentage}% ${getSkillName(currentQuestion.skillRight)}`;

    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedValue("50"); // Reset the slider to default
    } else {
      console.log("✅ Quiz completed, all answers:", newAnswers);
      navigate("/report"); // Use navigate instead of window.location.href
    }
  };

  if (!currentQuestion) {
    return <div>No Questions Available</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#5300B3] to-white">
      <Navigation />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Timer */}
          <div className="text-center text-lg mb-2 text-muted-foreground font-semibold">
            Time Left:{" "}
            <span className="text-[#5300B3]">{formatTime(timeLeft)}</span>
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

              {/* Slider for Answer Options */}
              <div className="flex flex-col items-center space-y-4">
                <Slider
                  value={[parseInt(selectedValue)]} // Default to 50-50
                  onValueChange={(value) =>
                    setSelectedValue(value[0].toString())
                  }
                  step={25} // Each step represents one choice
                  min={0}
                  max={100}
                  className="w-full"
                />
                <div className="flex justify-between w-full text-sm font-medium">
                  <span>Very Agree</span>
                  <span>Agree</span>
                  <span>Neutral</span>
                  <span>Agree</span>
                  <span>Very Agree</span>
                </div>
              </div>
            </CardContent>

            <div className="flex justify-center my-4">
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
          </Card>
        </div>
      </div>
    </div>
  );
}
