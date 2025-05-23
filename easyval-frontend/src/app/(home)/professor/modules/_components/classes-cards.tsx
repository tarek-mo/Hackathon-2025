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
import { ArrowRight } from "lucide-react";

const ClassesCards = () => {
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
  return classes.length > 0 ? (
    <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
      {classes.map((classItem) => (
        <Card key={classItem._id} className="w-full ">
          <CardHeader>
            <CardTitle>{classItem.name}</CardTitle>
            <CardDescription>
              Nombre d&apos;etudiants: {classItem.enrolled_students.length}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <Button asChild className="flex items-center gap-3">
              <Link href={`/professor/modules/${classItem._id}`}>
                Voir
                <ArrowRight />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  ) : (
    <div className="flex items-center justify-center h-full">
      <h2 className="text-2xl">Aucun module trouvé</h2>
    </div>
  );
};

export default ClassesCards;
