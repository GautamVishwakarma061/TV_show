export type Show = {
  id: number;
  image?: {
    medium: string;
    original: string;
  };
  name: string;
  genres: string[];
  rating: { average?: number };
  summary?: string;
};

export const placeholderImage =
  "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
