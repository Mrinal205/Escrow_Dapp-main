import contract from './Escrow.json'
import { ethers } from 'ethers'
export const factoryAddress = '0x20eD5669D44F9CD6D50ABdF150F5b4c099B4ba46'

export const { abi: ABI, bytecode: BYTECODE } = contract


async function connectWithMetaMask() {
  // Check if MetaMask is installed
  if (typeof window.ethereum === 'undefined') {
    throw new Error('Please install MetaMask to access this feature.');
  }

  // Request access to the user's MetaMask accounts
  await window.ethereum.request({ method: 'eth_requestAccounts' });

  // Create a new instance of ethers.js provider
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  // Get the signer object
  const signer = provider.getSigner();

  console.log('Signer:', signer);

  // Return the signer
  return signer;
}

export const deploy  = async () => {
  try {
    // Connect with MetaMask and get the signer
    const signer = await connectWithMetaMask();

    console.log('Deploying with signer:', signer);

    // Deploy the smart contract using the signer
    const contractFactory = new ethers.ContractFactory(ABI, BYTECODE, signer);
    const contract = await contractFactory.deploy(factoryAddress);

    // Wait for the contract to be deployed
    await contract.deployed();

    // Get the deployed contract's address
    const contractAddress = contract.address;

    console.log('Contract deployed:', contractAddress);

    // Return the contract address
    return contractAddress;
  } catch (error) {
    console.error('Failed to deploy contract:', error);
  }
}


export const initEscrow = async (contractAddress, arbiter, beneficiary, value) => {
  try {
    // Connect with MetaMask and get the signer
    const signer = await connectWithMetaMask();

    console.log('Initiating with signer:', signer);

    const contract = new ethers.Contract(contractAddress, ABI, signer);
    const initEscrow = await contract.initEscrow(arbiter, beneficiary, {value : value});

    // Wait for the contract to be deployed
    await initEscrow.wait();

    // Get the deployed contract's address
    // const contractAddress = contract.address;

    console.log('Escrow initiated');

    // Return the contract address
    return initEscrow;
  } catch (error) {
    console.error('Failed to initiate escrow:', error);
  }
}

// get all escrows

export const getEscrows = async (contractAddress) => {
  try {
    // Connect with MetaMask and get the signer
    const signer = await connectWithMetaMask();


    const contract = new ethers.Contract(contractAddress, ABI, signer);
    const escrows = await contract.getAllEscrow();


    console.log('Escrows:', escrows);

    // Return the contract address
    return escrows;
  } catch (error) {
    console.error('Failed to get escrows:', error);
  }
}

// approved escrow 
export const approveEscrow = async (contractAddress) => {
  try {
    // Connect with MetaMask and get the signer
    const signer = await connectWithMetaMask();

    const contract = new ethers.Contract(contractAddress, ABI, signer);
    const approveEscrow = await contract.approved({ gasLimit: 300000 });

    // Wait for the contract to be deployed
    console.log('Escrow approved', approveEscrow);

    const tx = approveEscrow.wait()


    return tx;

  } catch (error) {
    console.error('Failed to approve escrow:', error);
  }
}