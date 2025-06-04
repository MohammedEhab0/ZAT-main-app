import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Slider from "@mui/material/Slider"; // MUI Slider

import { quizQuestions, skills } from "@/data/dummyData";
import bgQuiz from "@/assets/images/quizBg.jpg";
import bgLeft from "@/assets/images/left-bg.png"; // NEW: Import bgLeft
import bgRight from "@/assets/images/right-bg.png"; // NEW: Import bgRight

// Define the time limit for each question
const QUIZ_QUESTION_TIME_LIMIT = 30; // seconds

export default function Assessmnt() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<number>(50); // Default to 50
  const navigate = useNavigate();

  const totalQuestions = quizQuestions.length;
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = (currentQuestionIndex / totalQuestions) * 100;

  // State for the time left for the CURRENT question
  const [timeLeft, setTimeLeft] = useState(QUIZ_QUESTION_TIME_LIMIT);

  // --- NEW STATE: For handling orientation message ---
  const [showOrientationMessage, setShowOrientationMessage] = useState(false);

  // Helper function to get skill name (wrapped in useCallback for stability)
  const getSkillName = useCallback((skillId: string) => {
    return skills.find((skill) => skill.id === skillId)?.name || skillId;
  }, []);

  // handleNext: Logic for processing an answer and advancing to the next question or completing the quiz.
  const handleNext = useCallback(() => {
    // Only proceed if the orientation message is not being shown
    if (showOrientationMessage) return;

    const currentAnswerValue = selectedValue;

    const leftPercentage = 100 - currentAnswerValue;
    const rightPercentage = currentAnswerValue;
    const answer = `${leftPercentage}% ${getSkillName(
      currentQuestion.skillLeft
    )} / ${rightPercentage}% ${getSkillName(currentQuestion.skillRight)}`;

    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers, answer];

      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedValue(50); // Reset the slider to default 50 for the next question
      } else {
        console.log("✅ Quiz completed, all answers:", newAnswers);
        navigate("/");
      }
      return newAnswers;
    });
  }, [
    selectedValue,
    getSkillName,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    navigate,
    showOrientationMessage, // Dependency for handleNext
  ]);

  // Function to format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // --- NEW useEffect for Orientation Detection ---
  useEffect(() => {
    const checkOrientation = () => {
      // Simple heuristic for mobile: screen width less than a common tablet breakpoint
      const isMobile = window.innerWidth < 768; // Or use a more robust mobile detection if needed

      // Check if the device is in portrait mode
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;

      // If it's a mobile device AND in portrait mode, show the message
      if (isMobile && isPortrait) {
        setShowOrientationMessage(true);
      } else {
        setShowOrientationMessage(false);
      }
    };

    // Initial check on mount
    checkOrientation();

    // Add event listeners for orientation changes and window resize
    // 'orientationchange' is specific to some mobile browsers, 'resize' is more universal
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  // --- MODIFIED useEffect for Timer Management ---
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    // Only start/continue the timer if the orientation message is NOT being shown
    if (!showOrientationMessage) {
      setTimeLeft(QUIZ_QUESTION_TIME_LIMIT); // Reset timer when question changes or orientation changes back to landscape

      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            console.log("⏰ Time's up for current question! Auto-advancing.");
            handleNext();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      // If message is shown, ensure timer is cleared
      if (timer) clearInterval(timer);
    }

    // Cleanup function: Clear the interval when the component unmounts,
    // or when currentQuestionIndex, handleNext, or showOrientationMessage changes.
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [currentQuestionIndex, handleNext, showOrientationMessage]); // Added showOrientationMessage as dependency

  if (!currentQuestion) {
    return <div>No Questions Available</div>;
  }

  return (
    <div
      className="min-h-screen  " // Added relative for overlay positioning
      style={{
        backgroundImage: `url(${bgQuiz})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* <Navigation /> */}

      {/* --- NEW: Orientation Message Overlay --- */}
      {showOrientationMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50 p-4 text-white text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-24 h-24 mb-6 animate-pulse"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75A2.25 2.25 0 0 0 15.75 1.5H13.5m-3 0V3.75m3-2.25V3.75M9 15.75h3m-3 3h3m-3 3h3m3-6h3m-3 3h3m-3 3h3M9 1.5h.75m-3 .75H7.5m-3 .75H6.75m-3 .75H6m-3 .75H5.25m-3 .75H4.5m-3 .75H3.75"
            />
          </svg>
          <h2 className="text-3xl font-bold mb-4">Please Rotate Your Device</h2>
          <p className="text-xl ">
            For the best assessment experience, please rotate your phone to{" "}
            <span className="font-semibold">landscape mode</span>.
          </p>
          <p className="text-lg mt-2">The quiz will resume automatically.</p>
        </div>
      )}

      {/* Main Quiz Content - Hidden when orientation message is shown */}
      <div className={`pt-28 pb-20 ${showOrientationMessage ? "hidden" : ""}`}>
        <div className="container mx-auto max-w-5xl">
          {/* Timer Display */}
          <div className="flex justify-center mb-2">
            <div className="text-center text-lg mb-1 text-muted-foreground font-normal border-2 w-fit rounded-full py-5 px-1 border-black">
              <p className="text-black">{formatTime(timeLeft) + "s"}</p>
            </div>
          </div>

          <div className="mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xl text-black font-bold">
                Question {currentQuestionIndex + 1}
              </span>
              <span className="text-xl text-black font-bold">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress
              value={progress}
              className="h-6 bg-gray-200 [&>div]:bg-[#5300B3]"
            />
          </div>

          {/* Question Card */}
          <Card className="mb-6 bg-transparent border-none">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {/* {currentQuestion.questionText}{" "}
                Re-added questionText to CardTitle */}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-5 mb-2">
                <div
                  className=" p-24 rounded-lg bg-contain bg-center bg-no-repeat text-center "
                  style={{ backgroundImage: `url(${bgLeft})` }}
                >
                  <p className="text-[#5300B3] font-bold xl:text-lg text-base py-3 m-2">
                    {currentQuestion.skillLeftDefinition}
                  </p>
                </div>
                <div
                  className=" p-24 rounded-lg bg-contain bg-center bg-no-repeat text-center "
                  style={{ backgroundImage: `url(${bgRight})` }}
                >
                  <p className="text-[#5300B3] font-bold xl:text-lg text-base py-3 m-2">
                    {currentQuestion.skillRightDefinition}
                  </p>
                </div>
              </div>

              {/* Slider for Answer Options (MUI Slider) */}
              <div className="flex flex-col items-center space-y-4">
                <Slider
                  min={0}
                  max={100}
                  step={25}
                  value={selectedValue}
                  onChange={(event: Event, newValue: number | number[]) => {
                    setSelectedValue(newValue as number);
                  }}
                  sx={{
                    color: "#FF24E5", // Track color
                    height: 8,
                    "& .MuiSlider-thumb": {
                      // Thumb styling
                      height: 30,
                      width: 30,
                      backgroundColor: "#FF24E5",
                      border: "3px solid #ffffff",
                      "&:focus, &:hover, &.Mui-active": {
                        boxShadow: "inherit",
                      },
                    },
                    "& .MuiSlider-track": {
                      // Track styling
                      border: "none",
                      width: "100%", // This was causing issues, removed explicit width
                      height: 24,
                    },
                    "& .MuiSlider-rail": {
                      // Rail styling
                      opacity: 1,
                      backgroundColor: "#ffffff",
                      width: "100%", // This was causing issues, removed explicit width
                      height: 24,
                    },
                  }}
                  className="w-full" // Tailwind class for width
                />
                <div className="flex justify-between w-full md:text-lg text-[.6rem] font-bold text-[#5300B3] text-base mb-2">
                  <span>Very Agree</span>
                  <span>Agree</span>
                  <span>Neutral</span>
                  <span>Agree</span>
                  <span>Very Agree</span>
                </div>
              </div>
            </CardContent>

            <div className="flex justify-end mt-5">
              <Button
                onClick={handleNext}
                className="transition-all duration-200 hover:scale-105 bg-[#FFF200] text-black hover:bg-[#FFF200]/90 font-bold rounded-xl text-lg"
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
