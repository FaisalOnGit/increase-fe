import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import {
  registerSchema,
  getZodErrors,
  RegisterFormValues,
} from "@/validations";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<RegisterFormValues>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterFormValues, string>>
  >({});

  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate with Zod
    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      // Format and set errors
      const formattedErrors = getZodErrors<RegisterFormValues>(result.error);
      setErrors(formattedErrors);
      return;
    }

    setErrors({});

    console.log("Register attempt with:", formData);
    // For now, redirect to login
    navigate("/login");
  };

  const updateField = (
    field: keyof RegisterFormValues,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex relative bg-gradient-to-br from-teal-500 via-emerald-500 to-green-500 p-12 items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-lg">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <img
                src="/increaselite.png"
                alt="Increase"
                className="h-10 w-auto"
              />
              <span className="text-xl font-semibold text-white">Increase</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Bergabung Bersama Kami
            </h1>
            <p className="text-white/80 text-lg">
              Daftar sekarang dan mulai perjalanan PKM kamu
            </p>
          </div>

          {/* Illustration Area */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGNlbGVicmF0aW5nJTIwc3VjY2Vzc3x8ZW58MXx8fHwxNzcwMjA2NDU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Students celebrating success"
              className="w-full h-[400px] object-cover"
            />
            {/* Floating Elements */}
            <div className="absolute top-8 right-8 bg-white p-4 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🎉</div>
                <div>
                  <div className="text-sm font-semibold">Bergabunglah</div>
                  <div className="text-xs text-muted-foreground">
                    1.200+ Mahasiswa
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <button
            onClick={handleBackToHome}
            className="mb-8 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
          >
            ← Kembali ke Home
          </button>

          <Card className="p-8 shadow-xl border-2 rounded-3xl">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <UserPlus className="size-6 text-teal-600" />
                <h2 className="text-3xl font-bold">Daftar Akun</h2>
              </div>
              <p className="text-muted-foreground">
                Buat akun untuk mulai upload proposal PKM
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              {/* Full Name Field */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Nama Lengkap</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  value={formData.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  className="h-12 rounded-xl"
                  required
                />
                {errors.fullName && (
                  <p className="text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@universitas.ac.id"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="h-12 rounded-xl"
                  required
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimal 8 karakter, 1 huruf kapital, 1 angka"
                    value={formData.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    className="h-12 rounded-xl pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Ulangi password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      updateField("confirmPassword", e.target.value)
                    }
                    className="h-12 rounded-xl pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) =>
                      updateField("agreeTerms", checked as boolean)
                    }
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm cursor-pointer leading-tight"
                  >
                    Saya menyetujui{" "}
                    <a
                      href="#"
                      className="text-teal-600 hover:text-teal-700 font-semibold"
                    >
                      Syarat & Ketentuan
                    </a>{" "}
                    dan{" "}
                    <a
                      href="#"
                      className="text-teal-600 hover:text-teal-700 font-semibold"
                    >
                      Kebijakan Privasi
                    </a>
                  </label>
                </div>
                {errors.agreeTerms && (
                  <p className="text-sm text-red-600">{errors.agreeTerms}</p>
                )}
              </div>

              {/* Register Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white rounded-xl"
              >
                Daftar Sekarang
              </Button>
            </form>

            {/* Login Link */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Sudah punya akun?{" "}
              <button
                onClick={handleGoToLogin}
                className="text-teal-600 hover:text-teal-700 font-semibold transition-colors"
              >
                Login
              </button>
            </p>
          </Card>

          {/* Help Text */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            Dengan mendaftar, kamu dapat mengakses semua fitur platform PKM
          </p>
        </div>
      </div>
    </div>
  );
}
