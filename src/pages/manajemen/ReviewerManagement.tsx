import { useState, useEffect } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useReviewerManagement } from "@/hooks/useReviewerManagement";
import { ReviewerProposal } from "@/types/api.types";

type StatusFilterType = "all" | "pending" | "ditolak" | "disetujui" | "revisi";
type ReviewerFilterType = "all" | "true" | "false";

export const ReviewerManagement = () => {
  const {
    proposals,
    loading,
    fetchProposals,
    fetchAvailableReviewers,
    assignReviewers,
    addMoreReviewers,
    approveProposal,
    rejectProposal,
  } = useReviewerManagement();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>("all");
  const [hasReviewerFilter, setHasReviewerFilter] = useState<ReviewerFilterType>("all");
  const [tahunFilter, setTahunFilter] = useState<number | undefined>(undefined);

  // Modal states
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [addReviewerModalOpen, setAddReviewerModalOpen] = useState(false);
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<ReviewerProposal | null>(null);

  const [availableReviewers, setAvailableReviewers] = useState<any[]>([]);
  const [selectedReviewerIds, setSelectedReviewerIds] = useState<number[]>([]);
  const [searchReviewer, setSearchReviewer] = useState("");
  const [catatan, setCatatan] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject">("approve");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    fetchProposals({
      page: currentPage,
      per_page: itemsPerPage,
    });
  }, [currentPage]);

  const handleFilter = () => {
    const params: any = {
      page: 1,
      per_page: itemsPerPage,
    };

    if (searchTerm) params.search = searchTerm;
    if (statusFilter !== "all") params.status = statusFilter;
    if (hasReviewerFilter !== "all") params.has_reviewer = hasReviewerFilter === "true";
    if (tahunFilter) params.tahun = tahunFilter;

    setCurrentPage(1);
    fetchProposals(params);
  };

  const openAssignModal = async (proposal: ReviewerProposal) => {
    setSelectedProposal(proposal);
    setSelectedReviewerIds(proposal.reviewers.map((r) => r.id));
    setAssignModalOpen(true);

    // Fetch available reviewers (excluding already assigned)
    const reviewers = await fetchAvailableReviewers(proposal.id);
    setAvailableReviewers(reviewers);
  };

  const openAddReviewerModal = async (proposal: ReviewerProposal) => {
    setSelectedProposal(proposal);
    setSearchReviewer("");
    setAddReviewerModalOpen(true);

    // Fetch available reviewers (excluding already assigned)
    const reviewers = await fetchAvailableReviewers(proposal.id);
    setAvailableReviewers(reviewers);
    setSelectedReviewerIds([]);
  };

  const handleAssignReviewers = async () => {
    if (!selectedProposal || selectedReviewerIds.length === 0) {
      alert("Pilih minimal 1 reviewer");
      return;
    }

    setSubmitting(true);
    const result = await assignReviewers(selectedProposal.id, {
      reviewer_ids: selectedReviewerIds,
    });

    if (result.success) {
      alert("Reviewer berhasil ditugaskan");
      setAssignModalOpen(false);
      setSelectedReviewerIds([]);
    } else {
      alert(result.message || "Gagal menugaskan reviewer");
    }
    setSubmitting(false);
  };

  const handleAddReviewers = async () => {
    if (!selectedProposal || selectedReviewerIds.length === 0) {
      alert("Pilih minimal 1 reviewer");
      return;
    }

    setSubmitting(true);
    const result = await addMoreReviewers(selectedProposal.id, {
      reviewer_ids: selectedReviewerIds,
    });

    if (result.success) {
      alert("Reviewer berhasil ditambahkan");
      setAddReviewerModalOpen(false);
      setSelectedReviewerIds([]);
    } else {
      alert(result.message || "Gagal menambahkan reviewer");
    }
    setSubmitting(false);
  };

  const openActionModal = (
    proposal: ReviewerProposal,
    action: "approve" | "reject"
  ) => {
    setSelectedProposal(proposal);
    setActionType(action);
    setCatatan("");
    setActionModalOpen(true);
  };

  const handleAction = async () => {
    if (!selectedProposal) return;

    if (actionType === "reject" && !catatan.trim()) {
      alert("Catatan wajib diisi untuk menolak proposal");
      return;
    }

    setSubmitting(true);
    const data = { catatan: catatan || undefined };
    let result;

    if (actionType === "approve") {
      result = await approveProposal(selectedProposal.id, data);
    } else {
      result = await rejectProposal(selectedProposal.id, data);
    }

    if (result.success) {
      alert(
        actionType === "approve"
          ? "Proposal berhasil disetujui"
          : "Proposal berhasil ditolak"
      );
      setActionModalOpen(false);
    } else {
      alert(result.message || "Terjadi kesalahan");
    }
    setSubmitting(false);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
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

  const getStatusPembimbingBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "secondary",
      disetujui: "default",
      ditolak: "destructive",
    };
    return (
      <Badge variant={variants[status] || "default"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const toggleReviewer = (id: number) => {
    setSelectedReviewerIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
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
              name: "Reviewer Management",
              href: "/dashboard/manajemen/review",
            },
          ]}
        />
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Reviewer Management</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Kelola reviewer dan approval proposal
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
                <p className="text-2xl font-bold">{proposals.length}</p>
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
                  {proposals.filter((p) => !p.reviewers || p.reviewers.length === 0).length}
                </p>
                <p className="text-xs text-muted-foreground">Belum Ada Reviewer</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Icon name="CheckCircle" size={20} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {proposals.filter((p) => p.status === "disetujui").length}
                </p>
                <p className="text-xs text-muted-foreground">Disetujui</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Icon name="Users" size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {proposals.reduce((acc, p) => acc + (p.reviewers?.length || 0), 0)}
                </p>
                <p className="text-xs text-muted-foreground">Total Reviewer</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
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
                  placeholder="Cari judul atau nama ketua..."
                  value={searchTerm}
                  onKeyDown={(e) => e.key === "Enter" && handleFilter()}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Select
                value={statusFilter}
                onValueChange={(value: StatusFilterType) => setStatusFilter(value)}
              >
                <SelectTrigger>
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
            <div>
              <Select
                value={hasReviewerFilter}
                onValueChange={(value: ReviewerFilterType) =>
                  setHasReviewerFilter(value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Reviewer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value="true">Sudah Ada</SelectItem>
                  <SelectItem value="false">Belum Ada</SelectItem>
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
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">
              Memuat data...
            </div>
          ) : proposals.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              Tidak ada proposal
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Judul Proposal</TableHead>
                    <TableHead>Ketua Tim</TableHead>
                    <TableHead>Reviewer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Status Pembimbing</TableHead>
                    <TableHead>Admin</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {proposals.map((proposal) => (
                    <TableRow key={proposal.id}>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{proposal.judul}</p>
                          <p className="text-xs text-muted-foreground">
                            {proposal.tahun}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{proposal.ketua.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {proposal.anggota.length + 1} anggota
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">
                            {proposal.reviewers?.length || 0} / {proposal.batas_max_reviewer}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {proposal.reviewers?.slice(0, 3).map((r) => (
                              <Badge
                                key={r.id}
                                variant="outline"
                                className="text-xs"
                              >
                                {r.name.split(" ").pop()}
                              </Badge>
                            ))}
                            {proposal.reviewers?.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{proposal.reviewers.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(proposal.status)}</TableCell>
                      <TableCell>
                        {getStatusPembimbingBadge(proposal.status_pembimbing)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            proposal.status_admin === "disetujui"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {proposal.status_admin === "disetujui"
                            ? "Disetujui"
                            : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Assign Reviewer"
                            onClick={() => openAssignModal(proposal)}
                          >
                            <Icon name="UserPlus" size={16} />
                          </Button>
                          {proposal.reviewers && proposal.reviewers.length > 0 && (
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Tambah Reviewer"
                              onClick={() => openAddReviewerModal(proposal)}
                            >
                              <Icon name="Users" size={16} />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-emerald-600"
                            title="Setujui"
                            onClick={() => openActionModal(proposal, "approve")}
                          >
                            <Icon name="Check" size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-600"
                            title="Tolak"
                            onClick={() => openActionModal(proposal, "reject")}
                          >
                            <Icon name="X" size={16} />
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
                    Halaman {currentPage} dari {meta?.total_pages || 1}
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
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setCurrentPage((prev) => (prev + 1))}
                      disabled={currentPage >= (meta?.total_pages || 1)}
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

      {/* Assign Reviewers Modal */}
      <Dialog open={assignModalOpen} onOpenChange={setAssignModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Assign Reviewer</DialogTitle>
            <DialogDescription>
              {selectedProposal?.judul}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Pilih Reviewer (Maksimal {selectedProposal?.batas_max_reviewer})</Label>
              <div className="border rounded-lg p-3 max-h-60 overflow-y-auto">
                {availableReviewers.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Tidak ada reviewer tersedia
                  </p>
                ) : (
                  availableReviewers.map((reviewer) => (
                    <div
                      key={reviewer.id}
                      className="flex items-center p-2 hover:bg-accent rounded cursor-pointer"
                      onClick={() => toggleReviewer(reviewer.id)}
                    >
                      <Checkbox
                        id={`reviewer-${reviewer.id}`}
                        checked={selectedReviewerIds.includes(reviewer.id)}
                        onChange={() => toggleReviewer(reviewer.id)}
                        className="mr-3"
                      />
                      <label
                        htmlFor={`reviewer-${reviewer.id}`}
                        className="flex-1 cursor-pointer"
                      >
                        <div className="font-medium">{reviewer.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {reviewer.email}
                        </div>
                      </label>
                    </div>
                  ))
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Terpilih: {selectedReviewerIds.length} reviewer
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAssignModalOpen(false)}
              disabled={submitting}
            >
              Batal
            </Button>
            <Button onClick={handleAssignReviewers} disabled={submitting}>
              {submitting ? "Memproses..." : "Assign"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Reviewer Modal */}
      <Dialog open={addReviewerModalOpen} onOpenChange={setAddReviewerModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tambah Reviewer</DialogTitle>
            <DialogDescription>
              {selectedProposal?.judul}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Input
                type="text"
                placeholder="Cari reviewer..."
                value={searchReviewer}
                onChange={(e) => setSearchReviewer(e.target.value)}
                className="mb-2"
              />
            </div>
            <div className="space-y-2">
              <Label>Pilih Reviewer Tambahan</Label>
              <div className="border rounded-lg p-3 max-h-60 overflow-y-auto">
                {availableReviewers.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Tidak ada reviewer tersedia
                  </p>
                ) : (
                  availableReviewers
                    .filter((r) => !selectedProposal?.reviewers.some((existing) => existing.id === r.id))
                    .map((reviewer) => (
                      <div
                        key={reviewer.id}
                        className="flex items-center p-2 hover:bg-accent rounded cursor-pointer"
                        onClick={() => toggleReviewer(reviewer.id)}
                      >
                        <Checkbox
                          id={`add-reviewer-${reviewer.id}`}
                          checked={selectedReviewerIds.includes(reviewer.id)}
                          onChange={() => toggleReviewer(reviewer.id)}
                          className="mr-3"
                        />
                        <label
                          htmlFor={`add-reviewer-${reviewer.id}`}
                          className="flex-1 cursor-pointer"
                        >
                          <div className="font-medium">{reviewer.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {reviewer.email}
                          </div>
                        </label>
                      </div>
                    ))
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Terpilih: {selectedReviewerIds.length} reviewer
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAddReviewerModalOpen(false)}
              disabled={submitting}
            >
              Batal
            </Button>
            <Button onClick={handleAddReviewers} disabled={submitting}>
              {submitting ? "Memproses..." : "Tambah"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
              {submitting ? "Memproses..." : actionType === "approve" ? "Setujui" : "Tolak"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
