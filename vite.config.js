import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig
({
 build: { rollupOptions: {
     input: {
       main: resolve (__dirname, 'index.html'),
       page2: resolve (__dirname, 'page2.html'),
       page3: resolve (__dirname, 'page3.html'),
       page4: resolve (__dirname, 'page4.html'),
       page5: resolve (__dirname, 'page5.html'),
       page6: resolve (__dirname, 'page6.html'),
       page7: resolve (__dirname, 'page7.html'),
       page8: resolve (__dirname, 'page8.html'),
     },
   },
 },
})