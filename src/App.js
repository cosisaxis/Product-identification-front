import { useState } from "react";
import BarcodeForm from "./components/barcode/Barcode";
import Login from "./components/login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [productSent, setProductSent] = useState(false);

  const handleProductSent = () => {
    setProductSent(true);
  };

  return (
    
    <div className="app-container">
      <Router>
      <Routes>
      <Route path="/" element= {!productSent && <BarcodeForm onProductSent={handleProductSent} />} />
      <Route path="/login" element={<Login />}/>
      </Routes>
    </Router>
     
      {productSent && <p>Product sent to the blockchain!</p>}
    </div>
  );
}

export default App;
