
export default function Profile() {
  return (
    <section id="profile" className="py-10 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <img src="/profile.jpg" alt="Prof. Nasir" className="w-32 h-32 rounded-full mx-auto mb-4" />
        <h1 className="text-2xl font-bold">Dr. Mohammad Nasir Uddin</h1>
        <p className="text-gray-600">Professor, Department of ICT</p>
        <p className="text-gray-600 mb-4">Bangladesh University of Professionals</p>
        <p className="text-sm">📞 01819-308246 | ✉️ nasiruddin@bup.edu.bd</p>
        <p className="mt-2 text-sm text-blue-600 underline">Google Scholar | ResearchGate</p>
        <div className="mt-4">
          <h2 className="font-semibold">Research Interests:</h2>
          <ul className="list-disc list-inside text-left inline-block text-sm">
            <li>Computational Fluid Dynamics</li>
            <li>Heat and Mass Transfer</li>
            <li>Bioengineering</li>
          </ul>
        </div>
      </div>
    </section>
  );
}