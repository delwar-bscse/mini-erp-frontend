"use client";

import { formatUrl } from "@/utils/formatUrl";
import Image from "next/image";

const Order = ({ orderData }: any) => {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between rounded-2xl border bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
          <p className="mt-1 text-gray-500">
            Total Orders: {orderData?.length}
          </p>
        </div>
      </div>

      {/* Orders */}
      <div className="space-y-6">
        {orderData?.map((order: any) => (
          <div
            key={order._id}
            className="overflow-hidden rounded-2xl border bg-white shadow-sm"
          >
            {/* Top */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b bg-gray-50 p-5">
              <div>
                <h3 className="font-semibold text-gray-800">
                  Order #{order._id.slice(-6).toUpperCase()}
                </h3>

                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-2xl font-bold text-green-600">
                  ৳{order.totalAmount.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Products */}
            <div className="divide-y">
              {order.items.map((item: any) => (
                <div
                  key={item.product._id}
                  className="flex items-center justify-between p-5"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={formatUrl(item.product.image)}
                      alt={item.product.name}
                      width={70}
                      height={70}
                      unoptimized
                      className="rounded-xl border object-cover"
                    />

                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {item.product.name}
                      </h4>

                      <p className="text-sm text-gray-500">
                        SKU: {item.product.sku}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-12">
                    <div className="text-center">
                      <p className="text-xs uppercase text-gray-400">
                        Price
                      </p>
                      <p className="font-medium">
                        ৳{item.product.selling_price.toLocaleString()}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-xs uppercase text-gray-400">
                        Qty
                      </p>
                      <p className="font-medium">{item.quantity}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs uppercase text-gray-400">
                        Subtotal
                      </p>
                      <p className="font-semibold">
                        ৳
                        {(
                          item.product.selling_price * item.quantity
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t bg-gray-50 p-5">
              <div>
                <p className="text-sm text-gray-500">
                  Created By
                </p>

                <p className="font-medium text-gray-800">
                  {order.createdBy.name}
                </p>

                <p className="text-sm text-gray-500">
                  {order.createdBy.email}
                </p>
              </div>

              <div className="max-w-sm text-right">
                <p className="text-sm text-gray-500">Note</p>

                <p className="text-gray-700">
                  {order.note || "No note"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {orderData?.length === 0 && (
        <div className="rounded-2xl border border-dashed bg-white py-20 text-center">
          <p className="text-lg font-medium text-gray-500">
            No orders found.
          </p>
        </div>
      )}
    </div>
  );
};

export default Order;