import React from 'react';

interface MarkdownResultsProps {
  results: string[];
}

const MarkdownResults: React.FC<MarkdownResultsProps> = ({ results }) => {
  return (
    <div className="markdown-results">
      {results.map((result, index) => (
        <div key={index} className="result">
          <pre>{result}</pre>
          <button
            onClick={() => navigator.clipboard.writeText(result)}
            className="copy-button"
          >
            Copy Markdown
          </button>
        </div>
      ))}
    </div>
  );
};

export default MarkdownResults;