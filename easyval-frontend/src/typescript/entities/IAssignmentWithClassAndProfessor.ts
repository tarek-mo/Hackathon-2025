export interface IAssignmentWithClassAndProfessor {
  title: string;
  deadline: string;
  description?: string;
  fileUrl?: string;
  classId: {
    _id: string;
    name: string;
    userId: {
      _id: string;
      name: string;
      email: string;
    };
  };
}
