import { useState } from "react";
import { api } from "../services/api";

export default function Home() {
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(
        e: React.SubmitEvent<HTMLFormElement>
    ) {
        e.preventDefault();
        try {
            setLoading(true);

            const response = await api.post("/api/v1/urls", {
                originalUrl: url,
            });


            setShortUrl(response.data.shortUrl);
        } catch (error) {
            console.error("Failed to shorten URL:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container">
            <div className="card">
                <h1 className="title">URL Shortener</h1>

                <p className="subtitle">
                    Convert long URLs into short, shareable links.
                </p>

                <form
                    className="form"
                    onSubmit={handleSubmit}
                >
                    <input
                        className="input"
                        type="text"
                        placeholder="Paste your long URL..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />

                    <button
                        className="button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Shorten"}
                    </button>
                </form>

                {shortUrl && (
                    <div className="result">
                        <span>Your short URL</span>

                        <div className="resultRow">
                            <a
                                href={shortUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {shortUrl}
                            </a>

                            <button
                                onClick={() =>
                                    navigator.clipboard.writeText(shortUrl)
                                }
                            >
                                Copy
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}