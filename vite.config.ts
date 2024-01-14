import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import removeAttr from 'remove-attr'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    AutoImport({
      imports: [
        'vue',
      ],
      dts: './src/auto-imports.d.ts',
    }),
    {
      ...removeAttr({
        extensions: ['vue'],
        attributes: ['data-component'],
      }),
      apply: 'build',
    },
  ],
})
