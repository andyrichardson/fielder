(self.webpackChunkfielder_docs=self.webpackChunkfielder_docs||[]).push([[402],{5402:(e,a,t)=>{"use strict";t.r(a),t.d(a,{default:()=>r});var n=t(7154),s=t.n(n),o=t(6479),p=t.n(o),c=(t(8661),t(3905)),m={};function r(e){var a=e.components,t=p()(e,["components"]);return(0,c.kt)("wrapper",s()({},m,t,{components:a,mdxType:"MDXLayout"}),(0,c.kt)("h1",{id:"type-safety"},"Type safety"),(0,c.kt)("p",null,(0,c.kt)("em",{parentName:"p"},"Typing fields and forms with ",(0,c.kt)("inlineCode",{parentName:"em"},"Fielder"),".")),(0,c.kt)("h2",{id:"why-use-types"},"Why use types"),(0,c.kt)("p",null,"By using types with Fielder, you can:"),(0,c.kt)("ul",null,(0,c.kt)("li",{parentName:"ul"},"Enforce field value types (setters and return values)"),(0,c.kt)("li",{parentName:"ul"},"Enforce field names (prevent typos)")),(0,c.kt)("h2",{id:"basic-typing"},"Basic typing"),(0,c.kt)("p",null,"A ",(0,c.kt)("em",{parentName:"p"},"form definition")," type declares all the possible field names and their values."),(0,c.kt)("div",{className:"remark-highlight"},(0,c.kt)("pre",s()({parentName:"div"},{className:"language-ts"}),(0,c.kt)("code",s()({parentName:"pre"},{className:"language-ts"}),(0,c.kt)("span",s()({parentName:"code"},{className:"token keyword"}),"type")," ",(0,c.kt)("span",s()({parentName:"code"},{className:"token class-name"}),"MyFormState")," ",(0,c.kt)("span",s()({parentName:"code"},{className:"token operator"}),"=")," ",(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),"{"),"\n  username",(0,c.kt)("span",s()({parentName:"code"},{className:"token operator"}),":")," ",(0,c.kt)("span",s()({parentName:"code"},{className:"token builtin"}),"string"),(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),";"),"\n  password",(0,c.kt)("span",s()({parentName:"code"},{className:"token operator"}),":")," ",(0,c.kt)("span",s()({parentName:"code"},{className:"token builtin"}),"string"),(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),";"),"\n  saveCredentials",(0,c.kt)("span",s()({parentName:"code"},{className:"token operator"}),":")," ",(0,c.kt)("span",s()({parentName:"code"},{className:"token builtin"}),"boolean"),(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),";"),"\n",(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),"}"),(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),";"),"\n"))),(0,c.kt)("p",null,"Passing the ",(0,c.kt)("em",{parentName:"p"},"form defintion")," to ",(0,c.kt)("inlineCode",{parentName:"p"},"useField"),", ",(0,c.kt)("inlineCode",{parentName:"p"},"useForm"),", ",(0,c.kt)("inlineCode",{parentName:"p"},"useFormContext"),", or ",(0,c.kt)("inlineCode",{parentName:"p"},"useSubmit")," will ensure the correct types."),(0,c.kt)("div",{className:"remark-highlight"},(0,c.kt)("pre",s()({parentName:"div"},{className:"language-tsx"}),(0,c.kt)("code",s()({parentName:"pre"},{className:"language-tsx"}),(0,c.kt)("span",s()({parentName:"code"},{className:"token keyword"}),"const")," ",(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),"["),"fieldProps",(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),"]")," ",(0,c.kt)("span",s()({parentName:"code"},{className:"token operator"}),"=")," ",(0,c.kt)("span",s()({parentName:"code"},{className:"token generic-function"}),(0,c.kt)("span",s()({parentName:"span"},{className:"token function"}),"useField"),(0,c.kt)("span",s()({parentName:"span"},{className:"token generic class-name"}),(0,c.kt)("span",s()({parentName:"span"},{className:"token operator"}),"<"),"MyFormState",(0,c.kt)("span",s()({parentName:"span"},{className:"token operator"}),">"))),(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),"("),(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),"{")," name",(0,c.kt)("span",s()({parentName:"code"},{className:"token operator"}),":")," ",(0,c.kt)("span",s()({parentName:"code"},{className:"token string"}),"'password'")," ",(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),"}"),(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),")"),(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),";"),"\n"))),(0,c.kt)("h2",{id:"advanced-typing"},"Advanced typing"),(0,c.kt)("p",null,"If you prefer not to manually type every hook call, you can re-export them."),(0,c.kt)("blockquote",null,(0,c.kt)("p",{parentName:"blockquote"},"You'll want to follow this process for each form you create.")),(0,c.kt)("p",null,"Create a ",(0,c.kt)("inlineCode",{parentName:"p"},"fielder.ts")," file alongside your form's root component and copy the example below."),(0,c.kt)("div",{className:"remark-highlight"},(0,c.kt)("pre",s()({parentName:"div"},{className:"language-ts"}),(0,c.kt)("code",s()({parentName:"pre"},{className:"language-ts"}),(0,c.kt)("span",s()({parentName:"code"},{className:"token keyword"}),"import")," ",(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),"{")," typedHooks ",(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),"}")," ",(0,c.kt)("span",s()({parentName:"code"},{className:"token keyword"}),"from")," ",(0,c.kt)("span",s()({parentName:"code"},{className:"token string"}),"'fielder'"),(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),";"),"\n",(0,c.kt)("span",s()({parentName:"code"},{className:"token keyword"}),"import")," ",(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),"{")," FormType ",(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),"}")," ",(0,c.kt)("span",s()({parentName:"code"},{className:"token keyword"}),"from")," ",(0,c.kt)("span",s()({parentName:"code"},{className:"token string"}),"'./types'"),(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),";"),"\n\n",(0,c.kt)("span",s()({parentName:"code"},{className:"token keyword"}),"export")," ",(0,c.kt)("span",s()({parentName:"code"},{className:"token keyword"}),"const")," ",(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),"{")," useField",(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),",")," useForm",(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),",")," useFormContext ",(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),"}")," ",(0,c.kt)("span",s()({parentName:"code"},{className:"token operator"}),"=")," ",(0,c.kt)("span",s()({parentName:"code"},{className:"token generic-function"}),(0,c.kt)("span",s()({parentName:"span"},{className:"token function"}),"typedHooks"),(0,c.kt)("span",s()({parentName:"span"},{className:"token generic class-name"}),(0,c.kt)("span",s()({parentName:"span"},{className:"token operator"}),"<"),"FormType",(0,c.kt)("span",s()({parentName:"span"},{className:"token operator"}),">"))),(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),"("),(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),")"),(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),";"),"\n"))),(0,c.kt)("p",null,"Now when using any of the ",(0,c.kt)("em",{parentName:"p"},"Fielder")," hooks, import them from the file you just created."),(0,c.kt)("div",{className:"remark-highlight"},(0,c.kt)("pre",s()({parentName:"div"},{className:"language-tsx"}),(0,c.kt)("code",s()({parentName:"pre"},{className:"language-tsx"}),(0,c.kt)("span",s()({parentName:"code"},{className:"token keyword"}),"import")," ",(0,c.kt)("span",s()({parentName:"code"},{className:"token imports"}),(0,c.kt)("span",s()({parentName:"span"},{className:"token punctuation"}),"{")," useField ",(0,c.kt)("span",s()({parentName:"span"},{className:"token punctuation"}),"}"))," ",(0,c.kt)("span",s()({parentName:"code"},{className:"token keyword"}),"from")," ",(0,c.kt)("span",s()({parentName:"code"},{className:"token string"}),"'../fielder'"),(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),";"),"\n\n",(0,c.kt)("span",s()({parentName:"code"},{className:"token comment"}),"// ..."),"\n",(0,c.kt)("span",s()({parentName:"code"},{className:"token keyword"}),"const")," ",(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),"["),"fieldProps",(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),"]")," ",(0,c.kt)("span",s()({parentName:"code"},{className:"token operator"}),"=")," ",(0,c.kt)("span",s()({parentName:"code"},{className:"token function"}),"useField"),(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),"("),(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),"{"),"\n  name",(0,c.kt)("span",s()({parentName:"code"},{className:"token operator"}),":")," ",(0,c.kt)("span",s()({parentName:"code"},{className:"token string"}),"'invalidName'"),(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),",")," ",(0,c.kt)("span",s()({parentName:"code"},{className:"token comment"}),"// Type error!"),"\n",(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),"}"),(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),")"),(0,c.kt)("span",s()({parentName:"code"},{className:"token punctuation"}),";"),"\n"))))}r.isMDXComponent=!0}}]);