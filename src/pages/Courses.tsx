import React, { useState } from "react";
import { Course } from "../types";
import { Breadcrumb } from "../components/layout/BreadCrumb";
import { Search, Plus, Edit, Trash2, Users, Clock, BookOpen, CheckCircle, FileText } from "lucide-react";

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
      ? <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Aktif</span>
      : <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Tidak Aktif</span>;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <Breadcrumb currentPage="MATA PELAJARAN" currentHref="#" />
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Mata Pelajaran</h1>
          <p className="text-gray-600 mt-1">Kelola mata pelajaran dan jadwal pembelajaran</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          Tambah Mata Pelajaran
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Cari mata pelajaran, kode, atau guru..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Mata Pelajaran</p>
              <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Aktif</p>
              <p className="text-2xl font-bold text-green-600">{courses.filter(c => c.status === 'active').length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Siswa</p>
              <p className="text-2xl font-bold text-gray-900">{courses.reduce((acc, c) => acc + c.students, 0)}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total SKS</p>
              <p className="text-2xl font-bold text-gray-900">{courses.reduce((acc, c) => acc + c.credits, 0)}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <FileText className="text-orange-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kode & Mata Pelajaran
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guru Pengajar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKS
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Siswa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jadwal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{course.name}</div>
                      <div className="text-sm text-gray-500">{course.code}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{course.teacher}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{course.credits}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{course.students} siswa</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="text-gray-400" />
                      {course.schedule}
                    </div>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(course.status)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800 transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-800 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Courses;