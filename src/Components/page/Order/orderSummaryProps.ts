import { ShoppingCartModel } from "../../../interface";
import { Sd_Status } from "../../../utility/SD";
export interface orderSummaryProps {
  data: {
    id: number;
    cartItems?: ShoppingCartModel[];
    cartTotal?: number;
    userId?: String;
    stripePaymentIntentId?: string;
    status?: Sd_Status;
  };
  userInput: {
    name: string;
    email: string;
    phoneNumber: string;
  };
}
