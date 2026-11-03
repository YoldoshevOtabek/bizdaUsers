import ProductDetail from "@/src/features/products/components/ProductDetail";
import Products from "@/src/features/products/components/Products";
import { getProduct as getProductById } from "@/src/features/products/services/getProducts";
import { getProduct } from "@/src/services/getProduct";
import { allCategoryes } from "@/src/services/categoryes";
import { pageMeta } from "@/src/lib/seo";
import { siteConfig } from "@/src/lib/site";
import { mediaUrl } from "@/src/lib/format";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Category } from "@/src/features/categories/types/categoryes";

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<
    Record<string, string | string[] | undefined>
  >;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    return pageMeta(
      "Mahsulotlar",
      "Dealper katalogi: smartfon, noutbuk, audio va boshqa texnika.",
      "/products",
    );
  }

  if (slug.length === 1) {
    const categories = await allCategoryes();
    const category = (categories as Category[]).find((item) => item.slug === slug[0]);
    const name = category?.name || slug[0];
    return pageMeta(
      name,
      category?.description || `${name} kategoriyasidagi mahsulotlar — Dealper.`,
      `/products/${slug[0]}`,
    );
  }

  const product = await getProductById(slug[1]);
  if (!product) {
    return pageMeta("Mahsulot topilmadi", siteConfig.description, "/products");
  }

  const image =
    product.images?.find((item: { isMain?: boolean }) => item.isMain)?.url ||
    product.images?.[0]?.url;
  const description =
    product.shortDescription || product.description || `${product.name} — Dealper do‘konida.`;
  const meta = pageMeta(product.name, description, `/products/${slug[0]}/${slug[1]}`);

  if (image) {
    const url = mediaUrl(image);
    meta.openGraph = {
      ...meta.openGraph,
      type: "website",
      images: [{ url, width: 800, height: 800, alt: product.name }],
    };
    meta.twitter = { ...meta.twitter, images: [url] };
  }

  return meta;
}

export default async function Page({
  params,
  searchParams,
}: Props) {
  const { slug } = await params;
  const searchParam = await searchParams;
  const query = new URLSearchParams();

  Object.entries(searchParam).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => query.append(key, item));
    } else if (value !== undefined) {
      query.append(key, value);
    }
  });

  const queryString = query.toString();

  if (!slug || slug.length === 0) {
    const data = await getProduct(queryString || null);
    return <Products slug="" data={data} />;
  }

  if (slug.length === 1) {
    const category = `category=${encodeURIComponent(slug[0])}`;
    const finalQuery = [category, queryString]
      .filter(Boolean)
      .join("&");
    const data = await getProduct(finalQuery);

    return <Products slug={slug[0]} data={data} />;
  }
  if(slug?.length==2){
    return <ProductDetail id={slug[1]}/>
  }

  return notFound();
}