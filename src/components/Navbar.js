import { FiChevronDown, FiMenu } from "react-icons/fi";

export default function Navbar({
  sections,
  scrollToWithOffset,
  setMenuOpen,
  isProfileVisible,
}) {
  const getSectionId = (section) =>
    section.toLowerCase().replace(/\s+/g, "-");

  return (
    <>
      {/* Desktop Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 hidden md:block transition-all duration-300">
        <div className="w-full px-4 py-4">
          <div className="mx-auto max-w-6xl">
            <nav
              className={`w-full flex justify-center items-center gap-1 px-5 py-2.5 rounded-full border transition-all duration-300 ${
                isProfileVisible
                  ? "bg-black/20 border-white/20 backdrop-blur-md text-white shadow-lg"
                  : "bg-white/95 border-gray-200 text-gray-900 shadow-md backdrop-blur-md"
              }`}
            >
              {sections.map((section) =>
                typeof section === "string" ? (
                  <button
                    key={section}
                    onClick={() => {
                      if (section === "Profile") {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else {
                        scrollToWithOffset(getSectionId(section));
                      }
                    }}
                    className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                      isProfileVisible
                        ? "text-white hover:bg-white/15"
                        : "text-gray-800 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                  >
                    {section}
                  </button>
                ) : (
                  <div key={section.name} className="relative group">
                    <button
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                        isProfileVisible
                          ? "text-white hover:bg-white/15"
                          : "text-gray-800 hover:bg-blue-50 hover:text-blue-700"
                      }`}
                    >
                      {section.name}
                      <FiChevronDown className="text-sm mt-0.5" />
                    </button>

                    <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-44 rounded-xl bg-white shadow-xl border border-gray-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {section.sub.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => {
                            scrollToWithOffset("publications");
                            window.dispatchEvent(
                              new CustomEvent("change-tab", {
                                detail: item.tab,
                              })
                            );
                          }}
                          className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition whitespace-nowrap"
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Navbar */}
      <div
        className={`fixed top-0 left-0 w-full z-50 md:hidden flex justify-between items-center px-4 py-3 transition-all duration-300 ${
          isProfileVisible
            ? "bg-black/20 text-white backdrop-blur-md"
            : "bg-white text-gray-900 shadow-md"
        }`}
      >
        <button
          onClick={() => setMenuOpen(true)}
          className="text-2xl"
          aria-label="Open menu"
        >
          <FiMenu />
        </button>

        <span className="text-sm font-semibold tracking-wide">
          Dr. M. Nasir Uddin
        </span>
      </div>
    </>
  );
}