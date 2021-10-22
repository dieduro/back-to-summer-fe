import React, { useState } from "react";
import { useAuth } from "../lib/auth";
import ChevronRight from "../icons/ChevronRight";

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, signout } = useAuth();
  
    return (
      <div className="relative inline-block">
        <div>
          <span className="shadow-sm">
            <button
              type="button"
              className="text-secondary flex items-center w-full border px-4 py-2 focus:outline-none focus:ring-blue transition ease-in-out duration-150"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              {user.name}
              <ChevronRight className="h-6 ml-4" />
            </button>
          </span>
        </div>
        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-1 w-56">
            <div className="bg-white border">
              <div
                className="px-4 py-2"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <button
                  onClick={() => {
                    signout();
                  }}
                  className="focus:outline-none focus:ring w-full text-secondary text-left"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };


export default UserMenu;
  