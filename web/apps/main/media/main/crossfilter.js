(function(r){function n(r){return r}function t(r,n){for(var t=0,u=n.length,e=Array(u);u>t;++t)e[t]=r[n[t]];return e}function u(r){function n(n,t,u,e){for(;e>u;){var f=u+e>>>1,o=r(n[f]);o>=t||!(o>=o)?e=f:u=f+1}return u}function t(n,t,u,e){for(;e>u;){var f=u+e>>>1,o=r(n[f]);o>t||!(o>=o)?e=f:u=f+1}return u}return t.right=t,t.left=n,t}function e(r){function n(r,n,t){for(var e=t-n,f=(e>>>1)+1;--f>0;)u(r,f,e,n);return r}function t(r,n,t){for(var e,f=t-n;--f>0;)e=r[n],r[n]=r[n+f],r[n+f]=e,u(r,1,f,n);return r}function u(n,t,u,e){for(var f,o=n[--e+t],i=r(o);(f=t<<1)<=u&&(u>f&&r(n[e+f])>r(n[e+f+1])&&f++,!(i<=r(n[e+f])));)n[e+t]=n[e+f],t=f;n[e+t]=o}return n.sort=t,n}function f(r){function n(n,u,e,f){var o,i,a,c,l=Array(f=Math.min(e-u,f));for(i=0;f>i;++i)l[i]=n[u++];if(t(l,0,f),e>u){o=r(l[0]);do(a=r(c=n[u])>o)&&(l[0]=c,o=r(t(l,0,f)[0]));while(++u<e)}return l}var t=e(r);return n}function o(r){function n(n,t,u){for(var e=t+1;u>e;++e){for(var f,o=e,i=n[e],a=r(i);o>t&&((f=r(n[o-1]))>a||!(f>=f));--o)n[o]=n[o-1];n[o]=i}return n}return n}function i(r){function n(r,n,e){return(z>e-n?u:t)(r,n,e)}function t(t,u,e){for(var f,o;e>u&&!((f=r(t[e-1]))<=f);)e--;for(var i=e;--i>=u;)f=r(o=t[i]),f>=f||(t[i]=t[--e],t[e]=o);var a,c=0|(e-u)/6,l=u+c,v=e-1-c,h=u+e-1>>1,s=h-c,d=h+c,g=t[l],p=r(g),y=t[s],b=r(y),m=t[h],A=r(m),k=t[d],w=r(k),E=t[v],M=r(E);p>b&&(a=g,g=y,y=a,a=p,p=b,b=a),w>M&&(a=k,k=E,E=a,a=w,w=M,M=a),p>A&&(a=g,g=m,m=a,a=p,p=A,A=a),b>A&&(a=y,y=m,m=a,a=b,b=A,A=a),p>w&&(a=g,g=k,k=a,a=p,p=w,w=a),A>w&&(a=m,m=k,k=a,a=A,A=w,w=a),b>M&&(a=y,y=E,E=a,a=b,b=M,M=a),b>A&&(a=y,y=m,m=a,a=b,b=A,A=a),w>M&&(a=k,k=E,E=a,a=w,w=M,M=a);var x=y,U=b,z=k,N=w;t[l]=g,t[s]=t[u],t[h]=m,t[d]=t[e-1],t[v]=E;var C=u+1,S=e-2,q=N>=U&&U>=N;if(q)for(var O=C;S>=O;++O){var R=t[O],j=r(R);if(U>j)O!==C&&(t[O]=t[C],t[C]=R),++C;else if(j>U)for(;;){var B=r(t[S]);{if(!(B>U)){if(U>B){t[O]=t[C],t[C++]=t[S],t[S--]=R;break}t[O]=t[S],t[S--]=R;break}S--}}}else for(var O=C;S>=O;O++){var R=t[O],j=r(R);if(U>j)O!==C&&(t[O]=t[C],t[C]=R),++C;else if(j>N)for(;;){var B=r(t[S]);{if(!(B>N)){U>B?(t[O]=t[C],t[C++]=t[S],t[S--]=R):(t[O]=t[S],t[S--]=R);break}if(S--,O>S)break}}}if(t[u]=t[C-1],t[C-1]=x,t[e-1]=t[S+1],t[S+1]=z,n(t,u,C-1),n(t,S+2,e),q)return t;if(l>C&&S>v){for(var D,B;(D=r(t[C]))<=U&&D>=U;)++C;for(;(B=r(t[S]))<=N&&B>=N;)--S;for(var O=C;S>=O;O++){var R=t[O],j=r(R);if(U>=j&&j>=U)O!==C&&(t[O]=t[C],t[C]=R),C++;else if(N>=j&&j>=N)for(;;){var B=r(t[S]);{if(!(N>=B&&B>=N)){U>B?(t[O]=t[C],t[C++]=t[S],t[S--]=R):(t[O]=t[S],t[S--]=R);break}if(S--,O>S)break}}}}return n(t,C,S+1)}var u=o(r);return n}function a(r){return Array(r)}function c(r,n){return function(t){var u=t.length;return[r.left(t,n,0,u),r.right(t,n,0,u)]}}function l(r,n){var t=n[0],u=n[1];return function(n){var e=n.length;return[r.left(n,t,0,e),r.left(n,u,0,e)]}}function v(r){return[0,r.length]}function h(){return null}function s(){return 0}function d(r){return r+1}function g(r){return r-1}function p(r){return function(n,t){return n+ +r(t)}}function y(r){return function(n,t){return n-r(t)}}function b(){function r(r){var n=M,t=r.length;return t&&(E=E.concat(r),z=q(z,M+=t),S.forEach(function(u){u(r,n,t)})),b}function u(r){function u(n,u,e){J=n.map(r),K=T(A(e),0,e),J=t(J,K);var f,o=V(J),i=o[0],a=o[1];for(f=0;i>f;++f)z[K[f]+u]|=P;for(f=a;e>f;++f)z[K[f]+u]|=P;if(!u)return H=J,I=K,X=i,Y=a,void 0;var c=H,l=I,v=0,h=0;for(H=Array(M),I=m(M,M),f=0;u>v&&e>h;++f)c[v]<J[h]?(H[f]=c[v],I[f]=l[v++]):(H[f]=J[h],I[f]=K[h++]+u);for(;u>v;++v,++f)H[f]=c[v],I[f]=l[v];for(;e>h;++h,++f)H[f]=J[h],I[f]=K[h]+u;o=V(H),X=o[0],Y=o[1]}function o(r,n,t){W.forEach(function(r){r(J,K,n,t)}),J=K=null}function a(r){var n,t,u,e=r[0],f=r[1],o=[],i=[];if(X>e)for(n=e,t=Math.min(X,f);t>n;++n)z[u=I[n]]^=P,o.push(u);else if(e>X)for(n=X,t=Math.min(e,Y);t>n;++n)z[u=I[n]]^=P,i.push(u);if(f>Y)for(n=Math.max(e,Y),t=f;t>n;++n)z[u=I[n]]^=P,o.push(u);else if(Y>f)for(n=Math.max(X,f),t=Y;t>n;++n)z[u=I[n]]^=P,i.push(u);return X=e,Y=f,C.forEach(function(r){r(P,o,i)}),L}function b(r){return null==r?j():Array.isArray(r)?R(r):N(r)}function N(r){return a((V=c(w,r))(H))}function R(r){return a((V=l(w,r))(H))}function j(){return a((V=v)(H))}function B(r){for(var n,t=[],u=Y;--u>=X&&r>0;)z[n=I[u]]||(t.push(E[n]),--r);return t}function D(r){for(var n,t=[],u=X;Y>u&&r>0;)z[n=I[u]]||(t.push(E[n]),--r),u++;return t}function F(r){function t(n,t,e,f){function c(){++L===K&&(b=O(b,J<<=1),S=O(S,J),K=k(J))}var l,v,s,d,g,p,y=N,b=m(L,K),A=B,w=F,x=L,U=0,R=0;for(X&&(A=w=h),N=Array(L),L=0,S=x>1?q(S,M):m(M,K),x&&(s=(v=y[0]).key),d=r(n[R]);f>R;){for(v&&d>=s?(g=v,p=s,b[U]=L,(v=y[++U])&&(s=v.key)):(g={key:d,value:w()},p=d),N[L]=g;!(!(p>=d)&&(d>=d||p>=p)||(S[l=t[R]+e]=L,z[l]&Q||(g.value=A(g.value,E[l])),++R>=f));)d=r(n[R]);c()}for(;x>U;)N[b[U]=L]=y[U++],c();if(L>U)for(U=0;e>U;++U)S[U]=b[S[U]];l=C.indexOf(T),L>1?(T=u,V=i):(1===L?(T=o,V=a):(T=h,V=h),S=null),C[l]=T}function u(r,n,t){if(r!==P&&!X){var u,e,f,o;for(u=0,f=n.length;f>u;++u)z[e=n[u]]&Q||(o=N[S[e]],o.value=B(o.value,E[e]));for(u=0,f=t.length;f>u;++u)(z[e=t[u]]&Q)===r&&(o=N[S[e]],o.value=D(o.value,E[e]))}}function o(r,n,t){if(r!==P&&!X){var u,e,f,o=N[0];for(u=0,f=n.length;f>u;++u)z[e=n[u]]&Q||(o.value=B(o.value,E[e]));for(u=0,f=t.length;f>u;++u)(z[e=t[u]]&Q)===r&&(o.value=D(o.value,E[e]))}}function i(){var r,n;for(r=0;L>r;++r)N[r].value=F();for(r=0;M>r;++r)z[r]&Q||(n=N[S[r]],n.value=B(n.value,E[r]))}function a(){var r,n=N[0];for(n.value=F(),r=0;M>r;++r)z[r]&Q||(n.value=B(n.value,E[r]))}function c(){return X&&(V(),X=!1),N}function l(r){var n=R(c(),0,N.length,r);return j.sort(n,0,n.length)}function v(r,n,t){return B=r,D=n,F=t,X=!0,G}function b(){return v(d,g,s)}function A(r){return v(p(r),y(r),s)}function w(r){function n(n){return r(n.value)}return R=f(n),j=e(n),G}function x(){return w(n)}function U(){return L}var N,S,R,j,B,D,F,G={top:l,all:c,reduce:v,reduceCount:b,reduceSum:A,order:w,orderNatural:x,size:U},J=8,K=k(J),L=0,T=h,V=h,X=!0;return arguments.length<1&&(r=n),C.push(T),W.push(t),t(H,I,0,M),b().orderNatural()}function G(){var r=F(h),n=r.all;return delete r.all,delete r.top,delete r.order,delete r.orderNatural,delete r.size,r.value=function(){return n()[0].value},r}var H,I,J,K,L={filter:b,filterExact:N,filterRange:R,filterAll:j,top:B,bottom:D,group:F,groupAll:G},P=1<<x++,Q=~P,T=i(function(r){return J[r]}),V=v,W=[],X=0,Y=0;return S.unshift(u),S.push(o),x>U&&(z=O(z,U<<=1)),u(E,0,M),o(E,0,M),L}function o(){function r(r,n){var t;if(!h)for(t=n;M>t;++t)z[t]||(i=a(i,E[t]))}function n(r,n,t){var u,e,f;if(!h){for(u=0,f=n.length;f>u;++u)z[e=n[u]]||(i=a(i,E[e]));for(u=0,f=t.length;f>u;++u)z[e=t[u]]===r&&(i=c(i,E[e]))}}function t(){var r;for(i=l(),r=0;M>r;++r)z[r]||(i=a(i,E[r]))}function u(r,n,t){return a=r,c=n,l=t,h=!0,v}function e(){return u(d,g,s)}function f(r){return u(p(r),y(r),s)}function o(){return h&&(t(),h=!1),i}var i,a,c,l,v={reduce:u,reduceCount:e,reduceSum:f,value:o},h=!0;return C.push(n),S.push(r),r(E,0,M),e()}function a(){return M}var b={add:r,dimension:u,groupAll:o,size:a},E=[],M=0,x=0,U=8,z=N(0),C=[],S=[];return arguments.length?r(arguments[0]):b}function m(r,n){return(257>n?N:65537>n?C:S)(r)}function A(r){for(var n=m(r,r),t=-1;++t<r;)n[t]=t;return n}function k(r){return 8===r?256:16===r?65536:4294967296}b.version="1.1.3",b.permute=t;var w=b.bisect=u(n);w.by=u;var E=b.heap=e(n);E.by=e;var M=b.heapselect=f(n);M.by=f;var x=b.insertionsort=o(n);x.by=o;var U=b.quicksort=i(n);U.by=i;var z=32,N=a,C=a,S=a,q=n,O=n;"undefined"!=typeof Uint8Array&&(N=function(r){return new Uint8Array(r)},C=function(r){return new Uint16Array(r)},S=function(r){return new Uint32Array(r)},q=function(r,n){var t=new r.constructor(n);return t.set(r),t},O=function(r,n){var t;switch(n){case 16:t=C(r.length);break;case 32:t=S(r.length);break;default:throw Error("invalid array width!")}return t.set(r),t}),r.crossfilter=b})(this);