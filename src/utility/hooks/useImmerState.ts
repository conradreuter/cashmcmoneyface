import {useState} from 'react'
import produce, {Draft} from 'immer'

/**
 * React Hook that uses immer to update a state via a recipe.
 */
function useImmerState<TState>(
  initialState: TState | (() => TState),
): [TState, (recipe: (state: Draft<TState>) => void) => void] {
  const [state, setState] = useState(initialState)
  return [state, (recipe) => setState(produce(recipe))]
}

export default useImmerState
