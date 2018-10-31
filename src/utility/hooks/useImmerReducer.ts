import produce, {Draft} from 'immer'
import {useReducer} from 'react'

/**
 * React Hook that uses immer to apply actions to state via a handler.
 */
function useImmerReducer<TState, TAction>(
  reducer: (draft: Draft<TState>, action: TAction) => void,
  initialState: TState | (() => TState),
): [TState, (action: TAction) => void] {
  return useReducer(produce(reducer), initialState)
}

export default useImmerReducer
