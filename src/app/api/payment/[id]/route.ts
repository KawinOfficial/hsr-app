import { getPaymentDetail } from "./getPaymentDetail";
import { deletePayment } from "./deletePayment";

export async function GET(req: Request) {
  const { pathname } = new URL(req.url);
  const pathParts = pathname.split("/");
  const id = pathParts[pathParts.length - 1];
  return getPaymentDetail(id);
}

export async function DELETE(req: Request) {
  const { pathname } = new URL(req.url);
  const pathParts = pathname.split("/");
  const id = pathParts[pathParts.length - 1];
  return deletePayment(id);
}
