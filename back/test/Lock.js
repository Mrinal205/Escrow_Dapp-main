const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')
const { expect } = require('chai')
const hre = require('hardhat')

describe('TokenHive', function () {
  async function deployContractAndSetVariables() {
    const Contract = await ethers.getContractFactory('BusinessLogic')
    const contract = await Contract.deploy()

    const [owner, address2] = await ethers.getSigners()
    // let withdrawAmount = hre.ethers.parseEther('1')
    // let address = '0x452A12ad65C41D9A88f2515Af6c6F364060D4CE8'

    // console.log('Signer 1 address: ', owner.address)
    return { contract, owner, address2 }
  }

  it('Should be ok', async function () {
    const { contract, owner } = await loadFixture(deployContractAndSetVariables)

    expect(await contract.owner()).to.equal(owner.address)
  })

  it('trying to mint without kyc , should fail', async function () {
    const { contract, owner } = await loadFixture(deployContractAndSetVariables)

    await expect(contract.createAssetToken('Home', 'Immeuble', 10, 'uri')).to.be
      .reverted
  })
  it('trying to mint kyc , should be ok', async function () {
    const { contract, owner, address2 } = await loadFixture(
      deployContractAndSetVariables,
    )
    await contract
      .connect(address2)
      .verifyKYC('Sylva', 'TAGNA', '553213', 'BP06', 'Ouaga', 'BF', 'Karpala')
    await contract.approveKYC(address2)

    await expect(contract.createAssetToken('Home', 'Immeuble', 10, 'uri')).to.be
      .reverted
  })

  describe('Trying to call TokenHive Function', () => {
    it('Public uri', async () => {
      const { contract } = await loadFixture(deployContractAndSetVariables)

      const uri = await contract.baseUri();

       expect(uri).to.be.equal(
        'ipfs/QmZYmH5iDbD6v3U2ixoVAjioSzvWJszDzYdbeCLquGSpVm',
      )
    })
  })
})
