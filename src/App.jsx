import './App.css'
import { useState } from 'react'
import { URL } from './constants';
import Answers from './components/Answers';

function App() {

  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(undefined);

  const payload = {
    "contents": [
      {
        "parts": [
          {
            "text": question
          }
        ]
      }
    ]
  }


  const askQuestion = async () => {
    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payload)
    })

    response = await response.json();
    
    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map(item => item.trim());

    console.log('====================================');
    console.log(dataString);
    console.log('====================================');
    setResult(dataString) 
  }

  

  return (
      <div className='grid grid-cols-5 h-screen text-center'>
        <div className='col-span-1 bg-zinc-700'></div>
        <div className='col-span-4 p-10'>
          <div className="container h-180 overflow-y-scroll">
            <div className='text-white'> 
            {/* {result} */}
              {
              result && result.map((item,index) => (
                  <Answers ans = {item} key={index} />
                ))
              }
            </div> 
        </div>
        
          <div className='bg-zinc-700 w-1/2 p-1 pr-7 text-white m-auto rounded-4xl border border-zinc-400 flex h-16'>
          <input type="text"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            className='w-full h-full p-3 outline-none'
            placeholder='How can I help you?'
          />
            <button onClick={askQuestion}>Ask</button>
          </div>
        </div>
      </div>
  )
}

export default App
 