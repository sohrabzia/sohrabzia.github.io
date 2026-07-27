import{r as P,j as se}from"./index-M5XK5l5O.js";import{S as le,P as ue,W as ce,a as H,C as de,b as me,c as fe,V as C,M as ve,T as he,L as ae}from"./three.module-CSQ8Pvjw.js";const ne=3.05,ie=2.15,pe=.62,we=4.2,ge=.04,oe=.42,re=.12,Ce=n=>{var v,r,c;const o=(v=n==null?void 0:n.image_variants)==null?void 0:v.webp;return!Array.isArray(o)||!o.length?n==null?void 0:n.imageSrc:((r=o.find(S=>Number(S.width)>=960))==null?void 0:r.src)||((c=o[o.length-1])==null?void 0:c.src)||(n==null?void 0:n.imageSrc)},Se=(n,o,v)=>{const r=Math.min(1,Math.max(0,(v-n)/(o-n)));return r*r*(3-2*r)},xe=`
  uniform float uAngle;
  uniform float uCardX;
  uniform float uCardY;
  uniform float uScale;
  uniform float uRadius;
  uniform float uBend;
  uniform float uYaw;
  uniform float uPitch;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 point = position;
    point.xy *= uScale;

    float angle = uAngle - point.y / uRadius;
    float x = uCardX + point.x;
    float y = uCardY - uRadius * sin(angle);
    float z = uRadius * cos(angle) - uRadius;
    z -= uBend * point.x * point.x;

    float yawCos = cos(uYaw);
    float yawSin = sin(uYaw);
    float deltaX = x - uCardX;
    float yawX = uCardX + deltaX * yawCos - z * yawSin;
    z = deltaX * yawSin + z * yawCos;
    x = yawX;

    float pitchCos = cos(uPitch);
    float pitchSin = sin(uPitch);
    float deltaY = y - uCardY;
    float pitchY = uCardY + deltaY * pitchCos - z * pitchSin;
    z = deltaY * pitchSin + z * pitchCos;
    y = pitchY;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(x, y, z, 1.0);
  }
`,ye=`
  precision highp float;
  uniform sampler2D uTexture;
  uniform vec2 uImageSize;
  uniform vec2 uCardSize;
  uniform vec2 uMouse;
  uniform float uOpacity;
  uniform float uCornerRadius;
  uniform float uActive;
  varying vec2 vUv;

  void main() {
    float imageAspect = uImageSize.x / uImageSize.y;
    float cardAspect = uCardSize.x / uCardSize.y;
    vec2 coverScale = vec2(1.0);

    if (imageAspect > cardAspect) {
      coverScale.x = cardAspect / imageAspect;
    } else {
      coverScale.y = imageAspect / cardAspect;
    }

    float zoom = 1.0 + 0.12 * uActive;
    vec2 parallax = (uMouse - 0.5) * 0.075 * uActive;
    vec2 textureUv = (vUv - 0.5) * coverScale / zoom + 0.5 + parallax;
    vec3 color = texture2D(uTexture, textureUv).rgb;

    vec2 point = (vUv - 0.5) * uCardSize;
    vec2 bounds = uCardSize * 0.5 - uCornerRadius;
    float distanceToEdge =
      length(max(abs(point) - bounds, 0.0)) - uCornerRadius;
    float antialias = fwidth(distanceToEdge) + 0.0006;
    float alpha =
      (1.0 - smoothstep(0.0, antialias, distanceToEdge)) * uOpacity;

    if (alpha <= 0.002) discard;
    gl_FragColor = vec4(color, alpha);
  }
`,Ae=({projects:n,activeIndex:o,className:v="",onReady:r,onFailure:c})=>{const S=P.useRef(null),w=P.useRef(o);return P.useEffect(()=>{w.current=o},[o]),P.useEffect(()=>{const d=S.current;if(!d||!n.length)return;let m=!1,x=!1,T=!1,f=null,h=null,g=null,y=!0,D=w.current,E=0;const B=[],G=new Set,M=e=>{m||x||(x=!0,c==null||c(e))},A=new le,p=new ue(38,1,.1,100),k=new C(.5,.5),N=new C(.5,.5);let X=-.12,U=.04,V=1.2,O=.72,a;try{a=new ce({alpha:!0,antialias:!0,powerPreference:window.innerWidth<1024?"low-power":"default"})}catch(e){M(e);return}a.setPixelRatio(Math.min(window.devicePixelRatio||1,window.innerWidth<1024?1.5:2)),a.outputColorSpace=H,a.setClearColor(0,0),a.domElement.setAttribute("aria-hidden","true"),a.domElement.style.width="100%",a.domElement.style.height="100%",a.domElement.style.display="block",d.appendChild(a.domElement);const b=document.createElement("canvas");b.width=8,b.height=8;const F=b.getContext("2d");F.fillStyle="#302b26",F.fillRect(0,0,8,8);const z=new de(b);z.colorSpace=H,z.needsUpdate=!0;const q=new me(ne,ie,16,24),R=n.map(e=>{const i=new fe({vertexShader:xe,fragmentShader:ye,transparent:!0,depthWrite:!1,uniforms:{uTexture:{value:z},uImageSize:{value:new C(1.6,1)},uCardSize:{value:new C(ne,ie)},uMouse:{value:new C(.5,.5)},uOpacity:{value:1},uCornerRadius:{value:.13},uActive:{value:0},uAngle:{value:0},uCardX:{value:X},uCardY:{value:U},uScale:{value:1},uRadius:{value:we},uBend:{value:ge},uYaw:{value:oe},uPitch:{value:re}}}),t=new ve(q,i);return A.add(t),{material:i,mesh:t,project:e}}),Z=()=>{T||!G.has(w.current)||m||(T=!0,a.render(A,p),r==null||r())},J=new he;J.crossOrigin="anonymous",R.forEach((e,i)=>{J.load(Ce(e.project),t=>{if(m){t.dispose();return}t.colorSpace=H,t.minFilter=ae,t.magFilter=ae,t.generateMipmaps=!1,B.push(t),G.add(i),e.material.uniforms.uTexture.value=t,e.material.uniforms.uImageSize.value.set(t.image.width,t.image.height),Z()},void 0,t=>{i===w.current&&!T&&M(t)})});const Y=()=>{if(m)return;const e=Math.max(1,d.clientWidth),i=Math.max(1,d.clientHeight),t=e/i;a.setSize(e,i,!1),p.aspect=t,p.position.set(0,0,t<.9?9.8:t<1.15?9.4:8.8),p.updateProjectionMatrix();const s=window.innerWidth<640,l=window.innerWidth>=1024;X=s?0:t<.9?-.14:-.1,U=s?0:t<.9?.14:.08,V=l?1.28:s?1.22:1.18,O=l?.68:.72,R.forEach(I=>{I.material.uniforms.uYaw.value=s?0:oe,I.material.uniforms.uPitch.value=s?0:re}),a.render(A,p)},K=e=>{const i=d.getBoundingClientRect(),t=(e.clientX-i.left)/Math.max(1,i.width),s=1-(e.clientY-i.top)/Math.max(1,i.height);k.set(Math.min(1,Math.max(0,t)),Math.min(1,Math.max(0,s)))},Q=(e=0)=>{if(f=null,m||x||!y||document.hidden)return;const i=Math.min(E?(e-E)/1e3:1/60,.05);E=e;const t=1-Math.pow(.91,i*60),s=1-Math.pow(.9,i*60);D+=(w.current-D)*t,N.lerp(k,s),R.forEach((l,I)=>{const ee=I-D,_=Math.abs(ee),u=l.material.uniforms,te=1-Math.min(_,1);u.uAngle.value=ee*pe,u.uCardX.value=X,u.uCardY.value=U,u.uScale.value=O+(V-O)*te,u.uOpacity.value=1-Se(1.6,2.6,_),u.uActive.value=te,u.uMouse.value.copy(N),l.mesh.visible=u.uOpacity.value>.002,l.mesh.renderOrder=Math.round(100-_*10)}),Z();try{a.render(A,p)}catch(l){M(l);return}f=requestAnimationFrame(Q)},W=()=>{f===null&&!m&&!x&&y&&!document.hidden&&(E=0,f=requestAnimationFrame(Q))},L=()=>{f!==null&&(cancelAnimationFrame(f),f=null)},$=()=>{document.hidden?L():W()},j=e=>{e.preventDefault(),L(),M(new Error("WebGL context lost."))};return window.addEventListener("pointermove",K,{passive:!0}),document.addEventListener("visibilitychange",$),a.domElement.addEventListener("webglcontextlost",j),typeof ResizeObserver=="function"?(h=new ResizeObserver(Y),h.observe(d)):window.addEventListener("resize",Y,{passive:!0}),typeof IntersectionObserver=="function"&&(g=new IntersectionObserver(([e])=>{y=e.isIntersecting,y?W():L()}),g.observe(d)),Y(),W(),()=>{m=!0,L(),h==null||h.disconnect(),g==null||g.disconnect(),window.removeEventListener("pointermove",K),document.removeEventListener("visibilitychange",$),a.domElement.removeEventListener("webglcontextlost",j),h||window.removeEventListener("resize",Y),q.dispose(),z.dispose(),B.forEach(e=>e.dispose()),R.forEach(e=>e.material.dispose()),a.dispose(),a.domElement.remove()}},[c,r,n]),se.jsx("div",{ref:S,className:v})};export{Ae as default};
