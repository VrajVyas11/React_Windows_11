import { useState } from 'react'
import './App.css'
import Footer from './components/Footer'
function App() {
  const [count, setCount] = useState(0)

  return (

    <div className='flex justify-between flex-col w-full'>
      <div className='h-full w-full '>hello</div>
    <Footer/>
    </div>

  )
}

export default App
