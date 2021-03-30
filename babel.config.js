module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json'
        ],
        // alias: {
        //   "@assets": "./src/assets/*",
        //   "@images": "./src/assets/img/*",
        //   "@icons": "./src/assets/icons/*",
        //   "@components": "./src/components/*",
        //   "@config": "./src/config/*",
        //   "@constants": "./src/constants/*",
        //   "@database": "./src/database/*",
        //   "@routers": "./src/routers/*",
        //   "@screens": "./src/screens/*",
        //   "@store": "./src/store/*",
        //   "@utils": "./src/utils/*"
        // }
      }
    ]
  ]
};
