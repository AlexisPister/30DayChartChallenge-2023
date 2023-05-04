import{S as K,i as U,s as Z,k as b,q as E,a as F,M as q,J as ee,l as k,m as x,r as S,h as p,c as I,N as Y,n as m,H as g,b as N,C as z,o as te,Q as ne}from"../chunks/index.06a14631.js";import"../chunks/transform.2ac1f063.js";import"../chunks/paths.53ce12e7.js";import{a as ae}from"../chunks/ascending.3ff63084.js";import{s as re}from"../chunks/select.c6d05060.js";function ie(e,t){return e.parent===t.parent?1:2}function se(e){return e.reduce(oe,0)/e.length}function oe(e,t){return e+t.x}function le(e){return 1+e.reduce(ce,0)}function ce(e,t){return Math.max(e,t.y)}function he(e){for(var t;t=e.children;)e=t[0];return e}function ue(e){for(var t;t=e.children;)e=t[t.length-1];return e}function de(){var e=ie,t=1,a=1,n=!1;function r(s){var o,h=0;s.eachAfter(function(i){var l=i.children;l?(i.x=se(l),i.y=le(l)):(i.x=o?h+=e(i,o):0,i.y=0,o=i)});var c=he(s),u=ue(s),d=c.x-e(c,u)/2,_=u.x+e(u,c)/2;return s.eachAfter(n?function(i){i.x=(i.x-s.x)*t,i.y=(s.y-i.y)*a}:function(i){i.x=(i.x-d)/(_-d)*t,i.y=(1-(s.y?i.y/s.y:1))*a})}return r.separation=function(s){return arguments.length?(e=s,r):e},r.size=function(s){return arguments.length?(n=!1,t=+s[0],a=+s[1],r):n?null:[t,a]},r.nodeSize=function(s){return arguments.length?(n=!0,t=+s[0],a=+s[1],r):n?[t,a]:null},r}function fe(e){var t=0,a=e.children,n=a&&a.length;if(!n)t=1;else for(;--n>=0;)t+=a[n].value;e.value=t}function pe(){return this.eachAfter(fe)}function ge(e,t){let a=-1;for(const n of this)e.call(t,n,++a,this);return this}function me(e,t){for(var a=this,n=[a],r,s,o=-1;a=n.pop();)if(e.call(t,a,++o,this),r=a.children)for(s=r.length-1;s>=0;--s)n.push(r[s]);return this}function ve(e,t){for(var a=this,n=[a],r=[],s,o,h,c=-1;a=n.pop();)if(r.push(a),s=a.children)for(o=0,h=s.length;o<h;++o)n.push(s[o]);for(;a=r.pop();)e.call(t,a,++c,this);return this}function ye(e,t){let a=-1;for(const n of this)if(e.call(t,n,++a,this))return n}function xe(e){return this.eachAfter(function(t){for(var a=+e(t.data)||0,n=t.children,r=n&&n.length;--r>=0;)a+=n[r].value;t.value=a})}function _e(e){return this.eachBefore(function(t){t.children&&t.children.sort(e)})}function we(e){for(var t=this,a=be(t,e),n=[t];t!==a;)t=t.parent,n.push(t);for(var r=n.length;e!==a;)n.splice(r,0,e),e=e.parent;return n}function be(e,t){if(e===t)return e;var a=e.ancestors(),n=t.ancestors(),r=null;for(e=a.pop(),t=n.pop();e===t;)r=e,e=a.pop(),t=n.pop();return r}function ke(){for(var e=this,t=[e];e=e.parent;)t.push(e);return t}function Ae(){return Array.from(this)}function Ee(){var e=[];return this.eachBefore(function(t){t.children||e.push(t)}),e}function Se(){var e=this,t=[];return e.each(function(a){a!==e&&t.push({source:a.parent,target:a})}),t}function*He(){var e=this,t,a=[e],n,r,s;do for(t=a.reverse(),a=[];e=t.pop();)if(yield e,n=e.children)for(r=0,s=n.length;r<s;++r)a.push(n[r]);while(a.length)}function R(e,t){e instanceof Map?(e=[void 0,e],t===void 0&&(t=Ne)):t===void 0&&(t=Te);for(var a=new P(e),n,r=[a],s,o,h,c;n=r.pop();)if((o=t(n.data))&&(c=(o=Array.from(o)).length))for(n.children=o,h=c-1;h>=0;--h)r.push(s=o[h]=new P(o[h])),s.parent=n,s.depth=n.depth+1;return a.eachBefore(Be)}function Ce(){return R(this).eachBefore(Pe)}function Te(e){return e.children}function Ne(e){return Array.isArray(e)?e[1]:null}function Pe(e){e.data.value!==void 0&&(e.value=e.data.value),e.data=e.data.data}function Be(e){var t=0;do e.height=t;while((e=e.parent)&&e.height<++t)}function P(e){this.data=e,this.depth=this.height=0,this.parent=null}P.prototype=R.prototype={constructor:P,count:pe,each:ge,eachAfter:ve,eachBefore:me,find:ye,sum:xe,sort:_e,path:we,ancestors:ke,descendants:Ae,leaves:Ee,links:Se,copy:Ce,[Symbol.iterator]:He};const{document:V}=ne;function Fe(e){let t,a,n,r,s,o,h,c,u,d,_,i,l,y,B,C,v,H;return{c(){t=b("style"),a=E(`body {
        background-color: rgba(222, 235, 247, 0.8);
        font-family: Rasa;
    }`),n=F(),r=b("div"),s=b("h1"),o=E("Fungi are closer to Homo Sapiens than Green Plants in the Tree of Life."),h=F(),c=b("div"),u=E("Data Source: "),d=b("a"),_=E("Tolweb"),i=b("br"),l=E(`
        Icons: `),y=b("a"),B=E("Phylopic"),C=F(),v=q("svg"),H=q("g"),this.h()},l(f){const w=ee("svelte-1w02nq8",V.head);t=k(w,"STYLE",{});var G=x(t);a=S(G,`body {
        background-color: rgba(222, 235, 247, 0.8);
        font-family: Rasa;
    }`),G.forEach(p),w.forEach(p),n=I(f),r=k(f,"DIV",{id:!0,class:!0});var T=x(r);s=k(T,"H1",{class:!0});var L=x(s);o=S(L,"Fungi are closer to Homo Sapiens than Green Plants in the Tree of Life."),L.forEach(p),h=I(T),c=k(T,"DIV",{id:!0,class:!0});var A=x(c);u=S(A,"Data Source: "),d=k(A,"A",{href:!0});var j=x(d);_=S(j,"Tolweb"),j.forEach(p),i=k(A,"BR",{}),l=S(A,`
        Icons: `),y=k(A,"A",{href:!0});var M=x(y);B=S(M,"Phylopic"),M.forEach(p),A.forEach(p),T.forEach(p),C=I(f),v=Y(f,"svg",{id:!0,width:!0,height:!0,class:!0});var O=x(v);H=Y(O,"g",{id:!0});var $=x(H);$.forEach(p),O.forEach(p),this.h()},h(){m(s,"class","svelte-1imekd4"),m(d,"href","http://tolweb.org/tree/"),m(y,"href","https://images.phylopic.org/"),m(c,"id","data-source"),m(c,"class","svelte-1imekd4"),m(r,"id","main-text"),m(r,"class","svelte-1imekd4"),m(H,"id","legend"),m(v,"id","vis"),m(v,"width",X),m(v,"height",J),m(v,"class","svelte-1imekd4")},m(f,w){g(V.head,t),g(t,a),N(f,n,w),N(f,r,w),g(r,s),g(s,o),g(r,h),g(r,c),g(c,u),g(c,d),g(d,_),g(c,i),g(c,l),g(c,y),g(y,B),N(f,C,w),N(f,v,w),g(v,H)},p:z,i:z,o:z,d(f){p(t),f&&p(n),f&&p(r),f&&p(C),f&&p(v)}}}const X=1800,J=1400,D=160;function Ie(e,t,a){const n=document.createElementNS("http://www.w3.org/2000/svg","svg"),r=document.createElementNS("http://www.w3.org/2000/svg","text");r.setAttribute("font-size",t.toString()),r.setAttribute("font-family",a);const s=document.createTextNode(e);r.appendChild(s),n.appendChild(r),document.body.appendChild(n);const h=r.getBBox().width;return document.body.removeChild(n),h}function Q(e,t=null){if(!e.children)return;let a=e.children;if(t&&t.children.length<2&&e.children.length<2){t.children=e.children;for(let n of e.children)n.parent=t;e=t}for(let n of a)Q(n,e)}function W(e){let t=e.source.y,a=e.source.x,n=e.target.y,r=e.target.x,s=t,o=r;return"M"+t+","+a+"L"+s+","+o+"L"+n+","+r}function ze(e,t,a){let{data:n}=t;Q(n);let r=R(n).sum(u=>u.children?0:1).sort((u,d)=>u.value-d.value||ae(u.data.length,d.data.length));const s={right:180};let o=["#deebf7","#9ecae1","#3182bd"];de().size([J-200,X-600])(r);let h;te(()=>{h=re("#vis").append("g").attr("transform",`translate(${s.right}, 0)`),c()});function c(){h.append("g").selectAll(".icon").data(r.descendants().filter(i=>!i.children)).join("svg:foreignObject").attr("x",i=>i.y).attr("y",i=>i.x-D/2).attr("width",400).attr("height",D).classed("icon",!0).append("xhtml:img").attr("src",i=>{if(i.data.name=="Cyanobacteria")return"https://images.phylopic.org/images/9a7caf63-cd50-4841-a2bc-33ed6ec44856/vector.svg";if(i.data.name=="Green plants")return"https://images.phylopic.org/images/9c1635ff-9fec-402b-82f2-100515286713/vector.svg";if(i.data.name=="Phaeophytes (brown algae)")return"https://images.phylopic.org/images/61e2982f-07d4-44db-ac00-27a2d86ca855/vector.svg";if(i.data.name=="Homo sapiens")return"https://images.phylopic.org/images/a9f4ebd5-53d7-4de9-9e66-85ff6c2d513e/vector.svg";if(i.data.name=="Fungi")return"https://images.phylopic.org/images/e5d32221-7ea9-46ed-8e0a-d9dbddab0b4a/vector.svg";if(i.data.name=="Nematoda")return"https://images.phylopic.org/images/3c60fbfb-5722-4248-94f0-23f841030294/vector.svg"}).attr("width",200).attr("height",D),h.append("g").selectAll("circle").data(r.descendants()).join("text").text(i=>{if(!i.children||i.children.length>1)return i.data.name=="Phaeophytes (brown algae)"?"Algae":i.data.name}).attr("x",i=>{let l=i.data.name;i.data.name=="Phaeophytes (brown algae)"&&(l="Algae");let y=Ie(l,"1.6em","Rasa");return console.log(y),i.y-20-y}).attr("y",i=>i.x-14).attr("font-size","1.6em");const u=["Homo sapiens","Bilateria","Opisthokonts","Fungi","Deuterostomia","opi","fung"],d=["Green plants","Eukaryotes","Opisthokonts","Fungi","fung"],_=["Opisthokonts","Fungi","fung"];h.append("g").attr("fill","none").selectAll("path").data(r.links()).join(i=>(i.append("path").attr("d",W).attr("stroke-width",l=>u.includes(l.source.data.name)&&u.includes(l.target.data.name)||d.includes(l.source.data.name)&&d.includes(l.target.data.name)?20:10).attr("stroke",l=>u.includes(l.source.data.name)&&u.includes(l.target.data.name)?o[1]:d.includes(l.source.data.name)&&d.includes(l.target.data.name)?o[2]:"black"),i.filter(l=>_.includes(l.source.data.name)&&d.includes(l.target.data.name)).append("path").attr("d",W).attr("stroke-width",20).style("stroke-dasharray",10).style("z-index",2e3).attr("stroke",o[2]).raise(),i),i=>i,i=>i.remove())}return e.$$set=u=>{"data"in u&&a(0,n=u.data)},[n]}class Me extends K{constructor(t){super(),U(this,t,ze,Fe,Z,{data:0})}}export{Me as default};