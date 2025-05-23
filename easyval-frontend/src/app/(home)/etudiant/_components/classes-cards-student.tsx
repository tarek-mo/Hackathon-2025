"use client";
import api from "@/lib/axios";
import { IClass } from "@/typescript/entities/IClass";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, User } from "lucide-react";

const ClassesCardsStudent = () => {
  const [classes, setClasses] = useState<IClass[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get("/classes")
      .then((res) => {
        setClasses(res.data);

        setIsLoading(false);
      })
      .catch(console.error);
  }, []);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (classes.length === 0) return null;
  return (
    <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
      {classes.map((classItem) => (
        <Card key={classItem._id} className="w-full ">
          <CardHeader>
            <CardTitle>{classItem.name}</CardTitle>
            <CardDescription>{classItem.description}</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Karim Bennis</span>
            </div>
            <Button asChild className="flex items-center gap-3">
              <Link href={`/etudiant/classes/${classItem._id}`}>
                Voir
                <ArrowRight />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ClassesCardsStudent;
