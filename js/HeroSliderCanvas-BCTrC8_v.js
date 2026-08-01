import{r as O,j as he}from"./index-1NLTuCaY.js";import{g as pe,n as we,W as ge,e as q,N as Ce,C as ye,q as Se,y as xe,V as S,l as Me,z as Ee,J as Ae,K as be}from"./three.module-Br0MWNdZ.js";const ue=3.05,ce=2.15,ze=.5,Re=4.8,Te=.03,de=.28,me=.08,Ie=(i,d)=>{var o,m,C;const l=(o=i==null?void 0:i.image_variants)==null?void 0:o.webp;return!Array.isArray(l)||!l.length?i==null?void 0:i.imageSrc:((m=l.find(r=>Number(r.width)>=d))==null?void 0:m.src)||((C=l[l.length-1])==null?void 0:C.src)||(i==null?void 0:i.imageSrc)},Le=(i,d,l)=>{const o=Math.min(1,Math.max(0,(l-i)/(d-i)));return o*o*(3-2*o)},Ye=`
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
`,Pe=`
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
    #include <colorspace_fragment>
  }
`,Ue=({projects:i,activeIndex:d,className:l="",onReady:o,onFailure:m})=>{const C=O.useRef(null),r=O.useRef(d);return O.useEffect(()=>{r.current=d},[d]),O.useEffect(()=>{const f=C.current;if(!f||!i.length)return;let v=!1,x=!1,U=!1,h=null,p=null,y=null,M=null,E=null,A=!0,_=r.current,b=0;const F=[],W=new Set,z=new Set,R=e=>{v||x||(x=!0,m==null||m(e))},T=new pe,w=new we(38,1,.1,100),V=new S(.5,.5),J=new S(.5,.5);let k=-.12,H=.04,K=1.2,B=.72,Z=0,Q=0,n;try{n=new ge({alpha:!0,antialias:!0,powerPreference:window.innerWidth<1024?"low-power":"default"})}catch(e){R(e);return}n.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),n.outputColorSpace=q,n.toneMapping=Ce,n.setClearColor(0,0),n.domElement.setAttribute("aria-hidden","true"),n.domElement.style.width="100%",n.domElement.style.height="100%",n.domElement.style.display="block",f.appendChild(n.domElement);const I=document.createElement("canvas");I.width=8,I.height=8;const $=I.getContext("2d");$.fillStyle="#302b26",$.fillRect(0,0,8,8);const L=new ye(I);L.colorSpace=q,L.needsUpdate=!0;const j=new Se(ue,ce,16,24),g=i.map(e=>{const a=new xe({vertexShader:Ye,fragmentShader:Pe,transparent:!0,depthWrite:!1,uniforms:{uTexture:{value:L},uImageSize:{value:new S(1.6,1)},uCardSize:{value:new S(ue,ce)},uMouse:{value:new S(.5,.5)},uOpacity:{value:1},uCornerRadius:{value:.13},uActive:{value:0},uAngle:{value:0},uCardX:{value:k},uCardY:{value:H},uScale:{value:1},uRadius:{value:Re},uBend:{value:Te},uYaw:{value:de},uPitch:{value:me}}}),t=new Me(j,a);return T.add(t),{material:a,mesh:t,project:e}}),ee=()=>{U||!W.has(r.current)||v||(U=!0,n.render(T,w),o==null||o())},te=new Ee;te.crossOrigin="anonymous";const fe=1536,ve=Math.min(8,n.capabilities.getMaxAnisotropy()),ae=e=>{const a=g[e];!a||W.has(e)||z.has(e)||(z.add(e),te.load(Ie(a.project,fe),t=>{if(z.delete(e),v){t.dispose();return}t.colorSpace=q,t.minFilter=Ae,t.magFilter=be,t.anisotropy=ve,t.generateMipmaps=!0,F.push(t),W.add(e),a.material.uniforms.uTexture.value=t,a.material.uniforms.uImageSize.value.set(t.image.width,t.image.height),ee()},void 0,t=>{z.delete(e),e===r.current&&!U&&R(t)}))};[r.current,r.current-1,r.current+1].filter((e,a,t)=>e>=0&&e<g.length&&t.indexOf(e)===a).forEach(ae);const ne=()=>{g.forEach((e,a)=>ae(a))};typeof window.requestIdleCallback=="function"?(E="idle",M=window.requestIdleCallback(ne,{timeout:1600})):(E="timeout",M=window.setTimeout(ne,1200));const Y=()=>{if(v)return;const e=Math.max(1,f.clientWidth),a=Math.max(1,f.clientHeight),t=e/a;n.setSize(e,a,!1),w.aspect=t,w.position.set(0,0,t<.9?9.8:t<1.15?9.4:8.8),w.updateProjectionMatrix();const u=window.innerWidth<640,s=window.innerWidth>=1024;k=u?.18:t<.9?-.24:-.18,H=u?.08:t<.9?.12:.04,Z=s?.56:u?.32:.26,Q=s?.14:u?.1:.08,K=s?1.34:u?1.2:1.22,B=s?.76:.72,g.forEach(X=>{X.material.uniforms.uYaw.value=de,X.material.uniforms.uPitch.value=me}),n.render(T,w)},ie=e=>{const a=f.getBoundingClientRect(),t=(e.clientX-a.left)/Math.max(1,a.width),u=1-(e.clientY-a.top)/Math.max(1,a.height);V.set(Math.min(1,Math.max(0,t)),Math.min(1,Math.max(0,u)))},oe=(e=0)=>{if(h=null,v||x||!A||document.hidden)return;const a=Math.min(b?(e-b)/1e3:1/60,.05);b=e;const t=1-Math.pow(.91,a*60),u=1-Math.pow(.9,a*60);_+=(r.current-_)*t,J.lerp(V,u),g.forEach((s,X)=>{const D=X-_,N=Math.abs(D),c=s.material.uniforms,le=1-Math.min(N,1);c.uAngle.value=D*ze,c.uCardX.value=k+D*Z,c.uCardY.value=H+D*Q,c.uScale.value=B+(K-B)*le,c.uOpacity.value=1-Le(1.6,2.6,N),c.uActive.value=le,c.uMouse.value.copy(J),s.mesh.visible=c.uOpacity.value>.002,s.mesh.renderOrder=Math.round(100-N*10)}),ee();try{n.render(T,w)}catch(s){R(s);return}h=requestAnimationFrame(oe)},G=()=>{h===null&&!v&&!x&&A&&!document.hidden&&(b=0,h=requestAnimationFrame(oe))},P=()=>{h!==null&&(cancelAnimationFrame(h),h=null)},re=()=>{document.hidden?P():G()},se=e=>{e.preventDefault(),P(),R(new Error("WebGL context lost."))};return window.addEventListener("pointermove",ie,{passive:!0}),document.addEventListener("visibilitychange",re),n.domElement.addEventListener("webglcontextlost",se),typeof ResizeObserver=="function"?(p=new ResizeObserver(Y),p.observe(f)):window.addEventListener("resize",Y,{passive:!0}),typeof IntersectionObserver=="function"&&(y=new IntersectionObserver(([e])=>{A=e.isIntersecting,A?G():P()}),y.observe(f)),Y(),G(),()=>{var e;v=!0,P(),p==null||p.disconnect(),y==null||y.disconnect(),E==="idle"?(e=window.cancelIdleCallback)==null||e.call(window,M):E==="timeout"&&window.clearTimeout(M),window.removeEventListener("pointermove",ie),document.removeEventListener("visibilitychange",re),n.domElement.removeEventListener("webglcontextlost",se),p||window.removeEventListener("resize",Y),j.dispose(),L.dispose(),F.forEach(a=>a.dispose()),g.forEach(a=>a.material.dispose()),n.dispose(),n.domElement.remove()}},[m,o,i]),he.jsx("div",{ref:C,className:l})};export{Ue as default};
