import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumb } from "@/components/layout/BreadCrumb";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getUsers, deleteUser } from "@/api/users";
import { User } from "@/types/api.types";
import { UserFormModal } from "@/components/user/UserFormModal";
import { getRoleBadge } from "@/utils/badge-utils";
import { toastSuccess, toastError } from "@/lib/toast";

export const UserManagement: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const itemsPerPage = 10;

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Fetch users on component mount and when search term changes
  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await getUsers({
        page: currentPage,
        per_page: itemsPerPage,
        search: searchTerm || undefined,
      });

      if (response.success && response.data) {
        setUsers(response.data);
        if (response.pagination) {
          setTotalPages(response.pagination.last_page);
          setTotalUsers(response.pagination.total);
        }
      } else {
        console.error("Failed to fetch users:", response.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus pengguna "${name}"?`)) {
      return;
    }

    try {
      const response = await deleteUser(id);
      if (response.success) {
        // Refresh the user list
        fetchUsers();
        toastSuccess("Pengguna berhasil dihapus");
      } else {
        toastError(`Gagal menghapus pengguna: ${response.message}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toastError("Terjadi kesalahan saat menghapus pengguna");
    }
  };

  const handleOpenCreateModal = () => {
    setModalMode("create");
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (user: User) => {
    setModalMode("edit");
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleModalSuccess = () => {
    fetchUsers();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div>
        <Breadcrumb
          pages={[
            { name: "Dashboard", href: "/dashboard" },
            { name: "Master", href: "/dashboard/master" },
            { name: "Manajemen Pengguna", href: "/dashboard/master/pengguna" },
          ]}
        />
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Manajemen Pengguna</h1>
        <div className="flex items-center gap-2">
          <Button onClick={handleOpenCreateModal}>
            <Icon name="User" size={16} className="mr-2" />
            Tambah Pengguna
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Icon
              name="Search"
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="text"
              placeholder="Cari nama atau email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengguna</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">
              Memuat data...
            </div>
          ) : users.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              Tidak ada data pengguna
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Terdaftar</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 bg-primary/10">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{user.name}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{user.email}</p>
                      </TableCell>
                      <TableCell>
                        {getRoleBadge(user.roles?.[0]?.display_name)}
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-muted-foreground">
                          {new Date(user.created_at).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </p>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Lihat Detail"
                          >
                            <Icon name="Eye" size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Edit"
                            onClick={() => handleOpenEditModal(user)}
                          >
                            <Icon name="Settings" size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            title="Hapus"
                            onClick={() => handleDelete(user.id, user.name)}
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="px-6 py-4 border-t">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Menampilkan {users.length} dari {totalUsers} pengguna
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                    >
                      <Icon name="ChevronLeft" size={16} />
                    </Button>
                    <span className="px-3 py-1 text-sm">
                      Halaman {currentPage} dari {totalPages || 1}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages || totalPages === 0}
                    >
                      <Icon name="ChevronRight" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* User Form Modal */}
      <UserFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleModalSuccess}
        user={selectedUser}
        mode={modalMode}
      />
    </div>
  );
};
