import { useState, useEffect } from "react"; 
import { motion } from "framer-motion"; 
import {  
  FaSearch,  
  FaFilter,  
  FaCheck,  
  FaTimes,  
  FaClock, 
  FaArrowRight, 
  FaSort, 
  FaSortUp, 
  FaSortDown 
} from "react-icons/fa"; 
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
 
const BACKEND_URL = "http://localhost:5000"; 
 
const AdminOrders = () => { 
  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [statusFilter, setStatusFilter] = useState("all"); 
  const [sortField, setSortField] = useState("date"); 
  const [sortDirection, setSortDirection] = useState("desc"); 
  const [selectedOrder, setSelectedOrder] = useState(null); 
 
  useEffect(() => { 
    fetchOrders(); 
  }, []); 
 
  const fetchOrders = async () => { 
    try { 
      const response = await fetch(`${BACKEND_URL}/api/admin/orders`); 
      const data = await response.json(); 
      setOrders(data); 
      setLoading(false); 
    } catch (error) { 
      toast.error("Failed to fetch orders"); 
      setLoading(false); 
    } 
  }; 
 
  const handleStatusUpdate = async (orderId, newStatus) => { 
    try { 
      const response = await fetch(`${BACKEND_URL}/api/admin/orders/${orderId}/status`, { 
        method: "PUT", 
        headers: { 
          "Content-Type": "application/json", 
        }, 
        body: JSON.stringify({ status: newStatus }), 
      }); 
 
      if (response.ok) { 
        toast.success("Order status updated successfully"); 
        fetchOrders(); 
      } else { 
        throw new Error("Failed to update status"); 
      } 
    } catch (error) { 
      toast.error("Failed to update order status"); 
    } 
  }; 
 
  const filteredOrders = orders 
    .filter(order => { 
      const matchesSearch = 
order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.orderId.toLowerCase().includes(searchTerm.toLowerCase()); 
      const matchesStatus = statusFilter === "all" || order.status === statusFilter; 
      return matchesSearch && matchesStatus; 
    }) 
    .sort((a, b) => { 
      const direction = sortDirection === "asc" ? 1 : -1; 
      if (sortField === "date") { 
        return direction * (new Date(a.date) - new Date(b.date)); 
      } 
      if (sortField === "total") { 
        return direction * (a.total - b.total); 
      } 
      return 0; 
    }); 
 
  const OrderCard = ({ order }) => ( 
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 
transform hover:-translate-y-1" 
    > 
      <div className="p-5"> 
        <div className="flex items-center justify-between mb-4"> 
          <div className="flex items-center space-x-3"> 
            <div className="p-2 bg-orange-100 rounded-full"> 
              <FaClock className="text-orange-500" /> 
            </div> 
            <div> 
              <h3 className="font-semibold text-gray-800">Order #{order.orderId}</h3> 
              <p className="text-sm text-gray-500">{new Date(order.date).toLocaleString()}</p> 
            </div> 
          </div> 
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${ 
            order.status === 'completed' ? 'bg-green-100 text-green-800' : 
            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
            'bg-red-100 text-red-800' 
          }`}> 
            {order.status} 
          </span> 
        </div> 
 
        <div className="space-y-3"> 
          <div className="flex items-center justify-between text-sm"> 
            <span className="text-gray-600">Customer:</span> 
            <span className="font-medium text-gray-800">{order.customerName}</span> 
          </div> 
          <div className="flex items-center justify-between text-sm"> 
            <span className="text-gray-600">Items:</span> 
            <span className="font-medium text-gray-800">{order.items.length}</span> 
          </div> 
          <div className="flex items-center justify-between text-sm"> 
            <span className="text-gray-600">Total:</span> 
            <span className="font-semibold text-orange-500">${order.total.toFixed(2)}</span> 
          </div> 
        </div> 
 
        <div className="mt-4 pt-4 border-t border-gray-100"> 
          <div className="flex space-x-2"> 
            <button 
              onClick={() => handleStatusUpdate(order._id, 'completed')} 
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${ 
                order.status === 'completed' 
                  ? 'bg-green-100 text-green-800 cursor-not-allowed' 
                  : 'bg-green-500 text-white hover:bg-green-600' 
              }`} 
              disabled={order.status === 'completed'} 
            > 
              <FaCheck className="inline-block mr-1" /> Complete 
            </button> 
            <button 
              onClick={() => handleStatusUpdate(order._id, 'cancelled')} 
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${ 
                order.status === 'cancelled' 
                  ? 'bg-red-100 text-red-800 cursor-not-allowed' 
                  : 'bg-red-500 text-white hover:bg-red-600' 
              }`} 
              disabled={order.status === 'cancelled'} 
            > 
              <FaTimes className="inline-block mr-1" /> Cancel 
            </button> 
          </div> 
        </div> 
      </div> 
    </motion.div> 
  ); 
 
  const SortButton = ({ field, label }) => ( 
    <button 
      onClick={() => { 
        if (sortField === field) { 
          setSortDirection(sortDirection === "asc" ? "desc" : "asc"); 
        } else { 
          setSortField(field); 
          setSortDirection("desc"); 
        } 
      }} 
      className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-gray
800" 
    > 
      <span>{label}</span> 
      {sortField === field && ( 
        sortDirection === "asc" ? <FaSortUp /> : <FaSortDown /> 
      )} 
      {sortField !== field && <FaSort />} 
    </button> 
  ); 
 
  return ( 
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6"> 
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="light" 
      /> 
 
      <div className="max-w-7xl mx-auto"> 
        {/* Header */} 
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-8" 
        > 
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Management</h1> 
          <p className="text-gray-600">Manage and track all customer orders</p> 
        </motion.div> 
 
        {/* Filters and Search */} 
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-8" 
        > 
          <div className="flex flex-col sm:flex-row gap-4"> 
            <div className="flex-1"> 
              <div className="relative"> 
                <input 
                  type="text" 
                  placeholder="Search orders..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline
none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                /> 
                <FaSearch className="absolute left-3 top-3 text-gray-400" /> 
              </div> 
            </div> 
            <div className="flex items-center space-x-4"> 
              <div className="flex items-center space-x-2"> 
                <FaFilter className="text-gray-400" /> 
                <select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)} 
                  className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none 
focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
                > 
                  <option value="all">All Status</option> 
                  <option value="pending">Pending</option> 
                  <option value="completed">Completed</option> 
                  <option value="cancelled">Cancelled</option> 
                </select> 
              </div> 
              <div className="flex items-center space-x-4"> 
                <SortButton field="date" label="Date" /> 
                <SortButton field="total" label="Total" /> 
              </div> 
            </div> 
          </div> 
        </motion.div> 
 
        {/* Orders Grid */} 
        {loading ? ( 
          <div className="flex justify-center items-center h-64"> 
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border
orange-500"></div> 
          </div> 
        ) : ( 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
            {filteredOrders.map((order) => ( 
              <OrderCard key={order._id} order={order} /> 
            ))} 
          </div> 
        )} 
 
        {/* Empty State */} 
        {!loading && filteredOrders.length === 0 && ( 
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center py-12" 
          > 
            <div className="text-gray-400 mb-4"> 
              <FaSearch className="text-5xl mx-auto" /> 
            </div> 
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No orders found</h3> 
            <p className="text-gray-600">Try adjusting your search or filter criteria</p> 
          </motion.div> 
        )} 
      </div> 
    </div> 
  ); 
}; 
 
export default AdminOrders; 