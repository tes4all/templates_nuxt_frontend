/** @type { import('storybook-vue').StorybookConfig } */
const config = {
  core: {
    disableTelemetry: true,
  },
  stories: ['../app/components/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook-vue/nuxt',
    options: {},
  },
  staticDirs: [{ from: '../public/static', to: 'assets' }],
  docs: {
    autodocs: 'tag',
  },
}
export default config
