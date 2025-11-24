import { useState } from "react";
import UserTable from "../components/table/UserTable";
import { Breadcrumb } from "../components/layout/BreadCrumb";
import { Button } from "../components/ui/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ArrowRight } from "lucide-react";

function Laporan() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleLoadClick = () => {
    console.log("Loading data from:", startDate, "to:", endDate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto p-6 space-y-6">
        <Breadcrumb currentPage="LAPORAN" currentHref="/" />
        <div>
          <div className="text-primary font-semibold mb-2">
            Pilih Rentan Tanggal
          </div>
          <div className="flex justify-start items-center space-x-4">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              className="p-2 border rounded w-32"
              placeholderText="Select Date"
            />
            <ArrowRight className="text-gray-500" size={24} />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
              className="p-2 border rounded w-32"
              placeholderText="Select Date"
            />

            <Button variant="primary" size="md" onClick={handleLoadClick}>
              Load
            </Button>
          </div>
        </div>
        <UserTable />
      </div>
    </div>
  );
}

export default Laporan;
