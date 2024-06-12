export default interface ShoppingCartModel {
  id?: number;
  userId?: string;
  cartItems?: any[];
  cartTotal?: number;
  stripePaymentIntentId?: any;
  clientSecret?: any;
}
