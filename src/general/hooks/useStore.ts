import { useContext } from 'react'
import { ReactReduxContext,  ReactReduxContextValue } from 'react-redux';
import { Store } from 'redux';

export function useDefaultReduxContext(): ReactReduxContextValue | null {
  const contextValue = useContext(ReactReduxContext)

  if (process.env.NODE_ENV !== 'production' && !contextValue) {
    throw new Error(
      'could not find react-redux context value; please ensure the component is wrapped in a <Provider>'
    )
  }

  return contextValue
}

export interface StoreForRunSaga extends Store {
  runSaga: any
}

/**
 * Hook factory, which creates a `useStore` hook bound to a given context.
 *
 * @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useStore` hook bound to the specified context.
 */
export function createStoreHook(context = ReactReduxContext) {
  const useReduxContext =
    context === ReactReduxContext
      ? useDefaultReduxContext
      : () => useContext(context)
  return function useStore(): StoreForRunSaga {
    const reduxContext = useReduxContext()!
    const store = reduxContext.store as StoreForRunSaga;
    return store
  }
}

/**
 * A hook to access the redux store.
 *
 * @returns {any} the redux store
 *
 * @example
 *
 * import React from 'react'
 * import { useStore } from 'react-redux'
 *
 * export const ExampleComponent = () => {
 *   const store = useStore()
 *   return <div>{store.getState()}</div>
 * }
 */
export const useStore = /*#__PURE__*/ createStoreHook()