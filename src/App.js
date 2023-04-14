import { useState } from "react";
import BarcodeForm from "./Barcode";

function App() {
  const [productSent, setProductSent] = useState(false);

  const handleProductSent = () => {
    setProductSent(true);
  };

  return (
    <div className="app-container">
      {!productSent && <BarcodeForm onProductSent={handleProductSent} />}
      {productSent && <p>Product sent to the blockchain!</p>}
    </div>
  );
}

export default App;
