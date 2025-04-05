// import { Link } from "react-router-dom";
// import Navbar from "./Navbar";

// const Home = () => {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <div
//         className="relative flex-1 bg-cover bg-center"
//         style={{
//           backgroundImage:
//             "url('https://images.pexels.com/photos/459469/pexels-photo-459469.jpeg?cs=srgb&dl=basil-delicious-food-459469.jpg&fm=jpg')",
//           paddingTop: "10rem", // Adjust padding to avoid overlap with Navbar
//         }}
//       >
//         <div className="absolute inset-0 bg-black opacity-50"></div>
//         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full px-4 py-8 md:p-10">
//           <div className="flex flex-col items-start justify-center w-full md:w-1/2">
//             <h1 className="text-3xl sm:text-4xl font-bold text-white animate-typewriter">
//               Welcome to Our Cafe
//             </h1>
//             <p className="text-base sm:text-lg my-4 text-white animate-typewriter">
//               Discover a world of flavors and indulge in our culinary delights!
//             </p>
//             <Link
//               to="/menu"
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mt-4"
//             >
//               View Menu
//             </Link>
//           </div>
//           <div className="flex items-center justify-center w-full md:w-1/2 mt-8 md:mt-0">
//             <img
//               src="https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?cs=srgb&dl=beef-bread-buns-1633578.jpg&fm=jpg"
//               alt="Delicious Food"
//               className="w-72 h-72 md:w-80 md:h-80 object-cover shadow-lg"
//               style={{ borderRadius: "8.25rem" }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;



// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Navbar from './Navbar';

// const Home = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   // Featured items data
//   const featuredItems = [
//     {
//       id: 1,
//       name: "Signature Coffee",
//       description: "Rich, aromatic blend of premium coffee beans",
//       image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3",
//       category: "Drinks"
//     },
//     {
//       id: 2,
//       name: "Gourmet Burger",
//       description: "Juicy patty with fresh vegetables and special sauce",
//       image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3",
//       category: "Food"
//     },
//     {
//       id: 3,
//       name: "Chocolate Cake",
//       description: "Decadent chocolate layers with rich frosting",
//       image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3",
//       category: "Desserts"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
      
//       {/* Hero Section with Animation */}
//       <div className="relative h-[90vh] overflow-hidden">
//         <div className="absolute inset-0">
//           <img
//             src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-4.0.3"
//             alt="Cafe Interior"
//             className={`w-full h-full object-cover transform scale-110 transition-all duration-1000 ease-out
//                       ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
//           />
//           <div className="absolute inset-0 bg-black opacity-50"></div>
//         </div>

//         <div className="relative h-full flex items-center justify-center text-center px-4">
//           <div className={`space-y-6 transform transition-all duration-1000 ease-out
//                         ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
//             <h1 className="text-5xl md:text-7xl font-bold text-white">
//               Welcome to <span className="text-orange-500">Cafe</span>
//             </h1>
//             <p className="text-xl text-gray-200 max-w-2xl mx-auto">
//               Experience the perfect blend of taste and ambiance
//             </p>
//             <Link to="/menu"
//                   className="inline-block px-8 py-3 bg-orange-500 text-white rounded-full 
//                            font-semibold hover:bg-orange-600 transform hover:scale-105 
//                            transition-all duration-300">
//               Explore Menu
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Featured Items Section */}
//       <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-3xl font-bold text-center mb-12">
//             Featured <span className="text-orange-500">Delights</span>
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {featuredItems.map((item, index) => (
//               <div key={item.id} 
//                    className={`group relative overflow-hidden rounded-xl shadow-lg transform 
//                              transition-all duration-700 ease-out hover:scale-105
//                              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
//                    style={{ transitionDelay: `${index * 200}ms` }}>
//                 {/* Image Container */}
//                 <div className="relative h-64 overflow-hidden">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-full h-full object-cover transition-transform duration-700 
//                              ease-out group-hover:scale-110 group-hover:rotate-2"
//                   />
//                   {/* Overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent 
//                                 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full 
//                                   group-hover:translate-y-0 transition-transform duration-300">
//                       <p className="text-white text-sm">{item.description}</p>
//                     </div>
//                   </div>
//                   {/* Category Badge */}
//                   <div className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 
//                                 rounded-full text-sm font-medium transform -rotate-2 
//                                 hover:rotate-2 transition-transform duration-300">
//                     {item.category}
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <div className="p-4 bg-white">
//                   <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-500 
//                                transition-colors duration-300">
//                     {item.name}
//                   </h3>
//                   <Link to="/menu"
//                         className="inline-block mt-2 text-orange-500 hover:text-orange-600 
//                                  font-medium transition-colors duration-300">
//                     View Details →
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Call to Action Section */}
//       <div className="relative py-16 overflow-hidden">
//         <div className="absolute inset-0 bg-orange-50 transform -skew-y-6"></div>
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl font-bold mb-8">Ready to Order?</h2>
//           <Link to="/menu"
//                 className="inline-block px-8 py-3 bg-orange-500 text-white rounded-full 
//                          font-semibold hover:bg-orange-600 transform hover:scale-105 
//                          transition-all duration-300">
//             Order Now
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const featuredItems = [
    {
      id: 1,
      name: "Signature Coffee",
      description: "Rich, aromatic blend of premium coffee beans",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3",
      category: "Drinks"
    },
    {
      id: 2,
      name: "Gourmet Burger",
      description: "Juicy patty with fresh vegetables and special sauce",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3",
      category: "Food"
    },
    {
      id: 3,
      name: "Chocolate Cake",
      description: "Decadent chocolate layers with rich frosting",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3",
      category: "Desserts"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-4.0.3"
            alt="Cafe Interior"
            className={`w-full h-full object-cover transform scale-110 transition-all duration-1000 ease-out
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className={`space-y-6 transform transition-all duration-1000 ease-out
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <h1 className="text-5xl md:text-7xl font-bold text-white group">
              <span className="relative inline-block">
                Welcome to{" "}
                <span className="text-orange-500 relative after:block after:h-[3px] after:bg-orange-500 after:scale-x-0 group-hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-500">
                  Cafe
                </span>
              </span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Experience the perfect blend of taste and ambiance
            </p>
            <Link
              to="/menu"
              className="inline-block px-8 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transform hover:scale-105 transition-all duration-300"
            >
              Explore Menu
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Items Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="relative inline-block group">
              Featured{" "}
              <span className="text-orange-500 relative after:block after:h-[2px] after:bg-orange-500 after:scale-x-0 group-hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-500">
                Delights
              </span>
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.map((item, index) => (
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-xl shadow-lg transform transition-all duration-700 ease-out hover:scale-105
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-2"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-sm">{item.description}</p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium transform -rotate-2 hover:rotate-2 transition-transform duration-300">
                    {item.category}
                  </div>
                </div>

                <div className="p-4 bg-white">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-500 transition-colors duration-300">
                    {item.name}
                  </h3>
                  <Link
                    to="/menu"
                    className="relative inline-block group text-orange-500 hover:text-orange-600 font-medium"
                  >
                    <span className="relative after:block after:h-[2px] after:bg-orange-500 after:scale-x-0 group-hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300">
                      View Details →
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-orange-50 transform -skew-y-6"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Order?</h2>
          <Link
            to="/menu"
            className="inline-block px-8 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transform hover:scale-105 transition-all duration-300"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;



