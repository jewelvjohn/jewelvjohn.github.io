import {defineConfig} from 'vite'
import path from 'path'
import copy from 'rollup-plugin-copy';

const root = path.resolve(__dirname, 'src');
const outDir = path.resolve(__dirname, 'dist');

export default defineConfig({
    root: root,
    base: '/',
    build: {
        outDir: outDir,
        emptyOutDir: true,
        rollupOptions: {
            plugins: [
            copy({
                targets: [{src: 'src/resources/**/*', dest: 'dist/'}],
                hook: 'writeBundle',
                flatten: false
            })],
            input: {
                main: path.resolve(root, 'index.html')
            }
        }
    }
});