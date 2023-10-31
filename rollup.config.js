import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import scss from "rollup-plugin-scss";
// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;
const api_token = process.env.REACT_APP_API_TOKEN
console.log(api_token)
const options = {
    input: 'src/index.tsx',
    output: {
        file: 'public/mashup.js',
        format: 'iife', // immediately-invoked function expression — suitable for <script> tags
        sourcemap: false
    },
    plugins: [
        typescript({ "jsx": "react-jsx", "allowImportingTsExtensions": true, "noEmit": true,"target": "es6"  }),
        resolve(), // tells Rollup how to find date-fns in node_modules
        nodeResolve({
            extensions: [".tsx"],
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.REACT_APP_API_TOKEN': JSON.stringify(api_token),
            'preventAssignment':true
        }),
        commonjs(), // converts date-fns to ES modules
        production && terser(),
        babel({
            presets: ["@babel/preset-react"],
        }), // minify, but only in production
        scss({
            fileName: "style.css",
        }),
    ]
};

export default options;