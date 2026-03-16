import { Request, Response } from "express";

export const analyzeCareer = async (req: Request, res: Response) => {
  const { interests, skills, targetRole } = req.body;

  if (!targetRole) {
    return res.status(400).json({ message: "targetRole is required" });
  }

  const roleMap: Record<string, { requiredSkills: string[]; recommendedCourses: string[] }> = {
    "data analyst": {
      requiredSkills: ["SQL", "Excel", "Statistics", "Data Visualization"],
      recommendedCourses: ["SQL Basics", "Intro to Statistics", "Data Visualization 101"]
    },
    "frontend developer": {
      requiredSkills: ["HTML", "CSS", "JavaScript", "React", "TypeScript"],
      recommendedCourses: ["HTML/CSS Foundations", "JavaScript Basics", "React Essentials"]
    },
    "cybersecurity analyst": {
      requiredSkills: ["Networking", "Linux", "Security Fundamentals", "Threat Analysis"],
      recommendedCourses: ["Networking Basics", "Linux Fundamentals", "Cybersecurity Essentials"]
    }
  };

  const normalizedRole = String(targetRole).toLowerCase();
  const roleData = roleMap[normalizedRole] || {
    requiredSkills: ["Communication", "Problem Solving", "Digital Literacy"],
    recommendedCourses: ["Career Foundations", "Digital Skills Bootcamp"]
  };

  const currentSkills = Array.isArray(skills) ? skills.map((s) => String(s).toLowerCase()) : [];
  const skillGaps = roleData.requiredSkills.filter(
    (skill) => !currentSkills.includes(skill.toLowerCase())
  );

  const recommendedRoles =
    normalizedRole === "data analyst"
      ? ["Data Analyst", "Business Analyst"]
      : normalizedRole === "frontend developer"
      ? ["Frontend Developer", "UI Engineer"]
      : normalizedRole === "cybersecurity analyst"
      ? ["Cybersecurity Analyst", "SOC Analyst"]
      : ["IT Support Specialist", "Business Analyst"];

  const roadmap = [
    `Start with: ${roleData.recommendedCourses[0]}`,
    `Then learn: ${roleData.recommendedCourses[1] || "Intermediate concepts"}`,
    "Build one portfolio project",
    "Apply for internships or entry-level roles"
  ];

  res.json({
    interests,
    targetRole,
    recommendedRoles,
    skillGaps,
    recommendedCourses: roleData.recommendedCourses,
    roadmap
  });
};