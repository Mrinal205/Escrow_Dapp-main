import React, {useEffect} from "react";
import { logo, setting } from "../assets";
import { shortenAddress, shortenBalance } from "../utils";
import { useGlobalContext } from "../context";
import { CustomButton } from "../components";

const Navbar = () => {
  const { walletAddress, updateCurrentWalletAddress, balance } = useGlobalContext();

  return (
    <div className="w-full">
      <div className="absolute w-[20%] inset-0  gradient-01 h-40 top-20" />
      <div className="w-full flex flex-row justify-between items-center h-16 ">
        <div className="flex flex-row items-center">
          <img src={logo} alt="logo" className="w-14" />

          <hr className=" border-[0.1px] h-7 mr-2" />
          <span className="font-serif"> Escrow Decentralized App </span>
        </div>
        <div className="flex">
          {walletAddress == "" ? (
            <>
              <CustomButton
                type="button"
                title="Connect"
                handleClick={updateCurrentWalletAddress}
                restStyles=""
              />
            </>
          ) : (
            <>
              <div className="bg-[#111111] p-1 rounded-md mx-2">
                { shortenBalance(balance) } Eth
              </div>
              <div className="bg-[#111111] p-1 rounded-md mx-2">
                {shortenAddress(walletAddress)}
              </div>
              <div className="bg-[#111111] p-1 rounded-md flex items-center justify-center w-7 cursor-pointer">
                <img src={setting} alt="setting" className="w-4" />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-[#111111] h-14 flex mt-5 justify-center items-center">
        <h1 className="font-serif text-[45px] text-gray-400"> Escrow </h1>
      </div>
    </div>
  );
};

export default Navbar;
