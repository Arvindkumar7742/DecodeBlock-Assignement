import { useEffect } from 'react';
import './App.css';
import { createMockServer } from "./mirage"

function App() {





  useEffect(() => {
    createMockServer();
  }, []);

  return (
    <div className="text-center">
      
    </div>
  );
}

export default App;
