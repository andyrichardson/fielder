"use strict";(self.webpackChunkfielder_docs=self.webpackChunkfielder_docs||[]).push([[133],{1116:(e,n,t)=>{t.d(n,{M:()=>l});var r=t(8661),o=t(5032),l=function(e){var n=e.code,t=e.scope;return r.default.createElement(r.default.Fragment,null,r.default.createElement(o.nu,{transformCode:a,theme:s,code:n,scope:t,noInline:!0,spellCheck:!1,spellcheck:!1},r.default.createElement(o.i5,{className:c}),r.default.createElement(o.IF,null),r.default.createElement(o.uz,{spellcheck:!1,className:i})))},a=function(e){return e.replace(/import.*;/g,"")},s={plain:{fontFamily:'"Source Code Pro", monospace',color:"#90a4ae"},styles:[{types:["keyword"],style:{color:"#bd93f9"}},{types:["atrule","boolean","constant","function","id","important","keyword","symbol"],style:{color:"#7c4dff"}},{types:["operator","property","punctuation","attr-name","builtin","cdata","char","class","inserted"],style:{color:"#39adb5"}},{types:["tag","url","variable","deleted","entity","selector"],style:{color:"#e53935"}},{types:["attr-value","attribute","psuedo-element","psuedo-class","string"],style:{color:"#f6a434"}}]},i="elkoedf",c="p1rlkpet";t(8424)},7133:(e,n,t)=>{t.r(n),t.d(n,{default:()=>p});var r=t(8311),o=t(4942),l=t(8661),a=t(1116),s=t(6034);function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){(0,o.Z)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var u=c(c({},s),{},{useState:l.useState,useMemo:l.useMemo,useCallback:l.useCallback}),m=function(){return l.default.createElement(a.M,{code:'import { useForm, useField, useSubmit, FielderProvider } from "fielder";\n\nconst Form = () => {\n  const [step, setStep] = useState(0);\n  const form = useForm();\n\n  const content = useMemo(() => {\n    if (step === 0) {\n      return <RegionSelect onComplete={() => setStep(1)} />;\n    }\n\n    console.log(form.fields);\n\n    if (form.fields.region.value === "UK") {\n      return <UKSubForm />;\n    }\n\n    return <USSubForm />;\n  }, [form.fields, step]);\n\n  return <FielderProvider value={form}>{content}</FielderProvider>;\n};\n\nconst RegionSelect = ({ onComplete }) => {\n  const [regionProps, regionMeta] = useField({\n    name: "region",\n    initialValue: "UK",\n  });\n\n  return (\n    <form autoComplete="off">\n      <div className="field">\n        <label>Region</label>\n        <select {...regionProps}>\n          <option value="US">United States</option>\n          <option value="UK">United Kingdom</option>\n        </select>\n        {conditionalError(regionMeta)}\n      </div>\n\n      <button type="button" onClick={onComplete} className="primary">\n        Next\n      </button>\n    </form>\n  );\n};\n\nconst USSubForm = () => {\n  const [ageProps, ageMeta] = useField({\n    name: "age",\n    initialValue: "18",\n    validate: useCallback(({ value }) => {\n      if (value < 18) {\n        throw Error("Age must be over 18");\n      }\n    }, []),\n  });\n\n  const { handleSubmit } = useSubmit((values) =>\n    alert(`Submitted: ${JSON.stringify(values, null, 2)}`)\n  );\n\n  return (\n    <form autoComplete="off">\n      <div className="field">\n        <label>Age</label>\n        <input type="number" {...ageProps} />\n        {conditionalError(ageMeta)}\n      </div>\n\n      <button type="button" onClick={handleSubmit} className="primary">\n        Next\n      </button>\n    </form>\n  );\n};\n\nconst UKSubForm = () => {\n  const [nameProps, nameMeta] = useField({\n    name: "name",\n    initialValue: "UK Citizen",\n  });\n  const [termsProps, termsMeta] = useField({\n    name: "ukTerms",\n    initialValue: [],\n    validate: useCallback(({ value }) => {\n      if (!value.includes("legal")) {\n        throw Error("Legal terms must be accepted");\n      }\n    }, []),\n  });\n\n  const checkboxes = useMemo(\n    () => [\n      { label: "Send me marketing mail", value: "marketing" },\n      { label: "I accept terms", value: "legal" },\n    ],\n    []\n  );\n\n  const { handleSubmit } = useSubmit((values) =>\n    alert(`Submitted: ${JSON.stringify(values, null, 2)}`)\n  );\n\n  return (\n    <form autoComplete="off">\n      <div className="field">\n        <label>Name</label>\n        <input type="text" {...nameProps} />\n      </div>\n\n      <div className="field column">\n        <label>Terms</label>\n        {checkboxes.map(({ label, value }) => (\n          <div key={value} className="field">\n            <input\n              type="checkbox"\n              {...termsProps}\n              value={value}\n              checked={termsProps.value.includes(value)}\n            />\n            <span>{label}</span>\n          </div>\n        ))}\n        {conditionalError(termsMeta)}\n      </div>\n\n      <button type="button" className="primary" onClick={handleSubmit}>\n        Submit\n      </button>\n    </form>\n  );\n};\n\nconst conditionalError = (meta) => meta.error && <p>{meta.error}</p>;\n\n// Render this live example\nrender(<Form />);\n',scope:u})};function d(e){var n=Object.assign({h1:"h1",p:"p",blockquote:"blockquote"},e.components);return(0,r.BX)(r.HY,{children:[(0,r.tZ)(n.h1,{id:"dynamic-forms",children:"Dynamic forms"}),"\n",(0,r.tZ)(n.p,{children:"Here's a basic login form, try enter some fake values and see how validation works."}),"\n",(0,r.BX)(n.blockquote,{children:["\n",(0,r.tZ)(n.p,{children:"The code below can be live-edited"}),"\n"]}),"\n",(0,r.tZ)(m,{})]})}const p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.components||{},t=n.wrapper;return t?(0,r.tZ)(t,Object.assign({},e,{children:(0,r.tZ)(d,e)})):d(e)}},8424:(e,n,t)=>{t.r(n)}}]);