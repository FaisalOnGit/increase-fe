import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

export function CTABanner() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-10">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-500 via-teal-500 to-emerald-500 p-12 md:p-16">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>

          <div className="relative grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Siap Wujudkan Ide PKM Kamu?
              </h2>
              <p className="text-xl text-white/90 leading-relaxed">
                Bergabunglah dengan mahasiswa lain dan mulai perjalanan inovasimu hari ini.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-white text-amber-600 hover:bg-gray-100 px-8 rounded-2xl"
                >
                  Mulai Upload
                  <ArrowRight className="ml-2 size-5" />
                </Button>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="relative hidden md:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGNlbGVicmF0aW5nJTIwc3VjY2Vzc3x8ZW58MXx8fHwxNzcwMjA2NDU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Students celebrating success"
                  className="w-full h-[300px] object-cover"
                />
                {/* Success Badge */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-xl">
                  <div className="text-center">
                    <div className="text-5xl mb-2">🎉</div>
                    <div className="text-lg font-bold text-gray-900">
                      Sukses PKM!
                    </div>
                    <div className="text-sm text-gray-600">
                      Lolos Seleksi
                    </div>
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
