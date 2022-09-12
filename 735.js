"use strict";(self.webpackChunkfielder_docs=self.webpackChunkfielder_docs||[]).push([[735],{1116:(e,n,t)=>{t.d(n,{M:()=>a});var r=t(8661),o=t(5032),a=function(e){var n=e.code,t=e.scope;return r.default.createElement(r.default.Fragment,null,r.default.createElement(o.nu,{transformCode:s,theme:l,code:n,scope:t,noInline:!0,spellCheck:!1,spellcheck:!1},r.default.createElement(o.i5,{className:c}),r.default.createElement(o.IF,null),r.default.createElement(o.uz,{spellcheck:!1,className:i})))},s=function(e){return e.replace(/import.*;/g,"")},l={plain:{fontFamily:'"Source Code Pro", monospace',color:"#90a4ae"},styles:[{types:["keyword"],style:{color:"#bd93f9"}},{types:["atrule","boolean","constant","function","id","important","keyword","symbol"],style:{color:"#7c4dff"}},{types:["operator","property","punctuation","attr-name","builtin","cdata","char","class","inserted"],style:{color:"#39adb5"}},{types:["tag","url","variable","deleted","entity","selector"],style:{color:"#e53935"}},{types:["attr-value","attribute","psuedo-element","psuedo-class","string"],style:{color:"#f6a434"}}]},i="elkoedf",c="p1rlkpet";t(8424)},9735:(e,n,t)=>{t.r(n),t.d(n,{default:()=>p});var r=t(8311),o=t(4942),a=t(8661),s=t(6034),l=t(1116);function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}var c=function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){(0,o.Z)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}({},s),u=function(){return a.default.createElement(l.M,{code:'import { useForm, useField, useSubmit, FielderProvider } from "fielder";\n\nconst Form = () => {\n  const form = useForm();\n\n  return (\n    <FielderProvider value={form}>\n      <FormContent />\n    </FielderProvider>\n  );\n};\n\nconst FormContent = () => {\n  const [usernameProps, usernameMeta] = useField({\n    name: "username",\n    initialValue: "",\n    validate: usernameValidation,\n  });\n  const [passwordProps, passwordMeta] = useField({\n    name: "password",\n    initialValue: "",\n    validate: passwordValidation,\n  });\n\n  const { handleSubmit } = useSubmit((values) =>\n    alert(`Submitted: ${JSON.stringify(values, null, 2)}`)\n  );\n\n  return (\n    <form autoComplete="off">\n      <div className="field">\n        <label>Username</label>\n        <input type="text" {...usernameProps} />\n        {conditionalError(usernameMeta)}\n      </div>\n\n      <div className="field">\n        <label>Password</label>\n        <input type="password" {...passwordProps} />\n        {conditionalError(passwordMeta)}\n      </div>\n\n      <button type="button" onClick={handleSubmit} className="primary">\n        Submit\n      </button>\n    </form>\n  );\n};\n\nconst usernameValidation = ({ value }) => {\n  if (!value) {\n    throw Error("Username is required.");\n  }\n\n  if (value.length < 4) {\n    throw Error("Username must be at least 4 characters.");\n  }\n};\n\nconst passwordValidation = ({ value }) => {\n  if (!value) {\n    throw Error("Password is required.");\n  }\n\n  if (value.length < 4) {\n    throw Error("Password must be at least 4 characters.");\n  }\n};\n\nconst conditionalError = (meta) =>\n  meta.hasBlurred && meta.error && <p>{meta.error}</p>;\n\n// Render this live example\nrender(<Form />);\n\n',scope:c})};function d(e){var n=Object.assign({h1:"h1",p:"p",blockquote:"blockquote"},e.components);return(0,r.BX)(r.HY,{children:[(0,r.tZ)(n.h1,{id:"static-forms",children:"Static forms"}),"\n",(0,r.tZ)(n.p,{children:"Here's a basic login form, try enter some fake values to see how validation works."}),"\n",(0,r.BX)(n.blockquote,{children:["\n",(0,r.tZ)(n.p,{children:"Feel free to make changes to the code below!"}),"\n"]}),"\n",(0,r.tZ)(u,{})]})}const p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.components||{},t=n.wrapper;return t?(0,r.tZ)(t,Object.assign({},e,{children:(0,r.tZ)(d,e)})):d(e)}},8424:(e,n,t)=>{t.r(n)}}]);