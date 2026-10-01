export interface YugiohResponse {
  data: Card[];
}

export interface Card {
  id: number;
  name: string;
  type: string;
  desc: string;
  atk?: number; // Opcional porque no todas tienen
  def?: number; // Opcional
  level?: number; // Opcional
  attribute?: string; // Opcional
  archetype?: string;
  card_sets?: CardSet[];
  card_images: CardImage[];
}

export interface CardSet {
  set_name: string;
  set_code: string;
  set_rarity: string;
  set_price: string;
}

export interface CardImage {
  id: number;
  image_url: string;
  image_url_small: string;
}