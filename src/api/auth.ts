import axios from "axios";

interface LoginFormData {
  email: string;
  password: string;
}

export const login = async (formData: LoginFormData) => {
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
};
