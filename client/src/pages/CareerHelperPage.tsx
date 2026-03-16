import { FormEvent, useState } from "react";
import { api } from "../lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface CareerResult {
  recommendedRoles: string[];
  skillGaps: string[];
  recommendedCourses: string[];
  roadmap: string[];
}

export default function CareerHelperPage() {
  const [interests, setInterests] = useState("technology, problem solving");
  const [skills, setSkills] = useState("Excel, Python");
  const [targetRole, setTargetRole] = useState("Data Analyst");
  const [result, setResult] = useState<CareerResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/career/analyze", {
        interests: interests.split(",").map((x) => x.trim()),
        skills: skills.split(",").map((x) => x.trim()),
        targetRole,
      });

      setResult(res.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Career Helper</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium">Interests</label>
              <Textarea
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Current skills</label>
              <Textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Target role</label>
              <Input
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
              />
            </div>

            <Button className="w-full">
              {loading ? "Analyzing..." : "Analyze Career Path"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!result && (
            <p className="text-sm text-muted-foreground">
              Fill in your profile to get career guidance.
            </p>
          )}

          {result && (
            <>
              <div>
                <h3 className="mb-2 font-semibold">Recommended roles</h3>
                <div className="flex flex-wrap gap-2">
                  {result.recommendedRoles.map((role) => (
                    <Badge key={role}>{role}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Skill gaps</h3>
                <div className="flex flex-wrap gap-2">
                  {result.skillGaps.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Recommended courses</h3>
                <ul className="list-disc space-y-1 pl-5 text-sm">
                  {result.recommendedCourses.map((course) => (
                    <li key={course}>{course}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Roadmap</h3>
                <ul className="list-disc space-y-1 pl-5 text-sm">
                  {result.roadmap.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}