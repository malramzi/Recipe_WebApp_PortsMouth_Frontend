import React from "react";
import { Carousel } from "react-responsive-carousel";
import bannerImg1 from "../assets/6.jpg";
import bannerImg2 from "../assets/7.jpg";
import bannerImg3 from "../assets/8.jpg";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default () => (
  <Carousel autoPlay>
    <div className="bg-orange-900 w-full">
      <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl text-white">
            Discover, save and make your favorite recipes
          </h1>

          <p className="max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl text-gray-400">
            Explore and save recipes from around the world. Make and customize your favorite dishes with our easy-to-use recipe builder.
          </p>

          <div className="flex gap-4 justify-center">
            <Link to="/recipe" className="bg-teal-600 text-white px-5 py-3 rounded-lg hover:bg-white hover:text-teal-600">
              Explore
            </Link>

            <Link to="/signup" className="bg-white text-orange-600 px-5 py-3 rounded-lg hover:bg-orange-600 hover:text-white">
              Sign up to create & save recipes
            </Link>
          </div>
        </div>

        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex rounded-md shadow-lg shadow-black overflow-hidden">
          <img
            src={bannerImg3}
            alt="hero image"
          />
        </div>
      </div>
    </div>

    <div className="bg-teal-900 w-full">
      <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl text-white">
            Find and save your favorite recipes
          </h1>

          <p className="max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl text-gray-400">
            Explore our collection of over 1000+ recipes, from international
            dishes to quick and easy meals. You can find the perfect recipe for
            dinner tonight and save it for later.
          </p>

          <div className="flex gap-4 justify-center">
            <Link to="/recipe" className="bg-orange-400 text-white px-5 py-3 rounded-lg hover:bg-white hover:text-orange-400">
              Explore
            </Link>

            <Link to="/signup" className="bg-white text-orange-600 px-5 py-3 rounded-lg hover:bg-orange-600 hover:text-white">
              Sign up to create & save recipes
            </Link>
          </div>
        </div>

        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex rounded-md shadow-lg shadow-black overflow-hidden">
          <img
            src={bannerImg1}
            alt="hero image"
          />
        </div>
      </div>
    </div>

    <div className="bg-slate-800 w-full">
      <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl text-white">
           Discover new dishes, ingredients and cooking techniques.
          </h1>

          <p className="max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl text-gray-400">
            Find new recipes, save them to your cookbook and make them with our
            easy-to-use recipe creator. Discover new dishes, ingredients and
            cooking techniques.
          </p>

          <div className="flex gap-4 justify-center">
            <Link to="/recipe" className="bg-slate-600 text-white px-5 py-3 rounded-lg hover:bg-white hover:text-slate-600">
              Explore
            </Link>

            <Link to="/signup" className="bg-white text-slate-600 px-5 py-3 rounded-lg hover:bg-slate-600 hover:text-white">
              Sign up to create & save recipes
            </Link>
          </div>
        </div>

        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex rounded-md shadow-lg shadow-black overflow-hidden">
          <img
            src={bannerImg2}
            alt="hero image"
          />
        </div>
      </div>
    </div>
  </Carousel>
);

