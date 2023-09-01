const { run, network } = require('hardhat')
const hre = require('hardhat')
const { ethers } = hre

async function main() {
  const Factory = await ethers.getContractFactory('EscrowFactory')
  const factory = await Factory.deploy()

  console.log(`Factory address , ${factory.target}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
