
import React from 'react';

export type ViewState = 'home' | 'procedures' | 'training' | 'booking';

// Added Project interface for architectural project definitions
export interface Project {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
}

// Added AIModelType enum to define supported Gemini models according to guidelines
export enum AIModelType {
  FLASH = 'gemini-3-flash-preview',
  FLASH_IMAGE = 'gemini-2.5-flash-image',
  PRO_IMAGE = 'gemini-3-pro-image-preview'
}

/**
 * Augment the global JSX namespace to support the iconify-icon custom element.
 */
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

/**
 * Support for React-specific JSX namespace augmentation.
 */
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
