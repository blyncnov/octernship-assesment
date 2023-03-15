import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Setup.scss";

export default function Home(): JSX.Element {
  const [chooseWord, setchooseWord] = useState(false);
  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();

  const onSubmitHandler = (
    event: React.SyntheticEvent<HTMLFormElement> | any | undefined
  ) => {
    event.preventDefault();

    // Set Loading to be True
    setchooseWord(true);

    // Get My_Word value
    const My_Word: string = event.target.word.value.trim();

    // Reusable error function
    function LaunchErrorModal() {
      setchooseWord(false);
      setTimeout(() => {
        setHasError(true);
      }, 1000);

      // return to false
      setHasError(false);
    }

    // Do Nothing is My_Word is empty
    if (!My_Word) {
      return LaunchErrorModal();
    }

    setTimeout(() => {
      // Set Loading to be False
      setchooseWord(false);

      // Save to Local Storage
      localStorage.setItem("word", My_Word);

      // Set back to empty String
      event.target.word.value = "";

      // Push to Start hq page
      navigate("/playground");
    }, 3000);
  };

  return (
    <>
      <main>
        <div className="hq-app-section">
          <div className="hq-app-container">
            <div className="hq-app-text-container">
              <h2>Please Choose a Word</h2>
            </div>
            <div className="hq-app-form-container">
              {hasError && (
                <>
                  <div className="error_modal">
                    <p>Please provide a non-empty value</p>
                  </div>
                </>
              )}
              <form
                className="hq-app-form"
                method="POST"
                onSubmit={onSubmitHandler}
              >
                <input
                  type="text"
                  name="nickname"
                  id="word"
                  placeholder="Please Start typing ..."
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    e.target.value
                  }
                />
                <button>{!chooseWord ? "Submit" : "Loading..."}</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
