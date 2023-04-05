import "./App.css";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { productAbi } from "./constants";

function App() {
  const [web3, setWeb3] = useState(null);
  const [productContract, setProductContract] = useState(null);
  const [brand, setBrand] = useState("");
  const [item, setItem] = useState("");
  const [year, setYear] = useState(0);
  const [barcode, setBarcode] = useState("");

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

  const handleCreateOrUpdateRecord = async () => {
    try {
      await productContract.methods
        .createOrUpdateRecord(brand, item, year, barcode)
        .send({ from: window.ethereum.selectedAddress });
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetRecord = async () => {
    try {
      const record = await productContract.methods
        .getRecord(window.ethereum.selectedAddress)
        .call();
      setBrand(record.brand);
      setItem(record.item);
      setYear(record.year);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <div>
        <h1>Product</h1>
        <div>
          <label>Brand:</label>
          <input
            type="text"
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
          />
        </div>
        <div>
          <label>Item:</label>
          <input
            type="text"
            value={item}
            onChange={(event) => setItem(event.target.value)}
          />
        </div>
        <div>
          <label>Barcode:</label>
          <input
            type="text"
            value={barcode}
            onChange={(event) => setBarcode(event.target.value)}
          />
        </div>
        <div>
          <label>Year:</label>
          <input
            type="number"
            value={year}
            onChange={(event) => setYear(event.target.value)}
          />
        </div>
        <button onClick={handleCreateOrUpdateRecord}>
          Create/Update Record
        </button>
        <button onClick={handleGetRecord}>Get Record</button>
        <div>
          <p>Brand: {brand}</p>
          <p>Item: {item}</p>
          <p>Year: {year}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
