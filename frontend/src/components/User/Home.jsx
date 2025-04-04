import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div
        className="relative flex-1 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/459469/pexels-photo-459469.jpeg?cs=srgb&dl=basil-delicious-food-459469.jpg&fm=jpg')",
          paddingTop: "10rem", // Adjust padding to avoid overlap with Navbar
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full px-4 py-8 md:p-10">
          <div className="flex flex-col items-start justify-center w-full md:w-1/2">
            <h1 className="text-3xl sm:text-4xl font-bold text-white animate-typewriter">
              Welcome to Our Cafe
            </h1>
            <p className="text-base sm:text-lg my-4 text-white animate-typewriter">
              Discover a world of flavors and indulge in our culinary delights!
            </p>
            <Link
              to="/menu"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mt-4"
            >
              View Menu
            </Link>
          </div>
          <div className="flex items-center justify-center w-full md:w-1/2 mt-8 md:mt-0">
            <img
              src="https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?cs=srgb&dl=beef-bread-buns-1633578.jpg&fm=jpg"
              alt="Delicious Food"
              className="w-72 h-72 md:w-80 md:h-80 object-cover shadow-lg"
              style={{ borderRadius: "8.25rem" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;



// import { Link } from "react-router-dom";
// import Navbar from "./Navbar";

// const Home = () => {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <div
//         className="relative flex-1 bg-gradient-to-b from-[#7a0000] to-black text-white overflow-hidden"
//         style={{ paddingTop: "6rem" }}
//       >
//         {/* 🔴 Subtle Background Image Positioned Behind */}
//         <img
//           src="https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?cs=srgb&dl=beef-bread-buns-1633578.jpg&fm=jpg"
//           alt="background plate"
//           className="absolute top-8 right-16 w-[600px] opacity-10 blur-sm z-0 pointer-events-none select-none"
//         />

//         {/* 🌟 Foreground Content */}
//         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full px-6 py-10 md:p-16">
//           {/* Text section */}
//           <div className="w-full md:w-1/2 bg-white bg-opacity-90 p-6 rounded-xl shadow-lg">
//             <h1 className="text-4xl font-bold text-gray-900 mb-4 uppercase">
//               Welcome to Our Cafe
//             </h1>
//             <p className="text-lg text-gray-700 mb-6">
//               Discover a world of flavors and indulge in our culinary delights!
//             </p>
//             <Link
//               to="/menu"
//               className="inline-block bg-blue-500 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
//             >
//               View Menu
//             </Link>
//           </div>

//           {/* Dish Image section */}
//           <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center items-center">
//             <div className="w-72 h-72 rounded-full overflow-hidden shadow-2xl border-4 border-white bg-white flex items-center justify-center">
//               <img
//                 src="https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?cs=srgb&dl=beef-bread-buns-1633578.jpg&fm=jpg"
//                 alt="Delicious Food"
//                 className="w-full h-full object-cover object-center"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;







