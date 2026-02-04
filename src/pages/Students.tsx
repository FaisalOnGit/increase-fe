import React, { useState } from "react";
import { Student } from "@/types";
import { Breadcrumb } from "@/components/layout/BreadCrumb";
import { Search, Plus, Edit, Trash2, Mail, Phone, MapPin, Users, UserCheck, GraduationCap, Award } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data untuk students
const mockStudents: Student[] = [
  {
    id: "1",
    name: "Ahmad Rizki Pratama",
    nis: "2024001",
    email: "ahmad.rizki@sekolah.sch.id",
    grade: "X",
    class: "X-IPA 1",
    phone: "0812-3456-7890",
    address: "Jl. Merdeka No. 123, Jakarta",
    status: "active"
  },
  {
    id: "2",
    name: "Siti Nurhaliza",
    nis: "2024002",
    email: "siti.nurhaliza@sekolah.sch.id",
    grade: "X",
    class: "X-IPS 2",
    phone: "0813-5678-9012",
    address: "Jl. Sudirman No. 456, Jakarta",
    status: "active"
  },
  {
    id: "3",
    name: "Budi Santoso",
    nis: "2024003",
    email: "budi.santoso@sekolah.sch.id",
    grade: "XI",
    class: "XI-MIPA 1",
    phone: "0821-2345-6789",
    address: "Jl. Gatot Subroto No. 789, Jakarta",
    status: "active"
  },
  {
    id: "4",
    name: "Diana Putri",
    nis: "2023004",
    email: "diana.putri@sekolah.sch.id",
    grade: "XII",
    class: "XII-IPS 3",
    phone: "0822-3456-7890",
    address: "Jl. Thamrin No. 321, Jakarta",
    status: "inactive"
  }
];

export const Students: React.FC = () => {
  const [students] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.nis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
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
              { name: "SISWA", href: "#" },
            ]}
          />
          <h1 className="text-2xl font-bold mt-2">Data Siswa</h1>
          <p className="text-muted-foreground mt-1">Kelola data siswa dan informasi pribadi</p>
        </div>
        <Button>
          <Plus size={20} className="mr-2" />
          Tambah Siswa
        </Button>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Cari nama, NIS, kelas, atau email..."
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
                <p className="text-sm text-muted-foreground">Total Siswa</p>
                <p className="text-2xl font-bold">{students.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="text-blue-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Siswa Aktif</p>
                <p className="text-2xl font-bold text-emerald-600">{students.filter(s => s.status === 'active').length}</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-lg">
                <UserCheck className="text-emerald-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Kelas X</p>
                <p className="text-2xl font-bold text-purple-600">{students.filter(s => s.grade === 'X').length}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <GraduationCap className="text-purple-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Kelas XII</p>
                <p className="text-2xl font-bold text-orange-600">{students.filter(s => s.grade === 'XII').length}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Award className="text-orange-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NIS & Nama</TableHead>
              <TableHead>Kelas</TableHead>
              <TableHead>Kontak</TableHead>
              <TableHead>Alamat</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <div>
                    <div className="text-sm font-medium">{student.name}</div>
                    <div className="text-sm text-muted-foreground">NIS: {student.nis}</div>
                  </div>
                </TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm">
                      <Mail size={14} className="text-muted-foreground" />
                      {student.email}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Phone size={14} className="text-muted-foreground" />
                      {student.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-start gap-1 text-sm">
                    <MapPin size={14} className="text-muted-foreground mt-0.5" />
                    <span>{student.address}</span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(student.status)}</TableCell>
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

export default Students;
