import React, { useState } from "react";
import { Student } from "../types";
import { Breadcrumb } from "../components/layout/BreadCrumb";
import { Search, Plus, Edit, Trash2, Mail, Phone, MapPin, Users, UserCheck, GraduationCap, Award } from "lucide-react";

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
      ? <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Aktif</span>
      : <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Tidak Aktif</span>;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <Breadcrumb currentPage="SISWA" currentHref="#" />
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Data Siswa</h1>
          <p className="text-gray-600 mt-1">Kelola data siswa dan informasi pribadi</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          Tambah Siswa
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Cari nama, NIS, kelas, atau email..."
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
              <p className="text-gray-600 text-sm">Total Siswa</p>
              <p className="text-2xl font-bold text-gray-900">{students.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Siswa Aktif</p>
              <p className="text-2xl font-bold text-green-600">{students.filter(s => s.status === 'active').length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <UserCheck className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Kelas X</p>
              <p className="text-2xl font-bold text-purple-600">{students.filter(s => s.grade === 'X').length}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <GraduationCap className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Kelas XII</p>
              <p className="text-2xl font-bold text-orange-600">{students.filter(s => s.grade === 'XII').length}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Award className="text-orange-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NIS & Nama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kelas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kontak
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alamat
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
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">NIS: {student.nis}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{student.class}</td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm text-gray-900">
                        <Mail size={14} className="text-gray-400" />
                        {student.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-900">
                        <Phone size={14} className="text-gray-400" />
                        {student.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-1 text-sm text-gray-900">
                      <MapPin size={14} className="text-gray-400 mt-0.5" />
                      <span>{student.address}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(student.status)}</td>
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

export default Students;