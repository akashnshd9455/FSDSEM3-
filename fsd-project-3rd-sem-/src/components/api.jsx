import { useState } from "react";
import "./api.css";

function Api() {
    const [method, setMethod] = useState("GET");
    const [url, setUrl] = useState("http://localhost:3000/user");
    const [body, setBody] = useState('{\n  "name": "Dell Inspiron",\n  "brand": "Dell",\n  "price": 55000\n}');
    const [headers, setHeaders] = useState('{\n  "Content-Type": "application/json"\n}');
    const [response, setResponse] = useState("");
    const [status, setStatus] = useState("");
    const [time, setTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("body");
    const [history, setHistory] = useState([]);

    const sendRequest = async () => {
        const startTime = Date.now();
        setLoading(true);

        try {
            const parsedHeaders = headers.trim() ? JSON.parse(headers) : {};
            const options = {
                method: method,
                headers: parsedHeaders
            };

            if (method !== "GET" && method !== "DELETE" && body) {
                options.body = body;
            }

            const res = await fetch(url, options);
            const contentType = res.headers.get("content-type") || "";
            const data = contentType.includes("application/json")
                ? await res.json()
                : await res.text();
            const formattedResponse = typeof data === "string"
                ? data
                : JSON.stringify(data, null, 2);
            const elapsed = `${Date.now() - startTime} ms`;

            setStatus(`${res.status} ${res.statusText}`);
            setResponse(formattedResponse);
            setTime(elapsed);
            setHistory((current) => [
                { method, url, status: res.status, time: elapsed },
                ...current.filter((item) => item.url !== url || item.method !== method)
            ].slice(0, 5));
        } catch (error) {
            setStatus("Request failed");
            setResponse(error.message);
            setTime("");
        } finally {
            setLoading(false);
        }
    };

    const loadExample = (exampleUrl, exampleMethod = "GET") => {
        setUrl(exampleUrl);
        setMethod(exampleMethod);
        setResponse("");
        setStatus("");
        setTime("");
    };

    return (
        <main className="api-shell">
            <nav className="topbar">
                <div className="brand-mark">/</div>
                <div><p className="eyebrow">Developer tools</p><p className="brand-name">requestly</p></div>
                <span className="workspace-badge">LOCAL WORKSPACE</span>
                <button className="icon-button" aria-label="Settings">•••</button>
            </nav>

            <section className="intro">
                <div><p className="eyebrow accent">API EXPLORER / 01</p><h1>Make the request.<br /><em>See what answers.</em></h1><p className="intro-copy">A focused workspace for inspecting and testing your endpoints.</p></div>
                <div className="intro-note"><span className="pulse-dot" /> Ready to send requests</div>
            </section>

            <div className="workspace-grid">
                <aside className="sidebar">
                    <div className="sidebar-heading"><span>COLLECTIONS</span><button aria-label="Add collection">+</button></div>
                    <button className="collection-item active"><span className="folder-icon">▱</span> Laptop Catalog <span className="count">3</span></button>
                    <button className="collection-item" onClick={() => loadExample("https://jsonplaceholder.typicode.com/posts/1")}><span className="folder-icon">▱</span> Public examples <span className="count">1</span></button>
                    <div className="sidebar-heading history-title"><span>RECENT</span></div>
                    {history.length === 0 && <p className="empty-history">Your sent requests<br />will appear here.</p>}
                    {history.map((item) => <button className="history-item" key={`${item.method}-${item.url}`} onClick={() => loadExample(item.url, item.method)}><span className={`method-dot ${item.method.toLowerCase()}`}>{item.method}</span><span className="history-url">{item.url.replace(/^https?:\/\//, "")}</span></button>)}
                </aside>

                <section className="main-panel">
                    <div className="request-card">
                        <div className="section-label"><span>01</span> REQUEST</div>
                        <div className="request-row">
                            <select className={`method-select ${method.toLowerCase()}`} value={method} onChange={(e) => setMethod(e.target.value)}><option>GET</option><option>POST</option><option>PUT</option><option>DELETE</option></select>
                            <input className="url-input" type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://api.example.com/resource" />
                            <button className="send-button" onClick={sendRequest} disabled={loading}>{loading ? "Sending..." : "Send  ↗"}</button>
                        </div>
                        <div className="request-tabs">
                            <button className={activeTab === "params" ? "selected" : ""} onClick={() => setActiveTab("params")}>Params <span>0</span></button>
                            <button className={activeTab === "headers" ? "selected" : ""} onClick={() => setActiveTab("headers")}>Headers <span>1</span></button>
                            <button className={activeTab === "body" ? "selected" : ""} onClick={() => setActiveTab("body")}>Body <span>{method === "GET" || method === "DELETE" ? "-" : "JSON"}</span></button>
                        </div>
                        {activeTab === "body" && method !== "GET" && method !== "DELETE" && <textarea className="code-editor" value={body} onChange={(e) => setBody(e.target.value)} spellCheck="false" />}
                        {activeTab === "headers" && <textarea className="code-editor short" value={headers} onChange={(e) => setHeaders(e.target.value)} spellCheck="false" />}
                        {activeTab === "params" && <div className="empty-tab">No query parameters added</div>}
                    </div>

                    <div className="response-card">
                        <div className="response-heading"><div className="section-label"><span>02</span> RESPONSE</div><div className="response-meta"><span className={status.startsWith("2") ? "success" : status ? "failure" : "muted"}>{status || "Not sent"}</span><span>{time || "-"}</span></div></div>
                        <pre className={`response-view ${!response ? "placeholder" : ""}`}>{response || "// Your response will appear here\n// Send a request to inspect the payload"}</pre>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Api;