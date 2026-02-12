import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumb } from "@/components/layout/BreadCrumb";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  getPembimbingProposals,
  approveProposal,
  rejectProposal,
} from "@/api/pembimbing";
import { Proposal } from "@/types/api.types";
import { PembimbingProposalTable } from "@/components/pembimbing/PembimbingProposalTable";

type StatusType = "pending" | "ditolak" | "disetujui" | "revisi" | "all";

export const ProposalManagement: React.FC = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusPembimbingFilter, setStatusPembimbingFilter] =
    useState<StatusType>("all");
  const [statusFilter, setStatusFilter] = useState<StatusType>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const itemsPerPage = 15;

  // Modal states
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(
    null,
  );
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject">("approve");
  const [catatan, setCatatan] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchProposals = async () => {
    setLoading(true);
    try {
      const params: any = {
        page: currentPage,
        per_page: itemsPerPage,
      };

      if (searchTerm) params.search = searchTerm;
      if (statusPembimbingFilter !== "all")
        params.status_pembimbing = statusPembimbingFilter;
      if (statusFilter !== "all") params.status = statusFilter;

      const response = await getPembimbingProposals(params);

      if (response.data) {
        setProposals(response.data);
        if (response.meta) {
          setTotalPages(response.meta.last_page);
          setTotal(response.meta.total);
        }
      }
    } catch (error) {
      console.error("Error fetching proposals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, [currentPage, statusPembimbingFilter, statusFilter]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchProposals();
  };

  const openActionModal = (
    proposal: Proposal,
    action: "approve" | "reject",
  ) => {
    setSelectedProposal(proposal);
    setActionType(action);
    setCatatan("");
    setActionModalOpen(true);
  };

  const handleAction = async () => {
    if (!selectedProposal) return;

    setSubmitting(true);
    try {
      const data = { catatan: catatan || undefined };
      let response;

      if (actionType === "approve") {
        response = await approveProposal(selectedProposal.id, data);
      } else {
        if (!catatan.trim()) {
          alert("Catatan wajib diisi untuk menolak proposal");
          setSubmitting(false);
          return;
        }
        response = await rejectProposal(selectedProposal.id, { catatan });
      }

      if (response.success) {
        alert(
          actionType === "approve"
            ? "Proposal berhasil disetujui"
            : "Proposal berhasil ditolak",
        );
        setActionModalOpen(false);
        fetchProposals();
      } else {
        alert(response.message || "Terjadi kesalahan");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div>
        <Breadcrumb
          pages={[
            { name: "Dashboard", href: "/dashboard" },
            { name: "Manajemen", href: "/dashboard/manajemen" },
            {
              name: "Manajemen Proposal",
              href: "/dashboard/manajemen/proposal",
            },
          ]}
        />
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Manajemen Proposal</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Kelola proposal mahasiswa yang ditugaskan kepada Anda
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon name="FileText" size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{total}</p>
                <p className="text-xs text-muted-foreground">Total Proposal</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Icon name="Clock" size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {
                    proposals.filter((p) => p.status_pembimbing === "pending")
                      .length
                  }
                </p>
                <p className="text-xs text-muted-foreground">Menunggu Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Icon
                  name="CheckCircle"
                  size={20}
                  className="text-emerald-600"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {
                    proposals.filter((p) => p.status_pembimbing === "disetujui")
                      .length
                  }
                </p>
                <p className="text-xs text-muted-foreground">Disetujui</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Icon name="XCircle" size={20} className="text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {
                    proposals.filter((p) => p.status_pembimbing === "ditolak")
                      .length
                  }
                </p>
                <p className="text-xs text-muted-foreground">Ditolak</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Icon
                  name="Search"
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  type="text"
                  placeholder="Cari judul proposal..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Select
                value={statusPembimbingFilter}
                onValueChange={(value: StatusType) => {
                  setStatusPembimbingFilter(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status Pembimbing" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status Pembimbing</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="disetujui">Disetujui</SelectItem>
                  <SelectItem value="ditolak">Ditolak</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select
                value={statusFilter}
                onValueChange={(value: StatusType) => {
                  setStatusFilter(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status Proposal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status Proposal</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="disetujui">Disetujui</SelectItem>
                  <SelectItem value="ditolak">Ditolak</SelectItem>
                  <SelectItem value="revisi">Revisi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Proposals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Proposal</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <PembimbingProposalTable
            proposals={proposals}
            loading={loading}
            onApprove={(proposal) => openActionModal(proposal, "approve")}
            onReject={(proposal) => openActionModal(proposal, "reject")}
            currentPage={currentPage}
            totalPages={totalPages}
            total={total}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>

      {/* Action Modal */}
      <Dialog open={actionModalOpen} onOpenChange={setActionModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "approve" ? "Setujui Proposal" : "Tolak Proposal"}
            </DialogTitle>
            <DialogDescription>{selectedProposal?.judul}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="catatan">
                Catatan {actionType === "reject" && "(Wajib diisi)"}
              </Label>
              <Textarea
                id="catatan"
                placeholder={
                  actionType === "approve"
                    ? "Tambahkan catatan opsional..."
                    : "Jelaskan alasan penolakan..."
                }
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setActionModalOpen(false)}
              disabled={submitting}
            >
              Batal
            </Button>
            <Button
              variant={actionType === "approve" ? "default" : "destructive"}
              onClick={handleAction}
              disabled={submitting}
            >
              {submitting
                ? "Memproses..."
                : actionType === "approve"
                  ? "Setujui"
                  : "Tolak"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
