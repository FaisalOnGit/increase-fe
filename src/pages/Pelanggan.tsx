import UserTable from "../components/table/UserTable";
import { Breadcrumb } from "../components/layout/BreadCrumb";
import { Button } from "../components/ui/Button";

function Table() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto p-6 space-y-6">
        <Breadcrumb currentPage="CUSTOMER" currentHref="/" />

        {/* Button Add New */}
        <div className="flex justify-end">
          <Button variant="primary" size="md">
            Add New +
          </Button>
        </div>

        {/* User Table */}
        <UserTable />
      </div>
    </div>
  );
}

export default Table;
