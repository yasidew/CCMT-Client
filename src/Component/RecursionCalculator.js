import React, { useState } from "react";
import axios from "axios";
import img1 from "../img/blue.png";
import RecursionReportComponent from "../Component/RecursionReport";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function RecursionCalculator() {
  const [code, setCode] = useState("");
  const [complexity, setComplexity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    // const sanitizedCode = code.replace(/\\/g, "\\\\");
    console.log("Code sent to backend:", code);
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

  const handleClear = () => {
    setCode(""); // Clear the textarea
    setComplexity(null); // Clear the calculated complexity
    setError(null); // Clear any error message
  };

  const handleClearComments = () => {
    // Create a regular expression to match comments (// and /* */)
    const commentRegex = /\/\/[^\n]*|\/\*[\s\S]*?\*\/|#.*$/gm;

    // Remove comments from the code and set the textarea value
    setCode(code.replace(commentRegex, ""));
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const importedCode = e.target.result;
      setCode(importedCode); // Set the imported code in the state
      setComplexity(null); // Clear any previously calculated complexity
      setError(null); // Clear any error message
    };

    if (file.name.endsWith(".java")) {
      // If the file has a .java extension, read it as text
      reader.readAsText(file);
    } else {
      // For other file types, read them as text as well
      reader.readAsText(file);
    }
  };

  return (
    <div className="container">
      <img
        src={img1}
        alt="complexity"
        width="100%"
        height="1100px"
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
          <button className="btnclear" onClick={handleClearComments}>
            Clear Comments
          </button>
          <input
            type="file"
            accept=".java, .txt"
            onChange={handleImport}
            className="file-input"
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <h1 style={{ color: "white" }}>Recursion Calculator</h1>
        <textarea
          rows="15"
          cols="100"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your code here"
          style={{ overflow: "scroll" }}
        ></textarea>
        <br />
        <button
          className="btncomplexity"
          onClick={handleCalculate}
          disabled={isLoading}
        >
          {isLoading ? "Calculating..." : "Calculate Complexity"}
        </button>
        <button className="btnclear" onClick={handleClear}>
          Clear
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {complexity !== null && (
          <p style={{ color: " white" }}>Calculated Complexity: {complexity}</p>
        )}
        {code && (
          <diV style={{ height: "210px", overflowY: "scroll" }}>
            <SyntaxHighlighter
              language="java"
              style={vscDarkPlus}
              showLineNumbers={true} // Add this line to enable line numbers
              wrapLines={true}
            >
              {code}
            </SyntaxHighlighter>
          </diV>
        )}
      </div>
      <div className="report">
        <RecursionReportComponent complexity={complexity} />
      </div>
    </div>
  );
}

export default RecursionCalculator;
