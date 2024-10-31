import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import theme from '../styles/theme';

// @dev Extend the default Next.js Document class to customize the document structure.
export default class Document extends NextDocument {
  // @dev Render method to define the structure of the HTML document.
  render() {
    return (
      <Html lang='en'>
        <Head />
        <body>
          {/* @dev Initialize the color mode script with the initial color mode from the theme configuration. */}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          {/* @dev Main content of the application. */}
          <Main />
          {/* @dev Next.js scripts required for the application to function. */}
          <NextScript />
        </body>
      </Html>
    );
  }
}