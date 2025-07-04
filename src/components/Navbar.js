import { FiMenu } from 'react-icons/fi';

export default function Navbar({ sections, scrollToWithOffset, setMenuOpen, isProfileVisible }) {
    return (
        <>
            {/* Desktop Navbar */}
            <header
                className={`fixed top-0 left-0 w-full z-50 h-12 transition-all duration-300 ${isProfileVisible
                        ? 'bg-black/60 backdrop-blur-md text-white'
                        : 'bg-white shadow-md text-black'
                    } hidden md:block`}
            >
                <nav className="flex justify-center gap-6 py-4 text-sm font-medium">
                    {sections.map(section =>
                        typeof section === 'string' ? (
                            <a
                                key={section}
                                href={`#${section.toLowerCase().replace(/\s+/g, '-')}`}
                                className="hover:text-blue-400 transition"
                            >
                                {section}
                            </a>
                        ) : (
                            <div key={section.name} className="relative group">
                                <div className="cursor-pointer hover:text-blue-400 transition">
                                    {section.name}
                                </div>
                                <div
                                    className="absolute left-0 mt-2 bg-white shadow-lg rounded z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200"
                                    onMouseEnter={(e) => e.stopPropagation()}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {section.sub.map((item) => (
                                        <a
                                            key={item.name}
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                scrollToWithOffset("publications");
                                                window.dispatchEvent(new CustomEvent("change-tab", { detail: item.tab }));
                                            }}
                                            className="block px-4 py-2 text-sm hover:bg-gray-100 whitespace-nowrap text-black"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )
                    )}
                </nav>
            </header>

            {/* Mobile Navbar Toggle */}
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md md:hidden flex justify-between items-center px-4 py-3">
                <button onClick={() => setMenuOpen(true)} className="text-2xl">
                    <FiMenu />
                </button>
            </div>
        </>
    );
}
