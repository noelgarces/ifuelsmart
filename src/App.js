import { useAuth0 } from "@auth0/auth0-react";
import { lazy, Suspense } from "react";
import "./app.css";
const AuthApp = lazy(() => import("auth-app"));
const UnAuthApp = lazy(() => import("unauth-app"));

const App = () => {
  const { isLoading, user } = useAuth0();

  if (isLoading) {
    return (
      <div className="h-screen bg-gray-800 grid place-items-center text-white">
        <div className="flex flex-col items-center px-8 max-w-xs md:max-w-lg text-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-9 w-9"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <h2 className="text-xl font-semibold mt-3">Loading...</h2>
          <p className="mt-1">This may take a few seconds, please don't close this page.</p>
        </div>
      </div>
    );
  }

  console.log(user);

  return (
    <Suspense
      fallback={
        <div className="h-screen bg-gray-800 grid place-items-center text-white">
          <div className="flex flex-col items-center px-8 max-w-xs md:max-w-lg text-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-9 w-9"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <h2 className="text-xl font-semibold mt-3">Loading...</h2>
            <p className="mt-1">This may take a few seconds, please don't close this page.</p>
          </div>
        </div>
      }
    >
      {user ? <AuthApp /> : <UnAuthApp />}
    </Suspense>
  );
};

export default App;
