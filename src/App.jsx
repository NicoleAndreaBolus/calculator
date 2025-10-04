import './App.css';
import { useState } from "react";

function Scrn({ val }) {
  return (
    <div className="scrnBox">
      <span>{val}</span>
    </div>
  );
}

function Btn({ txt, onHit, extraCls = "" }) {
  return (
    <button
      className={`btnKey ${extraCls}`}
      onClick={() => onHit(txt)}
    >
      {txt}
    </button>
  );
}

function App() {
  const [scrnVal, setScrnVal] = useState("0");
  const [n1, setN1] = useState(null);
  const [n2, setN2] = useState(null);
  const [opr, setOpr] = useState(null);
  const [isResult, setIsResult] = useState(false); 

  const clrHandler = () => {
    setScrnVal("0");
    setN1(null);
    setN2(null);
    setOpr(null);
    setIsResult(false);
  };

  const numHandler = (val) => {
    
    if (isResult) {
      setScrnVal(val.toString());
      setN1(val.toString());
      setN2(null);
      setOpr(null);
      setIsResult(false);
      return;
    }

    if (opr === null) {
      const updN1 = n1 === null ? val.toString() : n1 + val.toString();
      setN1(updN1);
      setScrnVal(updN1);
    } else {
      const updN2 = n2 === null ? val.toString() : n2 + val.toString();
      setN2(updN2);
      setScrnVal(updN2);
    }
  };

  const oprHandler = (val) => {
    if (n1 !== null && n2 !== null && opr !== null) {
      eqlHandler();
    }
    setOpr(val);
    setIsResult(false);
  };

  const eqlHandler = () => {
    if (n1 !== null && opr !== null && n2 !== null) {
      let ans;
      const a = parseFloat(n1);
      const b = parseFloat(n2);

      switch (opr) {
        case '+': ans = a + b; break;
        case '-': ans = a - b; break;
        case '*': ans = a * b; break;
        case '÷': ans = b === 0 ? "Error" : a / b; break;
        default: return;
      }

      setScrnVal(ans.toString());
      setN1(ans.toString());
      setN2(null);
      setOpr(null);
      setIsResult(true);
    }
  };

  const nameHandler = () => {
    setScrnVal("Nicole Andrea Bolus");
    setIsResult(true);
  };

  return (
    <div className="App">
      <h1>Calculator of Nicole Andrea Bolus - IT3B</h1>

      <div className="calcWrap">
        <div className="scrnWrap">
          <Scrn val={scrnVal} />
        </div>

        <div className="btnGrid">
          <Btn txt={7} onHit={numHandler} />
          <Btn txt={8} onHit={numHandler} />
          <Btn txt={9} onHit={numHandler} />
          <Btn txt={'÷'} onHit={oprHandler} extraCls="oprBtn" />

          <Btn txt={4} onHit={numHandler} />
          <Btn txt={5} onHit={numHandler} />
          <Btn txt={6} onHit={numHandler} />
          <Btn txt={'*'} onHit={oprHandler} extraCls="oprBtn" />

          <Btn txt={1} onHit={numHandler} />
          <Btn txt={2} onHit={numHandler} />
          <Btn txt={3} onHit={numHandler} />
          <Btn txt={'-'} onHit={oprHandler} extraCls="oprBtn" />

          <Btn txt={'C'} onHit={clrHandler} extraCls="clrBtn" />
          <Btn txt={0} onHit={numHandler} />
          <Btn txt={'='} onHit={eqlHandler} extraCls="eqlBtn" />
          <Btn txt={'+'} onHit={oprHandler} extraCls="oprBtn" />
        </div>

        <div className="nameWrap">
          <Btn txt={'BOLUS'} onHit={nameHandler} extraCls="oprBtn" />
        </div>
      </div>
    </div>
  );
}

export default App;
