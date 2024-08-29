import * as path from 'path';
import * as fs from 'fs';
import type { ClassesObjectType, HasEPE, HasECE } from '..';
import htmlTags from './html-tags';

export function findNextJsProjectRoot(startPath: string): string | null {
  let currentPath = startPath;
  while (currentPath !== '/') {
    if (
      fs.existsSync(path.join(currentPath, 'package.json')) &&
      (fs.existsSync(path.join(currentPath, 'next.config.js')) || fs.existsSync(path.join(currentPath, 'next.config.mjs')))
    ) {
      return currentPath;
    }
    currentPath = path.dirname(currentPath);
  }
  return null;
}

const isWindowDefined = typeof window !== 'undefined';
const isDocumentDefined = typeof document !== 'undefined';
export const isServer = !isWindowDefined || !isDocumentDefined;
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isDevAndTest = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';
export const isDevServer = isDevelopment && isServer;

const exception = ['line-height', 'font-weight', 'opacity', 'scale', 'z-index'];

export const applyCssValue = (value: string | number, cssProp: string): string => {
  if (typeof value === 'number') {
    return exception.includes(cssProp) ? value.toString() : value + 'px';
  }
  return value;
};

export const isClassesObjectType = (object: object): object is ClassesObjectType => {
  return typeof object === 'object' && !Array.isArray(object);
};

export const toPascalCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const pascalCaseHtmlTags = htmlTags.map((code) => toPascalCase(code));
const hasECERegex = /^has(.*?)Child(.*?)$/;
const hasEPERegex = /^has(.*?)Plus(.*?)$/;

function isHasECEType(property: string): property is HasECE {
  return hasECERegex.test(property);
}

function isHasEPEType(property: string): property is HasEPE {
  return hasEPERegex.test(property);
}

const dir = (direname: string, relativePath: string) => {
  return path.join(direname, relativePath);
};

export const get = {
  dir,
};

export const camelToKebabCase = (property: string) => {
  const toKebabCase = (str: string) => str.replace(/([A-Z])/g, '-$1').toLowerCase();

  const processAfterProp = (afterProp: string) => {
    const afterPropKebab = afterProp.replace(/_/g, '-').toLowerCase();
    return `.${afterPropKebab}`;
  };

  if (isHasECEType(property)) {
    const matches = property.match(hasECERegex);
    if (matches) {
      const [, tag1, tag2] = matches;
      const tagOrClass1 = pascalCaseHtmlTags.includes(tag1) ? tag1.toLowerCase() : processAfterProp(tag1);
      const tagOrClass2 = pascalCaseHtmlTags.includes(tag2) ? tag2.toLowerCase() : processAfterProp(tag2);
      return `:has(${tagOrClass1} > ${tagOrClass2})`;
    }
  }

  if (isHasEPEType(property)) {
    const matches = property.match(hasEPERegex);
    if (matches) {
      const [, tag1, tag2] = matches;
      const tagOrClass1 = pascalCaseHtmlTags.includes(tag1) ? tag1.toLowerCase() : processAfterProp(tag1);
      const tagOrClass2 = pascalCaseHtmlTags.includes(tag2) ? tag2.toLowerCase() : processAfterProp(tag2);
      return `:has(${tagOrClass1} + ${tagOrClass2})`;
    }
  }

  const pseudoCamelPropWithArgs = ['nthChild', 'nthLastChild', 'nthLastOfType', 'nthOfType', 'lang', 'hasChild', 'hasPlus', 'has', 'not'];

  for (const prop of pseudoCamelPropWithArgs) {
    const index = property.indexOf(prop);
    if (index !== -1) {
      const afterProp = property.slice(index + prop.length);
      const afterPropKebab = afterProp.replace(/_/g, '-').toLowerCase();
      const tagOrClass = pascalCaseHtmlTags.includes(afterProp) ? afterPropKebab : `.${afterPropKebab}`;

      if (prop === 'not') {
        if (property.includes('not(')) {
          return `:not${afterProp.toLowerCase()}`;
        } else {
          return `:not(${tagOrClass})`;
        }
      }
      if (prop === 'hasChild') {
        return `:has(> ${tagOrClass})`;
      }

      if (prop === 'hasPlus') {
        return `:has(+ ${tagOrClass})`;
      }

      if (prop === 'has') {
        if (property.includes('has(')) {
          return `:has${afterProp.toLowerCase()}`;
        } else {
          return `:has(${tagOrClass})`;
        }
      }

      return `${toKebabCase(prop)}${afterProp && `(${afterPropKebab})`}`;
    }
  }

  return toKebabCase(property);
};
