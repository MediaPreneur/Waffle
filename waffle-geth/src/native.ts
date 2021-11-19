import ffi from 'ffi-napi';
import {join} from 'path';
import type {TransactionRequest} from '@ethersproject/abstract-provider';
import {utils} from 'ethers';

export const library = ffi.Library(join(__dirname, '../go/build/wafflegeth.dylib'), {
  cgoCurrentMillis: ['int', []],
  getBlockNumber: ['string', []],
  getChainID: ['string', []],
  sendTransaction: ['string', ['string']],
  getBalance: ['string', ['string']],
  call: ['string', ['string']],
  getTransactionCount: ['int', ['string']],
  getCode: ['string', ['string']]
});

export function cgoCurrentMillis() {
  return library.cgoCurrentMillis();
}

export function getBlockNumber(): string {
  return library.getBlockNumber();
}

export function call(msg: TransactionRequest) {
  return '0x' + library.call(JSON.stringify(msg))
}
export function getBalance(address: string): string {
  return library.getBalance(address);
}

export function sendTransaction(data: string): string {
  const res = library.sendTransaction(data);
  console.log(res)
  return res
}

export function getChainID(): string {
  return library.getChainID()!;
}

export function getTransactionCount(address: string): number {
  return library.getTransactionCount(address);
}

export function getCode(address: string): string {
  return `0x${library.getCode(address)!}`;
}
