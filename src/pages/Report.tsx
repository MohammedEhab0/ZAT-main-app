import { Button } from "@/components/ui/button";

import Navigation from "@/components/Navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { skillScores, recommendedRoles } from "@/data/dummyData";

import pdfMake from "pdfmake/build/pdfmake";

import pdfFonts from "pdfmake/build/vfs_fonts";

// PDFMake imports

pdfMake.vfs = pdfFonts;

const COLORS = ["#33C3F0", "#1EAEDB", "#48D1CC", "#20B2AA", "#00CED1"];

export default function Report() {
  const totalScore = skillScores.reduce((sum, skill) => sum + skill.score, 0);
  const averageScore = Math.round(totalScore / skillScores.length);

  const pieData = skillScores.map((skill) => ({
    name: skill.name,
    value: skill.score,
  }));

  const handleDownloadPDF = () => {
    try {
      const adviceText = [
        "Remember, career growth is a journey. Focus on roles that not only align with your strengths but also challenge you to grow. Don’t hesitate to explore new fields — your unique skill set may open unexpected doors.",
        "Keep exploring new challenges and never stop learning — the most successful careers are built on adaptability and curiosity.",
        "Consider reaching out to mentors or career coaches to help you reflect on your progress and goals regularly.",
      ];

      const docDefinition = {
        content: [
          { text: "Career Advice", style: "header", textcolor: "#1EAEDB" },
          ...adviceText.map((paragraph) => ({
            text: paragraph,
            margin: [0, 10],
            style: "paragraph",
          })),
        ],
        styles: {
          header: {
            fontSize: 22,
            bold: true,
            margin: [0, 0, 0, 15],
          },
          paragraph: {
            fontSize: 12,
            alignment: "justify",
          },
        },
      };

      pdfMake.createPdf(docDefinition).download("career_advice.pdf");
    } catch (err) {
      console.error("PDF Download failed:", err);
      alert("Something went wrong while generating the PDF.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light to-white">
      <Navigation />

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Assessment Complete!</CardTitle>
              <p className="text-lg mt-2">
                Congratulations on completing your skill assessment
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold">{averageScore}%</span>
                </div>
                <h3 className="text-xl font-medium">Your Overall Score</h3>
              </div>

              <Button onClick={handleDownloadPDF} className="mt-2">
                Download PDF Report
              </Button>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Skill Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={skillScores}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score" fill="#33C3F0" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Career Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Based on your skills assessment, here are some career paths that
                might be a good match for your abilities:
              </p>

              {/* Advice Paragraph */}
              <div className="mb-6 p-4 bg-muted rounded-md text-sm text-muted-foreground border">
                <p>
                  Remember, career growth is a journey. Focus on roles that not
                  only align with your strengths but also challenge you to grow.
                  Don’t hesitate to explore new fields — your unique skill set
                  <br />
                  may open unexpected doors.
                </p>
                <p>
                  Keep exploring new challenges and never stop learning — the
                  most successful careers are built on adaptability and
                  curiosity.
                </p>
                <p>
                  Consider reaching out to mentors or career coaches to help you
                  reflect on your progress and goals regularly.
                </p>
              </div>

              {/* Recommended Roles */}
              <div className="grid md:grid-cols-2 gap-4">
                {recommendedRoles.map((role, index) => (
                  <div key={index} className="bg-secondary p-4 rounded-lg">
                    <h3 className="font-semibold">{role}</h3>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <p className="text-neutral-500">
                  Want to explore more career options based on your skills?
                </p>
                <Button className="mt-2">Consult AI Career Coach</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
