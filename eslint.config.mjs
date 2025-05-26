import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // React rules
      'react/no-unescaped-entities': 'off',
      
      // Next.js rules
      '@next/next/no-page-custom-font': 'off',
      '@next/next/no-img-element': 'off',
      
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      
      // Accessibility rules
      'jsx-a11y/alt-text': 'off',
    },
  },
];

export default eslintConfig;
