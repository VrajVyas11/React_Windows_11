import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Lockscreen = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleMobileDetection = useCallback((mobile) => {
    setIsMobile(mobile);
  }, []);

  useEffect(() => {
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if (/android/i.test(userAgent) || (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)) {
        handleMobileDetection(true);
      } else {
        handleMobileDetection(false);
      }
    };

    checkIfMobile();
  }, [handleMobileDetection]);

  const login = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setTimeout(() => {
        navigate(`/${name}`);
        setLoading(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to log in. Please try again later.");
      setTimeout(() => {
        setError("");
      }, 2000);
      setLoading(false);
    }
  };

  const generateInitials = (name) => {
    const words = name.split(" ");
    const initials = words
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
    return initials;
  };

  const UserProfile = ({ name }) => {
    const [userInitials, setUserInitials] = useState("");

    useEffect(() => {
      if (name) {
        setUserInitials(generateInitials(name));
      }
    }, [name]);

    return (
      <div className={`flex items-center justify-center w-28 h-28 ${name ? "bg-red-300" : "bg-gray-200"}  rounded-full text-white text-2xl font-bold select-none`}>
        {name ? (
          <div className="text-black  font-normal text-5xl ">{userInitials}</div>
        ) : (
          <div className="avatar">
            <div className="w-20 flex justify-center items-center rounded-full">
              <img
                src="/apps/profile.png"
                alt="Profile"
                width={60}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  if (isMobile) {
    return (
      <div className="bg-gradient-to-b from-gray-900 to-gray-700 w-full h-screen text-center text-white px-7 overflow-hidden flex flex-col justify-center items-center">
        <div
          className="text-3xl font-extrabold text-red-500 mb-4 tracking-wider"
          style={{ filter: "drop-shadow(10px 10px 10px black)" }}
        >
          Mobile devices are not Supported
        </div>
        <p className="text-xl max-w-xl leading-relaxed">
          We're crafting an experience that shines on larger screens. Please visit us from a desktop or tablet to explore the full potential of this application.
        </p>
        <div className="mt-6 text-lg font-medium opacity-75">
          Mobile support is on the way — stay tuned!
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="absolute bg-black h-[102vh] w-full blur-lg"
        style={{
          background:
            "url(/loginBG.jpg) no-repeat center center",
          backgroundSize: "cover",
        }}
      ></div>

      <div className="absolute left-0 top-0 h-screen w-full flex flex-col items-center z-10">
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center z-50 top-48">
            <div className="inline-block text-white  animate-spin rounded-full border-4 border-solid border-current border-e-transparent h-8 w-8">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {!loading && error && (
          <div
            role="alert"
            className="absolute top-0 left-0 w-full bg-red-500 text-white text-center py-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block mr-2 h-6 w-6"
              fill="white"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <div>{error}</div>
          </div>
        )}
        <form onSubmit={login}>
          <div className="relative left-0 top-64 h-screen w-full flex flex-col items-center z-10">
            <div className="aspect-square w-28 h-28 mb-4">
              <UserProfile name={name} />
            </div>
            <input
              className="my-2 text-2xl text-white bg-transparent text-center outline-none"
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value.trim())}
              placeholder="Enter your name"
              style={{ caretColor: "transparent" }}
              required
            />
            {!loading && name.trim().length > 0 && (
              <>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="bg-black p-2 text-white autofill:text-white rounded-lg bg-opacity-30 w-full max-w-xs focus:outline-none border-[0.5px] border-b-white mt-3 placeholder-white opacity-100::placeholder"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  autoComplete="current-password"
                />
              </>
            )}
            <button
              type="submit"
              className="hidden btn bg-blue-500 text-white mt-4 px-4 py-2 rounded-md"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Lockscreen;
