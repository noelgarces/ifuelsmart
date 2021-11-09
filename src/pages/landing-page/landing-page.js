import { useAuth0 } from "@auth0/auth0-react";
import logoOrange from "assets/logo-orange.png";
import heroImage from "assets/banner-background.png";

const LandingPage = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
      <header className="flex justify-between max-w-screen-xl px-6 py-4 mx-auto lg:px-8 xl:px-4 lg:py-6">
        <a href="/">
          <span className="sr-only">SaaS landing page</span>
          <img src={logoOrange} alt="" srcSet="" width="180" />
        </a>
        <nav className="flex items-center space-x-4">
          <button
            type="button"
            className="inline-block px-5 py-2 font-semibold text-white rounded-lg bg-gradient-to-br from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-700 "
            onClick={() => loginWithRedirect()}
          >
            Sign In
          </button>
        </nav>
      </header>

      <div className="py-12 bg-gradient-to-r from-gray-800 to-gray-700 md:py-24">
        <div className="grid max-w-screen-xl px-6 mx-auto lg:px-8 xl:px-4 md:grid-cols-4 xl:grid-cols-5 gap-x-12 lg:gap-x-20">
          <div className="self-center order-2 col-span-2 mt-12 md:order-1 md:mt-0">
            <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl lg:text-5xl md:mb-4 lg:mb-8">
              Fuel Purchase Optimization
            </h1>
            <p className="mb-6 text-lg text-gray-300 xl:text-xl lg:mb-8 xl:mb-10">
              A system developed for transportation pros by transportation pros
            </p>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Enter your email..."
                className="flex-1 p-4 leading-none border border-gray-200 rounded-lg focus:outline-none"
              />
              <button className="inline-block px-5 py-2 font-semibold text-white rounded-lg focus:outline-none bg-gradient-to-br from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-700 ">
                Get Optimized
              </button>
            </div>
          </div>
          <div className="order-1 col-span-2 md:order-2 xl:col-span-3">
            <img src={heroImage} className="rounded-lg shadow-2xl" alt="" />
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-8 xl:px-4 py-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
        <div>
          <h5 className="text-lg font-bold text-gray-700">Optimal Fueling Stations</h5>
          <p className="mt-1 text-sm text-gray-700">
            Buying fuel at the wrong fueling stations is costing you thousands of dollars a year. Let iFuelSmart tell
            you exactly where to stop on your route and how much to buy at the lowest price.
          </p>
        </div>
        <div>
          <h5 className="text-lg font-bold text-gray-700">Boost Profits</h5>
          <p className="mt-1 text-sm text-gray-700">
            Save up to 20 cents per gallon with an optimal fuel purchase plan for your trucks. A few pennies saved on
            fuel every day can put your money back in your pocket.
          </p>
        </div>
        <div>
          <h5 className="text-lg font-bold text-gray-700">Custom Route</h5>
          <p className="mt-1 text-sm text-gray-700">
            Generate an optimal fuel plan based on your preferred traveling route for your trucks with iFuelSmart.
          </p>
        </div>
        <div>
          <h5 className="text-lg font-bold text-gray-700">Bound by Contract</h5>
          <p className="mt-1 text-sm text-gray-700">
            If you have a negotiated contract price with a truck stop chain, our fuel optimizer can use your discounted
            fuel prices to generate an optimal fueling plan.
          </p>
        </div>
      </div>

      <footer className="bg-gray-50 py-12 text-gray-600">
        <p className="text-sm text-center">©2021 ifuelsmart. All rights reserved.</p>
      </footer>
    </>
  );
};

export default LandingPage;
