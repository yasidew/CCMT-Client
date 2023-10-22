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

  const handleImportIf = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const importedCode = e.target.result;
      setCodeIF(importedCode); // Set the imported code in the state
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
  const handleClearIf = () => {
    setCodeIF(""); // Clear the textarea
    setComplexity(null); // Clear the calculated complexity
    setError(null); // Clear any error message
  };

  const handleClearFor = () => {
    setCodeFor(""); // Clear the textarea
    setComplexity(null); // Clear the calculated complexity
    setError(null); // Clear any error message
  };

  const handleImportFor = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const importedCode = e.target.result;
      setCodeFor(importedCode); // Set the imported code in the state
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


  const handleClearComments = () => {
    // Create a regular expression to match comments (// and /* */)
    const commentRegex = /\/\/[^\n]*|\/\*[\s\S]*?\*\/|#.*$/gm;

    // Remove comments from the code and set the textarea value
    setCodeIF(codeIF.replace(commentRegex, ""));
    setCodeFor(codeFor.replace(commentRegex, ""));
  };

  // const handleClearCommentsFor = () => {
  //   // Create a regular expression to match comments (// and /* */)
  //   const commentRegex = /\/\/[^\n]*|\/\*[\s\S]*?\*\/|#.*$/gm;

  //   // Remove comments from the code and set the textarea value
  //   setCodeFor(codeFor.replace(commentRegex, ""));
  // };

  

  return (
    <div className="container">
      <img
        src={img1}
        alt="complexity"
        width="100%"
        height="1100px"
        className="background-image"
      />
      <div className="content" style={{width:"1000px"}}>
        <div className="CCMTcontainer">
        <input
            type="file"
            accept=".java, .txt"
            onChange={handleImportIf}
            className="file-input"
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button
            className="btncal" style={{marginRight: "100px"}}
            onClick={() => (window.location.href = "/")}
          >
            Home
          </button>
          <input
            type="file"
            accept=".java, .txt"
            onChange={handleImportFor}
            className="file-input"
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button className="btnclear" onClick={handleClearComments} style={{marginRight:"100px"}}>
            Clear Comments
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
            <button className="btnclear" onClick={handleClearIf}>
          Clear
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
            <button className="btnclear" onClick={handleClearFor}>
          Clear
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
