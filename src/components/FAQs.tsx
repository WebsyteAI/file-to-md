import React from 'react';

const FAQs: React.FC = () => {
  return (
    <div className="faqs">
      <h2>Frequently Asked Questions</h2>
      <p>Markdown is a lightweight markup language that is widely used for formatting text. It is especially useful for AI applications as it provides a clean and structured format for data.</p>
      <h3>Supported File Formats</h3>
      <ul>
        <li>PDF Documents: .pdf</li>
        <li>Images: .jpeg, .jpg, .png, .webp, .svg</li>
        <li>HTML Documents: .html</li>
        <li>XML Documents: .xml</li>
        <li>Microsoft Office Documents: .xlsx, .xlsm, .xlsb, .xls, .et</li>
        <li>Open Document Format: .ods</li>
        <li>CSV: .csv</li>
        <li>Apple Documents: .numbers</li>
      </ul>
    </div>
  );
};

export default FAQs;