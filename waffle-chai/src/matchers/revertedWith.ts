import {decodeRevertString} from '@ethereum-waffle/provider';
import {callPromise} from '../call-promise';

export function supportRevertedWith(Assertion: Chai.AssertionStatic) {
  Assertion.addMethod('revertedWith', function (this: any, revertReason: string | RegExp) {
    callPromise(this);

    const assertNotReverted = () => this.assert(
      false,
      'Expected transaction to be reverted',
      'Expected transaction NOT to be reverted',
      'Transaction reverted.',
      'Transaction NOT reverted.'
    );

    const onError = (error: any) => {
      const revertString = error?.receipt?.revertString ??
        decodeHardhatError(error, this) ??
        decodeOptimismError(error) ??
        decodeRevertString(error);

      const isReverted = revertReason instanceof RegExp
        ? revertReason.test(revertString)
        : revertString === revertReason;
      this.assert(
        isReverted,
        `Expected transaction to be reverted with "${revertReason}", but other reason was found: "${revertString}"`,
        `Expected transaction NOT to be reverted with "${revertReason}"`,
        `Transaction reverted with "${revertReason}"`,
        error
      );

      return error;
    };

    this.callPromise = this.callPromise.then(assertNotReverted, onError);
    this.then = this.callPromise.then.bind(this.callPromise);
    this.catch = this.callPromise.catch.bind(this.callPromise);
    this.txMatcher = 'revertedWith';
    return this;
  });
}

const decodeHardhatError = (error: any, context: any) => {
  const tryDecode = (error: any) => {
    const errorString = String(error);
    {
      const regexp = /VM Exception while processing transaction: reverted with custom error '([a-zA-Z0-9]+)\((.*)\)'/g;
      const matches = regexp.exec(errorString);
      if (matches && matches.length >= 1) {
        // needs to be wrapped in list to be consistent with the emit matcher
        context.args = [JSON.parse(`[${matches[2]}]`)];
        const errorName = matches[1];
        context.txErrorName = errorName;
        return errorName;
      }
    }
    {
      const regexp = new RegExp('VM Exception while processing transaction: reverted with panic code ([a-zA-Z0-9]*)');
      const matches = regexp.exec(errorString);
      if (matches && matches.length >= 1) {
        return 'panic code ' + matches[1];
      }
    }
    {
      const regexp = new RegExp('Error: Transaction reverted: (.*)');
      const matches = regexp.exec(errorString);
      if (matches && matches.length >= 1) {
        return matches[1];
      }
    }
    return undefined;
  };

  return tryDecode(error) ?? tryDecode(error.error); // the error may be wrapped
};

const decodeOptimismError = (error: any) => {
  const tryDecode = (error: any) => {
    const body = error?.body;
    if (body) {
      const regexp = /"execution reverted: (.*)"/g;
      const matches = regexp.exec(body);
      if (matches && matches.length >= 1) {
        return matches[1];
      }
    }
  };

  return tryDecode(error) ??
    tryDecode(error?.error) ??
    tryDecode(error?.error?.error);
};
