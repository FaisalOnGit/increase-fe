import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

export function Hero() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-amber-50/50 to-background">
      <div className="container mx-auto px-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm">
              <Sparkles className="size-4" />
              <span>PKM Proposal Platform</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Satu Tempat untuk Submit, Monitor, dan{" "}
              <span className="bg-gradient-to-r from-amber-500 to-teal-500 bg-clip-text text-transparent">
                Sukses di PKM
              </span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Dirancang untuk membantu mahasiswa mengirim proposal PKM dengan mudah, memantau status seleksi, dan berkolaborasi dengan tim secara efisien.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-white px-8 rounded-2xl"
              >
                Upload Proposal
                <ArrowRight className="ml-2 size-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl px-8"
              >
                Lihat Panduan
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div>
                <div className="text-3xl font-bold text-amber-500">1.200+</div>
                <div className="text-sm text-muted-foreground">Proposal Dikelola</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-500">300+</div>
                <div className="text-sm text-muted-foreground">Tim Mahasiswa</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-500">45+</div>
                <div className="text-sm text-muted-foreground">Lolos Pendanaan</div>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-teal-400/20 rounded-3xl blur-3xl"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGNvbGxhYm9yYXRpbmclMjB3aXRoJTIwbGFwdG9wcyUyMHdvcmtpbmclMmp9Z2VzfGVufDF8fHx8MTc3MDIwNjQzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Students collaborating"
                className="w-full h-[500px] object-cover"
              />
              {/* Floating Elements */}
              <div className="absolute top-8 right-8 bg-white p-4 rounded-2xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-teal-100 flex items-center justify-center">
                    <span className="text-xl">☁️</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Upload Success</div>
                    <div className="text-xs text-muted-foreground">3 Dokumen</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 left-8 bg-white p-4 rounded-2xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-amber-100 flex items-center justify-center">
                    <span className="text-xl">✓</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Review Selesai</div>
                    <div className="text-xs text-muted-foreground">Siap Submit</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
