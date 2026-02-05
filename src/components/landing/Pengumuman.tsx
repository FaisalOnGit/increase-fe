import { useState } from "react";
import { Megaphone, FileX, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

type TabType = "internal" | "dikti";

export function Pengumuman() {
  const [activeTab, setActiveTab] = useState<TabType>("internal");

  return (
    <section className="py-20 bg-gradient-to-b from-amber-50/50 to-background">
      <div className="container mx-auto px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 className="text-4xl font-bold">Pengumuman</h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Informasi terbaru seputar PKM dan jadwal penting yang perlu kamu
            ketahui
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-100 rounded-2xl p-1">
            <button
              onClick={() => setActiveTab("internal")}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === "internal"
                  ? "bg-amber-500 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Internal
            </button>
            <button
              onClick={() => setActiveTab("dikti")}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === "dikti"
                  ? "bg-amber-500 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Dikti
            </button>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-16">
          <div className="size-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <FileX className="size-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            Belum Ada Pengumuman{" "}
            {activeTab === "internal" ? "Internal" : "Dikti"}
          </h3>
          <p className="text-gray-500 text-center max-w-md">
            Pengumuman terkait PKM{" "}
            {activeTab === "internal" ? "internal universitas" : "Dikti"} akan
            ditampilkan di sini. Nantikan update terbaru!
          </p>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-amber-500 hover:bg-amber-600 text-white px-8 rounded-2xl"
          >
            Lihat Semua Pengumuman
            <ArrowRight className="ml-2 size-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
