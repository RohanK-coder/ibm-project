import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface ProgressData {
  progress: { lesson_id: number; completed: boolean }[];
  xp: { total_xp: number; current_level: number };
}

export default function StudentDashboard() {
  const [data, setData] = useState<ProgressData | null>(null);

  useEffect(() => {
    api
      .get("/progress/me")
      .then((res) => setData(res.data))
      .catch(() => setData(null));
  }, []);

  const totalXp = data?.xp?.total_xp || 0;
  const level = data?.xp?.current_level || 1;
  const progressPercent = Math.min((totalXp % 100), 100);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total XP</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{totalXp}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Level</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{level}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Badges</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Badge>Starter</Badge>
          <Badge variant="secondary">Learner</Badge>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Progress to next level</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Progress value={progressPercent} />
          <p className="text-sm text-muted-foreground">
            {100 - progressPercent} XP needed for next level
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Completed lessons</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{data?.progress?.length || 0}</p>
        </CardContent>
      </Card>
    </div>
  );
}