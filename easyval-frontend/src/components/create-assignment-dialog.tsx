"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileUp } from "lucide-react";
import { Button } from "./ui/button";
import { IClass } from "@/typescript/entities/IClass";
import api from "@/lib/axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

import DatePicker from "./date-picker";
const CreateAssignmentDialog = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [classes, setClasses] = useState<IClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [date, setDate] = useState<Date | undefined>();
  useEffect(() => {
    api
      .get("/classes")
      .then((res) => {
        setClasses(res.data);

        setIsLoading(false);
      })
      .catch(console.error);
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("deadline", date?.toISOString() || "");
    formData.append("classId", selectedClass);

    if (file) {
      formData.append("file", file); // ✅ match multer's expected field name
      // match multer field name
    }

    try {
      await api.post("/assignments", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast("TP cree avec succès");

      // Reset form state
      setTitle("");
      setDescription("");
      setFile(undefined);
      setDate(undefined);
      setSelectedClass("");
    } catch (error) {
      console.error("Failed to submit assignment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">
            Nouveau TP/TD
            <FileUp className="w-4 h-4 " />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Creer un TP/TD</DialogTitle>
          </DialogHeader>
          <form>
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

            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre"
              className="my-4"
            />
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="mb-4"
            />

            <Input
              onChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : undefined)
              }
              type="file"
              multiple={false}
              className="mb-4"
            />
            <DatePicker date={date} setDate={setDate} />
            <Button className="ml-4" onClick={onSubmit} disabled={isLoading}>
              Creer
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateAssignmentDialog;
