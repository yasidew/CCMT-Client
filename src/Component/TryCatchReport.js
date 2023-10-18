import React from 'react';

const TryCatchReportComponent = ({ complexity }) => {
    return (
      <div className="report-container">
        <h2>Complexity Report</h2>
        <p>
          The complexity of your code is calculated based on the following
          guidelines:
        </p>
        <ul>
          <li>
            It assigns a complexity of 1 for the initial recursive call.
          </li>
          <li>
            It increments the complexity by 2 for each additional recursive call
            in a line.
          </li>
        </ul>
        <p>Total Calculated Complexity: {complexity}</p>
      </div>
    );
  };

export default TryCatchReportComponent;
