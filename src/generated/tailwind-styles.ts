/**
 * CSS compilado do Tailwind para injeção dinâmica no content script
 * Este arquivo é gerado automaticamente. NÃO edite manualmente.
 * Para regenerar, execute: npm run generate:tailwind-css
 * Gerado em: 2026-02-10T23:21:57.245Z
 */

export const TAILWIND_CSS = `/*! tailwindcss v4.1.18 | MIT License | https://tailwindcss.com */
@layer properties;
@layer theme, base, components, utilities;
@layer theme {
  :root, :host {
    --font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
      "Courier New", monospace;
    --color-red-600: oklch(57.7% 0.245 27.325);
    --color-red-700: oklch(50.5% 0.213 27.518);
    --color-amber-300: oklch(87.9% 0.169 91.605);
    --color-blue-600: oklch(54.6% 0.245 262.881);
    --color-blue-700: oklch(48.8% 0.243 264.376);
    --color-blue-800: oklch(42.4% 0.199 265.638);
    --color-gray-200: oklch(92.8% 0.006 264.531);
    --color-gray-400: oklch(70.7% 0.022 261.325);
    --color-zinc-50: oklch(98.5% 0 0);
    --color-zinc-100: oklch(96.7% 0.001 286.375);
    --color-black: #000;
    --color-white: #fff;
    --spacing: 0.25rem;
    --container-lg: 32rem;
    --text-xs: 0.75rem;
    --text-xs--line-height: calc(1 / 0.75);
    --text-sm: 0.875rem;
    --text-sm--line-height: calc(1.25 / 0.875);
    --text-lg: 1.125rem;
    --text-lg--line-height: calc(1.75 / 1.125);
    --text-2xl: 1.5rem;
    --text-2xl--line-height: calc(2 / 1.5);
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    --radius-xs: 0.125rem;
    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
    --default-transition-duration: 150ms;
    --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    --default-font-family: var(--font-sans);
    --default-mono-font-family: var(--font-mono);
  }
}
@layer base {
  *, ::after, ::before, ::backdrop, ::file-selector-button {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0 solid;
  }
  html, :host {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
    font-family: var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
    font-feature-settings: var(--default-font-feature-settings, normal);
    font-variation-settings: var(--default-font-variation-settings, normal);
    -webkit-tap-highlight-color: transparent;
  }
  hr {
    height: 0;
    color: inherit;
    border-top-width: 1px;
  }
  abbr:where([title]) {
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
  }
  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
  }
  a {
    color: inherit;
    -webkit-text-decoration: inherit;
    text-decoration: inherit;
  }
  b, strong {
    font-weight: bolder;
  }
  code, kbd, samp, pre {
    font-family: var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);
    font-feature-settings: var(--default-mono-font-feature-settings, normal);
    font-variation-settings: var(--default-mono-font-variation-settings, normal);
    font-size: 1em;
  }
  small {
    font-size: 80%;
  }
  sub, sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  table {
    text-indent: 0;
    border-color: inherit;
    border-collapse: collapse;
  }
  :-moz-focusring {
    outline: auto;
  }
  progress {
    vertical-align: baseline;
  }
  summary {
    display: list-item;
  }
  ol, ul, menu {
    list-style: none;
  }
  img, svg, video, canvas, audio, iframe, embed, object {
    display: block;
    vertical-align: middle;
  }
  img, video {
    max-width: 100%;
    height: auto;
  }
  button, input, select, optgroup, textarea, ::file-selector-button {
    font: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    letter-spacing: inherit;
    color: inherit;
    border-radius: 0;
    background-color: transparent;
    opacity: 1;
  }
  :where(select:is([multiple], [size])) optgroup {
    font-weight: bolder;
  }
  :where(select:is([multiple], [size])) optgroup option {
    padding-inline-start: 20px;
  }
  ::file-selector-button {
    margin-inline-end: 4px;
  }
  ::placeholder {
    opacity: 1;
  }
  @supports (not (-webkit-appearance: -apple-pay-button))  or (contain-intrinsic-size: 1px) {
    ::placeholder {
      color: currentcolor;
      @supports (color: color-mix(in lab, red, red)) {
        color: color-mix(in oklab, currentcolor 50%, transparent);
      }
    }
  }
  textarea {
    resize: vertical;
  }
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-date-and-time-value {
    min-height: 1lh;
    text-align: inherit;
  }
  ::-webkit-datetime-edit {
    display: inline-flex;
  }
  ::-webkit-datetime-edit-fields-wrapper {
    padding: 0;
  }
  ::-webkit-datetime-edit, ::-webkit-datetime-edit-year-field, ::-webkit-datetime-edit-month-field, ::-webkit-datetime-edit-day-field, ::-webkit-datetime-edit-hour-field, ::-webkit-datetime-edit-minute-field, ::-webkit-datetime-edit-second-field, ::-webkit-datetime-edit-millisecond-field, ::-webkit-datetime-edit-meridiem-field {
    padding-block: 0;
  }
  ::-webkit-calendar-picker-indicator {
    line-height: 1;
  }
  :-moz-ui-invalid {
    box-shadow: none;
  }
  button, input:where([type="button"], [type="reset"], [type="submit"]), ::file-selector-button {
    appearance: button;
  }
  ::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
    height: auto;
  }
  [hidden]:where(:not([hidden="until-found"])) {
    display: none !important;
  }
}
@layer utilities {
  .visible {
    visibility: visible;
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border-width: 0;
  }
  .absolute {
    position: absolute;
  }
  .fixed {
    position: fixed;
  }
  .relative {
    position: relative;
  }
  .static {
    position: static;
  }
  .inset-0 {
    inset: calc(var(--spacing) * 0);
  }
  .top-4 {
    top: calc(var(--spacing) * 4);
  }
  .top-\[15px\] {
    top: 15px;
  }
  .top-\[50\%\] {
    top: 50%;
  }
  .right-4 {
    right: calc(var(--spacing) * 4);
  }
  .right-\[25px\] {
    right: 25px;
  }
  .left-\[50\%\] {
    left: 50%;
  }
  .z-50 {
    z-index: 50;
  }
  .z-2147483640 {
    z-index: 2147483640;
  }
  .z-2147483647 {
    z-index: 2147483647;
  }
  .z-\[2147483647\] {
    z-index: 2147483647;
  }
  .container {
    width: 100%;
    @media (width >= 40rem) {
      max-width: 40rem;
    }
    @media (width >= 48rem) {
      max-width: 48rem;
    }
    @media (width >= 64rem) {
      max-width: 64rem;
    }
    @media (width >= 80rem) {
      max-width: 80rem;
    }
    @media (width >= 96rem) {
      max-width: 96rem;
    }
  }
  .mr-2 {
    margin-right: calc(var(--spacing) * 2);
  }
  .block {
    display: block;
  }
  .contents {
    display: contents;
  }
  .flex {
    display: flex;
  }
  .grid {
    display: grid;
  }
  .inline {
    display: inline;
  }
  .inline-block {
    display: inline-block;
  }
  .inline-flex {
    display: inline-flex;
  }
  .table {
    display: table;
  }
  .h-4 {
    height: calc(var(--spacing) * 4);
  }
  .h-6 {
    height: calc(var(--spacing) * 6);
  }
  .h-8 {
    height: calc(var(--spacing) * 8);
  }
  .h-9 {
    height: calc(var(--spacing) * 9);
  }
  .h-10 {
    height: calc(var(--spacing) * 10);
  }
  .h-12 {
    height: calc(var(--spacing) * 12);
  }
  .h-full {
    height: 100%;
  }
  .min-h-0 {
    min-height: calc(var(--spacing) * 0);
  }
  .w-4 {
    width: calc(var(--spacing) * 4);
  }
  .w-6 {
    width: calc(var(--spacing) * 6);
  }
  .w-9 {
    width: calc(var(--spacing) * 9);
  }
  .w-11 {
    width: calc(var(--spacing) * 11);
  }
  .w-12 {
    width: calc(var(--spacing) * 12);
  }
  .w-64 {
    width: calc(var(--spacing) * 64);
  }
  .w-full {
    width: 100%;
  }
  .max-w-\[calc\(100\%-2rem\)\] {
    max-width: calc(100% - 2rem);
  }
  .flex-shrink {
    flex-shrink: 1;
  }
  .flex-shrink-0 {
    flex-shrink: 0;
  }
  .flex-grow {
    flex-grow: 1;
  }
  .border-collapse {
    border-collapse: collapse;
  }
  .translate-x-1 {
    --tw-translate-x: calc(var(--spacing) * 1);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .translate-x-6 {
    --tw-translate-x: calc(var(--spacing) * 6);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .translate-x-\[-50\%\] {
    --tw-translate-x: -50%;
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .translate-y-\[-50\%\] {
    --tw-translate-y: -50%;
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .transform {
    transform: var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,);
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .resize {
    resize: both;
  }
  .flex-col {
    flex-direction: column;
  }
  .flex-col-reverse {
    flex-direction: column-reverse;
  }
  .items-center {
    align-items: center;
  }
  .justify-between {
    justify-content: space-between;
  }
  .justify-center {
    justify-content: center;
  }
  .justify-end {
    justify-content: flex-end;
  }
  .gap-2 {
    gap: calc(var(--spacing) * 2);
  }
  .gap-4 {
    gap: calc(var(--spacing) * 4);
  }
  .space-y-4 {
    :where(& > :not(:last-child)) {
      --tw-space-y-reverse: 0;
      margin-block-start: calc(calc(var(--spacing) * 4) * var(--tw-space-y-reverse));
      margin-block-end: calc(calc(var(--spacing) * 4) * calc(1 - var(--tw-space-y-reverse)));
    }
  }
  .space-x-2 {
    :where(& > :not(:last-child)) {
      --tw-space-x-reverse: 0;
      margin-inline-start: calc(calc(var(--spacing) * 2) * var(--tw-space-x-reverse));
      margin-inline-end: calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-x-reverse)));
    }
  }
  .overflow-hidden {
    overflow: hidden;
  }
  .rounded-full {
    border-radius: calc(infinity * 1px);
  }
  .rounded-lg {
    border-radius: var(--radius);
  }
  .rounded-md {
    border-radius: calc(var(--radius) - 2px);
  }
  .rounded-xs {
    border-radius: var(--radius-xs);
  }
  .border {
    border-style: var(--tw-border-style);
    border-width: 1px;
  }
  .border-0 {
    border-style: var(--tw-border-style);
    border-width: 0px;
  }
  .border-2 {
    border-style: var(--tw-border-style);
    border-width: 2px;
  }
  .border-none {
    --tw-border-style: none;
    border-style: none;
  }
  .border-input {
    border-color: var(--input);
  }
  .border-white {
    border-color: var(--color-white);
  }
  .border-zinc-50 {
    border-color: var(--color-zinc-50);
  }
  .bg-background {
    background-color: var(--background);
  }
  .bg-black {
    background-color: var(--color-black);
  }
  .bg-black\/50 {
    background-color: color-mix(in srgb, #000 50%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-black) 50%, transparent);
    }
  }
  .bg-black\/90 {
    background-color: color-mix(in srgb, #000 90%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-black) 90%, transparent);
    }
  }
  .bg-destructive {
    background-color: var(--destructive);
  }
  .bg-gray-200 {
    background-color: var(--color-gray-200);
  }
  .bg-primary {
    background-color: var(--primary);
  }
  .bg-red-600 {
    background-color: var(--color-red-600);
  }
  .bg-secondary {
    background-color: var(--secondary);
  }
  .bg-white {
    background-color: var(--color-white);
  }
  .bg-gradient-to-r {
    --tw-gradient-position: to right in oklab;
    background-image: linear-gradient(var(--tw-gradient-stops));
  }
  .bg-none {
    background-image: none;
  }
  .from-blue-600 {
    --tw-gradient-from: var(--color-blue-600);
    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));
  }
  .to-blue-700 {
    --tw-gradient-to: var(--color-blue-700);
    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));
  }
  .p-0 {
    padding: calc(var(--spacing) * 0);
  }
  .p-4 {
    padding: calc(var(--spacing) * 4);
  }
  .p-6 {
    padding: calc(var(--spacing) * 6);
  }
  .px-3 {
    padding-inline: calc(var(--spacing) * 3);
  }
  .px-4 {
    padding-inline: calc(var(--spacing) * 4);
  }
  .px-6 {
    padding-inline: calc(var(--spacing) * 6);
  }
  .px-8 {
    padding-inline: calc(var(--spacing) * 8);
  }
  .py-2 {
    padding-block: calc(var(--spacing) * 2);
  }
  .text-center {
    text-align: center;
  }
  .text-2xl {
    font-size: var(--text-2xl);
    line-height: var(--tw-leading, var(--text-2xl--line-height));
  }
  .text-lg {
    font-size: var(--text-lg);
    line-height: var(--tw-leading, var(--text-lg--line-height));
  }
  .text-sm {
    font-size: var(--text-sm);
    line-height: var(--tw-leading, var(--text-sm--line-height));
  }
  .text-xs {
    font-size: var(--text-xs);
    line-height: var(--tw-leading, var(--text-xs--line-height));
  }
  .leading-none {
    --tw-leading: 1;
    line-height: 1;
  }
  .font-bold {
    --tw-font-weight: var(--font-weight-bold);
    font-weight: var(--font-weight-bold);
  }
  .font-medium {
    --tw-font-weight: var(--font-weight-medium);
    font-weight: var(--font-weight-medium);
  }
  .font-semibold {
    --tw-font-weight: var(--font-weight-semibold);
    font-weight: var(--font-weight-semibold);
  }
  .whitespace-nowrap {
    white-space: nowrap;
  }
  .text-amber-300 {
    color: var(--color-amber-300);
  }
  .text-foreground {
    color: var(--foreground);
  }
  .text-muted {
    color: var(--muted);
  }
  .text-muted-foreground {
    color: var(--muted-foreground);
  }
  .text-primary {
    color: var(--primary);
  }
  .text-primary-foreground {
    color: var(--primary-foreground);
  }
  .text-secondary-foreground {
    color: var(--secondary-foreground);
  }
  .text-white {
    color: var(--color-white);
  }
  .text-zinc-100 {
    color: var(--color-zinc-100);
  }
  .underline {
    text-decoration-line: underline;
  }
  .underline-offset-4 {
    text-underline-offset: 4px;
  }
  .opacity-70 {
    opacity: 70%;
  }
  .opacity-100 {
    opacity: 100%;
  }
  .shadow {
    --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-lg {
    --tw-shadow: 0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-sm {
    --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .ring-offset-background {
    --tw-ring-offset-color: var(--background);
  }
  .outline {
    outline-style: var(--tw-outline-style);
    outline-width: 1px;
  }
  .filter {
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
  }
  .transition-all {
    transition-property: all;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-colors {
    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-opacity {
    transition-property: opacity;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-transform {
    transition-property: transform, translate, scale, rotate;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .duration-200 {
    --tw-duration: 200ms;
    transition-duration: 200ms;
  }
  .duration-300 {
    --tw-duration: 300ms;
    transition-duration: 300ms;
  }
  .ease-in-out {
    --tw-ease: var(--ease-in-out);
    transition-timing-function: var(--ease-in-out);
  }
  .select-none {
    -webkit-user-select: none;
    user-select: none;
  }
  .peer-disabled\:cursor-not-allowed {
    &:is(:where(.peer):disabled ~ *) {
      cursor: not-allowed;
    }
  }
  .peer-disabled\:opacity-70 {
    &:is(:where(.peer):disabled ~ *) {
      opacity: 70%;
    }
  }
  .hover\:bg-accent {
    &:hover {
      @media (hover: hover) {
        background-color: var(--accent);
      }
    }
  }
  .hover\:bg-black\/90 {
    &:hover {
      @media (hover: hover) {
        background-color: color-mix(in srgb, #000 90%, transparent);
        @supports (color: color-mix(in lab, red, red)) {
          background-color: color-mix(in oklab, var(--color-black) 90%, transparent);
        }
      }
    }
  }
  .hover\:bg-destructive\/90 {
    &:hover {
      @media (hover: hover) {
        background-color: var(--destructive);
        @supports (color: color-mix(in lab, red, red)) {
          background-color: color-mix(in oklab, var(--destructive) 90%, transparent);
        }
      }
    }
  }
  .hover\:bg-primary\/90 {
    &:hover {
      @media (hover: hover) {
        background-color: var(--primary);
        @supports (color: color-mix(in lab, red, red)) {
          background-color: color-mix(in oklab, var(--primary) 90%, transparent);
        }
      }
    }
  }
  .hover\:bg-red-700 {
    &:hover {
      @media (hover: hover) {
        background-color: var(--color-red-700);
      }
    }
  }
  .hover\:bg-secondary\/80 {
    &:hover {
      @media (hover: hover) {
        background-color: var(--secondary);
        @supports (color: color-mix(in lab, red, red)) {
          background-color: color-mix(in oklab, var(--secondary) 80%, transparent);
        }
      }
    }
  }
  .hover\:text-accent-foreground {
    &:hover {
      @media (hover: hover) {
        color: var(--accent-foreground);
      }
    }
  }
  .hover\:underline {
    &:hover {
      @media (hover: hover) {
        text-decoration-line: underline;
      }
    }
  }
  .hover\:opacity-100 {
    &:hover {
      @media (hover: hover) {
        opacity: 100%;
      }
    }
  }
  .hover\:shadow-xl {
    &:hover {
      @media (hover: hover) {
        --tw-shadow: 0 20px 25px -5px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 8px 10px -6px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
      }
    }
  }
  .focus\:ring-2 {
    &:focus {
      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
  }
  .focus\:ring-gray-400 {
    &:focus {
      --tw-ring-color: var(--color-gray-400);
    }
  }
  .focus\:ring-primary {
    &:focus {
      --tw-ring-color: var(--primary);
    }
  }
  .focus\:ring-ring {
    &:focus {
      --tw-ring-color: var(--ring);
    }
  }
  .focus\:ring-offset-2 {
    &:focus {
      --tw-ring-offset-width: 2px;
      --tw-ring-offset-shadow: var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    }
  }
  .focus\:outline-hidden {
    &:focus {
      --tw-outline-style: none;
      outline-style: none;
      @media (forced-colors: active) {
        outline: 2px solid transparent;
        outline-offset: 2px;
      }
    }
  }
  .focus\:outline-none {
    &:focus {
      --tw-outline-style: none;
      outline-style: none;
    }
  }
  .focus-visible\:ring-1 {
    &:focus-visible {
      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
  }
  .focus-visible\:ring-ring {
    &:focus-visible {
      --tw-ring-color: var(--ring);
    }
  }
  .focus-visible\:outline-none {
    &:focus-visible {
      --tw-outline-style: none;
      outline-style: none;
    }
  }
  .active\:scale-95 {
    &:active {
      --tw-scale-x: 95%;
      --tw-scale-y: 95%;
      --tw-scale-z: 95%;
      scale: var(--tw-scale-x) var(--tw-scale-y);
    }
  }
  .disabled\:pointer-events-none {
    &:disabled {
      pointer-events: none;
    }
  }
  .disabled\:opacity-50 {
    &:disabled {
      opacity: 50%;
    }
  }
  .data-\[state\=closed\]\:animate-out {
    &[data-state="closed"] {
      animation: exit var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none);
    }
  }
  .data-\[state\=closed\]\:fade-out-0 {
    &[data-state="closed"] {
      --tw-exit-opacity: calc(0/100);
      --tw-exit-opacity: 0;
    }
  }
  .data-\[state\=closed\]\:zoom-out-95 {
    &[data-state="closed"] {
      --tw-exit-scale: calc(95*1%);
      --tw-exit-scale: .95;
    }
  }
  .data-\[state\=open\]\:animate-in {
    &[data-state="open"] {
      animation: enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none);
    }
  }
  .data-\[state\=open\]\:bg-accent {
    &[data-state="open"] {
      background-color: var(--accent);
    }
  }
  .data-\[state\=open\]\:text-muted-foreground {
    &[data-state="open"] {
      color: var(--muted-foreground);
    }
  }
  .data-\[state\=open\]\:fade-in-0 {
    &[data-state="open"] {
      --tw-enter-opacity: calc(0/100);
      --tw-enter-opacity: 0;
    }
  }
  .data-\[state\=open\]\:zoom-in-95 {
    &[data-state="open"] {
      --tw-enter-scale: calc(95*1%);
      --tw-enter-scale: .95;
    }
  }
  .sm\:max-w-lg {
    @media (width >= 40rem) {
      max-width: var(--container-lg);
    }
  }
  .sm\:flex-row {
    @media (width >= 40rem) {
      flex-direction: row;
    }
  }
  .sm\:justify-end {
    @media (width >= 40rem) {
      justify-content: flex-end;
    }
  }
  .sm\:text-left {
    @media (width >= 40rem) {
      text-align: left;
    }
  }
  .\[\&_svg\]\:pointer-events-none {
    & svg {
      pointer-events: none;
    }
  }
  .\[\&_svg\]\:size-4 {
    & svg {
      width: calc(var(--spacing) * 4);
      height: calc(var(--spacing) * 4);
    }
  }
  .\[\&_svg\]\:shrink-0 {
    & svg {
      flex-shrink: 0;
    }
  }
  .\[\&_svg\:not\(\[class\*\=\'size-\'\]\)\]\:size-4 {
    & svg:not([class*='size-']) {
      width: calc(var(--spacing) * 4);
      height: calc(var(--spacing) * 4);
    }
  }
}
@property --tw-animation-delay {
  syntax: "*";
  inherits: false;
  initial-value: 0s;
}
@property --tw-animation-direction {
  syntax: "*";
  inherits: false;
  initial-value: normal;
}
@property --tw-animation-duration {
  syntax: "*";
  inherits: false;
}
@property --tw-animation-fill-mode {
  syntax: "*";
  inherits: false;
  initial-value: none;
}
@property --tw-animation-iteration-count {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-enter-blur {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-enter-opacity {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-enter-rotate {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-enter-scale {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-enter-translate-x {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-enter-translate-y {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-exit-blur {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-exit-opacity {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-exit-rotate {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-exit-scale {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-exit-translate-x {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-exit-translate-y {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.141 0.005 285.823);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.141 0.005 285.823);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.141 0.005 285.823);
  --primary: oklch(0.21 0.006 285.885);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.967 0.001 286.375);
  --secondary-foreground: oklch(0.21 0.006 285.885);
  --muted: oklch(0.967 0.001 286.375);
  --muted-foreground: oklch(0.552 0.016 285.938);
  --accent: oklch(0.967 0.001 286.375);
  --accent-foreground: oklch(0.21 0.006 285.885);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.92 0.004 286.32);
  --input: oklch(0.92 0.004 286.32);
  --ring: oklch(0.705 0.015 286.067);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.141 0.005 285.823);
  --sidebar-primary: oklch(0.21 0.006 285.885);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.967 0.001 286.375);
  --sidebar-accent-foreground: oklch(0.21 0.006 285.885);
  --sidebar-border: oklch(0.92 0.004 286.32);
  --sidebar-ring: oklch(0.705 0.015 286.067);
}
.dark {
  --background: oklch(0.141 0.005 285.823);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.21 0.006 285.885);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.21 0.006 285.885);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.92 0.004 286.32);
  --primary-foreground: oklch(0.21 0.006 285.885);
  --secondary: oklch(0.274 0.006 286.033);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.274 0.006 286.033);
  --muted-foreground: oklch(0.705 0.015 286.067);
  --accent: oklch(0.274 0.006 286.033);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.552 0.016 285.938);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.21 0.006 285.885);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.274 0.006 286.033);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.552 0.016 285.938);
}
@layer base {
  * {
    border-color: var(--border);
    outline-color: var(--ring);
    @supports (color: color-mix(in lab, red, red)) {
      outline-color: color-mix(in oklab, var(--ring) 50%, transparent);
    }
  }
  body {
    background-color: var(--background);
    color: var(--foreground);
  }
}
@property --tw-translate-x {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-translate-y {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-translate-z {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-rotate-x {
  syntax: "*";
  inherits: false;
}
@property --tw-rotate-y {
  syntax: "*";
  inherits: false;
}
@property --tw-rotate-z {
  syntax: "*";
  inherits: false;
}
@property --tw-skew-x {
  syntax: "*";
  inherits: false;
}
@property --tw-skew-y {
  syntax: "*";
  inherits: false;
}
@property --tw-space-y-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-space-x-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-border-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@property --tw-gradient-position {
  syntax: "*";
  inherits: false;
}
@property --tw-gradient-from {
  syntax: "<color>";
  inherits: false;
  initial-value: #0000;
}
@property --tw-gradient-via {
  syntax: "<color>";
  inherits: false;
  initial-value: #0000;
}
@property --tw-gradient-to {
  syntax: "<color>";
  inherits: false;
  initial-value: #0000;
}
@property --tw-gradient-stops {
  syntax: "*";
  inherits: false;
}
@property --tw-gradient-via-stops {
  syntax: "*";
  inherits: false;
}
@property --tw-gradient-from-position {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 0%;
}
@property --tw-gradient-via-position {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 50%;
}
@property --tw-gradient-to-position {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-leading {
  syntax: "*";
  inherits: false;
}
@property --tw-font-weight {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-inset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-ring-inset {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-offset-width {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}
@property --tw-ring-offset-color {
  syntax: "*";
  inherits: false;
  initial-value: #fff;
}
@property --tw-ring-offset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-outline-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@property --tw-blur {
  syntax: "*";
  inherits: false;
}
@property --tw-brightness {
  syntax: "*";
  inherits: false;
}
@property --tw-contrast {
  syntax: "*";
  inherits: false;
}
@property --tw-grayscale {
  syntax: "*";
  inherits: false;
}
@property --tw-hue-rotate {
  syntax: "*";
  inherits: false;
}
@property --tw-invert {
  syntax: "*";
  inherits: false;
}
@property --tw-opacity {
  syntax: "*";
  inherits: false;
}
@property --tw-saturate {
  syntax: "*";
  inherits: false;
}
@property --tw-sepia {
  syntax: "*";
  inherits: false;
}
@property --tw-drop-shadow {
  syntax: "*";
  inherits: false;
}
@property --tw-drop-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-drop-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-drop-shadow-size {
  syntax: "*";
  inherits: false;
}
@property --tw-duration {
  syntax: "*";
  inherits: false;
}
@property --tw-ease {
  syntax: "*";
  inherits: false;
}
@property --tw-scale-x {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-scale-y {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-scale-z {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@keyframes enter {
  from {
    opacity: var(--tw-enter-opacity,1);
    transform: translate3d(var(--tw-enter-translate-x,0),var(--tw-enter-translate-y,0),0)scale3d(var(--tw-enter-scale,1),var(--tw-enter-scale,1),var(--tw-enter-scale,1))rotate(var(--tw-enter-rotate,0));
    filter: blur(var(--tw-enter-blur,0));
  }
}
@keyframes exit {
  to {
    opacity: var(--tw-exit-opacity,1);
    transform: translate3d(var(--tw-exit-translate-x,0),var(--tw-exit-translate-y,0),0)scale3d(var(--tw-exit-scale,1),var(--tw-exit-scale,1),var(--tw-exit-scale,1))rotate(var(--tw-exit-rotate,0));
    filter: blur(var(--tw-exit-blur,0));
  }
}
@layer properties {
  @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))) {
    *, ::before, ::after, ::backdrop {
      --tw-translate-x: 0;
      --tw-translate-y: 0;
      --tw-translate-z: 0;
      --tw-rotate-x: initial;
      --tw-rotate-y: initial;
      --tw-rotate-z: initial;
      --tw-skew-x: initial;
      --tw-skew-y: initial;
      --tw-space-y-reverse: 0;
      --tw-space-x-reverse: 0;
      --tw-border-style: solid;
      --tw-gradient-position: initial;
      --tw-gradient-from: #0000;
      --tw-gradient-via: #0000;
      --tw-gradient-to: #0000;
      --tw-gradient-stops: initial;
      --tw-gradient-via-stops: initial;
      --tw-gradient-from-position: 0%;
      --tw-gradient-via-position: 50%;
      --tw-gradient-to-position: 100%;
      --tw-leading: initial;
      --tw-font-weight: initial;
      --tw-shadow: 0 0 #0000;
      --tw-shadow-color: initial;
      --tw-shadow-alpha: 100%;
      --tw-inset-shadow: 0 0 #0000;
      --tw-inset-shadow-color: initial;
      --tw-inset-shadow-alpha: 100%;
      --tw-ring-color: initial;
      --tw-ring-shadow: 0 0 #0000;
      --tw-inset-ring-color: initial;
      --tw-inset-ring-shadow: 0 0 #0000;
      --tw-ring-inset: initial;
      --tw-ring-offset-width: 0px;
      --tw-ring-offset-color: #fff;
      --tw-ring-offset-shadow: 0 0 #0000;
      --tw-outline-style: solid;
      --tw-blur: initial;
      --tw-brightness: initial;
      --tw-contrast: initial;
      --tw-grayscale: initial;
      --tw-hue-rotate: initial;
      --tw-invert: initial;
      --tw-opacity: initial;
      --tw-saturate: initial;
      --tw-sepia: initial;
      --tw-drop-shadow: initial;
      --tw-drop-shadow-color: initial;
      --tw-drop-shadow-alpha: 100%;
      --tw-drop-shadow-size: initial;
      --tw-duration: initial;
      --tw-ease: initial;
      --tw-scale-x: 1;
      --tw-scale-y: 1;
      --tw-scale-z: 1;
      --tw-animation-delay: 0s;
      --tw-animation-direction: normal;
      --tw-animation-duration: initial;
      --tw-animation-fill-mode: none;
      --tw-animation-iteration-count: 1;
      --tw-enter-blur: 0;
      --tw-enter-opacity: 1;
      --tw-enter-rotate: 0;
      --tw-enter-scale: 1;
      --tw-enter-translate-x: 0;
      --tw-enter-translate-y: 0;
      --tw-exit-blur: 0;
      --tw-exit-opacity: 1;
      --tw-exit-rotate: 0;
      --tw-exit-scale: 1;
      --tw-exit-translate-x: 0;
      --tw-exit-translate-y: 0;
    }
  }
}
`;
