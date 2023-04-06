import "./App.css";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { productAbi } from "./constants";

function App({ onProductSent }) {
  const [web3, setWeb3] = useState(null);
  const [productContract, setProductContract] = useState(null);
  const [brand, setBrand] = useState("");
  const [item, setItem] = useState("");
  const [year, setYear] = useState(0);
  const [barcode, setBarcode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);

        try {
          await window.ethereum.enable();
        } catch (error) {
          console.error(error);
        }
      } else if (window.web3) {
        const web3 = new Web3(window.web3.currentProvider);
        setWeb3(web3);
      } else {
        console.error("No Web3 provider detected");
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    if (web3) {
      const contractAddress = "0x803371E2C11E1807A53BE1803FAabFB52b5B245f";
      const contract = new web3.eth.Contract(productAbi, contractAddress);
      setProductContract(contract);
    }
  }, [web3]);



  const handleSubmitProduct = async () => {
    setIsSubmitting(true);
    const contractAddress = "0xf616859233bBA7d5B3aBED50Fb604b56D88Bf372";

    try {
      await productContract.methods
        .createOrUpdateRecord(brand, item, year, barcode)
        .send({ from: contractAddress });
      setIsSubmitting(false);
      onProductSent();
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="App">
      <div className="form-container">
        <h1 className="form-header">Barcode-X</h1>
        <div className="form-group">
          <label>Brand:</label>
          <input
            type="text"
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Item:</label>
          <input
            type="text"
            value={item}
            onChange={(event) => setItem(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Barcode:</label>
          <input
            type="text"
            value={barcode}
            onChange={(event) => setBarcode(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Year:</label>
          <input
            type="number"
            value={year}
            onChange={(event) => setYear(event.target.value)}
          />
        </div>
        
        <button className="form-submit" onClick={handleSubmitProduct}>Send Product</button>
        {isSubmitting && <p>Sending product to the blockchain...</p>}
      </div>
    </div>
  );
}

export default App;
