import logo from './logo.svg';
import { Routes as Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import CompoundConditionalCalculator from './Component/CompoundCondtionalCalculator';
import ComplexityCalculator from './Component/ComplexityCalculator';
import RecursionCalculator from './Component/RecursionCalculator';
import ArrayDeclarationCalculator from './Component/ArrayDeclarationCalculator';
import TryCatchCalculator from './Component/TryCatchCalculator';



function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' element={<ComplexityCalculator/>}/>
        <Route path="/CompoundConditionalCalculator" element={<CompoundConditionalCalculator />} />
        <Route path="/RecursionCalculator" element={<RecursionCalculator />} />
        <Route path="/ArrayDeclarationCalculator" element={<ArrayDeclarationCalculator />} />
        <Route path="/TryCatchCalculator" element={<TryCatchCalculator />} />
      </Switch>
    </Router>
  );
}

export default App;