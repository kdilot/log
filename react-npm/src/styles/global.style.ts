import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, code, form, fieldset, legend, textarea, p, blockquote, th, td, input, select, button { margin: 0;padding: 0; }
  fieldset, img {border: 0 none;}
  dl, ul, ol, menu,li { list-style: none; }
  blockquote, q { quotes: none; }
  blockquote::before, blockquote::after, q::before, q::after { content: ''; content: none; }
  input, select, textarea, button { vertical-align: middle; font-size: 100%; }  
  table { width: 100%; border-collapse: collapse; border-spacing: 0; }
  body { -webkit-text-size-adjust: none; }  

  input[type='text'], input[type='password'], input[type='submit'], input[type='search'], input[type='tel'], input[type='number'],
  input[type='email'], input[type='button'], input[type='reset'] { -webkit-appearance: none; }
  input[type='search']::-webkit-search-cancel-button, input[type='search']::-webkit-search-decoration { -webkit-appearance: none; }
  input, textarea { -webkit-tap-highlight-color: transparent; -webkit-appearance: none; }
  input[type='number']::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }  
  button { border: 0 none; border-radius: 0; background: transparent; cursor: pointer; -webkit-appearance: button; }
  button::-moz-focus-inner { border: 0; padding: 0; }
  body { background-color: #fafafa; }
  html, body { height: 100%; }
  body, th, td, input, select, textarea, button {font-size: 14px; line-height: 1.5; font-family: 'NanumBarunGothic', '맑은 고딕', 'Malgun Gothic', 'Apple SD Gothic Neo', '돋움', 'dotum', sans-serif;  color: #222;}
  a { color: #222; text-decoration: none; }
  a:active, a:hover { text-decoration: none; }
  address, caption, cite, code, dfn, em, var { font-style: normal; font-weight: normal; }
  header, nav, main, section, aside, article, footer, small { display: block; }
`;
