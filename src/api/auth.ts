import axios from "axios";

interface LoginFormData {
  email: string;
  password: string;
}

const dummyUsers = [
  {
    email: "admin@unsil.ac.id",
    password: "admin123",
    firstName: "Administrator",
    role: "Admin",
  },
  {
    email: "ahmad.rizki@unsil.ac.id",
    password: "dosen123",
    firstName: "Ahmad Rizki",
    role: "Dosen",
  },
  {
    email: "budi.santoso@students.unsil.ac.id",
    password: "mahasiswa123",
    firstName: "Budi Santoso",
    role: "Mahasiswa",
  },
];

export const login = async (formData: LoginFormData) => {
  // Check for dummy users first (bypass for development)
  const dummyUser = dummyUsers.find(
    (user) =>
      user.email === formData.email && user.password === formData.password
  );

  if (dummyUser) {
    sessionStorage.setItem("token", "dummy-token-" + Date.now());
    sessionStorage.setItem("firstName", dummyUser.firstName);
    sessionStorage.setItem("role", dummyUser.role);
    sessionStorage.setItem("email", dummyUser.email);

    return {
      success: true,
      token: "dummy-token",
      firstName: dummyUser.firstName,
    };
  }

  // If using real API (uncomment when ready)
  /*
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/Auth/login`,
      formData
    );

    const { token, firstName } = response.data.data;

    sessionStorage.setItem("token", token);
    sessionStorage.setItem("firstName", firstName);

    return { success: true, token, firstName };
  } catch (error) {
    return {
      success: false,
      error: "Gagal login, silahkan periksa kembali akun Anda",
    };
  }
  */

  // If no dummy user found
  return {
    success: false,
    error: "Email atau password salah. Coba: admin@unsil.ac.id / admin123",
  };
};
