import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumb } from "@/components/layout/BreadCrumb";
import { useReviewerManagement } from "@/hooks/useReviewerManagement";
import { ReviewerProposal } from "@/types/api.types";
import { ReviewerStats } from "@/components/reviewer/ReviewerStats";
import { ReviewerProposalTable } from "@/components/reviewer/ReviewerProposalTable";
import { ReviewerFilters } from "@/components/reviewer/ReviewerFilters";
import { AssignReviewerModal } from "@/components/reviewer/AssignReviewerModal";
import { AddReviewerModal } from "@/components/reviewer/AddReviewerModal";
import { ReviewerActionModal } from "@/components/reviewer/ReviewerActionModal";

type StatusFilterType = "all" | "pending" | "ditolak" | "disetujui" | "revisi";
type ReviewerFilterType = "all" | "true" | "false";

export const ReviewerManagement = () => {
  const {
    proposals,
    loading,
    error,
    meta,
    fetchProposals,
    fetchAvailableReviewers,
    assignReviewers,
    addMoreReviewers,
    approveProposal,
    rejectProposal,
  } = useReviewerManagement();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>("all");
  const [hasReviewerFilter, setHasReviewerFilter] =
    useState<ReviewerFilterType>("all");

  // Modal states
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [addReviewerModalOpen, setAddReviewerModalOpen] = useState(false);
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] =
    useState<ReviewerProposal | null>(null);

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
    if (hasReviewerFilter !== "all")
      params.has_reviewer = hasReviewerFilter === "true";

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
    action: "approve" | "reject",
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
          : "Proposal berhasil ditolak",
      );
      setActionModalOpen(false);
    } else {
      alert(result.message || "Terjadi kesalahan");
    }
    setSubmitting(false);
  };

  const toggleReviewer = (id: number) => {
    setSelectedReviewerIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
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

      {/* Error Message */}
      {error && (
        <div className={"bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg"}>
          <div className={"flex items-center gap-2"}>
            <Icon name="AlertTriangle" size={20} />
            <p className={"text-sm font-medium"}>{error}</p>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <ReviewerStats proposals={proposals} />

      {/* Filters */}
      <ReviewerFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSearch={handleFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        hasReviewerFilter={hasReviewerFilter}
        onHasReviewerFilterChange={setHasReviewerFilter}
      />

      {/* Proposals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Proposal</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ReviewerProposalTable
            proposals={proposals}
            loading={loading}
            onAssignReviewer={openAssignModal}
            onAddReviewer={openAddReviewerModal}
            onApprove={(proposal) => openActionModal(proposal, "approve")}
            onReject={(proposal) => openActionModal(proposal, "reject")}
            currentPage={currentPage}
            totalPages={meta?.last_page || 1}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>

      {/* Modals */}
      <AssignReviewerModal
        proposal={selectedProposal}
        open={assignModalOpen}
        onOpenChange={setAssignModalOpen}
        availableReviewers={availableReviewers}
        selectedReviewerIds={selectedReviewerIds}
        onToggleReviewer={toggleReviewer}
        onAssign={handleAssignReviewers}
        submitting={submitting}
      />

      <AddReviewerModal
        proposal={selectedProposal}
        open={addReviewerModalOpen}
        onOpenChange={setAddReviewerModalOpen}
        availableReviewers={availableReviewers}
        selectedReviewerIds={selectedReviewerIds}
        searchReviewer={searchReviewer}
        onSearchChange={setSearchReviewer}
        onToggleReviewer={toggleReviewer}
        onAdd={handleAddReviewers}
        submitting={submitting}
      />

      <ReviewerActionModal
        proposal={selectedProposal}
        open={actionModalOpen}
        onOpenChange={setActionModalOpen}
        actionType={actionType}
        catatan={catatan}
        onCatatanChange={setCatatan}
        onAction={handleAction}
        submitting={submitting}
      />
    </div>
  );
};
