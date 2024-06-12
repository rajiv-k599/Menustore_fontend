import { Sd_Status } from "../utility/SD";
import OrderDetail from "./OrderDetailModel";

export default interface OrderHeaderModel {
  orderHeaderId?: number;
  pickupName?: string;
  pickupEmail?: string;
  pickupPhone?: string;
  applicationUserId?: string;
  user?: any;
  orderTotal?: number;
  orderDate?: string;
  stripePaymentIntentId?: string;
  status?: Sd_Status;
  totalItems?: number;
  orderDetails?: OrderDetail[];
}
