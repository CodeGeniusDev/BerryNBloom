import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Calendar, MapPin, Phone, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { getUserOrders, cancelOrder, OrderWithProducts, getOrderStatusColor, formatOrderStatus, isOrderCancellable } from '../lib/orderService';
import { useAuth } from '../context/AuthContext';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<OrderWithProducts[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const userOrders = await getUserOrders();
      setOrders(userOrders);
    } catch (err) {
      console.error('Error loading orders:', err);
      setError(err instanceof Error ? err.message : 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    try {
      setCancellingOrderId(orderId);
      setError(null);
      await cancelOrder(orderId);
      await loadOrders(); // Refresh orders after cancellation
    } catch (err) {
      console.error('Error cancelling order:', err);
      setError(err instanceof Error ? err.message : 'Failed to cancel order');
    } finally {
      setCancellingOrderId(null);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container-custom">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-gray-600">Loading your orders...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8">My Orders</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6 flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Error</p>
                <p>{error}</p>
              </div>
            </div>
          )}

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
              <p className="text-gray-600 mb-6">You haven't placed any orders yet. Start shopping to see your orders here!</p>
              <a 
                href="/products" 
                className="inline-block bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                Start Shopping
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">
                            Order #{order.id.slice(0, 8).toUpperCase()}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium border ${getOrderStatusColor(order.status)}`}
                          >
                            {formatOrderStatus(order.status)}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 gap-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(order.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                          <div className="font-medium text-gray-900">
                            Total: ${order.total.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      
                      {isOrderCancellable(order) && (
                        <button
                          onClick={() => handleCancelOrder(order.id)}
                          disabled={cancellingOrderId === order.id}
                          className="px-4 py-2 text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                        >
                          {cancellingOrderId === order.id ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Cancelling...
                            </>
                          ) : (
                            'Cancel Order'
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <h4 className="font-medium mb-4">Order Items</h4>
                    <div className="space-y-3">
                      {order.order_items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                            <img 
                              src={item.product_image} 
                              alt={item.product_name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h5 className="font-medium">{item.product_name}</h5>
                            <p className="text-sm text-gray-500">
                              ${item.price.toFixed(2)} × {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Information */}
                  <div className="p-6 bg-gray-50 border-t border-gray-100">
                    <h4 className="font-medium mb-3">Shipping Information</h4>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="flex items-start">
                          <MapPin className="w-4 h-4 mr-2 mt-0.5 text-gray-400" />
                          <div>
                            <p className="font-medium">
                              {order.shipping_address.firstName} {order.shipping_address.lastName}
                            </p>
                            <p className="text-gray-600">
                              {order.shipping_address.address}
                            </p>
                            <p className="text-gray-600">
                              {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-gray-600">{order.shipping_address.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-gray-600">{order.shipping_address.phone}</span>
                        </div>
                      </div>
                    </div>
                    {order.shipping_address.notes && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Notes:</span> {order.shipping_address.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Orders;