(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{aVdo:function(e,n,t){"use strict";t.r(n),t.d(n,"_frontmatter",(function(){return l})),t.d(n,"default",(function(){return s}));t("5hJT"),t("W1QL"),t("K/PF"),t("t91x"),t("75LO"),t("PJhk"),t("mXGw");var a=t("/FXl"),r=t("TjRS");t("aD51");function o(){return(o=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e}).apply(this,arguments)}var l={};void 0!==l&&l&&l===Object(l)&&Object.isExtensible(l)&&!l.hasOwnProperty("__filemeta")&&Object.defineProperty(l,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/api/useForm.mdx"}});var i={_frontmatter:l},d=r.a;function s(e){var n=e.components,t=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,["components"]);return Object(a.b)(d,o({},i,t,{components:n,mdxType:"MDXLayout"}),Object(a.b)("h1",{id:"useform"},"useForm"),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"Creates a new form instance.")),Object(a.b)("pre",null,Object(a.b)("code",o({parentName:"pre"},{className:"language-tsx"}),"import { useForm } from 'fielder';\n")),Object(a.b)("h2",{id:"example-usage"},"Example Usage"),Object(a.b)("pre",null,Object(a.b)("code",o({parentName:"pre"},{className:"language-tsx"}),"const formState = useForm();\n\nreturn <FielderProvider value={formState}>{children}</FielderProvider>;\n")),Object(a.b)("h2",{id:"return-type"},"Return type"),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"The state of the form ",Object(a.b)("a",o({parentName:"em"},{href:"#formstate"}),"(FormState)")," along with accessors and mutators.")),Object(a.b)("p",null,"Type: ",Object(a.b)("inlineCode",{parentName:"p"},"FormState")),Object(a.b)("h2",{id:"arguments"},"Arguments"),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"useForm")," doesn't take any arguments."),Object(a.b)("h2",{id:"types"},"Types"),Object(a.b)("h3",{id:"formstate"},"FormState"),Object(a.b)("p",null,"The state of the whole form along with accessors and mutators."),Object(a.b)("pre",null,Object(a.b)("code",o({parentName:"pre"},{className:"language-ts"}),"export interface FormState<T extends Record<string, any> = any> {\n  fields: Record<string, FieldState>;\n  isValid: boolean;\n  isValidating: boolean;\n  mountField: (k: FieldConfig<T>) => void;\n  unmountField: (k: UnmountFieldArgs<T>) => void;\n  setFieldValue: (a: SetFieldValueArgs<T>) => void;\n  blurField: (a: BlurFieldArgs<T>) => void;\n  validateField: (a: { name: keyof T & string }) => void;\n  validateFields: () => void;\n}\n")),Object(a.b)("h3",{id:"fieldstate"},"FieldState"),Object(a.b)("p",null,"The state of an individual field (including meta information)."),Object(a.b)("pre",null,Object(a.b)("code",o({parentName:"pre"},{className:"language-tsx"}),"export interface FieldState<T = string | boolean | number> {\n  // Internals\n  readonly _isActive: boolean;\n  readonly _validateOnChange: boolean;\n  readonly _validateOnBlur: boolean;\n  readonly _validateOnUpdate: boolean;\n  readonly _validate: FieldConfig['validate'];\n\n  // Props\n  readonly name: string;\n  readonly value?: T;\n\n  // Meta\n  readonly error?: FormError;\n  readonly isValid: boolean;\n  readonly isValidating: boolean;\n  readonly hasBlurred: boolean;\n  readonly hasChanged: boolean;\n}\n")))}s&&s===Object(s)&&Object.isExtensible(s)&&!s.hasOwnProperty("__filemeta")&&Object.defineProperty(s,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/api/useForm.mdx"}}),s.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-api-use-form-mdx-b319e4d8736dc1a5ba5e.js.map