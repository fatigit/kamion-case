import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiClient } from "../../api/client";
import {
  Shipment,
  ShipmentListResponse,
  ShipmentSearchParams,
} from "../../types/api/shipment";

// Shipment state interface
export interface ShipmentState {
  shipments: Shipment[];
  currentShipment: Shipment | null;
  isLoading: boolean;
  isDetailLoading: boolean;
  error: string | null;
  searchTerm: string;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}

// Initial state
const initialState: ShipmentState = {
  shipments: [],
  currentShipment: null,
  isLoading: false,
  isDetailLoading: false,
  error: null,
  searchTerm: "",
  currentPage: 1,
  totalPages: 1,
  hasNextPage: false,
};

// Async thunks
export const fetchShipments = createAsyncThunk<
  ShipmentListResponse,
  ShipmentSearchParams,
  { rejectValue: string }
>("shipments/fetchShipments", async (params, { rejectWithValue }) => {
  try {
    const queryParams = new URLSearchParams();

    if (params.filter?.id) {
      queryParams.append("filter[id]", params.filter.id.toString());
    }

    if (params.page) {
      queryParams.append("page", params.page.toString());
    }

    if (params.per_page) {
      queryParams.append("per_page", params.per_page.toString());
    }

    const url = `/admin/shipment${
      queryParams.toString() ? "?" + queryParams.toString() : ""
    }`;
    const response = await apiClient.get(url);

    const apiResponse: ShipmentListResponse = response.data;

    // API response success check
    if (!apiResponse.success) {
      return rejectWithValue(apiResponse.message || "Yük listesi alınamadı");
    }

    return apiResponse;
  } catch (error: any) {
    const message = error.response?.data?.message || "Yük listesi alınamadı";
    return rejectWithValue(message);
  }
});

// Search shipments with debounce (will be handled in component)
export const searchShipments = createAsyncThunk<
  ShipmentListResponse,
  { id: number },
  { rejectValue: string }
>("shipments/searchShipments", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await apiClient.get(`/admin/shipment?filter[id]=${id}`);
    const apiResponse: ShipmentListResponse = response.data;

    if (!apiResponse.success) {
      return rejectWithValue(apiResponse.message || "Arama başarısız");
    }

    return apiResponse;
  } catch (error: any) {
    const message = error.response?.data?.message || "Arama başarısız";
    return rejectWithValue(message);
  }
});

// Fetch single shipment detail
export const fetchShipmentDetail = createAsyncThunk<
  Shipment,
  number,
  { rejectValue: string }
>("shipments/fetchDetail", async (id, { rejectWithValue }) => {
  try {
    const response = await apiClient.get(`/admin/shipment?filter[id]=${id}`);
    const apiResponse: ShipmentListResponse = response.data;

    if (!apiResponse.success) {
      return rejectWithValue(apiResponse.message || "Yük detayı alınamadı");
    }

    if (!apiResponse.data || apiResponse.data.length === 0) {
      return rejectWithValue("Yük bulunamadı");
    }

    return apiResponse.data[0];
  } catch (error: any) {
    const message = error.response?.data?.message || "Yük detayı alınamadı";
    return rejectWithValue(message);
  }
});

// Slice
const shipmentSlice = createSlice({
  name: "shipments",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    clearShipments: (state) => {
      state.shipments = [];
      state.currentPage = 1;
      state.totalPages = 1;
      state.hasNextPage = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch shipments cases
      .addCase(fetchShipments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchShipments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shipments = action.payload.data;
        state.error = null;

        // Handle pagination if meta exists
        if (action.payload.meta) {
          state.currentPage = action.payload.meta.current_page;
          state.totalPages = action.payload.meta.last_page;
          state.hasNextPage =
            action.payload.meta.current_page < action.payload.meta.last_page;
        }
      })
      .addCase(fetchShipments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Bir hata oluştu";
      })

      // Search shipments cases
      .addCase(searchShipments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchShipments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shipments = action.payload.data;
        state.error = null;

        // Reset pagination for search results
        state.currentPage = 1;
        state.totalPages = 1;
        state.hasNextPage = false;
      })
      .addCase(searchShipments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Arama işlemi başarısız";
      })

      // Fetch shipment detail cases
      .addCase(fetchShipmentDetail.pending, (state) => {
        state.isDetailLoading = true;
        state.error = null;
      })
      .addCase(fetchShipmentDetail.fulfilled, (state, action) => {
        state.isDetailLoading = false;
        state.currentShipment = action.payload;
        state.error = null;
      })
      .addCase(fetchShipmentDetail.rejected, (state, action) => {
        state.isDetailLoading = false;
        state.error = action.payload || "Yük detayı alınamadı";
      });
  },
});

export const { clearError, setSearchTerm, clearShipments } =
  shipmentSlice.actions;
export default shipmentSlice.reducer;
