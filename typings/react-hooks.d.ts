import * as React from 'react'

declare module 'react' {
  function useEffect(effect: () => void | (() => void), dependencies?: ReadonlyArray<unknown>): void

  function useMemo<TValue>(create: () => TValue, inputs?: ReadonlyArray<unknown>): TValue

  function useReducer<TState, TAction>(
    reducer: (state: TState, action: TAction) => TState,
    initialState: TState | (() => TState),
  ): [TState, (action: TAction) => void]

  function useRef<TValue>(initialValue?: TValue): {current: TValue}

  function useState<TState>(
    initialState: TState | (() => TState),
  ): [TState, (updater: TState | ((prevState: TState) => TState)) => void]
}
