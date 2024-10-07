import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes ,Navigate} from 'react-router-dom';
import Toggle from './components/Toggle'
import SwitchComponent from './MainComponents/SwitchComponent';

import './App.css'

function App() {
  const [searchKeyword, setSearchKeyword] = useState('');

  
  return(
    <Router>
      <Routes>
   
        <Route path="/" element={<Navigate to="/auth" />} />

        
        <Route path="/auth" element={<Toggle />} />
        <Route path="/main" element={<>
          
          <SwitchComponent />
      
        </>} />

      
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </Router>

  )
  
  
}

export default App
