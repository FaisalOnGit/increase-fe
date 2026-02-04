import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      quote: "Platform ini sangat memudahkan tim kami dalam mengelola proposal PKM-R. Kolaborasi jadi lebih terarah!",
      name: "Andi Pratama",
      university: "Universitas Indonesia",
      avatar: "👨‍🎓",
      color: "from-amber-400 to-amber-500"
    },
    {
      quote: "Deadline reminder-nya sangat membantu. Tim kami hampir lupa deadline kalau bukan karena notifikasi dari platform.",
      name: "Siti Rahayu",
      university: "Institut Teknologi Bandung",
      avatar: "👩‍🎓",
      color: "from-teal-500 to-emerald-500"
    },
    {
      quote: "Upload proposal jadi lebih mudah dan tracking statusnya real-time. Sangat recommended untuk PKM!",
      name: "Budi Santoso",
      university: "Universitas Gadjah Mada",
      avatar: "👨‍💻",
      color: "from-orange-500 to-amber-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-amber-50/30 to-background">
      <div className="container mx-auto px-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Dipercaya Mahasiswa
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ribuan mahasiswa telah mempercayakan platform kami untuk mengelola proposal PKM
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-8 rounded-3xl border-2 hover:border-amber-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="space-y-6">
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-muted-foreground leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Profile */}
                <div className="flex items-center gap-4 pt-4 border-t">
                  <div className={`size-14 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-2xl`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.university}</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
