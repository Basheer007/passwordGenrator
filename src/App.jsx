import { useRef } from "react";
import { useCallback } from "react";
import { useState, useEffect } from "react";


export default function App() {

  const [length, setLength] = useState(5);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [password, setpassword] = useState('')
  const passref = useRef(null)

  const passwordGenrator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numberAllowed) str += '0123456789'
    if (specialChar) str += '[]{}\?/><)(*&^%$#@!'
    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setpassword(pass)
  }, [length, numberAllowed, specialChar])


  async function handlecopy() {
    try {
      // Write to clipboard
      await window.navigator.clipboard.writeText(password);
      // console.log('Text copied to clipboard');

      // Select the text in the input
      if (passref.current) {
        passref.current.select();
        // console.log('Text selected in input');
      } else {
        // console.error('passref is not pointing to a valid element');
      }
    } catch (err) {
      alert('Failed to copy text ');
    }
  }


  useEffect(() => {
    passwordGenrator()
  }, [length, numberAllowed, specialChar])

  return (
    <>
      <main className="h-screen bg-slate-700 text-white flex flex-col items-center justify-center">

        <h1 className="text-2xl font-outfit mb-10">Password Generator</h1>
        <div className=" border-2 border-sky-700-800 p-2 shadow-md shadow-green-400">

          <div className="flex">
            <input type="text" ref={passref} className="w-full text-black px-2" readOnly value={password} />
            <button
              onClick={handlecopy}
              className="bg-blue-500 px-2 py-1">copy</button>
          </div>

          <div className="flex gap-3 mt-4 flex-col md:flex-row">


            <div className=" flex items-center">
              <input type="range"
                min="10"
                max="20"
                value={length}
                id="length"
                onChange={(e) => setLength(e.target.value)}
              />
              <label htmlFor="length" className="text-orange-400">length:{length}</label>
            </div>


            <div className=" flex items-center">
              <input type="checkbox" name="" id="numberAllowed" onChange={(e) => setNumberAllowed(!numberAllowed)} />
              <label htmlFor="length" className="text-orange-400">Number</label>
            </div>
            <div className=" flex items-center">
              <input type="checkbox" name="" id="numberAllowed" onChange={(e) => setSpecialChar(!specialChar)} />
              <label htmlFor="length" className="text-orange-400">special char</label>
            </div>


          </div>

        </div>
      </main>
    </>
  );
}
