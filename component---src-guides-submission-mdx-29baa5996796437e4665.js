(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{sKgz:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return s})),n.d(t,"default",(function(){return u}));n("5hJT"),n("W1QL"),n("K/PF"),n("t91x"),n("75LO"),n("PJhk"),n("mXGw");var a=n("/FXl"),o=n("TjRS");n("aD51");function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var s={};void 0!==s&&s&&s===Object(s)&&Object.isExtensible(s)&&!s.hasOwnProperty("__filemeta")&&Object.defineProperty(s,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/guides/submission.mdx"}});var i={_frontmatter:s},l=o.a;function u(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,["components"]);return Object(a.b)(l,r({},i,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h1",{id:"submission"},"Submission"),Object(a.b)("p",null,"Unsure what to do once you're ready to submit your form? Look no further."),Object(a.b)("h2",{id:"how-it-works"},"How it works"),Object(a.b)("p",null,"Just as fields and their validation is ",Object(a.b)("a",r({parentName:"p"},{href:"/guides/validation#how-validation-works"}),"conditional on your application's state"),", so is submission logic."),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},"Particularly with branching forms, there may be multiple different end results (and therefore differing submission logic).")),Object(a.b)("p",null,"This is why ",Object(a.b)("strong",{parentName:"p"},"there is no onSubmit argument")," for ",Object(a.b)("inlineCode",{parentName:"p"},"useField"),"."),Object(a.b)("h2",{id:"example-submission"},"Example submission"),Object(a.b)("p",null,"Submission logic should be colocated with the associated submission trigger (such as a 'submit' button)."),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},"To access the form state on submission, there's ",Object(a.b)("a",r({parentName:"p"},{href:"/api/useformcontext"}),Object(a.b)("inlineCode",{parentName:"a"},"useFormContext")))),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{className:"language-tsx"}),"const MySubmitComponent = () => {\n  const { fields, isValid } = useFormContext();\n  const [nameProps] = useField({ name: 'name' });\n\n  const handleSubmit = useCallback(() => {\n    const data = transformFields(fields); // Create your own transformer\n\n    fetch('/api/submit', {\n      method: 'POST',\n      body: JSON.stringify(data)\n    });\n  }, [fields]);\n\n  return (\n    <>\n      <input type=\"text\" {...nameProps} />\n      <button disabled={!isValid} onClick={handleSubmit}>\n        Submit\n      </button>\n    </>\n  );\n};\n")),Object(a.b)("h2",{id:"transforming-form-state"},"Transforming form state"),Object(a.b)("p",null,"You'll want to transform the form state into values your API can consume."),Object(a.b)("h3",{id:"extracting-values"},"Extracting values"),Object(a.b)("p",null,"A simple reducer can be used to get a key-value representation of the form state."),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{className:"language-tsx"}),"const { fields } = useFormContext();\n// fields = { field1: { value: 'hello', hasChanged: true, ... } ... }\n\nconst transformed = Object.entries(fields).reduce(\n  (p, [key, field]) => ({ [key]: field.value }),\n  {}\n);\n// transformed = { field1: 'hello', ... }\n")),Object(a.b)("h3",{id:"converting-checkbox-values"},"Converting checkbox values"),Object(a.b)("p",null,"If you find yourself needing to transform your checkbox values to objects, a reducer can also be used."),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{className:"language-tsx"}),"const arrayToObject = (array: string[]) =>\n  Object.values(array).reduce((p, value) => ({ ...p, [value]: true }), {});\n// ['a', 'b'] -> { a: true, b: true }\n")),Object(a.b)("p",null,"This function can then be combined with the previous example."),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{className:"language-tsx"}),"const { fields } = useFormContext();\n// fields = { field1: { value: ['value1', 'value3'], hasChanged: true, ... } ... }\n\nconst transformed = Object.entries(fields).reduce(\n  (p, [key, field]) =>\n    Array.isArray(field.value)\n      ? { ...p, ...arrayToObject(field.value) }\n      : { ...p, [key]: field.value },\n  {}\n);\n// transformed = { value1: true, value3: true, ... }\n")))}u&&u===Object(u)&&Object.isExtensible(u)&&!u.hasOwnProperty("__filemeta")&&Object.defineProperty(u,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/guides/submission.mdx"}}),u.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-guides-submission-mdx-29baa5996796437e4665.js.map