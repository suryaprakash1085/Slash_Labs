import { useState, useEffect, useCallback } from 'react';

export interface Product {
  id: string;
  icon: string | null;
  name: string;
  subtitle: string;
  description: string;
  features: string;
  tech: string | null;
  image: string;
  price: number | null;
  status: string;
  category: string | null;
  dateAdded: string;
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
}

const API_BASE_URL = import.meta.env.VITE_PUBLIC_API_BASE_URL || 'http://localhost:9005';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try the new endpoint first, fallback to old one
      let response = await fetch(`${API_BASE_URL}/api/products`);
      
      // If that fails, try localhost:8080
      if (!response.ok) {
        response = await fetch('http://localhost:8080/api/products');
      }
      
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }
      
      const data: ProductsResponse = await response.json();
      if (data.success) {
        setProducts(data.data);
      } else {
        throw new Error('API returned unsuccessful response');
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      console.error('Error fetching products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
};
