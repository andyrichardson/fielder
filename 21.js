(self.webpackChunkfielder_docs=self.webpackChunkfielder_docs||[]).push([[21],{1116:(e,n,t)=>{"use strict";t.d(n,{M:()=>l});var o=t(8661),r=t(5032),l=function(e){var n=e.code,t=e.scope;return o.default.createElement(o.default.Fragment,null,o.default.createElement(r.nu,{transformCode:a,theme:s,code:n,scope:t,noInline:!0,spellCheck:!1,spellcheck:!1},o.default.createElement(r.i5,{className:c}),o.default.createElement(r.IF,null),o.default.createElement(r.uz,{spellcheck:!1,className:i})))},a=function(e){return e.replace(/import.*;/g,"")},s={plain:{fontFamily:'"Source Code Pro", monospace',color:"#90a4ae"},styles:[{types:["keyword"],style:{color:"#bd93f9"}},{types:["atrule","boolean","constant","function","id","important","keyword","symbol"],style:{color:"#7c4dff"}},{types:["operator","property","punctuation","attr-name","builtin","cdata","char","class","inserted"],style:{color:"#39adb5"}},{types:["tag","url","variable","deleted","entity","selector"],style:{color:"#e53935"}},{types:["attr-value","attribute","psuedo-element","psuedo-class","string"],style:{color:"#f6a434"}}]},i="elkoedf",c="p1rlkpet";t(2150)},8021:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>g});var o=t(7154),r=t.n(o),l=t(6479),a=t.n(l),s=t(8661),i=t(3905),c=t(9713),u=t.n(c),m=t(1116),d=t(6034);function p(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function f(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?p(Object(t),!0).forEach((function(n){u()(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var b=f(f({},d),{},{useState:s.useState,useMemo:s.useMemo,useCallback:s.useCallback}),v=function(){return s.default.createElement(m.M,{code:'import { useForm, useField, useSubmit, FielderProvider } from "fielder";\n\n// ============================\n// Form\n// ============================\n//\n// Root level component creates form state and exposes via context.\n// Also handles routing of form content.\n\nconst Form = () => {\n  const [step, setStep] = useState(0);\n  const form = useForm();\n\n  const content = useMemo(() => {\n    if (step === 0) {\n      return <RegionSelect onComplete={() => setStep(1)} />;\n    }\n\n    console.log(form.fields);\n\n    if (form.fields.region.value === "UK") {\n      return <UKSubForm />;\n    }\n\n    return <USSubForm />;\n  }, [form.fields, step]);\n\n  return <FielderProvider value={form}>{content}</FielderProvider>;\n};\n\n// ============================\n// Form step 1\n// ============================\n//\n// Form content which is dynamically rendered.\n\nconst RegionSelect = ({ onComplete }) => {\n  const [regionProps, regionMeta] = useField({\n    name: "region",\n    initialValue: "UK",\n  });\n\n  return (\n    <form autoComplete="off">\n      <div className="field">\n        <label>Region</label>\n        <select {...regionProps}>\n          <option value="US">United States</option>\n          <option value="UK">United Kingdom</option>\n        </select>\n        {conditionalError(regionMeta)}\n      </div>\n\n      <button type="button" onClick={onComplete} className="primary">\n        Next\n      </button>\n    </form>\n  );\n};\n\n// ==============================\n// Form step 2 (conditional - US)\n// ==============================\n//\n// Form content + validation which is conditionally rendered\n// depending on a previous step.\n\nconst USSubForm = () => {\n  const [ageProps, ageMeta] = useField({\n    name: "age",\n    initialValue: "18",\n    validate: useCallback(({ value }) => {\n      if (value < 18) {\n        throw Error("Age must be over 18");\n      }\n    }, []),\n  });\n\n  const { handleSubmit } = useSubmit((values) =>\n    alert(`Submitted: ${JSON.stringify(values, null, 2)}`)\n  );\n\n  return (\n    <form autoComplete="off">\n      <div className="field">\n        <label>Age</label>\n        <input type="number" {...ageProps} />\n        {conditionalError(ageMeta)}\n      </div>\n\n      <button type="button" onClick={handleSubmit} className="primary">\n        Next\n      </button>\n    </form>\n  );\n};\n\n// ==============================\n// Form step 2 (conditional - UK)\n// ==============================\n//\n// Form content + validation which is conditionally rendered\n// depending on a previous step.\n\nconst UKSubForm = () => {\n  const [nameProps, nameMeta] = useField({\n    name: "name",\n    initialValue: "UK Citizen",\n  });\n  const [termsProps, termsMeta] = useField({\n    name: "ukTerms",\n    initialValue: [],\n    validate: useCallback(({ value }) => {\n      if (!value.includes("legal")) {\n        throw Error("Legal terms must be accepted");\n      }\n    }, []),\n  });\n\n  const checkboxes = useMemo(\n    () => [\n      { label: "Send me marketing mail", value: "marketing" },\n      { label: "I accept terms", value: "legal" },\n    ],\n    []\n  );\n\n  const { handleSubmit } = useSubmit((values) =>\n    alert(`Submitted: ${JSON.stringify(values, null, 2)}`)\n  );\n\n  return (\n    <form autoComplete="off">\n      <div className="field">\n        <label>Name</label>\n        <input type="text" {...nameProps} />\n      </div>\n\n      <div className="field column">\n        <label>Terms</label>\n        {checkboxes.map(({ label, value }) => (\n          <div key={value} className="field">\n            <input\n              type="checkbox"\n              {...termsProps}\n              value={value}\n              checked={termsProps.value.includes(value)}\n            />\n            <span>{label}</span>\n          </div>\n        ))}\n        {conditionalError(termsMeta)}\n      </div>\n\n      <button type="button" className="primary" onClick={handleSubmit}>\n        Submit\n      </button>\n    </form>\n  );\n};\n\nconst conditionalError = (meta) => meta.error && <p>{meta.error}</p>;\n\n// Render this live example\nrender(<Form />);\n',scope:b})},y={};function g(e){var n=e.components,t=a()(e,["components"]);return(0,i.kt)("wrapper",r()({},y,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"dynamic-forms"},"Dynamic forms"),(0,i.kt)("p",null,"Here's a basic login form, try enter some fake values and see how validation works."),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"The code below can be live-edited")),(0,i.kt)(v,{mdxType:"Example"}))}g.isMDXComponent=!0},2150:(e,n,t)=>{"use strict";t.r(n)}}]);