import { Simulator } from '../src/simulator';
import { expect } from 'chai';
import { Wallet } from 'ethers';

const wallet = new Wallet('0xee79b5f6e221356af78cf4c36f4f7885a11b67dfcc81c34d80249947330c0f82');

describe.only('Simulator', () => {
  it('block number is 0 initially', () => {
    const simulator = new Simulator();
    expect(simulator.getBlockNumber()).to.eq('0');
  })

  it('block number is advanced by mined transactions', async () => {
    const simulator = new Simulator();
    const tx = await wallet.signTransaction({
      data: '0x',
      nonce: 0,
      gasPrice: 875000000,
      gasLimit: 1000000,
      value: 0,
    });
    simulator.sendTransaction(tx);
    expect(simulator.getBlockNumber()).to.eq('1');
  })
})