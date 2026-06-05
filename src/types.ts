export interface Memory {
  id: string;
  imageUrl: string;
  caption: string;
  category: string;
  createdAt: string;
  rotation: number;
  liked: boolean;
  detailedDescription?: string;
  tags?: string[];
}

export interface HugLetter {
  id: string;
  sender: string;
  message: string;
  giftType: string;
  createdAt: string;
}

export type GiftType = 'hug' | 'chocolate' | 'coffee' | 'cupcake' | 'blanket' | 'star';
