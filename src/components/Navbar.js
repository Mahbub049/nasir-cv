import { FiChevronDown, FiMenu } from "react-icons/fi";

export default function Navbar({
  sections,
  scrollToWithOffset,
  setMenuOpen,
  isProfileVisible,
}) {
  const hiddenSections = ["Skills", "Achievements"];

  const getSectionId = (section) =>
    section.toLowerCase().replace(/\s+/g, "-");

  const visibleSections = sections.filter((section) => {
    const sectionName = typeof section === "string" ? section : section.name;
    return !hiddenSections.includes(sectionName);
  });

  return (
    <>
      {/* Desktop Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 hidden md:block transition-all duration-300">
        <div className="w-full px-4 py-4">
          <div className="mx-auto max-w-6xl">
            <nav
              className={`w-full flex justify-center items-center gap-1 px-4 py-2 rounded-full border transition-all duration-300 ${
                isProfileVisible
                  ? "bg-black/25 border-white/20 backdrop-blur-md text-white shadow-lg"
                  : "bg-white/95 border-gray-200 text-gray-900 shadow-md backdrop-blur-md"
              }`}
            >
              {visibleSections.map((section) =>
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
                    className={`px-3 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-200 ${
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
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-200 ${
                        isProfileVisible
                          ? "text-white hover:bg-white/15"
                          : "text-gray-800 hover:bg-blue-50 hover:text-blue-700"
                      }`}
                    >
                      {section.name}
                      <FiChevronDown className="text-sm mt-0.5 transition-transform duration-200 group-hover:rotate-180" />
                    </button>

                    <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-48 rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
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
                          className="block w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition whitespace-nowrap"
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
      <header className="fixed top-0 left-0 w-full z-50 md:hidden px-3 pt-3">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-3 border transition-all duration-300 ${
            isProfileVisible
              ? "bg-black/30 border-white/20 text-white backdrop-blur-md shadow-lg"
              : "bg-white/95 border-gray-200 text-gray-900 backdrop-blur-md shadow-md"
          }`}
        >
          {/* Left: Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition ${
              isProfileVisible
                ? "bg-white/10 hover:bg-white/20 text-white"
                : "bg-gray-100 hover:bg-blue-50 text-gray-800 hover:text-blue-700"
            }`}
            aria-label="Open menu"
          >
            <FiMenu />
          </button>

          {/* Center: Name */}
          <div className="text-right leading-tight">
            <p className="text-sm font-bold tracking-wide">
              Dr. Nasir Uddin
            </p>
            {/* <p
              className={`text-[11px] font-medium ${
                isProfileVisible ? "text-white/75" : "text-gray-500"
              }`}
            >
              Academic Portfolio
            </p> */}
          </div>

          {/* Right: Initial Badge */}
          {/* <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
              isProfileVisible
                ? "bg-white/15 text-white"
                : "bg-blue-600 text-white"
            }`}
          >
            NU
          </div> */}
        </div>
      </header>
    </>
  );
}