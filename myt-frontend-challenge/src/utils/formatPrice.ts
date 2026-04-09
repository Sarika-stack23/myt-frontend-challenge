export const formatPrice = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const calculateTax = (amount: number, rate: number = 0.1): number => {
  return parseFloat((amount * rate).toFixed(2));
};

export const calculateTotal = (subtotal: number, tax: number): number => {
  return parseFloat((subtotal + tax).toFixed(2));
};
