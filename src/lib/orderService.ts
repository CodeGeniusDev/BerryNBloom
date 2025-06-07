import { supabase } from './supabase';
import { getProductById } from '../data/products';

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  notes?: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  shipping_address: ShippingAddress;
  created_at: string;
  updated_at: string;
  cancellable_until: string;
  order_items: OrderItem[];
}

export interface OrderWithProducts extends Omit<Order, 'order_items'> {
  order_items: (OrderItem & {
    product_name: string;
    product_image: string;
  })[];
}

export const createOrder = async (
  orderData: {
    total: number;
    shipping_address: ShippingAddress;
    items: Array<{
      product_id: string;
      quantity: number;
      price: number;
    }>;
  }
): Promise<Order> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated to create an order');
  }

  try {
    // Start a transaction by creating the order first
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        total: orderData.total,
        shipping_address: orderData.shipping_address,
        status: 'pending'
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      throw new Error(`Failed to create order: ${orderError.message}`);
    }

    // Create order items
    const orderItems = orderData.items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Error creating order items:', itemsError);
      // If order items fail, we should clean up the order
      await supabase.from('orders').delete().eq('id', order.id);
      throw new Error(`Failed to create order items: ${itemsError.message}`);
    }

    // Clear the user's cart after successful order creation
    const { error: cartError } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id);

    if (cartError) {
      console.error('Error clearing cart:', cartError);
      // Don't fail the order creation if cart clearing fails
    }

    // Fetch the complete order with items
    const completeOrder = await getOrderById(order.id);
    return completeOrder;
  } catch (error) {
    console.error('Error in createOrder:', error);
    throw error;
  }
};

export const getOrderById = async (orderId: string): Promise<Order> => {
  const { data: order, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*)
    `)
    .eq('id', orderId)
    .single();

  if (error) {
    console.error('Error fetching order:', error);
    throw new Error(`Failed to fetch order: ${error.message}`);
  }

  return order;
};

export const getUserOrders = async (): Promise<OrderWithProducts[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated to view orders');
  }

  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      throw new Error(`Failed to fetch orders: ${error.message}`);
    }

    // Enhance order items with product information
    const ordersWithProducts: OrderWithProducts[] = orders.map(order => ({
      ...order,
      order_items: order.order_items.map(item => {
        const product = getProductById(item.product_id);
        return {
          ...item,
          product_name: product?.name || 'Unknown Product',
          product_image: product?.image || '/images/placeholder.jpg'
        };
      })
    }));

    return ordersWithProducts;
  } catch (error) {
    console.error('Error in getUserOrders:', error);
    throw error;
  }
};

export const cancelOrder = async (orderId: string): Promise<Order> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated to cancel orders');
  }

  try {
    // First check if the order belongs to the user and is cancellable
    const { data: order, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .eq('user_id', user.id)
      .single();

    if (fetchError) {
      console.error('Error fetching order for cancellation:', fetchError);
      throw new Error('Order not found or access denied');
    }

    // Check if order is still cancellable
    const now = new Date();
    const cancellableUntil = new Date(order.cancellable_until);
    
    if (now > cancellableUntil) {
      throw new Error('Order cancellation period has expired');
    }

    if (order.status !== 'pending') {
      throw new Error('Only pending orders can be cancelled');
    }

    // Update order status to cancelled
    const { data: updatedOrder, error: updateError } = await supabase
      .from('orders')
      .update({ 
        status: 'cancelled',
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (updateError) {
      console.error('Error cancelling order:', updateError);
      throw new Error(`Failed to cancel order: ${updateError.message}`);
    }

    // Fetch the complete updated order
    const completeOrder = await getOrderById(orderId);
    return completeOrder;
  } catch (error) {
    console.error('Error in cancelOrder:', error);
    throw error;
  }
};

export const getOrderStatusColor = (status: Order['status']): string => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'processing':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'shipped':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'delivered':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const formatOrderStatus = (status: Order['status']): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export const isOrderCancellable = (order: Order): boolean => {
  if (order.status !== 'pending') return false;
  
  const now = new Date();
  const cancellableUntil = new Date(order.cancellable_until);
  
  return now <= cancellableUntil;
};