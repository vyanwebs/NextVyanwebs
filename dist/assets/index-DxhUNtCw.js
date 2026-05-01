import{R as H,r as F}from"./index-CAMSvDMY.js";var pe=e=>e.type==="checkbox",de=e=>e instanceof Date,j=e=>e==null;const bt=e=>typeof e=="object";var R=e=>!j(e)&&!Array.isArray(e)&&bt(e)&&!de(e),jt=e=>R(e)&&e.target?pe(e.target)?e.target.checked:e.target.value:e,zt=e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e,Ht=(e,t)=>e.has(zt(t)),qt=e=>{const t=e.constructor&&e.constructor.prototype;return R(t)&&t.hasOwnProperty("isPrototypeOf")},ze=typeof window<"u"&&typeof window.HTMLElement<"u"&&typeof document<"u";function M(e){let t;const r=Array.isArray(e),i=typeof FileList<"u"?e instanceof FileList:!1;if(e instanceof Date)t=new Date(e);else if(!(ze&&(e instanceof Blob||i))&&(r||R(e)))if(t=r?[]:Object.create(Object.getPrototypeOf(e)),!r&&!qt(e))t=e;else for(const l in e)e.hasOwnProperty(l)&&(t[l]=M(e[l]));else return e;return t}var Se=e=>/^\w*$/.test(e),C=e=>e===void 0,He=e=>Array.isArray(e)?e.filter(Boolean):[],qe=e=>He(e.replace(/["|']|\]/g,"").split(/\.|\[/)),g=(e,t,r)=>{if(!t||!R(e))return r;const i=(Se(t)?[t]:qe(t)).reduce((l,a)=>j(l)?l:l[a],e);return C(i)||i===e?C(e[t])?r:e[t]:i},G=e=>typeof e=="boolean",E=(e,t,r)=>{let i=-1;const l=Se(t)?[t]:qe(t),a=l.length,n=a-1;for(;++i<a;){const d=l[i];let p=r;if(i!==n){const x=e[d];p=R(x)||Array.isArray(x)?x:isNaN(+l[i+1])?{}:[]}if(d==="__proto__"||d==="constructor"||d==="prototype")return;e[d]=p,e=e[d]}};const at={BLUR:"blur",FOCUS_OUT:"focusout"},Z={onBlur:"onBlur",onChange:"onChange",onSubmit:"onSubmit",onTouched:"onTouched",all:"all"},te={max:"max",min:"min",maxLength:"maxLength",minLength:"minLength",pattern:"pattern",required:"required",validate:"validate"},Wt=H.createContext(null);Wt.displayName="HookFormContext";var Kt=(e,t,r,i=!0)=>{const l={defaultValues:t._defaultValues};for(const a in e)Object.defineProperty(l,a,{get:()=>{const n=a;return t._proxyFormState[n]!==Z.all&&(t._proxyFormState[n]=!i||Z.all),e[n]}});return l};const Yt=typeof window<"u"?H.useLayoutEffect:H.useEffect;var q=e=>typeof e=="string",Zt=(e,t,r,i,l)=>q(e)?(i&&t.watch.add(e),g(r,e,l)):Array.isArray(e)?e.map(a=>(i&&t.watch.add(a),g(r,a))):(i&&(t.watchAll=!0),r),Ue=e=>j(e)||!bt(e);function oe(e,t,r=new WeakSet){if(Ue(e)||Ue(t))return Object.is(e,t);if(de(e)&&de(t))return e.getTime()===t.getTime();const i=Object.keys(e),l=Object.keys(t);if(i.length!==l.length)return!1;if(r.has(e)||r.has(t))return!0;r.add(e),r.add(t);for(const a of i){const n=e[a];if(!l.includes(a))return!1;if(a!=="ref"){const d=t[a];if(de(n)&&de(d)||R(n)&&R(d)||Array.isArray(n)&&Array.isArray(d)?!oe(n,d,r):!Object.is(n,d))return!1}}return!0}var Qt=(e,t,r,i,l)=>t?{...r[e],types:{...r[e]&&r[e].types?r[e].types:{},[i]:l||!0}}:{},ve=e=>Array.isArray(e)?e:[e],ot=()=>{let e=[];return{get observers(){return e},next:l=>{for(const a of e)a.next&&a.next(l)},subscribe:l=>(e.push(l),{unsubscribe:()=>{e=e.filter(a=>a!==l)}}),unsubscribe:()=>{e=[]}}};function pt(e,t){const r={};for(const i in e)if(e.hasOwnProperty(i)){const l=e[i],a=t[i];if(l&&R(l)&&a){const n=pt(l,a);R(n)&&(r[i]=n)}else e[i]&&(r[i]=a)}return r}var U=e=>R(e)&&!Object.keys(e).length,We=e=>e.type==="file",Q=e=>typeof e=="function",ke=e=>{if(!ze)return!1;const t=e?e.ownerDocument:0;return e instanceof(t&&t.defaultView?t.defaultView.HTMLElement:HTMLElement)},xt=e=>e.type==="select-multiple",Ke=e=>e.type==="radio",Jt=e=>Ke(e)||pe(e),Pe=e=>ke(e)&&e.isConnected;function Xt(e,t){const r=t.slice(0,-1).length;let i=0;for(;i<r;)e=C(e)?i++:e[t[i++]];return e}function Gt(e){for(const t in e)if(e.hasOwnProperty(t)&&!C(e[t]))return!1;return!0}function L(e,t){const r=Array.isArray(t)?t:Se(t)?[t]:qe(t),i=r.length===1?e:Xt(e,r),l=r.length-1,a=r[l];return i&&delete i[a],l!==0&&(R(i)&&U(i)||Array.isArray(i)&&Gt(i))&&L(e,r.slice(0,-1)),e}var er=e=>{for(const t in e)if(Q(e[t]))return!0;return!1};function _t(e){return Array.isArray(e)||R(e)&&!er(e)}function $e(e,t={}){for(const r in e){const i=e[r];_t(i)?(t[r]=Array.isArray(i)?[]:{},$e(i,t[r])):C(i)||(t[r]=!0)}return t}function ye(e,t,r){r||(r=$e(t));for(const i in e){const l=e[i];if(_t(l))C(t)||Ue(r[i])?r[i]=$e(l,Array.isArray(l)?[]:{}):ye(l,j(t)?{}:t[i],r[i]);else{const a=t[i];r[i]=!oe(l,a)}}return r}const nt={value:!1,isValid:!1},lt={value:!0,isValid:!0};var wt=e=>{if(Array.isArray(e)){if(e.length>1){const t=e.filter(r=>r&&r.checked&&!r.disabled).map(r=>r.value);return{value:t,isValid:!!t.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!C(e[0].attributes.value)?C(e[0].value)||e[0].value===""?lt:{value:e[0].value,isValid:!0}:lt:nt}return nt},Ft=(e,{valueAsNumber:t,valueAsDate:r,setValueAs:i})=>C(e)?e:t?e===""?NaN:e&&+e:r&&q(e)?new Date(e):i?i(e):e;const ut={isValid:!1,value:null};var Vt=e=>Array.isArray(e)?e.reduce((t,r)=>r&&r.checked&&!r.disabled?{isValid:!0,value:r.value}:t,ut):ut;function dt(e){const t=e.ref;return We(t)?t.files:Ke(t)?Vt(e.refs).value:xt(t)?[...t.selectedOptions].map(({value:r})=>r):pe(t)?wt(e.refs).value:Ft(C(t.value)?e.ref.value:t.value,e)}var tr=(e,t,r,i)=>{const l={};for(const a of e){const n=g(t,a);n&&E(l,a,n._f)}return{criteriaMode:r,names:[...e],fields:l,shouldUseNativeValidation:i}},Ee=e=>e instanceof RegExp,me=e=>C(e)?e:Ee(e)?e.source:R(e)?Ee(e.value)?e.value.source:e.value:e,ct=e=>({isOnSubmit:!e||e===Z.onSubmit,isOnBlur:e===Z.onBlur,isOnChange:e===Z.onChange,isOnAll:e===Z.all,isOnTouch:e===Z.onTouched});const ft="AsyncFunction";var rr=e=>!!e&&!!e.validate&&!!(Q(e.validate)&&e.validate.constructor.name===ft||R(e.validate)&&Object.values(e.validate).find(t=>t.constructor.name===ft)),sr=e=>e.mount&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate),yt=(e,t,r)=>!r&&(t.watchAll||t.watch.has(e)||[...t.watch].some(i=>e.startsWith(i)&&/^\.\w+/.test(e.slice(i.length))));const be=(e,t,r,i)=>{for(const l of r||Object.keys(e)){const a=g(e,l);if(a){const{_f:n,...d}=a;if(n){if(n.refs&&n.refs[0]&&t(n.refs[0],l)&&!i)return!0;if(n.ref&&t(n.ref,n.name)&&!i)return!0;if(be(d,t))break}else if(R(d)&&be(d,t))break}}};function gt(e,t,r){const i=g(e,r);if(i||Se(r))return{error:i,name:r};const l=r.split(".");for(;l.length;){const a=l.join("."),n=g(t,a),d=g(e,a);if(n&&!Array.isArray(n)&&r!==a)return{name:r};if(d&&d.type)return{name:a,error:d};if(d&&d.root&&d.root.type)return{name:`${a}.root`,error:d.root};l.pop()}return{name:r}}var ir=(e,t,r,i)=>{r(e);const{name:l,...a}=e;return U(a)||Object.keys(a).length>=Object.keys(t).length||Object.keys(a).find(n=>t[n]===(!i||Z.all))},ar=(e,t,r)=>!e||!t||e===t||ve(e).some(i=>i&&(r?i===t:i.startsWith(t)||t.startsWith(i))),or=(e,t,r,i,l)=>l.isOnAll?!1:!r&&l.isOnTouch?!(t||e):(r?i.isOnBlur:l.isOnBlur)?!e:(r?i.isOnChange:l.isOnChange)?e:!0,nr=(e,t)=>!He(g(e,t)).length&&L(e,t),lr=(e,t,r)=>{const i=ve(g(e,r));return E(i,"root",t[r]),E(e,r,i),e};function ht(e,t,r="validate"){if(q(e)||Array.isArray(e)&&e.every(q)||G(e)&&!e)return{type:r,message:q(e)?e:"",ref:t}}var fe=e=>R(e)&&!Ee(e)?e:{value:e,message:""},mt=async(e,t,r,i,l,a)=>{const{ref:n,refs:d,required:p,maxLength:x,minLength:v,min:b,max:h,pattern:D,validate:z,name:S,valueAsNumber:W,mount:ge}=e._f,_=g(r,S);if(!ge||t.has(S))return{};const T=d?d[0]:n,$=w=>{l&&T.reportValidity&&(T.setCustomValidity(G(w)?"":w||""),T.reportValidity())},I={},_e=Ke(n),ie=pe(n),Te=_e||ie,Y=(W||We(n))&&C(n.value)&&C(_)||ke(n)&&n.value===""||_===""||Array.isArray(_)&&!_.length,ue=Qt.bind(null,S,i,I),J=(w,A,O,P=te.maxLength,B=te.minLength)=>{const X=w?A:O;I[S]={type:w?P:B,message:X,ref:n,...ue(w?P:B,X)}};if(a?!Array.isArray(_)||!_.length:p&&(!Te&&(Y||j(_))||G(_)&&!_||ie&&!wt(d).isValid||_e&&!Vt(d).isValid)){const{value:w,message:A}=q(p)?{value:!!p,message:p}:fe(p);if(w&&(I[S]={type:te.required,message:A,ref:T,...ue(te.required,A)},!i))return $(A),I}if(!Y&&(!j(b)||!j(h))){let w,A;const O=fe(h),P=fe(b);if(!j(_)&&!isNaN(_)){const B=n.valueAsNumber||_&&+_;j(O.value)||(w=B>O.value),j(P.value)||(A=B<P.value)}else{const B=n.valueAsDate||new Date(_),X=we=>new Date(new Date().toDateString()+" "+we),he=n.type=="time",ce=n.type=="week";q(O.value)&&_&&(w=he?X(_)>X(O.value):ce?_>O.value:B>new Date(O.value)),q(P.value)&&_&&(A=he?X(_)<X(P.value):ce?_<P.value:B<new Date(P.value))}if((w||A)&&(J(!!w,O.message,P.message,te.max,te.min),!i))return $(I[S].message),I}if((x||v)&&!Y&&(q(_)||a&&Array.isArray(_))){const w=fe(x),A=fe(v),O=!j(w.value)&&_.length>+w.value,P=!j(A.value)&&_.length<+A.value;if((O||P)&&(J(O,w.message,A.message),!i))return $(I[S].message),I}if(D&&!Y&&q(_)){const{value:w,message:A}=fe(D);if(Ee(w)&&!_.match(w)&&(I[S]={type:te.pattern,message:A,ref:n,...ue(te.pattern,A)},!i))return $(A),I}if(z){if(Q(z)){const w=await z(_,r),A=ht(w,T);if(A&&(I[S]={...A,...ue(te.validate,A.message)},!i))return $(A.message),I}else if(R(z)){let w={};for(const A in z){if(!U(w)&&!i)break;const O=ht(await z[A](_,r),T,A);O&&(w={...O,...ue(A,O.message)},$(O.message),i&&(I[S]=w))}if(!U(w)&&(I[S]={ref:T,...w},!i))return I}}return $(!0),I};const ur={mode:Z.onSubmit,reValidateMode:Z.onChange,shouldFocusError:!0};function dr(e={}){let t={...ur,...e},r={submitCount:0,isDirty:!1,isReady:!1,isLoading:Q(t.defaultValues),isValidating:!1,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,touchedFields:{},dirtyFields:{},validatingFields:{},errors:t.errors||{},disabled:t.disabled||!1},i={},l=R(t.defaultValues)||R(t.values)?M(t.defaultValues||t.values)||{}:{},a=t.shouldUnregister?{}:M(l),n={action:!1,mount:!1,watch:!1},d={mount:new Set,disabled:new Set,unMount:new Set,array:new Set,watch:new Set},p,x=0;const v={isDirty:!1,dirtyFields:!1,validatingFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1};let b={...v};const h={array:ot(),state:ot()},D=t.criteriaMode===Z.all,z=s=>o=>{clearTimeout(x),x=setTimeout(s,o)},S=async s=>{if(!t.disabled&&(v.isValid||b.isValid||s)){const o=t.resolver?U((await ie()).errors):await Y(i,!0);o!==r.isValid&&h.state.next({isValid:o})}},W=(s,o)=>{!t.disabled&&(v.isValidating||v.validatingFields||b.isValidating||b.validatingFields)&&((s||Array.from(d.mount)).forEach(u=>{u&&(o?E(r.validatingFields,u,o):L(r.validatingFields,u))}),h.state.next({validatingFields:r.validatingFields,isValidating:!U(r.validatingFields)}))},ge=(s,o=[],u,y,f=!0,c=!0)=>{if(y&&u&&!t.disabled){if(n.action=!0,c&&Array.isArray(g(i,s))){const m=u(g(i,s),y.argA,y.argB);f&&E(i,s,m)}if(c&&Array.isArray(g(r.errors,s))){const m=u(g(r.errors,s),y.argA,y.argB);f&&E(r.errors,s,m),nr(r.errors,s)}if((v.touchedFields||b.touchedFields)&&c&&Array.isArray(g(r.touchedFields,s))){const m=u(g(r.touchedFields,s),y.argA,y.argB);f&&E(r.touchedFields,s,m)}(v.dirtyFields||b.dirtyFields)&&(r.dirtyFields=ye(l,a)),h.state.next({name:s,isDirty:J(s,o),dirtyFields:r.dirtyFields,errors:r.errors,isValid:r.isValid})}else E(a,s,o)},_=(s,o)=>{E(r.errors,s,o),h.state.next({errors:r.errors})},T=s=>{r.errors=s,h.state.next({errors:r.errors,isValid:!1})},$=(s,o,u,y)=>{const f=g(i,s);if(f){const c=g(a,s,C(u)?g(l,s):u);C(c)||y&&y.defaultChecked||o?E(a,s,o?c:dt(f._f)):O(s,c),n.mount&&!n.action&&S()}},I=(s,o,u,y,f)=>{let c=!1,m=!1;const V={name:s};if(!t.disabled){if(!u||y){(v.isDirty||b.isDirty)&&(m=r.isDirty,r.isDirty=V.isDirty=J(),c=m!==V.isDirty);const k=oe(g(l,s),o);m=!!g(r.dirtyFields,s),k?L(r.dirtyFields,s):E(r.dirtyFields,s,!0),V.dirtyFields=r.dirtyFields,c=c||(v.dirtyFields||b.dirtyFields)&&m!==!k}if(u){const k=g(r.touchedFields,s);k||(E(r.touchedFields,s,u),V.touchedFields=r.touchedFields,c=c||(v.touchedFields||b.touchedFields)&&k!==u)}c&&f&&h.state.next(V)}return c?V:{}},_e=(s,o,u,y)=>{const f=g(r.errors,s),c=(v.isValid||b.isValid)&&G(o)&&r.isValid!==o;if(t.delayError&&u?(p=z(()=>_(s,u)),p(t.delayError)):(clearTimeout(x),p=null,u?E(r.errors,s,u):L(r.errors,s)),(u?!oe(f,u):f)||!U(y)||c){const m={...y,...c&&G(o)?{isValid:o}:{},errors:r.errors,name:s};r={...r,...m},h.state.next(m)}},ie=async s=>{W(s,!0);const o=await t.resolver(a,t.context,tr(s||d.mount,i,t.criteriaMode,t.shouldUseNativeValidation));return W(s),o},Te=async s=>{const{errors:o}=await ie(s);if(s)for(const u of s){const y=g(o,u);y?E(r.errors,u,y):L(r.errors,u)}else r.errors=o;return o},Y=async(s,o,u={valid:!0})=>{for(const y in s){const f=s[y];if(f){const{_f:c,...m}=f;if(c){const V=d.array.has(c.name),k=f._f&&rr(f._f);k&&v.validatingFields&&W([c.name],!0);const K=await mt(f,d.disabled,a,D,t.shouldUseNativeValidation&&!o,V);if(k&&v.validatingFields&&W([c.name]),K[c.name]&&(u.valid=!1,o))break;!o&&(g(K,c.name)?V?lr(r.errors,K,c.name):E(r.errors,c.name,K[c.name]):L(r.errors,c.name))}!U(m)&&await Y(m,o,u)}}return u.valid},ue=()=>{for(const s of d.unMount){const o=g(i,s);o&&(o._f.refs?o._f.refs.every(u=>!Pe(u)):!Pe(o._f.ref))&&Le(s)}d.unMount=new Set},J=(s,o)=>!t.disabled&&(s&&o&&E(a,s,o),!oe(we(),l)),w=(s,o,u)=>Zt(s,d,{...n.mount?a:C(o)?l:q(s)?{[s]:o}:o},u,o),A=s=>He(g(n.mount?a:l,s,t.shouldUnregister?g(l,s,[]):[])),O=(s,o,u={})=>{const y=g(i,s);let f=o;if(y){const c=y._f;c&&(!c.disabled&&E(a,s,Ft(o,c)),f=ke(c.ref)&&j(o)?"":o,xt(c.ref)?[...c.ref.options].forEach(m=>m.selected=f.includes(m.value)):c.refs?pe(c.ref)?c.refs.forEach(m=>{(!m.defaultChecked||!m.disabled)&&(Array.isArray(f)?m.checked=!!f.find(V=>V===m.value):m.checked=f===m.value||!!f)}):c.refs.forEach(m=>m.checked=m.value===f):We(c.ref)?c.ref.value="":(c.ref.value=f,c.ref.type||h.state.next({name:s,values:M(a)})))}(u.shouldDirty||u.shouldTouch)&&I(s,f,u.shouldTouch,u.shouldDirty,!0),u.shouldValidate&&ce(s)},P=(s,o,u)=>{for(const y in o){if(!o.hasOwnProperty(y))return;const f=o[y],c=s+"."+y,m=g(i,c);(d.array.has(s)||R(f)||m&&!m._f)&&!de(f)?P(c,f,u):O(c,f,u)}},B=(s,o,u={})=>{const y=g(i,s),f=d.array.has(s),c=M(o);E(a,s,c),f?(h.array.next({name:s,values:M(a)}),(v.isDirty||v.dirtyFields||b.isDirty||b.dirtyFields)&&u.shouldDirty&&h.state.next({name:s,dirtyFields:ye(l,a),isDirty:J(s,c)})):y&&!y._f&&!j(c)?P(s,c,u):O(s,c,u),yt(s,d)&&h.state.next({...r,name:s}),h.state.next({name:n.mount?s:void 0,values:M(a)})},X=async s=>{n.mount=!0;const o=s.target;let u=o.name,y=!0;const f=g(i,u),c=k=>{y=Number.isNaN(k)||de(k)&&isNaN(k.getTime())||oe(k,g(a,u,k))},m=ct(t.mode),V=ct(t.reValidateMode);if(f){let k,K;const Fe=o.type?dt(f._f):jt(s),ae=s.type===at.BLUR||s.type===at.FOCUS_OUT,Ut=!sr(f._f)&&!t.resolver&&!g(r.errors,u)&&!f._f.deps||or(ae,g(r.touchedFields,u),r.isSubmitted,V,m),Ne=yt(u,d,ae);E(a,u,Fe),ae?(!o||!o.readOnly)&&(f._f.onBlur&&f._f.onBlur(s),p&&p(0)):f._f.onChange&&f._f.onChange(s);const Me=I(u,Fe,ae),$t=!U(Me)||Ne;if(!ae&&h.state.next({name:u,type:s.type,values:M(a)}),Ut)return(v.isValid||b.isValid)&&(t.mode==="onBlur"?ae&&S():ae||S()),$t&&h.state.next({name:u,...Ne?{}:Me});if(!ae&&Ne&&h.state.next({...r}),t.resolver){const{errors:st}=await ie([u]);if(c(Fe),y){const Bt=gt(r.errors,i,u),it=gt(st,i,Bt.name||u);k=it.error,u=it.name,K=U(st)}}else W([u],!0),k=(await mt(f,d.disabled,a,D,t.shouldUseNativeValidation))[u],W([u]),c(Fe),y&&(k?K=!1:(v.isValid||b.isValid)&&(K=await Y(i,!0)));y&&(f._f.deps&&(!Array.isArray(f._f.deps)||f._f.deps.length>0)&&ce(f._f.deps),_e(u,K,k,Me))}},he=(s,o)=>{if(g(r.errors,o)&&s.focus)return s.focus(),1},ce=async(s,o={})=>{let u,y;const f=ve(s);if(t.resolver){const c=await Te(C(s)?s:f);u=U(c),y=s?!f.some(m=>g(c,m)):u}else s?(y=(await Promise.all(f.map(async c=>{const m=g(i,c);return await Y(m&&m._f?{[c]:m}:m)}))).every(Boolean),!(!y&&!r.isValid)&&S()):y=u=await Y(i);return h.state.next({...!q(s)||(v.isValid||b.isValid)&&u!==r.isValid?{}:{name:s},...t.resolver||!s?{isValid:u}:{},errors:r.errors}),o.shouldFocus&&!y&&be(i,he,s?f:d.mount),y},we=(s,o)=>{let u={...n.mount?a:l};return o&&(u=pt(o.dirtyFields?r.dirtyFields:r.touchedFields,u)),C(s)?u:q(s)?g(u,s):s.map(y=>g(u,y))},Ze=(s,o)=>({invalid:!!g((o||r).errors,s),isDirty:!!g((o||r).dirtyFields,s),error:g((o||r).errors,s),isValidating:!!g(r.validatingFields,s),isTouched:!!g((o||r).touchedFields,s)}),Tt=s=>{s&&ve(s).forEach(o=>L(r.errors,o)),h.state.next({errors:s?r.errors:{}})},Qe=(s,o,u)=>{const y=(g(i,s,{_f:{}})._f||{}).ref,f=g(r.errors,s)||{},{ref:c,message:m,type:V,...k}=f;E(r.errors,s,{...k,...o,ref:y}),h.state.next({name:s,errors:r.errors,isValid:!1}),u&&u.shouldFocus&&y&&y.focus&&y.focus()},Lt=(s,o)=>Q(s)?h.state.subscribe({next:u=>"values"in u&&s(w(void 0,o),u)}):w(s,o,!0),Je=s=>h.state.subscribe({next:o=>{ar(s.name,o.name,s.exact)&&ir(o,s.formState||v,Pt,s.reRenderRoot)&&s.callback({values:{...a},...r,...o,defaultValues:l})}}).unsubscribe,Rt=s=>(n.mount=!0,b={...b,...s.formState},Je({...s,formState:b})),Le=(s,o={})=>{for(const u of s?ve(s):d.mount)d.mount.delete(u),d.array.delete(u),o.keepValue||(L(i,u),L(a,u)),!o.keepError&&L(r.errors,u),!o.keepDirty&&L(r.dirtyFields,u),!o.keepTouched&&L(r.touchedFields,u),!o.keepIsValidating&&L(r.validatingFields,u),!t.shouldUnregister&&!o.keepDefaultValue&&L(l,u);h.state.next({values:M(a)}),h.state.next({...r,...o.keepDirty?{isDirty:J()}:{}}),!o.keepIsValid&&S()},Xe=({disabled:s,name:o})=>{(G(s)&&n.mount||s||d.disabled.has(o))&&(s?d.disabled.add(o):d.disabled.delete(o))},Re=(s,o={})=>{let u=g(i,s);const y=G(o.disabled)||G(t.disabled);return E(i,s,{...u||{},_f:{...u&&u._f?u._f:{ref:{name:s}},name:s,mount:!0,...o}}),d.mount.add(s),u?Xe({disabled:G(o.disabled)?o.disabled:t.disabled,name:s}):$(s,!0,o.value),{...y?{disabled:o.disabled||t.disabled}:{},...t.progressive?{required:!!o.required,min:me(o.min),max:me(o.max),minLength:me(o.minLength),maxLength:me(o.maxLength),pattern:me(o.pattern)}:{},name:s,onChange:X,onBlur:X,ref:f=>{if(f){Re(s,o),u=g(i,s);const c=C(f.value)&&f.querySelectorAll&&f.querySelectorAll("input,select,textarea")[0]||f,m=Jt(c),V=u._f.refs||[];if(m?V.find(k=>k===c):c===u._f.ref)return;E(i,s,{_f:{...u._f,...m?{refs:[...V.filter(Pe),c,...Array.isArray(g(l,s))?[{}]:[]],ref:{type:c.type,name:s}}:{ref:c}}}),$(s,!1,void 0,c)}else u=g(i,s,{}),u._f&&(u._f.mount=!1),(t.shouldUnregister||o.shouldUnregister)&&!(Ht(d.array,s)&&n.action)&&d.unMount.add(s)}}},Ie=()=>t.shouldFocusError&&be(i,he,d.mount),It=s=>{G(s)&&(h.state.next({disabled:s}),be(i,(o,u)=>{const y=g(i,u);y&&(o.disabled=y._f.disabled||s,Array.isArray(y._f.refs)&&y._f.refs.forEach(f=>{f.disabled=y._f.disabled||s}))},0,!1))},Ge=(s,o)=>async u=>{let y;u&&(u.preventDefault&&u.preventDefault(),u.persist&&u.persist());let f=M(a);if(h.state.next({isSubmitting:!0}),t.resolver){const{errors:c,values:m}=await ie();r.errors=c,f=M(m)}else await Y(i);if(d.disabled.size)for(const c of d.disabled)L(f,c);if(L(r.errors,"root"),U(r.errors)){h.state.next({errors:{}});try{await s(f,u)}catch(c){y=c}}else o&&await o({...r.errors},u),Ie(),setTimeout(Ie);if(h.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:U(r.errors)&&!y,submitCount:r.submitCount+1,errors:r.errors}),y)throw y},Nt=(s,o={})=>{g(i,s)&&(C(o.defaultValue)?B(s,M(g(l,s))):(B(s,o.defaultValue),E(l,s,M(o.defaultValue))),o.keepTouched||L(r.touchedFields,s),o.keepDirty||(L(r.dirtyFields,s),r.isDirty=o.defaultValue?J(s,M(g(l,s))):J()),o.keepError||(L(r.errors,s),v.isValid&&S()),h.state.next({...r}))},et=(s,o={})=>{const u=s?M(s):l,y=M(u),f=U(s),c=f?l:y;if(o.keepDefaultValues||(l=u),!o.keepValues){if(o.keepDirtyValues){const m=new Set([...d.mount,...Object.keys(ye(l,a))]);for(const V of Array.from(m))g(r.dirtyFields,V)?E(c,V,g(a,V)):B(V,g(c,V))}else{if(ze&&C(s))for(const m of d.mount){const V=g(i,m);if(V&&V._f){const k=Array.isArray(V._f.refs)?V._f.refs[0]:V._f.ref;if(ke(k)){const K=k.closest("form");if(K){K.reset();break}}}}if(o.keepFieldsRef)for(const m of d.mount)B(m,g(c,m));else i={}}a=t.shouldUnregister?o.keepDefaultValues?M(l):{}:M(c),h.array.next({values:{...c}}),h.state.next({values:{...c}})}d={mount:o.keepDirtyValues?d.mount:new Set,unMount:new Set,array:new Set,disabled:new Set,watch:new Set,watchAll:!1,focus:""},n.mount=!v.isValid||!!o.keepIsValid||!!o.keepDirtyValues||!t.shouldUnregister&&!U(c),n.watch=!!t.shouldUnregister,h.state.next({submitCount:o.keepSubmitCount?r.submitCount:0,isDirty:f?!1:o.keepDirty?r.isDirty:!!(o.keepDefaultValues&&!oe(s,l)),isSubmitted:o.keepIsSubmitted?r.isSubmitted:!1,dirtyFields:f?{}:o.keepDirtyValues?o.keepDefaultValues&&a?ye(l,a):r.dirtyFields:o.keepDefaultValues&&s?ye(l,s):o.keepDirty?r.dirtyFields:{},touchedFields:o.keepTouched?r.touchedFields:{},errors:o.keepErrors?r.errors:{},isSubmitSuccessful:o.keepIsSubmitSuccessful?r.isSubmitSuccessful:!1,isSubmitting:!1,defaultValues:l})},tt=(s,o)=>et(Q(s)?s(a):s,o),Mt=(s,o={})=>{const u=g(i,s),y=u&&u._f;if(y){const f=y.refs?y.refs[0]:y.ref;f.focus&&(f.focus(),o.shouldSelect&&Q(f.select)&&f.select())}},Pt=s=>{r={...r,...s}},rt={control:{register:Re,unregister:Le,getFieldState:Ze,handleSubmit:Ge,setError:Qe,_subscribe:Je,_runSchema:ie,_focusError:Ie,_getWatch:w,_getDirty:J,_setValid:S,_setFieldArray:ge,_setDisabledField:Xe,_setErrors:T,_getFieldArray:A,_reset:et,_resetDefaultValues:()=>Q(t.defaultValues)&&t.defaultValues().then(s=>{tt(s,t.resetOptions),h.state.next({isLoading:!1})}),_removeUnmounted:ue,_disableForm:It,_subjects:h,_proxyFormState:v,get _fields(){return i},get _formValues(){return a},get _state(){return n},set _state(s){n=s},get _defaultValues(){return l},get _names(){return d},set _names(s){d=s},get _formState(){return r},get _options(){return t},set _options(s){t={...t,...s}}},subscribe:Rt,trigger:ce,register:Re,handleSubmit:Ge,watch:Lt,setValue:B,getValues:we,reset:tt,resetField:Nt,clearErrors:Tt,unregister:Le,setError:Qe,setFocus:Mt,getFieldState:Ze};return{...rt,formControl:rt}}function es(e={}){const t=H.useRef(void 0),r=H.useRef(void 0),[i,l]=H.useState({isDirty:!1,isValidating:!1,isLoading:Q(e.defaultValues),isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,submitCount:0,dirtyFields:{},touchedFields:{},validatingFields:{},errors:e.errors||{},disabled:e.disabled||!1,isReady:!1,defaultValues:Q(e.defaultValues)?void 0:e.defaultValues});if(!t.current)if(e.formControl)t.current={...e.formControl,formState:i},e.defaultValues&&!Q(e.defaultValues)&&e.formControl.reset(e.defaultValues,e.resetOptions);else{const{formControl:n,...d}=dr(e);t.current={...d,formState:i}}const a=t.current.control;return a._options=e,Yt(()=>{const n=a._subscribe({formState:a._proxyFormState,callback:()=>l({...a._formState}),reRenderRoot:!0});return l(d=>({...d,isReady:!0})),a._formState.isReady=!0,n},[a]),H.useEffect(()=>a._disableForm(e.disabled),[a,e.disabled]),H.useEffect(()=>{e.mode&&(a._options.mode=e.mode),e.reValidateMode&&(a._options.reValidateMode=e.reValidateMode)},[a,e.mode,e.reValidateMode]),H.useEffect(()=>{e.errors&&(a._setErrors(e.errors),a._focusError())},[a,e.errors]),H.useEffect(()=>{e.shouldUnregister&&a._subjects.state.next({values:a._getWatch()})},[a,e.shouldUnregister]),H.useEffect(()=>{if(a._proxyFormState.isDirty){const n=a._getDirty();n!==i.isDirty&&a._subjects.state.next({isDirty:n})}},[a,i.isDirty]),H.useEffect(()=>{var n;e.values&&!oe(e.values,r.current)?(a._reset(e.values,{keepFieldsRef:!0,...a._options.resetOptions}),!((n=a._options.resetOptions)===null||n===void 0)&&n.keepIsValid||a._setValid(),r.current=e.values,l(d=>({...d}))):a._resetDefaultValues()},[a,e.values]),H.useEffect(()=>{a._state.mount||(a._setValid(),a._state.mount=!0),a._state.watch&&(a._state.watch=!1,a._subjects.state.next({...a._formState})),a._removeUnmounted()}),t.current.formState=Kt(i,a),t.current}let cr={data:""},fr=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||cr},yr=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,gr=/\/\*[^]*?\*\/|  +/g,vt=/\n+/g,ne=(e,t)=>{let r="",i="",l="";for(let a in e){let n=e[a];a[0]=="@"?a[1]=="i"?r=a+" "+n+";":i+=a[1]=="f"?ne(n,a):a+"{"+ne(n,a[1]=="k"?"":t)+"}":typeof n=="object"?i+=ne(n,t?t.replace(/([^,])+/g,d=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,p=>/&/.test(p)?p.replace(/&/g,d):d?d+" "+p:p)):a):n!=null&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),l+=ne.p?ne.p(a,n):a+":"+n+";")}return r+(t&&l?t+"{"+l+"}":l)+i},re={},At=e=>{if(typeof e=="object"){let t="";for(let r in e)t+=r+At(e[r]);return t}return e},hr=(e,t,r,i,l)=>{let a=At(e),n=re[a]||(re[a]=(p=>{let x=0,v=11;for(;x<p.length;)v=101*v+p.charCodeAt(x++)>>>0;return"go"+v})(a));if(!re[n]){let p=a!==e?e:(x=>{let v,b,h=[{}];for(;v=yr.exec(x.replace(gr,""));)v[4]?h.shift():v[3]?(b=v[3].replace(vt," ").trim(),h.unshift(h[0][b]=h[0][b]||{})):h[0][v[1]]=v[2].replace(vt," ").trim();return h[0]})(e);re[n]=ne(l?{["@keyframes "+n]:p}:p,r?"":"."+n)}let d=r&&re.g?re.g:null;return r&&(re.g=re[n]),((p,x,v,b)=>{b?x.data=x.data.replace(b,p):x.data.indexOf(p)===-1&&(x.data=v?p+x.data:x.data+p)})(re[n],t,i,d),n},mr=(e,t,r)=>e.reduce((i,l,a)=>{let n=t[a];if(n&&n.call){let d=n(r),p=d&&d.props&&d.props.className||/^go/.test(d)&&d;n=p?"."+p:d&&typeof d=="object"?d.props?"":ne(d,""):d===!1?"":d}return i+l+(n??"")},"");function Oe(e){let t=this||{},r=e.call?e(t.p):e;return hr(r.unshift?r.raw?mr(r,[].slice.call(arguments,1),t.p):r.reduce((i,l)=>Object.assign(i,l&&l.call?l(t.p):l),{}):r,fr(t.target),t.g,t.o,t.k)}let kt,Be,je;Oe.bind({g:1});let se=Oe.bind({k:1});function vr(e,t,r,i){ne.p=t,kt=e,Be=r,je=i}function le(e,t){let r=this||{};return function(){let i=arguments;function l(a,n){let d=Object.assign({},a),p=d.className||l.className;r.p=Object.assign({theme:Be&&Be()},d),r.o=/ *go\d+/.test(p),d.className=Oe.apply(r,i)+(p?" "+p:"");let x=e;return e[0]&&(x=d.as||e,delete d.as),je&&x[0]&&je(d),kt(x,d)}return t?t(l):l}}var br=e=>typeof e=="function",De=(e,t)=>br(e)?e(t):e,pr=(()=>{let e=0;return()=>(++e).toString()})(),Et=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),xr=20,Ye="default",Dt=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(n=>n.id===t.toast.id?{...n,...t.toast}:n)};case 2:let{toast:i}=t;return Dt(e,{type:e.toasts.find(n=>n.id===i.id)?1:0,toast:i});case 3:let{toastId:l}=t;return{...e,toasts:e.toasts.map(n=>n.id===l||l===void 0?{...n,dismissed:!0,visible:!1}:n)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(n=>n.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(n=>({...n,pauseDuration:n.pauseDuration+a}))}}},Ae=[],St={toasts:[],pausedAt:void 0,settings:{toastLimit:xr}},ee={},Ot=(e,t=Ye)=>{ee[t]=Dt(ee[t]||St,e),Ae.forEach(([r,i])=>{r===t&&i(ee[t])})},Ct=e=>Object.keys(ee).forEach(t=>Ot(e,t)),_r=e=>Object.keys(ee).find(t=>ee[t].toasts.some(r=>r.id===e)),Ce=(e=Ye)=>t=>{Ot(t,e)},wr={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},Fr=(e={},t=Ye)=>{let[r,i]=F.useState(ee[t]||St),l=F.useRef(ee[t]);F.useEffect(()=>(l.current!==ee[t]&&i(ee[t]),Ae.push([t,i]),()=>{let n=Ae.findIndex(([d])=>d===t);n>-1&&Ae.splice(n,1)}),[t]);let a=r.toasts.map(n=>{var d,p,x;return{...e,...e[n.type],...n,removeDelay:n.removeDelay||((d=e[n.type])==null?void 0:d.removeDelay)||e?.removeDelay,duration:n.duration||((p=e[n.type])==null?void 0:p.duration)||e?.duration||wr[n.type],style:{...e.style,...(x=e[n.type])==null?void 0:x.style,...n.style}}});return{...r,toasts:a}},Vr=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:r?.id||pr()}),xe=e=>(t,r)=>{let i=Vr(t,e,r);return Ce(i.toasterId||_r(i.id))({type:2,toast:i}),i.id},N=(e,t)=>xe("blank")(e,t);N.error=xe("error");N.success=xe("success");N.loading=xe("loading");N.custom=xe("custom");N.dismiss=(e,t)=>{let r={type:3,toastId:e};t?Ce(t)(r):Ct(r)};N.dismissAll=e=>N.dismiss(void 0,e);N.remove=(e,t)=>{let r={type:4,toastId:e};t?Ce(t)(r):Ct(r)};N.removeAll=e=>N.remove(void 0,e);N.promise=(e,t,r)=>{let i=N.loading(t.loading,{...r,...r?.loading});return typeof e=="function"&&(e=e()),e.then(l=>{let a=t.success?De(t.success,l):void 0;return a?N.success(a,{id:i,...r,...r?.success}):N.dismiss(i),l}).catch(l=>{let a=t.error?De(t.error,l):void 0;a?N.error(a,{id:i,...r,...r?.error}):N.dismiss(i)}),e};var Ar=1e3,kr=(e,t="default")=>{let{toasts:r,pausedAt:i}=Fr(e,t),l=F.useRef(new Map).current,a=F.useCallback((b,h=Ar)=>{if(l.has(b))return;let D=setTimeout(()=>{l.delete(b),n({type:4,toastId:b})},h);l.set(b,D)},[]);F.useEffect(()=>{if(i)return;let b=Date.now(),h=r.map(D=>{if(D.duration===1/0)return;let z=(D.duration||0)+D.pauseDuration-(b-D.createdAt);if(z<0){D.visible&&N.dismiss(D.id);return}return setTimeout(()=>N.dismiss(D.id,t),z)});return()=>{h.forEach(D=>D&&clearTimeout(D))}},[r,i,t]);let n=F.useCallback(Ce(t),[t]),d=F.useCallback(()=>{n({type:5,time:Date.now()})},[n]),p=F.useCallback((b,h)=>{n({type:1,toast:{id:b,height:h}})},[n]),x=F.useCallback(()=>{i&&n({type:6,time:Date.now()})},[i,n]),v=F.useCallback((b,h)=>{let{reverseOrder:D=!1,gutter:z=8,defaultPosition:S}=h||{},W=r.filter(T=>(T.position||S)===(b.position||S)&&T.height),ge=W.findIndex(T=>T.id===b.id),_=W.filter((T,$)=>$<ge&&T.visible).length;return W.filter(T=>T.visible).slice(...D?[_+1]:[0,_]).reduce((T,$)=>T+($.height||0)+z,0)},[r]);return F.useEffect(()=>{r.forEach(b=>{if(b.dismissed)a(b.id,b.removeDelay);else{let h=l.get(b.id);h&&(clearTimeout(h),l.delete(b.id))}})},[r,a]),{toasts:r,handlers:{updateHeight:p,startPause:d,endPause:x,calculateOffset:v}}},Er=se`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Dr=se`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Sr=se`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Or=le("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Er} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Dr} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${Sr} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Cr=se`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Tr=le("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Cr} 1s linear infinite;
`,Lr=se`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Rr=se`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,Ir=le("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Lr} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Rr} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,Nr=le("div")`
  position: absolute;
`,Mr=le("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Pr=se`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Ur=le("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Pr} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,$r=({toast:e})=>{let{icon:t,type:r,iconTheme:i}=e;return t!==void 0?typeof t=="string"?F.createElement(Ur,null,t):t:r==="blank"?null:F.createElement(Mr,null,F.createElement(Tr,{...i}),r!=="loading"&&F.createElement(Nr,null,r==="error"?F.createElement(Or,{...i}):F.createElement(Ir,{...i})))},Br=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,jr=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,zr="0%{opacity:0;} 100%{opacity:1;}",Hr="0%{opacity:1;} 100%{opacity:0;}",qr=le("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Wr=le("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Kr=(e,t)=>{let r=e.includes("top")?1:-1,[i,l]=Et()?[zr,Hr]:[Br(r),jr(r)];return{animation:t?`${se(i)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${se(l)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Yr=F.memo(({toast:e,position:t,style:r,children:i})=>{let l=e.height?Kr(e.position||t||"top-center",e.visible):{opacity:0},a=F.createElement($r,{toast:e}),n=F.createElement(Wr,{...e.ariaProps},De(e.message,e));return F.createElement(qr,{className:e.className,style:{...l,...r,...e.style}},typeof i=="function"?i({icon:a,message:n}):F.createElement(F.Fragment,null,a,n))});vr(F.createElement);var Zr=({id:e,className:t,style:r,onHeightUpdate:i,children:l})=>{let a=F.useCallback(n=>{if(n){let d=()=>{let p=n.getBoundingClientRect().height;i(e,p)};d(),new MutationObserver(d).observe(n,{subtree:!0,childList:!0,characterData:!0})}},[e,i]);return F.createElement("div",{ref:a,className:t,style:r},l)},Qr=(e,t)=>{let r=e.includes("top"),i=r?{top:0}:{bottom:0},l=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:Et()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...i,...l}},Jr=Oe`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,Ve=16,ts=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:i,children:l,toasterId:a,containerStyle:n,containerClassName:d})=>{let{toasts:p,handlers:x}=kr(r,a);return F.createElement("div",{"data-rht-toaster":a||"",style:{position:"fixed",zIndex:9999,top:Ve,left:Ve,right:Ve,bottom:Ve,pointerEvents:"none",...n},className:d,onMouseEnter:x.startPause,onMouseLeave:x.endPause},p.map(v=>{let b=v.position||t,h=x.calculateOffset(v,{reverseOrder:e,gutter:i,defaultPosition:t}),D=Qr(b,h);return F.createElement(Zr,{id:v.id,key:v.id,onHeightUpdate:x.updateHeight,className:v.visible?Jr:"",style:D},v.type==="custom"?De(v.message,v):l?l(v):F.createElement(Yr,{toast:v,position:b}))}))},rs=N;export{ts as F,es as u,rs as z};
