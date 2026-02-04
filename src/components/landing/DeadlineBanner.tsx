import { Button } from "@/components/ui/button";
import { Clock, ArrowRight } from "lucide-react";

export function DeadlineBanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500">
      <div className="container mx-auto px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6 text-white">
            <div className="size-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Clock className="size-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Jangan Lewatkan Deadline PKM!
              </h2>
              <p className="text-white/90 text-lg">
                Pantau hitung mundur menuju batas akhir pengumpulan proposal dan segera kirim karyamu.
              </p>
            </div>
          </div>

          <Button
            size="lg"
            className="bg-white text-red-600 hover:bg-gray-100 px-8 rounded-2xl whitespace-nowrap"
          >
            Mulai Sekarang
            <ArrowRight className="ml-2 size-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
