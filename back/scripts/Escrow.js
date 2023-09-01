const { run, network } = require('hardhat')
const hre = require("hardhat");
const json = require('../artifacts/contracts/EscrowFactory.sol/EscrowFactory.json')

async function main() {
  const factoryAddress = "0x20eD5669D44F9CD6D50ABdF150F5b4c099B4ba46";
  const provider = await hre.ethers.getDefaultProvider()

  const [owner, arbiter, beneficiary] = await hre.ethers.getSigners()
  
  const Factory = new hre.ethers.Contract(factoryAddress, json.abi, provider)

  const Escrow = await hre.ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy(factoryAddress);
  console.log(`Escrow address: ${escrow.target}`);
  const addr = escrow.target;
  const value = hre.ethers.parseEther("0.01");

  console.log('____________________________________________');
  const es = await escrow.getAllEscrow();
  // console.log(owner, 'owner');
  
  for (let i = 0; i < es.length; i++) {
    console.log("Escrow address:", es[i][0]);
    console.log("Owner address:", es[i][1]);
    console.log("Escrow ID:", es[i][2].toString());
    console.log("-------------------------");
  }

  // const initEscrow = await escrow.initEscrow(arbiter.address, beneficiary.address, {value : value});
  // const initEscrow = await escrow.initEscrow("0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", {value : value});
  // await initEscrow.wait()

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
