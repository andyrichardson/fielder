"use strict";(self.webpackChunkfielder_docs=self.webpackChunkfielder_docs||[]).push([[855],{5855:(e,n,a)=>{a.r(n),a.d(n,{default:()=>c});var t=a(8311);function s(e){var n=Object.assign({h1:"h1",p:"p",em:"em",code:"code",h2:"h2",ul:"ul",li:"li",div:"div",pre:"pre",span:"span",blockquote:"blockquote"},e.components);return(0,t.BX)(t.HY,{children:[(0,t.tZ)(n.h1,{id:"type-safety",children:"Type safety"}),"\n",(0,t.tZ)(n.p,{children:(0,t.BX)(n.em,{children:["Typing fields and forms with ",(0,t.tZ)(n.code,{children:"Fielder"}),"."]})}),"\n",(0,t.tZ)(n.h2,{id:"why-use-types",children:"Why use types"}),"\n",(0,t.tZ)(n.p,{children:"By using types with Fielder, you can:"}),"\n",(0,t.BX)(n.ul,{children:["\n",(0,t.tZ)(n.li,{children:"Enforce field value types (setters and return values)"}),"\n",(0,t.tZ)(n.li,{children:"Enforce field names (prevent typos)"}),"\n"]}),"\n",(0,t.tZ)(n.h2,{id:"basic-typing",children:"Basic typing"}),"\n",(0,t.BX)(n.p,{children:["A ",(0,t.tZ)(n.em,{children:"form definition"})," type declares all the possible field names and their values."]}),"\n",(0,t.tZ)(n.div,{className:"remark-highlight",children:(0,t.tZ)(n.pre,{className:"language-ts",children:(0,t.BX)(n.code,{className:"language-ts",children:[(0,t.tZ)(n.span,{className:"token keyword",children:"type"})," ",(0,t.tZ)(n.span,{className:"token class-name",children:"MyFormState"})," ",(0,t.tZ)(n.span,{className:"token operator",children:"="})," ",(0,t.tZ)(n.span,{className:"token punctuation",children:"{"}),"\n  username",(0,t.tZ)(n.span,{className:"token operator",children:":"})," ",(0,t.tZ)(n.span,{className:"token builtin",children:"string"}),(0,t.tZ)(n.span,{className:"token punctuation",children:";"}),"\n  password",(0,t.tZ)(n.span,{className:"token operator",children:":"})," ",(0,t.tZ)(n.span,{className:"token builtin",children:"string"}),(0,t.tZ)(n.span,{className:"token punctuation",children:";"}),"\n  saveCredentials",(0,t.tZ)(n.span,{className:"token operator",children:":"})," ",(0,t.tZ)(n.span,{className:"token builtin",children:"boolean"}),(0,t.tZ)(n.span,{className:"token punctuation",children:";"}),"\n",(0,t.tZ)(n.span,{className:"token punctuation",children:"}"}),(0,t.tZ)(n.span,{className:"token punctuation",children:";"}),"\n"]})})}),"\n",(0,t.BX)(n.p,{children:["Passing the ",(0,t.tZ)(n.em,{children:"form defintion"})," to ",(0,t.tZ)(n.code,{children:"useField"}),", ",(0,t.tZ)(n.code,{children:"useForm"}),", ",(0,t.tZ)(n.code,{children:"useFormContext"}),", or ",(0,t.tZ)(n.code,{children:"useSubmit"})," will ensure the correct types."]}),"\n",(0,t.tZ)(n.div,{className:"remark-highlight",children:(0,t.tZ)(n.pre,{className:"language-tsx",children:(0,t.BX)(n.code,{className:"language-tsx",children:[(0,t.tZ)(n.span,{className:"token keyword",children:"const"})," ",(0,t.tZ)(n.span,{className:"token punctuation",children:"["}),"fieldProps",(0,t.tZ)(n.span,{className:"token punctuation",children:"]"})," ",(0,t.tZ)(n.span,{className:"token operator",children:"="})," ",(0,t.BX)(n.span,{className:"token generic-function",children:[(0,t.tZ)(n.span,{className:"token function",children:"useField"}),(0,t.BX)(n.span,{className:"token generic class-name",children:[(0,t.tZ)(n.span,{className:"token operator",children:"<"}),"MyFormState",(0,t.tZ)(n.span,{className:"token operator",children:">"})]})]}),(0,t.tZ)(n.span,{className:"token punctuation",children:"("}),(0,t.tZ)(n.span,{className:"token punctuation",children:"{"})," name",(0,t.tZ)(n.span,{className:"token operator",children:":"})," ",(0,t.tZ)(n.span,{className:"token string",children:"'password'"})," ",(0,t.tZ)(n.span,{className:"token punctuation",children:"}"}),(0,t.tZ)(n.span,{className:"token punctuation",children:")"}),(0,t.tZ)(n.span,{className:"token punctuation",children:";"}),"\n"]})})}),"\n",(0,t.tZ)(n.h2,{id:"advanced-typing",children:"Advanced typing"}),"\n",(0,t.tZ)(n.p,{children:"If you prefer not to manually type every hook call, you can re-export them."}),"\n",(0,t.BX)(n.blockquote,{children:["\n",(0,t.tZ)(n.p,{children:"You'll want to follow this process for each form you create."}),"\n"]}),"\n",(0,t.BX)(n.p,{children:["Create a ",(0,t.tZ)(n.code,{children:"fielder.ts"})," file alongside your form's root component and copy the example below."]}),"\n",(0,t.tZ)(n.div,{className:"remark-highlight",children:(0,t.tZ)(n.pre,{className:"language-ts",children:(0,t.BX)(n.code,{className:"language-ts",children:[(0,t.tZ)(n.span,{className:"token keyword",children:"import"})," ",(0,t.tZ)(n.span,{className:"token punctuation",children:"{"})," typedHooks ",(0,t.tZ)(n.span,{className:"token punctuation",children:"}"})," ",(0,t.tZ)(n.span,{className:"token keyword",children:"from"})," ",(0,t.tZ)(n.span,{className:"token string",children:"'fielder'"}),(0,t.tZ)(n.span,{className:"token punctuation",children:";"}),"\n",(0,t.tZ)(n.span,{className:"token keyword",children:"import"})," ",(0,t.tZ)(n.span,{className:"token punctuation",children:"{"})," FormType ",(0,t.tZ)(n.span,{className:"token punctuation",children:"}"})," ",(0,t.tZ)(n.span,{className:"token keyword",children:"from"})," ",(0,t.tZ)(n.span,{className:"token string",children:"'./types'"}),(0,t.tZ)(n.span,{className:"token punctuation",children:";"}),"\n\n",(0,t.tZ)(n.span,{className:"token keyword",children:"export"})," ",(0,t.tZ)(n.span,{className:"token keyword",children:"const"})," ",(0,t.tZ)(n.span,{className:"token punctuation",children:"{"})," useField",(0,t.tZ)(n.span,{className:"token punctuation",children:","})," useForm",(0,t.tZ)(n.span,{className:"token punctuation",children:","})," useFormContext ",(0,t.tZ)(n.span,{className:"token punctuation",children:"}"})," ",(0,t.tZ)(n.span,{className:"token operator",children:"="})," ",(0,t.BX)(n.span,{className:"token generic-function",children:[(0,t.tZ)(n.span,{className:"token function",children:"typedHooks"}),(0,t.BX)(n.span,{className:"token generic class-name",children:[(0,t.tZ)(n.span,{className:"token operator",children:"<"}),"FormType",(0,t.tZ)(n.span,{className:"token operator",children:">"})]})]}),(0,t.tZ)(n.span,{className:"token punctuation",children:"("}),(0,t.tZ)(n.span,{className:"token punctuation",children:")"}),(0,t.tZ)(n.span,{className:"token punctuation",children:";"}),"\n"]})})}),"\n",(0,t.BX)(n.p,{children:["Now when using any of the ",(0,t.tZ)(n.em,{children:"Fielder"})," hooks, import them from the file you just created."]}),"\n",(0,t.tZ)(n.div,{className:"remark-highlight",children:(0,t.tZ)(n.pre,{className:"language-tsx",children:(0,t.BX)(n.code,{className:"language-tsx",children:[(0,t.tZ)(n.span,{className:"token keyword",children:"import"})," ",(0,t.BX)(n.span,{className:"token imports",children:[(0,t.tZ)(n.span,{className:"token punctuation",children:"{"})," useField ",(0,t.tZ)(n.span,{className:"token punctuation",children:"}"})]})," ",(0,t.tZ)(n.span,{className:"token keyword",children:"from"})," ",(0,t.tZ)(n.span,{className:"token string",children:"'../fielder'"}),(0,t.tZ)(n.span,{className:"token punctuation",children:";"}),"\n\n",(0,t.tZ)(n.span,{className:"token comment",children:"// ..."}),"\n",(0,t.tZ)(n.span,{className:"token keyword",children:"const"})," ",(0,t.tZ)(n.span,{className:"token punctuation",children:"["}),"fieldProps",(0,t.tZ)(n.span,{className:"token punctuation",children:"]"})," ",(0,t.tZ)(n.span,{className:"token operator",children:"="})," ",(0,t.tZ)(n.span,{className:"token function",children:"useField"}),(0,t.tZ)(n.span,{className:"token punctuation",children:"("}),(0,t.tZ)(n.span,{className:"token punctuation",children:"{"}),"\n  name",(0,t.tZ)(n.span,{className:"token operator",children:":"})," ",(0,t.tZ)(n.span,{className:"token string",children:"'invalidName'"}),(0,t.tZ)(n.span,{className:"token punctuation",children:","})," ",(0,t.tZ)(n.span,{className:"token comment",children:"// Type error!"}),"\n",(0,t.tZ)(n.span,{className:"token punctuation",children:"}"}),(0,t.tZ)(n.span,{className:"token punctuation",children:")"}),(0,t.tZ)(n.span,{className:"token punctuation",children:";"}),"\n"]})})})]})}const c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.components||{},a=n.wrapper;return a?(0,t.tZ)(a,Object.assign({},e,{children:(0,t.tZ)(s,e)})):s(e)}},8311:(e,n,a)=>{a.d(n,{HY:()=>t.HY,tZ:()=>c,BX:()=>c});a(8661);var t=a(6400),s=0;function c(e,n,a,c,l){var o,r,i={};for(r in n)"ref"==r?o=n[r]:i[r]=n[r];var d={type:e,props:i,key:a,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:--s,__source:l,__self:c};if("function"==typeof e&&(o=e.defaultProps))for(r in o)void 0===i[r]&&(i[r]=o[r]);return t.YM.vnode&&t.YM.vnode(d),d}}}]);