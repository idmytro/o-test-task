import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

import presetWebFonts from '@unocss/preset-web-fonts'

import presetUno from '@unocss/preset-uno'

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        inter: [
          {
            name: 'Inter',
            weights: ['300', '400', '700'],
            italic: true,
          },
          {
            name: 'sans-serif',
            provider: 'none',
          },
        ],
        helvetica: [
          {
            name: 'Helvetica Neue',
            weights: ['300'],
            provider: 'none',
          },
          {
            name: 'sans-serif',
            provider: 'none',
          },
        ],
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
  ],

})
