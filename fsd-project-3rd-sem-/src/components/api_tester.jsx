import { useState } from "react";
import axios from "axios";
import "./app.css";

function ApiTester() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("http://localhost:3000");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState("");

  const sendRequest = async () => {
    try {
      let data = undefined;

      if (["POST", "PUT", "PATCH"].includes(method) && body.trim() !== "") {
        data = JSON.parse(body);
      }

      const result = await axios({
        method: method,
        url: url,
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      });

      setStatus(result.status);
      setResponse(JSON.stringify(result.data, null, 2));

    } catch (error) {
      if (error.response) {
        setStatus(error.response.status);
        setResponse(JSON.stringify(error.response.data, null, 2));
      } else {
        setStatus("Error");
        setResponse(error.message);
      }
    }
  };

  return (
    <div className="api-tester">

      <h1>API Tester</h1>

      <div className="request-bar">

        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
        </select>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="http://localhost:3000/users"
        />

        <button onClick={sendRequest}>
          Send
        </button>

      </div>

      <div className="api-panels">

        <div className="request-panel">
          <h2>Request</h2>

          <h3>Body</h3>

          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={`{
  "name": "Abhinav",
  "class": "CSE-11"
}`}
          />
        </div>

        <div className="response-panel">
          <h2>Response</h2>

          <p>
            Status: <strong>{status || "Waiting..."}</strong>
          </p>

          <pre>
            {response || "Response will appear here..."}
          </pre>
        </div>

      </div>

    </div>
  );
}

export default ApiTester;