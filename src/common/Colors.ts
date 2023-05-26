// import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { Theme } from '@types';
import { store } from '@store';

export const LightMode: Theme = {
  dark: false,
  colors: {
    // ...DefaultTheme.colors,
    primary: '#FF6600',
    background: '#fff',
    card: 'rgb(255, 255, 255)',
    text: '#0B0827',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
    pagination: '#0B0827',
    input: '#F9F7F6',
    inputColor: '#15151A',
    pink300: '#F5E0D6',
    woodsmoke: '#15151A',
    dash: '#596572',
    selector: '#F9F7F6',
    navTitle: '#1F1F23',
    fadedText: '#1F1F23',
  },
};

export const DarkMode: Theme = {
  dark: true,
  colors: {
    // ...DarkTheme.colors,
    primary: '#FF6600',
    background: '#15151A',
    card: 'rgb(255, 255, 255)',
    text: '#FFFFFF',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
    pagination: '#fff',
    input: '#1F1F23',
    inputColor: '#F9F7F6',
    pink300: '#F5E0D6',
    woodsmoke: '#15151A',
    dash: 'rgba(249, 247, 246, 0.6)',
    selector: '#1F1F23',
    navTitle: '#F9F7F6',
    fadedText: 'rgba(249, 247, 246, 0.6)',
  },
};

export const useTheme = () => {
  const theme = store.getState().misc.theme;
  return theme === 'dark' ? DarkMode : LightMode;
};

export const White = '#FFFFFF';
export const Black = '#000000';
export const Primary = '#FF6600';
export const BrandBlack = '#0B0827';
export const woodsmoke = '#15151A';
export const pink300 = '#F5E0D6';
