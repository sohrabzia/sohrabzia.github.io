import{r as O,j as ve}from"./index-C0IqRboy.js";import{g as he,n as pe,W as we,e as N,N as ge,C as Ce,q as ye,y as Se,V as x,l as xe,z as Me,J as Ee,K as Ae}from"./three.module-Br0MWNdZ.js";const le=3.05,ue=2.15,be=.5,ze=4.8,Re=.03,ce=.28,de=.08,Te=(i,d)=>{var o,m,y;const u=(o=i==null?void 0:i.image_variants)==null?void 0:o.webp;return!Array.isArray(u)||!u.length?i==null?void 0:i.imageSrc:((m=u.find(l=>Number(l.width)>=d))==null?void 0:m.src)||((y=u[u.length-1])==null?void 0:y.src)||(i==null?void 0:i.imageSrc)},Ie=(i,d,u)=>{const o=Math.min(1,Math.max(0,(u-i)/(d-i)));return o*o*(3-2*o)},Le=`
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
`,Ye=`
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
`,Oe=({projects:i,activeIndex:d,className:u="",onReady:o,onFailure:m})=>{const y=O.useRef(null),l=O.useRef(d);return O.useEffect(()=>{l.current=d},[d]),O.useEffect(()=>{const f=y.current;if(!f||!i.length)return;let v=!1,M=!1,U=!1,h=null,p=null,S=null,E=null,A=null,b=!0,z=l.current,R=0;const q=[],_=new Set,T=new Set,I=e=>{v||M||(M=!0,m==null||m(e))},L=new he,w=new pe(38,1,.1,100),F=new x(.5,.5),W=new x(.5,.5);let k=-.12,H=.04,V=1.2,B=.72,J=0,K=0,n;try{n=new we({alpha:!0,antialias:!0,powerPreference:window.innerWidth<1024?"low-power":"default"})}catch(e){I(e);return}n.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),n.outputColorSpace=N,n.toneMapping=ge,n.setClearColor(0,0),n.domElement.setAttribute("aria-hidden","true"),n.domElement.style.width="100%",n.domElement.style.height="100%",n.domElement.style.display="block",f.appendChild(n.domElement);const Y=document.createElement("canvas");Y.width=8,Y.height=8;const Z=Y.getContext("2d");Z.fillStyle="#302b26",Z.fillRect(0,0,8,8);const P=new Ce(Y);P.colorSpace=N,P.needsUpdate=!0;const Q=new ye(le,ue,16,24),g=i.map(e=>{const a=new Se({vertexShader:Le,fragmentShader:Ye,transparent:!0,depthWrite:!1,uniforms:{uTexture:{value:P},uImageSize:{value:new x(1.6,1)},uCardSize:{value:new x(le,ue)},uMouse:{value:new x(.5,.5)},uOpacity:{value:1},uCornerRadius:{value:.13},uActive:{value:0},uAngle:{value:0},uCardX:{value:k},uCardY:{value:H},uScale:{value:1},uRadius:{value:ze},uBend:{value:Re},uYaw:{value:ce},uPitch:{value:de}}}),t=new xe(Q,a);return L.add(t),{material:a,mesh:t,project:e}}),$=()=>{U||!_.has(l.current)||v||(U=!0,n.render(L,w),o==null||o())},j=new Me;j.crossOrigin="anonymous";const me=960,fe=Math.min(8,n.capabilities.getMaxAnisotropy()),ee=e=>{const a=g[e];!a||_.has(e)||T.has(e)||(T.add(e),j.load(Te(a.project,me),t=>{if(T.delete(e),v){t.dispose();return}t.colorSpace=N,t.minFilter=Ee,t.magFilter=Ae,t.anisotropy=fe,t.generateMipmaps=!0,q.push(t),_.add(e),a.material.uniforms.uTexture.value=t,a.material.uniforms.uImageSize.value.set(t.image.width,t.image.height),$()},void 0,t=>{T.delete(e),e===l.current&&!U&&I(t)}))};[l.current,l.current-1,l.current+1].filter((e,a,t)=>e>=0&&e<g.length&&t.indexOf(e)===a).forEach(ee);const te=()=>{g.forEach((e,a)=>ee(a))};typeof window.requestIdleCallback=="function"?(A="idle",E=window.requestIdleCallback(te,{timeout:1600})):(A="timeout",E=window.setTimeout(te,1200));const ae=(e,a)=>{g.forEach((t,r)=>{const s=r-e,C=Math.abs(s),c=t.material.uniforms,se=1-Math.min(C,1);c.uAngle.value=s*be,c.uCardX.value=k+s*J,c.uCardY.value=H+s*K,c.uScale.value=B+(V-B)*se,c.uOpacity.value=1-Ie(1.6,2.6,C),c.uActive.value=se,c.uMouse.value.copy(a),t.mesh.visible=c.uOpacity.value>.002,t.mesh.renderOrder=Math.round(100-C*10)})},X=()=>{if(v)return;const e=Math.max(1,f.clientWidth),a=Math.max(1,f.clientHeight),t=e/a;n.setSize(e,a,!1),w.aspect=t,w.position.set(0,0,t<.9?9.8:t<1.15?9.4:8.8),w.updateProjectionMatrix();const r=window.innerWidth<640,s=window.innerWidth>=1024;k=r?.18:t<.9?-.24:-.18,H=r?.08:t<.9?.12:.04,J=s?.56:r?.32:.26,K=s?.14:r?.1:.08,V=s?1.34:r?1.2:1.22,B=s?.76:.72,g.forEach(C=>{C.material.uniforms.uYaw.value=ce,C.material.uniforms.uPitch.value=de}),ae(z,W),n.render(L,w)},ne=e=>{const a=f.getBoundingClientRect(),t=(e.clientX-a.left)/Math.max(1,a.width),r=1-(e.clientY-a.top)/Math.max(1,a.height);F.set(Math.min(1,Math.max(0,t)),Math.min(1,Math.max(0,r)))},ie=(e=0)=>{if(h=null,v||M||!b||document.hidden)return;const a=Math.min(R?(e-R)/1e3:1/60,.05);R=e;const t=1-Math.pow(.91,a*60),r=1-Math.pow(.9,a*60);z+=(l.current-z)*t,W.lerp(F,r),ae(z,W),$();try{n.render(L,w)}catch(s){I(s);return}h=requestAnimationFrame(ie)},G=()=>{h===null&&!v&&!M&&b&&!document.hidden&&(R=0,h=requestAnimationFrame(ie))},D=()=>{h!==null&&(cancelAnimationFrame(h),h=null)},oe=()=>{document.hidden?D():G()},re=e=>{e.preventDefault(),D(),I(new Error("WebGL context lost."))};return window.addEventListener("pointermove",ne,{passive:!0}),document.addEventListener("visibilitychange",oe),n.domElement.addEventListener("webglcontextlost",re),typeof ResizeObserver=="function"?(p=new ResizeObserver(X),p.observe(f)):window.addEventListener("resize",X,{passive:!0}),typeof IntersectionObserver=="function"&&(S=new IntersectionObserver(([e])=>{b=e.isIntersecting,b?G():D()}),S.observe(f)),X(),G(),()=>{var e;v=!0,D(),p==null||p.disconnect(),S==null||S.disconnect(),A==="idle"?(e=window.cancelIdleCallback)==null||e.call(window,E):A==="timeout"&&window.clearTimeout(E),window.removeEventListener("pointermove",ne),document.removeEventListener("visibilitychange",oe),n.domElement.removeEventListener("webglcontextlost",re),p||window.removeEventListener("resize",X),Q.dispose(),P.dispose(),q.forEach(a=>a.dispose()),g.forEach(a=>a.material.dispose()),n.dispose(),n.domElement.remove()}},[m,o,i]),ve.jsx("div",{ref:y,className:u})};export{Oe as default};
