import { useState } from "react";
import axios from "axios";
import "./app.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [id, setId] = useState("");

  const [response, setResponse] = useState("");

  // ================= SIGNUP / POST =================

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        "http://localhost:3000/signup",
        {
          name: name,
          email: email,
          password: password,
        }
      );

      setResponse(JSON.stringify(result.data, null, 2));

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error.response) {
        setResponse(
          JSON.stringify(error.response.data, null, 2)
        );
      } else {
        setResponse("Server not connected");
      }
    }
  };


  // ================= GET =================

  const handleGet = async () => {
    try {
      const result = await axios.get(
        "http://localhost:3000/user"
      );

      setResponse(
        JSON.stringify(result.data, null, 2)
      );
    } catch (error) {
      setResponse("Error while getting users");
    }
  };


  // ================= PUT =================

  const handlePut = async () => {

    if (!id || !name || !email) {
      setResponse("Enter ID, name and email");
      return;
    }

    try {
      const result = await axios.put(
        `http://localhost:3000/edit/${id}`,
        {
          name: name,
          email: email,
        }
      );

      setResponse(
        JSON.stringify(result.data, null, 2)
      );

    } catch (error) {
      if (error.response) {
        setResponse(
          JSON.stringify(error.response.data, null, 2)
        );
      } else {
        setResponse("Server not connected");
      }
    }
  };


  // ================= DELETE =================

  const handleDelete = async () => {

    if (!id) {
      setResponse("Enter User ID");
      return;
    }

    try {
      const result = await axios.delete(
        `http://localhost:3000/delete/${id}`
      );

      setResponse(
        JSON.stringify(result.data, null, 2)
      );

    } catch (error) {
      if (error.response) {
        setResponse(
          JSON.stringify(error.response.data, null, 2)
        );
      } else {
        setResponse("Server not connected");
      }
    }
  };


  return (
    <div>
    <div className="signup">

      <h1>API Operations</h1>


      {/* ================= SIGNUP ================= */}

      <h2>Signup</h2>

      <form onSubmit={handleSignup}>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          POST / Signup
        </button>

      </form>


      {/* ================= ID ================= */}

      <input
        type="number"
        placeholder="Enter User ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />


      {/* ================= BUTTONS ================= */}

      <div>

        <button onClick={handleGet}>
          GET Users
        </button>

        <button onClick={handlePut}>
          PUT User
        </button>

        <button onClick={handleDelete}>
          DELETE User
        </button>

      </div>


      {/* ================= RESPONSE ================= */}

      <h2>Response</h2>

      <pre>
        {response || "Response will appear here..."}
      </pre>

    </div>
    </div>
  );
}

export default Signup;