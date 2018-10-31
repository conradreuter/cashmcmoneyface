import useImmerObject from './useImmerObject'
import {useEffect} from 'react'

/**
 * A counter that can can be incremented, decremented, reset and automatically play.
 */
type Counter = Readonly<{
  /**
   * Decrement the counter by a specified number (defaults to 1).
   */
  decrement(by?: number): void

  /**
   * Increment the counter by a specified number (defaults to 1).
   */
  increment(by?: number): void

  /**
   * Reset the counter back to the initial value.
   */
  reset(): void

  /**
   * Restart the counter by setting it back to the initial value and restarting the run timer.
   */
  restart(): void

  /**
   * Directly set the counter.
   */
  set(value: number): void

  /**
   * Automatically run the counter.
   */
  start(options?: Partial<CounterRunOptions>): void

  /**
   * Stop running the counter automatically.
   */
  stop(): void

  /**
   * Whether the counter is currently automatically running.
   */
  isRunning: boolean

  /**
   * The current value.
   */
  value: number
}>

/**
 * Options for automatically incrementing/decrementing a counter.
 */
type CounterRunOptions = {
  /**
   * How often (in ms) to increment the counter. (defaults to 1000)
   */
  interval: number

  /**
   * By how much to increment or decrement the counter per tick. (defaults to 1)
   */
  step: number
}

const DEFAULT_RUN_OPTIONS: CounterRunOptions = {
  interval: 1000,
  step: 1,
}

/**
 * Create a new counter. The initial value defaults to 0.
 */
function useCounter(initialValue = 0): Counter {
  const [state, methods] = useImmerObject(
    {
      isRunning: false,
      restart: 0,
      runOptions: DEFAULT_RUN_OPTIONS,
      value: initialValue,
    },
    {
      restart: (state) => () => {
        state.isRunning = true
        state.restart++
        state.value = 0
      },
      set: (state) => (value: number) => {
        state.value = value
      },
      start: (state) => (runOptions?: CounterRunOptions) => {
        state.isRunning = true
        Object.assign(state.runOptions, runOptions)
      },
      stop: (state) => () => {
        state.isRunning = false
      },
      tick: (state) => () => {
        if (!state.isRunning) return
        state.value += state.runOptions.step
      },
    },
  )

  useEffect(
    () => {
      if (!state.isRunning) return
      const timerHandle = setInterval(() => methods.tick(), state.runOptions.interval)
      return () => clearInterval(timerHandle)
    },
    [state.isRunning, state.restart, state.runOptions],
  )

  return {
    decrement: (by = 1) => methods.set(state.value - by),
    increment: (by = 1) => methods.set(state.value + by),
    reset: () => methods.set(initialValue),
    restart: () => methods.restart(),
    set: (value) => methods.set(value),
    start: (options) => methods.start(options),
    stop: () => methods.stop(),
    isRunning: state.isRunning,
    value: state.value,
  }
}

export default useCounter
export {Counter, CounterRunOptions}
