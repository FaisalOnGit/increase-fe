import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ReviewerProposal } from "@/types/api.types";

export interface ReviewerActionModalProps {
  proposal: ReviewerProposal | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actionType: "approve" | "reject";
  catatan: string;
  onCatatanChange: (value: string) => void;
  onAction: () => void;
  submitting?: boolean;
}

export const ReviewerActionModal: React.FC<ReviewerActionModalProps> = ({
  proposal,
  open,
  onOpenChange,
  actionType,
  catatan,
  onCatatanChange,
  onAction,
  submitting = false,
}) => {
  if (!proposal) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === "approve" ? "Setujui Proposal" : "Tolak Proposal"}
          </DialogTitle>
          <DialogDescription>{proposal.judul}</DialogDescription>
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
              onChange={(e) => onCatatanChange(e.target.value)}
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={submitting}
          >
            Batal
          </Button>
          <Button
            variant={actionType === "approve" ? "default" : "destructive"}
            onClick={onAction}
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
  );
};
