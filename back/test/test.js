const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')
const { expect, assert } = require('chai')
const { log } = require('console')
const hre = require('hardhat')
const { ethers } = hre

describe('Escrow', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {
    const Escrow = await ethers.getContractFactory('Escrow')

    const [depositor, beneficiary, arbiter] = await hre.ethers.getSigners()
    let deposit = hre.ethers.parseEther('1')
    const initialBalanceB = await ethers.provider.getBalance(arbiter.address)

    // await escrow.deployed()
    // log('___________________________________________')
    // console.log('Signer 1 address: ', owner.address)
    log('___________________________________________')
    log('Signer 2 address: ', depositor.address)
    log('___________________________________________')
    log('Signer 3 address: ', beneficiary.address)
    log('___________________________________________')
    log('deposit: ', deposit.toString())
    log('___________________________________________')
    log('initial balance of beneficiary', initialBalanceB.toLocaleString())

    const escrow = await Escrow.deploy(arbiter.address, beneficiary.address, {
      value: deposit,
    })
    return {
      escrow,
      depositor,
      beneficiary,
      arbiter,
      deposit,
    }
  }

  it('should be funded initially', async function () {
    const { escrow, deposit } = await loadFixture(deployContractAndSetVariables)

    const balance = await ethers.provider.getBalance(escrow.target)

    expect(balance).to.equal(deposit)
  })

  describe('after approval from address other than the arbiter', function () {
    it('should revert', async function () {
      const { beneficiary, escrow } = await loadFixture(
        deployContractAndSetVariables,
      )

      await expect(escrow.connect(beneficiary).approve()).to.be.reverted
    })
  })

  describe('after approval from the arbiter', function () {
    it('should transfer balance to beneficiary', async function () {
      const { escrow, beneficiary, arbiter, deposit } = await loadFixture(
        deployContractAndSetVariables,
      )

      const before = await ethers.provider.getBalance(beneficiary.address)
      const approveTxn = await escrow.connect(arbiter).approve()
      await approveTxn.wait()
      const after = await ethers.provider.getBalance(beneficiary.address)

      const diff =  Number(after) - Number(before)

      expect(diff.toString()).to.equal(deposit.toString())
    })
  })
})
