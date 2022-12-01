import { useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const [data, setData] = useState("0");
  const [previous, setPrevious] = useState("");
  const [operator, setOperator] = useState("");

  const handleKeyData = (e) => {
    if (e.target.value === ".") {
      if (data.toString().includes(".")) return;
      else setData(data + e.target.value);
    } else {
      setData(data + e.target.value);
    }
  };
  const handleSubmit = () => {
    let currentValue = parseFloat(data);
    let previousValue = parseFloat(previous);
    setPrevious("");

    switch (operator) {
      case "+":
        setData(currentValue + previousValue);

        break;
      case "-":
        setData(previousValue - currentValue);

        break;
      case "*":
        setData(currentValue * previousValue);

        break;
      case "/":
        (currentValue && previousValue) !== 0
          ? setData(previousValue / currentValue)
          : setData(0);

        break;

      default:
        break;
    }
    setOperator("");
  };
  const handleReset = () => {
    setPrevious("");
    setData("0");
    setOperator("");
  };
  const handleCalculation = (key) => {
    let currentValue = parseFloat(data);
    let previousValue = parseFloat(previous);
    setData("0");

    switch (key) {
      case "+":
        setPrevious(currentValue + previousValue);

        break;
      case "-":
        setPrevious(previousValue - currentValue);

        break;
      case "*":
        setPrevious(previousValue * currentValue);

        break;
      case "/":
        (currentValue && previousValue) !== 0
          ? setPrevious(previousValue / currentValue)
          : setPrevious("0");

        break;

      default:
        break;
    }
  };
  const handleOpertion = (e) => {
    let operation = e.target.value;
    console.log(operation);
    setOperator(operation);

    if (previous === "") {
      setPrevious(data);
      setData(0);
    }
    if (data === "0" || data === 0) {
      setOperator(operation);
    } else {
      handleCalculation(operator);
    }
  };
  const handleInputData = (e) => {
    // console.log(e.key, e.keyCode);
    e.target.value = e.key;
    if (e.keyCode === 8) {
      handleDelete();
    }

    if (
      (e.keyCode >= 96 && e.keyCode < 106) ||
      (e.keyCode >= 48 && e.keyCode <= 57) ||
      e.keyCode === 110
    ) {
      handleKeyData(e);
    }
    if (e.key === "=" || e.key === "Enter") handleSubmit();
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
      handleOpertion(e);
    }
  };
  const handleDelete = () => {
    data.length === 1 ? setData("0") : setData(data.slice(0, data.length - 1));
  };
  const ref = useRef(null);
  useEffect(() => {
    ref.current.focus();
  }, []);
  return (
    <div className="App">
      <div className="calculator">
        <div className="calWrapper">
          <div className="header">
            <h3>Calc</h3>
            <div className="color-picker">
              <div id="white"></div>
              <div id="aqua"></div>

              <div id="blue"></div>
              <div id="black"></div>
            </div>
          </div>
          <div className="display">
            <div className="previous">
              {previous}
              {operator}
            </div>
            <div
              onKeyDown={handleInputData}
              tabIndex={0}
              ref={ref}
              className="current"
            >
              {data}
            </div>
          </div>

          <button onClick={handleReset} className="span-two">
            AC
          </button>

          <button onClick={handleDelete}>DEL</button>
          <button onClick={handleOpertion} value="+">
            +
          </button>
          <button onClick={handleKeyData} value="7">
            7
          </button>
          <button onClick={handleKeyData} value="8">
            8
          </button>
          <button onClick={handleKeyData} value="9">
            9
          </button>
          <button onClick={handleOpertion} value="-">
            -
          </button>
          <button onClick={handleKeyData} value="4">
            4
          </button>
          <button onClick={handleKeyData} value="5">
            5
          </button>
          <button onClick={handleKeyData} value="6">
            6
          </button>
          <button onClick={handleOpertion} value="*">
            *
          </button>

          <button onClick={handleKeyData} value="1">
            1
          </button>
          <button onClick={handleKeyData} value="2">
            2
          </button>
          <button onClick={handleKeyData} value="3">
            3
          </button>
          <button onClick={handleOpertion} value="/">
            /
          </button>
          <button onClick={handleKeyData} value=".">
            .
          </button>
          <button onClick={handleKeyData} value="0">
            0
          </button>
          <button value="=" onClick={handleSubmit} className="span-two">
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
