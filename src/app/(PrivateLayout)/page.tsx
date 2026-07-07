import { myFetch } from "@/utils/myFetch";
import Product from "./product/Product";

type Props = {
  searchParams: Promise<{
    searchTerm?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    minStock?: string;
    maxStock?: string;
  }>;
};

const Page = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      query.append(key, value);
    }
  });

  const res = await myFetch(`/product?${query.toString()}`, {
    method: "GET",
    tags: ["products"],
  });

  const res2 = await myFetch("/category", {
    method: "GET",
    tags: ["categories"],
  });

  const categoryList = res2.data.map((item: any) => ({
    label: item.name,
    value: item._id,
  }));

  return (
    <Product
      productData={res.data}
      categoryList={categoryList}
    />
  );
};

export default Page;