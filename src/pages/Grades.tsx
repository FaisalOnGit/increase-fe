import React, { useState } from "react";
import { Breadcrumb } from "@/components/layout/BreadCrumb";
import { Search, Filter, Download, TrendingUp, Award, AlertCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data untuk grades
const mockGrades = [
  {
    id: "1",
    studentName: "Ahmad Rizki Pratama",
    nis: "2024001",
    courseName: "Matematika",
    assignmentTitle: "UTS Matematika Semester Ganjil",
    score: 85,
    maxScore: 100,
    grade: "B+",
    status: "passed",
    submissionDate: "2024-12-14"
  },
  {
    id: "2",
    studentName: "Siti Nurhaliza",
    nis: "2024002",
    courseName: "Bahasa Indonesia",
    assignmentTitle: "Tugas Cerpen Bahasa Indonesia",
    score: 92,
    maxScore: 100,
    grade: "A",
    status: "passed",
    submissionDate: "2024-12-09"
  },
  {
    id: "3",
    studentName: "Budi Santoso",
    nis: "2024003",
    courseName: "IPA",
    assignmentTitle: "Quiz Sistem Tata Surya IPA",
    score: 45,
    maxScore: 50,
    grade: "A",
    status: "passed",
    submissionDate: "2024-12-07"
  },
  {
    id: "4",
    studentName: "Diana Putri",
    nis: "2023004",
    courseName: "Matematika",
    assignmentTitle: "UTS Matematika Semester Ganjil",
    score: 68,
    maxScore: 100,
    grade: "C+",
    status: "passed",
    submissionDate: "2024-12-13"
  },
  {
    id: "5",
    studentName: "Eko Prasetyo",
    nis: "2024005",
    courseName: "IPA",
    assignmentTitle: "Quiz Sistem Tata Surya IPA",
    score: 25,
    maxScore: 50,
    grade: "D",
    status: "remedial",
    submissionDate: "2024-12-08"
  }
];

export const Grades: React.FC = () => {
  const [grades] = useState(mockGrades);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");

  const filteredGrades = grades.filter(grade => {
    const matchesSearch =
      grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.nis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.courseName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCourse = selectedCourse === "all" || grade.courseName === selectedCourse;

    return matchesSearch && matchesCourse;
  });

  const uniqueCourses = Array.from(new Set(grades.map(g => g.courseName)));

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-emerald-600 bg-emerald-100';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-100';
    if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-100';
    if (grade.startsWith('D')) return 'text-destructive bg-destructive/10';
    return 'text-muted-foreground bg-muted';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'passed':
        return <Badge variant="default">Lulus</Badge>;
      case 'remedial':
        return <Badge variant="secondary">Remedial</Badge>;
      case 'failed':
        return <Badge variant="destructive">Tidak Lulus</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'text-emerald-600';
    if (percentage >= 70) return 'text-blue-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-destructive';
  };

  const averageScore = grades.reduce((acc, g) => acc + (g.score / g.maxScore * 100), 0) / grades.length;
  const passedCount = grades.filter(g => g.status === 'passed').length;
  const remedialCount = grades.filter(g => g.status === 'remedial').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <Breadcrumb
            pages={[
              { name: "Dashboard", href: "/dashboard" },
              { name: "NILAI", href: "#" },
            ]}
          />
          <h1 className="text-2xl font-bold mt-2">Nilai Siswa</h1>
          <p className="text-muted-foreground mt-1">Lihat dan kelola nilai siswa untuk semua tugas dan ujian</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download size={20} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="Cari nama siswa, NIS, atau mata pelajaran..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10" size={20} />
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Semua Mata Pelajaran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Mata Pelajaran</SelectItem>
                  {uniqueCourses.map(course => (
                    <SelectItem key={course} value={course}>{course}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rata-rata Nilai</p>
                <p className="text-2xl font-bold">{averageScore.toFixed(1)}%</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Lulus</p>
                <p className="text-2xl font-bold text-emerald-600">{passedCount}</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-lg">
                <Award className="text-emerald-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Remedial</p>
                <p className="text-2xl font-bold text-yellow-600">{remedialCount}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <AlertCircle className="text-yellow-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Penilaian</p>
                <p className="text-2xl font-bold">{grades.length}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <FileText className="text-purple-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grades Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Siswa</TableHead>
              <TableHead>Mata Pelajaran</TableHead>
              <TableHead>Tugas/Ujian</TableHead>
              <TableHead>Nilai</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tanggal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGrades.map((grade) => (
              <TableRow key={grade.id}>
                <TableCell>
                  <div>
                    <div className="text-sm font-medium">{grade.studentName}</div>
                    <div className="text-sm text-muted-foreground">NIS: {grade.nis}</div>
                  </div>
                </TableCell>
                <TableCell>{grade.courseName}</TableCell>
                <TableCell>{grade.assignmentTitle}</TableCell>
                <TableCell>
                  <div className={`text-sm font-semibold ${getScoreColor(grade.score, grade.maxScore)}`}>
                    {grade.score}/{grade.maxScore}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {((grade.score / grade.maxScore) * 100).toFixed(1)}%
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs rounded-full font-semibold ${getGradeColor(grade.grade)}`}>
                    {grade.grade}
                  </span>
                </TableCell>
                <TableCell>{getStatusBadge(grade.status)}</TableCell>
                <TableCell>{grade.submissionDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Grades;
