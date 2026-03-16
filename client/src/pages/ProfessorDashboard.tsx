import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Group {
  id: number;
  name: string;
  description: string;
}

export default function ProfessorDashboard() {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    api.get("/groups/mine").then((res) => setGroups(res.data));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Professor Dashboard</h2>
          <p className="text-muted-foreground">
            Manage course groups and monitor learning tracks.
          </p>
        </div>
        <Button asChild>
          <Link to="/professor/groups/new">Create Group</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {groups.map((group) => (
          <Card key={group.id}>
            <CardHeader>
              <CardTitle>{group.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {group.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}