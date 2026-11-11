import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { validateForm, isRequired, minLength, isEmail, hasErrors } from "../utils/validators";

const RULES = {
  email:    [isRequired, isEmail],
  password: [isRequired, minLength(6)],
};

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm]     = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    const errs = validateForm(form, RULES);
    if (hasErrors(errs)) { setErrors(errs); return; }

    const result = await login(form.email, form.password);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setServerError(result.error ?? "Login failed.");
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-slate-800 mb-1">Welcome back</h1>
      <p className="text-sm text-slate-500 mb-6">Sign in to your FinanceAI account</p>

      {serverError && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          id="login-email"
          label="Email Address"
          type="email"
          required
          placeholder="you@example.com"
          autoComplete="email"
          value={form.email}
          onChange={set("email")}
          error={errors.email}
        />
        <Input
          id="login-password"
          label="Password"
          type="password"
          required
          placeholder="••••••••"
          autoComplete="current-password"
          value={form.password}
          onChange={set("password")}
          error={errors.password}
        />

        <Button type="submit" fullWidth loading={isLoading}>
          Sign In
        </Button>
      </form>

      <div className="mt-5 text-center">
        <p className="text-sm text-slate-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium hover:underline">
            Create one
          </Link>
        </p>
      </div>

      {/* Demo hint */}
      <div className="mt-5 p-3 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-700">
        <strong>Demo mode:</strong> Enter any email and a password of 6+ characters to continue.
      </div>
    </>
  );
}
