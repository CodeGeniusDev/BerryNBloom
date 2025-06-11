import emailjs from '@emailjs/browser';

interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  notes: string;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderData {
  customer: Customer;
  orderItems: OrderItem[];
  orderTotal: number;
  orderDate: string;
}

export const sendOrderEmail = async (orderData: OrderData) => {
  try {
    const serviceId = 'service_gsgkfdc';
    const templateId = 'template_contact';
    const publicKey = 'rBZMCmJ5z4pvZcf-B';

    const formattedItems = orderData.orderItems
      .map(
        (item) =>
          `${item.name} - $${item.price.toFixed(2)} x ${item.quantity} = $${(
            item.price * item.quantity
          ).toFixed(2)}`
      )
      .join('\n');

    const templateParams = {
      to_email: 'codegenius.inc@gmail.com',
      from_name: `${orderData.customer.firstName} ${orderData.customer.lastName}`,
      from_email: orderData.customer.email,
      order_number: `ORD-${Date.now().toString().slice(-6)}`,
      order_date: new Date(orderData.orderDate).toLocaleDateString(),
      customer_name: `${orderData.customer.firstName} ${orderData.customer.lastName}`,
      customer_email: orderData.customer.email,
      customer_phone: orderData.customer.phone,
      shipping_address: `${orderData.customer.address}, ${orderData.customer.city}, ${orderData.customer.state} ${orderData.customer.zip}`,
      order_items: formattedItems,
      order_subtotal: `$${(
        orderData.orderTotal - (orderData.orderTotal > 50 ? 0 : 5.99)
      ).toFixed(2)}`,
      shipping_cost: orderData.orderTotal > 50 ? 'Free' : '$5.99',
      order_total: `$${orderData.orderTotal.toFixed(2)}`,
      notes: orderData.customer.notes || 'No special instructions provided.',
    };

    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );

    if (response.status === 200) {
      return { success: true };
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
};

export const sendContactEmail = async (contactData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const serviceId = 'service_gsgkfdc';
    const templateId = 'template_vskzi4g';
    const publicKey = 'rBZMCmJ5z4pvZcf-B';

    // Format the message to include all contact information
    // const formattedMessage = `
    //   Name: ${contactData.name}
    //   Email: ${contactData.email}

    //   Message:
    //   ${contactData.message}
    // `;

    const templateParams = {
      to_email: 'codegenius.inc@gmail.com',
      from_name: contactData.name,
      from_email: contactData.email,
      reply_to: contactData.email,
      subject: `${contactData.subject}`,
      message: contactData.message,
      name: contactData.name,
      email: contactData.email,
    };

    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );

    if (response.status === 200) {
      return { success: true };
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Email service error', error);
    throw error;
  }
};
