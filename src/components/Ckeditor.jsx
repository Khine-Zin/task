import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill'; // ReactQuill import
import 'react-quill/dist/quill.snow.css'; // Quill styles

const TextEditor = ({ value, onChange }) => {
  const [editorData, setEditorData] = useState(value || '');
  const quillRef = useRef(null);

  // Wrap English words with span.english-text to style them differently
  const wrapEnglishText = (html) => {
    if (!html) return '';
    // Simple regex to wrap English words/numbers and punctuation with span
    return html.replace(/([A-Za-z0-9,.!?"'@#\$%\^&\*\-]+)/g, (match) => {
      return `<span class="english-text">${match}</span>`;
    });
  };

  const handleEditorChange = (content, delta, source, editor) => {
    // Wrap English text dynamically
    const processedContent = wrapEnglishText(content);
    setEditorData(processedContent);
    if (onChange) onChange(processedContent);
  };

  // Insert table function (from your original)
  const insertTable = (quill) => {
    const cursorPosition = quill.getSelection()?.index || 0;
    const tableHTML = `
      <table border="1" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td contenteditable="true">Cell 1</td>
          <td contenteditable="true">Cell 2</td>
          <td contenteditable="true">Cell 3</td>
        </tr>
      </table>
    `;
    quill.clipboard.dangerouslyPasteHTML(cursorPosition, tableHTML);
  };

  // Insert row function (from your original)
  const insertRow = (quill) => {
    const table = quill.root.querySelector('table');
    if (table) {
      const row = table.insertRow();
      row.innerHTML = `<td contenteditable="true">New Data 1</td><td contenteditable="true">New Data 2</td><td contenteditable="true">New Data 3</td>`;
    }
  };

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      const toolbar = quill.getModule('toolbar');
      toolbar.addHandler('insertTable', () => insertTable(quill));
      toolbar.addHandler('insertRow', () => insertRow(quill));
    }
  }, []);

  useEffect(() => {
    // If value prop changes from outside, update the editor content
    if (value && value !== editorData) {
      setEditorData(wrapEnglishText(value));
    }
  }, [value]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline'],
      [{ align: [] }],
      ['link'],
      [{ color: [] }, { background: [] }],
      ['blockquote', 'code-block'],
      [{ insertTable: 'Insert Table' }, { insertRow: 'Insert Row' }], // Your custom buttons
    ],
  };

  return (
    <>
      <ReactQuill
        ref={quillRef}
        value={editorData}
        onChange={handleEditorChange}
        theme="snow"
        modules={modules}
      />
      <style>{`
        .english-text {
          font-family: 'Arial Black', Arial, sans-serif;
          font-size: 18px;
          color: black;
        }
      `}</style>
    </>
  );
};

export default TextEditor;
