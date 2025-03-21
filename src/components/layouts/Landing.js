import { Link } from "react-router-dom";
import Footer from "./Footer";
import food1 from "../assets/f1.jpg";
import food2 from "../assets/f2.jpg";
import food3 from "../assets/f3.jpg";
import food4 from "../assets/f4.jpg";
import { BookmarkIcon, ClockIcon, HeartIcon } from "@heroicons/react/outline";
import LandingCarousel from "../carousel/LandingCarousel";
import LoaderMask from "./LoaderMask";
import { useEffect, useState } from "react";
export default function Landing() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timeout);
  }, []);
  return loading ? (
    <LoaderMask />
  ) : (
    <>
      <LandingCarousel />

      <section className="bg-orange-100 ">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
            <div className="space-y-5 sm:space-y-4">
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                Food has a huge impact on our lives and society
              </h2>
              <p className="text-xl text-gray-500">
                Food blogs are more than just a way to share recipes and cooking
                techniques. They have a profound impact on our culture, our
                environment and our health.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
              <img
                src={food1}
                alt="food1"
                className="h-56 w-full object-cover rounded-lg"
              />
              <img
                src={food2}
                alt="food2"
                className="h-56 w-full object-cover rounded-lg"
              />
              <img
                src={food3}
                alt="food3"
                className="h-56 w-full object-cover rounded-lg"
              />
              <img
                src={food4}
                alt="food4"
                className="h-56 w-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 bg-teal-50 rounded-lg m-1 ring-1 ring-orange-100">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div>
            <Link
              to="/recipe"
              className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-white uppercase rounded-full bg-teal-600"
            >
              Explore
            </Link>
          </div>
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <span className="relative inline-block">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
              >
                <defs>
                  <pattern
                    id="ea469ae8-e6ec-4aca-8875-fc402da4d16e"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                  >
                    <circle cx="1" cy="1" r=".7" />
                  </pattern>
                </defs>
                <rect
                  fill="url(#ea469ae8-e6ec-4aca-8875-fc402da4d16e)"
                  width="52"
                  height="24"
                />
              </svg>
              <span className="relative">Share</span>
            </span>{" "}
            your recipes to the world.
          </h2>
          <p className="text-base text-gray-700 md:text-lg">
            Like to try out new foods? Have a recipe that you would like to
            share to the world? Great! Start your journey here ...
          </p>
        </div>
        <div className="grid gap-8 row-gap-10 lg:grid-cols-2">
          <div className="max-w-md sm:mx-auto sm:text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-teal-50 sm:mx-auto sm:w-24 sm:h-24">
              <svg
                className="w-12 h-12 text-teal-800 sm:w-16 sm:h-16"
                stroke="currentColor"
                viewBox="0 0 52 52"
              >
                <polygon
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  points="29 13 14 29 25 29 23 39 38 23 27 23"
                />
              </svg>
            </div>
            <h6 className="mb-3 text-xl font-bold leading-5">
              Create a recipe
            </h6>
            <p className="mb-3 text-sm text-gray-900">
              Mix together 1 large smile, 2 cups of sweetness and positivity , A
              good sense of humour, 1 cup of self esteem AND a heart full of
              love and share it to the world.
            </p>
          </div>
          <div className="max-w-md sm:mx-auto sm:text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-teal-50 sm:mx-auto sm:w-24 sm:h-24">
              <svg
                className="w-12 h-12 text-teal-800 sm:w-16 sm:h-16"
                stroke="currentColor"
                viewBox="0 0 52 52"
              >
                <polygon
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  points="29 13 14 29 25 29 23 39 38 23 27 23"
                />
              </svg>
            </div>
            <h6 className="mb-3 text-xl font-bold leading-5">
              Get other people's recipes
            </h6>
            <p className="mb-3 text-sm text-gray-900">
              Food for us comes from our relatives, whether they have wings or
              fins or roots. That is how we consider food. Food has a culture.
              It has a history. It has a story. It has relationships. Discover
              now!
            </p>
          </div>
          <div className="max-w-md sm:mx-auto sm:text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-teal-50 sm:mx-auto sm:w-24 sm:h-24">
              <svg
                className="w-12 h-12 text-teal-800 sm:w-16 sm:h-16"
                stroke="currentColor"
                viewBox="0 0 52 52"
              >
                <polygon
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  points="29 13 14 29 25 29 23 39 38 23 27 23"
                />
              </svg>
            </div>
            <h6 className="mb-3 text-xl font-bold leading-5">Like a recipe</h6>
            <p className="mb-3 text-sm text-gray-900">
              This magical, marvelous food on our plate, this sustenance we
              absorb, has a story to tell. It has a journey. It leaves a
              footprint. It leaves a legacy.
            </p>
          </div>
          <div className="max-w-md sm:mx-auto sm:text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-teal-50 sm:mx-auto sm:w-24 sm:h-24">
              <svg
                className="w-12 h-12 text-teal-800 sm:w-16 sm:h-16"
                stroke="currentColor"
                viewBox="0 0 52 52"
              >
                <polygon
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  points="29 13 14 29 25 29 23 39 38 23 27 23"
                />
              </svg>
            </div>
            <h6 className="mb-3 text-xl font-bold leading-5">Save a recipe</h6>
            <p className="mb-3 text-sm text-gray-900">
              Save your favorite recipes. A recipe has no soul. You as the cook
              must bring soul to the recipe.
            </p>
          </div>
        </div>
      </div>
      <section className="bg-orange-300">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Explore the world of recipes</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/recipes"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-teal-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col">
              <div className="flex items-center">
                <ClockIcon
                  className="flex-shrink-0 h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
                <h3 className="ml-3 text-lg font-medium text-gray-900">
                  Time-saving recipes
                </h3>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Our recipes are designed to be quick and easy to make, so you
                can spend more time enjoying your meal and less time in the
                kitchen.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <HeartIcon
                  className="flex-shrink-0 h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
                <h3 className="ml-3 text-lg font-medium text-gray-900">
                  Healthy recipes
                </h3>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                We believe that healthy food should be delicious and accessible
                to everyone. Our recipes are designed to be nutritious and easy
                to make.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <BookmarkIcon
                  className="flex-shrink-0 h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
                <h3 className="ml-3 text-lg font-medium text-gray-900">
                  Save your favorite recipes
                </h3>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Create an account to save your favorite recipes and access them
                from anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-orange-100">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col">
              <div className="flex items-center">
                <svg
                  className="flex-shrink-0 h-6 w-6 text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a8 8 0 00-8 8 8 8 0 0016 0 8 8 0 00-8-8zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                </svg>
                <h3 className="ml-3 text-lg font-medium text-gray-900">
                  International Recipes
                </h3>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Discover a diverse range of international recipes that will take
                your taste buds on a culinary journey around the world.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <svg
                  className="flex-shrink-0 h-6 w-6 text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a8 8 0 00-8 8 8 8 0 0016 0 8 8 0 00-8-8zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                </svg>
                <h3 className="ml-3 text-lg font-medium text-gray-900">
                  Vegan Recipes
                </h3>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Our collection of vegan recipes ensures that you can enjoy
                delicious meals without compromising on flavor or nutrition.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <svg
                  className="flex-shrink-0 h-6 w-6 text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a8 8 0 00-8 8 8 8 0 0016 0 8 8 0 00-8-8zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                </svg>
                <h3 className="ml-3 text-lg font-medium text-gray-900">
                  Dessert Recipes
                </h3>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Indulge in our sweet and delightful dessert recipes, perfect for
                satisfying your sweet tooth and impressing your guests.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
