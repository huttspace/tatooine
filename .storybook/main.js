const path = require("path");

const toPath = (_path) => path.join(process.cwd(), _path);

// https://github.com/chakra-ui/chakra-ui/issues/6433
module.exports = {
  core: {
    builder: "webpack5",
  },
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-postcss",
    "@chakra-ui/storybook-addon",
  ],
  framework: "@storybook/react",
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          src: path.resolve(__dirname, "../src"),
          "@emotion/core": toPath("../node_modules/@emotion/react"),
          "emotion-theming": toPath("../node_modules/@emotion/react"),
        },
      },
    };
  },
};
