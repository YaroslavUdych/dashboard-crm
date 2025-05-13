import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-plugin-prettier'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'

export default [
  // Ігнорування певних директорій
  {
    ignores: [
      'dist',
      'node_modules',
      '**/__test__/**',
      '**/*.test.js',
      '**/*.test.jsx',
      '**/*.test.ts',
      '**/*.test.tsx',
      'babel.config.js',
      'vite.config.ts',
      'tsconfig.app.json'
    ]
  },

  // Базові рекомендації для JS (Flat Config від @eslint/js)
  js.configs.recommended,

  // Рекомендовані правила для TypeScript (@typescript-eslint)
  {
    languageOptions: {
      parser: tsParser
    },
    rules: {
      ...tsPlugin.configs.recommended.rules
    }
  },

  // Основна конфігурація вашого проєкту
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      react: reactPlugin,
      'jsx-a11y': jsxA11y,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettier,
      '@typescript-eslint': tsPlugin,
      'simple-import-sort': simpleImportSort
    },
    rules: {
      // Рекомендовані правила для React
      ...reactPlugin.configs.recommended.rules,

      // Рекомендовані правила для a11y
      ...jsxA11y.configs.recommended.rules,

      // Рекомендовані правила для React Hooks
      ...reactHooks.configs.recommended.rules,

      // Вимкнення PropTypes, бо використовуємо TypeScript
      'react/prop-types': 'off',

      // Доступність
      'jsx-a11y/anchor-is-valid': 'warn',

      // Вимикаємо правило про React в скоупі, оскільки в React 18+ це не потрібно.
      'react/react-in-jsx-scope': 'off',

      // React Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],

      // Prettier інтеграція
      'prettier/prettier': [
        'warn',
        {
          trailingComma: 'none', // Заборона ком в кінці
          semi: false, // Без крапок з комою
          singleQuote: true, // Одинарні лапки
          tabWidth: 2, // Відступ у 2 пробіли
          useTabs: false // Пробіли замість табуляцій
        }
      ],

      // Сортування пропсів
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true, // Функції-обробники на останньому місці
          shorthandFirst: true, // Шортхенд-пропси (наприклад, `isActive`) на початку
          noSortAlphabetically: false, // Увімкнути алфавітне сортування
          reservedFirst: true // Резервовані пропси (наприклад, `key`, `ref`) на початку
        }
      ],

      // Порядок імпортів
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            // Група для системних модулів (node)
            ['^\\u0000'],
            // Група для зовнішніх бібліотек, крім classnames
            ['^(?!classnames$)(@?\\w)'],
            // Група для внутрішніх модулів
            ['^@/'],
            // Все інше
            ['^'],
            // Група для стилів (CSS/SCSS)
            ['^.+\\.s?css$'],
            // Група для classnames
            ['^classnames$']
          ]
        }
      ],
      // Загальні правила стилю
      indent: ['warn', 2], // Відступи з 2 пробілами
      quotes: ['warn', 'single'], // Одинарні лапки
      semi: ['warn', 'never'], // Не ставити крапки з комою
      'no-multiple-empty-lines': ['warn', { max: 1 }], // Максимум один порожній рядок
      'eol-last': ['warn', 'always'], // Порожній рядок в кінці файлу
      'no-console': 'warn', // Попередження для використання console.log
      'arrow-spacing': ['warn', { before: true, after: true }] // Пробіли навколо =>
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import/resolver': {
        typescript: {} // Дозволяє ESLint резолвити шляхи з tsconfig
      }
    }
  }
]
