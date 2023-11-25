import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [searchedTerm, setSearchedTerm] = useState("");
  const [dataAgain, setDataAgain] = useState(false)
  const [err, setErr] = useState(true);
  const [isData, setIsData] = useState(false);
  const [carData, setCarData] = useState(null);
  const allData = useRef(null)
  const navigate = useNavigate();
  const handleSearch = async (e) => {
    e.preventDefault();
    if(allData.current === null){
      setDataAgain(true)
      setSearchedTerm('')
      return;
    }
    else{
      const findData = allData.current.filter( id => id.reqNo === searchedTerm)
      setCarData(findData);
      setErr(false)
      setSearchedTerm("");
      if (carData === 0) {
        setIsData(false);
      } else {
        setIsData(true);
      }
    }
  };

  const [input, setInput] = useState('');

  const handleKeyPress = key => {
    setInput(prevInput => prevInput + key);
    setSearchedTerm(prevInput => prevInput + key)
  };

  const handleBackspace = () => {
    setInput(prevInput => prevInput.slice(0, -1));
    setSearchedTerm(prevInput => prevInput.slice(0, -1))
  };
  useEffect(() => {
    const loadData = async () => {
      try {
        const searchedData = await axios.get(
          `http://localhost:3001/`
        );
        allData.current = searchedData.data.data
      } catch (error) {
        setDataAgain(true);
      }
    };
    if(localStorage.getItem('jwt')){
      loadData()
      setTimeout(() => {
        localStorage.removeItem('jwt')
      },15 * 60 * 60 * 1000)
    }
    else
    {
      navigate('/')
    }
  },[])
  return (
    <>
      <div className="mainDiv">
        <form className="searchField" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter Car Number"
            value={searchedTerm}
            onChange={(e) => {
              setSearchedTerm(e.target.value);
            }}
          />
        </form>
        <div className="ShowData">
          {dataAgain ? (
            <p>Data is not downloaded. Please on your internet connection and reload the page.</p>
          ) :
          (err ? (
            <p style={{textAlign : 'center'}}>Enter Car Number to Find Details (only digits)</p>
          ) : (
            <div className="ShowData">
              {isData ? (
                <table className="tableData">
                  <thead>
                    <tr className="tableHead1">
                      <th className="tableField1">Reg No</th>
                      <th className="tableField2">Brand</th>
                      <th className="tableField3">DPD</th>
                      <th className="tableField4">Bank</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carData?.map((data, key) => (
                      <tr className="tableHead2" key={key}>
                        {data.reqbtw.trim() === "" ? (
                          <td className="tableField1">{`${data.reqtxt}-${data.reqNo}`}</td>
                        ) : (
                          <td className="tableField1">{`${data.reqtxt}-${data.reqbtw}-${data.reqNo}`}</td>
                        )}
                        <td className="tableField2">{data.brnd}</td>
                        <td className="tableField3">{data.dpd}</td>
                        <td className="tableField4">{data.bank}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={{textAlign : 'center'}}>There is no Car with this Registration Number</p>
              )}
            </div>
          )
          )}
        </div>
      </div>
    <div className="keyboard-container">
      <div className="keys">
        <button className="key" onClick={() => handleKeyPress('7')}>7</button>
        <button className="key" onClick={() => handleKeyPress('8')}>8</button>
        <button className="key" onClick={() => handleKeyPress('9')}>9</button>
        <button className="key" onClick={() => handleKeyPress('4')}>4</button>
        <button className="key" onClick={() => handleKeyPress('5')}>5</button>
        <button className="key" onClick={() => handleKeyPress('6')}>6</button>
        <button className="key" onClick={() => handleKeyPress('1')}>1</button>
        <button className="key" onClick={() => handleKeyPress('2')}>2</button>
        <button className="key" onClick={() => handleKeyPress('3')}>3</button>
        <button className="key" onClick={handleBackspace}>Back</button>
        <button className="key" onClick={() => handleKeyPress('0')}>0</button>
        <button className="key" onClick={handleSearch}>Enter</button>
      </div>
    </div>
    </>
  );
};

export default Home;
