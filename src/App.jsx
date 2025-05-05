import logo from './assets/ywc20-logo-main.webp';
import Header from './components/Header';

const App = () => {

  return (
    <>
      <div className="min-h-screen w-full bg-[#190200] flex flex-col items-center">
        
        <Header />
        <img 
          src={logo} 
          alt="YWC20 Logo" 
          className='object-contain w-[315px] h-[166px]'
        />
        
        <div className='text-white font-bold'> ทำไมถึงควรสมัครค่ายนี้</div>
        <div className='text-white'> Hello Tailwind</div>

      </div>
    </>
  )
}

export default App
