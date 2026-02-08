import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumb } from "@/components/layout/BreadCrumb";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getDeletedUsers, restoreUser, forceDeleteUser } from "@/api/users";
import { User } from "@/types/api.types";

export const UserRestore: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchDeletedUsers();
  }, [currentPage]);

  const fetchDeletedUsers = async () => {
    setIsLoading(true);
    try {
      const response = await getDeletedUsers({
        page: currentPage,
        per_page: itemsPerPage,
      });

      if (response.success && response.data) {
        setUsers(response.data);
        if (response.pagination) {
          setTotalPages(response.pagination.last_page);
          setTotalUsers(response.pagination.total);
        }
      } else {
        console.error("Failed to fetch deleted users:", response.message);
      }
    } catch (error) {
      console.error("Error fetching deleted users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestore = async (id: number, name: string) => {
    if (!confirm(`Apakah Anda yakin ingin memulihkan pengguna "${name}"?`)) {
      return;
    }

    try {
      const response = await restoreUser(id);
      if (response.success) {
        fetchDeletedUsers();
        alert("Pengguna berhasil dipulihkan");
      } else {
        alert(`Gagal memulihkan pengguna: ${response.message}`);
      }
    } catch (error) {
      console.error("Error restoring user:", error);
      alert("Terjadi kesalahan saat memulihkan pengguna");
    }
  };

  const handleForceDelete = async (id: number, name: string) => {
    if (
      !confirm(
        `PERINGATAN: Ini akan menghapus pengguna "${name}" secara PERMANEN dan tidak dapat dibatalkan. Lanjutkan?`
      )
    ) {
      return;
    }

    try {
      const response = await forceDeleteUser(id);
      if (response.success) {
        fetchDeletedUsers();
        alert("Pengguna berhasil dihapus permanen");
      } else {
        alert(`Gagal menghapus permanen: ${response.message}`);
      }
    } catch (error) {
      console.error("Error force deleting user:", error);
      alert("Terjadi kesalahan saat menghapus permanen");
    }
  };

  const getRoleBadge = (role: string) => {
    const normalizedRole = role.toLowerCase();
    switch (normalizedRole) {
      case 'admin':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Admin</Badge>;
      case 'dosen':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Dosen</Badge>;
      case 'mahasiswa':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Mahasiswa</Badge>;
      default:
        return <Badge variant="secondary">{role}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div>
        <Breadcrumb
          pages={[
            { name: "Dashboard", href: "/dashboard" },
            { name: "Master", href: "/dashboard/master" },
            { name: "Pengguna", href: "/dashboard/master/pengguna" },
            { name: "Sampah", href: "/dashboard/master/pengguna/sampah" },
          ]}
        />
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Pengguna Terhapus</h1>
          <p className="text-muted-foreground">
            Kelola pengguna yang telah dihapus. Anda dapat memulihkan atau menghapusnya secara permanen.
          </p>
        </div>
      </div>

      {/* Info Card */}
      <Card className="bg-orange-50 border-orange-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Icon name="AlertTriangle" size={20} className="text-orange-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-orange-800">
                Pengguna di sampah akan dihapus otomatis setelah 30 hari
              </p>
              <p className="text-xs text-orange-700 mt-1">
                Anda dapat memulihkan pengguna yang terhapus atau menghapusnya secara permanen.
                Pengguna yang dihapus permanen tidak dapat dikembalikan.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deleted Users Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Daftar Pengguna Terhapus ({totalUsers})</CardTitle>
            <Button variant="outline" onClick={fetchDeletedUsers}>
              <Icon name="RefreshCw" size={16} className="mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">
              Memuat data...
            </div>
          ) : users.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Icon name="Trash2" size={48} className="mx-auto mb-4 opacity-20" />
              <p>Tidak ada pengguna di sampah</p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Dihapus Pada</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 bg-muted">
                            <AvatarFallback className="bg-muted text-muted-foreground">
                              {user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">{user.name}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>
                        <p className="text-sm text-muted-foreground">
                          {user.deleted_at
                            ? new Date(user.deleted_at).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "-"}
                        </p>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            title="Pulihkan"
                            onClick={() => handleRestore(user.id, user.name)}
                          >
                            <Icon name="RotateCcw" size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            title="Hapus Permanen"
                            onClick={() => handleForceDelete(user.id, user.name)}
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
                    Menampilkan {users.length} dari {totalUsers} pengguna terhapus
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
    </div>
  );
};
