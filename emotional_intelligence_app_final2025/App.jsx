import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const domains = [
  "Self Awareness",
  "Managing Emotions",
  "Motivating Oneself",
  "Empathy",
  "Social Skill",
];

const domainIndices = {
  "Self Awareness": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  "Managing Emotions": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
  "Motivating Oneself": [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
  "Empathy": [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
  "Social Skill": [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
};

const interpretation = (score) => {
  if (score >= 35) return "✅ This area is a strength for you.";
  if (score >= 18) return "⚠️ Focus here to grow.";
  return "🔴 Make this area a development priority.";
};

const App = () => {
  const [answers, setAnswers] = useState(Array(50).fill(1));
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (index, value) => {
    const updated = [...answers];
    updated[index] = parseInt(value);
    setAnswers(updated);
  };

  const calculateScores = () => {
    const scores = {};
    for (const domain in domainIndices) {
      scores[domain] = domainIndices[domain].reduce(
        (sum, idx) => sum + answers[idx],
        0
      );
    }
    return scores;
  };

  const exportPDF = () => {
    const input = document.getElementById("results");
    html2canvas(input).then((canvas) => {
      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(img, "PNG", 10, 10, 190, 0);
      pdf.save("EI-Results.pdf");
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Emotional Intelligence Questionnaire</h1>
      {!submitted ? (
        <div>
          {answers.map((value, index) => (
            <div key={index} className="mb-2">
              <label>Q{index + 1}:</label>
              <select
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                className="ml-2"
              >
                {[1, 2, 3, 4, 5].map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
          ))}
          <button
            onClick={() => setSubmitted(true)}
            className="mt-4 bg-purple-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      ) : (
        <div id="results">
          <h2 className="text-xl font-semibold mb-3">Your Results:</h2>
          {Object.entries(calculateScores()).map(([domain, score]) => (
            <div key={domain} className="mb-2">
              <strong>{domain}:</strong> {score} – {interpretation(score)}
            </div>
          ))}
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 mr-2 bg-gray-400 text-white px-4 py-2 rounded"
          >
            Restart
          </button>
          <button
            onClick={exportPDF}
            className="mt-4 bg-purple-700 text-white px-4 py-2 rounded"
          >
            Export PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default App;