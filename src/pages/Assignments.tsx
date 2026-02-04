import React, { useState } from "react";
import { Assignment } from "@/types";
import { Breadcrumb } from "@/components/layout/BreadCrumb";
import { Search, Plus, Edit, Trash2, Clock, FileText, Target, Calendar, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data untuk assignments
const mockAssignments: Assignment[] = [
  {
    id: "1",
    title: "UTS Matematika Semester Ganjil",
    courseId: "1",
    courseName: "Matematika",
    dueDate: "2024-12-15",
    type: "exam",
    status: "published",
    submissions: 28,
    maxScore: 100
  },
  {
    id: "2",
    title: "Tugas Cerpen Bahasa Indonesia",
    courseId: "2",
    courseName: "Bahasa Indonesia",
    dueDate: "2024-12-10",
    type: "assignment",
    status: "published",
    submissions: 25,
    maxScore: 100
  },
  {
    id: "3",
    title: "Quiz Sistem Tata Surya IPA",
    courseId: "3",
    courseName: "IPA",
    dueDate: "2024-12-08",
    type: "quiz",
    status: "published",
    submissions: 30,
    maxScore: 50
  },
  {
    id: "4",
    title: "UAS Bahasa Inggris",
    courseId: "4",
    courseName: "Bahasa Inggris",
    dueDate: "2024-12-20",
    type: "exam",
    status: "draft",
    submissions: 0,
    maxScore: 100
  }
];

export const Assignments: React.FC = () => {
  const [assignments] = useState<Assignment[]>(mockAssignments);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAssignments = assignments.filter(assignment =>
    assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return <FileText size={16} className="text-blue-600" />;
      case 'quiz':
        return <Target size={16} className="text-emerald-600" />;
      case 'exam':
        return <FileText size={16} className="text-red-600" />;
      default:
        return <FileText size={16} className="text-gray-600" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'assignment':
        return 'Tugas';
      case 'quiz':
        return 'Quiz';
      case 'exam':
        return 'Ujian';
      default:
        return 'Lainnya';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="default">Diterbitkan</Badge>;
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      case 'closed':
        return <Badge variant="outline">Ditutup</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <Breadcrumb
            pages={[
              { name: "Dashboard", href: "/dashboard" },
              { name: "TUGAS & QUIZ", href: "#" },
            ]}
          />
          <h1 className="text-2xl font-bold mt-2">Tugas & Quiz</h1>
          <p className="text-muted-foreground mt-1">Kelola tugas, quiz, dan ujian untuk semua mata pelajaran</p>
        </div>
        <Button>
          <Plus size={20} className="mr-2" />
          Buat Tugas Baru
        </Button>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Cari tugas, quiz, atau ujian..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Tugas</p>
                <p className="text-2xl font-bold">{assignments.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="text-blue-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Diterbitkan</p>
                <p className="text-2xl font-bold text-emerald-600">{assignments.filter(a => a.status === 'published').length}</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-lg">
                <CheckCircle className="text-emerald-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Pengumpulan</p>
                <p className="text-2xl font-bold text-purple-600">{assignments.reduce((acc, a) => acc + a.submissions, 0)}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="text-purple-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Draft</p>
                <p className="text-2xl font-bold text-yellow-600">{assignments.filter(a => a.status === 'draft').length}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="text-yellow-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignments Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Judul & Tipe</TableHead>
              <TableHead>Mata Pelajaran</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Pengumpulan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(assignment.type)}
                    <div>
                      <div className="text-sm font-medium">{assignment.title}</div>
                      <div className="text-sm text-muted-foreground">{getTypeLabel(assignment.type)}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{assignment.courseName}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar size={14} className="text-muted-foreground" />
                    {formatDate(assignment.dueDate)}
                  </div>
                </TableCell>
                <TableCell>
                  {assignment.submissions} pengumpulan
                  {assignment.submissions > 0 && (
                    <div className="text-xs text-muted-foreground">Max: {assignment.maxScore} poin</div>
                  )}
                </TableCell>
                <TableCell>{getStatusBadge(assignment.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Assignments;
