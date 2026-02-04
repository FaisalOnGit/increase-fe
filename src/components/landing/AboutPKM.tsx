import { Card } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export function AboutPKM() {
  const highlights = [
    "Diselenggarakan sejak 2001",
    "Kompetisi tingkat nasional",
    "Peluang menuju PIMNAS",
    "Mendorong inovasi dan kreativitas mahasiswa"
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-amber-50/30 to-background">
      <div className="container mx-auto px-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm mb-6">
              <BookOpen className="size-4" />
              <span>Tentang PKM</span>
            </div>
            <h2 className="text-4xl font-bold mb-6">
              Apa itu PKM?
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Program Kreativitas Mahasiswa (PKM) adalah program nasional dari Kemendikbud yang mendorong mahasiswa mengembangkan ide inovatif dalam penelitian, kewirausahaan, pengabdian masyarakat, hingga teknologi.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {highlights.map((highlight, index) => (
              <Card key={index} className="p-6 rounded-2xl border-2 border-amber-100 bg-white">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 font-bold">
                    {index + 1}
                  </div>
                  <span className="font-medium">{highlight}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
