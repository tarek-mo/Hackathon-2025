"use client";
import api from "@/lib/axios";
import { IClass } from "@/typescript/entities/IClass";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const ClassesList = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [classes, setClasses] = useState<IClass[]>([]);

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
    <div className=" mt-4 flex flex-col gap-3 pr-3">
      {classes.map((classItem) => (
        <Link href={`/etudiant/classes/${classItem._id}`} key={classItem._id}>
          {classItem.name}
        </Link>
      ))}
    </div>
  );
};

export default ClassesList;
