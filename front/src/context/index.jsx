import React, { useContext, createContext, useState, useEffect } from "react";
import { Contract, ethers } from "ethers";
import Web3Modal, { local } from "web3modal";
import { GetParams } from "../utils";
import { deploy, initEscrow, getEscrows, approveEscrow } from "../contract";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [provider, setProvider] = useState();
  const [contract, setContract] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [showTable, setShowTable] = useState(false);
  const [balance, setBalance] = useState();
  const [signer, setSigner] = useState();
  const [escrows, setEscrows] = useState([]);
  // const provider = new ethers.providers.Web3Provider(window.ethereum);

  const [showAlert, setShowAlert] = useState({
    status: false,
    type: "info",
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const updateCurrentWalletAddress = async () => {
    const accounts = await providers.send("eth_requestAccounts", []);
    if (accounts) setWalletAddress(accounts[0]);
  };

  const deployContract = async () => {
    console.log(signer, "signer");
    const contract = await deploy(signer);
    console.log(contract);
    setContract(contract);
    localStorage.setItem("contract", contract);
  };

  const initContract = async (arbiter, beneficiary, value) => {
    const init = await initEscrow(
      contract,
      arbiter,
      beneficiary,
      ethers.utils.parseEther(value)
    );
    console.log("__________I N I T__________");
    setShowAlert({
      status: true,
      type: "success",
      message: "Contract initiated successfully",
    });
    console.log(init);
  };

  const approve = async (address) => {
    let isAddressPresent = false;

    for (let i = 0; i < escrows.length; i++) {
      for (let j = 0; j < escrows[i].length; j++) {
        if (escrows[i][j] === address) {
          isAddressPresent = true;
          break;
        }
      }
    }

    if (!isAddressPresent) {
      setShowAlert({
        status: true,
        type: "error",
        message: "Contract not found",
      });
      return;
    }
    await approveEscrow(address);
  }

  useEffect(() => {
    if (
      walletAddress != "" &&
      parseInt(window.ethereum.chainId, 16) == 11155111
    )
      setShowTable(true);

    // getBalance();
  }, [walletAddress]);

  useEffect(() => {
    // get provider and signer from local storage
    // const pr = localStorage.getItem("provider");
    // const si = localStorage.getItem("signer");
    // setSigner(si);
    // setProvider(pr);

    const Balance = async () => {
      setProvider(new ethers.providers.Web3Provider(window.ethereum));
      let bal = await provider.getBalance(walletAddress);
      setBalance(ethers.utils.formatEther(bal));
    };
    Balance();
  }, [walletAddress]);

  useEffect(() => {
    // verify if there is a contract in local storage
    const CONTRACT = localStorage.getItem("contract");
    if (CONTRACT) {
      setContract(CONTRACT);
    }
  }, [contract]);

  useEffect(() => {
    if (showAlert?.status) {
      const timer = setTimeout(() => {
        setShowAlert({ status: false, type: "info", message: "" });
      }, [5000]);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  useEffect(() => {
    if (contract) {
      const getAllEscrows = async () => {
        const Escrows = await getEscrows(contract);
        Escrows.forEach((escrow) => {
          setEscrows((prev) => [...prev, escrow]);
        });
      };
      getAllEscrows();
    }
  }, [contract]);


  return (
    <GlobalContext.Provider
      value={{
        contract,
        walletAddress,
        setWalletAddress,
        showAlert,
        setShowAlert,
        errorMessage,
        setErrorMessage,
        updateCurrentWalletAddress,
        provider,
        modalIsOpen,
        setIsOpen,
        showTable,
        deployContract,
        initContract,
        balance,
        escrows,
        approve,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
