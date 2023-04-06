import{S as W,i as X,s as Y,k as b,q as S,a as D,J as G,l as k,m as w,r as H,h as y,c as j,K as L,n as p,b as C,G as g,H as T,o as J}from"../chunks/index.c0f3b0e2.js";import{s as K}from"../chunks/transform.28303983.js";import"../chunks/paths.6d58faee.js";import{a as $}from"../chunks/ascending.3ff63084.js";function Q(e,t){return e.parent===t.parent?1:2}function U(e){return e.reduce(Z,0)/e.length}function Z(e,t){return e+t.x}function ee(e){return 1+e.reduce(te,0)}function te(e,t){return Math.max(e,t.y)}function ne(e){for(var t;t=e.children;)e=t[0];return e}function re(e){for(var t;t=e.children;)e=t[t.length-1];return e}function ae(){var e=Q,t=1,n=1,r=!1;function s(i){var l,o=0;i.eachAfter(function(a){var c=a.children;c?(a.x=U(c),a.y=ee(c)):(a.x=l?o+=e(a,l):0,a.y=0,l=a)});var d=ne(i),h=re(i),u=d.x-e(d,h)/2,v=h.x+e(h,d)/2;return i.eachAfter(r?function(a){a.x=(a.x-i.x)*t,a.y=(i.y-a.y)*n}:function(a){a.x=(a.x-u)/(v-u)*t,a.y=(1-(i.y?a.y/i.y:1))*n})}return s.separation=function(i){return arguments.length?(e=i,s):e},s.size=function(i){return arguments.length?(r=!1,t=+i[0],n=+i[1],s):r?null:[t,n]},s.nodeSize=function(i){return arguments.length?(r=!0,t=+i[0],n=+i[1],s):r?[t,n]:null},s}function ie(e){var t=0,n=e.children,r=n&&n.length;if(!r)t=1;else for(;--r>=0;)t+=n[r].value;e.value=t}function se(){return this.eachAfter(ie)}function le(e,t){let n=-1;for(const r of this)e.call(t,r,++n,this);return this}function oe(e,t){for(var n=this,r=[n],s,i,l=-1;n=r.pop();)if(e.call(t,n,++l,this),s=n.children)for(i=s.length-1;i>=0;--i)r.push(s[i]);return this}function ce(e,t){for(var n=this,r=[n],s=[],i,l,o,d=-1;n=r.pop();)if(s.push(n),i=n.children)for(l=0,o=i.length;l<o;++l)r.push(i[l]);for(;n=s.pop();)e.call(t,n,++d,this);return this}function he(e,t){let n=-1;for(const r of this)if(e.call(t,r,++n,this))return r}function ue(e){return this.eachAfter(function(t){for(var n=+e(t.data)||0,r=t.children,s=r&&r.length;--s>=0;)n+=r[s].value;t.value=n})}function de(e){return this.eachBefore(function(t){t.children&&t.children.sort(e)})}function fe(e){for(var t=this,n=pe(t,e),r=[t];t!==n;)t=t.parent,r.push(t);for(var s=r.length;e!==n;)r.splice(s,0,e),e=e.parent;return r}function pe(e,t){if(e===t)return e;var n=e.ancestors(),r=t.ancestors(),s=null;for(e=n.pop(),t=r.pop();e===t;)s=e,e=n.pop(),t=r.pop();return s}function ge(){for(var e=this,t=[e];e=e.parent;)t.push(e);return t}function me(){return Array.from(this)}function ve(){var e=[];return this.eachBefore(function(t){t.children||e.push(t)}),e}function ye(){var e=this,t=[];return e.each(function(n){n!==e&&t.push({source:n.parent,target:n})}),t}function*xe(){var e=this,t,n=[e],r,s,i;do for(t=n.reverse(),n=[];e=t.pop();)if(yield e,r=e.children)for(s=0,i=r.length;s<i;++s)n.push(r[s]);while(n.length)}function B(e,t){e instanceof Map?(e=[void 0,e],t===void 0&&(t=be)):t===void 0&&(t=_e);for(var n=new E(e),r,s=[n],i,l,o,d;r=s.pop();)if((l=t(r.data))&&(d=(l=Array.from(l)).length))for(r.children=l,o=d-1;o>=0;--o)s.push(i=l[o]=new E(l[o])),i.parent=r,i.depth=r.depth+1;return n.eachBefore(Ae)}function we(){return B(this).eachBefore(ke)}function _e(e){return e.children}function be(e){return Array.isArray(e)?e[1]:null}function ke(e){e.data.value!==void 0&&(e.value=e.data.value),e.data=e.data.data}function Ae(e){var t=0;do e.height=t;while((e=e.parent)&&e.height<++t)}function E(e){this.data=e,this.depth=this.height=0,this.parent=null}E.prototype=B.prototype={constructor:E,count:se,each:le,eachAfter:ce,eachBefore:oe,find:he,sum:ue,sort:de,path:fe,ancestors:ge,descendants:me,leaves:ve,links:ye,copy:we,[Symbol.iterator]:xe};function Se(e){let t,n,r,s,i,l,o,d,h,u,v,a,c,f,A;return{c(){t=b("div"),n=b("h1"),r=S("Fungi are closer to Homo Sapiens than Green Plants in the Tree of Life."),s=D(),i=b("div"),l=S("Data Source: "),o=b("a"),d=S("Tolweb"),h=b("br"),u=S(`
        Icons: `),v=b("a"),a=S("Phylopic"),c=D(),f=G("svg"),A=G("g"),this.h()},l(m){t=k(m,"DIV",{id:!0,class:!0});var x=w(t);n=k(x,"H1",{class:!0});var N=w(n);r=H(N,"Fungi are closer to Homo Sapiens than Green Plants in the Tree of Life."),N.forEach(y),s=j(x),i=k(x,"DIV",{id:!0,class:!0});var _=w(i);l=H(_,"Data Source: "),o=k(_,"A",{href:!0});var F=w(o);d=H(F,"Tolweb"),F.forEach(y),h=k(_,"BR",{}),u=H(_,`
        Icons: `),v=k(_,"A",{href:!0});var I=w(v);a=H(I,"Phylopic"),I.forEach(y),_.forEach(y),x.forEach(y),c=j(m),f=L(m,"svg",{id:!0,width:!0,height:!0,class:!0});var z=w(f);A=L(z,"g",{id:!0});var V=w(A);V.forEach(y),z.forEach(y),this.h()},h(){p(n,"class","svelte-107u5k5"),p(o,"href","http://tolweb.org/tree/"),p(v,"href","https://images.phylopic.org/"),p(i,"id","data-source"),p(i,"class","svelte-107u5k5"),p(t,"id","main-text"),p(t,"class","svelte-107u5k5"),p(A,"id","legend"),p(f,"id","vis"),p(f,"width",R),p(f,"height",M),p(f,"class","svelte-107u5k5")},m(m,x){C(m,t,x),g(t,n),g(n,r),g(t,s),g(t,i),g(i,l),g(i,o),g(o,d),g(i,h),g(i,u),g(i,v),g(v,a),C(m,c,x),C(m,f,x),g(f,A)},p:T,i:T,o:T,d(m){m&&y(t),m&&y(c),m&&y(f)}}}const R=1800,M=1400,P=160;function He(e,t,n){const r=document.createElementNS("http://www.w3.org/2000/svg","svg"),s=document.createElementNS("http://www.w3.org/2000/svg","text");s.setAttribute("font-size",t.toString()),s.setAttribute("font-family",n);const i=document.createTextNode(e);s.appendChild(i),r.appendChild(s),document.body.appendChild(r);const o=s.getBBox().width;return document.body.removeChild(r),o}function q(e,t=null){if(!e.children)return;let n=e.children;if(t&&t.children.length<2&&e.children.length<2){t.children=e.children;for(let r of e.children)r.parent=t;e=t}for(let r of n)q(r,e)}function O(e){let t=e.source.y,n=e.source.x,r=e.target.y,s=e.target.x,i=t,l=s;return"M"+t+","+n+"L"+i+","+l+"L"+r+","+s}function Ee(e,t,n){let{data:r}=t;q(r);let s=B(r).sum(h=>h.children?0:1).sort((h,u)=>h.value-u.value||$(h.data.length,u.data.length));const i={right:180};let l=["#deebf7","#9ecae1","#3182bd"];ae().size([M-200,R-600])(s);let o;J(()=>{o=K("#vis").append("g").attr("transform",`translate(${i.right}, 0)`),d()});function d(){o.append("g").selectAll(".icon").data(s.descendants().filter(a=>!a.children)).join("svg:foreignObject").attr("x",a=>a.y).attr("y",a=>a.x-P/2).attr("width",400).attr("height",P).classed("icon",!0).append("xhtml:img").attr("src",a=>{if(a.data.name=="Cyanobacteria")return"https://images.phylopic.org/images/9a7caf63-cd50-4841-a2bc-33ed6ec44856/vector.svg";if(a.data.name=="Green plants")return"https://images.phylopic.org/images/9c1635ff-9fec-402b-82f2-100515286713/vector.svg";if(a.data.name=="Phaeophytes (brown algae)")return"https://images.phylopic.org/images/61e2982f-07d4-44db-ac00-27a2d86ca855/vector.svg";if(a.data.name=="Homo sapiens")return"https://images.phylopic.org/images/a9f4ebd5-53d7-4de9-9e66-85ff6c2d513e/vector.svg";if(a.data.name=="Fungi")return"https://images.phylopic.org/images/e5d32221-7ea9-46ed-8e0a-d9dbddab0b4a/vector.svg";if(a.data.name=="Nematoda")return"https://images.phylopic.org/images/3c60fbfb-5722-4248-94f0-23f841030294/vector.svg"}).attr("width",200).attr("height",P),o.append("g").selectAll("circle").data(s.descendants()).join("text").text(a=>{if(!a.children||a.children.length>1)return a.data.name=="Phaeophytes (brown algae)"?"Algae":a.data.name}).attr("x",a=>{let c=a.data.name;a.data.name=="Phaeophytes (brown algae)"&&(c="Algae");let f=He(c,"1.6em","Rasa");return console.log(f),a.y-20-f}).attr("y",a=>a.x-14).attr("font-size","1.6em");const h=["Homo sapiens","Bilateria","Opisthokonts","Fungi","Deuterostomia","opi","fung"],u=["Green plants","Eukaryotes","Opisthokonts","Fungi","fung"],v=["Opisthokonts","Fungi","fung"];o.append("g").attr("fill","none").selectAll("path").data(s.links()).join(a=>(a.append("path").attr("d",O).attr("stroke-width",c=>h.includes(c.source.data.name)&&h.includes(c.target.data.name)||u.includes(c.source.data.name)&&u.includes(c.target.data.name)?20:10).attr("stroke",c=>h.includes(c.source.data.name)&&h.includes(c.target.data.name)?l[1]:u.includes(c.source.data.name)&&u.includes(c.target.data.name)?l[2]:"black"),a.filter(c=>v.includes(c.source.data.name)&&u.includes(c.target.data.name)).append("path").attr("d",O).attr("stroke-width",20).style("stroke-dasharray",10).style("z-index",2e3).attr("stroke",l[2]).raise(),a),a=>a,a=>a.remove())}return e.$$set=h=>{"data"in h&&n(0,r=h.data)},[r]}class Ne extends W{constructor(t){super(),X(this,t,Ee,Se,Y,{data:0})}}export{Ne as default};
