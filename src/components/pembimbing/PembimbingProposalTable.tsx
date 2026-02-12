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
import { Proposal } from "@/types/api.types";

export interface PembimbingProposalTableProps {
  proposals: Proposal[];
  loading?: boolean;
  onApprove?: (proposal: Proposal) => void;
  onReject?: (proposal: Proposal) => void;
  currentPage: number;
  totalPages: number;
  total: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const PembimbingProposalTable: React.FC<
  PembimbingProposalTableProps
> = ({
  proposals,
  loading = false,
  onApprove,
  onReject,
  currentPage,
  totalPages,
  total,
  itemsPerPage,
  onPageChange,
}) => {
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [membersModalOpen, setMembersModalOpen] = useState(false);
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

  const openMembersModal = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setMembersModalOpen(true);
  };

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
            <TableHead>Jenis PKM</TableHead>
            <TableHead>Tahun</TableHead>
            <TableHead>Status Pembimbing</TableHead>
            <TableHead>Status Proposal</TableHead>
            <TableHead>Nilai</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {proposals.map((proposal) => (
            <TableRow key={proposal.id}>
              <TableCell>
                <p className="text-sm font-medium">{proposal.judul}</p>
              </TableCell>
              <TableCell>
                <div>
                  <p className="text-sm font-medium">{proposal.ketua.name}</p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="text-sm font-medium">
                    {proposal.pkm.singkatan}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm">{proposal.kalender.tahun}</span>
              </TableCell>
              <TableCell>
                {getStatusPembimbingBadge(proposal.status_pembimbing)}
              </TableCell>
              <TableCell>{getStatusBadge(proposal.status)}</TableCell>
              <TableCell>
                <span className="text-sm font-medium">
                  {proposal.nilai_akhir || "-"}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
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
                    title="Lihat Detail"
                    onClick={() =>
                      window.open(proposal.file_proposal_url, "_blank")
                    }
                  >
                    <Icon name="FileText" size={16} />
                  </Button>
                  {proposal.status_pembimbing === "pending" && (
                    <>
                      {onApprove && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-emerald-600"
                          title="Setujui"
                          onClick={() => onApprove(proposal)}
                        >
                          <Icon name="Check" size={16} />
                        </Button>
                      )}
                      {onReject && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600"
                          title="Tolak"
                          onClick={() => onReject(proposal)}
                        >
                          <Icon name="X" size={16} />
                        </Button>
                      )}
                    </>
                  )}
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
            Menampilkan {(currentPage - 1) * itemsPerPage + 1} hingga{" "}
            {Math.min(currentPage * itemsPerPage, total)} dari {total} proposal
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
            <span className="px-3 py-1 text-sm">
              Halaman {currentPage} dari {totalPages || 1}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                onPageChange(Math.min(currentPage + 1, totalPages))
              }
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Members Modal */}
      <Dialog open={membersModalOpen} onOpenChange={setMembersModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Daftar Anggota Tim</DialogTitle>
            <DialogDescription>
              {selectedProposal?.judul}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Ketua */}
            {selectedProposal && (
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                  {selectedProposal.ketua.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{selectedProposal.ketua.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedProposal.ketua.email}
                  </p>
                  <Badge variant="default" className="mt-1 text-xs">
                    Ketua Tim
                  </Badge>
                </div>
              </div>
            )}

            {/* Anggota */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Anggota Tim ({selectedProposal?.anggota.length || 0})
              </p>
              {selectedProposal?.anggota.map((anggota, index) => (
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
            <div className="pt-2 border-t">
              <p className="text-sm text-muted-foreground">
                Total Tim: {selectedProposal ? 1 + selectedProposal.anggota.length : 0} orang
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
