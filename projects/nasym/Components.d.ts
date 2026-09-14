// Components.d.ts — the complete catalog of the 3 component(s) in
// Components.bundle.js. READ THIS FILE BEFORE USING THE BUNDLE: component
// names are derived from Figma layer names (sanitized to PascalCase,
// deduplicated) and may differ from what the design calls them — the
// "figma layer" comment above each interface maps them back.
// After the bundle <script> loads, every component is a window global
// (e.g. window.IOSToggleOnSF) and usable directly in JSX.
import * as React from 'react';

// figma layer: "iOS / toggle / on / SF" (node 9:240)
export interface IOSToggleOnSFProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "iphone-12--white" (node 9:3850)
export interface Iphone12WhiteProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "iphone-12--white" (node 9:4457)
export interface Iphone12White2Props {
  className?: string;
  style?: React.CSSProperties;
}

declare const IOSToggleOnSF: React.FC<IOSToggleOnSFProps>;
declare const Iphone12White: React.FC<Iphone12WhiteProps>;
declare const Iphone12White2: React.FC<Iphone12White2Props>;
declare global {
  interface Window {
    IOSToggleOnSF: React.FC<IOSToggleOnSFProps>;
    Iphone12White: React.FC<Iphone12WhiteProps>;
    Iphone12White2: React.FC<Iphone12White2Props>;
  }
}
