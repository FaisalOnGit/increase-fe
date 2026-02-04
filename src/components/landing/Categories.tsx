import { Card } from "@/components/ui/Card";
import { FlaskConical, Briefcase, HeartHandshake, Cpu, Lightbulb, FileText, PenTool } from "lucide-react";

export function Categories() {
  const categories = [
    {
      name: "PKM-R (Riset)",
      description: "Penelitian dalam berbagai disiplin ilmu",
      icon: FlaskConical,
      emoji: "🔬",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "PKM-K (Kewirausahaan)",
      description: "Pengembangan bisnis dan kewirausahaan",
      icon: Briefcase,
      emoji: "💼",
      color: "from-amber-500 to-orange-500"
    },
    {
      name: "PKM-PM (Pengabdian)",
      description: "Pengabdian kepada masyarakat",
      icon: HeartHandshake,
      emoji: "🤝",
      color: "from-pink-500 to-rose-500"
    },
    {
      name: "PKM-T (Teknologi)",
      description: "Pengembangan teknologi terapan",
      icon: Cpu,
      emoji: "⚙️",
      color: "from-purple-500 to-violet-500"
    },
    {
      name: "PKM-KC (Karsa Cipta)",
      description: "Kreativitas dan penemuan baru",
      icon: Lightbulb,
      emoji: "💡",
      color: "from-yellow-500 to-amber-500"
    },
    {
      name: "PKM-AI (Artikel)",
      description: "Artikel ilmiah terindex",
      icon: FileText,
      emoji: "📄",
      color: "from-teal-500 to-emerald-500"
    },
    {
      name: "PKM-GT (Gagasan)",
      description: "Gagasan tertulis yang inovatif",
      icon: PenTool,
      emoji: "✍️",
      color: "from-indigo-500 to-blue-500"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Kategori PKM
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Pilih kategori PKM yang sesuai dengan ide inovasimu
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="p-6 rounded-2xl border-2 hover:border-amber-200 hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="space-y-4">
                {/* Icon with Gradient */}
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 rounded-xl blur-xl`}></div>
                  <div className={`relative size-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-3xl`}>
                    {category.emoji}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
