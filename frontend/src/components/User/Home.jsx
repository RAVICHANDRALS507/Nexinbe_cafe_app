import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

//const BACKEND_URL = "http://localhost:5000"; // Replace with your actual backend URL
//const BACKEND_URL = "https://nexinbe-cafe-app-git-main-ravichandra-l-ssprojects.vercel.app";
const BACKEND_URL = "https://nexinbe-cafe-app.vercel.app";


const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [errorFeatured, setErrorFeatured] = useState(null);

  const backgroundImages = [
    "https://th.bing.com/th/id/OIP.jJI3bTJ-diLfKDHb9-vwmwHaE8?rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/OIP.43SgNn_c6tlgJVX7hmFO3wHaE7?w=626&h=417&rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/OIP.y4p6mRVTwf2k7HR7p8f3uQHaE6?rs=1&pid=ImgDetMain",
    // Add more image URLs here
  ];
  const transitionDuration = 500; // milliseconds
  const intervalDuration = 5000; // milliseconds
  const imageMarginTop = 'mt-4'; // Tailwind class for margin-top (adjust as needed)
  const featuredRefreshInterval = 60 * 1000; // 1 minute in milliseconds

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, intervalDuration);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [backgroundImages.length]);

  const fetchAndSelectRandomItems = async () => {
    setLoadingFeatured(true);
    setErrorFeatured(null);
    try {
      const response = await fetch(`${BACKEND_URL}/api/menu`); // Replace '/api/featured-items' with your actual API endpoint
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const allItems = await response.json();

      if (allItems.length > 0) {
        const numberOfFeaturedItems = Math.min(3, allItems.length); // Display up to 3 random items
        const randomItems = [];
        const availableIndices = [...Array(allItems.length).keys()]; // Create an array of indices

        for (let i = 0; i < numberOfFeaturedItems; i++) {
          const randomIndex = Math.floor(Math.random() * availableIndices.length);
          const selectedIndex = availableIndices.splice(randomIndex, 1)[0]; // Remove selected index
          randomItems.push(allItems[selectedIndex]);
        }
        setFeaturedItems(randomItems);
      } else {
        setFeaturedItems([]); // No items to display
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
      setErrorFeatured(error.message || "Failed to load menu items.");
    } finally {
      setLoadingFeatured(false);
    }
  };

  useEffect(() => {
    fetchAndSelectRandomItems(); // Fetch initial featured items

    const intervalId = setInterval(() => {
      fetchAndSelectRandomItems(); // Fetch new random items every minute
    }, featuredRefreshInterval);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [featuredRefreshInterval]); // Re-run effect only if the interval changes (it won't here)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-screen md:h-[800px] overflow-hidden"> {/* Increased height */}
        {backgroundImages.map((imageUrl, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-${transitionDuration} ease-in-out ${
              index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            } ${imageMarginTop}`}
            style={{
              backgroundImage: `url('${imageUrl}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
        ))}

        <div className="relative h-full flex items-center justify-center text-center px-4 sm:px-8 z-20">
          <div className={`space-y-8 transform transition-all duration-1000 ease-out
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
              sm:translate-y-0 sm:opacity-100 // Override for non-mobile
            `}>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white group"> {/* Increased heading size for mobile */}
              <span className="relative inline-block">
                Welcome to Our{" "}
                <span className="text-orange-500 relative after:block after:h-[4px] after:bg-orange-500 after:scale-x-0 group-hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-500">
                  Cafeteria
                </span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-md md:max-w-2xl mx-auto"> {/* Increased paragraph size for mobile */}
              Experience the perfect blend of taste and ambiance
            </p>
            <Link
              to="/menu"
              className="inline-block px-10 py-4 md:px-12 md:py-4 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 text-lg md:text-xl"
            >
              Explore Menu
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Items Section */}
      <div className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            <span className="relative inline-block group">
              Featured{" "}
              <span className="text-orange-500 relative after:block after:h-[2px] after:bg-orange-500 after:scale-x-0 group-hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-500">
                Delights
              </span>
            </span>
          </h2>

          {loadingFeatured ? (
            <div className="text-center">Loading featured items...</div>
          ) : errorFeatured ? (
            <div className="text-center text-red-500">{errorFeatured}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredItems.map((item, index) => (
                <div
                  key={item._id}
                  className={`group relative overflow-hidden rounded-xl shadow-lg transform transition-all duration-700 ease-out hover:scale-105
                    ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="relative h-48 md:h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-2"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white text-sm md:text-base">{item.description}</p>
                      </div>
                    </div>
                    {item.category && (
                      <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs md:text-sm font-medium transform -rotate-2 hover:rotate-2 transition-transform duration-300">
                        {item.category}
                      </div>
                    )}
                  </div>

                  <div className="p-3 md:p-4 bg-white">
                    <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 group-hover:text-orange-500 transition-colors duration-300">
                      {item.name}
                    </h3>
                    <Link
                      to={`/menu/${item._id}`}
                      className="relative inline-block group text-orange-500 hover:text-orange-600 font-medium text-sm md:text-base"
                    >
                      <span className="relative after:block after:h-[2px] after:bg-orange-500 after:scale-x-0 group-hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300">
                        View Details →
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-orange-50 transform -skew-y-6"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Ready to Order?</h2>
          <Link
            to="/menu"
            className="inline-block px-6 py-3 md:px-8 md:py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 text-sm md:text-base"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Home;