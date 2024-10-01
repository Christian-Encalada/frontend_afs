export interface Site {
  id: number,
  name: string;
  description?: string | null;
  primaryColor?: string | null;
  secondaryColor?: string | null;
  logo?: string | null;
  status: boolean;
}

export enum Template {
  PURPLE_WHITE = '["#4E25BE", "#FFFFFF"]',
  BLUE_WHITE = '["#2990FF", "#FFFFFF"]',
}
