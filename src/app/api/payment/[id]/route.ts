import { getPaymentDetail } from "./getPaymentDetail";
import { deletePayment } from "./deletePayment";
import { updatePayment } from "./updatePayment";

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

export async function PUT(req: Request) {
  const { pathname } = new URL(req.url);
  const pathParts = pathname.split("/");
  const id = pathParts[pathParts.length - 1];

  return updatePayment(id, await req.json());
}
