import { ArrowRight } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Buat Akun",
      description: "Daftar dalam hitungan menit untuk mulai menggunakan platform.",
      emoji: "👤",
      color: "from-amber-400 to-amber-500"
    },
    {
      number: "02",
      title: "Upload Proposal",
      description: "Unggah dokumen proposal dengan sistem drag & drop.",
      emoji: "📤",
      color: "from-amber-500 to-orange-500"
    },
    {
      number: "03",
      title: "Review Kampus",
      description: "Proposal akan ditinjau sebelum dikirim ke tingkat nasional.",
      emoji: "📋",
      color: "from-teal-500 to-emerald-500"
    },
    {
      number: "04",
      title: "Submit Nasional",
      description: "Proposal terbaik akan diajukan ke kompetisi nasional.",
      emoji: "🚀",
      color: "from-emerald-500 to-green-500"
    },
    {
      number: "05",
      title: "Pengumuman",
      description: "Terima hasil seleksi dan bersiap menuju tahap berikutnya.",
      emoji: "🎉",
      color: "from-green-500 to-lime-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-amber-50/30">
      <div className="container mx-auto px-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Alur Pengajuan PKM
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ikuti langkah mudah untuk mengajukan proposal PKM kamu
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-amber-200 h-full">
                {/* Step Number */}
                <div className="text-5xl font-bold text-amber-100 mb-4">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="relative mb-4">
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-10 rounded-2xl blur-xl`}></div>
                  <div className={`relative size-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-3xl`}>
                    {step.emoji}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
