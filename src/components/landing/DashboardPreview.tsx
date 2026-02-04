import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { CheckCircle, FileText, MessageCircle, Bell } from "lucide-react";

export function DashboardPreview() {
  const floatingElements = [
    { icon: Bell, label: "3 Notifikasi", color: "bg-amber-100 text-amber-600", position: "top-8 -left-4" },
    { icon: FileText, label: "5 Proposal", color: "bg-teal-100 text-teal-600", position: "top-1/4 -right-4" },
    { icon: MessageCircle, label: "2 Feedback", color: "bg-orange-100 text-orange-600", position: "bottom-1/4 -left-4" },
    { icon: CheckCircle, label: "1 Diterima", color: "bg-emerald-100 text-emerald-600", position: "bottom-8 -right-4" }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Dashboard Monitoring Proposal
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Pantau progres proposal inovasi dan bisnismu secara real-time
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main Dashboard Mockup */}
          <div className="relative">
            {/* Laptop Frame */}
            <div className="bg-gray-800 rounded-t-3xl p-3 shadow-2xl">
              <div className="bg-gray-900 rounded-t-2xl p-2">
                <div className="flex gap-2 mb-3">
                  <div className="size-3 rounded-full bg-red-500"></div>
                  <div className="size-3 rounded-full bg-yellow-500"></div>
                  <div className="size-3 rounded-full bg-green-500"></div>
                </div>
                <div className="bg-white rounded-xl overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBkYXNoYm9hcmQlMjBhbmFseXRpY3MlMjBtb2Rlcn58ZW58MXx8fHwxNzcwMjAwNDgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Dashboard Interface"
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-800 h-6 rounded-b-3xl shadow-2xl"></div>

            {/* Floating Elements */}
            {floatingElements.map((element, index) => (
              <div
                key={index}
                className={`hidden lg:flex absolute ${element.position} items-center gap-3 ${element.color} px-4 py-3 rounded-2xl shadow-lg animate-in fade-in duration-500`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <element.icon className="size-5" />
                <span className="text-sm font-semibold whitespace-nowrap">{element.label}</span>
              </div>
            ))}
          </div>

          {/* Background Gradient */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-200/20 via-teal-200/20 to-emerald-200/20 blur-3xl"></div>
        </div>

        {/* Feature Highlights Below */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="size-12 rounded-xl bg-amber-100 flex items-center justify-center text-2xl mx-auto mb-4">
              📊
            </div>
            <h4 className="font-semibold mb-2">Monitoring Real-time</h4>
            <p className="text-sm text-muted-foreground">Lihat status proposal secara langsung</p>
          </div>
          <div className="text-center">
            <div className="size-12 rounded-xl bg-teal-100 flex items-center justify-center text-2xl mx-auto mb-4">
              💬
            </div>
            <h4 className="font-semibold mb-2">Feedback Mentor</h4>
            <p className="text-sm text-muted-foreground">Dapat masukan langsung dari mentor</p>
          </div>
          <div className="text-center">
            <div className="size-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl mx-auto mb-4">
              📱
            </div>
            <h4 className="font-semibold mb-2">Akses Mobile</h4>
            <p className="text-sm text-muted-foreground">Monitor dari perangkat apapun</p>
          </div>
        </div>
      </div>
    </section>
  );
}
