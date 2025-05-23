import React from "react";
import AssignmentContainer from "./_components/assignment-container";

const Page = async ({ params }: { params: { assignmentId: string } }) => {
  const { assignmentId } = params;

  return (
    <div className="p-4">
      <AssignmentContainer assignmentId={assignmentId} />
    </div>
  );
};

export default Page;
