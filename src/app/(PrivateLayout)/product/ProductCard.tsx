// components/ProductCard.tsx
import { useOrder } from "@/context/OrderContext";
import { formatUrl } from "@/utils/formatUrl";
import { myFetch } from "@/utils/myFetch";
import { Pencil, SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type Product = {
  _id: string;
  name: string;
  sku: string;
  category: string;
  purchase_price: number;
  selling_price: number;
  stock_quantity: number;
  image: string;
  createdAt: string;
};

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const {items, note, addItem, removeItem, updateQuantity, setNote, } = useOrder();
    const [qnt, setQnt] = useState(1);

    const handleAddToCart = () => {
      addItem({
        id: product._id,
        name: product.name,
        sku: product.sku,
        selling_price: product.selling_price,
        quantity: qnt,
      });
    }


    const handleDelete = async (id: string) => {
      //console.log(id);
      const res = await myFetch(`/product/${id}`, {
        method: "DELETE"
      });
      //console.log(res)
      if(res.success){
        //console.log("Revalidate")
        // await revalidate("members")
        window.location.reload()
      }
    };

  const profit = product.selling_price - product.purchase_price;
  // console.log(formatUrl(product?.image))

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg w-80">  
      {/* Image */}
      <div className="w-full h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
        {product?.image ? (
          <Image
            src={formatUrl(product?.image)}
            alt={product.name}
            width={1000}
            height={1000}
            unoptimized
            className="object-cover"
          />
        ) : (
          <span className="text-gray-400 text-xs">No Image</span>
        )}
      </div>
     <div className="space-y-4 p-4">
      {/* Content */}
      <div className="flex">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900">
            {product.name}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            SKU: {product.sku}
          </p>
        </div>
        <div className="flex flex-col items-center justify-end gap-2">
            <Link href={`/product/add-product?id=${product._id}`} className="">
              <SquarePen className="size-5 text-blue-500" />
            </Link>
            <button onClick={() => handleDelete(product._id)} className="">
              <Trash2 className="size-5 text-red-500" />
            </button>
          </div>
     </div>

        {/* Price */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-gray-50 p-3">
            <p className="text-xs text-gray-500">Purchase</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              ৳{product.purchase_price}
            </p>
          </div>

          <div className="rounded-xl bg-green-50 p-3">
            <p className="text-xs text-green-700">Selling</p>
            <p className="mt-1 text-lg font-semibold text-green-700">
              ৳{product.selling_price}
            </p>
          </div>
        </div>

        {/* Stock & Profit */}
        <div className="flex items-center justify-between rounded-xl border bg-gray-50 p-3">
          <div>
            <p className="text-xs text-gray-500">Stock</p>
            <p
              className={`font-semibold ${
                product.stock_quantity > 10
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {product.stock_quantity} pcs
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-500">Profit</p>
            <p className="font-semibold text-blue-600">
              ৳{profit}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <input min={1} type="number" className="border rounded p-2 w-40" value={qnt} onChange={(e)=> setQnt(Number(e.target.value))} />
          <button onClick={handleAddToCart} className="bg-gray-500 text-white p-2 rounded">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;