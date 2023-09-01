import React, { useState, useEffect} from "react";
import { useGlobalContext } from "../context";
import { shortenAddress , mediumAddress} from "../utils";
import { CopyToClipboard } from "."
const Datatable = () => {
  const { escrows } = useGlobalContext();


  return (
    <div className="w-full drop-shadow-md blurback mb-3 mt-5 rounded-lg">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">
              Escrow Factory
            </h2>
          </div>
          <div className="my-2 flex sm:flex-row flex-col">
            <div className="flex flex-row mb-1 sm:mb-0">
              <div className="relative">
                <select className="appearance-none h-full rounded-l border block w-full bg-siteDimBlack border-gray-400  py-2 px-4 pr-8 leading-tight focus:outline-none  focus:border-gray-500">
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div className="relative">
                <select className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block  w-full bg-siteDimBlack border-gray-400  py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r  focus:border-gray-500">
                  <option>All</option>
                  <option>Mine</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="block relative">
              <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current text-gray-500"
                >
                  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                </svg>
              </span>
              <input
                placeholder="Search"
                className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-siteDimBlack text-sm placeholder-gray-400 focus:placeholder-gray-600  focus:outline-none"
              />
            </div>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#111111] text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Escrow
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#111111] text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Owner
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#111111] text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      id
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#111111] text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody>
                  {escrows &&
                    escrows?.map((escrow, index) => (
                      <tr key={`${escrow[2]}-${index}`}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-[#181818]  text-sm">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              {/* <img
                                className="w-full h-full rounded-full"
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                alt=""
                              /> */}
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-100 whitespace-no-wrap">
                                {mediumAddress(escrow[0])}{" "}
                                <CopyToClipboard text={escrow[0]} />
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-[#181818] text-sm">
                          <p className="text-gray-100 whitespace-no-wrap">
                            {escrow[1]}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-[#181818] text-sm">
                          <p className="text-gray-100 whitespace-no-wrap">
                            {escrow[2].toString()}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-[#181818] text-sm">
                          <span className="relative inline-block px-3 py-1 font-semibold leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">Initiate</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="px-5 py-5 bg-[#111111] border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                <span className="text-xs xs:text-sm text-gray-300">
                  Showing 1 to 4 of 50 Entries
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button className="text-sm bg-[#181818] hover:bg-[#111111] text-gray-300 font-semibold py-2 px-4 rounded-l">
                    Prev
                  </button>
                  <button className="text-sm bg-[#181818] hover:bg-[#111111] text-gray-300 font-semibold py-2 px-4 rounded-r">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Datatable;
