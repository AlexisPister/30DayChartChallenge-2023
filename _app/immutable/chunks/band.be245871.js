import{I,o as v}from"./ordinal.9aa01bae.js";import{i as w}from"./init.a5b10ee5.js";import{r as O}from"./range.6bc2a9a0.js";function z(n,o){let i,r;if(o===void 0)for(const t of n)t!=null&&(i===void 0?t>=t&&(i=r=t):(i>t&&(i=t),r<t&&(r=t)));else{let t=-1;for(let e of n)(e=o(e,++t,n))!=null&&(i===void 0?e>=e&&(i=r=e):(i>e&&(i=e),r<e&&(r=e)))}return[i,r]}function b(n){return n}function A(n,o,...i){return k(n,b,o,i)}function k(n,o,i,r){return function t(e,l){if(l>=r.length)return i(e);const f=new I,d=r[l++];let p=-1;for(const g of e){const a=d(g,++p,e),u=f.get(a);u?u.push(g):f.set(a,[g])}for(const[g,a]of f)f.set(g,t(a,l));return o(f)}(n,0)}function B(n,o){let i=0,r=0;if(o===void 0)for(let t of n)t!=null&&(t=+t)>=t&&(++i,r+=t);else{let t=-1;for(let e of n)(e=o(e,++t,n))!=null&&(e=+e)>=e&&(++i,r+=e)}if(i)return r/i}function y(){var n=v().unknown(void 0),o=n.domain,i=n.range,r=0,t=1,e,l,f=!1,d=0,p=0,g=.5;delete n.unknown;function a(){var u=o().length,c=t<r,s=c?t:r,m=c?r:t;e=(m-s)/Math.max(1,u-d+p*2),f&&(e=Math.floor(e)),s+=(m-s-e*(u-d))*g,l=e*(1-d),f&&(s=Math.round(s),l=Math.round(l));var h=O(u).map(function(x){return s+e*x});return i(c?h.reverse():h)}return n.domain=function(u){return arguments.length?(o(u),a()):o()},n.range=function(u){return arguments.length?([r,t]=u,r=+r,t=+t,a()):[r,t]},n.rangeRound=function(u){return[r,t]=u,r=+r,t=+t,f=!0,a()},n.bandwidth=function(){return l},n.step=function(){return e},n.round=function(u){return arguments.length?(f=!!u,a()):f},n.padding=function(u){return arguments.length?(d=Math.min(1,p=+u),a()):d},n.paddingInner=function(u){return arguments.length?(d=Math.min(1,u),a()):d},n.paddingOuter=function(u){return arguments.length?(p=+u,a()):p},n.align=function(u){return arguments.length?(g=Math.max(0,Math.min(1,u)),a()):g},n.copy=function(){return y(o(),[r,t]).round(f).paddingInner(d).paddingOuter(p).align(g)},w.apply(a(),arguments)}function M(n){var o=n.copy;return n.padding=n.paddingOuter,delete n.paddingInner,delete n.paddingOuter,n.copy=function(){return M(o())},n}function C(){return M(y.apply(null,arguments).paddingInner(1))}export{y as b,z as e,B as m,C as p,A as r};
