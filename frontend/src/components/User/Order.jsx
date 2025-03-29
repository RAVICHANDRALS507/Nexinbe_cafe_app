import Navbar from "./Navbar"; // Add this import

const OrderTracking = () => {
  return (
    <>
      <Navbar />
      <div className="text-center p-10">
        <h1 className="text-3xl font-bold">Order Tracking</h1>
        <p>Your order is being prepared...</p>
      </div>
    </>
  );
};

export default OrderTracking;
