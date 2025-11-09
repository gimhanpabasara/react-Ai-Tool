import { useEffect, useState } from "react";
import { checkHeading, replaceHeadingStarts } from "../helper";

const Answers = ({ ans, totalResult, index }) => {
  const [heading, setHeading] = useState(false);
  const [answer, setAnswer] = useState(ans);

  console.log("====================================");
  console.log(index);
  console.log("====================================");

  useEffect(() => {
    if (checkHeading(ans)) {
      setHeading(true);
      setAnswer(replaceHeadingStarts(ans));
    }
  }, []);

  //   function checkHeading(str) {
  //     return /^(\*)(\*)(.*)\*$/.test(str);
  //   }

  return (
    <>
      {index==0 && totalResult > 1? (
        <span className="text-2xl">{answer}</span>
      ) : heading ? (
        <span className="pt-2 text-lg block">{answer}</span>
      ) : (
        <span className="pl-5">{answer}</span>
      )}
    </>
  );
};

export default Answers;
