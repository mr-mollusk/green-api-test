import { useState } from "react";
import s from "./authPage.module.css";
import { useNavigate } from "react-router-dom";

export const AuthPage = () => {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const navigate = useNavigate();
  const handleAuth = () => {
    localStorage.setItem("idInstance", idInstance);
    localStorage.setItem("apiTokenInstance", apiTokenInstance);
    navigate("/chat");
  };

  return (
    <div className={s.wrapper}>
      <div className={s.authForm}>
        <h2>Авторизируйтесь</h2>
        <div className={s.input}>
          <label htmlFor="idInstance">
            idInstance, да херня твой idInstance
          </label>
          <input
            id="idInstance"
            value={idInstance}
            onChange={(e) => setIdInstance(e.target.value)}
          />
        </div>
        <div className={s.input}>
          <label htmlFor="ApiTokenInstance">ApiTokenInstance</label>
          <input
            id="ApiTokenInstance"
            value={apiTokenInstance}
            onChange={(e) => setApiTokenInstance(e.target.value)}
          />
        </div>
        <button onClick={handleAuth}>Войти</button>
      </div>
    </div>
  );
};
