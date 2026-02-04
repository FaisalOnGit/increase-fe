import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, AlertTriangle, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await login(formData.email, formData.password);

    if (success) {
      navigate("/dashboard");
    } else {
      setError("Email atau password salah. Coba: admin@unsil.ac.id / admin123");
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      <div className="w-1/2 flex flex-col justify-center px-12 py-8 bg-white">
        <div className="flex items-center gap-4 mb-12">
          <img src="obslogin.png" alt="Logo" className="w-40 h-auto" />
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Login</h1>
          <p className="text-gray-500 text-sm">
            How to i get started lorem ipsum dolor at?
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong className="font-bold">Gagal!</strong>
              <span className="block sm:inline ml-1">{error}</span>
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10"
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            <LogIn className="mr-2 h-4 w-4" />
            Login Now
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500 space-y-1">
          <p>Demo Accounts:</p>
          <p>Admin: admin@unsil.ac.id / admin123</p>
          <p>Dosen: ahmad.rizki@unsil.ac.id / dosen123</p>
          <p>Mahasiswa: budi.santoso@students.unsil.ac.id / mahasiswa123</p>
        </div>
      </div>

      <div className="w-1/2 bg-primary gradient-bg flex flex-col justify-center rounded-l-[90px] items-center text-white px-12 py-8 relative overflow-hidden">
        <div className="mb-8 relative">
          <img
            src="loginbg.png"
            alt="Smart Laundry Illustration"
            className="max-w-md w-full h-auto object-contain"
          />
        </div>
        <div className="text-center max-w-md">
          <h2 className="text-3xl font-bold mb-4">
            SOLUSI DIGITAL UNTUK BISNIS
            <br />
            LAUNDRY ANDA
          </h2>
          <p className="text-blue-100 text-sm leading-relaxed mb-8">
            OPTIMALKAN OPERASIONAL DAN TINGKATKAN KEPUASAN PELANGGAN DENGAN
            SISTEM LAUNDRY OTOMATIS.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
