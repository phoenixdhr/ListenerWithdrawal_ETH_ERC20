import { ethers } from 'hardhat'

async function deploy () {
    const MyTokenFactory = await ethers.getContractFactory('MyToken');
    const token = await MyTokenFactory.deploy();
    await token.deployed()
    
    
    console.log('Address del contrato =>>',token.address )
}

deploy()
