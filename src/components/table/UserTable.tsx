import * as React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/Table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "../ui/Badge"; // pastikan path sesuai struktur project

const usersData = [
  {
    id: 1,
    name: "RS Siloam Jakarta",
    email: "contact@siloamjakarta.co.id",
    role: "Rumah Sakit",
  },
  {
    id: 2,
    name: "Hotel Mulia Senayan",
    email: "info@hotelmulia.co.id",
    role: "Hotel",
  },
  {
    id: 3,
    name: "RS Pondok Indah",
    email: "admin@rspip.co.id",
    role: "Rumah Sakit",
  },
  {
    id: 4,
    name: "Hotel Indonesia Kempinski",
    email: "reservations@kempinski.com",
    role: "Hotel",
  },
  {
    id: 5,
    name: "RS Hermina Depok",
    email: "cs@herminadepok.co.id",
    role: "Rumah Sakit",
  },
  {
    id: 6,
    name: "Hotel Borobudur Jakarta",
    email: "info@hotelborobudur.com",
    role: "Hotel",
  },
  {
    id: 7,
    name: "RS Mitra Keluarga Bekasi",
    email: "info@mitrakeluarga.com",
    role: "Rumah Sakit",
  },
  {
    id: 8,
    name: "Hotel Aryaduta Bandung",
    email: "contact@aryadutahotel.com",
    role: "Hotel",
  },
  {
    id: 9,
    name: "RSUP Fatmawati",
    email: "cs@rsupfatmawati.co.id",
    role: "Rumah Sakit",
  },
  {
    id: 10,
    name: "Hotel Santika Premiere",
    email: "info@santikahotel.com",
    role: "Hotel",
  },
  {
    id: 11,
    name: "RS Dharmais",
    email: "contact@rsdharmais.co.id",
    role: "Rumah Sakit",
  },
  {
    id: 12,
    name: "Hotel Aston Priority",
    email: "booking@astonpriority.com",
    role: "Hotel",
  },
  {
    id: 13,
    name: "RS Cipto Mangunkusumo",
    email: "admin@rscm.co.id",
    role: "Rumah Sakit",
  },
  {
    id: 14,
    name: "Hotel Novotel Mangga Dua",
    email: "reservations@novotel.com",
    role: "Hotel",
  },
  {
    id: 15,
    name: "RS Persahabatan",
    email: "info@rspersahabatan.co.id",
    role: "Rumah Sakit",
  },
];

const ITEMS_PER_PAGE = 10;

const COLORS = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-fuchsia-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-violet-500",
  "bg-teal-500",
];

function hashName(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function InitialAvatar({ name }: { name: string }) {
  const initial = name?.trim()?.charAt(0)?.toUpperCase() || "?";
  const color = COLORS[hashName(name || "?") % COLORS.length];
  return (
    <div
      className={`w-8 h-8 ${color} rounded-full text-white grid place-items-center font-medium select-none`}
    >
      {initial}
    </div>
  );
}

const UserTable = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const totalPages = Math.ceil(usersData.length / ITEMS_PER_PAGE);

  const currentUsers = React.useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return usersData.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage]);

  const pageNumbers: number[] = React.useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );

  const paginate = (pageNumber: number) => {
    const next = Math.min(Math.max(1, pageNumber), totalPages);
    setCurrentPage(next);
  };

  const baseBtn =
    "w-8 h-8 flex items-center justify-center border rounded-full transition-colors";

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <InitialAvatar name={user.name} />
                  <span className="font-medium">{user.name}</span>
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge
                  variant={user.role === "Rumah Sakit" ? "success" : "primary"}
                  size="sm"
                >
                  {user.role}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 flex justify-end gap-2 items-center">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${baseBtn} disabled:opacity-50`}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {pageNumbers.map((number) => (
          <button
            key={`page-${number}`}
            onClick={() => paginate(number)}
            className={`${baseBtn} ${
              number === currentPage
                ? "bg-primary text-white border-primary"
                : "bg-white text-black border-gray-400 hover:bg-blue-50"
            }`}
            aria-current={number === currentPage ? "page" : undefined}
          >
            {number}
          </button>
        ))}

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${baseBtn} disabled:opacity-50`}
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default UserTable;
