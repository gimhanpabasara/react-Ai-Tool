import "./App.css";
import { useState } from "react";
import { URL } from "./constants";
import Answers from "./components/Answers";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);

  const payload = {
    contents: [
      {
        parts: [
          {
            text: question,
          },
        ],
      },
    ],
  };

  const askQuestion = async () => {
    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    response = await response.json();

    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item) => item.trim());
    // console.log(dataString); 
 
    setResult([...result,{type:'q',text:question},{type:'a',text:dataString}]);

  };

  console.log("====================================");
  console.log(result);
  console.log("====================================");

  return (
    <div className="grid grid-cols-5 h-screen text-center">
      <div className="col-span-1 bg-zinc-700"></div>
      <div className="col-span-4 p-10">
        <div className="container h-130 overflow-y-scroll">
          <div className="text-zinc-300">
            <ul>
              {result.map((item, index) =>
                item.type == "q" ? (
                  <li key={index + Math.random()} className="text-left p-1">
                    <Answers ans={item.text} totalResult={1} index={index} />
                  </li>
                ) : (
                  item.text.map((ansItem, ansIndex) => (
                    <li
                      key={ansIndex + Math.random()}
                      className="text-left p-1"
                    >
                      <Answers
                        ans={ansItem}
                        totalResult={item.length}
                        index={ansIndex}
                      />
                    </li>
                  ))
                )
              )}
            </ul>

            {/* <ul>
              {result &&
                result.map((item, index) => (
                  <li key={index} className="text-left p-1">
                    <Answers ans={item} totalResult={result.length} index={index} />
                  </li>
                ))}
            </ul>  */}
          </div>
        </div>

        <div className="bg-zinc-700 w-1/2 p-1 pr-7 text-white m-auto rounded-4xl border border-zinc-400 flex h-16">
          <input
            type="text"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            className="w-full h-full p-3 outline-none"
            placeholder="How can I help you?"
          />
          <button onClick={askQuestion}>Ask</button>
        </div>
      </div>
    </div>
  );
}

export default App;
