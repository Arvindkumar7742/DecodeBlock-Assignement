import './App.css';
import { Container } from './main/Container';
import { Route, Routes } from "react-router-dom";
import { Preview } from './Preview/Preview';
import { SuccessSub } from './Preview/SuccessSub';

function App() {
  return (
    <div className='flex flex-row w-screen min-h-screen'>
      <Routes>
        <Route path='/' element={<Container />} />
        <Route path='/generate/preview' element={<Preview />} />
        <Route path='/success/submission' element={<SuccessSub />} />
      </Routes>
    </div>
  );
}

export default App;
