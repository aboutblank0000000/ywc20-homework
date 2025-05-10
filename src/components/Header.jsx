import logo from '../assets/logo-ywc20-mono.png';

const Header = () => {
	const ywcLink = 'https://ywc20.ywc.in.th/'

  const navLinks = [
    { label: 'About', 		href: `${ywcLink}#about` },
    { label: 'Majors', 		href: `${ywcLink}#major` },
    { label: 'Timeline', 	href: `${ywcLink}#timeline` },
    { label: 'Location', 	href: `${ywcLink}#location` },
    { label: 'FAQ', 			href: `${ywcLink}#faq` },
    { label: 'Sponsors', 	href: `${ywcLink}#sponsors` },
  ];

  return (
    <header className="p-8 md:px-8 w-full bg-black fixed top-0">

      <div className="container mx-auto transition-all">

        <div className="flex items-center justify-between">
          
          <a href='/'>
            <img 
              src={logo} 
              alt="YWC20" 
              className='object-contain w-[64px] h-[32px]'
            />
          </a>
          
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                // className=" text-white hover:bg-(image:--color-y20-gradientR) text-gradient transition-colors duration-200"
                className=" relative group text-white transition-colors duration-200"
              >
                
                {/* {link.label} */}
                <span className="block group-hover:opacity-0 transition-opacity duration-400">
                  {link.label}
                </span>
                <span className="pointer-events-none absolute inset-0 bg-(image:--color-y20-gradientR) bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  {link.label}
                </span>

              </a>
            ))}
          </nav>
          
        </div>

      </div>

    </header>
  );
};

export default Header;