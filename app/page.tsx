"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (res.ok) {
      const data = await res.json();
      setShortUrl(`${window.location.origin}/${data.slug}`);
    } else {
      alert("Error creating shortened URL");
    }
  }

  const resetUrls = () => {
    setUrl("");
    setShortUrl("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">URL Shortener</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center"
      >
        <input
          type="url"
          placeholder="Enter your URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="mt-4 md:mt-0 md:ml-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Shorten
        </button>
        {shortUrl && (
          <button
            onClick={() => resetUrls()}
            className="mt-4 md:mt-0 md:ml-4 px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          >
            Clear
          </button>
        )}
      </form>
      {shortUrl && (
        <p className="mt-6 text-lg">
          Shortened URL:{" "}
          <Link
            href={shortUrl}
            target="_blank"
            className="text-blue-600 underline"
          >
            {shortUrl}
          </Link>
        </p>
      )}
    </div>
  );
}
