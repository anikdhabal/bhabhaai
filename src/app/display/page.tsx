"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Display() {
  const [datas, setDatas] = useState<
    { topic: string; question: string; answer: string }[]
  >([]);
  const [selectedTopic, setSelectedTopic] = useState("All");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/api/data");
        setDatas(response.data.slice(0, 50));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const downloadJSON = () => {
    const json = JSON.stringify(filteredDatas);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "filtered_data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredDatas =
    selectedTopic === "All"
      ? datas.map(({ topic, ...rest }) => rest)
      : datas
          .filter((data) => data.topic === selectedTopic)
          .map(({ topic, ...rest }) => rest);

  return (
    <div className="container mx-auto mt-10 mb-10">
      <div className="mb-4">
        <label className="block mb-1" htmlFor="topicSelect">
          Topics:
        </label>
        <select
          id="topicSelect"
          className="border rounded-md px-2 py-1 text-gray-700"
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
        >
          <option value="All" className="text-gray-700">
            All
          </option>
          <option value="history" className="text-gray-700">
            History
          </option>
          <option value="geography" className="text-gray-700">
            Geography
          </option>
          <option value="math" className="text-gray-700">
            Math
          </option>
          <option value="physics" className="text-gray-700">
            Physics
          </option>
        </select>
        {selectedTopic !== "All" && (
          <button
            onClick={downloadJSON}
            className="ml-4 bg-blue-500 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded"
          >
            Download JSON
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4">
        {filteredDatas.map((value, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-md">
            <div className="font-bold text-gray-700">Q.{value.question}</div>
            <div className="mt-2 text-gray-700">Ans: {value.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
