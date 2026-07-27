import{r as P,j as le}from"./index-Dc31-954.js";import{S as ue,P as ce,W as de,a as H,C as me,b as fe,c as ve,V as S,M as he,T as pe,L as ae}from"./three.module-CSQ8Pvjw.js";const ne=3.05,ie=2.15,we=.62,ge=4.2,Ce=.04,oe=.42,re=.12,Se=(n,c)=>{var o,d,g;const r=(o=n==null?void 0:n.image_variants)==null?void 0:o.webp;return!Array.isArray(r)||!r.length?n==null?void 0:n.imageSrc:((d=r.find(m=>Number(m.width)>=c))==null?void 0:d.src)||((g=r[r.length-1])==null?void 0:g.src)||(n==null?void 0:n.imageSrc)},xe=(n,c,r)=>{const o=Math.min(1,Math.max(0,(r-n)/(c-n)));return o*o*(3-2*o)},ye=`
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
`,Ee=`
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
`,be=({projects:n,activeIndex:c,className:r="",onReady:o,onFailure:d})=>{const g=P.useRef(null),m=P.useRef(c);return P.useEffect(()=>{m.current=c},[c]),P.useEffect(()=>{const f=g.current;if(!f||!n.length)return;let v=!1,x=!1,T=!1,h=null,p=null,C=null,y=!0,W=m.current,E=0;const B=[],G=new Set,M=e=>{v||x||(x=!0,d==null||d(e))},A=new ue,w=new ce(38,1,.1,100),k=new S(.5,.5),N=new S(.5,.5);let D=-.12,X=.04,V=1.2,U=.72,a;try{a=new de({alpha:!0,antialias:!0,powerPreference:window.innerWidth<1024?"low-power":"default"})}catch(e){M(e);return}a.setPixelRatio(Math.min(window.devicePixelRatio||1,window.innerWidth<1024?1.5:2)),a.outputColorSpace=H,a.setClearColor(0,0),a.domElement.setAttribute("aria-hidden","true"),a.domElement.style.width="100%",a.domElement.style.height="100%",a.domElement.style.display="block",f.appendChild(a.domElement);const b=document.createElement("canvas");b.width=8,b.height=8;const F=b.getContext("2d");F.fillStyle="#302b26",F.fillRect(0,0,8,8);const z=new me(b);z.colorSpace=H,z.needsUpdate=!0;const q=new fe(ne,ie,16,24),R=n.map(e=>{const i=new ve({vertexShader:ye,fragmentShader:Ee,transparent:!0,depthWrite:!1,uniforms:{uTexture:{value:z},uImageSize:{value:new S(1.6,1)},uCardSize:{value:new S(ne,ie)},uMouse:{value:new S(.5,.5)},uOpacity:{value:1},uCornerRadius:{value:.13},uActive:{value:0},uAngle:{value:0},uCardX:{value:D},uCardY:{value:X},uScale:{value:1},uRadius:{value:ge},uBend:{value:Ce},uYaw:{value:oe},uPitch:{value:re}}}),t=new he(q,i);return A.add(t),{material:i,mesh:t,project:e}}),Z=()=>{T||!G.has(m.current)||v||(T=!0,a.render(A,w),o==null||o())},J=new pe;J.crossOrigin="anonymous";const se=window.innerWidth<640?480:window.innerWidth<1800?960:1536;R.forEach((e,i)=>{J.load(Se(e.project,se),t=>{if(v){t.dispose();return}t.colorSpace=H,t.minFilter=ae,t.magFilter=ae,t.generateMipmaps=!1,B.push(t),G.add(i),e.material.uniforms.uTexture.value=t,e.material.uniforms.uImageSize.value.set(t.image.width,t.image.height),Z()},void 0,t=>{i===m.current&&!T&&M(t)})});const Y=()=>{if(v)return;const e=Math.max(1,f.clientWidth),i=Math.max(1,f.clientHeight),t=e/i;a.setSize(e,i,!1),w.aspect=t,w.position.set(0,0,t<.9?9.8:t<1.15?9.4:8.8),w.updateProjectionMatrix();const s=window.innerWidth<640,l=window.innerWidth>=1024;D=s?0:t<.9?-.14:-.1,X=s?0:t<.9?.14:.08,V=l?1.28:s?1.22:1.18,U=l?.68:.72,R.forEach(I=>{I.material.uniforms.uYaw.value=s?0:oe,I.material.uniforms.uPitch.value=s?0:re}),a.render(A,w)},K=e=>{const i=f.getBoundingClientRect(),t=(e.clientX-i.left)/Math.max(1,i.width),s=1-(e.clientY-i.top)/Math.max(1,i.height);k.set(Math.min(1,Math.max(0,t)),Math.min(1,Math.max(0,s)))},Q=(e=0)=>{if(h=null,v||x||!y||document.hidden)return;const i=Math.min(E?(e-E)/1e3:1/60,.05);E=e;const t=1-Math.pow(.91,i*60),s=1-Math.pow(.9,i*60);W+=(m.current-W)*t,N.lerp(k,s),R.forEach((l,I)=>{const ee=I-W,_=Math.abs(ee),u=l.material.uniforms,te=1-Math.min(_,1);u.uAngle.value=ee*we,u.uCardX.value=D,u.uCardY.value=X,u.uScale.value=U+(V-U)*te,u.uOpacity.value=1-xe(1.6,2.6,_),u.uActive.value=te,u.uMouse.value.copy(N),l.mesh.visible=u.uOpacity.value>.002,l.mesh.renderOrder=Math.round(100-_*10)}),Z();try{a.render(A,w)}catch(l){M(l);return}h=requestAnimationFrame(Q)},O=()=>{h===null&&!v&&!x&&y&&!document.hidden&&(E=0,h=requestAnimationFrame(Q))},L=()=>{h!==null&&(cancelAnimationFrame(h),h=null)},$=()=>{document.hidden?L():O()},j=e=>{e.preventDefault(),L(),M(new Error("WebGL context lost."))};return window.addEventListener("pointermove",K,{passive:!0}),document.addEventListener("visibilitychange",$),a.domElement.addEventListener("webglcontextlost",j),typeof ResizeObserver=="function"?(p=new ResizeObserver(Y),p.observe(f)):window.addEventListener("resize",Y,{passive:!0}),typeof IntersectionObserver=="function"&&(C=new IntersectionObserver(([e])=>{y=e.isIntersecting,y?O():L()}),C.observe(f)),Y(),O(),()=>{v=!0,L(),p==null||p.disconnect(),C==null||C.disconnect(),window.removeEventListener("pointermove",K),document.removeEventListener("visibilitychange",$),a.domElement.removeEventListener("webglcontextlost",j),p||window.removeEventListener("resize",Y),q.dispose(),z.dispose(),B.forEach(e=>e.dispose()),R.forEach(e=>e.material.dispose()),a.dispose(),a.domElement.remove()}},[d,o,n]),le.jsx("div",{ref:g,className:r})};export{be as default};
