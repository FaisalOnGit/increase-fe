import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icon } from "@/components/ui/Icon";

type StatusFilterType = "all" | "pending" | "ditolak" | "disetujui" | "revisi";
type ReviewerFilterType = "all" | "true" | "false";

export interface ReviewerFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  statusFilter: StatusFilterType;
  onStatusFilterChange: (value: StatusFilterType) => void;
  hasReviewerFilter: ReviewerFilterType;
  onHasReviewerFilterChange: (value: ReviewerFilterType) => void;
}

export const ReviewerFilters: React.FC<ReviewerFiltersProps> = ({
  searchTerm,
  onSearchChange,
  onSearch,
  statusFilter,
  onStatusFilterChange,
  hasReviewerFilter,
  onHasReviewerFilterChange,
}) => {
  return (
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
                onKeyDown={(e) => e.key === "Enter" && onSearch()}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <Select
              value={statusFilter}
              onValueChange={(value: StatusFilterType) => onStatusFilterChange(value)}
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
                onHasReviewerFilterChange(value)
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
  );
};
