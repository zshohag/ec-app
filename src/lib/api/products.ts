import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

import { Product } from "@/types/product"


// API functions
const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch("/api/products")
  if (!response.ok) throw new Error("Failed to fetch products")
  return response.json()
}

const fetchProduct = async (id: string): Promise<Product> => {
  const response = await fetch(`/api/products/${id}`)
  if (!response.ok) throw new Error("Failed to fetch product")
  return response.json()
}

const createProduct = async (product: Omit<Product, "id">): Promise<Product> => {
  const response = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
  if (!response.ok) throw new Error("Failed to create product")
  return response.json()
}

// React Query hooks
export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  })
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...product }: Product) => {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      })
      if (!response.ok) throw new Error("Failed to update product")
      return response.json()
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      queryClient.invalidateQueries({ queryKey: ["product", data.id] })
    },
  })
}

/// HOOK FOR DELETING A PRODUCT
export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
 
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete product")
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })
}

// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { Product } from "@/types/product";

// // API functions
// const fetchProducts = async (): Promise<Product[]> => {
//   const response = await fetch("/api/products");
//   if (!response.ok) throw new Error("Failed to fetch products");
//   return response.json();
// };

// const fetchProduct = async (id: string): Promise<Product> => {
//   const response = await fetch(`/api/products/${id}`, { cache: "no-store" });
//   if (!response.ok) {
//     if (response.status === 404) throw new Error("Product not found");
//     throw new Error(`Failed to fetch product: ${response.statusText}`);
//   }
//   return response.json();
// };

// const fetchRelatedProducts = async (category: string, excludeId: string): Promise<Product[]> => {
//   const response = await fetch(`/api/products/get-all?category=${encodeURIComponent(category)}`);
//   if (!response.ok) throw new Error("Failed to fetch related products");
//   const products = await response.json();
//   return products.filter((p: Product) => p.id !== excludeId).slice(0, 6);
// };

// const createProduct = async (product: Omit<Product, "id">): Promise<Product> => {
//   const response = await fetch("/api/products", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(product),
//   });
//   if (!response.ok) throw new Error("Failed to create product");
//   return response.json();
// };

// // React Query hooks
// export const useProducts = () => {
//   return useQuery({
//     queryKey: ["products"],
//     queryFn: fetchProducts,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//   });
// };

// export const useProduct = (id: string) => {
//   return useQuery({
//     queryKey: ["product", id],
//     queryFn: () => fetchProduct(id),
//     enabled: !!id,
//     staleTime: 60 * 1000, // 1 minute for product details
//   });
// };

// export const useRelatedProducts = (category: string, excludeId: string) => {
//   return useQuery({
//     queryKey: ["relatedProducts", category, excludeId],
//     queryFn: () => fetchRelatedProducts(category, excludeId),
//     enabled: !!category && !!excludeId,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//   });
// };

// export const useCreateProduct = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: createProduct,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["products"] });
//     },
//   });
// };

// export const useUpdateProduct = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ id, ...product }: Product) => {
//       const response = await fetch(`/api/products/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(product),
//       });
//       if (!response.ok) throw new Error("Failed to update product");
//       return response.json();
//     },
//     onSuccess: (data) => {
//       queryClient.invalidateQueries({ queryKey: ["products,"] });
//       queryClient.invalidateQueries({ queryKey: ["product", data.id] });
//     },
//   });
// };

// export const useDeleteProduct = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (id: string) => {
//       const response = await fetch(`/api/products/${id}`, {
//         method: "DELETE",
//       });
//       if (!response.ok) throw new Error("Failed to delete product");
//       return response.status === 204 ? {} : response.json();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["products"] });
//     },
//   });
// };