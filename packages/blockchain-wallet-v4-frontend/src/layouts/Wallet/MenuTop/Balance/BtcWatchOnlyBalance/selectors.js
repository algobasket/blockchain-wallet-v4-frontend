import { add, lift, pathOr, reduce } from 'ramda'
import { selectors } from 'data'
import { createDeepEqualSelector } from 'services/ReselectHelper'
import { Remote } from 'blockchain-wallet-v4/src'

export const getData = createDeepEqualSelector(
  [
    selectors.core.wallet.getUnspendableContext,
    selectors.core.data.bitcoin.getAddresses
  ],
  (context, addressesR) => {
    const contextToBalances = (context, balances) =>
      context.map(a => pathOr(0, [a, 'final_balance'], balances))
    const balancesR = lift(contextToBalances)(Remote.of(context), addressesR)
    return balancesR.map(reduce(add, 0))
  }
)
