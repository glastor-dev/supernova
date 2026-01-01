
import { Theme } from './types';

export const DEFAULT_THEMES: Theme[] = [
  {
    name: 'Emerald Elite',
    primaryColor: '#22ff00', // Verde neón vibrante
    secondaryColor: '#004400', // Verde bosque muy profundo para contraste
    particleCount: 300,
    glowIntensity: 65,
    barWidth: 4,
    rotationSpeed: 0.006,
    backgroundGradient: ['#000000', '#001a05']
  },
  {
    name: 'Solar Flare',
    primaryColor: '#ff6600',
    secondaryColor: '#ff0000',
    particleCount: 250,
    glowIntensity: 35,
    barWidth: 4,
    rotationSpeed: 0.005,
    backgroundGradient: ['#000000', '#1a0800']
  },
  {
    name: 'Cyber Nexus',
    primaryColor: '#00f2ff',
    secondaryColor: '#7000ff',
    particleCount: 150,
    glowIntensity: 25,
    barWidth: 3,
    rotationSpeed: 0.008,
    backgroundGradient: ['#000000', '#0a0a2e']
  }
];

export const FFT_SIZE = 512;
