"use client";
import api from "@/lib/axios";
import { IClass } from "@/typescript/entities/IClass";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ClassesSelectProps = {
  selectedClass: string;
  setSelectedClass: (value: string) => void;
};
const ClassesSelect = ({
  selectedClass,
  setSelectedClass,
}: ClassesSelectProps) => {
  const [classes, setClasses] = useState<IClass[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("keep re rendering");

    api
      .get("/classes")
      .then((res) => {
        setClasses(res.data);
        console.log("classes", res.data);
        setSelectedClass(res.data[0]._id);
        setIsLoading(false);
      })
      .catch(console.error);
    // danger
  }, [setSelectedClass]);

  if (isLoading) {
    return <div>Chargement...</div>;
  }
  return classes.length > 0 ? (
    <Select value={selectedClass} onValueChange={setSelectedClass}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Module" />
      </SelectTrigger>
      <SelectContent>
        {classes.map((classItem) => (
          <SelectItem key={classItem._id} value={classItem._id}>
            {classItem.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ) : (
    <div className="flex items-center justify-center h-full">
      <h2 className="text-2xl">Aucun module trouvé</h2>
    </div>
  );
};

export default ClassesSelect;
