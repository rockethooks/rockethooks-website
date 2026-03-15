declare module 'eslint-plugin-jsx-a11y' {
  import type { ESLint } from 'eslint';
  const plugin: ESLint.Plugin & {
    flatConfigs: {
      recommended: import('eslint').Linter.Config;
      strict: import('eslint').Linter.Config;
    };
  };
  export default plugin;
}
