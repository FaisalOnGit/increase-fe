import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumb } from "@/components/layout/BreadCrumb";
import { Input } from "@/components/ui/input";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getRekapProposal, getRekapDetail } from "@/api/rekap";
import { RekapProposalFakultas, Proposal } from "@/types/api.types";
import { useFaculty, useProdi } from "@/hooks";

type FilterType = number | "all";

export const RekapProposal: React.FC = () => {
  const [rekapData, setRekapData] = useState<RekapProposalFakultas[]>([]);
  const [detailData, setDetailData] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  // Filters
  const [tahun, setTahun] = useState<number>(2026);
  const [selectedFakultas, setSelectedFakultas] = useState<FilterType>("all");
  const [selectedProdi, setSelectedProdi] = useState<FilterType>("all");

  // Detail filters
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const itemsPerPage = 15;

  // Fetch faculties and prodis using custom hooks
  const { faculties: fakultasList } = useFaculty();
  const { prodis: prodiList } = useProdi(
    selectedFakultas !== "all" ? Number(selectedFakultas) : undefined
  );

  const fetchRekap = async () => {
    setLoading(true);
    setShowDetail(false);
    try {
      const params: any = { tahun };
      if (selectedFakultas !== "all") params.fakultas_id = selectedFakultas;
      if (selectedProdi !== "all") params.prodi_id = selectedProdi;

      const response = await getRekapProposal(params);
      if (response.success && response.data) {
        setRekapData(response.data);
      }
    } catch (error) {
      console.error("Error fetching rekap:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDetail = async (fakultasId?: number, prodiId?: number) => {
    setDetailLoading(true);
    setShowDetail(true);
    setCurrentPage(1); // Reset to first page when viewing new detail
    try {
      const params: any = {
        tahun,
        page: 1,
        per_page: itemsPerPage,
      };

      if (fakultasId) params.fakultas_id = fakultasId;
      if (prodiId) params.prodi_id = prodiId;
      if (statusFilter !== "all") params.status = statusFilter;

      const response = await getRekapDetail(params);
      if (response.success && response.data) {
        setDetailData(response.data);
        if (response.meta) {
          setTotalPages(Math.ceil(response.meta.total / itemsPerPage));
          setTotal(response.meta.total);
        }
      }
    } catch (error) {
      console.error("Error fetching detail:", error);
    } finally {
      setDetailLoading(false);
    }
  };

  useEffect(() => {
    fetchRekap();
  }, [tahun, selectedFakultas, selectedProdi]);

  useEffect(() => {
    if (showDetail) {
      const fetchWithFilters = async () => {
        setDetailLoading(true);
        try {
          const params: any = {
            tahun,
            page: currentPage,
            per_page: itemsPerPage,
          };

          if (selectedFakultas !== "all") params.fakultas_id = Number(selectedFakultas);
          if (selectedProdi !== "all") params.prodi_id = Number(selectedProdi);
          if (statusFilter !== "all") params.status = statusFilter;

          const response = await getRekapDetail(params);
          if (response.success && response.data) {
            setDetailData(response.data);
            if (response.meta) {
              setTotalPages(Math.ceil(response.meta.total / itemsPerPage));
              setTotal(response.meta.total);
            }
          }
        } catch (error) {
          console.error("Error fetching detail:", error);
        } finally {
          setDetailLoading(false);
        }
      };
      fetchWithFilters();
    }
  }, [currentPage, statusFilter, selectedFakultas, selectedProdi, tahun]);

  // Calculate totals
  const totalProposals = rekapData.reduce((acc, fakultas) => {
    return (
      acc +
      fakultas.prodi.reduce((sum, prodi) => sum + prodi.jumlah_proposal, 0)
    );
  }, 0);

  const totalMahasiswa = rekapData.reduce((acc, fakultas) => {
    return (
      acc + fakultas.prodi.reduce((sum, prodi) => sum + prodi.jumlah_mahasiswa, 0)
    );
  }, 0);

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      pending: "secondary",
      disetujui: "default",
      ditolak: "destructive",
      revisi: "outline",
    };
    return (
      <Badge variant={variants[status] || "default"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div>
        <Breadcrumb
          pages={[
            { name: "Dashboard", href: "/dashboard" },
            { name: "Laporan", href: "/dashboard/laporan" },
            { name: "Rekap Proposal", href: "/dashboard/laporan/rekap-proposal" },
          ]}
        />
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Rekap Proposal</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Laporan rekapitulasi proposal berdasarkan fakultas dan prodi
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon name="Building" size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{rekapData.length}</p>
                <p className="text-xs text-muted-foreground">Fakultas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Icon name="BookOpen" size={20} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {rekapData.reduce((acc, f) => acc + f.prodi.length, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Prodi</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Icon name="FileText" size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalProposals}</p>
                <p className="text-xs text-muted-foreground">Total Proposal</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Icon name="Users" size={20} className="text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalMahasiswa}</p>
                <p className="text-xs text-muted-foreground">Total Mahasiswa</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Tahun</label>
              <Input
                type="number"
                value={tahun}
                onChange={(e) => setTahun(Number(e.target.value))}
                placeholder="2026"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Fakultas</label>
              <Select
                value={String(selectedFakultas)}
                onValueChange={(value: string) => {
                  setSelectedFakultas(value === "all" ? "all" : Number(value));
                  setSelectedProdi("all");
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Semua Fakultas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Fakultas</SelectItem>
                  {fakultasList.map((fakultas) => (
                    <SelectItem key={fakultas.id} value={String(fakultas.id)}>
                      {fakultas.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Prodi</label>
              <Select
                value={String(selectedProdi)}
                onValueChange={(value: string) =>
                  setSelectedProdi(value === "all" ? "all" : Number(value))
                }
                disabled={selectedFakultas === "all"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Semua Prodi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Prodi</SelectItem>
                  {prodiList.map((prodi) => (
                    <SelectItem key={prodi.id} value={String(prodi.id)}>
                      {prodi.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={fetchRekap} className="w-full">
                <Icon name="Search" size={16} className="mr-2" />
                Terapkan Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rekap Data */}
      {!showDetail ? (
        <Card>
          <CardHeader>
            <CardTitle>Rekapitulasi per Fakultas</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">
                Memuat data...
              </div>
            ) : rekapData.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                Tidak ada data
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {rekapData.map((fakultas) => (
                  <AccordionItem key={fakultas.fakultas_id} value={`f-${fakultas.fakultas_id}`}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center justify-between w-full pr-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon name="Building" size={18} className="text-primary" />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold">{fakultas.fakultas_name}</p>
                            <p className="text-xs text-muted-foreground">
                              {fakultas.prodi.length} prodi
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              {fakultas.prodi.reduce(
                                (sum, p) => sum + p.jumlah_proposal,
                                0
                              )}{" "}
                              proposal
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {fakultas.prodi.reduce(
                                (sum, p) => sum + p.jumlah_mahasiswa,
                                0
                              )}{" "}
                              mahasiswa
                            </p>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Prodi</TableHead>
                              <TableHead>Kode Prodi</TableHead>
                              <TableHead className="text-center">
                                Jumlah Proposal
                              </TableHead>
                              <TableHead className="text-center">
                                Jumlah Mahasiswa
                              </TableHead>
                              <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {fakultas.prodi.map((prodi) => (
                              <TableRow key={prodi.prodi_id}>
                                <TableCell className="font-medium">
                                  {prodi.prodi_name}
                                </TableCell>
                                <TableCell>
                                  <code className="text-sm bg-muted px-2 py-1 rounded">
                                    {prodi.prodi_code}
                                  </code>
                                </TableCell>
                                <TableCell className="text-center">
                                  <Badge variant="secondary">{prodi.jumlah_proposal}</Badge>
                                </TableCell>
                                <TableCell className="text-center">
                                  <Badge variant="outline">{prodi.jumlah_mahasiswa}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => fetchDetail(fakultas.fakultas_id, prodi.prodi_id)}
                                  >
                                    <Icon name="Eye" size={14} className="mr-2" />
                                    Lihat Detail
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Back Button */}
          <Button variant="outline" onClick={() => setShowDetail(false)}>
            <Icon name="ChevronLeft" size={16} className="mr-2" />
            Kembali ke Rekap
          </Button>

          {/* Detail Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Detail Proposal</CardTitle>
                <div className="flex items-center gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="disetujui">Disetujui</SelectItem>
                      <SelectItem value="ditolak">Ditolak</SelectItem>
                      <SelectItem value="revisi">Revisi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {detailLoading ? (
                <div className="p-8 text-center text-muted-foreground">
                  Memuat data...
                </div>
              ) : detailData.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  Tidak ada proposal
                </div>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Judul Proposal</TableHead>
                        <TableHead>Ketua</TableHead>
                        <TableHead>Jenis PKM</TableHead>
                        <TableHead>Tahun</TableHead>
                        <TableHead>Status Pembimbing</TableHead>
                        <TableHead>Status Proposal</TableHead>
                        <TableHead>Nilai</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {detailData.map((proposal) => (
                        <TableRow key={proposal.id}>
                          <TableCell>
                            <p className="text-sm font-medium">{proposal.judul}</p>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm">{proposal.ketua.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {proposal.ketua.email}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{proposal.pkm.singkatan}</Badge>
                          </TableCell>
                          <TableCell>{proposal.kalender.tahun}</TableCell>
                          <TableCell>{getStatusBadge(proposal.status_pembimbing)}</TableCell>
                          <TableCell>{getStatusBadge(proposal.status)}</TableCell>
                          <TableCell>
                            <span className="text-sm font-medium">
                              {proposal.nilai_akhir || "-"}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {/* Pagination */}
                  <div className="px-6 py-4 border-t">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Menampilkan {(currentPage - 1) * itemsPerPage + 1} hingga{" "}
                        {Math.min(currentPage * itemsPerPage, total)} dari {total}{" "}
                        proposal
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
        </>
      )}
    </div>
  );
};
