import './assets/common.scss';
import { useState, useCallback, useEffect, useRef } from 'react';

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null)

  const pwdGen = useCallback(() => {
  let pass = "";
  let str = "ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz";

  if (numberAllowed) str += "0123456789";
  if (charAllowed) str += "!@$%^&*-_+=[]{}`~";

  for (let i = 0; i < length; i++) {
    let char = Math.floor(Math.random() * str.length);
    pass += str.charAt(char);
  }

  setPassword(pass);
}, [length, numberAllowed, charAllowed]);


  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    pwdGen()
  }, [length, numberAllowed, charAllowed, pwdGen])

  return (
    <>
      <div className="container">
        <div className="main">
          <h1>Password Generator using useEffect, useRef and useCallback Hooks</h1>
          <p>&nbsp;</p>
          <div className='mainbox'>
            <div className='topbox'>
              <input
                type='text'
                value={password}
                placeholder='Password Generator'
                readOnly
                ref={passwordRef}
              />
              <button onClick={copyPasswordToClipboard}>COPY</button>
            </div>
            <div className='rangebox'>
              <label><input
                type="range"
                min={8} max={40}
                value={length}
                onChange={(e) => { setLength(e.target.value) }}
              />&nbsp; Length: {length}</label>
            </div>
            <div className='numbox'>
              <label><input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />&nbsp;Numbers</label>
              <label><input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev)
                }}
              />&nbsp;Characters</label>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
