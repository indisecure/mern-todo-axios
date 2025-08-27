import { BrowserRouter,Routes,Route } from 'react-router-dom';
import AddUpdateComponent from './components/AddUpdateComponent';
import GetDeleteComponent from './components/GetDeleteComponent';
function App() {
  return (
    <BrowserRouter>
    <Routes>   
       <Route  path='/' element={<GetDeleteComponent/>}></Route> 
       <Route  path='/add' element={<AddUpdateComponent/>}></Route>
       <Route  path='/edit/:id' element={<AddUpdateComponent/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
