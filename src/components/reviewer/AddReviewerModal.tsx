import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
import { ReviewerProposal } from "@/types/api.types";

export interface AddReviewerModalProps {
  proposal: ReviewerProposal | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableReviewers: any[];
  selectedReviewerIds: number[];
  searchReviewer: string;
  onSearchChange: (value: string) => void;
  onToggleReviewer: (id: number) => void;
  onAdd: () => void;
  submitting?: boolean;
}

export const AddReviewerModal: React.FC<AddReviewerModalProps> = ({
  proposal,
  open,
  onOpenChange,
  availableReviewers,
  selectedReviewerIds,
  searchReviewer,
  onSearchChange,
  onToggleReviewer,
  onAdd,
  submitting = false,
}) => {
  if (!proposal) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Tambah Reviewer</DialogTitle>
          <DialogDescription>{proposal.judul}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Input
              type="text"
              placeholder="Cari reviewer..."
              value={searchReviewer}
              onChange={(e) => onSearchChange(e.target.value)}
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
                  .filter((r) => !proposal.reviewers.some((existing) => existing.id === r.id))
                  .map((reviewer) => (
                    <div
                      key={reviewer.id}
                      className="flex items-center p-2 hover:bg-accent rounded cursor-pointer"
                      onClick={() => onToggleReviewer(reviewer.id)}
                    >
                      <Checkbox
                        id={`add-reviewer-${reviewer.id}`}
                        checked={selectedReviewerIds.includes(reviewer.id)}
                        onChange={() => onToggleReviewer(reviewer.id)}
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
            onClick={() => onOpenChange(false)}
            disabled={submitting}
          >
            Batal
          </Button>
          <Button onClick={onAdd} disabled={submitting}>
            {submitting ? "Memproses..." : "Tambah"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
