
import React from 'react';

export type ViewState = 'home' | 'procedures' | 'training' | 'booking';

export interface Message {
  role: 'user' | 'model';
  text: string;
}

// Added Project interface as required by ProjectStack component
export interface Project {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
}

export interface BeautyService {
  id: string;
  title: string;
  subTitle: string;
  description: string;
  image: string;
  price?: string;
}

export enum AIModelType {
  FLASH = 'gemini-3-flash-preview',
  PRO_IMAGE = 'gemini-3-pro-image-preview',
  FLASH_IMAGE = 'gemini-2.5-flash-image'
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'iconify-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { 
        icon?: string; 
        width?: string | number; 
        height?: string | number;
        className?: string;
      }, HTMLElement>;
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'iconify-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { 
        icon?: string; 
        width?: string | number; 
        height?: string | number;
        className?: string;
      }, HTMLElement>;
    }
  }
}