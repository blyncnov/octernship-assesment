import React from "react";

import "./Playground.scss";

import { MdDelete } from "react-icons/md";

const Play = () => {
  // const [word, setWord] = useState([]);

  // Get Word from Local Storage
  const My_Word: any = localStorage.getItem("word")?.split("");

  return (
    <div className="playground_container">
      <div className="playground">
        {My_Word.map((letter: any, index: any) => {
          return (
            <div className="card" key={index}>
              <div className="h_word">
                <h2>{letter} </h2>
              </div>
              <div className="h_icon">
                <h2>
                  <MdDelete />
                </h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Play;
