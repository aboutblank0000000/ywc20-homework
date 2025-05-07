import Fuse from 'fuse.js';
import { useEffect, useRef, useState } from "react";
import logo from './assets/ywc20-logo-main.webp';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import { apiRequest } from "./utils/api";
import Confetti from 'react-confetti-boom';
import PassResultCard from './components/PassResultCard';
import NotPassResultCard from './components/NotPassResultCard';

const App = () => {

  const [candidates, setCandidates] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [searchStatus, setSearchStatus] = useState("idle");
  const resultRef = useRef(null);

  useEffect(() => {
    
    const fetchCandidates = async () => {
      const res = await apiRequest("/candidates");
      
      const allCandidates = Object.values(res.data).flat();

      setCandidates(allCandidates);      
    }

    fetchCandidates()

  }, [])

  useEffect(() => {
    if ((searchStatus !== "idle") && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [searchStatus]);
  

  const handleSearch = (query) => {
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

    // const results = candidates.filter(person => {
    //   const fullName = `${person.firstName} ${person.lastName}`.toLowerCase();
    //   return fullName.includes(query.toLowerCase());
    // });

    const results = fuse.search(query.toLowerCase());
    
    if(results.length === 0) {
      setSearchResult(null)
      setSearchStatus("notfound");
      return null
    }

    const bestMatch = results.reduce((best, current) => {
      return current.score < best.score ? current : best;
    });

    setSearchResult(bestMatch.item)
    setSearchStatus("found");
  }

  return (
    <>
      <div className="min-h-screen w-full bg-[#190200] flex flex-col items-center">

        {searchStatus !== "idle" && searchResult && (
          <Confetti 
            mode='fall'
            fadeOutHeight={1.8}
            shapeSize={28}
          />
        )}

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

            <div ref={resultRef}>
              
              {searchStatus !== "idle" && searchResult && (
                <PassResultCard
                  searchResult={searchResult}
                />
              )}

              {searchStatus === "notfound" && (
                <NotPassResultCard/>
              )}
            </div>

          </div>

        </main>

      </div>
    </>
  )
}

export default App
