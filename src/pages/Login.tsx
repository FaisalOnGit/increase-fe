import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { useAuth } from "@/contexts/AuthContext";
import { loginSchema, getZodErrors, LoginFormValues } from "@/validations";
import { toastSuccess, toastError } from "@/lib/toast";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginFormValues>({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginFormValues, string>>
  >({});

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationResult = loginSchema.safeParse(formData);

    if (!validationResult.success) {
      const formattedErrors = getZodErrors<LoginFormValues>(
        validationResult.error,
      );
      setErrors(formattedErrors);
      toastError("Mohon periksa kembali input Anda");
      return;
    }

    setErrors({});

    const loginResult = await login(formData.email, formData.password);

    if (loginResult.success) {
      toastSuccess(loginResult.message);
      navigate("/dashboard");
    } else {
      toastError(loginResult.message);
    }
  };

  const updateField = (field: keyof LoginFormValues, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex relative bg-gradient-to-br from-amber-500 via-teal-500 to-emerald-500 p-12 items-center justify-center overflow-hidden">
        {/* Back Button */}
        <Link
          to="/"
          className="absolute left-8 top-8 z-50 text-sm text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full transition-colors flex items-center gap-2 cursor-pointer"
        >
          ← Kembali ke Home
        </Link>

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
              <img src="/unsil.png" alt="Increase" className="h-10 w-auto" />
              <img
                src="/increaselite.png"
                alt="Increase"
                className="h-10 w-auto"
              />
              <span className="text-xl font-semibold text-white">INCREASE</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Welcome Back</h1>
            <p className="text-white/80 text-lg">
              Login untuk melanjutkan upload proposal PKM
            </p>
          </div>

          {/* Illustration Area */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <ImageWithFallback
              src="/iot.jpg"
              alt="Student working on laptop"
              className="w-full h-[400px] object-cover"
            />

            <div className="absolute top-8 right-8 bg-white p-4 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3">
                <div className="text-3xl">☁️</div>
                <div>
                  <div className="text-sm font-semibold">Cloud Upload</div>
                  <div className="text-xs text-muted-foreground">
                    Aman & Cepat
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center p-8 bg-gray-50 relative">
        {/* Back Button for Mobile */}
        <Link
          to="/"
          className="lg:hidden absolute left-4 top-4 z-50 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 cursor-pointer"
        >
          ← Kembali
        </Link>

        <div className="w-full max-w-md">
          <Card className="p-8 shadow-xl border-2 rounded-3xl">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-center">Login</h2>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
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
                    placeholder="Masukkan password"
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

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                  />
                  <label htmlFor="remember" className="text-sm cursor-pointer">
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm text-amber-600 hover:text-amber-700 transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white rounded-xl"
              >
                Login
              </Button>
            </form>
          </Card>

          {/* Help Text */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            Dengan login, kamu menyetujui{" "}
            <a href="#" className="text-amber-600 hover:underline">
              Syarat & Ketentuan
            </a>{" "}
            dan{" "}
            <a href="#" className="text-amber-600 hover:underline">
              Kebijakan Privasi
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
