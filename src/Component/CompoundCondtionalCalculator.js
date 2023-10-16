import React, { useState } from "react";
import axios from "axios";
import img1 from "../img/blue.png";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function CompoundConditionalCalculator() {
  const [codeIF, setCodeIF] = useState("");
  const [complexity, setComplexity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [codeFor, setCodeFor] = useState("");
  const [complexityFor, setComplexityFor] = useState(null);
  const [isLoadingFor, setIsLoadingFor] = useState(false);
  const [errorFor, setErrorFor] = useState(null);

  const handleCalculateIF = () => {
    setIsLoading(true);
    setError(null);

    axios
      .post("http://localhost:8080/calculate-complexity-if", { codeIF })
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

  const handleCalculateFor = () => {
    setIsLoadingFor(true);
    setErrorFor(null);

    axios
      .post("http://localhost:8080/calculate-complexity-for", { codeFor })
      .then((response) => {
        setComplexityFor(response.data);
      })
      .catch((error) => {
        setErrorFor(
          "Error calculating FOR complexity. Please check your input and try again."
        );
        console.error("Error calculating FOR complexity:", error);
      })
      .finally(() => {
        setIsLoadingFor(false);
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
        <h1 style={{ color: "white" }}>
          Compound Conditional Statements Complexity Calculator
        </h1>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "60px" }}>
            <textarea
              rows="10"
              cols="50"
              value={codeIF}
              onChange={(e) => setCodeIF(e.target.value)}
              placeholder="Enter your codeIF here"
              style={{ overflow: "scroll" }}
            ></textarea>
            <br></br>
            <button
              className="btncomplexity"
              onClick={handleCalculateIF}
              disabled={isLoading}
            >
              {isLoading ? "Calculating..." : "Calculate Complexity IF"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {complexity !== null && (
              <p style={{ color: " white" }}>
                Calculated IF Complexity: {complexity}
              </p>
            )}
            {codeIF && (
              <div style={{ height: "210px", overflowY: "scroll" }}>
                <SyntaxHighlighter
                  language="java"
                  style={vscDarkPlus}
                  showLineNumbers={true} // Add this line to enable line numbers
                  wrapLines={true}
                >
                  {codeIF}
                </SyntaxHighlighter>
              </div>
            )}
          </div>

          <div>
            <textarea
              rows="10"
              cols="50"
              value={codeFor}
              onChange={(e) => setCodeFor(e.target.value)}
              placeholder="Enter your FOR code here"
              style={{ overflow: "scroll" }}
            ></textarea>
            <br></br>
            <button
              className="btncomplexity"
              onClick={handleCalculateFor}
              disabled={isLoadingFor}
            >
              {isLoadingFor ? "Calculating FOR..." : "Calculate Complexity FOR"}
            </button>
            {errorFor && <p style={{ color: "red" }}>{errorFor}</p>}
            {complexityFor !== null && (
              <p style={{ color: " white" }}>
                Calculated FOR Complexity: {complexityFor}
              </p>
            )}
            {codeFor && (
              <div style={{ height: "210px", overflowY: "scroll" }}>
                <SyntaxHighlighter
                  language="java"
                  style={vscDarkPlus}
                  showLineNumbers={true} // Add this line to enable line numbers
                  wrapLines={true}
                >
                  {codeFor}
                </SyntaxHighlighter>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompoundConditionalCalculator;
