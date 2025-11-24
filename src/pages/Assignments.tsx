import React, { useState } from "react";
import { Assignment } from "../types";
import { Breadcrumb } from "../components/layout/BreadCrumb";
import { Search, Plus, Edit, Trash2, Clock, FileText, Target, Calendar, Users, CheckCircle } from "lucide-react";

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
        return <Target size={16} className="text-green-600" />;
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
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Diterbitkan</span>;
      case 'draft':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Draft</span>;
      case 'closed':
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Ditutup</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{status}</span>;
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
          <Breadcrumb currentPage="TUGAS & QUIZ" currentHref="#" />
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Tugas & Quiz</h1>
          <p className="text-gray-600 mt-1">Kelola tugas, quiz, dan ujian untuk semua mata pelajaran</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          Buat Tugas Baru
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Cari tugas, quiz, atau ujian..."
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
              <p className="text-gray-600 text-sm">Total Tugas</p>
              <p className="text-2xl font-bold text-gray-900">{assignments.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Diterbitkan</p>
              <p className="text-2xl font-bold text-green-600">{assignments.filter(a => a.status === 'published').length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Pengumpulan</p>
              <p className="text-2xl font-bold text-purple-600">{assignments.reduce((acc, a) => acc + a.submissions, 0)}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Draft</p>
              <p className="text-2xl font-bold text-yellow-600">{assignments.filter(a => a.status === 'draft').length}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Assignments Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Judul & Tipe
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mata Pelajaran
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deadline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pengumpulan
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
              {filteredAssignments.map((assignment) => (
                <tr key={assignment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(assignment.type)}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{assignment.title}</div>
                        <div className="text-sm text-gray-500">{getTypeLabel(assignment.type)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{assignment.courseName}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-900">
                      <Calendar size={14} className="text-gray-400" />
                      {formatDate(assignment.dueDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {assignment.submissions} pengumpulan
                    {assignment.submissions > 0 && (
                      <div className="text-xs text-gray-500">Max: {assignment.maxScore} poin</div>
                    )}
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(assignment.status)}</td>
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

export default Assignments;