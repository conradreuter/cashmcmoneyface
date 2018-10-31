import {Draft} from 'immer'
import useImmerState from './useImmerState'

/**
 * React Hook that builds an object that has a state and methods that operate on that state via immer.
 */
function useImmerObject<TState extends {}, TMethods extends {[name: string]: Function}>(
  initialState: TState | (() => TState),
  methodsOnState: {[PName in keyof TMethods]: (state: Draft<TState>) => TMethods[PName]},
): [TState, TMethods] {
  const [state, updateState] = useImmerState(initialState)
  const methods: any = {}
  for (const [name, recipe] of Object.entries(methodsOnState)) {
    methods[name] = (...args: any[]) => {
      let result: any
      updateState((state) => {
        result = recipe(state)(...args)
      })
      return result
    }
  }
  return [state, methods]
}

export default useImmerObject
