import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Add from './pages/Add';
import Slideshow from './pages/Slideshow';
const App: React.FC = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/add' element={<Add />} />
                    <Route path='/quizzes/:id' element={<Edit />} />
                    <Route
                        path='/slideshow/quizzes/:id'
                        element={<Slideshow />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
