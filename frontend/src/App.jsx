import './App.css';
import TaskPages from './pages/TaskPages';

import { Route, Routes } from 'react-router-dom';
import UpdatePage from './pages/UpdatePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TaskPages />} />
        <Route path="/edit/:id" element={<UpdatePage />} />
      </Routes>
    </div>
  );
}

export default App;
