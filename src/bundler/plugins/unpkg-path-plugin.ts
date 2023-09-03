import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      //Handle root entry file of "index.js"
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return {
          path: 'index.js',
          namespace: 'a',
        };
      });

      // Handle relative paths in a module
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          namespace: 'a',
          // path: new URL(args.path, args.importer + '/').href,
          path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/')
            .href,
        };
      });

      // Handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };
      });
    },
  };
};

// export const unpkgPathPlugin = () => {
//   return {
//     name: 'unpkg-path-plugin',
//     setup(build: esbuild.PluginBuild) {
//       build.onResolve({ filter: /.*/ }, async (args: any) => {
//         console.log('onResole', args);
//         return { path: args.path, namespace: 'a' };
//       });

//       build.onLoad({ filter: /.*/ }, async (args: any) => {
//         console.log('onLoad', args);

//         if (args.path === 'index.js') {
//           return {
//             loader: 'jsx',
//             contents: `
//               import message from './message';
//               console.log(message);
//             `,
//           };
//         } else {
//           return {
//             loader: 'jsx',
//             contents: 'export default "hi there!"',
//           };
//         }
//       });
//     },
//   };
// };
