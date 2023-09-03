import React from 'react';

function ReportComponent({ complexityData }) {
    const calculateComplexity = (data) => {
        // Calculate complexity using the provided formula
        const complexity = data.reduce((sum, line) => sum + line.tokens, 0);
        return complexity;
    };

    const complexity = calculateComplexity(complexityData);

    return (
        <div>
            <h2>Token Counts:</h2>
            <ul>
                {complexityData.map((line, index) => (
                    <li key={index}>{line.code}: {line.tokens} tokens</li>
                ))}
            </ul>
            <h2>Calculated Complexity:</h2>
            <p>
                ({complexityData.map(line => `${line.tokens} * 1`).join(' + ')}) = {complexity}
            </p>
        </div>
    );
}

export default ReportComponent;
