import { ChakraProvider, extendTheme, withDefaultSize } from "@chakra-ui/react";

export const theme = extendTheme(
  {
    components: {
      Input: {
        sizes: {
          sm: {
            field: {
              borderRadius: "6px",
            },
          },
        },
      },
      NumberInput: {
        sizes: {
          sm: {
            field: {
              borderRadius: "6px",
            },
          },
        },
      },
    },
  },
  withDefaultSize({
    size: "sm",
    components: ["Button", "Input", "NumberInput"],
  }),
);
