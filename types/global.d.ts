declare namespace JSX {
  interface IntrinsicElements {
    'wistia-player': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      'media-id'?: string;
      aspect?: string;
      // Add any other specific attributes used by wistia-player here if needed
    };
  }
} 