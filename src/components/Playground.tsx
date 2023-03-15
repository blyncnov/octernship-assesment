import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

// CSS STYLE
import "./Playground.scss";

// Colors Properties
// import { useColor } from "../utils/useColor";

// Icons
import { MdDelete } from "react-icons/md";

const Play = () => {
  const navigate = useNavigate();

  const [word, setWord] = useState<string | any>(
    localStorage.getItem("word")?.split("")
  );
  const [showModal, setShowModal] = useState(false);

  // Original Word
  let original_word = localStorage.getItem("word");

  // Is There a word set already?
  useEffect(() => {
    if (original_word) {
      return console.log("HURRAY!! YOU HAVE A WORD");
    } else {
      return navigate("/");
    }
  }, [navigate, original_word]);

  // Delete duplicates except at index
  const DeleteDuplicateHandler = (word: any, character: any) => {
    var New_Word = [];

    let indexOfSelection = word.indexOf(character);
    console.log(indexOfSelection);

    for (let k = 0; k <= indexOfSelection; k++) {
      New_Word.push(word[k]);
    }
    // console.log(New_Word, "old selection");

    for (let i = indexOfSelection; i < word.length; i++) {
      if (word[i] !== character) {
        New_Word.push(word[i]);
      }
    }

    setWord(New_Word);
    setShowModal(true);

    // Check if the new word contains duplicate
    const DoesTextContainsDuplicates = (str: any) => {
      let set = new Set();

      for (let i = 0; i < str.length; i++) {
        if (str[i] !== " ") {
          if (set.has(str[i])) {
            return true;
          }
          set.add(str[i]);
        }
      }

      return false;
    };

    console.log(word.join(""));

    // Show Sucess modal if it does not
    if (!DoesTextContainsDuplicates(word.join(""))) {
      setWord(New_Word);
      // Show Modal
      console.log("Nice Sucess");
    } else {
      return;
    }
  };

  return (
    <div className="playground_container">
      {showModal && (
        <div className="success_modal">
          <h2>Original Word : {original_word} </h2>
          <h2>New result : {word.join("")} </h2>
        </div>
      )}
      <div className="playground">
        {word?.map((letter: any, index: any) => {
          return (
            <div className="card" key={index}>
              <div className="h_word">
                <h2>{letter} </h2>
              </div>
              <div
                className="h_icon"
                onClick={() => DeleteDuplicateHandler(word, letter)}
              >
                <h2>
                  <MdDelete />
                </h2>
              </div>
            </div>
          );
        })}
      </div>
      <Link to="/">
        <button>Go Back</button>
      </Link>
    </div>
  );
};

export default Play;
