import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Navbar />

      <div className="relative flex-1 overflow-hidden h-screen">
        {/* Sliding background container */}
        <div className="absolute inset-0 z-0 w-[600%] h-full flex animate-scroll-images">
          {/* Duplicate images for seamless loop */}
          {[
            "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
            "https://images.pexels.com/photos/406152/pexels-photo-406152.jpeg",
            "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg",
          ].map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Food ${idx + 1}`}
              className="w-screen h-full object-cover"
            />
          ))}
          {[
            "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
            "https://images.pexels.com/photos/406152/pexels-photo-406152.jpeg",
            "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg",
          ].map((src, idx) => (
            <img
              key={`duplicate-${idx}`}
              src={src}
              alt={`Food duplicate ${idx + 1}`}
              className="w-screen h-full object-cover"
            />
          ))}
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

        {/* Foreground content */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center h-full px-4 py-20">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Order Your Favorite Food!
          </h1>
          <Link
            to="/menu"
            className="bg-yellow-500 text-black font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-600 transition duration-300"
          >
            Order Now
          </Link>
        </div>
      </div>

      {/* Background scroll animation */}
      <style>{`
        @keyframes scrollImages {
          0% { transform: translateX(0); }
          100% { transform: translateX(-300vw); }
        }

        .animate-scroll-images {
          animation: scrollImages 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
