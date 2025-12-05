export interface FeatureItem {
  text: string;
  highlight?: string; // Text to be highlighted in green/bold
  value?: string; // The monetary value associated with the item
}

export interface Speaker {
  name: string;
  role: string;
  achievements: string[];
  imageUrl: string;
}

export interface BundlePricing {
  originalPrice: number;
  discountAmount: number;
  finalPrice: number;
}