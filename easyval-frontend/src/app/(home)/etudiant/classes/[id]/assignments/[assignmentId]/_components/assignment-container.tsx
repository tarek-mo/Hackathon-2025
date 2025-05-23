"use client";
import api from "@/lib/axios";
import { IAssignmentWithClassAndProfessor } from "@/typescript/entities/IAssignmentWithClassAndProfessor";
import React, { useEffect, useState } from "react";
import SubmissionUpload from "./submission-upload";

const AssignmentContainer = ({ assignmentId }: { assignmentId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [assignment, setAssignment] =
    useState<IAssignmentWithClassAndProfessor | null>(null);

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/assignments/${assignmentId}`)
      .then((res) => {
        setAssignment(res.data);
        console.log("assignment", res.data);

        setIsLoading(false);
      })
      .catch(console.error);
  }, [assignmentId]);

  if (isLoading) return <div>Chargement...</div>;
  if (!assignment) return null;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">{assignment.title}</h1>

      <div>
        <p className="text-lg">
          <strong>Classe:</strong> {assignment.classId.name}
        </p>
        <p className="text-lg">
          <strong>Teacher:</strong> {assignment.classId.userId.name}
        </p>
      </div>

      {assignment.fileUrl ? (
        <iframe
          src={assignment.fileUrl}
          title="Assignment PDF"
          width="100%"
          height="600px"
          className="border rounded"
        />
      ) : (
        <p className="text-gray-500">No fichier attache</p>
      )}

      <SubmissionUpload assignmentID={assignmentId} />
    </div>
  );
};

export default AssignmentContainer;
