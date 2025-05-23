import React from "react";
import ClassPageContainer from "./_components/class-page-container";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div className="p-4">
      <ClassPageContainer classID={id} />
    </div>
  );
};

export default Page;
