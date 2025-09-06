import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  // Corrected state setter name to follow convention (setLength)
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [buttonText, setButtonText] = useState("Copy");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    // FIX 3: Corrected the alphabet string to include 'I'
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "`!~@#$%^&*(){}[]|/_+-=,.<>;:";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]); // setPassword can be removed, as it's guaranteed to be stable

  const copyPasswordToClipboard = useCallback(() => { 
    window.navigator.clipboard.writeText(password);

    setButtonText("Copied!");

    setTimeout(() => {
      setButtonText("Copy");
    }, 2000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3 bg-white'
          placeholder='Password'
          readOnly
          ref={passwordRef}
        />
        {/* FIX 1: Corrected onClick, function reference, and className syntax */}
        <button
          onClick={copyPasswordToClipboard}
          className={`cursor-pointer outline-none text-white px-3 py-0.5 shrink-0 transition-colors duration-200 ${
            buttonText === 'Copied!' ? 'bg-green-600' : 'bg-blue-700'
          }`}
        >
          {buttonText}
        </button>
      </div>
      <div className='flex flex-wrap text-sm gap-x-4 gap-y-2'>
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            className='cursor-pointer'
            // Used the corrected state setter name
            onChange={(e) => { setLength(e.target.value) }}
          />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            checked={numberAllowed}
            id="numberInput"
            className='cursor-pointer'
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            checked={charAllowed}
            id="charInput"
            className='cursor-pointer'
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
