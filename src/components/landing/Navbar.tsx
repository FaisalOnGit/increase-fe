import { Button } from "@/components/ui/Button";

interface NavbarProps {
  onLoginClick: () => void;
}

export function Navbar({ onLoginClick }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-10 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <img src="/unsil.png" alt="unsil" className="h-8 w-auto" />
              <img
                src="/increaselite.png"
                alt="Increase"
                className="h-8 w-auto"
              />
              <span className="text-lg text-primary font-semibold">
                INCREASE
              </span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <a
                href="#home"
                className="text-sm hover:text-teal-600 transition-colors"
              >
                Home
              </a>
              <a
                href="#panduan"
                className="text-sm hover:text-teal-600 transition-colors"
              >
                Panduan
              </a>
              <a
                href="#faq"
                className="text-sm hover:text-teal-600 transition-colors"
              >
                FAQ
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              onClick={onLoginClick}
              className="hidden sm:inline-flex text-white"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
