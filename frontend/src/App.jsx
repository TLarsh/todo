import { Route, Routes } from 'react-router'
import HomePage from './pages/homePage'
import NoteDetailPage from './pages/noteDetailPage'
import CreatePage from './pages/createPage'
import toast from 'react-hot-toast'

const App = () => {
  return (
    <div data-theme="forest">
      {/* <button onClick = {()=> toast.success('Congrats') } className='text-red-500 hover:text-red-700 p-4 bg-red-100'> Click Me </button> */}
      <button className='btn btn-outline'>click me</button>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/notes/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;