import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import ListTaskComponent from './components/ListTaskComponent';
import TaskComponent from './components/TaskComponent';


function App() {
  return (
    <div className="App">
    <Router>
        <HeaderComponent />
          <div>     
              <Routes>
                  <Route path = "/" element = {<ListTaskComponent/>}></Route>
                  <Route path = "/tasklist" element={<ListTaskComponent/>}></Route>
                  <Route path = "/add-task" element = {<TaskComponent/>}></Route>
                  <Route path='/update-task/:id' element={<TaskComponent />}></Route>  
              </Routes>
          </div>
        </Router> 
    </div>
  );
}

export default App;
