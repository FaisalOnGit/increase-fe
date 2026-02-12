import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReviewerProposal } from "@/types/api.types";

export interface ReviewerProposalTableProps {
  proposals: ReviewerProposal[];
  loading?: boolean;
  onAssignReviewer: (proposal: ReviewerProposal) => void;
  onAddReviewer: (proposal: ReviewerProposal) => void;
  onApprove: (proposal: ReviewerProposal) => void;
  onReject: (proposal: ReviewerProposal) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const ReviewerProposalTable: React.FC<ReviewerProposalTableProps> = ({
  proposals,
  loading = false,
  onAssignReviewer,
  onAddReviewer,
  onApprove,
  onReject,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [membersModalOpen, setMembersModalOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] =
    useState<ReviewerProposal | null>(null);

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

  const getStatusPembimbingBadge = (status: string) => {
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
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

  const openMembersModal = (proposal: ReviewerProposal) => {
    setSelectedProposal(proposal);
    setMembersModalOpen(true);
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Memuat data...
      </div>
    );
  }

  if (proposals.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Tidak ada proposal
      </div>
    );
  }

  return (
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
            <TableHead className={"text-right"}>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {proposals.map((proposal) => (
            <TableRow key={proposal.id}>
              <TableCell>
                <div>
                  <p className={"text-sm font-medium"}>{proposal.judul}</p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className={"text-sm font-medium"}>{proposal.ketua.name}</p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className={"text-sm"}>
                    {proposal.reviewers?.length || 0} /{" "}
                    {proposal.batas_max_reviewer}
                  </p>
                  <div className={"flex flex-wrap gap-1 mt-1"}>
                    {proposal.reviewers?.slice(0, 3).map((r) => (
                      <Badge key={r.id} variant={"outline"} className={"text-xs"}>
                        {r.name.split(" ").pop()}
                      </Badge>
                    ))}
                    {proposal.reviewers?.length > 3 && (
                      <Badge variant={"outline"} className={"text-xs"}>
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
              <TableCell className={"text-right"}>
                <div className={"flex items-center justify-end gap-2"}>
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Lihat Anggota"
                    onClick={() => openMembersModal(proposal)}
                  >
                    <Icon name="Users" size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Assign Reviewer"
                    onClick={() => onAssignReviewer(proposal)}
                  >
                    <Icon name="UserPlus" size={16} />
                  </Button>
                  {proposal.reviewers && proposal.reviewers.length > 0 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Tambah Reviewer"
                      onClick={() => onAddReviewer(proposal)}
                    >
                      <Icon name="Users" size={16} />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-emerald-600"
                    title="Setujui"
                    onClick={() => onApprove(proposal)}
                  >
                    <Icon name="Check" size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600"
                    title="Tolak"
                    onClick={() => onReject(proposal)}
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
            Halaman {currentPage} dari {totalPages || 1}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Members Modal */}
      {selectedProposal && (
        <MembersModal
          proposal={selectedProposal}
          open={membersModalOpen}
          onOpenChange={setMembersModalOpen}
        />
      )}
    </>
  );
};

// Members Modal Component
interface MembersModalProps {
  proposal: ReviewerProposal;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MembersModal: React.FC<MembersModalProps> = ({
  proposal,
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Daftar Anggota Tim</DialogTitle>
          <DialogDescription>{proposal.judul}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* Ketua */}
          <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
              {proposal.ketua.name.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="font-medium">{proposal.ketua.name}</p>
              <p className="text-sm text-muted-foreground">
                {proposal.ketua.email}
              </p>
              <Badge variant="default" className="mt-1 text-xs">
                Ketua Tim
              </Badge>
            </div>
          </div>

          {/* Anggota */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Anggota Tim ({proposal.anggota.length})
            </p>
            {proposal.anggota.map((anggota, index) => (
              <div
                key={anggota.id}
                className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
              >
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground font-semibold">
                  {anggota.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{anggota.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {anggota.email}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  #{index + 1}
                </Badge>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className={"pt-2 border-t"}>
            <p className={"text-sm text-muted-foreground"}>
              Total Tim: {1 + proposal.anggota.length} orang
            </p>
          </div>
        </div>
        <div className={"flex justify-end"}>
          <Button variant={"outline"} onClick={() => onOpenChange(false)}>
            Tutup
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
