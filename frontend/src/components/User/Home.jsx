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
              Welcome to Our Cafeteria
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
