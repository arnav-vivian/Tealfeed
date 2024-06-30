import React from 'react';
import CodeEditor from './CodeEditor';

const App = () => {
  return (
    <div className="App" style={{ textAlign: 'center', padding: '10px', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '10px', fontSize: '2.5rem', color: '#333' }}>Codeite</h1>
      <CodeEditor />
    </div>
  );
};

export default App;
