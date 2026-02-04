import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

export function Footer() {
  const footerLinks = {
    Program: ["PKM-R", "PKM-K", "PKM-PM", "PKM-T"],
    Layanan: [
      "Upload Proposal",
      "Tracking Status",
      "Tim Kolaborasi",
      "Deadline Reminder",
    ],
    Dukungan: ["Dokumentasi", "Hubungi Kami", "Status Proposal", "FAQ"],
    Legal: ["Kebijakan Privasi", "Syarat & Ketentuan", "Cookies"],
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-10 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/increaselite.png"
                alt="Increase"
                className="h-10 w-auto"
              />
              <span className="text-xl font-semibold text-primary">
                INCREASE
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Platform Digital untuk Upload dan Kelola Proposal PKM. Membantu
              mahasiswa mengirim proposal dengan mudah, memantau status seleksi,
              dan berkolaborasi dengan tim.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="size-10 rounded-xl bg-gray-800 hover:bg-amber-500 flex items-center justify-center transition-colors"
              >
                <Facebook className="size-5" />
              </a>
              <a
                href="#"
                className="size-10 rounded-xl bg-gray-800 hover:bg-amber-500 flex items-center justify-center transition-colors"
              >
                <Twitter className="size-5" />
              </a>
              <a
                href="#"
                className="size-10 rounded-xl bg-gray-800 hover:bg-amber-500 flex items-center justify-center transition-colors"
              >
                <Instagram className="size-5" />
              </a>
              <a
                href="#"
                className="size-10 rounded-xl bg-gray-800 hover:bg-amber-500 flex items-center justify-center transition-colors"
              >
                <Mail className="size-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 Increase. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm">
            Made with ❤️ for Indonesian Students
          </p>
        </div>
      </div>
    </footer>
  );
}
