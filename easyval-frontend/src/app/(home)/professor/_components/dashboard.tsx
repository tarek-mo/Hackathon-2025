"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, BarChart3, Layers, PieChart } from "lucide-react";
import React, { useState } from "react";
import ClassesSelect from "./classes-select";
import { SubmissionsTable } from "./submissions-table";

const Dashboard = () => {
  const [selectedClass, setSelectedClass] = useState("");
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Tableau de board
            </h1>
            <p className="text-muted-foreground">
              Surveiller les soumissions des étudiants, la détection de
              l&apos;IA et l&apos;analyse du plagiat
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ClassesSelect
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total des soumissions
              </CardTitle>
              <Layers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28/30</div>
              <p className="text-xs text-muted-foreground">
                93% submission rate
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Flagged</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                28.6% of submissions
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Nombre de triches entre collègues
              </CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                17.9% of submissions
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Note moyenne
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">
                +5% from previous assignment
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Soumissions d&apos;étudiants</CardTitle>
          <CardDescription>
            Afficher toutes les soumissions des étudiants avec la probabilité de
            détection et le statut de l&apos;IA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SubmissionsTable selectedClass={selectedClass} />
        </CardContent>
      </Card>
    </>
  );
};

export default Dashboard;
