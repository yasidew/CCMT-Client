import React, { useState } from "react";
import axios from "axios";
import img1 from "../img/blueimg.jpeg";
import ReportComponent from "./ReportComponent";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function TryCatchCalculator() {
  const [code, setCode] = useState("");
  const [complexity, setComplexity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    setIsLoading(true);
    setError(null);

    axios
      .post("http://localhost:8080/calculate-complexity-recursion", { code })
      .then((response) => {
        setComplexity(response.data);
      })
      .catch((error) => {
        setError(
          "Error calculating complexity. Please check your input and try again."
        );
        console.error("Error calculating complexity:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="container">
      <img
        src={img1}
        alt="complexity"
        width="100%"
        height="100%"
        className="background-image"
      />
      <div className="content">
        <div className="CCMTcontainer">
          <button
            className="btncal"
            onClick={() => (window.location.href = "/")}
          >
            Home
          </button>
        </div>
        <h1 style={{ color: "white" }}>Code Complexity Calculator</h1>
        <textarea
          rows="10"
          cols="50"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your code here"
        ></textarea>
        <br />
        <button
          className="btncomplexity"
          onClick={handleCalculate}
          disabled={isLoading}
        >
          {isLoading ? "Calculating..." : "Calculate Complexity"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {complexity !== null && <p>Calculated Complexity: {complexity}</p>}
        {code && (
          <SyntaxHighlighter language="java" style={vscDarkPlus}>
            {code}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
}

export default TryCatchCalculator;