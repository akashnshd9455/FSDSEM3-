import { useState } from "react";

 function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Email and password are required");
      setIsError(true);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsError(false);
        setMessage(data.message || "Login successful");
      } else {
        setIsError(true);
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      setIsError(true);
      setMessage("Could not reach server: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <form
        onSubmit={handleSubmit}
        style={{ width: "100%", maxWidth: "380px", background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "35px" }}
      >
        <h1 style={{ fontSize: "28px", marginBottom: "6px", color: "#1e293b" }}>Login</h1>
        <p style={{ color: "#64748b", fontSize: "15px", marginBottom: "28px" }}>
          Sign in to continue
        </p>

        <label style={{ display: "block", fontSize: "14px", color: "#334155", marginBottom: "6px" }}>
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          style={{ width: "100%", height: "48px", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "0 14px", fontSize: "15px", outline: "none", marginBottom: "18px", boxSizing: "border-box" }}
        />

        <label style={{ display: "block", fontSize: "14px", color: "#334155", marginBottom: "6px" }}>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          style={{ width: "100%", height: "48px", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "0 14px", fontSize: "15px", outline: "none", marginBottom: "22px", boxSizing: "border-box" }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", height: "48px", border: "none", borderRadius: "8px", background: "#64748b", color: "white", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {message && (
          <p style={{ marginTop: "16px", fontSize: "14px", color: isError ? "#dc2626" : "#16a34a", textAlign: "center" }}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
export default Login;