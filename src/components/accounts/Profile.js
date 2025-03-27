import { useEffect, useState } from "react";
import { PencilIcon } from "@heroicons/react/solid";
import { useAuthStore } from "../../zustand/useAuthStore";

export default function Profile() {
  const {user, updateUser, changePassword} = useAuthStore();
  const [avatar, setAvatar] = useState(process.env.HOST || "http://localhost:3415/media/" + user.image);

  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);

  const [picture, setPicture] = useState(null);

  const [opassword, setOpassword] = useState(null);
  const [npassword, setNpassword] = useState(null);

  
  const handleAvatarChange = () => {
    setAvatar(URL.createObjectURL(picture));
  };


  const handleUserUpdate = () => {
    const formdata = new FormData();
    formdata.append("first_name", firstName);
    formdata.append("last_name", lastName);
    formdata.append("email", email);
    if(picture)
      formdata.append("image", picture);
    updateUser(formdata)
  }

  useEffect (() => {
    if (picture) {
      handleAvatarChange();
    }
  }, [picture]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl leading-9 font-bold text-gray-900">
          Update Profile
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-lg shadow px-4 py-6">
            <div className="flex items-center">
              <label htmlFor="picture" className="relative cursor-pointer">
                <img
                  className="h-20 w-20 rounded-full block"
                  src={
                    avatar
                      ? avatar
                      : "https://res.cloudinary.com/dmtc1wlgq/image/upload/v1641911896/media/avatar/default_zrdbiq.png"
                  }
                  alt=""
                />
                <div
                  className="ml-2 bg-white py-2 px-2 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                
                >
                  Change
                </div>

                <input
                  id="picture"
                  name="picture"
                  type="file"
                  className="sr-only"
                  onChange={(e) => {
                    setPicture(e.target.files[0]);
                  }}
                />

                
              </label>
              
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="first-name" className="sr-only">
                  First Name
                </label>
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="First Name"
                  defaultValue={user.first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="last-name" className="sr-only">
                  Last Name
                </label>
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  autoComplete="family-name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Last Name"
                  defaultValue={user.last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-2">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                defaultValue={user.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
          type="button"
          className="inline-flex justify-center mt-2 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-emerald-700 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          onClick={() => handleUserUpdate()}
        >
          <PencilIcon
            className="-ml-1 mr-2 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <span>Save Changes</span>
        </button>
          </div>
          
        </div>
        
      </div>

      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl leading-9 font-bold text-gray-900">
          Change Password
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-lg shadow px-4 py-6">
            <div>
              <label htmlFor="opassword" className="sr-only">
                Old Password
              </label>
              <input
                id="opassword"
                name="opassword"
                type="password"
                autoComplete="old-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Old Password"
                onChange={(e) => setOpassword(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <label htmlFor="password" className="sr-only">
                New Password
              </label>
              <input
                id="npassword"
                name="npassword"
                type="npassword"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="New Password"
                onChange={(e) => setNpassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="inline-flex justify-center mt-2 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-emerald-700 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              onClick={() => changePassword(opassword,npassword)}
            >
              <PencilIcon
                className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

