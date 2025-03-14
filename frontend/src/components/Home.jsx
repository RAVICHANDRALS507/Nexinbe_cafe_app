import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/459469/pexels-photo-459469.jpeg?cs=srgb&dl=basil-delicious-food-459469.jpg&fm=jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex h-full">
        <div className="flex flex-col items-start justify-center p-10 w-1/2">
          <h1 className="text-4xl font-bold text-white animate-typewriter">Welcome to Our Cafe</h1>
          <p className="text-lg my-4 text-white animate-typewriter">
            Discover a world of flavors and indulge in our culinary delights!
          </p>
          <Link to="/menu" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mt-4">View Menu</Link>
        </div>
        <div className="flex items-center justify-center w-1/2">
          <img 
            src="https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?cs=srgb&dl=beef-bread-buns-1633578.jpg&fm=jpg" 
            alt="Delicious Food" 
            className="w-80 h-80 object-cover shadow-lg" // Increased size to w-80 h-80
            style={{ borderRadius: '8.25rem' }} // Set border radius to 8.25rem
          />
        </div>
      </div>
    </div>
  );
};

export default Home;