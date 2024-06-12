import { Sd_Status } from "../utility/SD";

const getStatusColor = (status: Sd_Status) => {
  return status === Sd_Status.CONFIRMED
    ? "primary"
    : status === Sd_Status.PENDING
    ? "secondary"
    : status === Sd_Status.CANCELLED
    ? "danger"
    : status === Sd_Status.COMPLETED
    ? "success"
    : status === Sd_Status.BEING_COOKED
    ? "info"
    : status === Sd_Status.READY_FOR_PICKUP && "warning";
};

export default getStatusColor;
