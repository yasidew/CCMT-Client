import React, { useState } from 'react';
import axios from 'axios';
import img1 from "../img/blue.png";
// import ReportComponent from './ReportComponent';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function ComplexityCalculator() {
    const [code, setCode] = useState('');
    const [complexity, setComplexity] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCalculate = () => {
        setIsLoading(true);
        setError(null);

        axios.post('http://localhost:8080/calculate-complexity', { code })
            .then(response => {
                setComplexity(response.data);
            })
            .catch(error => {
                setError('Error calculating complexity. Please check your input and try again.');
                console.error('Error calculating complexity:', error);
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

    return (
        <div className='container'>
            <img src={img1} alt='complexity' width='100%' height='100%' className="background-image" />
            <div className='content'>
            <div className='CCMTcontainer'>
                <button className='btncal' onClick={() => window.location.href = '/TryCatchCalculator'}>Try Catch</button>
                <button className='btncal' onClick={() => window.location.href = '/RecursionCalculator'}>Recursion</button>
                <button className='btncal' onClick={() => window.location.href = '/ArrayDeclarationCalculator'}>Array Declaration</button>
                <button className='btncal' onClick={() => window.location.href = '/CompoundConditionalCalculator'}>Compound Conditional Statements</button>
            </div>
                <h1 style={{ color: "white" }}>Code Complexity Calculator</h1>
                <br />
                <textarea
                    rows="15"
                    cols="100"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    placeholder="Enter your code here"
                    style={{ overflow: "scroll" }} 
                ></textarea>
                <br /><br />
                <button className= 'btncomplexity'onClick={handleCalculate} disabled={isLoading}>
                    {isLoading ? 'Calculating...' : 'Calculate Complexity'}
                </button>
                <button className="btnclear" onClick={handleClear}>
                    Clear
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {complexity !== null && <p>Calculated Complexity: {complexity}</p>}
                {code && (
                    <diV style = {{height: "220px", overflowY : "scroll"  }}>
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
        </div>
    );
}

export default ComplexityCalculator;

