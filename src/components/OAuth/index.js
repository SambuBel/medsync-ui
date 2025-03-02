import React, { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import AppLink from "../AppLink";
import Loader from "../Loader";
import registerFields from "../../utils/constants/registerFields";
import { useStateContext } from "../../utils/context/StateContext";
import { setToken } from "../../utils/token";

const OAuth = ({ className = "", handleClose, handleOAuth, disable }) => {
  const { setCosmicUser } = useStateContext();
  const router = useRouter();

  const [{ email, password }, setFields] = useState(() => registerFields);
  const [fillFieldMessage, setFillFieldMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const inputElement = useRef(null);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, [disable]);

  const handleGoHome = () => {
    router.push("/");
  };

  const handleChange = ({ target: { name, value } }) =>
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));

  const submitForm = useCallback(
    async (e) => {
      e.preventDefault();
      fillFieldMessage?.length && setFillFieldMessage("");
      setLoading(true);
      
      if (email && password) {
        const auth = await fetch("/api/auth", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const cosmicUser = await auth.json();

        if (cosmicUser?.user) {
          setCosmicUser(cosmicUser.user);
          setToken({
            id: cosmicUser.user.id,
            first_name: cosmicUser.user.first_name,
            avatar_url: cosmicUser.user.avatar_url,
          });

          setFillFieldMessage("Congrats!");
          handleOAuth(cosmicUser.user);
          setFields(registerFields);
          handleClose();
        } else {
          setFillFieldMessage("Please first register in Cosmic");
        }
      } else {
        setFillFieldMessage("Please fill all fields");
      }
      setLoading(false);
    },
    [fillFieldMessage?.length, email, password, setCosmicUser, handleOAuth, handleClose]
  );

  return (
    <div className={`w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg ${className}`}>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        Authentication with{" "}
        <AppLink target="_blank" href="https://www.cosmicjs.com" className="text-blue-500 hover:underline">
          Cosmic
        </AppLink>
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        To create an item you need to register an account at{" "}
        <AppLink target="_blank" href="https://www.cosmicjs.com" className="text-blue-500 hover:underline">
          Cosmic
        </AppLink>
      </p>
      {fillFieldMessage && <div className="text-blue-500 font-bold mb-2">{fillFieldMessage}</div>}
      <form onSubmit={submitForm} className="space-y-4">
        <div>
          <input
            ref={inputElement}
            className="w-full h-12 px-4 border-b-2 border-gray-300 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-100 outline-none focus:border-blue-500"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={email}
            required
          />
        </div>
        <div>
          <input
            className="w-full h-12 px-4 border-b-2 border-gray-300 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-100 outline-none focus:border-blue-500"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={password}
            required
          />
        </div>
        <div className="mt-6 flex flex-col space-y-4">
          <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition">
            {loading ? <Loader /> : "Continue"}
          </button>
          <button
            type="button"
            onClick={disable ? handleGoHome : handleClose}
            className="w-full border border-gray-300 text-gray-800 dark:text-gray-100 py-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            {disable ? "Return Home Page" : "Cancel"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OAuth;
