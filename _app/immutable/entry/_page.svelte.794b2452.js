import{S as P,i as R,s as T,k as g,q as D,a as S,J as W,l as v,m as b,r as w,h,c as V,n as i,K,H as l,b as j,C as B,L as Q}from"../chunks/index.06a14631.js";import{b as N}from"../chunks/paths.9fde2edb.js";import"../chunks/transform.2ac1f063.js";function F(f,e,d){const c=f.slice();return c[2]=e[d],c}function J(f){let e,d,c,t,r,E,_=f[2]+"",k,q;return{c(){e=g("a"),d=g("div"),c=S(),t=g("img"),E=S(),k=D(_),q=S(),this.h()},l(u){e=v(u,"A",{class:!0,href:!0});var n=b(e);d=v(n,"DIV",{}),b(d).forEach(h),c=V(n),t=v(n,"IMG",{src:!0,class:!0}),E=V(n),k=w(n,_),q=V(n),n.forEach(h),this.h()},h(){K(t.src,r=N+"/screen/"+f[2].slice(0,2)+".png")||i(t,"src",r),i(t,"class","svelte-sgv2q3"),i(e,"class","day svelte-sgv2q3"),i(e,"href","./"+f[2])},m(u,n){j(u,e,n),l(e,d),l(e,c),l(e,t),l(e,E),l(e,k),l(e,q)},p:B,d(u){u&&h(e)}}}function U(f){let e,d,c,t,r,E,_,k,q,u,n,A,H,C,G,L,p,I=f[0],o=[];for(let a=0;a<I.length;a+=1)o[a]=J(F(f,I,a));return{c(){e=g("style"),d=D(`body {
            /*background-color: rgba(190, 255, 245, 0.5);*/
        }`),c=S(),t=g("div"),r=g("div"),E=D("Here are "),_=g("a"),k=D("my"),q=D(" 20 contributions to the "),u=g("a"),n=D("#30DayChartChallenge"),A=D(` 2023.
        You can click on the images to go to the charts.`),H=S(),C=g("img"),L=S(),p=g("div");for(let a=0;a<o.length;a+=1)o[a].c();this.h()},l(a){const y=W("svelte-jcygk9",document.head);e=v(y,"STYLE",{});var s=b(e);d=w(s,`body {
            /*background-color: rgba(190, 255, 245, 0.5);*/
        }`),s.forEach(h),y.forEach(h),c=V(a),t=v(a,"DIV",{id:!0,class:!0});var m=b(t);r=v(m,"DIV",{id:!0,class:!0});var x=b(r);E=w(x,"Here are "),_=v(x,"A",{href:!0});var M=b(_);k=w(M,"my"),M.forEach(h),q=w(x," 20 contributions to the "),u=v(x,"A",{href:!0});var O=b(u);n=w(O,"#30DayChartChallenge"),O.forEach(h),A=w(x,` 2023.
        You can click on the images to go to the charts.`),x.forEach(h),H=V(m),C=v(m,"IMG",{id:!0,src:!0,class:!0}),L=V(m),p=v(m,"DIV",{id:!0,class:!0});var z=b(p);for(let Y=0;Y<o.length;Y+=1)o[Y].l(z);z.forEach(h),m.forEach(h),this.h()},h(){i(_,"href","https://alexispister.github.io/"),i(u,"href","https://twitter.com/30DayChartChall"),i(r,"id","text"),i(r,"class","svelte-sgv2q3"),i(C,"id","challenge"),K(C.src,G=N+"/30challenge.jpeg")||i(C,"src",G),i(C,"class","svelte-sgv2q3"),i(p,"id","grid"),i(p,"class","svelte-sgv2q3"),i(t,"id","main"),i(t,"class","svelte-sgv2q3")},m(a,y){l(document.head,e),l(e,d),j(a,c,y),j(a,t,y),l(t,r),l(r,E),l(r,_),l(_,k),l(r,q),l(r,u),l(u,n),l(r,A),l(t,H),l(t,C),l(t,L),l(t,p);for(let s=0;s<o.length;s+=1)o[s]&&o[s].m(p,null)},p(a,[y]){if(y&1){I=a[0];let s;for(s=0;s<I.length;s+=1){const m=F(a,I,s);o[s]?o[s].p(m,y):(o[s]=J(m),o[s].c(),o[s].m(p,null))}for(;s<o.length;s+=1)o[s].d(1);o.length=I.length}},i:B,o:B,d(a){h(e),a&&h(c),a&&h(t),Q(o,a)}}}function X(f,e,d){let{data:c}=e;const t=["01-parttowhole","02-waffle","03-faunaflora","04-historical","05-slope","06-OWID","07-hazard","08-humans","09-lowhigh","10-hybrid","11-circular","12-BBC","13-pop","14-newtool","15-positiveNegative","16-family","17-networks","18-eurostats","21-downupwards","23-tiles"];return f.$$set=r=>{"data"in r&&d(1,c=r.data)},[t,c]}class te extends P{constructor(e){super(),R(this,e,X,U,T,{data:1})}}export{te as default};
