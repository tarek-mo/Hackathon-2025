"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Plus, X, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import api from "@/lib/axios";
import { toast } from "sonner";

export default function SubmissionUpload({
  assignmentID,
}: {
  assignmentID: string;
}) {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleCardClick = () => {
    fileInputRef.current?.click();
  };

  const uploadSubmission = async () => {
    if (!file) return;
    setIsLoading(true);
    const formData = new FormData();
    formData.append("assignmentId", assignmentID); // <-- add this line if you specifically want assignmentId
    formData.append("file", file);
    try {
      const response = await api.post(`/submissions/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        toast.success("Fichier envoyé avec succès");
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (error) {
      console.error(error);
      toast("Erreur lors de l'envoi du fichier");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <Card
        className={`w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors hover:bg-gray-50 ${
          file
            ? "border-green-500 bg-green-50 hover:bg-green-50"
            : "border-gray-300"
        }`}
        onClick={handleCardClick}
      >
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="*/*"
        />

        {!file ? (
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <Plus className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium">Attache votre fichier</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 p-4 w-full">
            <div className="flex items-center w-full">
              <File className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
              <p className="text-sm font-medium text-green-700 truncate flex-1">
                {file.name}
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-gray-500 hover:text-red-500"
                onClick={handleRemoveFile}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove file</span>
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        )}
      </Card>

      <Button
        disabled={isLoading}
        onClick={uploadSubmission}
        className="w-full"
      >
        Envoyer
      </Button>
    </>
  );
}
