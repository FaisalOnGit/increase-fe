import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumb } from "@/components/layout/BreadCrumb";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useProposal, useEligibility } from "../../hooks/useProposal";
import { CreateProposalData, MahasiswaProposal } from "../../types/api.types";
import { toastSuccess, toastError } from "@/lib/toast";
import { ProposalFormModal } from "@/components/mahasiswa/ProposalFormModal";
import { ProposalTable } from "@/components/proposal/ProposalTable";

export const ProposalSubmission = () => {
  const {
    proposals,
    loading: proposalsLoading,
    fetchProposals,
    submitProposal,
    editProposal,
    removeProposal,
  } = useProposal();

  const {
    eligibility,
    eligible,
    eligibleMessage,
    loading: eligibilityLoading,
  } = useEligibility();

  const [showForm, setShowForm] = useState(false);
  const [editingProposal, setEditingProposal] =
    useState<MahasiswaProposal | null>(null);

  const [filters, setFilters] = useState({
    status: "",
    role: "",
    tahun: new Date().getFullYear(),
  });

  useEffect(() => {
    fetchProposals();
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    fetchProposals({ ...filters, [key]: value });
  };

  const handleSubmit = async (data: CreateProposalData) => {
    const result = await submitProposal(data);
    if (result.success) {
      toastSuccess("Proposal submitted successfully!");
      setShowForm(false);
      setEditingProposal(null);
    } else {
      toastError(result.message || "Failed to submit proposal");
    }
    return result;
  };

  const handleEdit = async (id: number, data: Partial<CreateProposalData>) => {
    const result = await editProposal(id, data);
    if (result.success) {
      toastSuccess("Proposal updated successfully!");
      setShowForm(false);
      setEditingProposal(null);
    } else {
      toastError(result.message || "Failed to update proposal");
    }
    return result;
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this proposal?")) return;

    const result = await removeProposal(id);
    if (result.success) {
      toastSuccess("Proposal deleted successfully!");
    } else {
      toastError(result.message || "Failed to delete proposal");
    }
  };

  const openEditForm = (proposal: MahasiswaProposal) => {
    setEditingProposal(proposal);
    setShowForm(true);
  };

  if (eligibilityLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div>
        <Breadcrumb
          pages={[
            { name: "Dashboard", href: "/dashboard" },
            { name: "Mahasiswa", href: "/dashboard/mahasiswa" },
            {
              name: "Pengajuan Proposal",
              href: "/dashboard/mahasiswa/pengajuan-proposal",
            },
          ]}
        />
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Pengajuan Proposal</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola pengajuan proposal PKM Anda
          </p>
        </div>
        {eligible && (
          <Button
            onClick={() => {
              setEditingProposal(null);
              setShowForm(true);
            }}
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Ajukan Proposal
          </Button>
        )}
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
                  {proposals.filter((p) => p.status === "pending").length}
                </p>
                <p className="text-xs text-muted-foreground">Pending</p>
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
              <div className="p-2 bg-red-100 rounded-lg">
                <Icon name="XCircle" size={20} className="text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {proposals.filter((p) => p.status === "ditolak").length}
                </p>
                <p className="text-xs text-muted-foreground">Ditolak</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Eligibility Alert */}
      {!eligible && eligibility && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex">
              <Icon
                name="AlertTriangle"
                className="text-yellow-600 mr-3"
                size={20}
              />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-yellow-800">
                  {eligibleMessage ||
                    "Anda belum memenuhi syarat untuk mengajukan proposal"}
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <ul className="list-disc list-inside space-y-1">
                    {!eligibility.has_active_kalender && (
                      <li>Tidak ada kalender PKM yang aktif</li>
                    )}
                    {!eligibility.is_pengajuan_open && (
                      <li>Periode pengajuan belum dibuka</li>
                    )}
                    {eligibility.already_ketua && (
                      <li>Anda sudah menjadi ketua di proposal lain</li>
                    )}
                    {eligibility.already_anggota && (
                      <li>Anda sudah menjadi anggota di proposal lain</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="w-full border border-input rounded-md px-3 py-2 focus:ring-2 focus:ring-ring focus:border-ring"
              >
                <option value="">Semua</option>
                <option value="pending">Pending</option>
                <option value="disetujui">Disetujui</option>
                <option value="ditolak">Ditolak</option>
                <option value="revisi">Revisi</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Peran</label>
              <select
                value={filters.role}
                onChange={(e) => handleFilterChange("role", e.target.value)}
                className="w-full border border-input rounded-md px-3 py-2 focus:ring-2 focus:ring-ring focus:border-ring"
              >
                <option value="">Semua</option>
                <option value="ketua">Ketua</option>
                <option value="anggota">Anggota</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tahun</label>
              <Input
                type="number"
                value={filters.tahun}
                onChange={(e) => handleFilterChange("tahun", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Proposal Form Modal */}
      <ProposalFormModal
        isOpen={showForm}
        editingProposal={editingProposal}
        onClose={() => {
          setShowForm(false);
          setEditingProposal(null);
        }}
        onSubmit={handleSubmit}
        onEdit={handleEdit}
        loading={proposalsLoading}
      />

      {/* Proposals List */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Proposal PKM</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ProposalTable
            proposals={proposals}
            loading={proposalsLoading}
            onEdit={openEditForm}
            onDelete={handleDelete}
            emptyMessage="Belum ada proposal yang diajukan"
          />
        </CardContent>
      </Card>
    </div>
  );
};
