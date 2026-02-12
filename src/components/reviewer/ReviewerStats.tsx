import { Card, CardContent } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { ReviewerProposal } from "@/types/api.types";

export interface ReviewerStatsProps {
  proposals: ReviewerProposal[];
}

export const ReviewerStats: React.FC<ReviewerStatsProps> = ({ proposals }) => {
  return (
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
  );
};
