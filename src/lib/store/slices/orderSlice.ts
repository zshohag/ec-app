// lib/store/slices/orderSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Order } from "@/types/types";

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

// Async thunks
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (
    orderData: Omit<Order, "id" | "createdAt" | "updatedAt" | "status">
  ) => {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Failed to create order");
    }

    return response.json();
  }
);

export const fetchOrders = createAsyncThunk("order/fetchOrders", async () => {
  const response = await fetch("/api/orders");

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  return response.json();
});

export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ id, status }: { id: string; status: Order["status"] }) => {
    const response = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error("Failed to update order status");
    }

    return response.json();
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create order";
      })
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch orders";
      })
      // Update Order Status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        if (state.currentOrder?.id === action.payload.id) {
          state.currentOrder = action.payload;
        }
      });
  },
});

export const { clearCurrentOrder, clearError } = orderSlice.actions;
export default orderSlice.reducer;


////////////


// src/lib/store/slices/orderSlice.ts


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { Order } from "@/types/types";

// interface OrderState {
//   orders: Order[];
//   currentOrder: Order | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: OrderState = {
//   orders: [],
//   currentOrder: null,
//   loading: false,
//   error: null,
// };

// export const createOrder = createAsyncThunk<
//   Order,
//   Omit<Order, "id" | "createdAt" | "updatedAt" | "status">,
//   { rejectValue: string }
// >(
//   "order/createOrder",
//   async (orderData, { rejectWithValue }) => {
//     try {
//       console.log("Creating order with data:", JSON.stringify(orderData, null, 2));
//       const response = await fetch("/api/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(orderData),
//       });
//       console.log("API Response status:", response.status);
//       console.log("API Response headers:", [...response.headers.entries()]);
//       if (!response.ok) {
//         const text = await response.text();
//         console.error("API Response text (non-JSON):", text.slice(0, 500));
//         throw new Error(
//           `Failed to create order (status: ${response.status}, response: ${text.slice(0, 100)}...)`
//         );
//       }
//       const data = await response.json();
//       console.log("API Response data:", data);
//       return data;
//     } catch (error) {
//       console.error("Error in createOrder:", error);
//       return rejectWithValue(
//         error instanceof Error ? error.message : "Failed to create order"
//       );
//     }
//   }
// );

// export const fetchOrders = createAsyncThunk<
//   Order[],
//   void,
//   { rejectValue: string }
// >("order/fetchOrders", async (_, { rejectWithValue }) => {
//   try {
//     const response = await fetch("/api/orders");
//     if (!response.ok) {
//       const text = await response.text();
//       throw new Error(
//         `Failed to fetch orders (status: ${response.status}, response: ${text.slice(0, 100)}...)`
//       );
//     }
//     return await response.json();
//   } catch (error) {
//     return rejectWithValue(
//       error instanceof Error ? error.message : "Failed to fetch orders"
//     );
//   }
// });

// export const updateOrderStatus = createAsyncThunk<
//   Order,
//   { id: string; status: Order["status"] },
//   { rejectValue: string }
// >(
//   "order/updateOrderStatus",
//   async ({ id, status }, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`/api/orders/${id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ status }),
//       });
//       if (!response.ok) {
//         const text = await response.text();
//         throw new Error(
//           `Failed to update order status (status: ${response.status}, response: ${text.slice(0, 100)}...)`
//         );
//       }
//       return await response.json();
//     } catch (error) {
//       return rejectWithValue(
//         error instanceof Error ? error.message : "Failed to update order status"
//       );
//     }
//   }
// );

// const orderSlice = createSlice({
//   name: "order",
//   initialState,
//   reducers: {
//     clearCurrentOrder: (state) => {
//       state.currentOrder = null;
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Create Order
//       .addCase(createOrder.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createOrder.fulfilled, (state, action) => {
//         state.loading = false;
//         state.currentOrder = action.payload;
//         state.orders.push(action.payload);
//       })
//       .addCase(createOrder.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to create order";
//       })
//       // Fetch Orders
//       .addCase(fetchOrders.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchOrders.fulfilled, (state, action) => {
//         state.loading = false;
//         state.orders = action.payload;
//       })
//       .addCase(fetchOrders.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to fetch orders";
//       })
//       // Update Order Status
//       .addCase(updateOrderStatus.fulfilled, (state, action) => {
//         const index = state.orders.findIndex(
//           (order) => order.id === action.payload.id
//         );
//         if (index !== -1) {
//           state.orders[index] = action.payload;
//         }
//         if (state.currentOrder?.id === action.payload.id) {
//           state.currentOrder = action.payload;
//         }
//       })
//       .addCase(updateOrderStatus.rejected, (state, action) => {
//         state.error = action.payload || "Failed to update order status";
//       });
//   },
// });

// export const { clearCurrentOrder, clearError } = orderSlice.actions;
// export default orderSlice.reducer;
