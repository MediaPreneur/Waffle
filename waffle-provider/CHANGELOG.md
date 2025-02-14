# @ethereum-waffle/provider

## 4.0.0-alpha.24

### Patch Changes

- 1e479c3: Introduce TestProvider type

## 4.0.0-alpha.23

### Patch Changes

- 4622881: Support panic codes in ganache

## 4.0.0-alpha.22

### Patch Changes

- 671f139: Include eth_sendTransaction when recording call history

## 4.0.0-alpha.21

### Patch Changes

- e8adce7: 🧼 Add src folders to npm
- Updated dependencies [e8adce7]
  - @ethereum-waffle/ens@4.0.0-alpha.21

## 4.0.0-alpha.20

### Patch Changes

- be6fd8e: 🔝 Update ethers to 5.6.2
- Updated dependencies [be6fd8e]
  - @ethereum-waffle/ens@4.0.0-alpha.20

## 4.0.0

### Patch Changes

- ede638e: Replaced deprecated `ganache-core` package with `ganache`.

## 4.0.0-alpha.1

### Patch Changes

- 4c4b2d6: v4.0.0-alpha.1
- Updated dependencies [4c4b2d6]
  - @ethereum-waffle/ens@4.0.0-alpha.1

## 4.0.0-alpha.0

### Major Changes

- Bump typechain and ethers to the latest versions. Move them to peer deps.

### Patch Changes

- Updated dependencies [undefined]
  - @ethereum-waffle/ens@4.0.0-alpha.0

## 3.4.1

### Patch Changes

- 71417c7: Provider compatibility with London hardfork
- Updated dependencies [71417c7]
  - @ethereum-waffle/ens@3.3.1

## 3.4.0

### Minor Changes

- 80d215b: - Fix vulnerabilities shown by `yarn audit`
  - Fix typings in `closeTo` matcher
  - Add `flattenSingleFile` function to compiler

### Patch Changes

- Updated dependencies [80d215b]
  - @ethereum-waffle/ens@3.3.0

## 3.3.2

### Patch Changes

- 7b85871: Updates ganache-core to 2.13.2 to take advantage of the [recent removal](https://github.com/trufflesuite/ganache-core/commit/a74efcec6b868e5778609dd95d26e5cd1f32e43a#diff-7ae45ad102eab3b6d7e7896acd08c427a9b25b346470d7bc6507b6481575d519) of a few bundled dependencies, making waffle a lighter dependency itself :)
- Updated dependencies [7b85871]
  - @ethereum-waffle/ens@3.2.4

## 3.3.1

### Patch Changes

- 6952eb9: Fixes HardHat problem: @ethereum-waffle/provider breaks source maps #281 (Lazy load ganache-core to avoid loading source-map-support too early)

## 3.3.0

### Minor Changes

- 1d7b466: Fix changeTokenBalance and changeTokenBalances matchers for contracts with overloaded balanceOf

  New matchers for BigNumber: within and closeTo

  Typechain integration

  Fix revertedWith functionality
