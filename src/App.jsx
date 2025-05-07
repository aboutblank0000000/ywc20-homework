import Fuse from 'fuse.js';
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import logo from './assets/ywc20-logo-main.webp';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import Icon from '@mdi/react';
import { mdiLinkVariant } from '@mdi/js';
import { apiRequest } from "./utils/api";

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

    console.log(resultRef);
    

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

  const formatMajor= (major) => {
    const map = {
      web_design: "Web Design",
      web_content: "Web Content",
      web_programming: "Web Programming",
      web_marketing: "Web Marketing"
    };
    return map[major];
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

            <div ref={resultRef}>
              {searchStatus !== "idle" && searchResult && (
                <div className="bg-white/5 rounded-2xl p-8 mx-auto max-w-md w-full flex flex-col items-center gap-4 text-center shadow-lg border border-white/10 backdrop-blur-sm">

                  <h2 className="text-2xl font-semibold text-white">🎉 ขอแสดงความยินดีกับ</h2>

                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="relative w-fit"
                  >
                    <div className="absolute -inset-1 rounded-lg blur-md opacity-60" style={{ backgroundImage: "var(--color-y20-gradientR)" }} />
                    <div className="relative px-6 py-3 rounded-lg bg-white/10 border border-white/20">
                      <p className="text-white text-xl font-semibold tracking-wide">
                        {searchResult.firstName} {searchResult.lastName}
                      </p>
                    </div>
                  </motion.div>

                  <div className="text-sm px-4 py-1 rounded-md bg-white/10 text-white/90 border border-white/10">
                    เลขประจำตัวผู้เข้าสัมภาษณ์ : {searchResult.interviewRefNo}
                  </div>

                  <h3 className="text-white/90 text-lg">คุณผ่านเข้าสู่รอบสัมภาษณ์ในสาขา</h3>

                  <div className="text-xl font-extrabold text-white tracking-wide bg-(image:--color-y20-gradientR) text-gradient">
                    {formatMajor(searchResult.major)}
                  </div>

                  <p className="mt-4 text-sm text-white/80 text-center">
                    ตรวจสอบรายละเอียดการสัมภาษณ์ได้ที่{" "}
                    <a
                      href={`https://ywc20.ywc.in.th/interview/${searchResult.major.replace("web_", "")}`}
                      target="_blank"
                      className="inline-flex items-end text-white underline underline-offset-4 hover:text-yellow-300 transition-colors duration-200"
                    >
                      รายละเอียดการสัมภาษณ์ <Icon path={mdiLinkVariant} size={0.8} />
                    </a>
                  </p>

                </div>
              )}

              {searchStatus === "notfound" && (
                <div className="bg-white/5 rounded-2xl p-8 mx-auto max-w-md w-full flex flex-col items-center gap-4 text-center shadow-lg border border-white/10 backdrop-blur-sm">

                  <h2 className="text-2xl font-semibold text-white">ขอบคุณที่สมัคร 💙</h2>
                
                  <p className="text-white/70 text-base max-w-sm">
                    คุณยังไม่ผ่านเข้าสู่รอบสัมภาษณ์ในครั้งนี้
                  </p>
                
                  <p className="text-white/50 text-sm max-w-xs">
                    การกล้าก้าวออกมา คือสิ่งที่น่าภูมิใจเสมอ  
                    อย่าหยุดพัฒนา และกลับมาใหม่ได้เสมอ :)
                  </p>
                
                </div>
              )}
            </div>

          </div>

        </main>

      </div>
    </>
  )
}

export default App
