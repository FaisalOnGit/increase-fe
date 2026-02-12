import { useState } from "react";
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
import { Proposal } from "@/types/api.types";

export interface ProposalTableProps {
  proposals: Proposal[];
  loading?: boolean;
  onEdit?: (proposal: Proposal) => void;
  onDelete?: (id: number) => void;
  onView?: (proposal: Proposal) => void;
  emptyMessage?: string;
}

export const ProposalTable: React.FC<ProposalTableProps> = ({
  proposals,
  loading = false,
  onEdit,
  onDelete,
  onView,
  emptyMessage = "Belum ada proposal",
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        );
      case "disetujui":
        return (
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
            Disetujui
          </Badge>
        );
      case "ditolak":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Ditolak
          </Badge>
        );
      case "revisi":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Revisi
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPembimbingStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-xs">
            Pending
          </Badge>
        );
      case "disetujui":
        return (
          <Badge
            variant="outline"
            className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200"
          >
            Disetujui
          </Badge>
        );
      case "ditolak":
        return (
          <Badge
            variant="outline"
            className="text-xs bg-red-50 text-red-700 border-red-200"
          >
            Ditolak
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-xs">
            {status}
          </Badge>
        );
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Memuat data...</p>
      </div>
    );
  }

  if (proposals.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <Icon name="FileText" className="mx-auto mb-4 opacity-20" size={48} />
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Judul</TableHead>
            <TableHead>Jenis PKM</TableHead>
            <TableHead>Pembimbing</TableHead>
            <TableHead>Status Pembimbing</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tahun</TableHead>
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
                    {proposal.ketua.name} (Ketua)
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="text-sm font-medium">
                    {proposal.pkm.singkatan}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {proposal.pkm.nama}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="text-sm font-medium">
                    {proposal.pembimbing.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {proposal.pembimbing.email}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                {getPembimbingStatusBadge(proposal.status_pembimbing)}
              </TableCell>
              <TableCell>{getStatusBadge(proposal.status)}</TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">
                  {proposal.kalender.tahun}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  {onView && (
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Lihat Detail"
                      onClick={() => onView(proposal)}
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                  )}
                  {(proposal.status === "pending" ||
                    proposal.status === "revisi") &&
                    onEdit && (
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Edit"
                        onClick={() => onEdit(proposal)}
                      >
                        <Icon name="Settings" size={16} />
                      </Button>
                    )}
                  {(proposal.status === "pending" ||
                    proposal.status === "revisi") &&
                    onDelete && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(proposal.id)}
                        className="text-destructive"
                        title="Hapus"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    )}
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    title="Lihat File"
                  >
                    <a
                      href={proposal.file_proposal_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon name="FileText" size={16} />
                    </a>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
