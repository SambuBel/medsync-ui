import React from "react";
import AppLink from "../AppLink";
import Group from "./Group";
import Theme from "../Theme";
import Image from "../Image";
import SocialMedia from "../SocialMedia";

const Footers = ({ navigation }) => {
  return (
    <footer className="border-t border-gray-300 dark:border-gray-600 bg-blue-900 dark:bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start border-b border-gray-300 dark:border-gray-600 pb-8">
          {/* Logo y descripción */}
          <div className="flex-grow md:w-1/3 md:pr-8 mb-8 md:mb-0">
            <AppLink href="/">
              <Image
                size={{ width: "92px", height: "92px" }}
                className="w-24"
                src={navigation["logo"]?.imgix_url}
                srcDark={navigation["logo"]?.imgix_url}
                alt="Logo"
                objectFit="contain"
              />
            </AppLink>
            <p className="max-w-xs text-sm mt-4">The New Creative Economy.</p>
            <div className="flex items-center mt-4">
              <p className="mr-4 text-sm">Dark theme</p>
              <Theme className="theme-big" />
            </div>
          </div>

          {/* Menú */}
          <div className="md:w-1/3 mb-8 md:mb-0 border-t border-b md:border-none border-gray-300 dark:border-gray-600 py-4 md:py-0">
            <Group item={navigation?.["menu"]} />
          </div>

          {/* Enlaces y redes sociales */}
          <div className="md:w-1/3 md:pl-8">
            <AppLink href="https://www.cosmicjs.com/features">
              <p className="text-white font-semibold hover:text-gray-400 dark:hover:text-blue-500 transition-colors mb-4">
                About Cosmic
              </p>
            </AppLink>
            <AppLink href="https://docs.cosmicjs.com/">
              <p className="text-white font-bold hover:text-gray-400 dark:hover:text-blue-500 transition-colors mb-4">
                Documentation
              </p>
            </AppLink>
            <AppLink href="https://www.cosmicjs.com/contact">
              <p className="text-white font-bold hover:text-gray-400 dark:hover:text-blue-500 transition-colors mb-6">
                Contact Us
              </p>
            </AppLink>
            <SocialMedia />
            <AppLink href="https://cosmicjs.us5.list-manage.com/subscribe/post?u=15433aab34aefd5450c23fd94&id=028c29b6ca">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-md transition-all">
                Subscribe Newsletter
              </button>
            </AppLink>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="flex justify-center items-center py-6 text-gray-400">
        <span className="flex items-center">
          <p className="mr-2 font-semibold">Powered by</p>
          <a href="https://www.cosmicjs.com">
            <Image
              className="w-28"
              size={{ width: "110px", height: "90px" }}
              src="/cosmic.svg"
              alt="Cosmic Logo"
              objectFit="contain"
            />
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footers;
