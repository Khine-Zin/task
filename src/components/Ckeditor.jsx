import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill'; // import the ReactQuill component
import 'react-quill/dist/quill.snow.css'; // import the styles for Quill

const TextEditor = ({ onChange, value }) => {
  const [editorData, setEditorData] = useState(value || '');
  const quillRef = useRef(null);

  function convertToArialCompatible(text) {
  const map = {
    '𝐀':'A','𝐁':'B','𝐂':'C','𝐃':'D','𝐄':'E','𝐅':'F','𝐆':'G','𝐇':'H','𝐈':'I',
    '𝐉':'J','𝐊':'K','𝐋':'L','𝐌':'M','𝐍':'N','𝐎':'O','𝐏':'P','𝐐':'Q','𝐑':'R',
    '𝐒':'S','𝐓':'T','𝐔':'U','𝐕':'V','𝐖':'W','𝐗':'X','𝐘':'Y','𝐙':'Z',
    '𝐚':'a','𝐛':'b','𝐜':'c','𝐝':'d','𝐞':'e','𝐟':'f','𝐠':'g','𝐡':'h','𝐢':'i',
    '𝐣':'j','𝐤':'k','𝐥':'l','𝐦':'m','𝐧':'n','𝐨':'o','𝐩':'p','𝐪':'q','𝐫':'r',
    '𝐬':'s','𝐭':'t','𝐮':'u','𝐯':'v','𝐰':'w','𝐱':'x','𝐲':'y','𝐳':'z',
    '𝟎':'0','𝟏':'1','𝟐':'2','𝟑':'3','𝟒':'4','𝟓':'5','𝟔':'6','𝟕':'7','𝟖':'8','𝟗':'9'
  };

  return text.replace(/[\u{1D400}-\u{1D7FF}]/gu, m => map[m] || m);
}


const handleEditorChange = (value) => {
  const cleaned = convertToArialCompatible(value);
  setEditorData(cleaned);
  onChange(cleaned);
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
