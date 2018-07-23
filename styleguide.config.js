const path = require('path')
const snapguidist = require('snapguidist')
const fs = require('fs')

const mockupsSections = fs.readdirSync('docs/mockups')
    .filter(file => path.extname(file) === '.md')
    .map(file => ({
        name: path.basename(file, '.md'),
        content: `docs/mockups/${file}`,
      }))

module.exports = snapguidist({
    assetsDir: 'docs/assets',

    pagePerSection: true,

    // components: 'src/components/**/[A-Z]*.tsx',

    sections: [
        {
            content: 'README.md',
            name: 'README',
          },
        {
            components: [],
            content: 'docs/Overview.md',
            name: 'Overview',
            sections: [
                {
                    content: 'docs/BriefDescription.md',
                    name: 'Brief architecture description',
                  },
                {
                    name: 'Workflow example',
                    content: 'docs/workflow-00.md',
                    sections: [
                        {
                            content: 'docs/workflow-01.md',
                            name: 'Creating a component',
                          },
                        {
                            content: 'docs/workflow-02.md',
                            name: 'Connecting the component to the application',
                          },
                        {
                            content: 'docs/workflow-03.md',
                            name: 'Backend API interaction',
                          },
                    ],
                  },
                {
                    content: 'docs/testing.md',
                    name: 'Testing',
                  },
            ],
          },
        {
            name: 'Mockups',
            sections: mockupsSections,
          },
        {
            components: 'src/components/**/[A-Z]*.tsx',
            name: 'Components',
          },
    ],

    ignore: [
        'src/services/**',
        'src/reducers/**',
        'src/containers/**',
        'src/sagas/**',
        'src/**/*.test.ts',
    ],
    propsParser: require('react-docgen-typescript').withDefaultConfig({}).parse,
    require: [
    ],
    showCode: false,
    skipComponentsWithoutExample: false,
    styles: {
        Playground: {
            preview: {
                'background-image': "url('/preview_bg.jpg')",
              },
          },
      },
    theme: {
        maxWidth: '100%',
      },
    webpackConfig: require('./config/webpack.config.dev.js'),
  })
