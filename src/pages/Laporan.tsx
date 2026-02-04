import { useState } from "react";
import UserTable from "@/components/table/UserTable";
import { Breadcrumb } from "@/components/layout/BreadCrumb";
import { Button } from "@/components/ui/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Label } from "@/components/ui/label";

function Laporan() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleLoadClick = () => {
    console.log("Loading data from:", startDate, "to:", endDate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto p-6 space-y-6">
        <Breadcrumb
          pages={[
            { name: "Dashboard", href: "/dashboard" },
            { name: "LAPORAN", href: "/laporan" },
          ]}
        />
        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label className="text-primary font-semibold mb-2">
                Pilih Rentang Tanggal
              </Label>
              <div className="flex justify-start items-center gap-4">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className="flex h-10 w-32 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholderText="Select Date"
                />
                <ArrowRight className="text-muted-foreground" size={20} />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className="flex h-10 w-32 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholderText="Select Date"
                />

                <Button onClick={handleLoadClick}>
                  Load
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <UserTable />
      </div>
    </div>
  );
}

export default Laporan;
