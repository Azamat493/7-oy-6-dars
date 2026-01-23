export interface AuthType {
  billing_address: {
    country: string;
    town: string;
    street_address: string;
    extra_address: string;
    state: string;
    zip: string;
  };
  create_account_limit: number;
  create_plant_limit: number;
  create_post_limit: number;
  created_at: string;
  created_by: string;
  email: string;
  followers: string[];
  hashtags: string[];
  name: string;
  order_list: string[];
  password: string;
  permission: {
    create: boolean;
    update: boolean;
    delete: boolean;
    read: boolean;
  };
  phone_number: string;
  profile_photo: string;
  surname: string;
  user_type: string;
  username: string;
  wishlist: string[];
  _id: string;
}

export interface RegisterType {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface CategoryType {
  count: number;
  created_at: string;
  created_by: string;
  route_path: string;
  title: string;
  _id: string;
}

export interface QueryType<T> {
  isLoading: boolean;
  isError: boolean;
  data?: T;
}

export interface DiscountFlowerType {
  discoount_up_to: number;
  id: number;
  poster_image_url: string;
  title: string;
}

export interface ProductType {
  _id: string;
  title: string;
  price: number;
  main_image: string;
  discount: boolean;
  discount_price?: number;
  short_description: string;
  description: string;
  detailed_images: string[];
  rate: number;
  views: number;
  tags: [];
  comments: [];
  sold_items: number;
  created_by: string;
  created_at: string;
  category: string;
  count?: number | undefined;
  userPrice?: number;
}
