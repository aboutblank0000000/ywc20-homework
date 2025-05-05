import Icon from '@mdi/react';
import { mdiMagnify, mdiClose } from '@mdi/js';
import { useState } from 'react';

const SearchInput = ({onSearch}) => {
	const [query, setQuery] = useState('')
	const [isFocused, setIsFocused] = useState(false);
    
	const onEnterKeyDown = (event) => {
		if (event.key === 'Enter') {
      event.preventDefault();
      if (query.trim()) {
        onSearch(query);
      } else {
        // toast({
        //   title: "กรุณาใส่ข้อมูลค้นหา",
        //   description: "โปรดระบุเลขบัตรหรือชื่อที่ต้องการค้นหา",
        // });
      }
    }
	}
	return(
		<div 
			className="relative flex flex-row rounded-2xl overflow-hidden mx-5"
		>	
			<div className="absolute inset-0 bg-(image:--color-y20-gradientL)"></div>

			<div className="absolute inset-[2px] bg-black/95 rounded-[14px] overflow-hidden">
				<div className={`absolute inset-0 bg-white/10 transition-opacity duration-300 ${isFocused ? 'opacity-100' : 'opacity-0'}`}></div>
			</div>
			
			<div
				className='relative flex items-center px-1 '
			>
				<div className='pl-3 py-3'>
					<Icon path={mdiMagnify} size={1} className={`transition-colors duration-300 ${isFocused ? 'text-white': 'text-white/50'}`}/>
				</div>

				<input
					type="text"
					placeholder="ค้นหาด้วยชื่อ"
					className=" w-full py-3 px-3 bg-transparent text-lg text-white placeholder:text-white/30 focus:outline-none"
					value={query}
					onChange={(event) => {setQuery(event.target.value)}}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					onKeyDown={onEnterKeyDown}
					// disabled={isLoading}
					autoComplete="off"
				/>

					{query && (
            <button 
              onClick={() => {setQuery('')}} 
              className="p-2 mr-1 absolute right-28 rounded-full hover:bg-white/10 text-white transition-colors duration-200"
            >
              <Icon path={mdiClose} size={0.8} />
            </button>
          )}

				<div 
					className='pr-3'
				>

					<button
						className={`min-w-24 h-9.5 rounded-lg transition-colors duration-300
							${query.trim() ? 'text-white bg-(image:--color-y20-gradientL) ' : 'text-white/40 bg-white/8 cursor-not-allowed'}	
						`}
						onClick={() => query.trim() ? onSearch(query) : null}
					>
						ค้นหา
					</button>

				</div>
			</div>

		</div>
	)
}

export default SearchInput;