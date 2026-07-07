"use client";

import { useMemo } from "react";
import { Trash2 } from "lucide-react";
import { useOrder } from "@/context/OrderContext";
import { myFetch } from "@/utils/myFetch";
import { useState } from "react";

const ViewCart = () => {
  const [isPending, setIsPending] = useState(false);
  const { items, removeItem, updateQuantity, clearOrder } = useOrder();

  const total = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + item.selling_price * item.quantity,
        0
      ),
    [items]
  );

      const handleOrder = async () => {
        setIsPending(true)
        const res = await myFetch(`/order`, {
          method: "POST",
          body: {
            items: items.map((item) => ({
              product: item.id,
              quantity: item.quantity,
            })),
            note: total.toString(),
          }
        });
        //console.log({res})
        if(res.success){
          //console.log("Success")
          clearOrder()
          setIsPending(false)
          return
        }
        setIsPending(false)
      };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b p-6">
        <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
        <p className="mt-1 text-sm text-gray-500">
          {items.length} Product{items.length !== 1 && "s"} in your cart
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50 text-sm uppercase tracking-wide text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left">Product</th>
              <th className="px-6 py-4 text-left">SKU</th>
              <th className="px-6 py-4 text-right">Price</th>
              <th className="px-6 py-4 text-center">Quantity</th>
              <th className="px-6 py-4 text-right">Subtotal</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-gray-500"
                >
                  Your cart is empty.
                </td>
              </tr>
            ) : (
              items.map((item) => {
                const subtotal = item.selling_price * item.quantity;

                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {item.name}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {item.sku}
                    </td>

                    <td className="px-6 py-4 text-right">
                      ৳{item.selling_price.toLocaleString()}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.id,
                              Number(e.target.value)
                            )
                          }
                          className="w-20 rounded-lg border border-gray-300 p-2 text-center outline-none focus:border-green-500"
                        />
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right font-semibold">
                      ৳{subtotal.toLocaleString()}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>

          {items.length > 0 && (
            <tfoot className="bg-gray-50">
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-4 text-right font-semibold"
                >
                  Total
                </td>

                <td className="px-6 py-4 text-right text-xl font-bold text-green-600">
                  ৳{total.toLocaleString()}
                </td>

                <td />
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {items.length > 0 && (
        <div className="flex items-center justify-between border-t p-6">
          <div>
            <p className="text-sm text-gray-500">Grand Total</p>
            <p className="text-3xl font-bold text-green-600">
              ৳{total.toLocaleString()}
            </p>
          </div>

          <button disabled={isPending} onClick={handleOrder} className="rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700">
            {isPending ? "Processing..." : "Place Order"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewCart;