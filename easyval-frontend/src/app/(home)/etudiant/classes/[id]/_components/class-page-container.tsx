"use client";
import api from "@/lib/axios";
import { IClassWithAssignements } from "@/typescript/entities/IClassWithAssignements";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ClassPageContainer = ({ classID }: { classID: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [classWithAssignments, setClassWithAssignments] =
    useState<IClassWithAssignements | null>(null);

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/classes/${classID}`)
      .then((res) => {
        setClassWithAssignments(res.data);

        setIsLoading(false);
      })
      .catch(console.error);
  }, [classID]);

  if (isLoading || !classWithAssignments) return "Chargement...";
  return (
    <div>
      <h1 className="text-2xl font-bold">{classWithAssignments.class.name}</h1>
      <p className="text-gray-500">{classWithAssignments.class.userId.name}</p>
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-4">Travaux pratiques</h2>
        <div className="grid grid-cols-3 gap-3">
          {classWithAssignments.assignments.map((assignment) => (
            <Card key={assignment._id}>
              <CardHeader>
                <CardTitle>{assignment.title}</CardTitle>
                <CardDescription>{assignment.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar className="w-4 h-4" />
                <p className="text-sm text-gray-500">
                  Date de rendu:{" "}
                  {new Date(assignment.deadline).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="flex items-center gap-3">
                  <Link
                    href={`/etudiant/classes/${classID}/assignments/${assignment._id}`}
                  >
                    Envoyer le travail
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassPageContainer;
