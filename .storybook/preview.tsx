import { MantineProvider } from "@mantine/core";

function ThemeWrapper(props: { children: React.ReactNode }) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      {props.children}
    </MantineProvider>
  );
}

// enhance your stories with decorator that uses ThemeWrapper
export const decorators = [
  (renderStory: Function) => <ThemeWrapper>{renderStory()}</ThemeWrapper>,
];
