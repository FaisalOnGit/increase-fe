import { Card } from "@/components/ui/Card";
import { Bell, Shield, BarChart3, Users } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Bell,
      title: "Tidak Perlu Bingung Deadline",
      description: "Dapatkan pengingat otomatis agar tidak melewatkan jadwal penting.",
      color: "from-amber-400 to-amber-500",
      emoji: "🔔"
    },
    {
      icon: Shield,
      title: "Upload Sekali, Aman",
      description: "Dokumen tersimpan aman di cloud dan dapat diakses kapan saja.",
      color: "from-orange-500 to-amber-500",
      emoji: "☁️"
    },
    {
      icon: BarChart3,
      title: "Pantau Status Proposal",
      description: "Lihat progres proposalmu secara real-time tanpa harus bertanya ke admin.",
      color: "from-teal-500 to-emerald-500",
      emoji: "📊"
    },
    {
      icon: Users,
      title: "Kolaborasi Tim Lebih Mudah",
      description: "Undang anggota tim dan kelola peran dalam satu platform.",
      color: "from-emerald-500 to-green-500",
      emoji: "👥"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Kenapa Pakai Platform Ini?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Semua yang kamu butuhkan untuk mengelola proposal PKM dalam satu platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="p-8 rounded-3xl border-2 hover:border-amber-200 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="space-y-6">
                {/* Icon with Gradient */}
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-10 rounded-2xl blur-xl`}></div>
                  <div className={`relative size-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-4xl`}>
                    {feature.emoji}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
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
