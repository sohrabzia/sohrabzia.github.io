import{r as D,j as he}from"./index-m_BN-Rgx.js";import{S as pe,P as we,W as ge,a as N,C as Ce,b as Se,c as ye,V as y,M as xe,T as Ee,L as ue}from"./three.module-CSQ8Pvjw.js";const ce=3.05,de=2.15,Me=.5,be=4.8,Ae=.03,me=.28,fe=.08,Re=(i,d)=>{var o,m,C;const u=(o=i==null?void 0:i.image_variants)==null?void 0:o.webp;return!Array.isArray(u)||!u.length?i==null?void 0:i.imageSrc:((m=u.find(s=>Number(s.width)>=d))==null?void 0:m.src)||((C=u[u.length-1])==null?void 0:C.src)||(i==null?void 0:i.imageSrc)},ze=(i,d,u)=>{const o=Math.min(1,Math.max(0,(u-i)/(d-i)));return o*o*(3-2*o)},Te=`
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
`,Ie=`
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
`,We=({projects:i,activeIndex:d,className:u="",onReady:o,onFailure:m})=>{const C=D.useRef(null),s=D.useRef(d);return D.useEffect(()=>{s.current=d},[d]),D.useEffect(()=>{const f=C.current;if(!f||!i.length)return;let v=!1,x=!1,O=!1,h=null,p=null,S=null,E=null,M=null,b=!0,U=s.current,A=0;const V=[],_=new Set,R=new Set,z=e=>{v||x||(x=!0,m==null||m(e))},T=new pe,w=new we(38,1,.1,100),F=new y(.5,.5),Z=new y(.5,.5);let k=-.12,H=.04,J=1.2,B=.72,K=0,Q=0,n;try{n=new ge({alpha:!0,antialias:!0,powerPreference:window.innerWidth<1024?"low-power":"default"})}catch(e){z(e);return}n.setPixelRatio(Math.min(window.devicePixelRatio||1,window.innerWidth<1024?1.5:2)),n.outputColorSpace=N,n.setClearColor(0,0),n.domElement.setAttribute("aria-hidden","true"),n.domElement.style.width="100%",n.domElement.style.height="100%",n.domElement.style.display="block",f.appendChild(n.domElement);const I=document.createElement("canvas");I.width=8,I.height=8;const $=I.getContext("2d");$.fillStyle="#302b26",$.fillRect(0,0,8,8);const Y=new Ce(I);Y.colorSpace=N,Y.needsUpdate=!0;const j=new Se(ce,de,16,24),g=i.map(e=>{const t=new ye({vertexShader:Te,fragmentShader:Ie,transparent:!0,depthWrite:!1,uniforms:{uTexture:{value:Y},uImageSize:{value:new y(1.6,1)},uCardSize:{value:new y(ce,de)},uMouse:{value:new y(.5,.5)},uOpacity:{value:1},uCornerRadius:{value:.13},uActive:{value:0},uAngle:{value:0},uCardX:{value:k},uCardY:{value:H},uScale:{value:1},uRadius:{value:be},uBend:{value:Ae},uYaw:{value:me},uPitch:{value:fe}}}),a=new xe(j,t);return T.add(a),{material:t,mesh:a,project:e}}),ee=()=>{O||!_.has(s.current)||v||(O=!0,n.render(T,w),o==null||o())},te=new Ee;te.crossOrigin="anonymous";const ve=window.innerWidth<640?480:window.innerWidth<1800?960:1536,ae=e=>{const t=g[e];!t||_.has(e)||R.has(e)||(R.add(e),te.load(Re(t.project,ve),a=>{if(R.delete(e),v){a.dispose();return}a.colorSpace=N,a.minFilter=ue,a.magFilter=ue,a.generateMipmaps=!1,V.push(a),_.add(e),t.material.uniforms.uTexture.value=a,t.material.uniforms.uImageSize.value.set(a.image.width,a.image.height),ee()},void 0,a=>{R.delete(e),e===s.current&&!O&&z(a)}))};[s.current,s.current-1,s.current+1].filter((e,t,a)=>e>=0&&e<g.length&&a.indexOf(e)===t).forEach(ae);const ne=()=>{g.forEach((e,t)=>ae(t))};typeof window.requestIdleCallback=="function"?(M="idle",E=window.requestIdleCallback(ne,{timeout:1600})):(M="timeout",E=window.setTimeout(ne,1200));const L=()=>{if(v)return;const e=Math.max(1,f.clientWidth),t=Math.max(1,f.clientHeight),a=e/t;n.setSize(e,t,!1),w.aspect=a,w.position.set(0,0,a<.9?9.8:a<1.15?9.4:8.8),w.updateProjectionMatrix();const r=window.innerWidth<640,l=window.innerWidth>=1024;k=r?-.08:a<.9?-.24:-.18,H=r?.16:a<.9?.12:.04,K=l?.56:r?0:.26,Q=l?.14:r?0:.08,J=l?1.34:r?1.2:1.22,B=l?.76:.72,g.forEach(W=>{W.material.uniforms.uYaw.value=r?0:me,W.material.uniforms.uPitch.value=r?0:fe}),n.render(T,w)},ie=e=>{const t=f.getBoundingClientRect(),a=(e.clientX-t.left)/Math.max(1,t.width),r=1-(e.clientY-t.top)/Math.max(1,t.height);F.set(Math.min(1,Math.max(0,a)),Math.min(1,Math.max(0,r)))},oe=(e=0)=>{if(h=null,v||x||!b||document.hidden)return;const t=Math.min(A?(e-A)/1e3:1/60,.05);A=e;const a=1-Math.pow(.91,t*60),r=1-Math.pow(.9,t*60);U+=(s.current-U)*a,Z.lerp(F,r),g.forEach((l,W)=>{const X=W-U,q=Math.abs(X),c=l.material.uniforms,le=1-Math.min(q,1);c.uAngle.value=X*Me,c.uCardX.value=k+X*K,c.uCardY.value=H+X*Q,c.uScale.value=B+(J-B)*le,c.uOpacity.value=1-ze(1.6,2.6,q),c.uActive.value=le,c.uMouse.value.copy(Z),l.mesh.visible=c.uOpacity.value>.002,l.mesh.renderOrder=Math.round(100-q*10)}),ee();try{n.render(T,w)}catch(l){z(l);return}h=requestAnimationFrame(oe)},G=()=>{h===null&&!v&&!x&&b&&!document.hidden&&(A=0,h=requestAnimationFrame(oe))},P=()=>{h!==null&&(cancelAnimationFrame(h),h=null)},re=()=>{document.hidden?P():G()},se=e=>{e.preventDefault(),P(),z(new Error("WebGL context lost."))};return window.addEventListener("pointermove",ie,{passive:!0}),document.addEventListener("visibilitychange",re),n.domElement.addEventListener("webglcontextlost",se),typeof ResizeObserver=="function"?(p=new ResizeObserver(L),p.observe(f)):window.addEventListener("resize",L,{passive:!0}),typeof IntersectionObserver=="function"&&(S=new IntersectionObserver(([e])=>{b=e.isIntersecting,b?G():P()}),S.observe(f)),L(),G(),()=>{var e;v=!0,P(),p==null||p.disconnect(),S==null||S.disconnect(),M==="idle"?(e=window.cancelIdleCallback)==null||e.call(window,E):M==="timeout"&&window.clearTimeout(E),window.removeEventListener("pointermove",ie),document.removeEventListener("visibilitychange",re),n.domElement.removeEventListener("webglcontextlost",se),p||window.removeEventListener("resize",L),j.dispose(),Y.dispose(),V.forEach(t=>t.dispose()),g.forEach(t=>t.material.dispose()),n.dispose(),n.domElement.remove()}},[m,o,i]),he.jsx("div",{ref:C,className:u})};export{We as default};
