import Fuse from 'fuse.js';
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Confetti from 'react-confetti-boom';
import logo from './assets/ywc20-logo-main.webp';
import Header from './components/Header';
import NotPassResultCard from './components/NotPassResultCard';
import PassResultCard from './components/PassResultCard';
import SearchInput from './components/SearchInput';
import { apiRequest } from "./utils/api";

const App = () => {

  const [candidates, setCandidates] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [searchStatus, setSearchStatus] = useState("idle");
  const [isLoading, setIsLoading] = useState(false)
  const resultRef = useRef(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    
    // Fetch candidate for further searching
    const fetchCandidates = async () => {
      const res = await apiRequest("/candidates");
      
      const allCandidates = Object.values(res.data).flat();

      setCandidates(allCandidates);      
    }

    fetchCandidates()

  }, [])

  // Focus result card on found
  useEffect(() => {
    if (searchStatus !== "idle") {

      const timeout = setTimeout(() => {
        resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 1100);

      return () => clearTimeout(timeout);
    }
  }, [searchStatus]);
  
  // Show confetti in specific time
  useEffect(() => {
    if (searchStatus === "found") {
      setShowConfetti(true);
      setFadeOut(false);

      const timer1 = setTimeout(() => {
        setFadeOut(true); // เริ่ม fade
      }, 12000);
  
      const timer2  = setTimeout(() => {
        setShowConfetti(false);
      }, 15000); // 13 วิ
  
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [searchResult]);

  const handleSearch = async (query) => {
    const fuse = new Fuse(candidates, {
      keys: [
        'firstName', 
        'lastName', 
        {
          name: 'fullName',
          getFn: (item) => `${item.firstName} ${item.lastName}`,
        },
        {
          name: 'flatName',
          getFn: (item) => `${item.firstName}${item.lastName}`
        },
      ],
      threshold: 0.3, // lower = stricter match
      includeScore: true,
    });

    setIsLoading(true)
    try{
      const results = fuse.search(query.toLowerCase());
    
      if(results.length === 0) {
        setSearchResult(null);
        setSearchStatus("notfound");
        return null;
      }

      const bestMatch = results.reduce((best, current) => {
        return current.score < best.score ? current : best;
      });

      setSearchResult(bestMatch.item);
      setSearchStatus("found");
    } catch(e) {
      console.error(`Error: ${e}`);
    } finally {
      await new Promise(res => setTimeout(res, 1000));
      setIsLoading(false);
    }

  }

  return (
    <>
      <div className="min-h-screen w-full bg-[#190200] flex flex-col items-center pt-24 pb-20 overflow-x-hidden">

        {showConfetti && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: fadeOut ? 0 : 1 }}
            transition={{ duration: 2.2 }} // เวลา fade
          >
            <Confetti 
              mode='fall'
              fadeOutHeight={2.2}
              shapeSize={28}
            />
          </motion.div>
        )}

        <Header />

        <main className='flex flex-col items-center w-full gap-4 mt-6'>
          <img 
            src={logo} 
            alt="YWC20 Logo" 
            className='object-contain w-[315px] h-[166px]'
          />
          
          <h1 className='text-white text-5xl text-center leading-tight'>
            ค้นหา
            <span className='bg-(image:--color-y20-gradientR) text-gradient'>
              ผลการสมัคร
            </span>
          </h1>

          <div className='container px-4 flex flex-col items-center gap-8'>
            <SearchInput onSearch={handleSearch} isLoading={isLoading}/>

            <div className='container flex flex-col items-center'>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex justify-center items-center p-10 w-min"
                > 
                  <div className="w-18 h-18 rounded-full animate-spin border-7 border-t-transparent border-[color:var(--color-pink)] border-r-[color:var(--color-red)] border-b-[color:var(--color-orange)] border-l-[color:var(--color-yellow)]" />
                </motion.div>
              )}
              
              {searchStatus === "found" && searchResult && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                > 
                  <PassResultCard
                    searchResult={searchResult}
                    resultRef={resultRef}
                  />
                </motion.div>
              )}

              {searchStatus === "notfound" && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                > 
                <NotPassResultCard resultRef={resultRef}/>
              </motion.div>
              )}
            </div>

          </div>

        </main>

      </div>
    </>
  )
}

export default App
