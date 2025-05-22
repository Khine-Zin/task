import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill'; // import the ReactQuill component
import 'react-quill/dist/quill.snow.css'; // import the styles for Quill

const TextEditor = ({ onChange, value }) => {
  const [editorData, setEditorData] = useState(value || '');
  const quillRef = useRef(null);

  const handleEditorChange = (value) => {
    setEditorData(value);
    onChange(value);
  };

  useEffect(() => {
    // Ensure Quill instance is available after component mounts
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      // Register custom button for inserting table
      const toolbar = quill.getModule('toolbar');
      toolbar.addHandler('insertTable', () => insertTable(quill));
      toolbar.addHandler('insertRow', () => insertRow(quill));
    }
  }, []);

  // Function to insert a table at the cursor position
  const insertTable = (quill) => {
    const cursorPosition = quill.getSelection().index;
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

  // Function to insert a row into an existing table
  const insertRow = (quill) => {
    const table = quill.root.querySelector('table');
    if (table) {
      const row = table.insertRow();
      row.innerHTML = `<td contenteditable="true">New Data 1</td><td contenteditable="true">New Data 2</td><td contenteditable="true">New Data 3</td>`;
    }
  };

  const modules = {
    toolbar: [
       [{ header: [1,2, 3, 4, 5, 6, false] }, { font: [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline'],
      [{ 'align': [] }],
      ['link'],
      [{ 'color': [] }, { 'background': [] }],
      ['blockquote', 'code-block'],
      [{ 'insertTable': 'Insert Table' }, { 'insertRow': 'Insert Row' }], // Custom buttons for table actions
    ],
  };

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        value={editorData}
        onChange={handleEditorChange}
        theme="snow"
        modules={modules}
      />
    </div>
  );
};

export default TextEditor;
