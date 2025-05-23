"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import api from "@/lib/axios";
import { toast } from "sonner";

const JoinClass = () => {
  const [classCode, setClassCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const joinClass = async () => {
    setIsLoading(true);

    try {
      const response = await api.post("/classes/join", {
        code: classCode,
      });

      if (response.status === 200) {
        toast("Vous avez joine avec success cette classe");

        setClassCode("");
      }
    } catch (error) {
      console.error("Error joining class", error);
      toast.error("Erreur lors de la jointure avec le class");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full mt-4">Joindre une classe</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Joindre une classe</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Entrez le code du class"
          value={classCode}
          onChange={(e) => setClassCode(e.target.value)}
        />

        <Button onClick={joinClass} className="block w-full mt-4">
          Joindre
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default JoinClass;
