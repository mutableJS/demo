import { defineConfig } from 'vite';

export default defineConfig({
	esbuild: {
		jsx: 'transform',
		jsxFactory: 'mutableElement',
		jsxInject: "import mutableElement from '@mutablejs/dom';",
	},
});
