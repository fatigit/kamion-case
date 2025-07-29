import { ApiResponse, PaginatedResponse } from "./common";

// Base entities
export interface City {
  id: number;
  name: string;
  lat: string;
  long: string;
  country_id: number;
}

export interface District {
  id: number;
  city_id: number;
  name: string;
  lat: string;
  long: string;
}

export interface Currency {
  id: number;
  name: string;
  code: string;
  value: string;
  updated_at: string;
}

// Address related
export interface Address {
  id: number;
  name: string;
  type: number;
  type_value: string;
  city: City;
  district: District;
  neighborhood: string | null;
  address: string;
  building_number: string | null;
  for_directions: string | null;
  lat: string;
  lng: string;
  responsible: string;
  responsible_phone: string;
  responsible_title: string;
  delivery_address: boolean;
  created_at: number;
}

// People and Companies
export interface Sector {
  id: number;
  name: string;
}

export interface TaxOffice {
  id: number;
  code: number;
  name: string;
  city: City;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  tckn?: string | null;
  name: string;
  surname: string;
  email: string | null;
  phone: string | null;
  type: number;
  type_value: string;
  status: number;
  status_value: string;
  phone_verified_at: number | null;
  email_verified_at: number | null;
  avatar: string | null;
  creator: any | null;
  created_at: number;
  updated_at: number;
}

export interface ShipperSettings {
  type: number;
  tag: string | null;
  billing_cycle: number;
  monthly_transport: string | null;
  use_balance: boolean;
  use_negative_balance: boolean;
  negative_balance: string | null;
  settings: any | null;
  tax_office: TaxOffice;
  head_office_city: any | null;
  region_fuel_price: string;
  region_fuel_price_currency: string;
  creator: User;
  profit_margin: string;
  created_at: number;
}

export interface Shipper {
  id: number;
  name: string;
  tax_number: string;
  tax_office: string | null;
  sector: Sector;
  settings: ShipperSettings;
  phone: string;
  created_at: number;
}

export interface Carrier {
  id: number;
  name: string;
  bank: string | null;
  iban: string;
}

export interface Driver {
  user_id: number;
  name: string;
  surname: string;
  type: number;
  type_value: string;
  phone: string;
}

export interface Vehicle {
  id: number;
  type: number;
  type_value: string;
  group_type: number | null;
  group_type_value: string | null;
  plate: string;
}

export interface Trailer {
  id: number;
  vehicle_type: number;
  vehicle_type_value: string;
  type: number;
  type_value: string;
  plate: string;
}

// Shipment details
export interface TimeInterval {
  start: string;
  end: string;
}

export interface Tonnage {
  min: number;
  max: number;
}

export interface ShipmentDetail {
  id: number;
  shipment_id: number;
  vehicle_type: number;
  vehicle_type_value: string;
  group_type: number;
  group_type_value: string;
  trailer_type: number[];
  trailer_type_value: string[];
  base_type: number;
  base_type_value: string;
  tonnage: Tonnage;
  type_of_goods: string;
  way_of_loading: number;
  way_of_loading_value: string;
  commodity_avg_value: string;
  package_type: number;
  package_type_value: string;
  distance: number;
  toll: string;
  fuel_liter: string;
  departure_km: number | null;
  delivery_km: number | null;
  empty_km: number | null;
  is_insured: boolean;
}

export interface ShipmentStatus {
  id: number;
  type: number;
  type_value: string;
  created_at: number;
}

export interface DriverLocation {
  id: number;
  driver: User;
  lat: string;
  lng: string;
}

// Price related
export interface PriceDetails {
  base_price: string;
  base_currency: Currency;
  converting_currency: Currency;
  converting_exchange: string;
}

export interface ShipperPrice {
  id: number;
  freight_price: string;
  freight_price_tax_free: string;
  price_details: PriceDetails;
  status: number;
  status_value: string;
  giving_price_user: {
    id: number;
    name: string;
    surname: string;
  };
  price_confirming_user: {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
  };
  created_at: number;
}

export interface CarrierPrice {
  id: number;
  carrier_price: string;
  carrier_price_tax_free: string;
  carrier_cash_price_tax_free: string;
  cash_payment: boolean;
  price_details: PriceDetails;
  giving_price_user: {
    id: number;
    name: string;
    surname: string;
  };
  created_at: number;
}

export interface PriceOffers {
  carrier_price_offer: string;
  carrier_price_offer_currency: string;
  carrier_target_price_tax_free: string;
  carrier_target_price_currency: string;
}

export interface KamionShare {
  kamion_share_percent: string;
  kamion_share: string;
  kamion_share_currency: string;
}

export interface ShipmentPrice {
  shipper: ShipperPrice;
  carrier: CarrierPrice;
  offers: PriceOffers;
  kamion: KamionShare;
}

// Main Shipment entity
export interface Shipment {
  id: number;
  customer_order_number: string | null;
  shipper: Shipper;
  carrier: Carrier;
  driver: Driver;
  vehicle: Vehicle;
  code: string;
  trailer: Trailer;
  departure_address: Address;
  delivery_address: Address;
  pick_up_date: number;
  assigned_time: number;
  has_additional_invoice: boolean;
  time_interval: TimeInterval;
  delivery_date: number | null;
  delivery_time: string | null;
  invoice_ready: boolean;
  type: number;
  type_value: string;
  status: number;
  is_invoice_created: boolean;
  latest_status: ShipmentStatus;
  planned_transport: any | null;
  payment_type: any | null;
  payment_status: any | null;
  carrier_invoice_upload: boolean;
  carrier_payment: boolean;
  carrier_payment_status: number;
  carrier_payment_status_value: string;
  carrier_payment_date: string;
  shipment_detail: ShipmentDetail;
  timing: any | null;
  creator: User;
  driver_last_location: DriverLocation;
  price: ShipmentPrice;
  view_count: number | null;
  viewer_count: number | null;
  carrier_payment_receipt_upload: boolean;
  created_at: number;
  load_reception: number;
  load_reception_value: string;
  boosted: boolean;
}

// API Responses
export interface ShipmentListResponse extends PaginatedResponse<Shipment> {}

export interface ShipmentSearchParams {
  filter?: {
    id?: number;
  };
  page?: number;
  per_page?: number;
}
