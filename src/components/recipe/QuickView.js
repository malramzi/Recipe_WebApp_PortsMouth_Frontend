import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import {
  XIcon,
  HeartIcon,
  BookmarkIcon,
  ClockIcon,
} from "@heroicons/react/outline";
import { useRecipeStore } from "../../zustand/useRecipeStore";

export default function QuickView({ open, setOpen, id }) {
  const { recipes } = useRecipeStore();

  const recipe = recipes.filter((recipe) => recipe.id === id);

  const [like, setLike] = useState(recipe.liked_by.length);
  const [bookmark, setBookmark] = useState(recipe.saved_by.length);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setOpen}
        >
          <div
            className="flex min-h-screen text-center md:block md:px-2 lg:px-4"
            style={{ fontSize: 0 }}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
            </Transition.Child>

            <span
              className="hidden md:inline-block md:align-middle md:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
                <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
                    <div className="sm:col-span-4 lg:col-span-5">
                      <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden">
                        <img
                          src={recipe.picture}
                          alt=""
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-extrabold text-gray-900 sm:pr-12">
                        {recipe.title}
                      </h2>

                      <section
                        aria-labelledby="information-heading"
                        className="mt-3"
                      >
                        <h3 id="information-heading" className="sr-only">
                          Recipe information
                        </h3>
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-teal-600 ">
                          {recipe.category.name}
                        </span>

                        <div className="mt-6">
                          <h4 className="sr-only">Description</h4>

                          <p className="text-sm text-gray-700">
                            {recipe.description}
                          </p>
                        </div>
                      </section>

                      <section
                        aria-labelledby="options-heading"
                        className="mt-2"
                      >
                        <div className="flex sm:flex-col1">
                          <button
                            type="button"
                            className="group py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                            onClick={() => {
                              setBookmark(bookmark + 1);
                            }}
                          >
                            <BookmarkIcon
                              className="h-6 w-6 flex-shrink-0"
                              aria-hidden="true"
                            />
                            <p className="hidden ml-1 group-hover:block">
                              Save
                            </p>
                            <span className="ml-2">{bookmark}</span>
                          </button>
                          <button
                            type="button"
                            className="group py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                            onClick={() => {
                              setLike(like + 1);
                            }}
                          >
                            <HeartIcon
                              className="h-6 w-6 flex-shrink-0"
                              aria-hidden="true"
                            />
                            <p className="hidden ml-1 group-hover:block">
                              Like
                            </p>
                            <span className="ml-2">{like}</span>
                          </button>
                        </div>

                        <div className="flex justify-between">
                          <div className="inline-flex items-center text-teal-600 border py-1 px-2 mt-3 border-transparent bg-teal-50 rounded-md">
                            <ClockIcon className="h-8 w-8 text-teal-600 pr-1" />{" "}
                            <span className="font-medium">
                              {recipe.cook_time}
                            </span>
                          </div>
                          <p className="mt-8 text-sm font-weight text-gray-500 truncate">
                            by {recipe.username}
                          </p>
                        </div>

                        <div className="mt-6">
                          <Link
                            to={`/recipe/${id}`}
                            className="font-medium text-teal-600 hover:text-teal-500"
                          >
                            <button
                              type="submit"
                              className="w-full bg-teal-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-cyan-500"
                            >
                              View Full Detail
                            </button>
                          </Link>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
