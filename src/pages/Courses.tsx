import React, { useState } from "react";
import { Course } from "@/types";
import { Breadcrumb } from "@/components/layout/BreadCrumb";
import { Search, Plus, Edit, Trash2, Users, Clock, BookOpen, CheckCircle, FileText } from "lucide-react";
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
import { Icon } from "@/components/ui/Icon";

// Mock data untuk courses
const mockCourses: Course[] = [
  {
    id: "1",
    name: "Matematika",
    code: "MAT-001",
    credits: 4,
    teacher: "Budi Santoso, S.Pd",
    students: 32,
    schedule: "Senin, 08:00-09:40",
    status: "active"
  },
  {
    id: "2",
    name: "Bahasa Indonesia",
    code: "BIN-001",
    credits: 3,
    teacher: "Siti Nurhaliza, S.Pd",
    students: 28,
    schedule: "Selasa, 10:00-11:40",
    status: "active"
  },
  {
    id: "3",
    name: "Ilmu Pengetahuan Alam",
    code: "IPA-001",
    credits: 3,
    teacher: "Ahmad Wijaya, S.Pd",
    students: 30,
    schedule: "Rabu, 13:00-14:40",
    status: "active"
  },
  {
    id: "4",
    name: "Bahasa Inggris",
    code: "BING-001",
    credits: 3,
    teacher: "Diana Putri, S.Pd",
    students: 25,
    schedule: "Kamis, 08:00-09:40",
    status: "inactive"
  }
];

export const Courses: React.FC = () => {
  const [courses] = useState<Course[]>(mockCourses);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    return status === 'active'
      ? <Badge variant="default">Aktif</Badge>
      : <Badge variant="secondary">Tidak Aktif</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <Breadcrumb
            pages={[
              { name: "Dashboard", href: "/dashboard" },
              { name: "MATA PELAJARAN", href: "#" },
            ]}
          />
          <h1 className="text-2xl font-bold mt-2">Mata Pelajaran</h1>
          <p className="text-muted-foreground mt-1">Kelola mata pelajaran dan jadwal pembelajaran</p>
        </div>
        <Button>
          <Plus size={20} className="mr-2" />
          Tambah Mata Pelajaran
        </Button>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Cari mata pelajaran, kode, atau guru..."
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
                <p className="text-sm text-muted-foreground">Total Mata Pelajaran</p>
                <p className="text-2xl font-bold">{courses.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <BookOpen className="text-blue-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Aktif</p>
                <p className="text-2xl font-bold text-emerald-600">{courses.filter(c => c.status === 'active').length}</p>
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
                <p className="text-sm text-muted-foreground">Total Siswa</p>
                <p className="text-2xl font-bold">{courses.reduce((acc, c) => acc + c.students, 0)}</p>
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
                <p className="text-sm text-muted-foreground">Total SKS</p>
                <p className="text-2xl font-bold">{courses.reduce((acc, c) => acc + c.credits, 0)}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <FileText className="text-orange-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kode & Mata Pelajaran</TableHead>
              <TableHead>Guru Pengajar</TableHead>
              <TableHead>SKS</TableHead>
              <TableHead>Siswa</TableHead>
              <TableHead>Jadwal</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>
                  <div>
                    <div className="text-sm font-medium">{course.name}</div>
                    <div className="text-sm text-muted-foreground">{course.code}</div>
                  </div>
                </TableCell>
                <TableCell>{course.teacher}</TableCell>
                <TableCell>{course.credits}</TableCell>
                <TableCell>{course.students} siswa</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Icon name="Clock" size={14} className="text-muted-foreground" />
                    {course.schedule}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(course.status)}</TableCell>
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

export default Courses;
