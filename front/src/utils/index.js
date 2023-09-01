import { ethers } from 'ethers'

// This function takes an Ethereum address and returns a shortened version of it
// by displaying the first `length` characters, followed by "....", and then the last `length` characters.
export const shortenAddress = (address) => {
  // If the address is not defined, return null
  if (!address) return null

  // Otherwise, return the shortened version of the address
  return `${address.slice(0, 7)}...${address.slice(-3)}`
}

export const shortenBalance = (balance) => {
  // If the address is not defined, return null
  if (!balance) return null

  // Otherwise, return the shortened version of the address
  return `${balance.slice(0, 5)}`
}

export const mediumAddress = (address) => {
  // If the address is not defined, return null
  if (!address) return null

  // Otherwise, return the shortened version of the address
  return `${address.slice(0, 10)}...${address.slice(-10)}`
}

function isEthereum() {
  if (window.ethereum) return true

  return false
}
function getChainID() {
  if (isEthereum()) return parseInt(window.ethereum.chainId, 16)

  return 0
}

async function handleConnection(accounts) {
  if (accounts.length === 0) {
    const fetchedAccounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    // use loacal storage to store povidr and signer
    localStorage.setItem('provider', provider)
    localStorage.setItem('signer', signer)

    console.log(signer);

    return fetchedAccounts
  }

  return accounts
}

async function requestAccount() {
  let currentAccount = 0x0

  if (isEthereum() && getChainID() !== 0) {
    let accounts = await window.ethereum.request({ method: 'eth_accounts' })
    accounts = await handleConnection(accounts)
    currentAccount = accounts[0]
  }

  return currentAccount
}

async function requestBalance(currentAccount) {
  let currentBalance = 0

  if (isEthereum()) {
    try {
      currentBalance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [currentAccount, 'latest'],
      })

      currentBalance = parseInt(currentBalance, 16) / 1e18

      return { currentBalance, err: false }
    } catch (err) {
      return { currentBalance, err: true }
    }
  }

  return { currentBalance, err: true }
}

export const GetParams = async (setWalletAddress ) => {
  const response = {
    isError: false,
    message: '',
    step: -1,
    balance: 0,
    account: '0x0',
  }

  if (!isEthereum()) {
    response.step = 0

    return response
  }

  const currentAccount = await requestAccount()
  setWalletAddress(currentAccount)
  if (currentAccount === 0x0) {
    response.step = 1

    return response
  }

  response.account = currentAccount

  if (getChainID() !== 11155111) {
    response.step = 2

    return response
  }

  const { currentBalance, err } = await requestBalance(currentAccount)
  if (err) {
    response.isError = true
    response.message = 'Error fetching balance!'

    return response
  }

  return response
}

export async function SwitchNetwork(setShowAlert) {
  await window?.ethereum
    ?.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0xaa36a7',
          chainName: 'Sepolia',
          nativeCurrency: {
            name: 'SepoliaETH',
            symbol: 'ETH',
            decimals: 18,
          },
          rpcUrls: ['https://sepolia.infura.io/v3/'],
          blockExplorerUrls: ['https://sepolia.etherscan.io'],
        },
      ],
    })
    .catch((error) => {
      console.log(error)
      setShowAlert({
        status: true,
        type: 'error',
        message: error.message,
      })
    })
}
