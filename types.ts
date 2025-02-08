export interface BannerData {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  image: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  title: string;
  subtitle: string;
  price: number;
  description: string;
}

type ImageAsset = {
  _type: "image";
  asset: {
    [x: string]: unknown; // ✅ Replaced `any` with `unknown`
    _ref: string;
    _type: "reference";
  };
};

type Slug = {
  current: string;
  _type: "slug";
};

type Category = {
  _id: string;
  name: string;
};

export interface CarData {
  _id: string;
  _type: "product";
  _createdAt: string;
  _updatedAt: string;
  name: string;
  title: string;
  brand: string;
  description: string;
  price: number;
  pricePerDay: number;
  rowprice: number;
  ratings: number;
  quantity: number;
  type: string;
  fuelCapacity: string;
  transmission: string;
  seatingCapacity: string;
  position: string;
  image: ImageAsset;
  slug: Slug;
  category: Category[];
}

export interface CartItem extends CarData {
  quantity: number;
}

export interface StoreState {
  GoRentWheelsSlice: unknown; // ✅ Changed `any` to `unknown`
  goRentWheels: {
    cart: CartItem[];
  };
}
