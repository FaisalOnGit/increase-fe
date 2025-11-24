import React, { useState } from "react";
import { Breadcrumb } from "../components/layout/BreadCrumb";
import { Search, Filter, Download, TrendingUp, TrendingDown, Award, AlertCircle, FileText } from "lucide-react";

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
    if (grade.startsWith('A')) return 'text-green-600 bg-green-100';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-100';
    if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-100';
    if (grade.startsWith('D')) return 'text-red-600 bg-red-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'passed':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Lulus</span>;
      case 'remedial':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Remedial</span>;
      case 'failed':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Tidak Lulus</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 70) return 'text-blue-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const averageScore = grades.reduce((acc, g) => acc + (g.score / g.maxScore * 100), 0) / grades.length;
  const passedCount = grades.filter(g => g.status === 'passed').length;
  const remedialCount = grades.filter(g => g.status === 'remedial').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <Breadcrumb currentPage="NILAI" currentHref="#" />
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Nilai Siswa</h1>
          <p className="text-gray-600 mt-1">Lihat dan kelola nilai siswa untuk semua tugas dan ujian</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download size={20} />
            Export
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari nama siswa, NIS, atau mata pelajaran..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="all">Semua Mata Pelajaran</option>
              {uniqueCourses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Rata-rata Nilai</p>
              <p className="text-2xl font-bold text-gray-900">{averageScore.toFixed(1)}%</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Lulus</p>
              <p className="text-2xl font-bold text-green-600">{passedCount}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Award className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Remedial</p>
              <p className="text-2xl font-bold text-yellow-600">{remedialCount}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertCircle className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Penilaian</p>
              <p className="text-2xl font-bold text-gray-900">{grades.length}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <FileText className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Grades Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Siswa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mata Pelajaran
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tugas/Ujian
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nilai
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredGrades.map((grade) => (
                <tr key={grade.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{grade.studentName}</div>
                      <div className="text-sm text-gray-500">NIS: {grade.nis}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{grade.courseName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{grade.assignmentTitle}</td>
                  <td className="px-6 py-4">
                    <div className={`text-sm font-semibold ${getScoreColor(grade.score, grade.maxScore)}`}>
                      {grade.score}/{grade.maxScore}
                    </div>
                    <div className="text-xs text-gray-500">
                      {((grade.score / grade.maxScore) * 100).toFixed(1)}%
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full font-semibold ${getGradeColor(grade.grade)}`}>
                      {grade.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(grade.status)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{grade.submissionDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Grades;