import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { quizes, users } from "@/data/dummyData";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const userName = users[0].name; // This would come from your authentication system
  const totalQuizzes = quizes.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light to-white">
      <Navigation />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Welcome, {userName}!
          </h1>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <Card className="bg-white overflow-hidden">
              <div
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b')`,
                }}
              />
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Skill Assessment
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  {totalQuizzes} quizzes available to assess your skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {quizes.map((quiz, index) => (
                    <div
                      key={quiz.id}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary"
                    >
                      <span className="text-base font-bold ">
                        {quiz.quizName}
                      </span>
                      <Link to="/quiz">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 font-bold"
                        >
                          Take Quiz <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/quiz" className="w-full">
                  <Button className="w-full gap-2">
                    Start Assessment <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="bg-white overflow-hidden">
              <div
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b')`,
                }}
              />
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  AI Career Coach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Get smart, personalized career suggestions based on your
                  results and interests. Let AI help you make informed
                  decisions.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button className="gap-2 w-full">
                  Launch Career Coach <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-neutral-500">
                You haven't completed any assessments yet. Start your first
                assessment to see your progress!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
