export interface IClassWithAssignements {
  class: {
    _id: string;
    name: string;
    joinCode: string;
    userId: {
      _id: string;
      name: string;
      email: string;
    };
    enrolled_students: {
      _id: string;
      name: string;
      email: string;
    }[];
    createdAt: string;
    updatedAt: string;
    __v?: number;
  };
  assignments: {
    _id: string;
    title: string;
    description: string;
    deadline: string;
    filePath?: string; // if attachment is optional
    classId: string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
  }[];
}
