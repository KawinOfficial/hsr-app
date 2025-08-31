import { NextRequest } from "next/server";
import { getNotificationList } from "./getNotificationList";
import { createNotification } from "./createNotification";

export async function GET() {
  return getNotificationList();
}

export async function POST(request: NextRequest) {
  const { paymentId, assetId, liabilityId, documentTypesId } =
    await request.json();

  return createNotification({
    paymentId,
    assetId,
    liabilityId,
    documentTypesId,
  });
}
