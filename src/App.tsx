import * as React from 'react'
import {useEffect, useMemo, useRef, useState} from 'react'
import styled from 'react-emotion'
import useCounter from './utility/hooks/useCounter'

function useInterval(callback: () => void, interval: number): void {
  useEffect(() => {
    callback()
    const timerHandle = setInterval(callback, interval)
    return () => clearInterval(timerHandle)
  }, [])
}

function useValueRef<TValue>(value: TValue): () => TValue {
  const ref = useRef(value)
  useEffect(
    () => {
      ref.current = value
    },
    [value],
  )
  return () => ref.current
}

/**
 * The application's main entry point.
 */
const App: React.SFC = () => {
  const counter = useCounter(0)
  const counterValueRef = useValueRef(counter.value)

  useInterval(() => console.log(counterValueRef()), 1000)

  return (
    <Wrapper>
      <Button onClick={() => counter.increment()}>++</Button>
      <Button onClick={() => counter.decrement()}>--</Button>
      <Button onClick={() => counter.reset()}>0</Button>
      <Button onClick={() => counter.start({interval: 10})}>></Button>
      <Button onClick={() => counter.stop()}>||</Button>
      <Button onClick={() => counter.restart()}>X</Button>
      <Display>{counter.value}</Display>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  font-size: 4em;
  padding: 1em;
  height: 100%;
`

const Display = styled.span`
  margin: 0.2em;
`

const Button = styled.button`
  margin: 0.2em;
  padding: 0 0.1em;
`

export default App
