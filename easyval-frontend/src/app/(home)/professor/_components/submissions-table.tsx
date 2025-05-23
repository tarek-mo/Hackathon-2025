"use client";

import { useState, useEffect } from "react";
import {
  AlertCircle,
  ArrowUpDown,
  Eye,
  FileText,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { ISubmissionData } from "@/typescript/entities/ISubmissionData";
import api from "@/lib/axios";

export function SubmissionsTable({ selectedClass }: { selectedClass: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [submissionData, setSubmissionData] = useState<ISubmissionData[]>([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/submissions/${selectedClass}`);
        const data = (await response.data) as ISubmissionData[];
        console.log("submissions", data);

        setSubmissionData(data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, [selectedClass]);

  const [sortColumn, setSortColumn] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  const sortedSubmissions = [...submissionData].sort((a, b) => {
    if (sortColumn === "aiGeneratedProbability") {
      return sortDirection === "asc"
        ? a.aiGeneratedProbability - b.aiGeneratedProbability
        : b.aiGeneratedProbability - a.aiGeneratedProbability;
    }
    if (sortColumn === "cheatFromFriendProbability") {
      return sortDirection === "asc"
        ? a.cheatFromFriendProbability - b.cheatFromFriendProbability
        : b.cheatFromFriendProbability - a.cheatFromFriendProbability;
    }
    if (sortColumn === "date") {
      return sortDirection === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortColumn === "student") {
      return sortDirection === "asc"
        ? a.userId.name.localeCompare(b.userId.name)
        : b.userId.name.localeCompare(a.userId.name);
    }
    return 0;
  });

  if (isLoading) return <h3>Chargement...</h3>;
  if (!submissionData || submissionData.length === 0) return null;
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">
              <Button variant="ghost" onClick={() => handleSort("student")}>
                Etudiant
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("date")}>
                Date de soumission
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("aiGeneratedProbability")}
              >
                AI Probability
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("cheatFromFriendProbability")}
              >
                Tricherie entre camarades
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedSubmissions.map((submission) => (
            <TableRow key={submission._id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={undefined} alt={submission.userId.name} />
                    <AvatarFallback>
                      {submission.userId.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{submission.userId.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {submission.userId.email}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{formatDate(submission.date)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress
                    value={submission.aiGeneratedProbability * 100}
                    className="h-2 w-20"
                    indicatorClassName={
                      submission.aiGeneratedProbability > 0.7
                        ? "bg-red-500"
                        : ""
                    }
                  />
                  <span
                    className={
                      submission.aiGeneratedProbability > 0.7
                        ? "text-red-500 font-medium"
                        : ""
                    }
                  >
                    {Math.round(submission.aiGeneratedProbability * 100)}%
                  </span>
                  {submission.aiGeneratedProbability > 0.7 && (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress
                    value={submission.cheatFromFriendProbability}
                    className="h-2 w-20"
                    indicatorClassName={
                      submission.cheatFromFriendProbability > 0.5
                        ? "bg-orange-500"
                        : ""
                    }
                  />
                  <span
                    className={
                      submission.cheatFromFriendProbability > 0.5
                        ? "text-orange-500 font-medium"
                        : ""
                    }
                  >
                    {Math.round(submission.cheatFromFriendProbability)}%
                    {submission.cheated &&
                      `avec ${submission.cheatedFromSubmission?.userId.name}`}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                {submission.cheated === true ? (
                  <Badge variant="secondary">Suspect</Badge>
                ) : (
                  <Badge variant="outline">Valide</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>View Submission</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Grade Submission</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <AlertCircle className="mr-2 h-4 w-4" />
                      <span>Flag for Review</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
