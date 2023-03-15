import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Setup.scss";

export default function Home(): JSX.Element {
  const [chooseWord, setchooseWord] = useState(false);

  const navigate = useNavigate();

  const onSubmitHandler = (
    event: React.SyntheticEvent<HTMLFormElement> | any | undefined
  ) => {
    event.preventDefault();

    // Set Loading to be True
    setchooseWord(true);

    // Get Nickname value
    const Nickname: string = event.target.nickname.value.trim();

    // Do Nothing is Nickname is empty
    if (!Nickname) {
      return;
    }

    setTimeout(() => {
      // Set Loading to be False
      setchooseWord(false);

      // Save to Local Storage
      localStorage.setItem("nickname", Nickname);

      // Set back to empty String
      event.target.nickname.value = "";

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
              <form
                className="hq-app-form"
                method="POST"
                onSubmit={onSubmitHandler}
              >
                <input
                  type="text"
                  name="nickname"
                  id="nickname"
                  placeholder="Please Start typing ..."
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    e.target.value
                  }
                />
                <button>{!chooseWord ? "Continue" : "Loading..."}</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
