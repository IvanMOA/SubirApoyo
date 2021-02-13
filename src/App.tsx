import React from 'react';
import { RecoilRoot, atom, useRecoilState, selector, useRecoilValue } from 'recoil'

const counter = atom({ key: 'counter', default: 0})

const counterPlus10 = selector({
  key: 'counterPlus10',
  get: ({get}) => {
    const counterV = get(counter)
    return counterV + 10
  }
})

export function Home(){
  const [ counterV , setCounter ] = useRecoilState(counter)
  return <div>
    <h1>Count:  { counterV }</h1>
    <button onClick={ () => setCounter(counterV + 1)} >++</button>
  </div>
}

function Home2(){
  const [ counterV , setCounter ] = useRecoilState(counter)
  const countPlus10 = useRecoilValue(counterPlus10)
  return <div>
    <h1>Count: { counterV }</h1>
    <h2>CountPlus10: {countPlus10}</h2>
    <button onClick={ () => setCounter(counterV + 1)} >++</button>
  </div>
}

function App() {
  return (
<RecoilRoot>
    <div className="App bg-red-800">Hello world</div>
    <Home />
    <Home2 />
</RecoilRoot>
  );
}

export default App;
   