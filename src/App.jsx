import { motion } from "motion/react"
import logo from './assets/ywc20-logo-main.webp';
import Header from './components/Header';
import SearchInput from './components/SearchInput';

const App = () => {

  const handleSearch = (query) => {
    alert(query);
  }

  return (
    <>
      <div className="min-h-screen w-full bg-[#190200] flex flex-col items-center">
        
        <Header />

        <main className='flex flex-col items-center w-full'>
          <img 
            src={logo} 
            alt="YWC20 Logo" 
            className='object-contain w-[315px] h-[166px]'
          />
          
          <h1 className='text-white text-5xl text-center'>

            ค้นหา

            <span className='bg-(image:--color-y20-gradientR) text-gradient'>
              ผลการสมัคร
            </span>

          </h1>

          <div className='container px-4 flex flex-col items-center'>
            <SearchInput onSearch={handleSearch}/>

            <div className="bg-white rounded-xl p-6 mx-auto max-w-2xl w-full">
              ยินดีด้วย
            </div>

            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative mb-2"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-theme-gradient-start to-theme-gradient-end rounded-md blur-sm opacity-50"></div>
              <div className="relative px-4 py-2 rounded-md border border-white/10 bg-white/5 backdrop-blur-sm">
                <p className="text-white text-lg font-medium">เบสแบมคุง</p>
              </div>
            </motion.div>

          </div>

        </main>

      </div>
    </>
  )
}

export default App
