(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"7A3R":function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return l})),n.d(t,"default",(function(){return u}));n("5hJT"),n("W1QL"),n("K/PF"),n("t91x"),n("75LO"),n("PJhk"),n("mXGw");var a=n("/FXl"),r=n("TjRS");n("aD51");function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var l={};void 0!==l&&l&&l===Object(l)&&Object.isExtensible(l)&&!l.hasOwnProperty("__filemeta")&&Object.defineProperty(l,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/index.mdx"}});var o={_frontmatter:l},b=r.a;function u(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,["components"]);return Object(a.b)(b,i({},o,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h1",{id:"about"},"About"),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"Fielder")," is a React form library that has been built from the ground up with a ",Object(a.b)("strong",{parentName:"p"},"field-first")," approach to validation."),Object(a.b)("p",null,"What does this mean?"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Validation can easily be added and removed to a form"),Object(a.b)("li",{parentName:"ul"},"Only validate what the user can see (see cross form validation below)"),Object(a.b)("li",{parentName:"ul"},"No need for a large set of upfront domain knowledge")),Object(a.b)("h2",{id:"features"},"Features"),Object(a.b)("h3",{id:"immediate-validation"},"Immediate validation"),Object(a.b)("p",null,"Synchronous validation will update state immediately in the event of a change/blur."),Object(a.b)("p",null,'Fewer renders, better performance and no weird "intermediary states".'),Object(a.b)("h3",{id:"optimized-for-flexibility"},"Optimized for flexibility"),Object(a.b)("p",null,"While Yup is supported, you're not limited to using a large Yup schema. Validation functions receive the form state as well as the field value."),Object(a.b)("pre",null,Object(a.b)("code",i({parentName:"pre"},{className:"language-tsx"}),"(value, state) =>\n  state.otherField.value === 'string'\n    ? Yup.string()\n        .required()\n        .validateSync(value)\n    : Yup.number().validateSync(value);\n")),Object(a.b)("h3",{id:"user-focused-api"},"User focused API"),Object(a.b)("p",null,"Users don't want to find out that the value they entered on a previous page is invalid. This is why ",Object(a.b)("em",{parentName:"p"},"Fielder")," encourages field-level validation."),Object(a.b)("p",null,"If the field isn't mounted, the value won't be validated. Simple!"),Object(a.b)("h3",{id:"one-way-to-do-things"},"One way to do things"),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"Fielder")," has been built with hooks since day one. There aren't any clunky APIs to learn, only ",Object(a.b)("inlineCode",{parentName:"p"},"useField"),", ",Object(a.b)("inlineCode",{parentName:"p"},"useForm")," and ",Object(a.b)("inlineCode",{parentName:"p"},"useFormContext"),"."),Object(a.b)("p",null,"Your data doesn't need to be coupled to your components (and likely shouldn't be), that's why ",Object(a.b)("em",{parentName:"p"},"Fielder")," doesn't include a component API."),Object(a.b)("h2",{id:"usage"},"Usage"),Object(a.b)("h3",{id:"setting-up-a-form"},"Setting up a form"),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"useForm")," is where you initiate your form. In order to expose the form to any child components (and subsequently ",Object(a.b)("inlineCode",{parentName:"p"},"useField"),"), you'll want to expose it via context."),Object(a.b)("pre",null,Object(a.b)("code",i({parentName:"pre"},{className:"language-tsx"}),"const myForm = useForm();\n\nreturn <FielderProvider value={myForm}>{children}</FielderProvider>;\n")),Object(a.b)("h3",{id:"declaring-fields"},"Declaring fields"),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"useField")," is where you harness the power of ",Object(a.b)("em",{parentName:"p"},"Fielder"),"."),Object(a.b)("pre",null,Object(a.b)("code",i({parentName:"pre"},{className:"language-tsx"}),"const [nameProps, nameMeta] = useField({\n  name: 'userName',\n  validate: useCallback((v) => Yup.string().required().validateSync(v), []);\n});\n\nreturn (\n  <>\n    <input type=\"text\" {...nameProps} />\n    {nameMeta.hasChanged && nameMeta.error && <ErrorMessage>{nameMeta.error}</ErrorMessage>}\n  </>\n);\n")),Object(a.b)("p",null,"There are a whole number of additional arguments which can be passed to ",Object(a.b)("inlineCode",{parentName:"p"},"useField")," which allow you to:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Set validation"),Object(a.b)("li",{parentName:"ul"},"Set when validation is triggered (e.g. on blur, change, etc)"),Object(a.b)("li",{parentName:"ul"},"Set initial value, error and valid states"),Object(a.b)("li",{parentName:"ul"},"Set unmount behaviour")),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},"Note: Unlike other popular form libraries, ",Object(a.b)("em",{parentName:"p"},"Fielder")," allows you to change config options (such as validation) at any time.")))}u&&u===Object(u)&&Object.isExtensible(u)&&!u.hasOwnProperty("__filemeta")&&Object.defineProperty(u,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/index.mdx"}}),u.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-index-mdx-f50e868214b760f00fe6.js.map