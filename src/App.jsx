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
    if (data === "0" || data === 0) {
      setOperator(key);
    } else {
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
    }
  };
  const handleOpertion = (e) => {
    let operation = e.target.value;
    console.log(operation);
    setOperator(operation);

    if (previous === "") {
      setPrevious(data);
      setData(0);
    } else {
      handleCalculation(operator);
    }
  };
  const handleInputData = (e) => {
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
    if (e.keyCode === 187 || e.keyCode === 222 || e.keyCode === 13)
      handleSubmit();
    if (
      e.keyCode === 106 ||
      e.keyCode === 107 ||
      e.keyCode === 109 ||
      e.keyCode === 111
    ) {
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
      <div className="calWrapper">
        <div className="calHeader">
          <h3>Calc</h3>
        </div>
        <div className="calInput">
          <div className="previousValue">
            {previous}
            {operator}
          </div>
          <div
            className="currentValue"
            onKeyDown={handleInputData}
            tabIndex={0}
            ref={ref}
          >
            {data}
          </div>
        </div>
        <div className="calKeys">
          <button onClick={handleReset}>AC</button>
          <button onClick={handleKeyData} value=".">
            .
          </button>
          <button onClick={handleDelete}>DEL</button>
          <button onClick={handleKeyData} value="7">
            7
          </button>
          <button onClick={handleKeyData} value="8">
            8
          </button>
          <button onClick={handleKeyData} value="9">
            9
          </button>
          <button onClick={handleOpertion} value="+">
            +
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
          <button onClick={handleOpertion} value="-">
            -
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

          <button value="=" onClick={handleSubmit}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
