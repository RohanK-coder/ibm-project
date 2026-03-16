import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    api.get("/courses").then((res) => setCourses(res.data));
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Courses</h2>
        <p className="text-muted-foreground">
          Explore curated courses and skill tracks.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {course.description}
              </p>
              <div className="text-sm">
                <p>
                  <span className="font-medium">Category:</span> {course.category}
                </p>
                <p>
                  <span className="font-medium">Difficulty:</span>{" "}
                  {course.difficulty}
                </p>
              </div>
              <Button className="w-full">View Course</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}