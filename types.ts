
export interface Theme {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  particleCount: number;
  glowIntensity: number;
  barWidth: number;
  rotationSpeed: number;
  backgroundGradient: string[];
}

export interface AudioMetadata {
  title: string;
  artist: string;
  duration: number;
  currentTime: number;
}

export enum VisualizerMode {
  ORBITAL = 'orbital',
  HORIZON = 'horizon'
}
