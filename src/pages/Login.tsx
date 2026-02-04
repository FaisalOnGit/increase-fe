import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const success = await login(email, password);

    if (success) {
      navigate("/dashboard");
    } else {
      setError("Email atau password salah. Coba: admin@unsil.ac.id / admin123");
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleGoToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex relative bg-gradient-to-br from-amber-500 via-teal-500 to-emerald-500 p-12 items-center justify-center overflow-hidden">
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
              <span className="text-xl font-semibold text-white ">
                INCREASE
              </span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Welcome Back</h1>
            <p className="text-white/80 text-lg">
              Login untuk melanjutkan upload proposal PKM
            </p>
          </div>

          {/* Illustration Area */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwd29ya2luZyUyMG9uJTIwbGFwdG9wJTIwd2l0aCUyMGRvY3VtZW50c3x8ZW58MXx8fHwxNzcwMjA2NDg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Student working on laptop"
              className="w-full h-[400px] object-cover"
            />
            {/* Floating Elements */}
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
            <div>
              <h2 className="text-3xl font-bold mb-2 text-center">Login</h2>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@universitas.ac.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-muted-foreground">
                    OR
                  </span>
                </div>
              </div>

              {/* Google Login */}
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 rounded-xl border-2"
              >
                <svg className="size-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Login with Google
              </Button>
            </form>

            {/* Register Link */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Belum punya akun?{" "}
              <button
                onClick={handleGoToRegister}
                className="text-amber-600 hover:text-amber-700 font-semibold transition-colors"
              >
                Daftar
              </button>
            </p>
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
