import type { Preview } from '@storybook/react';

<<<<<<< HEAD
import { withThemeByClassName } from '@storybook/addon-styling';

/* TODO: update import to your tailwind styles file */
import '../styles/global.css';

=======
>>>>>>> 72bd019 (chore: setup storybook for next.js)
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
<<<<<<< HEAD

  decorators: [
    // Adds theme switching support.
    // NOTE: requires setting "darkMode" to "class" in your tailwind config
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
=======
>>>>>>> 72bd019 (chore: setup storybook for next.js)
};

export default preview;
