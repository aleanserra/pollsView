export type Choice = {
  choice: string;
  votes: number;
};

export type Question = {
  id: number;
  question: string;
  image_url: string;
  thumb_url: string;
  published_at: string;
  choices: Choice[];
};
