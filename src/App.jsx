import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  // const [colour,setColour] = useState("black")
  const [length,setLength] = useState(6);
  const [password,setPassword] = useState("");
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [charAllowed,setCharAllowed] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

 

  const  passref = useRef(null);

  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "1234567890"
    }
    if (charAllowed) {
      str += "!@#$%^&*()~"
    }
    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(index)
    }
    setPassword(pass)
    
  },[length,numberAllowed,charAllowed,setPassword])

  useEffect(()=> passwordgenerator,[length,numberAllowed,charAllowed,passwordgenerator])

  const copypass = useCallback(()=>{
    passref.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])
  
  return (
      <div className='w-full h-screen bg-gray-800 flex justify-center items-center'>
        {/* <div className=' fixed flex flex-wrap bg-slate-400 bottom-3 text-black rounded-xl p-3 justify-center '>
          <button onClick={() => setColour("red")} className=' bg-red-500 p-2 rounded-md outline-none'>red</button>
          <button onClick={() => setColour("green")} className='bg-green-500 p-2 mx-3 rounded-md outline-none'>green</button>
          <button onClick={() => setColour("yellow")} className='bg-yellow-300 mx-3 p-2 rounded-md  outline-none'>yellow</button>
          <button onClick={() => setColour("blue")} className='bg-blue-600 p-2 mx-3 rounded-md  outline-none'>blue</button>
          <button onClick={() => setColour("pink")} className='bg-pink-400 p-2 mx-3 rounded-md  outline-none'>pink</button>
          <button onClick={() => setColour("brown")} style={{backgroundColor: "brown"}} className=' p-2 rounded-md  outline-none'>brown</button>
        </div> */}
        <div className='bg-slate-400 p-4  w-full rounded-lg max-w-md text-black '>
          <h1 className='text-center mb-2 font-bold text-xl'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            ref={passref}
            readOnly
        />
        <button onClick={copypass} onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className={`outline-none ${isMouseDown ? `bg-red-600` : `bg-blue-600`} hover:bg-blue-950 text-white px-3 py-0.5 shrink-0`}
        >copy</button>
        
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={50}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
        </div>
      </div>
      </div>
  )
    }
export default App
 