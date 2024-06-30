import React, { useEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Using a different Prism theme for better visuals
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-css';
import debounce from 'lodash.debounce';

const CodeEditor = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const codeRef = useRef(null);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const debouncedHighlight = debounce(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, 300);

  useEffect(() => {
    debouncedHighlight();
    return () => debouncedHighlight.cancel();
  }, [code, debouncedHighlight, language]);

  const handleChange = (event) => {
    setCode(event.target.value);
  };

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    alert(`Switched to ${newLanguage.toUpperCase()} syntax highlighting.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <select
        value={language}
        onChange={handleLanguageChange}
        style={{ marginBottom: '10px', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="css">CSS</option>
      </select>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', gap: '0px' }}>
        <div style={{ width: '48%' }}>
          <label htmlFor="code-input" style={{ display: 'block', marginBottom: '8px', fontSize: '18px', fontWeight: 'bold' }}>Input</label>
          <textarea
            id="code-input"
            value={code}
            onChange={handleChange}
            placeholder="Write your code here..."
            style={{
              width: '100%',
              height: '300px',
              fontSize: '16px',
              fontFamily: 'monospace',
              padding: '15px',
              border: '1px solid #ccc',
              borderRadius: '5px',

              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              resize: 'none'
            }}
          />
        </div>
        <div style={{ width: '48%' }}>
          <label htmlFor="code-output" style={{ display: 'block', marginBottom: '8px', fontSize: '18px', fontWeight: 'bold' }}>Output</label>
          <pre id="code-output" style={{
            width: '100%',
            height: '300px',
            fontSize: '16px',
            fontFamily: 'monospace',
            padding: '15px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#2d2d2d',
            color: '#f8f8f2',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            overflow: 'auto'
          }}>
            <code ref={codeRef} className={`language-${language}`}>
              {code}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
