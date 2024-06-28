"use strict";(self.webpackChunkimagery_explorer_apps=self.webpackChunkimagery_explorer_apps||[]).push([[1208],{45584:function(e,t,r){r.d(t,{D:function(){return G},b:function(){return z}});var n=r(95650),i=r(57218),o=r(35031),a=r(5885),s=r(4731),l=r(99163),c=r(7792),u=r(91636),d=r(40433),h=r(82082),f=r(6502),m=r(78549),p=r(5664),v=r(74312),g=r(3417),_=r(11827),x=r(99660),T=r(58749),b=r(73393),y=r(2833),S=r(89585),A=r(3864),E=r(59181),w=r(30228),C=r(91024),M=r(44391),O=r(49745),R=r(10938),I=r(71354),P=r(43036),N=r(63371),H=r(24603),L=r(23410),F=r(3961),D=r(15176),B=r(42842),U=r(21414);function z(e){const t=new F.kG,{vertex:r,fragment:z,varyings:G}=t;if((0,I.Sv)(r,e),t.include(u.f),G.add("vpos","vec3"),t.include(C.k,e),t.include(l.fQ,e),t.include(p.L,e),t.include(w.av,e),e.output===o.H_.Color||e.output===o.H_.Alpha){t.include(w.NI,e),t.include(w.R5,e),t.include(w.jF,e),t.include(w.DT,e),(0,I.hY)(r,e),t.include(c.O,e),t.include(s.w,e);const o=e.normalType===c.r.Attribute||e.normalType===c.r.Compressed;o&&e.offsetBackfaces&&t.include(i.w),t.include(g.Q,e),t.include(m.Bb,e),e.instancedColor&&t.attributes.add(U.T.INSTANCECOLOR,"vec4"),G.add("vPositionLocal","vec3"),t.include(h.D,e),t.include(n.qj,e),t.include(d.R,e),t.include(f.c,e),r.uniforms.add(new N.N("externalColor",(e=>e.externalColor))),G.add("vcolorExt","vec4"),e.multipassEnabled&&G.add("depth","float"),r.code.add(L.H`
      void main(void) {
        forwardNormalizedVertexColor();
        vcolorExt = externalColor;
        ${e.instancedColor?"vcolorExt *= instanceColor * 0.003921568627451;":""}
        vcolorExt *= vvColor();
        vcolorExt *= getSymbolColor();
        forwardColorMixMode();

        if (vcolorExt.a < ${L.H.float(M.b)}) {
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
        } else {
          vpos = getVertexInLocalOriginSpace();
          vPositionLocal = vpos - view[3].xyz;
          vpos = subtractOrigin(vpos);
          ${o?L.H`vNormalWorld = dpNormal(vvLocalNormal(normalModel()));`:""}
          vpos = addVerticalOffset(vpos, localOrigin);
          ${e.hasVertexTangents?"vTangent = dpTransformVertexTangent(tangent);":""}
          gl_Position = transformPosition(proj, view, vpos);
          ${o&&e.offsetBackfaces?"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);":""}
        }

        ${e.multipassEnabled?"depth = (view * vec4(vpos, 1.0)).z;":""}
        forwardLinearDepth();
        forwardTextureCoordinates();
        forwardColorUV();
        forwardNormalUV();
        forwardEmissiveUV();
        forwardOcclusionUV();
        forwardMetallicRoughnessUV();
      }
    `)}switch(e.output){case o.H_.Alpha:t.include(a.f5,e),t.include(O.z,e),t.include(b.l,e),z.uniforms.add(new H.p("opacity",(e=>e.opacity)),new H.p("layerOpacity",(e=>e.layerOpacity))),e.hasColorTexture&&z.uniforms.add(new D.A("tex",(e=>e.texture))),z.include(R.y),z.code.add(L.H`
      void main() {
        discardBySlice(vpos);
        ${e.multipassEnabled?"terrainDepthTest(depth);":""}
        ${e.hasColorTexture?L.H`
                vec4 texColor = texture(tex, ${e.hasColorTextureTransform?L.H`colorUV`:L.H`vuv0`});
                ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
                discardOrAdjustAlpha(texColor);`:L.H`vec4 texColor = vec4(1.0);`}
        ${e.hasVertexColors?L.H`float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:L.H`float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}
        fragColor = vec4(opacity_);
      }
    `);break;case o.H_.Color:t.include(a.f5,e),t.include(x.XP,e),t.include(_.K,e),t.include(O.z,e),t.include(e.instancedDoublePrecision?E.hb:E.XE,e),t.include(b.l,e),(0,I.hY)(z,e),z.uniforms.add(r.uniforms.get("localOrigin"),new P.J("ambient",(e=>e.ambient)),new P.J("diffuse",(e=>e.diffuse)),new H.p("opacity",(e=>e.opacity)),new H.p("layerOpacity",(e=>e.layerOpacity))),e.hasColorTexture&&z.uniforms.add(new D.A("tex",(e=>e.texture))),t.include(A.jV,e),t.include(S.T,e),z.include(R.y),t.include(y.k,e),(0,x.PN)(z),(0,x.sC)(z),(0,T.F1)(z),z.code.add(L.H`
      void main() {
        discardBySlice(vpos);
        ${e.multipassEnabled?"terrainDepthTest(depth);":""}
        ${e.hasColorTexture?L.H`
                vec4 texColor = texture(tex, ${e.hasColorTextureTransform?L.H`colorUV`:L.H`vuv0`});
                ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
                discardOrAdjustAlpha(texColor);`:L.H`vec4 texColor = vec4(1.0);`}
        shadingParams.viewDirection = normalize(vpos - cameraPosition);
        ${e.normalType===c.r.ScreenDerivative?L.H`
                vec3 normal = screenDerivativeNormal(vPositionLocal);`:L.H`
                shadingParams.normalView = vNormalWorld;
                vec3 normal = shadingNormal(shadingParams);`}
        ${e.pbrMode===A.f7.Normal?"applyPBRFactors();":""}
        float ssao = evaluateAmbientOcclusionInverse() * getBakedOcclusion();

        vec3 posWorld = vpos + localOrigin;

        float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
        float shadow = ${e.receiveShadows?"readShadowMap(vpos, linearDepth)":e.spherical?"lightingGlobalFactor * (1.0 - additionalAmbientScale)":"0.0"};

        vec3 matColor = max(ambient, diffuse);
        ${e.hasVertexColors?L.H`
                vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:L.H`
                vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}
        ${e.hasNormalTexture?L.H`
                mat3 tangentSpace = ${e.hasVertexTangents?"computeTangentSpace(normal);":"computeTangentSpace(normal, vpos, vuv0);"}
                vec3 shadingNormal = computeTextureNormal(tangentSpace, ${e.hasNormalTextureTransform?L.H`normalUV`:"vuv0"});`:L.H`vec3 shadingNormal = normal;`}
        vec3 normalGround = ${e.spherical?L.H`normalize(posWorld);`:L.H`vec3(0.0, 0.0, 1.0);`}

        ${e.snowCover?L.H`
                float snow = smoothstep(0.5, 0.55, dot(normal, normalGround));
                albedo = mix(albedo, vec3(1), snow);
                shadingNormal = mix(shadingNormal, normal, snow);
                ssao = mix(ssao, 1.0, snow);`:""}

        vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;

        ${e.pbrMode===A.f7.Normal||e.pbrMode===A.f7.Schematic?L.H`
                float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
                ${e.snowCover?L.H`
                        mrr = mix(mrr, vec3(0.0, 1.0, 0.04), snow);
                        emission = mix(emission, vec3(0.0), snow);`:""}

                vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:L.H`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
        fragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);
        ${e.transparencyPassType===B.A.Color?L.H`fragColor = premultiplyAlpha(fragColor);`:""}
      }
    `)}return t.include(v.s,e),t}const G=Object.freeze(Object.defineProperty({__proto__:null,build:z},Symbol.toStringTag,{value:"Module"}))},60926:function(e,t,r){r.d(t,{R:function(){return D},b:function(){return F}});var n=r(95650),i=r(57218),o=r(35031),a=r(5885),s=r(4731),l=r(99163),c=r(7792),u=r(91636),d=r(40433),h=r(82082),f=r(6502),m=r(5664),p=r(74312),v=r(11827),g=r(99660),_=r(58749),x=r(73393),T=r(89585),b=r(3864),y=r(59181),S=r(91024),A=r(44391),E=r(49745),w=r(10938),C=r(71354),M=r(43036),O=r(63371),R=r(24603),I=r(23410),P=r(3961),N=r(15176),H=r(42842),L=r(21414);function F(e){const t=new P.kG,{vertex:r,fragment:F,varyings:D}=t;return(0,C.Sv)(r,e),t.include(u.f),D.add("vpos","vec3"),t.include(S.k,e),t.include(l.fQ,e),t.include(m.L,e),e.output!==o.H_.Color&&e.output!==o.H_.Alpha||((0,C.hY)(t.vertex,e),t.include(c.O,e),t.include(s.w,e),e.offsetBackfaces&&t.include(i.w),e.instancedColor&&t.attributes.add(L.T.INSTANCECOLOR,"vec4"),D.add("vNormalWorld","vec3"),D.add("localvpos","vec3"),e.multipassEnabled&&D.add("depth","float"),t.include(h.D,e),t.include(n.qj,e),t.include(d.R,e),t.include(f.c,e),r.uniforms.add(new O.N("externalColor",(e=>e.externalColor))),D.add("vcolorExt","vec4"),r.code.add(I.H`
        void main(void) {
          forwardNormalizedVertexColor();
          vcolorExt = externalColor;
          ${e.instancedColor?"vcolorExt *= instanceColor * 0.003921568627451;":""}
          vcolorExt *= vvColor();
          vcolorExt *= getSymbolColor();
          forwardColorMixMode();

          if (vcolorExt.a < ${I.H.float(A.b)}) {
            gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          } else {
            vpos = getVertexInLocalOriginSpace();
            localvpos = vpos - view[3].xyz;
            vpos = subtractOrigin(vpos);
            vNormalWorld = dpNormal(vvLocalNormal(normalModel()));
            vpos = addVerticalOffset(vpos, localOrigin);
            gl_Position = transformPosition(proj, view, vpos);
            ${e.offsetBackfaces?"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);":""}
          }
          ${e.multipassEnabled?I.H`depth = (view * vec4(vpos, 1.0)).z;`:""}
          forwardLinearDepth();
          forwardTextureCoordinates();
        }
      `)),e.output===o.H_.Alpha&&(t.include(a.f5,e),t.include(E.z,e),t.include(x.l,e),F.uniforms.add(new R.p("opacity",(e=>e.opacity)),new R.p("layerOpacity",(e=>e.layerOpacity))),e.hasColorTexture&&F.uniforms.add(new N.A("tex",(e=>e.texture))),F.include(w.y),F.code.add(I.H`
      void main() {
        discardBySlice(vpos);
        ${e.multipassEnabled?I.H`terrainDepthTest(depth);`:""}
        ${e.hasColorTexture?I.H`
                vec4 texColor = texture(tex, ${e.hasColorTextureTransform?I.H`colorUV`:I.H`vuv0`});
                ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
                discardOrAdjustAlpha(texColor);`:I.H`vec4 texColor = vec4(1.0);`}
        ${e.hasVertexColors?I.H`float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:I.H`float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}

        fragColor = vec4(opacity_);
      }
    `)),e.output===o.H_.Color&&(t.include(a.f5,e),t.include(g.XP,e),t.include(v.K,e),t.include(E.z,e),t.include(e.instancedDoublePrecision?y.hb:y.XE,e),t.include(x.l,e),(0,C.hY)(t.fragment,e),(0,_.Pe)(F),(0,g.PN)(F),(0,g.sC)(F),F.uniforms.add(r.uniforms.get("localOrigin"),r.uniforms.get("view"),new M.J("ambient",(e=>e.ambient)),new M.J("diffuse",(e=>e.diffuse)),new R.p("opacity",(e=>e.opacity)),new R.p("layerOpacity",(e=>e.layerOpacity))),e.hasColorTexture&&F.uniforms.add(new N.A("tex",(e=>e.texture))),t.include(b.jV,e),t.include(T.T,e),F.include(w.y),(0,_.F1)(F),F.code.add(I.H`
      void main() {
        discardBySlice(vpos);
        ${e.multipassEnabled?I.H`terrainDepthTest(depth);`:""}
        ${e.hasColorTexture?I.H`
                vec4 texColor = texture(tex, ${e.hasColorTextureTransform?I.H`colorUV`:I.H`vuv0`});
                ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
                discardOrAdjustAlpha(texColor);`:I.H`vec4 texColor = vec4(1.0);`}
        vec3 viewDirection = normalize(vpos - cameraPosition);
        ${e.pbrMode===b.f7.Normal?"applyPBRFactors();":""}
        float ssao = evaluateAmbientOcclusionInverse();
        ssao *= getBakedOcclusion();

        float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
        vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
        ${e.receiveShadows?"float shadow = readShadowMap(vpos, linearDepth);":e.spherical?"float shadow = lightingGlobalFactor * (1.0 - additionalAmbientScale);":"float shadow = 0.0;"}
        vec3 matColor = max(ambient, diffuse);
        ${e.hasVertexColors?I.H`
                vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:I.H`
                vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}
        ${e.snowCover?I.H`albedo = mix(albedo, vec3(1), 0.9);`:I.H``}
        ${I.H`
            vec3 shadingNormal = normalize(vNormalWorld);
            albedo *= 1.2;
            vec3 viewForward = vec3(view[0][2], view[1][2], view[2][2]);
            float alignmentLightView = clamp(dot(viewForward, -mainLightDirection), 0.0, 1.0);
            float transmittance = 1.0 - clamp(dot(viewForward, shadingNormal), 0.0, 1.0);
            float treeRadialFalloff = vColor.r;
            float backLightFactor = 0.5 * treeRadialFalloff * alignmentLightView * transmittance * (1.0 - shadow);
            additionalLight += backLightFactor * mainLightIntensity;`}
        ${e.pbrMode===b.f7.Normal||e.pbrMode===b.f7.Schematic?e.spherical?I.H`vec3 normalGround = normalize(vpos + localOrigin);`:I.H`vec3 normalGround = vec3(0.0, 0.0, 1.0);`:I.H``}
        ${e.pbrMode===b.f7.Normal||e.pbrMode===b.f7.Schematic?I.H`
                float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
                ${e.snowCover?I.H`
                        mrr = vec3(0.0, 1.0, 0.04);
                        emission = vec3(0.0);`:""}

                vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:I.H`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
        fragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);
        ${e.transparencyPassType===H.A.Color?I.H`fragColor = premultiplyAlpha(fragColor);`:I.H``}
      }
    `)),t.include(p.s,e),t}const D=Object.freeze(Object.defineProperty({__proto__:null,build:F},Symbol.toStringTag,{value:"Module"}))},91800:function(e,t,r){r.d(t,{S:function(){return g},b:function(){return m},g:function(){return p}});var n=r(36531),i=r(84164),o=r(55208),a=r(31227),s=r(77334),l=r(93072),c=r(24603),u=r(23410),d=r(3961),h=r(15176);const f=16;function m(){const e=new d.kG,t=e.fragment;return e.include(o.k),e.include(s.GZ),t.include(a.K),t.uniforms.add(new c.p("radius",((e,t)=>p(t.camera)))),t.code.add(u.H`vec3 sphere[16] = vec3[16](
vec3(0.186937, 0.0, 0.0),
vec3(0.700542, 0.0, 0.0),
vec3(-0.864858, -0.481795, -0.111713),
vec3(-0.624773, 0.102853, -0.730153),
vec3(-0.387172, 0.260319, 0.007229),
vec3(-0.222367, -0.642631, -0.707697),
vec3(-0.01336, -0.014956, 0.169662),
vec3(0.122575, 0.1544, -0.456944),
vec3(-0.177141, 0.85997, -0.42346),
vec3(-0.131631, 0.814545, 0.524355),
vec3(-0.779469, 0.007991, 0.624833),
vec3(0.308092, 0.209288,0.35969),
vec3(0.359331, -0.184533, -0.377458),
vec3(0.192633, -0.482999, -0.065284),
vec3(0.233538, 0.293706, -0.055139),
vec3(0.417709, -0.386701, 0.442449)
);
float fallOffFunction(float vv, float vn, float bias) {
float f = max(radius * radius - vv, 0.0);
return f * f * f * max(vn - bias, 0.0);
}`),t.code.add(u.H`float aoValueFromPositionsAndNormal(vec3 C, vec3 n_C, vec3 Q) {
vec3 v = Q - C;
float vv = dot(v, v);
float vn = dot(normalize(v), n_C);
return fallOffFunction(vv, vn, 0.1);
}`),t.uniforms.add(new l.A("nearFar",((e,t)=>t.camera.nearFar)),new h.A("normalMap",(e=>e.normalTexture)),new h.A("depthMap",(e=>e.depthTexture)),new c.p("projScale",(e=>e.projScale)),new h.A("rnm",(e=>e.noiseTexture)),new l.A("rnmScale",((e,t)=>(0,n.t8)(v,t.camera.fullWidth/e.noiseTexture.descriptor.width,t.camera.fullHeight/e.noiseTexture.descriptor.height))),new c.p("intensity",(e=>e.intensity)),new l.A("screenSize",((e,t)=>(0,n.t8)(v,t.camera.fullWidth,t.camera.fullHeight)))),e.outputs.add("fragOcclusion","float"),t.code.add(u.H`
    void main(void) {
      float currentPixelDepth = linearDepthFromTexture(depthMap, uv, nearFar);

      if (-currentPixelDepth > nearFar.y || -currentPixelDepth < nearFar.x) {
        fragOcclusion = 1.0;
        return;
      }

      // get the normal of current fragment
      vec4 norm4 = texture(normalMap, uv);
      if(norm4.a != 1.0) {
        fragOcclusion = 1.0;
        return;
      }
      vec3 norm = vec3(-1.0) + 2.0 * norm4.xyz;

      vec3 currentPixelPos = reconstructPosition(gl_FragCoord.xy, currentPixelDepth);

      float sum = 0.0;
      vec3 tapPixelPos;

      vec3 fres = normalize(2.0 * texture(rnm, uv * rnmScale).xyz - 1.0);

      // note: the factor 2.0 should not be necessary, but makes ssao much nicer.
      // bug or deviation from CE somewhere else?
      float ps = projScale / (2.0 * currentPixelPos.z * zScale.x + zScale.y);

      for(int i = 0; i < ${u.H.int(f)}; ++i) {
        vec2 unitOffset = reflect(sphere[i], fres).xy;
        vec2 offset = vec2(-unitOffset * radius * ps);

        // don't use current or very nearby samples
        if( abs(offset.x) < 2.0 || abs(offset.y) < 2.0){
          continue;
        }

        vec2 tc = vec2(gl_FragCoord.xy + offset);
        if (tc.x < 0.0 || tc.y < 0.0 || tc.x > screenSize.x || tc.y > screenSize.y) continue;
        vec2 tcTap = tc / screenSize;
        float occluderFragmentDepth = linearDepthFromTexture(depthMap, tcTap, nearFar);

        tapPixelPos = reconstructPosition(tc, occluderFragmentDepth);

        sum += aoValueFromPositionsAndNormal(currentPixelPos, norm, tapPixelPos);
      }

      // output the result
      float A = max(1.0 - sum * intensity / float(${u.H.int(f)}), 0.0);

      // Anti-tone map to reduce contrast and drag dark region farther: (x^0.2 + 1.2 * x^4) / 2.2
      A = (pow(A, 0.2) + 1.2 * A*A*A*A) / 2.2;

      fragOcclusion = A;
    }
  `),e}function p(e){return Math.max(10,20*e.computeScreenPixelSizeAtDist(Math.abs(4*e.relativeElevation)))}const v=(0,i.Ue)(),g=Object.freeze(Object.defineProperty({__proto__:null,build:m,getRadius:p},Symbol.toStringTag,{value:"Module"}))},24756:function(e,t,r){r.d(t,{S:function(){return p},b:function(){return m}});var n=r(86717),i=r(55208),o=r(31227),a=r(26482),s=r(93072),l=r(24603),c=r(23410),u=r(3961),d=r(37649),h=r(15176);const f=4;function m(){const e=new u.kG,t=e.fragment;e.include(i.k);const r=(f+1)/2,m=1/(2*r*r);return t.include(o.K),t.uniforms.add(new h.A("depthMap",(e=>e.depthTexture)),new d.R("tex",(e=>e.colorTexture)),new a.q("blurSize",(e=>e.blurSize)),new l.p("projScale",((e,t)=>{const r=(0,n.q)(t.camera.eye,t.camera.center);return r>5e4?Math.max(0,e.projScale-(r-5e4)):e.projScale})),new s.A("nearFar",((e,t)=>t.camera.nearFar))),t.code.add(c.H`
    void blurFunction(vec2 uv, float r, float center_d, float sharpness, inout float wTotal, inout float bTotal) {
      float c = texture(tex, uv).r;
      float d = linearDepthFromTexture(depthMap, uv, nearFar);

      float ddiff = d - center_d;

      float w = exp(-r * r * ${c.H.float(m)} - ddiff * ddiff * sharpness);
      wTotal += w;
      bTotal += w * c;
    }
  `),e.outputs.add("fragBlur","float"),t.code.add(c.H`
    void main(void) {
      float b = 0.0;
      float w_total = 0.0;

      float center_d = linearDepthFromTexture(depthMap, uv, nearFar);

      float sharpness = -0.05 * projScale / center_d;
      for (int r = -${c.H.int(f)}; r <= ${c.H.int(f)}; ++r) {
        float rf = float(r);
        vec2 uvOffset = uv + rf * blurSize;
        blurFunction(uvOffset, rf, center_d, sharpness, w_total, b);
      }

      fragBlur = b / w_total;
    }
  `),e}const p=Object.freeze(Object.defineProperty({__proto__:null,build:m},Symbol.toStringTag,{value:"Module"}))},91917:function(e,t,r){r.d(t,{a:function(){return x},b:function(){return T},c:function(){return v},f:function(){return y},g:function(){return b},j:function(){return C},n:function(){return H}});r(39994);var n=r(13802),i=r(19431),o=r(32114),a=r(86717),s=r(81095),l=r(56999),c=r(52721),u=r(40201),d=r(19546),h=r(97537),f=r(5700),m=r(68817);const p=v();function v(){return(0,c.Ue)()}const g=l.e,_=l.e;function x(e,t){return(0,l.c)(t,e)}function T(e){return e[3]}function b(e){return e}function y(e,t,r,n){return(0,c.al)(e,t,r,n)}function S(e,t,r){if(null==t)return!1;if(!E(e,t,A))return!1;let{t0:n,t1:i}=A;if((n<0||i<n&&i>0)&&(n=i),n<0)return!1;if(r){const{origin:e,direction:i}=t;r[0]=e[0]+i[0]*n,r[1]=e[1]+i[1]*n,r[2]=e[2]+i[2]*n}return!0}const A={t0:0,t1:0};function E(e,t,r){const{origin:n,direction:i}=t,o=w;o[0]=n[0]-e[0],o[1]=n[1]-e[1],o[2]=n[2]-e[2];const a=i[0]*i[0]+i[1]*i[1]+i[2]*i[2];if(0===a)return!1;const s=2*(i[0]*o[0]+i[1]*o[1]+i[2]*o[2]),l=s*s-4*a*(o[0]*o[0]+o[1]*o[1]+o[2]*o[2]-e[3]*e[3]);if(l<0)return!1;const c=Math.sqrt(l);return r.t0=(-s-c)/(2*a),r.t1=(-s+c)/(2*a),!0}const w=(0,s.Ue)();function C(e,t){return S(e,t,null)}function M(e,t,r){const n=m.WM.get(),i=m.MP.get();(0,a.b)(n,t.origin,t.direction);const s=T(e);(0,a.b)(r,n,t.origin),(0,a.h)(r,r,1/(0,a.l)(r)*s);const l=R(e,t.origin),c=(0,f.EU)(t.origin,r);return(0,o.Us)(i,c+l,n),(0,a.e)(r,r,i),r}function O(e,t,r){const n=(0,a.f)(m.WM.get(),t,e),i=(0,a.h)(m.WM.get(),n,e[3]/(0,a.l)(n));return(0,a.g)(r,i,e)}function R(e,t){const r=(0,a.f)(m.WM.get(),t,e),n=(0,a.l)(r),o=T(e),s=o+Math.abs(o-n);return(0,i.ZF)(o/s)}const I=(0,s.Ue)();function P(e,t,r,n){const o=(0,a.f)(I,t,e);switch(r){case d.R.X:{const e=(0,i.jE)(o,I)[2];return(0,a.s)(n,-Math.sin(e),Math.cos(e),0)}case d.R.Y:{const e=(0,i.jE)(o,I),t=e[1],r=e[2],s=Math.sin(t);return(0,a.s)(n,-s*Math.cos(r),-s*Math.sin(r),Math.cos(t))}case d.R.Z:return(0,a.n)(n,o);default:return}}function N(e,t){const r=(0,a.f)(L,t,e);return(0,a.l)(r)-e[3]}function H(e,t){const r=(0,a.a)(e,t),n=T(e);return r<=n*n}const L=(0,s.Ue)(),F=v();Object.freeze(Object.defineProperty({__proto__:null,NullSphere:p,altitudeAt:N,angleToSilhouette:R,axisAt:P,clear:function(e){e[0]=e[1]=e[2]=e[3]=0},closestPoint:function(e,t,r){return S(e,t,r)?r:((0,h.JI)(t,e,r),O(e,r,r))},closestPointOnSilhouette:M,containsPoint:H,copy:x,create:v,distanceToSilhouette:function(e,t){const r=(0,a.f)(m.WM.get(),t,e),n=(0,a.p)(r),i=e[3]*e[3];return Math.sqrt(Math.abs(n-i))},elevate:function(e,t,r){return e!==r&&(r[0]=e[0],r[1]=e[1],r[2]=e[2]),r[3]=e[3]+t,r},equals:_,exactEquals:g,fromCenterAndRadius:function(e,t){return(0,c.al)(e[0],e[1],e[2],t)},fromRadius:function(e,t){return e[0]=e[1]=e[2]=0,e[3]=t,e},fromValues:y,getCenter:b,getRadius:T,intersectLine:function(e,t,r){const n=(0,h.zk)(t,r);if(!E(e,n,A))return[];const{origin:i,direction:o}=n,{t0:l,t1:c}=A,d=t=>{const r=(0,s.Ue)();return(0,a.r)(r,i,o,t),O(e,r,r)};return Math.abs(l-c)<(0,u.bn)()?[d(l)]:[d(l),d(c)]},intersectRay:S,intersectRayClosestSilhouette:function(e,t,r){if(S(e,t,r))return r;const n=M(e,t,m.WM.get());return(0,a.g)(r,t.origin,(0,a.h)(m.WM.get(),t.direction,(0,a.q)(t.origin,n)/(0,a.l)(t.direction))),r},intersectsRay:C,projectPoint:O,setAltitudeAt:function(e,t,r,n){const i=N(e,t),o=P(e,t,d.R.Z,L),s=(0,a.h)(L,o,r-i);return(0,a.g)(n,t,s)},setExtent:function(e,t,r){return n.Z.getLogger("esri.geometry.support.sphere").error("sphere.setExtent is not yet supported"),e!==r&&x(e,r),r},tmpSphere:F,union:function(e,t,r=(0,c.Ue)()){const n=(0,a.q)(e,t),i=e[3],o=t[3];return n+o<i?((0,l.c)(r,e),r):n+i<o?((0,l.c)(r,t),r):((0,a.m)(r,e,t,(n+o-i)/(2*n)),r[3]=(n+i+o)/2,r)},wrap:function(e){return e}},Symbol.toStringTag,{value:"Module"}))},6766:function(e,t,r){r.d(t,{a:function(){return o},b:function(){return s},c:function(){return a},d:function(){return i},e:function(){return d},f:function(){return l},n:function(){return h},s:function(){return c},t:function(){return u}});r(39994);var n=r(45150);function i(e,t,r){o(e.typedBuffer,t.typedBuffer,r,e.typedBufferStride,t.typedBufferStride)}function o(e,t,r,n=3,i=n){if(e.length/n!==Math.ceil(t.length/i))return e;const o=e.length/n,a=r[0],s=r[1],l=r[2],c=r[4],u=r[5],d=r[6],h=r[8],f=r[9],m=r[10],p=r[12],v=r[13],g=r[14];let _=0,x=0;for(let r=0;r<o;r++){const r=t[_],o=t[_+1],T=t[_+2];e[x]=a*r+c*o+h*T+p,e[x+1]=s*r+u*o+f*T+v,e[x+2]=l*r+d*o+m*T+g,_+=i,x+=n}return e}function a(e,t,r){s(e.typedBuffer,t.typedBuffer,r,e.typedBufferStride,t.typedBufferStride)}function s(e,t,r,i=3,o=i){if(e.length/i!==Math.ceil(t.length/o))return void(0,n.M)().error("source and destination buffers need to have the same number of elements");const a=e.length/i,s=r[0],l=r[1],c=r[2],u=r[3],d=r[4],h=r[5],f=r[6],m=r[7],p=r[8];let v=0,g=0;for(let r=0;r<a;r++){const r=t[v],n=t[v+1],a=t[v+2];e[g]=s*r+u*n+f*a,e[g+1]=l*r+d*n+m*a,e[g+2]=c*r+h*n+p*a,v+=o,g+=i}}function l(e,t,r){c(e.typedBuffer,t,r,e.typedBufferStride)}function c(e,t,r,n=3){const i=Math.min(e.length/n,t.count),o=t.typedBuffer,a=t.typedBufferStride;let s=0,l=0;for(let t=0;t<i;t++)e[l]=r*o[s],e[l+1]=r*o[s+1],e[l+2]=r*o[s+2],s+=a,l+=n}function u(e,t,r,n=3,i=n){const o=e.length/n;if(o!==Math.ceil(t.length/i))return e;let a=0,s=0;for(let l=0;l<o;l++)e[s]=t[a]+r[0],e[s+1]=t[a+1]+r[1],e[s+2]=t[a+2]+r[2],a+=i,s+=n;return e}function d(e,t){h(e.typedBuffer,t.typedBuffer,e.typedBufferStride,t.typedBufferStride)}function h(e,t,r=3,n=r){const i=Math.min(e.length/r,t.length/n);let o=0,a=0;for(let s=0;s<i;s++){const i=t[o],s=t[o+1],l=t[o+2],c=i*i+s*s+l*l;if(c>0){const t=1/Math.sqrt(c);e[a]=t*i,e[a+1]=t*s,e[a+2]=t*l}o+=n,a+=r}}Object.freeze(Object.defineProperty({__proto__:null,normalize:h,normalizeView:d,scale:c,scaleView:l,shiftRight:function(e,t,r){const n=Math.min(e.count,t.count),i=e.typedBuffer,o=e.typedBufferStride,a=t.typedBuffer,s=t.typedBufferStride;let l=0,c=0;for(let e=0;e<n;e++)i[c]=a[l]>>r,i[c+1]=a[l+1]>>r,i[c+2]=a[l+2]>>r,l+=s,c+=o},transformMat3:s,transformMat3View:a,transformMat4:o,transformMat4View:i,translate:u},Symbol.toStringTag,{value:"Module"}))},22445:function(e,t,r){r.d(t,{r:function(){return n}});class n{constructor(){this._outer=new Map}clear(){this._outer.clear()}get empty(){return 0===this._outer.size}get(e,t){return this._outer.get(e)?.get(t)}set(e,t,r){const n=this._outer.get(e);n?n.set(t,r):this._outer.set(e,new Map([[t,r]]))}delete(e,t){const r=this._outer.get(e);r&&(r.delete(t),0===r.size&&this._outer.delete(e))}forEach(e){this._outer.forEach(((t,r)=>e(t,r)))}}},19480:function(e,t,r){r.d(t,{x:function(){return i}});var n=r(66581);class i{constructor(e){this._allocator=e,this._items=[],this._itemsPtr=0,this._grow()}get(){return 0===this._itemsPtr&&(0,n.Y)((()=>this._reset())),this._itemsPtr===this._items.length&&this._grow(),this._items[this._itemsPtr++]}_reset(){const e=Math.min(3*Math.max(8,this._itemsPtr),this._itemsPtr+3*o);this._items.length=Math.min(e,this._items.length),this._itemsPtr=0}_grow(){for(let e=0;e<Math.max(8,Math.min(this._items.length,o));e++)this._items.push(this._allocator())}}const o=1024},57989:function(e,t,r){function n(e){return e=e||globalThis.location.hostname,c.some((t=>null!=e?.match(t)))}function i(e,t){return e&&(t=t||globalThis.location.hostname)?null!=t.match(o)||null!=t.match(s)?e.replace("static.arcgis.com","staticdev.arcgis.com"):null!=t.match(a)||null!=t.match(l)?e.replace("static.arcgis.com","staticqa.arcgis.com"):e:e}r.d(t,{XO:function(){return n},pJ:function(){return i}});const o=/^devext.arcgis.com$/,a=/^qaext.arcgis.com$/,s=/^[\w-]*\.mapsdevext.arcgis.com$/,l=/^[\w-]*\.mapsqa.arcgis.com$/,c=[/^([\w-]*\.)?[\w-]*\.zrh-dev-local.esri.com$/,o,a,/^jsapps.esri.com$/,s,l]},31725:function(e,t,r){r.d(t,{xx:function(){return i}});var n=r(86098);function i(e,t=!1){return e<=n.c8?t?new Array(e).fill(0):new Array(e):new Float32Array(e)}},45150:function(e,t,r){r.d(t,{M:function(){return i}});var n=r(13802);const i=()=>n.Z.getLogger("esri.views.3d.support.buffer.math")},56215:function(e,t,r){r.d(t,{Jk:function(){return d},Ue:function(){return l},al:function(){return c},nF:function(){return h},zk:function(){return u}});var n=r(19431),i=r(19480),o=r(86717),a=r(81095),s=r(68817);function l(e){return e?{origin:(0,a.d9)(e.origin),vector:(0,a.d9)(e.vector)}:{origin:(0,a.Ue)(),vector:(0,a.Ue)()}}function c(e,t,r=l()){return(0,o.c)(r.origin,e),(0,o.c)(r.vector,t),r}function u(e,t,r=l()){return(0,o.c)(r.origin,e),(0,o.f)(r.vector,t,e),r}function d(e,t){const r=(0,o.f)(s.WM.get(),t,e.origin),i=(0,o.k)(e.vector,r),a=(0,o.k)(e.vector,e.vector),l=(0,n.uZ)(i/a,0,1),c=(0,o.f)(s.WM.get(),(0,o.h)(s.WM.get(),e.vector,l),r);return(0,o.k)(c,c)}function h(e,t,r){return function(e,t,r,i,a){const{vector:l,origin:c}=e,u=(0,o.f)(s.WM.get(),t,c),d=(0,o.k)(l,u)/(0,o.p)(l);return(0,o.h)(a,l,(0,n.uZ)(d,r,i)),(0,o.g)(a,a,e.origin)}(e,t,0,1,r)}(0,a.Ue)(),(0,a.Ue)(),new i.x((()=>l()))},97537:function(e,t,r){r.d(t,{JG:function(){return c},JI:function(){return h},Ue:function(){return a},al:function(){return d},re:function(){return l},zk:function(){return u}});r(7753);var n=r(19480),i=r(86717),o=r(81095);r(68817);function a(e){return e?s((0,o.d9)(e.origin),(0,o.d9)(e.direction)):s((0,o.Ue)(),(0,o.Ue)())}function s(e,t){return{origin:e,direction:t}}function l(e,t){const r=f.get();return r.origin=e,r.direction=t,r}function c(e,t=a()){return d(e.origin,e.direction,t)}function u(e,t,r=a()){return(0,i.c)(r.origin,e),(0,i.f)(r.direction,t,e),r}function d(e,t,r=a()){return(0,i.c)(r.origin,e),(0,i.c)(r.direction,t),r}function h(e,t,r){const n=(0,i.k)(e.direction,(0,i.f)(r,t,e.origin));return(0,i.g)(r,e.origin,(0,i.h)(r,e.direction,n)),r}const f=new n.x((()=>a()))},44883:function(e,t,r){r.d(t,{t:function(){return i}});var n=r(66341);async function i(e,t){const{data:r}=await(0,n.Z)(e,{responseType:"image",...t});return r}},61208:function(e,t,r){r.d(t,{fetch:function(){return Qt}});var n=r(57989),i=r(46332),o=r(3965),a=r(32114),s=r(3308),l=r(84164),c=r(86717),u=r(81095),d=r(37116),h=r(31725),f=r(81936),m=r(6766),p=r(88589),v=r(55709),g=r(14789),_=r(32101),x=r(91420),T=r(85636),b=r(1731),y=r(95970),S=r(45867);function A(e){if(null==e)return null;const t=null!=e.offset?e.offset:S.AG,r=null!=e.rotation?e.rotation:0,n=null!=e.scale?e.scale:S.hq,a=(0,o.al)(1,0,0,0,1,0,t[0],t[1],1),s=(0,o.al)(Math.cos(r),-Math.sin(r),0,Math.sin(r),Math.cos(r),0,0,0,1),l=(0,o.al)(n[0],0,0,0,n[1],0,0,0,1),c=(0,o.Ue)();return(0,i.Jp)(c,s,l),(0,i.Jp)(c,a,c),c}class E{constructor(){this.geometries=new Array,this.materials=new Array,this.textures=new Array}}class w{constructor(e,t,r){this.name=e,this.lodThreshold=t,this.pivotOffset=r,this.stageResources=new E,this.numberOfVertices=0}}var C=r(66341),M=r(67979),O=r(4745),R=r(70375),I=r(13802),P=r(22445),N=r(78668),H=r(26139),L=r(35914),F=r(44883),D=r(85799),B=r(70984),U=r(40526),z=r(39994),G=r(31355),V=r(61681),W=r(86098),j=r(3466),k=r(73401),q=r(36567);let J;var $;!function(e){e[e.ETC1_RGB=0]="ETC1_RGB",e[e.ETC2_RGBA=1]="ETC2_RGBA",e[e.BC1_RGB=2]="BC1_RGB",e[e.BC3_RGBA=3]="BC3_RGBA",e[e.BC4_R=4]="BC4_R",e[e.BC5_RG=5]="BC5_RG",e[e.BC7_M6_RGB=6]="BC7_M6_RGB",e[e.BC7_M5_RGBA=7]="BC7_M5_RGBA",e[e.PVRTC1_4_RGB=8]="PVRTC1_4_RGB",e[e.PVRTC1_4_RGBA=9]="PVRTC1_4_RGBA",e[e.ASTC_4x4_RGBA=10]="ASTC_4x4_RGBA",e[e.ATC_RGB=11]="ATC_RGB",e[e.ATC_RGBA=12]="ATC_RGBA",e[e.FXT1_RGB=17]="FXT1_RGB",e[e.PVRTC2_4_RGB=18]="PVRTC2_4_RGB",e[e.PVRTC2_4_RGBA=19]="PVRTC2_4_RGBA",e[e.ETC2_EAC_R11=20]="ETC2_EAC_R11",e[e.ETC2_EAC_RG11=21]="ETC2_EAC_RG11",e[e.RGBA32=13]="RGBA32",e[e.RGB565=14]="RGB565",e[e.BGR565=15]="BGR565",e[e.RGBA4444=16]="RGBA4444"}($||($={}));var Y=r(91907),X=r(71449),Z=r(62486);let K=null,Q=null;async function ee(){return null==Q&&(Q=function(){if(null==J){const e=e=>(0,q.V)(`esri/libs/basisu/${e}`);J=r.e(1681).then(r.bind(r,21681)).then((e=>e.b)).then((({default:t})=>t({locateFile:e}).then((e=>(e.initializeBasis(),delete e.then,e)))))}return J}(),K=await Q),Q}function te(e,t,r,n,i){const o=(0,Z.RG)(t?Y.q_.COMPRESSED_RGBA8_ETC2_EAC:Y.q_.COMPRESSED_RGB8_ETC2),a=i&&e>1?(4**e-1)/(3*4**(e-1)):1;return Math.ceil(r*n*o*a)}function re(e){return e.getNumImages()>=1&&!e.isUASTC()}function ne(e){return e.getFaces()>=1&&e.isETC1S()}function ie(e,t,r,n,i,o,a,s){const{compressedTextureETC:l,compressedTextureS3TC:c}=e.capabilities,[u,d]=l?n?[$.ETC2_RGBA,Y.q_.COMPRESSED_RGBA8_ETC2_EAC]:[$.ETC1_RGB,Y.q_.COMPRESSED_RGB8_ETC2]:c?n?[$.BC3_RGBA,Y.q_.COMPRESSED_RGBA_S3TC_DXT5_EXT]:[$.BC1_RGB,Y.q_.COMPRESSED_RGB_S3TC_DXT1_EXT]:[$.RGBA32,Y.VI.RGBA],h=t.hasMipmap?r:Math.min(1,r),f=[];for(let e=0;e<h;e++)f.push(new Uint8Array(a(e,u))),s(e,u,f[e]);return t.internalFormat=d,t.hasMipmap=f.length>1,t.samplingMode=t.hasMipmap?Y.cw.LINEAR_MIPMAP_LINEAR:Y.cw.LINEAR,t.width=i,t.height=o,new X.x(e,t,{type:"compressed",levels:f})}var oe=r(10107),ae=r(95399);const se=()=>I.Z.getLogger("esri.views.3d.webgl-engine.lib.DDSUtil"),le=542327876,ce=131072,ue=4;function de(e){return e.charCodeAt(0)+(e.charCodeAt(1)<<8)+(e.charCodeAt(2)<<16)+(e.charCodeAt(3)<<24)}const he=de("DXT1"),fe=de("DXT3"),me=de("DXT5"),pe=31,ve=0,ge=1,_e=2,xe=3,Te=4,be=7,ye=20,Se=21;function Ae(e,t){const r=new Int32Array(e,0,pe);if(r[ve]!==le)return se().error("Invalid magic number in DDS header"),null;if(!(r[ye]&ue))return se().error("Unsupported format, must contain a FourCC code"),null;const n=r[Se];let i,o;switch(n){case he:i=8,o=Y.q_.COMPRESSED_RGB_S3TC_DXT1_EXT;break;case fe:i=16,o=Y.q_.COMPRESSED_RGBA_S3TC_DXT3_EXT;break;case me:i=16,o=Y.q_.COMPRESSED_RGBA_S3TC_DXT5_EXT;break;default:return se().error("Unsupported FourCC code:",function(e){return String.fromCharCode(255&e,e>>8&255,e>>16&255,e>>24&255)}(n)),null}let a=1,s=r[Te],l=r[xe];0==(3&s)&&0==(3&l)||(se().warn("Rounding up compressed texture size to nearest multiple of 4."),s=s+3&-4,l=l+3&-4);const c=s,u=l;let d,h;r[_e]&ce&&!1!==t&&(a=Math.max(1,r[be]));let f=r[ge]+4;const m=[];for(let t=0;t<a;++t)h=(s+3>>2)*(l+3>>2)*i,d=new Uint8Array(e,f,h),m.push(d),f+=h,s=Math.max(1,s>>1),l=Math.max(1,l>>1);return{textureData:{type:"compressed",levels:m},internalFormat:o,width:c,height:u}}function Ee(e,t,r){if(e instanceof ImageData)return Ee(we(e),t,r);const n=document.createElement("canvas");return n.width=t,n.height=r,n.getContext("2d").drawImage(e,0,0,n.width,n.height),n}function we(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");if(null==r)throw new R.Z("Failed to create 2d context from HTMLCanvasElement");return r.putImageData(e,0,0),t}var Ce,Me=r(15095),Oe=r(80479);class Re extends oe.c{get parameters(){return this._parameters}constructor(e,t){super(),this._data=e,this.type=ae.U.Texture,this._glTexture=null,this._loadingPromise=null,this._loadingController=null,this.events=new G.Z,this._parameters={...Pe,...t},this._startPreload(e)}dispose(){this.unload(),this._data=this.frameUpdate=void 0}_startPreload(e){null!=e&&(e instanceof HTMLVideoElement?(this.frameUpdate=t=>this._frameUpdate(e,t),this._startPreloadVideoElement(e)):e instanceof HTMLImageElement&&this._startPreloadImageElement(e))}_startPreloadVideoElement(e){if(!((0,j.jc)(e.src)||"auto"===e.preload&&e.crossOrigin)){e.preload="auto",e.crossOrigin="anonymous";const t=!e.paused;if(e.src=e.src,t&&e.autoplay){const t=()=>{e.removeEventListener("canplay",t),e.play()};e.addEventListener("canplay",t)}}}_startPreloadImageElement(e){(0,j.HK)(e.src)||(0,j.jc)(e.src)||e.crossOrigin||(e.crossOrigin="anonymous",e.src=e.src)}_createDescriptor(e){const t=new Oe.X;return t.wrapMode=this._parameters.wrap??Y.e8.REPEAT,t.flipped=!this._parameters.noUnpackFlip,t.samplingMode=this._parameters.mipmap?Y.cw.LINEAR_MIPMAP_LINEAR:Y.cw.LINEAR,t.hasMipmap=!!this._parameters.mipmap,t.preMultiplyAlpha=!!this._parameters.preMultiplyAlpha,t.maxAnisotropy=this._parameters.maxAnisotropy??(this._parameters.mipmap?e.parameters.maxMaxAnisotropy:1),t}get glTexture(){return this._glTexture}get memoryEstimate(){return this._glTexture?.usedMemory||function(e,t){if(null==e)return 0;if((0,W.eP)(e)||(0,W.lq)(e))return t.encoding===B.Ti.KTX2_ENCODING?function(e,t){if(null==K)return e.byteLength;const r=new K.KTX2File(new Uint8Array(e)),n=ne(r)?te(r.getLevels(),r.getHasAlpha(),r.getWidth(),r.getHeight(),t):0;return r.close(),r.delete(),n}(e,!!t.mipmap):t.encoding===B.Ti.BASIS_ENCODING?function(e,t){if(null==K)return e.byteLength;const r=new K.BasisFile(new Uint8Array(e)),n=re(r)?te(r.getNumLevels(0),r.getHasAlpha(),r.getImageWidth(0,0),r.getImageHeight(0,0),t):0;return r.close(),r.delete(),n}(e,!!t.mipmap):e.byteLength;const{width:r,height:n}=e instanceof Image||e instanceof ImageData||e instanceof HTMLCanvasElement||e instanceof HTMLVideoElement?Ie(e):t;return(t.mipmap?4/3:1)*r*n*(t.components||4)||0}(this._data,this._parameters)}load(e){if(this._glTexture)return this._glTexture;if(this._loadingPromise)return this._loadingPromise;const t=this._data;return null==t?(this._glTexture=new X.x(e,this._createDescriptor(e),null),this._glTexture):(this._parameters.reloadable||(this._data=void 0),"string"==typeof t?this._loadFromURL(e,t):t instanceof Image?this._loadFromImageElement(e,t):t instanceof HTMLVideoElement?this._loadFromVideoElement(e,t):t instanceof ImageData||t instanceof HTMLCanvasElement?this._loadFromImage(e,t):((0,W.eP)(t)||(0,W.lq)(t))&&this._parameters.encoding===B.Ti.DDS_ENCODING?this._loadFromDDSData(e,t):((0,W.eP)(t)||(0,W.lq)(t))&&this._parameters.encoding===B.Ti.KTX2_ENCODING?this._loadFromKTX2(e,t):((0,W.eP)(t)||(0,W.lq)(t))&&this._parameters.encoding===B.Ti.BASIS_ENCODING?this._loadFromBasis(e,t):(0,W.lq)(t)?this._loadFromPixelData(e,t):(0,W.eP)(t)?this._loadFromPixelData(e,new Uint8Array(t)):null)}_frameUpdate(e,t){return null==this._glTexture||e.readyState<Ce.HAVE_CURRENT_DATA||t===e.currentTime?t:(this._glTexture.setData(e),this._glTexture.descriptor.hasMipmap&&this._glTexture.generateMipmap(),this._parameters.updateCallback&&this._parameters.updateCallback(),e.currentTime)}_loadFromDDSData(e,t){return this._glTexture=function(e,t,r){const n=Ae(r,t.hasMipmap??!1);if(null==n)throw new Error("DDS texture data is null");const{textureData:i,internalFormat:o,width:a,height:s}=n;return t.samplingMode=i.levels.length>1?Y.cw.LINEAR_MIPMAP_LINEAR:Y.cw.LINEAR,t.hasMipmap=i.levels.length>1,t.internalFormat=o,t.width=a,t.height=s,new X.x(e,t,i)}(e,this._createDescriptor(e),t),this._glTexture}_loadFromKTX2(e,t){return this._loadAsync((()=>async function(e,t,r){null==K&&(K=await ee());const n=new K.KTX2File(new Uint8Array(r));if(!ne(n))return null;n.startTranscoding();const i=ie(e,t,n.getLevels(),n.getHasAlpha(),n.getWidth(),n.getHeight(),((e,t)=>n.getImageTranscodedSizeInBytes(e,0,0,t)),((e,t,r)=>n.transcodeImage(r,e,0,0,t,0,-1,-1)));return n.close(),n.delete(),i}(e,this._createDescriptor(e),t).then((e=>(this._glTexture=e,e)))))}_loadFromBasis(e,t){return this._loadAsync((()=>async function(e,t,r){null==K&&(K=await ee());const n=new K.BasisFile(new Uint8Array(r));if(!re(n))return null;n.startTranscoding();const i=ie(e,t,n.getNumLevels(0),n.getHasAlpha(),n.getImageWidth(0,0),n.getImageHeight(0,0),((e,t)=>n.getImageTranscodedSizeInBytes(0,e,t)),((e,t,r)=>n.transcodeImage(r,0,e,t,0,0)));return n.close(),n.delete(),i}(e,this._createDescriptor(e),t).then((e=>(this._glTexture=e,e)))))}_loadFromPixelData(e,t){(0,Me.hu)(this._parameters.width>0&&this._parameters.height>0);const r=this._createDescriptor(e);return r.pixelFormat=1===this._parameters.components?Y.VI.LUMINANCE:3===this._parameters.components?Y.VI.RGB:Y.VI.RGBA,r.width=this._parameters.width??0,r.height=this._parameters.height??0,this._glTexture=new X.x(e,r,t),this._glTexture}_loadFromURL(e,t){return this._loadAsync((async r=>{const n=await(0,F.t)(t,{signal:r});return(0,N.k_)(r),this._loadFromImage(e,n)}))}_loadFromImageElement(e,t){return t.complete?this._loadFromImage(e,t):this._loadAsync((async r=>{const n=await(0,k.fY)(t,t.src,!1,r);return(0,N.k_)(r),this._loadFromImage(e,n)}))}_loadFromVideoElement(e,t){return t.readyState>=Ce.HAVE_CURRENT_DATA?this._loadFromImage(e,t):this._loadFromVideoElementAsync(e,t)}_loadFromVideoElementAsync(e,t){return this._loadAsync((r=>new Promise(((n,i)=>{const o=()=>{t.removeEventListener("loadeddata",a),t.removeEventListener("error",s),(0,V.hw)(l)},a=()=>{t.readyState>=Ce.HAVE_CURRENT_DATA&&(o(),n(this._loadFromImage(e,t)))},s=e=>{o(),i(e||new R.Z("Failed to load video"))};t.addEventListener("loadeddata",a),t.addEventListener("error",s);const l=(0,N.fu)(r,(()=>s((0,N.zE)())))}))))}_loadFromImage(e,t){let r=t;if(!(r instanceof HTMLVideoElement)){const{maxTextureSize:t}=e.parameters;r=this._parameters.downsampleUncompressed?function(e,t){let r=e.width*e.height;if(r<4096)return e instanceof ImageData?we(e):e;let n=e.width,i=e.height;do{n=Math.ceil(n/2),i=Math.ceil(i/2),r=n*i}while(r>1048576||null!=t&&(n>t||i>t));return Ee(e,n,i)}(r,t):function(e,t){const r=Math.max(e.width,e.height);if(r<=t)return e;const n=t/r;return Ee(e,Math.round(e.width*n),Math.round(e.height*n))}(r,t)}const n=Ie(r);this._parameters.width=n.width,this._parameters.height=n.height;const i=this._createDescriptor(e);return i.pixelFormat=3===this._parameters.components?Y.VI.RGB:Y.VI.RGBA,i.width=n.width,i.height=n.height,this._glTexture=new X.x(e,i,r),this._glTexture}_loadAsync(e){const t=new AbortController;this._loadingController=t;const r=e(t.signal);this._loadingPromise=r;const n=()=>{this._loadingController===t&&(this._loadingController=null),this._loadingPromise===r&&(this._loadingPromise=null)};return r.then(n,n),r}unload(){if(this._glTexture=(0,V.M2)(this._glTexture),null!=this._loadingController){const e=this._loadingController;this._loadingController=null,this._loadingPromise=null,e.abort()}this.events.emit("unloaded")}}function Ie(e){return e instanceof HTMLVideoElement?{width:e.videoWidth,height:e.videoHeight}:e}!function(e){e[e.HAVE_NOTHING=0]="HAVE_NOTHING",e[e.HAVE_METADATA=1]="HAVE_METADATA",e[e.HAVE_CURRENT_DATA=2]="HAVE_CURRENT_DATA",e[e.HAVE_FUTURE_DATA=3]="HAVE_FUTURE_DATA",e[e.HAVE_ENOUGH_DATA=4]="HAVE_ENOUGH_DATA"}(Ce||(Ce={}));const Pe={wrap:{s:Y.e8.REPEAT,t:Y.e8.REPEAT},mipmap:!0,noUnpackFlip:!1,preMultiplyAlpha:!1,downsampleUncompressed:!1};var Ne=r(21414),He=r(65684),Le=r(44685),Fe=r(35031),De=r(7792),Be=r(2833),Ue=r(3864),ze=r(97009),Ge=r(90160),Ve=r(12045),We=r(46378),je=r(91917),ke=r(47850);const qe=new class{constructor(e=0){this.offset=e,this.sphere=(0,je.c)(),this.tmpVertex=(0,u.Ue)()}applyToVertex(e,t,r){const n=this.objectTransform.transform,i=(0,c.s)(Je,e,t,r),o=(0,c.e)(i,i,n),a=this.offset/(0,c.l)(o);(0,c.r)(o,o,o,a);const s=this.objectTransform.inverse;return(0,c.e)(this.tmpVertex,o,s),this.tmpVertex}applyToMinMax(e,t){const r=this.offset/(0,c.l)(e);(0,c.r)(e,e,e,r);const n=this.offset/(0,c.l)(t);(0,c.r)(t,t,t,n)}applyToAabb(e){const t=this.offset/Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]);e[0]+=e[0]*t,e[1]+=e[1]*t,e[2]+=e[2]*t;const r=this.offset/Math.sqrt(e[3]*e[3]+e[4]*e[4]+e[5]*e[5]);return e[3]+=e[3]*r,e[4]+=e[4]*r,e[5]+=e[5]*r,e}applyToBoundingSphere(e){const t=(0,c.l)((0,je.g)(e)),r=this.offset/t;return(0,c.r)((0,je.g)(this.sphere),(0,je.g)(e),(0,je.g)(e),r),this.sphere[3]=e[3]+e[3]*this.offset/t,this.sphere}};new class{constructor(e=0){this.componentLocalOriginLength=0,this._totalOffset=0,this._offset=0,this._tmpVertex=(0,u.Ue)(),this._tmpMbs=(0,je.c)(),this._tmpObb=new ke.Oo,this._resetOffset(e)}_resetOffset(e){this._offset=e,this._totalOffset=e}set offset(e){this._resetOffset(e)}get offset(){return this._offset}set componentOffset(e){this._totalOffset=this._offset+e}set localOrigin(e){this.componentLocalOriginLength=(0,c.l)(e)}applyToVertex(e,t,r){const n=(0,c.s)(Je,e,t,r),i=(0,c.s)($e,e,t,r+this.componentLocalOriginLength),o=this._totalOffset/(0,c.l)(i);return(0,c.r)(this._tmpVertex,n,i,o),this._tmpVertex}applyToAabb(e){const t=this.componentLocalOriginLength,r=e[0],n=e[1],i=e[2]+t,o=e[3],a=e[4],s=e[5]+t,l=Math.abs(r),c=Math.abs(n),u=Math.abs(i),d=Math.abs(o),h=Math.abs(a),f=Math.abs(s),m=.5*(1+Math.sign(r*o))*Math.min(l,d),p=.5*(1+Math.sign(n*a))*Math.min(c,h),v=.5*(1+Math.sign(i*s))*Math.min(u,f),g=Math.max(l,d),_=Math.max(c,h),x=Math.max(u,f),T=Math.sqrt(m*m+p*p+v*v),b=Math.sign(l+r),y=Math.sign(c+n),S=Math.sign(u+i),A=Math.sign(d+o),E=Math.sign(h+a),w=Math.sign(f+s),C=this._totalOffset;if(T<C)return e[0]-=(1-b)*C,e[1]-=(1-y)*C,e[2]-=(1-S)*C,e[3]+=A*C,e[4]+=E*C,e[5]+=w*C,e;const M=C/Math.sqrt(g*g+_*_+x*x),O=C/T,R=O-M,I=-R;return e[0]+=r*(b*I+O),e[1]+=n*(y*I+O),e[2]+=i*(S*I+O),e[3]+=o*(A*R+M),e[4]+=a*(E*R+M),e[5]+=s*(w*R+M),e}applyToMbs(e){const t=(0,c.l)((0,je.g)(e)),r=this._totalOffset/t;return(0,c.r)((0,je.g)(this._tmpMbs),(0,je.g)(e),(0,je.g)(e),r),this._tmpMbs[3]=e[3]+e[3]*this._totalOffset/t,this._tmpMbs}applyToObb(e){return(0,ke.gI)(e,this._totalOffset,this._totalOffset,He.JY.Global,this._tmpObb),this._tmpObb}};new class{constructor(e=0){this.offset=e,this.tmpVertex=(0,u.Ue)()}applyToVertex(e,t,r){const n=(0,c.s)(Je,e,t,r),i=(0,c.g)($e,n,this.localOrigin),o=this.offset/(0,c.l)(i);return(0,c.r)(this.tmpVertex,n,i,o),this.tmpVertex}applyToAabb(e){const t=Ye,r=Xe,n=Ze;for(let i=0;i<3;++i)t[i]=e[0+i]+this.localOrigin[i],r[i]=e[3+i]+this.localOrigin[i],n[i]=t[i];const i=this.applyToVertex(t[0],t[1],t[2]);for(let t=0;t<3;++t)e[t]=i[t],e[t+3]=i[t];const o=t=>{const r=this.applyToVertex(t[0],t[1],t[2]);for(let t=0;t<3;++t)e[t]=Math.min(e[t],r[t]),e[t+3]=Math.max(e[t+3],r[t])};for(let e=1;e<8;++e){for(let i=0;i<3;++i)n[i]=0==(e&1<<i)?t[i]:r[i];o(n)}let a=0;for(let e=0;e<3;++e)t[e]*r[e]<0&&(a|=1<<e);if(0!==a&&7!==a)for(let e=0;e<8;++e)if(0==(a&e)){for(let i=0;i<3;++i)n[i]=0!=(a&1<<i)?0:0!=(e&1<<i)?t[i]:r[i];o(n)}for(let t=0;t<3;++t)e[t]-=this.localOrigin[t],e[t+3]-=this.localOrigin[t];return e}};const Je=(0,u.Ue)(),$e=(0,u.Ue)(),Ye=(0,u.Ue)(),Xe=(0,u.Ue)(),Ze=(0,u.Ue)();function Ke(e,t,r){const{data:n,indices:i}=e,o=t.typedBuffer,a=t.typedBufferStride,s=i.length;r*=a;for(let e=0;e<s;++e){const t=2*i[e];o[r]=n[t],o[r+1]=n[t+1],r+=a}}function Qe(e,t,r,n){const{data:i,indices:o}=e,a=t.typedBuffer,s=t.typedBufferStride,l=o.length;if(r*=s,null==n||1===n)for(let e=0;e<l;++e){const t=3*o[e];a[r]=i[t],a[r+1]=i[t+1],a[r+2]=i[t+2],r+=s}else for(let e=0;e<l;++e){const t=3*o[e];for(let e=0;e<n;++e)a[r]=i[t],a[r+1]=i[t+1],a[r+2]=i[t+2],r+=s}}function et(e,t,r,n=1){const{data:i,indices:o}=e,a=t.typedBuffer,s=t.typedBufferStride,l=o.length;if(r*=s,1===n)for(let e=0;e<l;++e){const t=4*o[e];a[r]=i[t],a[r+1]=i[t+1],a[r+2]=i[t+2],a[r+3]=i[t+3],r+=s}else for(let e=0;e<l;++e){const t=4*o[e];for(let e=0;e<n;++e)a[r]=i[t],a[r+1]=i[t+1],a[r+2]=i[t+2],a[r+3]=i[t+3],r+=s}}function tt(e,t,r,n,i=1){const o=t.typedBuffer,a=t.typedBufferStride;if(n*=a,1===i)for(let t=0;t<r;++t)o[n]=e[0],o[n+1]=e[1],o[n+2]=e[2],o[n+3]=e[3],n+=a;else for(let t=0;t<r;++t)for(let t=0;t<i;++t)o[n]=e[0],o[n+1]=e[1],o[n+2]=e[2],o[n+3]=e[3],n+=a}function rt(e,t,r,n,i,o){switch(e){case Ne.T.POSITION:{(0,Me.hu)(3===t.size);const n=i.getField(e,f.ct);(0,Me.hu)(!!n,`No buffer view for ${e}`),n&&function(e,t,r,n,i=1){if(!t)return void Qe(e,r,n,i);const{data:o,indices:s}=e,l=r.typedBuffer,c=r.typedBufferStride,u=s.length,d=t[0],h=t[1],f=t[2],m=t[4],p=t[5],v=t[6],g=t[8],_=t[9],x=t[10],T=t[12],b=t[13],y=t[14];n*=c;let S=0,A=0,E=0;const w=(0,a.lv)(t)?e=>{S=o[e]+T,A=o[e+1]+b,E=o[e+2]+y}:e=>{const t=o[e],r=o[e+1],n=o[e+2];S=d*t+m*r+g*n+T,A=h*t+p*r+_*n+b,E=f*t+v*r+x*n+y};if(1===i)for(let e=0;e<u;++e)w(3*s[e]),l[n]=S,l[n+1]=A,l[n+2]=E,n+=c;else for(let e=0;e<u;++e){w(3*s[e]);for(let e=0;e<i;++e)l[n]=S,l[n+1]=A,l[n+2]=E,n+=c}}(t,r,n,o);break}case Ne.T.NORMAL:{(0,Me.hu)(3===t.size);const r=i.getField(e,f.ct);(0,Me.hu)(!!r,`No buffer view for ${e}`),r&&function(e,t,r,n,i=1){if(!t)return void Qe(e,r,n,i);const{data:o,indices:s}=e,l=t,c=r.typedBuffer,u=r.typedBufferStride,d=s.length,h=l[0],f=l[1],m=l[2],p=l[4],v=l[5],g=l[6],_=l[8],x=l[9],T=l[10],b=!(0,a.pV)(l),y=1e-6,S=1-y;n*=u;let A=0,E=0,w=0;const C=(0,a.lv)(l)?e=>{A=o[e],E=o[e+1],w=o[e+2]}:e=>{const t=o[e],r=o[e+1],n=o[e+2];A=h*t+p*r+_*n,E=f*t+v*r+x*n,w=m*t+g*r+T*n};if(1===i)if(b)for(let e=0;e<d;++e){C(3*s[e]);const t=A*A+E*E+w*w;if(t<S&&t>y){const e=1/Math.sqrt(t);c[n]=A*e,c[n+1]=E*e,c[n+2]=w*e}else c[n]=A,c[n+1]=E,c[n+2]=w;n+=u}else for(let e=0;e<d;++e)C(3*s[e]),c[n]=A,c[n+1]=E,c[n+2]=w,n+=u;else for(let e=0;e<d;++e){if(C(3*s[e]),b){const e=A*A+E*E+w*w;if(e<S&&e>y){const t=1/Math.sqrt(e);A*=t,E*=t,w*=t}}for(let e=0;e<i;++e)c[n]=A,c[n+1]=E,c[n+2]=w,n+=u}}(t,n,r,o);break}case Ne.T.NORMALCOMPRESSED:{(0,Me.hu)(2===t.size);const r=i.getField(e,f.or);(0,Me.hu)(!!r,`No buffer view for ${e}`),r&&Ke(t,r,o);break}case Ne.T.UV0:{(0,Me.hu)(2===t.size);const r=i.getField(e,f.Eu);(0,Me.hu)(!!r,`No buffer view for ${e}`),r&&Ke(t,r,o);break}case Ne.T.COLOR:case Ne.T.SYMBOLCOLOR:{const r=i.getField(e,f.mc);(0,Me.hu)(!!r,`No buffer view for ${e}`),(0,Me.hu)(3===t.size||4===t.size),!r||3!==t.size&&4!==t.size||function(e,t,r,n,i=1){const{data:o,indices:a}=e,s=r.typedBuffer,l=r.typedBufferStride,c=a.length;if(n*=l,t!==o.length||4!==t)if(1!==i)if(4!==t)for(let e=0;e<c;++e){const t=3*a[e];for(let e=0;e<i;++e)s[n]=o[t],s[n+1]=o[t+1],s[n+2]=o[t+2],s[n+3]=255,n+=l}else for(let e=0;e<c;++e){const t=4*a[e];for(let e=0;e<i;++e)s[n]=o[t],s[n+1]=o[t+1],s[n+2]=o[t+2],s[n+3]=o[t+3],n+=l}else{if(4===t){for(let e=0;e<c;++e){const t=4*a[e];s[n]=o[t],s[n+1]=o[t+1],s[n+2]=o[t+2],s[n+3]=o[t+3],n+=l}return}for(let e=0;e<c;++e){const t=3*a[e];s[n]=o[t],s[n+1]=o[t+1],s[n+2]=o[t+2],s[n+3]=255,n+=l}}else{s[n]=o[0],s[n+1]=o[1],s[n+2]=o[2],s[n+3]=o[3];const e=new Uint32Array(r.typedBuffer.buffer,r.start),t=l/4,a=e[n/=4];n+=t;const u=c*i;for(let r=1;r<u;++r)e[n]=a,n+=t}}(t,t.size,r,o);break}case Ne.T.COLORFEATUREATTRIBUTE:{const r=i.getField(e,f.ly);(0,Me.hu)(!!r,`No buffer view for ${e}`),(0,Me.hu)(1===t.size),r&&1===t.size&&function(e,t,r){const{data:n,indices:i}=e,o=t.typedBuffer,a=t.typedBufferStride,s=i.length,l=n[0];r*=a;for(let e=0;e<s;++e)o[r]=l,r+=a}(t,r,o);break}case Ne.T.TANGENT:{(0,Me.hu)(4===t.size);const r=i.getField(e,f.ek);(0,Me.hu)(!!r,`No buffer view for ${e}`),r&&function(e,t,r,n,i=1){if(!t)return void et(e,r,n,i);const{data:o,indices:s}=e,l=t,c=r.typedBuffer,u=r.typedBufferStride,d=s.length,h=l[0],f=l[1],m=l[2],p=l[4],v=l[5],g=l[6],_=l[8],x=l[9],T=l[10],b=!(0,a.pV)(l),y=1e-6,S=1-y;if(n*=u,1===i)for(let e=0;e<d;++e){const t=4*s[e],r=o[t],i=o[t+1],a=o[t+2],l=o[t+3];let d=h*r+p*i+_*a,A=f*r+v*i+x*a,E=m*r+g*i+T*a;if(b){const e=d*d+A*A+E*E;if(e<S&&e>y){const t=1/Math.sqrt(e);d*=t,A*=t,E*=t}}c[n]=d,c[n+1]=A,c[n+2]=E,c[n+3]=l,n+=u}else for(let e=0;e<d;++e){const t=4*s[e],r=o[t],a=o[t+1],l=o[t+2],d=o[t+3];let A=h*r+p*a+_*l,E=f*r+v*a+x*l,w=m*r+g*a+T*l;if(b){const e=A*A+E*E+w*w;if(e<S&&e>y){const t=1/Math.sqrt(e);A*=t,E*=t,w*=t}}for(let e=0;e<i;++e)c[n]=A,c[n+1]=E,c[n+2]=w,c[n+3]=d,n+=u}}(t,n,r,o);break}case Ne.T.PROFILERIGHT:case Ne.T.PROFILEUP:case Ne.T.PROFILEVERTEXANDNORMAL:case Ne.T.FEATUREVALUE:{(0,Me.hu)(4===t.size);const r=i.getField(e,f.ek);(0,Me.hu)(!!r,`No buffer view for ${e}`),r&&et(t,r,o)}}}class nt{constructor(e){this.vertexBufferLayout=e}elementCount(e){return e.attributes.get(Ne.T.POSITION).indices.length}write(e,t,r,n,i){!function(e,t,r,n,i,o){for(const a of t.fields.keys()){const t=e.attributes.get(a),s=t?.indices;if(t&&s)rt(a,t,r,n,i,o);else if(a===Ne.T.OBJECTANDLAYERIDCOLOR&&null!=e.objectAndLayerIdColor){const t=e.attributes.get(Ne.T.POSITION)?.indices;if(t){const r=t.length,n=i.getField(a,f.mc);tt(e.objectAndLayerIdColor,n,r,o)}}}}(r,this.vertexBufferLayout,e,t,n,i)}}var it=r(13705),ot=r(52721),at=r(82082),st=r(78549),lt=r(44391),ct=r(9969),ut=r(52756),dt=r(5474),ht=r(95194);Y.wb.LESS,Y.wb.ALWAYS;const ft={mask:255},mt={function:{func:Y.wb.ALWAYS,ref:B.hU.OutlineVisualElementMask,mask:B.hU.OutlineVisualElementMask},operation:{fail:Y.xS.KEEP,zFail:Y.xS.KEEP,zPass:Y.xS.ZERO}},pt={function:{func:Y.wb.ALWAYS,ref:B.hU.OutlineVisualElementMask,mask:B.hU.OutlineVisualElementMask},operation:{fail:Y.xS.KEEP,zFail:Y.xS.KEEP,zPass:Y.xS.REPLACE}};Y.wb.EQUAL,B.hU.OutlineVisualElementMask,B.hU.OutlineVisualElementMask,Y.xS.KEEP,Y.xS.KEEP,Y.xS.KEEP,Y.wb.NOTEQUAL,B.hU.OutlineVisualElementMask,B.hU.OutlineVisualElementMask,Y.xS.KEEP,Y.xS.KEEP,Y.xS.KEEP;var vt=r(42842);const gt=[1,1,.5],_t=[0,.6,.2],xt=[0,1,.2];var Tt=r(45584),bt=r(17346);class yt extends st.d4{constructor(){super(...arguments),this.isSchematic=!1,this.usePBR=!1,this.mrrFactors=(0,u.nI)(gt),this.hasVertexColors=!1,this.hasSymbolColors=!1,this.doubleSided=!1,this.doubleSidedType="normal",this.cullFace=B.Vr.Back,this.isInstanced=!1,this.hasInstancedColor=!1,this.emissiveFactor=(0,u.al)(0,0,0),this.instancedDoublePrecision=!1,this.normalType=De.r.Attribute,this.receiveShadows=!0,this.receiveAmbientOcclusion=!0,this.castShadows=!0,this.shadowMappingEnabled=!1,this.ambient=(0,u.al)(.2,.2,.2),this.diffuse=(0,u.al)(.8,.8,.8),this.externalColor=(0,ot.al)(1,1,1,1),this.colorMixMode="multiply",this.opacity=1,this.layerOpacity=1,this.origin=(0,u.Ue)(),this.hasSlicePlane=!1,this.hasSliceHighlight=!0,this.offsetTransparentBackfaces=!1,this.vvSize=null,this.vvColor=null,this.vvOpacity=null,this.vvSymbolAnchor=null,this.vvSymbolRotationMatrix=null,this.modelTransformation=null,this.transparent=!1,this.writeDepth=!0,this.customDepthTest=B.Gv.Less,this.textureAlphaMode=B.JJ.Blend,this.textureAlphaCutoff=lt.F,this.textureAlphaPremultiplied=!1,this.hasOccludees=!1,this.renderOccluded=Ge.yD.Occlude,this.isDecoration=!1}}class St extends st.Pf{constructor(){super(...arguments),this.origin=(0,u.Ue)(),this.slicePlaneLocalOrigin=this.origin}}class At extends ut.A{initializeConfiguration(e,t){t.spherical=e.viewingMode===He.JY.Global,t.doublePrecisionRequiresObfuscation=e.rctx.driverTest.doublePrecisionRequiresObfuscation.result,t.textureCoordinateType=t.hasColorTexture||t.hasMetallicRoughnessTexture||t.hasEmissionTexture||t.hasOcclusionTexture||t.hasNormalTexture?at.N.Default:at.N.None,t.objectAndLayerIdColorInstanced=t.instanced}initializeProgram(e){return this._initializeProgram(e,At.shader)}_initializeProgram(e,t){return new ht.$(e.rctx,t.get().build(this.configuration),dt.i)}_convertDepthTestFunction(e){return e===B.Gv.Lequal?Y.wb.LEQUAL:Y.wb.LESS}_makePipeline(e,t){const r=this.configuration,n=e===vt.A.NONE,i=e===vt.A.FrontFace;return(0,bt.sm)({blending:r.output!==Fe.H_.Color&&r.output!==Fe.H_.Alpha||!r.transparent?null:n?Ve.wu:(0,Ve.j7)(e),culling:Et(r)?(0,bt.zp)(r.cullFace):null,depthTest:{func:(0,Ve.Bh)(e,this._convertDepthTestFunction(r.customDepthTest))},depthWrite:(n||i)&&r.writeDepth?bt.LZ:null,colorWrite:bt.BK,stencilWrite:r.hasOccludees?ft:null,stencilTest:r.hasOccludees?t?pt:mt:null,polygonOffset:n||i?null:(0,Ve.je)(r.enableOffset)})}initializePipeline(){return this._occludeePipelineState=this._makePipeline(this.configuration.transparencyPassType,!0),this._makePipeline(this.configuration.transparencyPassType,!1)}getPipeline(e){return e?this._occludeePipelineState:super.getPipeline()}}function Et(e){return e.cullFace!==B.Vr.None||!e.hasSlicePlane&&!e.transparent&&!e.doubleSidedMode}At.shader=new ct.J(Tt.D,(()=>r.e(1180).then(r.bind(r,1180))));var wt=r(36663),Ct=r(67197),Mt=r(99163),Ot=r(40017);class Rt extends Mt.PO{}(0,wt._)([(0,Ct.o)({constValue:!0})],Rt.prototype,"hasSliceHighlight",void 0),(0,wt._)([(0,Ct.o)({constValue:!1})],Rt.prototype,"hasSliceInVertexProgram",void 0),(0,wt._)([(0,Ct.o)({constValue:Ot.P.Pass})],Rt.prototype,"pbrTextureBindType",void 0);class It extends Rt{constructor(){super(...arguments),this.output=Fe.H_.Color,this.alphaDiscardMode=B.JJ.Opaque,this.doubleSidedMode=Be.q.None,this.pbrMode=Ue.f7.Disabled,this.cullFace=B.Vr.None,this.transparencyPassType=vt.A.NONE,this.normalType=De.r.Attribute,this.textureCoordinateType=at.N.None,this.customDepthTest=B.Gv.Less,this.spherical=!1,this.hasVertexColors=!1,this.hasSymbolColors=!1,this.hasVerticalOffset=!1,this.hasSlicePlane=!1,this.hasSliceHighlight=!0,this.hasColorTexture=!1,this.hasMetallicRoughnessTexture=!1,this.hasEmissionTexture=!1,this.hasOcclusionTexture=!1,this.hasNormalTexture=!1,this.hasScreenSizePerspective=!1,this.hasVertexTangents=!1,this.hasOccludees=!1,this.multipassEnabled=!1,this.hasModelTransformation=!1,this.offsetBackfaces=!1,this.vvSize=!1,this.vvColor=!1,this.receiveShadows=!1,this.receiveAmbientOcclusion=!1,this.textureAlphaPremultiplied=!1,this.instanced=!1,this.instancedColor=!1,this.objectAndLayerIdColorInstanced=!1,this.instancedDoublePrecision=!1,this.doublePrecisionRequiresObfuscation=!1,this.writeDepth=!0,this.transparent=!1,this.enableOffset=!0,this.cullAboveGround=!1,this.snowCover=!1,this.hasColorTextureTransform=!1,this.hasEmissionTextureTransform=!1,this.hasNormalTextureTransform=!1,this.hasOcclusionTextureTransform=!1,this.hasMetallicRoughnessTextureTransform=!1}}(0,wt._)([(0,Ct.o)({count:Fe.H_.COUNT})],It.prototype,"output",void 0),(0,wt._)([(0,Ct.o)({count:B.JJ.COUNT})],It.prototype,"alphaDiscardMode",void 0),(0,wt._)([(0,Ct.o)({count:Be.q.COUNT})],It.prototype,"doubleSidedMode",void 0),(0,wt._)([(0,Ct.o)({count:Ue.f7.COUNT})],It.prototype,"pbrMode",void 0),(0,wt._)([(0,Ct.o)({count:B.Vr.COUNT})],It.prototype,"cullFace",void 0),(0,wt._)([(0,Ct.o)({count:vt.A.COUNT})],It.prototype,"transparencyPassType",void 0),(0,wt._)([(0,Ct.o)({count:De.r.COUNT})],It.prototype,"normalType",void 0),(0,wt._)([(0,Ct.o)({count:at.N.COUNT})],It.prototype,"textureCoordinateType",void 0),(0,wt._)([(0,Ct.o)({count:B.Gv.COUNT})],It.prototype,"customDepthTest",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"spherical",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"hasVertexColors",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"hasSymbolColors",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"hasVerticalOffset",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"hasSlicePlane",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"hasSliceHighlight",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"hasColorTexture",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"hasMetallicRoughnessTexture",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"hasEmissionTexture",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"hasOcclusionTexture",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"hasNormalTexture",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"hasScreenSizePerspective",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"hasVertexTangents",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"hasOccludees",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"multipassEnabled",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"hasModelTransformation",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"offsetBackfaces",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"vvSize",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"vvColor",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"receiveShadows",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"receiveAmbientOcclusion",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"textureAlphaPremultiplied",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"instanced",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"instancedColor",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"objectAndLayerIdColorInstanced",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"instancedDoublePrecision",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"doublePrecisionRequiresObfuscation",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"writeDepth",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"transparent",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"enableOffset",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"cullAboveGround",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"snowCover",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"hasColorTextureTransform",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"hasEmissionTextureTransform",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"hasNormalTextureTransform",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"hasOcclusionTextureTransform",void 0),(0,wt._)([(0,Ct.o)()],It.prototype,"hasMetallicRoughnessTextureTransform",void 0),(0,wt._)([(0,Ct.o)({constValue:!1})],It.prototype,"occlusionPass",void 0),(0,wt._)([(0,Ct.o)({constValue:!0})],It.prototype,"hasVvInstancing",void 0),(0,wt._)([(0,Ct.o)({constValue:!1})],It.prototype,"useCustomDTRExponentForWater",void 0),(0,wt._)([(0,Ct.o)({constValue:!1})],It.prototype,"supportsTextureAtlas",void 0),(0,wt._)([(0,Ct.o)({constValue:!0})],It.prototype,"useFillLights",void 0);var Pt=r(60926);class Nt extends At{initializeConfiguration(e,t){super.initializeConfiguration(e,t),t.hasMetallicRoughnessTexture=!1,t.hasEmissionTexture=!1,t.hasOcclusionTexture=!1,t.hasNormalTexture=!1,t.hasModelTransformation=!1,t.normalType=De.r.Attribute,t.doubleSidedMode=Be.q.WindingOrder,t.hasVertexTangents=!1}initializeProgram(e){return this._initializeProgram(e,Nt.shader)}}Nt.shader=new ct.J(Pt.R,(()=>r.e(6353).then(r.bind(r,56353))));class Ht extends Ge.F5{constructor(e){super(e,Ft),this.supportsEdges=!0,this.produces=new Map([[We.r.OPAQUE_MATERIAL,e=>((0,Fe.Jb)(e)||(0,Fe.Kr)(e))&&!this.parameters.transparent],[We.r.TRANSPARENT_MATERIAL,e=>((0,Fe.Jb)(e)||(0,Fe.Kr)(e))&&this.parameters.transparent&&this.parameters.writeDepth],[We.r.TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL,e=>((0,Fe.Jb)(e)||(0,Fe.Kr)(e))&&this.parameters.transparent&&!this.parameters.writeDepth]]),this._configuration=new It,this._vertexBufferLayout=function(e){const t=(0,Le.U$)().vec3f(Ne.T.POSITION);return e.normalType===De.r.Compressed?t.vec2i16(Ne.T.NORMALCOMPRESSED,{glNormalized:!0}):t.vec3f(Ne.T.NORMAL),e.hasVertexTangents&&t.vec4f(Ne.T.TANGENT),(e.textureId||e.normalTextureId||e.metallicRoughnessTextureId||e.emissiveTextureId||e.occlusionTextureId)&&t.vec2f(Ne.T.UV0),e.hasVertexColors&&t.vec4u8(Ne.T.COLOR),e.hasSymbolColors&&t.vec4u8(Ne.T.SYMBOLCOLOR),(0,z.Z)("enable-feature:objectAndLayerId-rendering")&&t.vec4u8(Ne.T.OBJECTANDLAYERIDCOLOR),t}(this.parameters)}isVisibleForOutput(e){return e!==Fe.H_.Shadow&&e!==Fe.H_.ShadowExcludeHighlight&&e!==Fe.H_.ShadowHighlight||this.parameters.castShadows}isVisible(){const e=this.parameters;if(!super.isVisible()||0===e.layerOpacity)return!1;const{hasInstancedColor:t,hasVertexColors:r,hasSymbolColors:n,vvColor:i}=e,o="replace"===e.colorMixMode,a=e.opacity>0,s=e.externalColor&&e.externalColor[3]>0,l=t||i||n;return r&&l?o||a:r?o?s:a:l?o||a:o?s:a}getConfiguration(e,t){return this._configuration.output=e,this._configuration.hasNormalTexture=!!this.parameters.normalTextureId,this._configuration.hasColorTexture=!!this.parameters.textureId,this._configuration.hasVertexTangents=this.parameters.hasVertexTangents,this._configuration.instanced=this.parameters.isInstanced,this._configuration.instancedDoublePrecision=this.parameters.instancedDoublePrecision,this._configuration.vvSize=!!this.parameters.vvSize,this._configuration.hasVerticalOffset=null!=this.parameters.verticalOffset,this._configuration.hasScreenSizePerspective=null!=this.parameters.screenSizePerspective,this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.hasSliceHighlight=this.parameters.hasSliceHighlight,this._configuration.alphaDiscardMode=this.parameters.textureAlphaMode,this._configuration.normalType=this.parameters.normalType,this._configuration.transparent=this.parameters.transparent,this._configuration.writeDepth=this.parameters.writeDepth,null!=this.parameters.customDepthTest&&(this._configuration.customDepthTest=this.parameters.customDepthTest),this._configuration.hasOccludees=this.parameters.hasOccludees,this._configuration.cullFace=this.parameters.hasSlicePlane?B.Vr.None:this.parameters.cullFace,this._configuration.multipassEnabled=t.multipassEnabled,this._configuration.cullAboveGround=t.multipassTerrain.cullAboveGround,this._configuration.hasModelTransformation=null!=this.parameters.modelTransformation,e!==Fe.H_.Color&&e!==Fe.H_.Alpha||(this._configuration.hasVertexColors=this.parameters.hasVertexColors,this._configuration.hasSymbolColors=this.parameters.hasSymbolColors,this.parameters.treeRendering?this._configuration.doubleSidedMode=Be.q.WindingOrder:this._configuration.doubleSidedMode=this.parameters.doubleSided&&"normal"===this.parameters.doubleSidedType?Be.q.View:this.parameters.doubleSided&&"winding-order"===this.parameters.doubleSidedType?Be.q.WindingOrder:Be.q.None,this._configuration.instancedColor=this.parameters.hasInstancedColor,this._configuration.receiveShadows=this.parameters.receiveShadows&&this.parameters.shadowMappingEnabled,this._configuration.receiveAmbientOcclusion=this.parameters.receiveAmbientOcclusion&&null!=t.ssao,this._configuration.vvColor=!!this.parameters.vvColor,this._configuration.textureAlphaPremultiplied=!!this.parameters.textureAlphaPremultiplied,this._configuration.pbrMode=this.parameters.usePBR?this.parameters.isSchematic?Ue.f7.Schematic:Ue.f7.Normal:Ue.f7.Disabled,this._configuration.hasMetallicRoughnessTexture=!!this.parameters.metallicRoughnessTextureId,this._configuration.hasEmissionTexture=!!this.parameters.emissiveTextureId,this._configuration.hasOcclusionTexture=!!this.parameters.occlusionTextureId,this._configuration.offsetBackfaces=!(!this.parameters.transparent||!this.parameters.offsetTransparentBackfaces),this._configuration.transparencyPassType=t.transparencyPassType,this._configuration.enableOffset=t.camera.relativeElevation<Ve.ve,this._configuration.snowCover=this.hasSnowCover(t),this._configuration.hasColorTextureTransform=!!this.parameters.colorTextureTransformMatrix,this._configuration.hasNormalTextureTransform=!!this.parameters.normalTextureTransformMatrix,this._configuration.hasEmissionTextureTransform=!!this.parameters.emissiveTextureTransformMatrix,this._configuration.hasOcclusionTextureTransform=!!this.parameters.occlusionTextureTransformMatrix,this._configuration.hasMetallicRoughnessTextureTransform=!!this.parameters.metallicRoughnessTextureTransformMatrix),this._configuration}hasSnowCover(e){return null!=e.weather&&e.weatherVisible&&"snowy"===e.weather.type&&"enabled"===e.weather.snowCover}intersect(e,t,r,n,i,o){if(null!=this.parameters.verticalOffset){const e=r.camera;(0,c.s)(Vt,t[12],t[13],t[14]);let o=null;switch(r.viewingMode){case He.JY.Global:o=(0,c.n)(zt,Vt);break;case He.JY.Local:o=(0,c.c)(zt,Ut)}let a=0;const s=(0,c.f)(Wt,Vt,e.eye),l=(0,c.l)(s),u=(0,c.h)(s,s,1/l);let d=null;this.parameters.screenSizePerspective&&(d=(0,c.k)(o,u)),a+=(0,it.Hx)(e,l,this.parameters.verticalOffset,d??0,this.parameters.screenSizePerspective),(0,c.h)(o,o,a),(0,c.t)(Gt,o,r.transform.inverseRotation),n=(0,c.f)(Dt,n,Gt),i=(0,c.f)(Bt,i,Gt)}(0,it.Bw)(e,r,n,i,function(e){return null!=e?(qe.offset=e,qe):null}(r.verticalOffset),o)}createGLMaterial(e){return new Lt(e)}createBufferWriter(){return new nt(this._vertexBufferLayout)}}class Lt extends ze.F{constructor(e){super({...e,...e.material.parameters})}_updateShadowState(e){e.shadowMap.enabled!==this._material.parameters.shadowMappingEnabled&&this._material.setParameters({shadowMappingEnabled:e.shadowMap.enabled})}_updateOccludeeState(e){e.hasOccludees!==this._material.parameters.hasOccludees&&this._material.setParameters({hasOccludees:e.hasOccludees})}beginSlot(e){this._output!==Fe.H_.Color&&this._output!==Fe.H_.Alpha||(this._updateShadowState(e),this._updateOccludeeState(e));const t=this._material.parameters;this.updateTexture(t.textureId);const r=e.camera.viewInverseTransposeMatrix;return(0,c.s)(t.origin,r[3],r[7],r[11]),this._material.setParameters(this.textureBindParameters),this.ensureTechnique(t.treeRendering?Nt:At,e)}}const Ft=new class extends yt{constructor(){super(...arguments),this.initTextureTransparent=!1,this.treeRendering=!1,this.hasVertexTangents=!1}};const Dt=(0,u.Ue)(),Bt=(0,u.Ue)(),Ut=(0,u.al)(0,0,1),zt=(0,u.Ue)(),Gt=(0,u.Ue)(),Vt=(0,u.Ue)(),Wt=(0,u.Ue)(),jt=()=>I.Z.getLogger("esri.views.3d.layers.graphics.objectResourceUtils");async function kt(e,t){const r=await async function(e,t){const r=t?.streamDataRequester;if(r)return async function(e,t,r){const n=await(0,M.q6)(t.request(e,"json",r));if(!0===n.ok)return n.value;(0,N.r9)(n.error),qt(n.error.details.url)}(e,r,t);const n=await(0,M.q6)((0,C.Z)(e,t));if(!0===n.ok)return n.value.data;(0,N.r9)(n.error),qt(n.error)}(e,t),n=await async function(e,t){const r=new Array;for(const n in e){const i=e[n],o=i.images[0].data;if(!o){jt().warn("Externally referenced texture data is not yet supported");continue}const a=i.encoding+";base64,"+o,s="/textureDefinitions/"+n,l="rgba"===i.channels?i.alphaChannelUsage||"transparency":"none",c={noUnpackFlip:!0,wrap:{s:Y.e8.REPEAT,t:Y.e8.REPEAT},preMultiplyAlpha:Yt(l)!==B.JJ.Opaque},u=null!=t&&t.disableTextures?Promise.resolve(null):(0,F.t)(a,t);r.push(u.then((e=>({refId:s,image:e,parameters:c,alphaChannelUsage:l}))))}const n=await Promise.all(r),i={};for(const e of n)i[e.refId]=e;return i}(r.textureDefinitions??{},t);let i=0;for(const e in n)if(n.hasOwnProperty(e)){const t=n[e];i+=t?.image?t.image.width*t.image.height*4:0}return{resource:r,textures:n,size:i+(0,O.Ul)(r)}}function qt(e){throw new R.Z("",`Request for object resource failed: ${e}`)}function Jt(e){const t=e.params,r=t.topology;let n=!0;switch(t.vertexAttributes||(jt().warn("Geometry must specify vertex attributes"),n=!1),t.topology){case"PerAttributeArray":break;case"Indexed":case null:case void 0:{const e=t.faces;if(e){if(t.vertexAttributes)for(const r in t.vertexAttributes){const t=e[r];t?.values?(null!=t.valueType&&"UInt32"!==t.valueType&&(jt().warn(`Unsupported indexed geometry indices type '${t.valueType}', only UInt32 is currently supported`),n=!1),null!=t.valuesPerElement&&1!==t.valuesPerElement&&(jt().warn(`Unsupported indexed geometry values per element '${t.valuesPerElement}', only 1 is currently supported`),n=!1)):(jt().warn(`Indexed geometry does not specify face indices for '${r}' attribute`),n=!1)}}else jt().warn("Indexed geometries must specify faces"),n=!1;break}default:jt().warn(`Unsupported topology '${r}'`),n=!1}e.params.material||(jt().warn("Geometry requires material"),n=!1);const i=e.params.vertexAttributes;for(const e in i)i[e].values||(jt().warn("Geometries with externally defined attributes are not yet supported"),n=!1);return n}function $t(e){const t=(0,d.cS)();return e.forEach((e=>{const r=e.boundingInfo;null!=r&&((0,d.pp)(t,r.bbMin),(0,d.pp)(t,r.bbMax))})),t}function Yt(e){switch(e){case"mask":return B.JJ.Mask;case"maskAndTransparency":return B.JJ.MaskBlend;case"none":return B.JJ.Opaque;default:return B.JJ.Blend}}function Xt(e){const t=e.params;return{id:1,material:t.material,texture:t.texture,region:t.texture}}const Zt=new H.G(1,2,"wosr");var Kt=r(14634);async function Qt(e,t){const r=function(e){const t=e.match(/(.*\.(gltf|glb))(\?lod=([0-9]+))?$/);return t?{fileType:"gltf",url:t[1],specifiedLodIndex:null!=t[4]?Number(t[4]):null}:e.match(/(.*\.(json|json\.gz))$/)?{fileType:"wosr",url:e,specifiedLodIndex:null}:{fileType:"unknown",url:e,specifiedLodIndex:null}}((0,n.pJ)(e));if("wosr"===r.fileType){const e=await(t.cache?t.cache.loadWOSR(r.url,t):kt(r.url,t)),{engineResources:n,referenceBoundingBox:i}=function(e,t){const r=new Array,n=new Array,i=new Array,o=new P.r,a=e.resource,s=H.G.parse(a.version||"1.0","wosr");Zt.validate(s);const l=a.model.name,c=a.model.geometries,d=a.materialDefinitions??{},h=e.textures;let f=0;const m=new Map;for(let e=0;e<c.length;e++){const a=c[e];if(!Jt(a))continue;const s=Xt(a),l=a.params.vertexAttributes,p=[],v=e=>{if("PerAttributeArray"===a.params.topology)return null;const t=a.params.faces;for(const r in t)if(r===e)return t[r].values;return null},g=l[Ne.T.POSITION],_=g.values.length/g.valuesPerElement;for(const e in l){const t=l[e],r=t.values,n=v(e)??(0,L.KF)(_);p.push([e,new D.a(r,n,t.valuesPerElement,!0)])}const x=s.texture,T=h&&h[x];if(T&&!m.has(x)){const{image:e,parameters:t}=T,r=new Re(e,t);n.push(r),m.set(x,r)}const b=m.get(x),y=b?b.id:void 0,S=s.material;let A=o.get(S,x);if(null==A){const e=d[S.substring(S.lastIndexOf("/")+1)].params;1===e.transparency&&(e.transparency=0);const r=T&&T.alphaChannelUsage,n=e.transparency>0||"transparency"===r||"maskAndTransparency"===r,i=T?Yt(T.alphaChannelUsage):void 0,a={ambient:(0,u.nI)(e.diffuse),diffuse:(0,u.nI)(e.diffuse),opacity:1-(e.transparency||0),transparent:n,textureAlphaMode:i,textureAlphaCutoff:.33,textureId:y,initTextureTransparent:!0,doubleSided:!0,cullFace:B.Vr.None,colorMixMode:e.externalColorMixMode||"tint",textureAlphaPremultiplied:T?.parameters.preMultiplyAlpha??!1};t?.materialParameters&&Object.assign(a,t.materialParameters),A=new Ht(a),o.set(S,x,A)}i.push(A);const E=new U.Z(A,p);f+=p.find((e=>e[0]===Ne.T.POSITION))?.[1]?.indices.length??0,r.push(E)}return{engineResources:[{name:l,stageResources:{textures:n,materials:i,geometries:r},pivotOffset:a.model.pivotOffset,numberOfVertices:f,lodThreshold:null}],referenceBoundingBox:$t(r)}}(e,t);return{lods:n,referenceBoundingBox:i,isEsriSymbolResource:!1,isWosr:!0}}const o=await(t.cache?t.cache.loadGLTF(r.url,t,!!t.usePBR):(0,T.Q)(new x.C(t.streamDataRequester),r.url,t,t.usePBR)),S=o.model.meta?.ESRI_proxyEllipsoid,E=o.meta.isEsriSymbolResource&&null!=S&&"EsriRealisticTreesStyle"===o.meta.ESRI_webstyle;E&&!o.customMeta.esriTreeRendering&&(o.customMeta.esriTreeRendering=!0,function(e,t){for(let r=0;r<e.model.lods.length;++r){const n=e.model.lods[r];for(const i of n.parts){const n=i.attributes.normal;if(null==n)return;const o=i.attributes.position,l=o.count,d=(0,u.Ue)(),h=(0,u.Ue)(),m=(0,u.Ue)(),p=new Uint8Array(4*l),v=new Float64Array(3*l),g=(0,a.U_)((0,s.Ue)(),i.transform);let _=0,x=0;for(let a=0;a<l;a++){o.getVec(a,h),n.getVec(a,d),(0,c.e)(h,h,i.transform),(0,c.f)(m,h,t.center),(0,c.D)(m,m,t.radius);const s=m[2],l=(0,c.l)(m),u=Math.min(.45+.55*l*l,1);(0,c.D)(m,m,t.radius),null!==g&&(0,c.e)(m,m,g),(0,c.n)(m,m),r+1!==e.model.lods.length&&e.model.lods.length>1&&(0,c.m)(m,m,d,s>-1?.2:Math.min(-4*s-3.8,1)),v[_]=m[0],v[_+1]=m[1],v[_+2]=m[2],_+=3,p[x]=255*u,p[x+1]=255*u,p[x+2]=255*u,p[x+3]=255,x+=4}i.attributes.normal=new f.ct(v),i.attributes.color=new f.mc(p)}}}(o,S));const C=!!t.usePBR,M=o.meta.isEsriSymbolResource?{usePBR:C,isSchematic:!1,treeRendering:E,mrrFactors:[...xt]}:{usePBR:C,isSchematic:!1,treeRendering:!1,mrrFactors:[...gt]},O={...t.materialParameters,treeRendering:E},{engineResources:R,referenceBoundingBox:I}=function(e,t,r,n){const o=e.model,a=new Array,s=new Map,x=new Map,T=o.lods.length,S=(0,d.cS)();return o.lods.forEach(((e,E)=>{const C=!0===n.skipHighLods&&(T>1&&0===E||T>3&&1===E)||!1===n.skipHighLods&&null!=n.singleLodIndex&&E!==n.singleLodIndex;if(C&&0!==E)return;const M=new w(e.name,e.lodThreshold,[0,0,0]);e.parts.forEach((e=>{const n=C?new Ht({}):function(e,t,r,n,i,o,a){const s=t.material+(t.attributes.normal?"_normal":"")+(t.attributes.color?"_color":"")+(t.attributes.texCoord0?"_texCoord0":"")+(t.attributes.tangent?"_tangent":""),d=e.materials.get(t.material),h=null!=t.attributes.texCoord0,f=null!=t.attributes.normal;if(null==d)return null;const m=function(e){switch(e){case"BLEND":return B.JJ.Blend;case"MASK":return B.JJ.Mask;case"OPAQUE":case null:case void 0:return B.JJ.Opaque}}(d.alphaMode);if(!o.has(s)){if(h){const t=(t,r=!1)=>{if(null!=t&&!a.has(t)){const n=e.textures.get(t);if(null!=n){const e=n.data;a.set(t,new Re((0,y.$A)(e)?e.data:e,{...n.parameters,preMultiplyAlpha:!(0,y.$A)(e)&&r,encoding:(0,y.$A)(e)&&null!=e.encoding?e.encoding:void 0}))}}};t(d.textureColor,m!==B.JJ.Opaque),t(d.textureNormal),t(d.textureOcclusion),t(d.textureEmissive),t(d.textureMetallicRoughness)}const r=d.color[0]**(1/Kt.j),p=d.color[1]**(1/Kt.j),v=d.color[2]**(1/Kt.j),g=d.emissiveFactor[0]**(1/Kt.j),_=d.emissiveFactor[1]**(1/Kt.j),x=d.emissiveFactor[2]**(1/Kt.j),T=null!=d.textureColor&&h?a.get(d.textureColor):null,b=function({normalTexture:e,metallicRoughnessTexture:t,metallicFactor:r,roughnessFactor:n,emissiveTexture:i,emissiveFactor:o,occlusionTexture:a}){return null==e&&null==t&&null==i&&(null==o||(0,c.j)(o,u.AG))&&null==a&&(null==n||1===n)&&(null==r||1===r)}({normalTexture:d.textureNormal,metallicRoughnessTexture:d.textureMetallicRoughness,metallicFactor:d.metallicFactor,roughnessFactor:d.roughnessFactor,emissiveTexture:d.textureEmissive,emissiveFactor:d.emissiveFactor,occlusionTexture:d.textureOcclusion}),S=null!=d.normalTextureTransform?.scale?d.normalTextureTransform?.scale:l.hq;o.set(s,new Ht({...n,transparent:m===B.JJ.Blend,customDepthTest:B.Gv.Lequal,textureAlphaMode:m,textureAlphaCutoff:d.alphaCutoff,diffuse:[r,p,v],ambient:[r,p,v],opacity:d.opacity,doubleSided:d.doubleSided,doubleSidedType:"winding-order",cullFace:d.doubleSided?B.Vr.None:B.Vr.Back,hasVertexColors:!!t.attributes.color,hasVertexTangents:!!t.attributes.tangent,normalType:f?De.r.Attribute:De.r.ScreenDerivative,castShadows:!0,receiveShadows:d.receiveShadows,receiveAmbientOcclusion:d.receiveAmbientOcclustion,textureId:null!=T?T.id:void 0,colorMixMode:d.colorMixMode,normalTextureId:null!=d.textureNormal&&h?a.get(d.textureNormal).id:void 0,textureAlphaPremultiplied:null!=T&&!!T.parameters.preMultiplyAlpha,occlusionTextureId:null!=d.textureOcclusion&&h?a.get(d.textureOcclusion).id:void 0,emissiveTextureId:null!=d.textureEmissive&&h?a.get(d.textureEmissive).id:void 0,metallicRoughnessTextureId:null!=d.textureMetallicRoughness&&h?a.get(d.textureMetallicRoughness).id:void 0,emissiveFactor:[g,_,x],mrrFactors:b?[..._t]:[d.metallicFactor,d.roughnessFactor,n.mrrFactors[2]],isSchematic:b,colorTextureTransformMatrix:A(d.colorTextureTransform),normalTextureTransformMatrix:A(d.normalTextureTransform),scale:[S[0],S[1]],occlusionTextureTransformMatrix:A(d.occlusionTextureTransform),emissiveTextureTransformMatrix:A(d.emissiveTextureTransform),metallicRoughnessTextureTransformMatrix:A(d.metallicRoughnessTextureTransform),...i}))}const p=o.get(s);if(r.stageResources.materials.push(p),h){const e=e=>{null!=e&&r.stageResources.textures.push(a.get(e))};e(d.textureColor),e(d.textureNormal),e(d.textureOcclusion),e(d.textureEmissive),e(d.textureMetallicRoughness)}return p}(o,e,M,t,r,s,x),{geometry:a,vertexCount:T}=function(e,t){const r=e.attributes.position.count,n=(0,b.p)(e.indices||r,e.primitiveType),o=(0,h.xx)(3*r),{typedBuffer:a,typedBufferStride:s}=e.attributes.position;(0,m.a)(o,a,e.transform,3,s);const l=[[Ne.T.POSITION,new D.a(o,n,3,!0)]];if(null!=e.attributes.normal){const t=(0,h.xx)(3*r),{typedBuffer:o,typedBufferStride:a}=e.attributes.normal;(0,i.XL)(er,e.transform),(0,m.b)(t,o,er,3,a),l.push([Ne.T.NORMAL,new D.a(t,n,3,!0)])}if(null!=e.attributes.tangent){const t=(0,h.xx)(4*r),{typedBuffer:o,typedBufferStride:a}=e.attributes.tangent;(0,i.XL)(er,e.transform),(0,p.t)(t,o,er,4,a),l.push([Ne.T.TANGENT,new D.a(t,n,4,!0)])}if(null!=e.attributes.texCoord0){const t=(0,h.xx)(2*r),{typedBuffer:i,typedBufferStride:o}=e.attributes.texCoord0;(0,v.n)(t,i,2,o),l.push([Ne.T.UV0,new D.a(t,n,2,!0)])}if(null!=e.attributes.color){const t=new Uint8Array(4*r);4===e.attributes.color.elementCount?e.attributes.color instanceof f.ek?(0,p.s)(t,e.attributes.color,255):e.attributes.color instanceof f.mc?(0,_.c)(t,e.attributes.color):e.attributes.color instanceof f.v6&&(0,p.s)(t,e.attributes.color,1/256):(t.fill(255),e.attributes.color instanceof f.ct?(0,m.s)(t,e.attributes.color,255,4):e.attributes.color instanceof f.ne?(0,g.c)(t,e.attributes.color.typedBuffer,4,e.attributes.color.typedBufferStride):e.attributes.color instanceof f.mw&&(0,m.s)(t,e.attributes.color,1/256,4)),l.push([Ne.T.COLOR,new D.a(t,n,4,!0)])}return{geometry:new U.Z(t,l),vertexCount:r}}(e,null!=n?n:new Ht({})),w=a.boundingInfo;null!=w&&0===E&&((0,d.pp)(S,w.bbMin),(0,d.pp)(S,w.bbMax)),null!=n&&(M.stageResources.geometries.push(a),M.numberOfVertices+=T)})),C||a.push(M)})),{engineResources:a,referenceBoundingBox:S}}(o,M,O,t.skipHighLods&&null==r.specifiedLodIndex?{skipHighLods:!0}:{skipHighLods:!1,singleLodIndex:r.specifiedLodIndex});return{lods:R,referenceBoundingBox:I,isEsriSymbolResource:o.meta.isEsriSymbolResource,isWosr:!1}}const er=(0,o.Ue)()},66352:function(e,t,r){r.d(t,{F5:function(){return o},a9:function(){return n}});var n,i;r(19431);function o(e){switch(e){case"multiply":default:return n.Multiply;case"ignore":return n.Ignore;case"replace":return n.Replace;case"tint":return n.Tint}}(i=n||(n={}))[i.Multiply=1]="Multiply",i[i.Ignore=2]="Ignore",i[i.Replace=3]="Replace",i[i.Tint=4]="Tint"},44685:function(e,t,r){r.d(t,{Gw:function(){return c},U$:function(){return l},pV:function(){return s}});var n=r(81936),i=r(90331),o=r(15095);class a{constructor(e,t){this.layout=e,this.buffer="number"==typeof t?new ArrayBuffer(t*e.stride):t;for(const t of e.fields.keys()){const r=e.fields.get(t);this[t]=new r.constructor(this.buffer,r.offset,this.stride)}}get stride(){return this.layout.stride}get count(){return this.buffer.byteLength/this.stride}get byteLength(){return this.buffer.byteLength}getField(e,t){const r=this[e];return r&&r.elementCount===t.ElementCount&&r.elementType===t.ElementType?r:null}slice(e,t){return new a(this.layout,this.buffer.slice(e*this.stride,t*this.stride))}copyFrom(e,t=0,r=0,n=e.count){const i=this.stride;if(i%4==0){const o=new Uint32Array(e.buffer,t*i,n*i/4);new Uint32Array(this.buffer,r*i,n*i/4).set(o)}else{const o=new Uint8Array(e.buffer,t*i,n*i);new Uint8Array(this.buffer,r*i,n*i).set(o)}return this}get usedMemory(){return this.byteLength}dispose(){}}class s{constructor(e=null){this._stride=0,this._lastAligned=0,this._fields=new Map,e&&(this._stride=e.stride,e.fields.forEach((e=>this._fields.set(e[0],{...e[1],constructor:h(e[1].constructor)}))))}vec2f(e,t){return this._appendField(e,n.Eu,t),this}vec2f64(e,t){return this._appendField(e,n.q6,t),this}vec3f(e,t){return this._appendField(e,n.ct,t),this}vec3f64(e,t){return this._appendField(e,n.fP,t),this}vec4f(e,t){return this._appendField(e,n.ek,t),this}vec4f64(e,t){return this._appendField(e,n.Cd,t),this}mat3f(e,t){return this._appendField(e,n.gK,t),this}mat3f64(e,t){return this._appendField(e,n.ey,t),this}mat4f(e,t){return this._appendField(e,n.bj,t),this}mat4f64(e,t){return this._appendField(e,n.O1,t),this}vec4u8(e,t){return this._appendField(e,n.mc,t),this}f32(e,t){return this._appendField(e,n.ly,t),this}f64(e,t){return this._appendField(e,n.oS,t),this}u8(e,t){return this._appendField(e,n.D_,t),this}u16(e,t){return this._appendField(e,n.av,t),this}i8(e,t){return this._appendField(e,n.Hz,t),this}vec2i8(e,t){return this._appendField(e,n.Vs,t),this}vec2i16(e,t){return this._appendField(e,n.or,t),this}vec2u8(e,t){return this._appendField(e,n.xA,t),this}vec4u16(e,t){return this._appendField(e,n.v6,t),this}u32(e,t){return this._appendField(e,n.Nu,t),this}_appendField(e,t,r){if(this._fields.has(e))return void(0,o.hu)(!1,`${e} already added to vertex buffer layout`);const n=t.ElementCount*(0,i.n1)(t.ElementType),a=this._stride;this._stride+=n,this._fields.set(e,{size:n,constructor:t,offset:a,optional:r})}createBuffer(e){return new a(this,e)}createView(e){return new a(this,e)}clone(){const e=new s;return e._stride=this._stride,e._fields=new Map,this._fields.forEach(((t,r)=>e._fields.set(r,t))),e.BufferType=this.BufferType,e}get stride(){if(this._lastAligned!==this._fields.size){let e=1;this._fields.forEach((t=>e=Math.max(e,(0,i.n1)(t.constructor.ElementType)))),this._stride=Math.floor((this._stride+e-1)/e)*e,this._lastAligned=this._fields.size}return this._stride}get fields(){return this._fields}}function l(){return new s}class c{constructor(e){this.fields=new Array,e.fields.forEach(((e,t)=>{const r={...e,constructor:d(e.constructor)};this.fields.push([t,r])})),this.stride=e.stride}}const u=[n.ly,n.Eu,n.ct,n.ek,n.gK,n.bj,n.oS,n.q6,n.fP,n.Cd,n.ey,n.O1,n.D_,n.xA,n.ne,n.mc,n.av,n.TS,n.mw,n.v6,n.Nu,n.qt,n.G5,n.hu,n.Hz,n.Vs,n.P_,n.ir,n.o7,n.or,n.n1,n.zO,n.Jj,n.wA,n.PP,n.TN];function d(e){return`${e.ElementType}_${e.ElementCount}`}function h(e){return f.get(e)}const f=new Map;u.forEach((e=>f.set(d(e),e)))},95650:function(e,t,r){r.d(t,{Zu:function(){return l},bA:function(){return c},qj:function(){return u}});var n=r(35031),i=r(62295),o=r(93072),a=r(23410);function s(e){e.varyings.add("linearDepth","float")}function l(e){e.vertex.uniforms.add(new o.A("nearFar",((e,t)=>t.camera.nearFar)))}function c(e){e.vertex.code.add(a.H`float calculateLinearDepth(vec2 nearFar,float z) {
return (-z - nearFar[0]) / (nearFar[1] - nearFar[0]);
}`)}function u(e,t){const{vertex:r}=e;switch(t.output){case n.H_.Color:if(t.receiveShadows)return s(e),void r.code.add(a.H`void forwardLinearDepth() { linearDepth = gl_Position.w; }`);break;case n.H_.LinearDepth:case n.H_.Shadow:case n.H_.ShadowHighlight:case n.H_.ShadowExcludeHighlight:return e.include(i.up,t),s(e),l(e),c(e),void r.code.add(a.H`void forwardLinearDepth() {
linearDepth = calculateLinearDepth(nearFar, vPosition_view.z);
}`)}r.code.add(a.H`void forwardLinearDepth() {}`)}},57218:function(e,t,r){r.d(t,{w:function(){return i}});var n=r(23410);function i(e){e.vertex.code.add(n.H`vec4 offsetBackfacingClipPosition(vec4 posClip, vec3 posWorld, vec3 normalWorld, vec3 camPosWorld) {
vec3 camToVert = posWorld - camPosWorld;
bool isBackface = dot(camToVert, normalWorld) > 0.0;
if (isBackface) {
posClip.z += 0.0000003 * posClip.w;
}
return posClip;
}`)}},55208:function(e,t,r){r.d(t,{k:function(){return o}});var n=r(23410),i=r(21414);function o(e,t=!0){e.attributes.add(i.T.POSITION,"vec2"),t&&e.varyings.add("uv","vec2"),e.vertex.code.add(n.H`
    void main(void) {
      gl_Position = vec4(position, 0.0, 1.0);
      ${t?n.H`uv = position * 0.5 + vec2(0.5);`:""}
    }
  `)}},35031:function(e,t,r){var n;function i(e){return e===n.Shadow||e===n.ShadowHighlight||e===n.ShadowExcludeHighlight}function o(e){return function(e){return function(e){return s(e)||a(e)}(e)||e===n.LinearDepth}(e)||e===n.Normal}function a(e){return e===n.Highlight||e===n.ObjectAndLayerIdColor}function s(e){return e===n.Color||e===n.Alpha}r.d(t,{H_:function(){return n},Jb:function(){return o},Kr:function(){return i}}),function(e){e[e.Color=0]="Color",e[e.LinearDepth=1]="LinearDepth",e[e.Depth=2]="Depth",e[e.Normal=3]="Normal",e[e.Shadow=4]="Shadow",e[e.ShadowHighlight=5]="ShadowHighlight",e[e.ShadowExcludeHighlight=6]="ShadowExcludeHighlight",e[e.Highlight=7]="Highlight",e[e.Alpha=8]="Alpha",e[e.ObjectAndLayerIdColor=9]="ObjectAndLayerIdColor",e[e.CompositeColor=10]="CompositeColor",e[e.COUNT=11]="COUNT"}(n||(n={}))},5885:function(e,t,r){r.d(t,{f5:function(){return u}});var n=r(32114),i=r(3308),o=r(86717),a=r(81095),s=r(32006),l=(r(43036),r(23410));class c extends l.K{constructor(e){super(),this.slicePlaneLocalOrigin=e}}function u(e,t){d(e,t,new s.B("slicePlaneOrigin",((e,r)=>p(t,e,r))),new s.B("slicePlaneBasis1",((e,r)=>v(t,e,r,r.slicePlane?.basis1))),new s.B("slicePlaneBasis2",((e,r)=>v(t,e,r,r.slicePlane?.basis2))))}function d(e,t,...r){if(!t.hasSlicePlane){const r=l.H`#define rejectBySlice(_pos_) false
#define discardBySlice(_pos_) {}
#define highlightSlice(_color_, _pos_) (_color_)`;return t.hasSliceInVertexProgram&&e.vertex.code.add(r),void e.fragment.code.add(r)}t.hasSliceInVertexProgram&&e.vertex.uniforms.add(...r),e.fragment.uniforms.add(...r);const n=l.H`struct SliceFactors {
float front;
float side0;
float side1;
float side2;
float side3;
};
SliceFactors calculateSliceFactors(vec3 pos) {
vec3 rel = pos - slicePlaneOrigin;
vec3 slicePlaneNormal = -cross(slicePlaneBasis1, slicePlaneBasis2);
float slicePlaneW = -dot(slicePlaneNormal, slicePlaneOrigin);
float basis1Len2 = dot(slicePlaneBasis1, slicePlaneBasis1);
float basis2Len2 = dot(slicePlaneBasis2, slicePlaneBasis2);
float basis1Dot = dot(slicePlaneBasis1, rel);
float basis2Dot = dot(slicePlaneBasis2, rel);
return SliceFactors(
dot(slicePlaneNormal, pos) + slicePlaneW,
-basis1Dot - basis1Len2,
basis1Dot - basis1Len2,
-basis2Dot - basis2Len2,
basis2Dot - basis2Len2
);
}
bool sliceByFactors(SliceFactors factors) {
return factors.front < 0.0
&& factors.side0 < 0.0
&& factors.side1 < 0.0
&& factors.side2 < 0.0
&& factors.side3 < 0.0;
}
bool sliceEnabled() {
return dot(slicePlaneBasis1, slicePlaneBasis1) != 0.0;
}
bool sliceByPlane(vec3 pos) {
return sliceEnabled() && sliceByFactors(calculateSliceFactors(pos));
}
#define rejectBySlice(_pos_) sliceByPlane(_pos_)
#define discardBySlice(_pos_) { if (sliceByPlane(_pos_)) discard; }`,i=l.H`vec4 applySliceHighlight(vec4 color, vec3 pos) {
SliceFactors factors = calculateSliceFactors(pos);
const float HIGHLIGHT_WIDTH = 1.0;
const vec4 HIGHLIGHT_COLOR = vec4(0.0, 0.0, 0.0, 0.3);
factors.front /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.front);
factors.side0 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side0);
factors.side1 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side1);
factors.side2 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side2);
factors.side3 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side3);
if (sliceByFactors(factors)) {
return color;
}
float highlightFactor = (1.0 - step(0.5, factors.front))
* (1.0 - step(0.5, factors.side0))
* (1.0 - step(0.5, factors.side1))
* (1.0 - step(0.5, factors.side2))
* (1.0 - step(0.5, factors.side3));
return mix(color, vec4(HIGHLIGHT_COLOR.rgb, color.a), highlightFactor * HIGHLIGHT_COLOR.a);
}`,o=t.hasSliceHighlight?l.H`
        ${i}
        #define highlightSlice(_color_, _pos_) (sliceEnabled() ? applySliceHighlight(_color_, _pos_) : (_color_))
      `:l.H`#define highlightSlice(_color_, _pos_) (_color_)`;t.hasSliceInVertexProgram&&e.vertex.code.add(n),e.fragment.code.add(n),e.fragment.code.add(o)}function h(e,t,r){return e.instancedDoublePrecision?(0,o.s)(g,r.camera.viewInverseTransposeMatrix[3],r.camera.viewInverseTransposeMatrix[7],r.camera.viewInverseTransposeMatrix[11]):t.slicePlaneLocalOrigin}function f(e,t){return null!=e?(0,o.f)(_,t.origin,e):t.origin}function m(e,t,r){return e.hasSliceTranslatedView?null!=t?(0,n.Iu)(T,r.camera.viewMatrix,t):r.camera.viewMatrix:null}function p(e,t,r){if(null==r.slicePlane)return a.AG;const n=h(e,t,r),i=f(n,r.slicePlane),s=m(e,n,r);return null!=s?(0,o.e)(_,i,s):i}function v(e,t,r,n){if(null==n||null==r.slicePlane)return a.AG;const i=h(e,t,r),s=f(i,r.slicePlane),l=m(e,i,r);return null!=l?((0,o.g)(x,n,s),(0,o.e)(_,s,l),(0,o.e)(x,x,l),(0,o.f)(x,x,_)):n}const g=(0,a.Ue)(),_=(0,a.Ue)(),x=(0,a.Ue)(),T=(0,i.Ue)()},4731:function(e,t,r){r.d(t,{w:function(){return o}});var n=r(95650),i=r(23410);function o(e){(0,n.bA)(e),e.vertex.code.add(i.H`vec4 transformPositionWithDepth(mat4 proj, mat4 view, vec3 pos, vec2 nearFar, out float depth) {
vec4 eye = view * vec4(pos, 1.0);
depth = calculateLinearDepth(nearFar,eye.z);
return proj * eye;
}`),e.vertex.code.add(i.H`vec4 transformPosition(mat4 proj, mat4 view, vec3 pos) {
return proj * (view * vec4(pos, 1.0));
}`)}},99163:function(e,t,r){r.d(t,{PO:function(){return x},fQ:function(){return y}});var n=r(36663),i=r(46332),o=r(3965),a=r(3308),s=r(86717),l=r(81095),c=r(35031),u=r(5331),d=r(71354),h=r(32006),f=r(23410),m=r(11125),p=r(87621),v=r(67197),g=r(21414),_=r(30560);class x extends v.m{constructor(){super(...arguments),this.instancedDoublePrecision=!1,this.hasModelTransformation=!1}}(0,n._)([(0,v.o)()],x.prototype,"instancedDoublePrecision",void 0),(0,n._)([(0,v.o)()],x.prototype,"hasModelTransformation",void 0);class T extends f.K{constructor(){super(...arguments),this.modelTransformation=null}}const b=(0,o.Ue)();function y(e,t){const r=t.hasModelTransformation,n=t.instancedDoublePrecision;r&&(e.vertex.uniforms.add(new p.g("model",(e=>e.modelTransformation??a.Wd))),e.vertex.uniforms.add(new m.c("normalLocalOriginFromModel",(e=>((0,i.XL)(b,e.modelTransformation??a.Wd),b))))),t.instanced&&n&&(e.attributes.add(g.T.INSTANCEMODELORIGINHI,"vec3"),e.attributes.add(g.T.INSTANCEMODELORIGINLO,"vec3"),e.attributes.add(g.T.INSTANCEMODEL,"mat3"),e.attributes.add(g.T.INSTANCEMODELNORMAL,"mat3"));const o=e.vertex;n&&(o.include(u.$,t),o.uniforms.add(new h.B("viewOriginHi",((e,t)=>(0,_.U8)((0,s.s)(S,t.camera.viewInverseTransposeMatrix[3],t.camera.viewInverseTransposeMatrix[7],t.camera.viewInverseTransposeMatrix[11]),S))),new h.B("viewOriginLo",((e,t)=>(0,_.GB)((0,s.s)(S,t.camera.viewInverseTransposeMatrix[3],t.camera.viewInverseTransposeMatrix[7],t.camera.viewInverseTransposeMatrix[11]),S))))),o.code.add(f.H`
    vec3 getVertexInLocalOriginSpace() {
      return ${r?n?"(model * vec4(instanceModel * localPosition().xyz, 1.0)).xyz":"(model * localPosition()).xyz":n?"instanceModel * localPosition().xyz":"localPosition().xyz"};
    }

    vec3 subtractOrigin(vec3 _pos) {
      ${n?f.H`
          // Negated inputs are intentionally the first two arguments. The other way around the obfuscation in dpAdd() stopped
          // working for macOS 14+ and iOS 17+.
          // Issue: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/56280
          vec3 originDelta = dpAdd(-instanceModelOriginHi, -instanceModelOriginLo, viewOriginHi, viewOriginLo);
          return _pos - originDelta;`:"return vpos;"}
    }
    `),o.code.add(f.H`
    vec3 dpNormal(vec4 _normal) {
      return normalize(${r?n?"normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz)":"normalLocalOriginFromModel * _normal.xyz":n?"instanceModelNormal * _normal.xyz":"_normal.xyz"});
    }
    `),t.output===c.H_.Normal&&((0,d._8)(o),o.code.add(f.H`
    vec3 dpNormalView(vec4 _normal) {
      return normalize((viewNormal * ${r?n?"vec4(normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz), 1.0)":"vec4(normalLocalOriginFromModel * _normal.xyz, 1.0)":n?"vec4(instanceModelNormal * _normal.xyz, 1.0)":"_normal"}).xyz);
    }
    `)),t.hasVertexTangents&&o.code.add(f.H`
    vec4 dpTransformVertexTangent(vec4 _tangent) {
      ${r?n?"return vec4(normalLocalOriginFromModel * (instanceModelNormal * _tangent.xyz), _tangent.w);":"return vec4(normalLocalOriginFromModel * _tangent.xyz, _tangent.w);":n?"return vec4(instanceModelNormal * _tangent.xyz, _tangent.w);":"return _tangent;"}
    }`)}const S=(0,l.Ue)()},7792:function(e,t,r){r.d(t,{O:function(){return l},r:function(){return n}});var n,i,o=r(27755),a=r(23410),s=r(21414);function l(e,t){switch(t.normalType){case n.Compressed:e.attributes.add(s.T.NORMALCOMPRESSED,"vec2"),e.vertex.code.add(a.H`vec3 decompressNormal(vec2 normal) {
float z = 1.0 - abs(normal.x) - abs(normal.y);
return vec3(normal + sign(normal) * min(z, 0.0), z);
}
vec3 normalModel() {
return decompressNormal(normalCompressed);
}`);break;case n.Attribute:e.attributes.add(s.T.NORMAL,"vec3"),e.vertex.code.add(a.H`vec3 normalModel() {
return normal;
}`);break;case n.ScreenDerivative:e.fragment.code.add(a.H`vec3 screenDerivativeNormal(vec3 positionView) {
return normalize(cross(dFdx(positionView), dFdy(positionView)));
}`);break;default:(0,o.Bg)(t.normalType);case n.COUNT:case n.Ground:}}(i=n||(n={}))[i.Attribute=0]="Attribute",i[i.Compressed=1]="Compressed",i[i.Ground=2]="Ground",i[i.ScreenDerivative=3]="ScreenDerivative",i[i.COUNT=4]="COUNT"},91636:function(e,t,r){r.d(t,{f:function(){return o}});var n=r(23410),i=r(21414);function o(e){e.attributes.add(i.T.POSITION,"vec3"),e.vertex.code.add(n.H`vec3 positionModel() { return position; }`)}},40433:function(e,t,r){r.d(t,{R:function(){return c}});var n=r(66352),i=r(23410);function o(e){e.vertex.code.add(i.H`
    vec4 decodeSymbolColor(vec4 symbolColor, out int colorMixMode) {
      float symbolAlpha = 0.0;

      const float maxTint = 85.0;
      const float maxReplace = 170.0;
      const float scaleAlpha = 3.0;

      if (symbolColor.a > maxReplace) {
        colorMixMode = ${i.H.int(n.a9.Multiply)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxReplace);
      } else if (symbolColor.a > maxTint) {
        colorMixMode = ${i.H.int(n.a9.Replace)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxTint);
      } else if (symbolColor.a > 0.0) {
        colorMixMode = ${i.H.int(n.a9.Tint)};
        symbolAlpha = scaleAlpha * symbolColor.a;
      } else {
        colorMixMode = ${i.H.int(n.a9.Multiply)};
        symbolAlpha = 0.0;
      }

      return vec4(symbolColor.r, symbolColor.g, symbolColor.b, symbolAlpha);
    }
  `)}var a=r(59842),s=r(21414),l=r(13705);function c(e,t){t.hasSymbolColors?(e.include(o),e.attributes.add(s.T.SYMBOLCOLOR,"vec4"),e.varyings.add("colorMixMode","mediump float"),e.vertex.code.add(i.H`int symbolColorMixMode;
vec4 getSymbolColor() {
return decodeSymbolColor(symbolColor, symbolColorMixMode) * 0.003921568627451;
}
void forwardColorMixMode() {
colorMixMode = float(symbolColorMixMode) + 0.5;
}`)):(e.fragment.uniforms.add(new a._("colorMixMode",(e=>l.FZ[e.colorMixMode]))),e.vertex.code.add(i.H`vec4 getSymbolColor() { return vec4(1.0); }
void forwardColorMixMode() {}`))}},82082:function(e,t,r){r.d(t,{D:function(){return l},N:function(){return n}});var n,i,o=r(27755),a=r(23410),s=r(21414);function l(e,t){switch(t.textureCoordinateType){case n.Default:return e.attributes.add(s.T.UV0,"vec2"),e.varyings.add("vuv0","vec2"),void e.vertex.code.add(a.H`void forwardTextureCoordinates() {
vuv0 = uv0;
}`);case n.Compressed:return e.attributes.add(s.T.UV0,"vec2"),e.varyings.add("vuv0","vec2"),void e.vertex.code.add(a.H`vec2 getUV0() {
return uv0 / 16384.0;
}
void forwardTextureCoordinates() {
vuv0 = getUV0();
}`);case n.Atlas:return e.attributes.add(s.T.UV0,"vec2"),e.varyings.add("vuv0","vec2"),e.attributes.add(s.T.UVREGION,"vec4"),e.varyings.add("vuvRegion","vec4"),void e.vertex.code.add(a.H`void forwardTextureCoordinates() {
vuv0 = uv0;
vuvRegion = uvRegion;
}`);default:(0,o.Bg)(t.textureCoordinateType);case n.None:return void e.vertex.code.add(a.H`void forwardTextureCoordinates() {}`);case n.COUNT:return}}(i=n||(n={}))[i.None=0]="None",i[i.Default=1]="Default",i[i.Atlas=2]="Atlas",i[i.Compressed=3]="Compressed",i[i.COUNT=4]="COUNT"},6502:function(e,t,r){r.d(t,{c:function(){return o}});var n=r(23410),i=r(21414);function o(e,t){t.hasVertexColors?(e.attributes.add(i.T.COLOR,"vec4"),e.varyings.add("vColor","vec4"),e.vertex.code.add(n.H`void forwardVertexColor() { vColor = color; }`),e.vertex.code.add(n.H`void forwardNormalizedVertexColor() { vColor = color * 0.003921568627451; }`)):e.vertex.code.add(n.H`void forwardVertexColor() {}
void forwardNormalizedVertexColor() {}`)}},78549:function(e,t,r){r.d(t,{Bb:function(){return d},Pf:function(){return f},d4:function(){return h}});var n=r(27755),i=r(3965),o=r(52721),a=r(7792),s=r(62295),l=r(23410),c=r(55784),u=r(11125);function d(e,t){switch(t.normalType){case a.r.Attribute:case a.r.Compressed:e.include(a.O,t),e.varyings.add("vNormalWorld","vec3"),e.varyings.add("vNormalView","vec3"),e.vertex.uniforms.add(new c.j("transformNormalGlobalFromModel",(e=>e.transformNormalGlobalFromModel)),new u.c("transformNormalViewFromGlobal",(e=>e.transformNormalViewFromGlobal))),e.vertex.code.add(l.H`void forwardNormal() {
vNormalWorld = transformNormalGlobalFromModel * normalModel();
vNormalView = transformNormalViewFromGlobal * vNormalWorld;
}`);break;case a.r.Ground:e.include(s.up,t),e.varyings.add("vNormalWorld","vec3"),e.vertex.code.add(l.H`
        void forwardNormal() {
          vNormalWorld = ${t.spherical?l.H`normalize(vPositionWorldCameraRelative);`:l.H`vec3(0.0, 0.0, 1.0);`}
        }
        `);break;case a.r.ScreenDerivative:e.vertex.code.add(l.H`void forwardNormal() {}`);break;default:(0,n.Bg)(t.normalType);case a.r.COUNT:}}class h extends s.su{constructor(){super(...arguments),this.transformNormalViewFromGlobal=(0,i.Ue)()}}class f extends s.OU{constructor(){super(...arguments),this.transformNormalGlobalFromModel=(0,i.Ue)(),this.toMapSpace=(0,o.Ue)()}}},62295:function(e,t,r){r.d(t,{OU:function(){return v},su:function(){return p},up:function(){return m}});var n=r(3965),i=r(3308),o=r(81095),a=r(91636),s=r(5331),l=r(32006),c=r(43036),u=r(23410),d=r(55784),h=r(11125),f=r(87621);function m(e,t){e.include(a.f);const r=e.vertex;r.include(s.$,t),e.varyings.add("vPositionWorldCameraRelative","vec3"),e.varyings.add("vPosition_view","vec3"),r.uniforms.add(new c.J("transformWorldFromViewTH",(e=>e.transformWorldFromViewTH)),new c.J("transformWorldFromViewTL",(e=>e.transformWorldFromViewTL)),new h.c("transformViewFromCameraRelativeRS",(e=>e.transformViewFromCameraRelativeRS)),new f.g("transformProjFromView",(e=>e.transformProjFromView)),new d.j("transformWorldFromModelRS",(e=>e.transformWorldFromModelRS)),new l.B("transformWorldFromModelTH",(e=>e.transformWorldFromModelTH)),new l.B("transformWorldFromModelTL",(e=>e.transformWorldFromModelTL))),r.code.add(u.H`vec3 positionWorldCameraRelative() {
vec3 rotatedModelPosition = transformWorldFromModelRS * positionModel();
vec3 transform_CameraRelativeFromModel = dpAdd(
transformWorldFromModelTL,
transformWorldFromModelTH,
-transformWorldFromViewTL,
-transformWorldFromViewTH
);
return transform_CameraRelativeFromModel + rotatedModelPosition;
}`),r.code.add(u.H`
    void forwardPosition(float fOffset) {
      vPositionWorldCameraRelative = positionWorldCameraRelative();
      if (fOffset != 0.0) {
        vPositionWorldCameraRelative += fOffset * ${t.spherical?u.H`normalize(transformWorldFromViewTL + vPositionWorldCameraRelative)`:u.H`vec3(0.0, 0.0, 1.0)`};
      }

      vPosition_view = transformViewFromCameraRelativeRS * vPositionWorldCameraRelative;
      gl_Position = transformProjFromView * vec4(vPosition_view, 1.0);
    }
  `),e.fragment.uniforms.add(new c.J("transformWorldFromViewTL",(e=>e.transformWorldFromViewTL))),r.code.add(u.H`vec3 positionWorld() {
return transformWorldFromViewTL + vPositionWorldCameraRelative;
}`),e.fragment.code.add(u.H`vec3 positionWorld() {
return transformWorldFromViewTL + vPositionWorldCameraRelative;
}`)}class p extends u.K{constructor(){super(...arguments),this.transformWorldFromViewTH=(0,o.Ue)(),this.transformWorldFromViewTL=(0,o.Ue)(),this.transformViewFromCameraRelativeRS=(0,n.Ue)(),this.transformProjFromView=(0,i.Ue)()}}class v extends u.K{constructor(){super(...arguments),this.transformWorldFromModelRS=(0,n.Ue)(),this.transformWorldFromModelTH=(0,o.Ue)(),this.transformWorldFromModelTL=(0,o.Ue)()}}},72129:function(e,t,r){r.d(t,{i:function(){return s}});var n=r(27755),i=r(82082),o=r(23410);function a(e){e.fragment.code.add(o.H`vec4 textureAtlasLookup(sampler2D tex, vec2 textureCoordinates, vec4 atlasRegion) {
vec2 atlasScale = atlasRegion.zw - atlasRegion.xy;
vec2 uvAtlas = fract(textureCoordinates) * atlasScale + atlasRegion.xy;
float maxdUV = 0.125;
vec2 dUVdx = clamp(dFdx(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
vec2 dUVdy = clamp(dFdy(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
return textureGrad(tex, uvAtlas, dUVdx, dUVdy);
}`)}function s(e,t){switch(e.include(i.D,t),t.textureCoordinateType){case i.N.Default:case i.N.Compressed:return void e.fragment.code.add(o.H`vec4 textureLookup(sampler2D tex, vec2 uv) {
return texture(tex, uv);
}`);case i.N.Atlas:return e.include(a),void e.fragment.code.add(o.H`vec4 textureLookup(sampler2D tex, vec2 uv) {
return textureAtlasLookup(tex, uv, vuvRegion);
}`);default:(0,n.Bg)(t.textureCoordinateType);case i.N.None:case i.N.COUNT:return}}},5664:function(e,t,r){r.d(t,{L:function(){return m}});var n=r(56999),i=r(52721),o=r(86717),a=r(81095),s=r(43036),l=r(23410);function c(e){e.vertex.code.add(l.H`float screenSizePerspectiveViewAngleDependentFactor(float absCosAngle) {
return absCosAngle * absCosAngle * absCosAngle;
}`),e.vertex.code.add(l.H`vec3 screenSizePerspectiveScaleFactor(float absCosAngle, float distanceToCamera, vec3 params) {
return vec3(
min(params.x / (distanceToCamera - params.y), 1.0),
screenSizePerspectiveViewAngleDependentFactor(absCosAngle),
params.z
);
}`),e.vertex.code.add(l.H`float applyScreenSizePerspectiveScaleFactorFloat(float size, vec3 factor) {
return mix(size * clamp(factor.x, factor.z, 1.0), size, factor.y);
}`),e.vertex.code.add(l.H`float screenSizePerspectiveScaleFloat(float size, float absCosAngle, float distanceToCamera, vec3 params) {
return applyScreenSizePerspectiveScaleFactorFloat(
size,
screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params)
);
}`),e.vertex.code.add(l.H`vec2 applyScreenSizePerspectiveScaleFactorVec2(vec2 size, vec3 factor) {
return mix(size * clamp(factor.x, factor.z, 1.0), size, factor.y);
}`),e.vertex.code.add(l.H`vec2 screenSizePerspectiveScaleVec2(vec2 size, float absCosAngle, float distanceToCamera, vec3 params) {
return applyScreenSizePerspectiveScaleFactorVec2(size, screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params));
}`)}function u(e){return(0,o.s)(d,e.parameters.divisor,e.parameters.offset,e.minScaleFactor)}const d=(0,a.Ue)();var h=r(71354),f=r(63371);function m(e,t){const r=e.vertex;t.hasVerticalOffset?(function(e){e.uniforms.add(new f.N("verticalOffset",((e,t)=>{const{minWorldLength:r,maxWorldLength:i,screenLength:o}=e.verticalOffset,a=Math.tan(.5*t.camera.fovY)/(.5*t.camera.fullViewport[3]),s=t.camera.pixelRatio||1;return(0,n.s)(p,o*s,a,r,i)})))}(r),t.hasScreenSizePerspective&&(e.include(c),function(e){e.uniforms.add(new s.J("screenSizePerspectiveAlignment",(e=>u(e.screenSizePerspectiveAlignment||e.screenSizePerspective))))}(r),(0,h.hY)(e.vertex,t)),r.code.add(l.H`
      vec3 calculateVerticalOffset(vec3 worldPos, vec3 localOrigin) {
        float viewDistance = length((view * vec4(worldPos, 1.0)).xyz);
        ${t.spherical?l.H`vec3 worldNormal = normalize(worldPos + localOrigin);`:l.H`vec3 worldNormal = vec3(0.0, 0.0, 1.0);`}
        ${t.hasScreenSizePerspective?l.H`
            float cosAngle = dot(worldNormal, normalize(worldPos - cameraPosition));
            float verticalOffsetScreenHeight = screenSizePerspectiveScaleFloat(verticalOffset.x, abs(cosAngle), viewDistance, screenSizePerspectiveAlignment);`:l.H`
            float verticalOffsetScreenHeight = verticalOffset.x;`}
        // Screen sized offset in world space, used for example for line callouts
        float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * viewDistance, verticalOffset.z, verticalOffset.w);
        return worldNormal * worldOffset;
      }

      vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) {
        return worldPos + calculateVerticalOffset(worldPos, localOrigin);
      }
    `)):r.code.add(l.H`vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) { return worldPos; }`)}const p=(0,i.Ue)()},74312:function(e,t,r){r.d(t,{s:function(){return E}});var n=r(95650),i=r(35031),o=r(5885),a=r(4731),s=r(7792),l=r(23410),c=r(21414);function u(e,t){const r=t.output===i.H_.ObjectAndLayerIdColor,n=t.objectAndLayerIdColorInstanced;r&&(e.varyings.add("objectAndLayerIdColorVarying","vec4"),n?e.attributes.add(c.T.INSTANCEOBJECTANDLAYERIDCOLOR,"vec4"):e.attributes.add(c.T.OBJECTANDLAYERIDCOLOR,"vec4")),e.vertex.code.add(l.H`
     void forwardObjectAndLayerIdColor() {
      ${r?n?l.H`objectAndLayerIdColorVarying = instanceObjectAndLayerIdColor * 0.003921568627451;`:l.H`objectAndLayerIdColorVarying = objectAndLayerIdColor * 0.003921568627451;`:l.H``} }`),e.fragment.code.add(l.H`
      void outputObjectAndLayerIdColor() {
        ${r?l.H`fragColor = objectAndLayerIdColorVarying;`:l.H``} }`)}var d=r(82082),h=r(78549),f=r(52446),m=r(9794);function p(e,t){switch(t.output){case i.H_.Shadow:case i.H_.ShadowHighlight:case i.H_.ShadowExcludeHighlight:e.fragment.include(f.f),e.fragment.code.add(l.H`float _calculateFragDepth(const in float depth) {
const float SLOPE_SCALE = 2.0;
const float BIAS = 20.0 * .000015259;
float m = max(abs(dFdx(depth)), abs(dFdy(depth)));
return depth + SLOPE_SCALE * m + BIAS;
}
void outputDepth(float _linearDepth) {
fragColor = floatToRgba4(_calculateFragDepth(_linearDepth));
}`);break;case i.H_.LinearDepth:e.fragment.include(m.n),e.fragment.code.add(l.H`void outputDepth(float _linearDepth) {
fragColor = float2rgba(_linearDepth);
}`)}}var v=r(52721),g=r(15176);const _=(0,v.al)(1,1,0,1),x=(0,v.al)(1,0,1,1);function T(e){e.fragment.uniforms.add(new g.A("depthTexture",((e,t)=>t.mainDepth))),e.fragment.constants.add("occludedHighlightFlag","vec4",_).add("unoccludedHighlightFlag","vec4",x),e.fragment.code.add(l.H`void outputHighlight() {
float sceneDepth = float(texelFetch(depthTexture, ivec2(gl_FragCoord.xy), 0).x);
if (gl_FragCoord.z > sceneDepth + 5e-7) {
fragColor = occludedHighlightFlag;
} else {
fragColor = unoccludedHighlightFlag;
}
}`)}var b=r(91024),y=r(49745),S=r(71354),A=r(70984);function E(e,t){const{vertex:r,fragment:c}=e,f=t.hasColorTexture&&t.alphaDiscardMode!==A.JJ.Opaque;switch(t.output){case i.H_.LinearDepth:case i.H_.Shadow:case i.H_.ShadowHighlight:case i.H_.ShadowExcludeHighlight:case i.H_.ObjectAndLayerIdColor:(0,S.Sv)(r,t),e.include(a.w,t),e.include(d.D,t),e.include(b.k,t),e.include(p,t),e.include(o.f5,t),e.include(u,t),(0,n.Zu)(e),e.varyings.add("depth","float"),f&&c.uniforms.add(new g.A("tex",(e=>e.texture))),r.code.add(l.H`void main(void) {
vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);
forwardTextureCoordinates();
forwardObjectAndLayerIdColor();
}`),e.include(y.z,t),c.code.add(l.H`
          void main(void) {
            discardBySlice(vpos);
            ${f?l.H`
                    vec4 texColor = texture(tex, ${t.hasColorTextureTransform?l.H`colorUV`:l.H`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}
            ${t.output===i.H_.ObjectAndLayerIdColor?l.H`outputObjectAndLayerIdColor();`:l.H`outputDepth(depth);`}
          }
        `);break;case i.H_.Normal:{(0,S.Sv)(r,t),e.include(a.w,t),e.include(s.O,t),e.include(h.Bb,t),e.include(d.D,t),e.include(b.k,t),f&&c.uniforms.add(new g.A("tex",(e=>e.texture))),t.normalType===s.r.ScreenDerivative&&e.varyings.add("vPositionView","vec3");const n=t.normalType===s.r.Attribute||t.normalType===s.r.Compressed;r.code.add(l.H`
          void main(void) {
            vpos = getVertexInLocalOriginSpace();

            ${n?l.H`vNormalWorld = dpNormalView(vvLocalNormal(normalModel()));`:l.H`
                  // Get vertex position in camera space for screen-space derivative normals
                  vPositionView = (view * vec4(vpos, 1.0)).xyz;
                `}
            vpos = subtractOrigin(vpos);
            vpos = addVerticalOffset(vpos, localOrigin);
            gl_Position = transformPosition(proj, view, vpos);
            forwardTextureCoordinates();
          }
        `),e.include(o.f5,t),e.include(y.z,t),c.code.add(l.H`
          void main() {
            discardBySlice(vpos);
            ${f?l.H`
                    vec4 texColor = texture(tex, ${t.hasColorTextureTransform?l.H`colorUV`:l.H`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}

            ${t.normalType===s.r.ScreenDerivative?l.H`vec3 normal = screenDerivativeNormal(vPositionView);`:l.H`
                  vec3 normal = normalize(vNormalWorld);
                  if (gl_FrontFacing == false){
                    normal = -normal;
                  }`}
            fragColor = vec4(0.5 + 0.5 * normal, 1.0);
          }
        `);break}case i.H_.Highlight:(0,S.Sv)(r,t),e.include(a.w,t),e.include(d.D,t),e.include(b.k,t),f&&c.uniforms.add(new g.A("tex",(e=>e.texture))),r.code.add(l.H`void main(void) {
vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();
}`),e.include(o.f5,t),e.include(y.z,t),e.include(T,t),c.code.add(l.H`
          void main() {
            discardBySlice(vpos);
            ${f?l.H`
                    vec4 texColor = texture(tex, ${t.hasColorTextureTransform?l.H`colorUV`:l.H`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}
            outputHighlight();
          }
        `)}}},31227:function(e,t,r){r.d(t,{K:function(){return a},S:function(){return o}});var n=r(9794),i=r(23410);function o(e){e.include(n.n),e.code.add(i.H`float linearDepthFromFloat(float depth, vec2 nearFar) {
return -(depth * (nearFar[1] - nearFar[0]) + nearFar[0]);
}
float linearDepthFromRGBA(vec4 depth, vec2 nearFar) {
return linearDepthFromFloat(rgba2float(depth), nearFar);
}
float linearDepthFromTexture(sampler2D depthTexture, vec2 uv, vec2 nearFar) {
ivec2 iuv = ivec2(uv * vec2(textureSize(depthTexture, 0)));
return linearDepthFromRGBA(texelFetch(depthTexture, iuv, 0), nearFar);
}`)}function a(e){e.code.add(i.H`float linearizeDepth(float depth, vec2 nearFar) {
float depthNdc = depth * 2.0 - 1.0;
return (2.0 * nearFar[0] * nearFar[1]) / (depthNdc * (nearFar[1] - nearFar[0]) - (nearFar[1] + nearFar[0]));
}
float linearDepthFromTexture(sampler2D depthTexture, vec2 uv, vec2 nearFar) {
ivec2 iuv = ivec2(uv * vec2(textureSize(depthTexture, 0)));
float depth = texelFetch(depthTexture, iuv, 0).r;
return linearizeDepth(depth, nearFar);
}`)}},3417:function(e,t,r){r.d(t,{Q:function(){return p}});var n=r(3965),i=r(84164),o=r(82082),a=r(72129),s=r(2833),l=r(93072),c=r(23410),u=r(11125),d=r(37649),h=r(15176),f=r(40017),m=r(21414);function p(e,t){const r=e.fragment;t.hasVertexTangents?(e.attributes.add(m.T.TANGENT,"vec4"),e.varyings.add("vTangent","vec4"),t.doubleSidedMode===s.q.WindingOrder?r.code.add(c.H`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = gl_FrontFacing ? vTangent.w : -vTangent.w;
vec3 tangent = normalize(gl_FrontFacing ? vTangent.xyz : -vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`):r.code.add(c.H`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = vTangent.w;
vec3 tangent = normalize(vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`)):r.code.add(c.H`mat3 computeTangentSpace(vec3 normal, vec3 pos, vec2 st) {
vec3 Q1 = dFdx(pos);
vec3 Q2 = dFdy(pos);
vec2 stx = dFdx(st);
vec2 sty = dFdy(st);
float det = stx.t * sty.s - sty.t * stx.s;
vec3 T = stx.t * Q2 - sty.t * Q1;
T = T - normal * dot(normal, T);
T *= inversesqrt(max(dot(T,T), 1.e-10));
vec3 B = sign(det) * cross(normal, T);
return mat3(T, B, normal);
}`),t.textureCoordinateType!==o.N.None&&(e.include(a.i,t),r.uniforms.add(t.pbrTextureBindType===f.P.Pass?new h.A("normalTexture",(e=>e.textureNormal)):new d.R("normalTexture",(e=>e.textureNormal))),t.hasNormalTextureTransform&&(r.uniforms.add(new l.A("scale",(e=>e.scale??i.hq))),r.uniforms.add(new u.c("normalTextureTransformMatrix",(e=>e.normalTextureTransformMatrix??n.Wd)))),r.code.add(c.H`vec3 computeTextureNormal(mat3 tangentSpace, vec2 uv) {
vec3 rawNormal = textureLookup(normalTexture, uv).rgb * 2.0 - 1.0;`),t.hasNormalTextureTransform&&r.code.add(c.H`mat3 normalTextureRotation = mat3(normalTextureTransformMatrix[0][0]/scale[0], normalTextureTransformMatrix[0][1]/scale[1], 0.0,
normalTextureTransformMatrix[1][0]/scale[0], normalTextureTransformMatrix[1][1]/scale[1], 0.0,
0.0, 0.0, 0.0 );
rawNormal.xy = (normalTextureRotation * vec3(rawNormal.x, rawNormal.y, 1.0)).xy;`),r.code.add(c.H`return tangentSpace * rawNormal;
}`))}},11827:function(e,t,r){r.d(t,{K:function(){return k}});var n,i,o=r(23410),a=r(15176),s=r(36663),l=r(19431),c=r(61681),u=r(76868),d=r(12928),h=r(81977),f=(r(39994),r(13802),r(4157),r(40266)),m=r(36531);!function(e){e[e.RED=0]="RED",e[e.RG=1]="RG",e[e.RGBA4=2]="RGBA4",e[e.RGBA=3]="RGBA",e[e.RGBA_MIPMAP=4]="RGBA_MIPMAP",e[e.R16F=5]="R16F",e[e.RGBA16F=6]="RGBA16F"}(n||(n={})),function(e){e[e.DEPTH_STENCIL_TEXTURE=0]="DEPTH_STENCIL_TEXTURE",e[e.DEPTH16_BUFFER=1]="DEPTH16_BUFFER"}(i||(i={}));const p=5e5;var v=r(74396),g=r(35031);const _={required:[]},x=(g.H_.LinearDepth,g.H_.CompositeColor,g.H_.Highlight,{required:[g.H_.Depth,g.H_.Normal]});class T extends v.Z{consumes(){return _}get usedMemory(){return 0}get isDecoration(){return!1}get running(){return!1}get materialReference(){return null}modify(e){}get numGeometries(){return 0}get hasOccludees(){return!1}queryRenderOccludedState(e){return!1}}class b extends T{}var y=r(9969),S=r(52756),A=r(5474),E=r(95194),w=r(24756),C=r(17346);class M extends S.A{initializeProgram(e){return new E.$(e.rctx,M.shader.get().build(),A.i)}initializePipeline(){return(0,C.sm)({colorWrite:C.BK})}}M.shader=new y.J(w.S,(()=>r.e(9018).then(r.bind(r,99018))));var O=r(84164);class R extends o.K{constructor(){super(...arguments),this.projScale=1}}class I extends R{constructor(){super(...arguments),this.intensity=1}}class P extends o.K{}class N extends P{constructor(){super(...arguments),this.blurSize=(0,O.Ue)()}}var H=r(91800);class L extends S.A{initializeProgram(e){return new E.$(e.rctx,L.shader.get().build(),A.i)}initializePipeline(){return(0,C.sm)({colorWrite:C.BK})}}L.shader=new y.J(H.S,(()=>r.e(4168).then(r.bind(r,4168))));var F,D;r(22445),r(22855);(D=F||(F={}))[D.Antialiasing=0]="Antialiasing",D[D.HighQualityTransparency=1]="HighQualityTransparency",D[D.HighResolutionVoxel=2]="HighResolutionVoxel",D[D.HighResolutionAtmosphere=3]="HighResolutionAtmosphere",D[D.SSAO=4]="SSAO",D[D.WaterReflection=5]="WaterReflection",D[D.HighResolutionShadows=6]="HighResolutionShadows",D[D.PhysicalPixelRendering=7]="PhysicalPixelRendering";var B=r(46378),U=r(91907),z=r(71449),G=r(80479);const V=2;let W=class extends b{constructor(e){super(e),this._context=null,this._passParameters=new I,this._drawParameters=new N,this.produces=new Map([[B.r.SSAO,()=>this._produces()]])}_getCameraElevation(){return this._context?.renderContext.bindParameters.camera.relativeElevation??1/0}_produces(){return null!=this._enableTime&&null!=this._context&&this._getCameraElevation()<p}consumes(){return this._produces()?x:_}initializeRenderContext(e){this._context=e,this.addHandles([(0,u.YP)((()=>this.view.qualitySettings.ambientOcclusion||this._context?.isFeatureEnabled(F.SSAO)),(e=>e?this._enable():this._disable()),u.tX)])}uninitializeRenderContext(){this._disable(),this._context=null}_disable(){this._passParameters.noiseTexture=(0,c.M2)(this._passParameters.noiseTexture),this._enableTime=null}destroy(){this._disable()}_enable(){if(null!=this._enableTime||!this._context)return;const e=Uint8Array.from(atob("eXKEvZaUc66cjIKElE1jlJ6MjJ6Ufkl+jn2fcXp5jBx7c6KEflSGiXuXeW6OWs+tfqZ2Yot2Y7Zzfo2BhniEj3xoiXuXj4eGZpqEaHKDWjSMe7palFlzc3BziYOGlFVzg6Zzg7CUY5JrjFF7eYJ4jIKEcyyEonSXe7qUfqZ7j3xofqZ2c4R5lFZ5Y0WUbppoe1l2cIh2ezyUho+BcHN2cG6DbpqJhqp2e1GcezhrdldzjFGUcyxjc3aRjDyEc1h7Sl17c6aMjH92pb6Mjpd4dnqBjMOEhqZleIOBYzB7gYx+fnqGjJuEkWlwnCx7fGl+c4hjfGyRe5qMlNOMfnqGhIWHc6OMi4GDc6aMfqZuc6aMzqJzlKZ+lJ6Me3qRfoFue0WUhoR5UraEa6qMkXiPjMOMlJOGe7JrUqKMjK6MeYRzdod+Sl17boiPc6qEeYBlcIh2c1WEe7GDiWCDa0WMjEmMdod+Y0WcdntzhmN8WjyMjKJjiXtzgYxYaGd+a89zlEV7e2GJfnd+lF1rcK5zc4p5cHuBhL6EcXp5eYB7fnh8iX6HjIKEeaxuiYOGc66RfG2Ja5hzjlGMjEmMe9OEgXuPfHyGhPeEdl6JY02McGuMfnqGhFiMa3WJfnx2l4hwcG1uhmN8c0WMc39og1GBbrCEjE2EZY+JcIh2cIuGhIWHe0mEhIVrc09+gY5+eYBlnCyMhGCDl3drfmmMgX15aGd+gYx+fnuRfnhzY1SMsluJfnd+hm98WtNrcIuGh4SEj0qPdkqOjFF7jNNjdnqBgaqUjMt7boeBhnZ4jDR7c5pze4GGjEFrhLqMjHyMc0mUhKZze4WEa117kWlwbpqJjHZ2eX2Bc09zeId+e0V7WlF7jHJ2l72BfId8l3eBgXyBe897jGl7c66cgW+Xc76EjKNbgaSEjGx4fId8jFFjgZB8cG6DhlFziZhrcIh2fH6HgUqBgXiPY8dahGFzjEmMhEFre2dxhoBzc5SGfleGe6alc7aUeYBlhKqUdlp+cH5za4OEczxza0Gcc4J2jHZ5iXuXjH2Jh5yRjH2JcFx+hImBjH+MpddCl3dreZeJjIt8ZW18bm1zjoSEeIOBlF9oh3N7hlqBY4+UeYFwhLJjeYFwaGd+gUqBYxiEYot2fqZ2ondzhL6EYyiEY02Ea0VjgZB8doaGjHxoc66cjEGEiXuXiXWMiZhreHx8frGMe75rY02Ec5pzfnhzlEp4a3VzjM+EhFFza3mUY7Zza1V5e2iMfGyRcziEhDyEkXZ2Y4OBnCx7g5t2eyBjgV6EhEFrcIh2dod+c4Z+nJ5zjm15jEmUeYxijJp7nL6clIpjhoR5WrZraGd+fnuRa6pzlIiMg6ZzfHx5foh+eX1ufnB5eX1ufnB5aJt7UqKMjIh+e3aBfm5lbYSBhGFze6J4c39oc0mUc4Z+e0V7fKFVe0WEdoaGY02Ec4Z+Y02EZYWBfH6HgU1+gY5+hIWUgW+XjJ57ebWRhFVScHuBfJ6PhBx7WqJzlM+Ujpd4gHZziX6HjHmEgZN+lJt5boiPe2GJgX+GjIGJgHZzeaxufnB5hF2JtdN7jJ57hp57hK6ElFVzg6ZzbmiEbndzhIWHe3uJfoFue3qRhJd2j3xoc65zlE1jc3p8lE1jhniEgXJ7e657vZaUc3qBh52BhIF4aHKDa9drgY5+c52GWqZzbpqJe8tjnM+UhIeMfo2BfGl+hG1zSmmMjKJjZVaGgX15c1lze0mEp4OHa3mUhIWHhDyclJ6MeYOJkXiPc0VzhFiMlKaEboSJa5Jze41re3qRhn+HZYWBe0mEc4p5fnORbox5lEp4hGFjhGGEjJuEc1WEhLZjeHeGa7KlfHx2hLaMeX1ugY5+hIWHhKGPjMN7c1WEho1zhoBzZYx7fnhzlJt5exyUhFFziXtzfmmMa6qMYyiEiXxweV12kZSMeWqXSl17fnhzxmmMrVGEe1mcc4p5eHeGjK6MgY5+doaGa6pzlGV7g1qBh4KHkXiPeW6OaKqafqZ2eXZ5e1V7jGd7boSJc3BzhJd2e0mcYot2h1RoY8dahK6EQmWEWjx7e1l2lL6UgXyBdnR4eU9zc0VreX1umqaBhld7fo2Bc6KEc5Z+hDyEcIeBWtNrfHyGe5qMhMuMe5qMhEGEbVVupcNzg3aHhIF4boeBe0mEdlptc39ofFl5Y8uUlJOGiYt2UmGEcyxjjGx4jFF7a657ZYWBnElzhp57iXtrgZN+tfOEhIOBjE2HgU1+e8tjjKNbiWCDhE15gUqBgYN7fnqGc66ce9d7iYSBj0qPcG6DnGGcT3eGa6qMZY+JlIiMl4hwc3aRdnqBlGV7eHJ2hLZjfnuRhDyEeX6MSk17g6Z+c6aUjHmEhIF4gXyBc76EZW18fGl+fkl+jCxrhoVwhDyUhIqGlL2DlI6EhJd2tdN7eYORhEGMa2Faa6pzc3Bzc4R5lIRznM+UY9eMhDycc5Z+c4p5c4iGY117pb6MgXuPrbJafnx2eYOJeXZ5e657hDyEcziElKZjfoB5eHeGj4WRhGGEe6KGeX1utTStc76EhFGJnCyMa5hzfH6HnNeceYB7hmN8gYuMhIVrczSMgYF8h3N7c5pza5hzjJqEYIRdgYuMlL2DeYRzhGGEeX1uhLaEc4iGeZ1zdl6JhrVteX6Me2iMfm5lWqJzSpqEa6pzdnmchHx2c6OMhNdrhoR5g3aHczxzeW52gV6Ejm15frGMc0Vzc4Z+l3drfniJe+9rWq5rlF1rhGGEhoVwe9OEfoh+e7pac09+c3qBY0lrhDycdnp2lJ6MiYOGhGCDc3aRlL2DlJt5doaGdnp2gYF8gWeOjF2Uc4R5c5Z+jEmMe7KEc4mEeYJ4dmyBe0mcgXiPbqJ7eYB7fmGGiYSJjICGlF1reZ2PnElzbpqJfH6Hc39oe4WEc5eJhK6EhqyJc3qBgZB8c09+hEmEaHKDhFGJc5SGiXWMUpaEa89zc6OMnCyMiXtrho+Be5qMc7KEjJ57dmN+hKGPjICGbmiEe7prdod+hGCDdnmchBx7eX6MkXZ2hGGEa657hm98jFFjY5JreYOJgY2EjHZ2a295Y3FajJ6Mc1J+YzB7e4WBjF2Uc4R5eV12gYxzg1qBeId+c9OUc5pzjFFjgY5+hFiMlIaPhoR5lIpjjIKBlNdSe7KEeX2BfrGMhIqGc65zjE2UhK6EklZ+QmWEeziMWqZza3VzdnR4foh+gYF8n3iJiZhrnKp7gYF8eId+lJ6Me1lrcIuGjKJjhmN8c66MjFF7a6prjJ6UnJ5zezyUfruRWlF7nI5zfHyGe657h4SEe8tjhBx7jFFjc09+c39ojICMeZeJeXt+YzRzjHZ2c0WEcIeBeXZ5onSXkVR+gYJ+eYFwdldzgYF7eX2BjJ6UiXuXlE1jh4SEe1mchLJjc4Z+hqZ7eXZ5bm1zlL6Ue5p7iWeGhKqUY5pzjKJjcIeBe8t7gXyBYIRdlEp4a3mGnK6EfmmMZpqEfFl5gYxzjKZuhGFjhoKGhHx2fnx2eXuMe3aBiWeGvbKMe6KGa5hzYzB7gZOBlGV7hmN8hqZlYot2Y117a6pzc6KEfId8foB5rctrfneJfJ6PcHN2hFiMc5pzjH92c0VzgY2EcElzdmCBlFVzg1GBc65zY4OBboeBcHiBeYJ4ewxzfHx5lIRzlEmEnLKEbk1zfJ6PhmN8eYBljBiEnMOEiXxwezyUcIeBe76EdsKEeX2BdnR4jGWUrXWMjGd7fkl+j4WRlEGMa5Jzho+BhDyEfnqMeXt+g3aHlE1jczClhNN7ZW18eHx8hGFjZW18iXWMjKJjhH57gYuMcIuGWjyMe4ZtjJuExmmMj4WRdntzi4GDhFFzYIRdnGGcjJp7Y0F7e4WEkbCGiX57fnSHa657a6prhBCMe3Z+SmmMjH92eHJ2hK6EY1FzexhrvbKMnI5za4OEfnd+eXuMhImBe897hLaMjN+EfG+BeIOBhF1+eZeJi4GDkXZ2eXKEgZ6Ejpd4c2GHa1V5e5KUfqZuhCx7jKp7lLZrg11+hHx2hFWUoot2nI5zgbh5mo9zvZaUe3qRbqKMfqZ2kbCGhFiM"),(e=>e.charCodeAt(0))),t=new G.X;t.wrapMode=U.e8.CLAMP_TO_EDGE,t.pixelFormat=U.VI.RGB,t.wrapMode=U.e8.REPEAT,t.hasMipmap=!0,t.width=32,t.height=32,this._passParameters.noiseTexture=new z.x(this._context.renderContext.rctx,t,e),null==this._ssaoTechnique&&(this._ssaoTechnique=this._context.techniqueRepository.acquire(L)),null==this._blurTechnique&&(this._blurTechnique=this._context.techniqueRepository.acquire(M)),this._enableTime=(0,d.HA)(0),this._context?.requestRender()}renderNode(e,t,r){const i=e.bindParameters,o=r?.get("normals"),a=o?.getTexture(),s=o?.getTexture(U.Lu);if(null==this._enableTime||null==this._context||!a||!s)return;if(!this._ssaoTechnique.compiled||!this._blurTechnique.compiled)return this._enableTime=e.time,void this._context.requestRender();0===this._enableTime&&(this._enableTime=e.time);const c=e.rctx,u=i.camera,d=this.view.qualitySettings.fadeDuration,h=u.relativeElevation,f=(0,l.uZ)((p-h)/2e5,0,1),v=d>0?Math.min(d,e.time-this._enableTime)/d:1,g=v*f;this._passParameters.normalTexture=a,this._passParameters.depthTexture=s,this._passParameters.projScale=1/u.computeScreenPixelSizeAtDist(1),this._passParameters.intensity=4*j/(0,H.g)(u)**6*g;const _=u.fullViewport[2],x=u.fullViewport[3],T=Math.round(_/V),b=Math.round(x/V),y=this._context.fbos,S=y.acquire(_,x,"ssao input",n.RG);c.unbindTexture(S.fbo.colorTexture),c.bindFramebuffer(S.fbo),c.setViewport(0,0,_,x),c.bindTechnique(this._ssaoTechnique,i,this._passParameters,this._drawParameters),c.screen.draw();const A=y.acquire(T,b,"ssao blur",n.RED);c.unbindTexture(A.fbo.colorTexture),c.bindFramebuffer(A.fbo),this._drawParameters.colorTexture=S.getTexture(),(0,m.t8)(this._drawParameters.blurSize,0,V/x),c.bindTechnique(this._blurTechnique,i,this._passParameters,this._drawParameters),c.setViewport(0,0,T,b),c.screen.draw(),S.release();const E=y.acquire(T,b,"ssao",n.RED);return c.unbindTexture(E.fbo.colorTexture),c.bindFramebuffer(E.fbo),c.setViewport(0,0,_,x),c.setClearColor(1,1,1,0),c.clear(U.lk.COLOR_BUFFER_BIT),this._drawParameters.colorTexture=A.getTexture(),(0,m.t8)(this._drawParameters.blurSize,V/_,0),c.bindTechnique(this._blurTechnique,i,this._passParameters,this._drawParameters),c.setViewport(0,0,T,b),c.screen.draw(),c.setViewport4fv(u.fullViewport),A.release(),v<1&&this._context.requestRender(),E}};(0,s._)([(0,h.Cb)({constructOnly:!0})],W.prototype,"view",void 0),(0,s._)([(0,h.Cb)()],W.prototype,"_context",void 0),W=(0,s._)([(0,f.j)("esri.views.3d.webgl-engine.effects.ssao.SSAO")],W);const j=.5;function k(e,t){const r=e.fragment;t.receiveAmbientOcclusion?(r.uniforms.add(new a.A("ssaoTex",((e,t)=>t.ssao?.getTexture()))),r.constants.add("blurSizePixelsInverse","float",1/V),r.code.add(o.H`float evaluateAmbientOcclusionInverse() {
vec2 ssaoTextureSizeInverse = 1.0 / vec2(textureSize(ssaoTex, 0));
return texture(ssaoTex, gl_FragCoord.xy * blurSizePixelsInverse * ssaoTextureSizeInverse).r;
}
float evaluateAmbientOcclusion() {
return 1.0 - evaluateAmbientOcclusionInverse();
}`)):r.code.add(o.H`float evaluateAmbientOcclusionInverse() { return 1.0; }
float evaluateAmbientOcclusion() { return 0.0; }`)}},99660:function(e,t,r){r.d(t,{XP:function(){return w},PN:function(){return A},sC:function(){return E}});var n=r(27755),i=r(86717),o=r(81095),a=r(56999),s=r(52721),l=r(3864),c=r(43036),u=r(63371),d=r(23410);function h(e,t){const r=e.fragment,n=void 0!==t.lightingSphericalHarmonicsOrder?t.lightingSphericalHarmonicsOrder:2;0===n?(r.uniforms.add(new c.J("lightingAmbientSH0",((e,t)=>(0,i.s)(f,t.lighting.sh.r[0],t.lighting.sh.g[0],t.lighting.sh.b[0])))),r.code.add(d.H`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
return ambientLight * (1.0 - ambientOcclusion);
}`)):1===n?(r.uniforms.add(new u.N("lightingAmbientSH_R",((e,t)=>(0,a.s)(m,t.lighting.sh.r[0],t.lighting.sh.r[1],t.lighting.sh.r[2],t.lighting.sh.r[3]))),new u.N("lightingAmbientSH_G",((e,t)=>(0,a.s)(m,t.lighting.sh.g[0],t.lighting.sh.g[1],t.lighting.sh.g[2],t.lighting.sh.g[3]))),new u.N("lightingAmbientSH_B",((e,t)=>(0,a.s)(m,t.lighting.sh.b[0],t.lighting.sh.b[1],t.lighting.sh.b[2],t.lighting.sh.b[3])))),r.code.add(d.H`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec4 sh0 = vec4(
0.282095,
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y
);
vec3 ambientLight = vec3(
dot(lightingAmbientSH_R, sh0),
dot(lightingAmbientSH_G, sh0),
dot(lightingAmbientSH_B, sh0)
);
return ambientLight * (1.0 - ambientOcclusion);
}`)):2===n&&(r.uniforms.add(new c.J("lightingAmbientSH0",((e,t)=>(0,i.s)(f,t.lighting.sh.r[0],t.lighting.sh.g[0],t.lighting.sh.b[0]))),new u.N("lightingAmbientSH_R1",((e,t)=>(0,a.s)(m,t.lighting.sh.r[1],t.lighting.sh.r[2],t.lighting.sh.r[3],t.lighting.sh.r[4]))),new u.N("lightingAmbientSH_G1",((e,t)=>(0,a.s)(m,t.lighting.sh.g[1],t.lighting.sh.g[2],t.lighting.sh.g[3],t.lighting.sh.g[4]))),new u.N("lightingAmbientSH_B1",((e,t)=>(0,a.s)(m,t.lighting.sh.b[1],t.lighting.sh.b[2],t.lighting.sh.b[3],t.lighting.sh.b[4]))),new u.N("lightingAmbientSH_R2",((e,t)=>(0,a.s)(m,t.lighting.sh.r[5],t.lighting.sh.r[6],t.lighting.sh.r[7],t.lighting.sh.r[8]))),new u.N("lightingAmbientSH_G2",((e,t)=>(0,a.s)(m,t.lighting.sh.g[5],t.lighting.sh.g[6],t.lighting.sh.g[7],t.lighting.sh.g[8]))),new u.N("lightingAmbientSH_B2",((e,t)=>(0,a.s)(m,t.lighting.sh.b[5],t.lighting.sh.b[6],t.lighting.sh.b[7],t.lighting.sh.b[8])))),r.code.add(d.H`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
vec4 sh1 = vec4(
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y,
1.092548 * normal.x * normal.y
);
vec4 sh2 = vec4(
1.092548 * normal.y * normal.z,
0.315392 * (3.0 * normal.z * normal.z - 1.0),
1.092548 * normal.x * normal.z,
0.546274 * (normal.x * normal.x - normal.y * normal.y)
);
ambientLight += vec3(
dot(lightingAmbientSH_R1, sh1),
dot(lightingAmbientSH_G1, sh1),
dot(lightingAmbientSH_B1, sh1)
);
ambientLight += vec3(
dot(lightingAmbientSH_R2, sh2),
dot(lightingAmbientSH_G2, sh2),
dot(lightingAmbientSH_B2, sh2)
);
return ambientLight * (1.0 - ambientOcclusion);
}`),t.pbrMode!==l.f7.Normal&&t.pbrMode!==l.f7.Schematic||r.code.add(d.H`const vec3 skyTransmittance = vec3(0.9, 0.9, 1.0);
vec3 calculateAmbientRadiance(float ambientOcclusion)
{
vec3 ambientLight = 1.2 * (0.282095 * lightingAmbientSH0) - 0.2;
return ambientLight *= (1.0 - ambientOcclusion) * skyTransmittance;
}`))}const f=(0,o.Ue)(),m=(0,s.Ue)();var p=r(11827),v=r(58749),g=r(89585),_=r(95509),x=r(91013),T=r(40017);class b extends x.x{constructor(e,t){super(e,"bool",T.P.Pass,((r,n,i)=>r.setUniform1b(e,t(n,i))))}}var y=r(24603);r(19431);(0,o.Ue)();const S=.4;(0,o.Ue)();function A(e){e.constants.add("ambientBoostFactor","float",S)}function E(e){e.uniforms.add(new y.p("lightingGlobalFactor",((e,t)=>t.lighting.globalFactor)))}function w(e,t){const r=e.fragment;switch(e.include(p.K,t),t.pbrMode!==l.f7.Disabled&&e.include(g.T,t),e.include(h,t),e.include(_.e),r.code.add(d.H`
    const float GAMMA_SRGB = 2.1;
    const float INV_GAMMA_SRGB = 0.4761904;
    ${t.pbrMode===l.f7.Disabled?"":"const vec3 GROUND_REFLECTANCE = vec3(0.2);"}
  `),A(r),E(r),(0,v.Pe)(r),r.code.add(d.H`
    float additionalDirectedAmbientLight(vec3 vPosWorld) {
      float vndl = dot(${t.spherical?d.H`normalize(vPosWorld)`:d.H`vec3(0.0, 0.0, 1.0)`}, mainLightDirection);
      return smoothstep(0.0, 1.0, clamp(vndl * 2.5, 0.0, 1.0));
    }
  `),(0,v.F1)(r),r.code.add(d.H`vec3 evaluateAdditionalLighting(float ambientOcclusion, vec3 vPosWorld) {
float additionalAmbientScale = additionalDirectedAmbientLight(vPosWorld);
return (1.0 - ambientOcclusion) * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor * mainLightIntensity;
}`),t.pbrMode){case l.f7.Disabled:case l.f7.WaterOnIntegratedMesh:case l.f7.Water:e.include(v.kR),r.code.add(d.H`vec3 evaluateSceneLighting(vec3 normalWorld, vec3 albedo, float shadow, float ssao, vec3 additionalLight)
{
vec3 mainLighting = evaluateMainLighting(normalWorld, shadow);
vec3 ambientLighting = calculateAmbientIrradiance(normalWorld, ssao);
vec3 albedoLinear = pow(albedo, vec3(GAMMA_SRGB));
vec3 totalLight = mainLighting + ambientLighting + additionalLight;
totalLight = min(totalLight, vec3(PI));
vec3 outColor = vec3((albedoLinear / PI) * totalLight);
return pow(outColor, vec3(INV_GAMMA_SRGB));
}`);break;case l.f7.Normal:case l.f7.Schematic:r.code.add(d.H`const float fillLightIntensity = 0.25;
const float horizonLightDiffusion = 0.4;
const float additionalAmbientIrradianceFactor = 0.02;
vec3 evaluateSceneLightingPBR(vec3 normal, vec3 albedo, float shadow, float ssao, vec3 additionalLight, vec3 viewDir, vec3 normalGround, vec3 mrr, vec3 _emission, float additionalAmbientIrradiance)
{
vec3 viewDirection = -viewDir;
vec3 h = normalize(viewDirection + mainLightDirection);
PBRShadingInfo inputs;
inputs.NdotL = clamp(dot(normal, mainLightDirection), 0.001, 1.0);
inputs.NdotV = clamp(abs(dot(normal, viewDirection)), 0.001, 1.0);
inputs.NdotH = clamp(dot(normal, h), 0.0, 1.0);
inputs.VdotH = clamp(dot(viewDirection, h), 0.0, 1.0);
inputs.NdotNG = clamp(dot(normal, normalGround), -1.0, 1.0);
vec3 reflectedView = normalize(reflect(viewDirection, normal));
inputs.RdotNG = clamp(dot(reflectedView, normalGround), -1.0, 1.0);
inputs.albedoLinear = pow(albedo, vec3(GAMMA_SRGB));
inputs.ssao = ssao;
inputs.metalness = mrr[0];
inputs.roughness = clamp(mrr[1] * mrr[1], 0.001, 0.99);`),r.code.add(d.H`inputs.f0 = (0.16 * mrr[2] * mrr[2]) * (1.0 - inputs.metalness) + inputs.albedoLinear * inputs.metalness;
inputs.f90 = vec3(clamp(dot(inputs.f0, vec3(50.0 * 0.33)), 0.0, 1.0));
inputs.diffuseColor = inputs.albedoLinear * (vec3(1.0) - inputs.f0) * (1.0 - inputs.metalness);`),t.useFillLights?r.uniforms.add(new b("hasFillLights",((e,t)=>t.enableFillLights))):r.constants.add("hasFillLights","bool",!1),r.code.add(d.H`vec3 ambientDir = vec3(5.0 * normalGround[1] - normalGround[0] * normalGround[2], - 5.0 * normalGround[0] - normalGround[2] * normalGround[1], normalGround[1] * normalGround[1] + normalGround[0] * normalGround[0]);
ambientDir = ambientDir != vec3(0.0) ? normalize(ambientDir) : normalize(vec3(5.0, -1.0, 0.0));
inputs.NdotAmbDir = hasFillLights ? abs(dot(normal, ambientDir)) : 1.0;
vec3 mainLightIrradianceComponent = inputs.NdotL * (1.0 - shadow) * mainLightIntensity;
vec3 fillLightsIrradianceComponent = inputs.NdotAmbDir * mainLightIntensity * fillLightIntensity;
vec3 ambientLightIrradianceComponent = calculateAmbientIrradiance(normal, ssao) + additionalLight;
inputs.skyIrradianceToSurface = ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;
inputs.groundIrradianceToSurface = GROUND_REFLECTANCE * ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;`),r.uniforms.add(new y.p("lightingSpecularStrength",((e,t)=>t.lighting.mainLight.specularStrength)),new y.p("lightingEnvironmentStrength",((e,t)=>t.lighting.mainLight.environmentStrength))),r.code.add(d.H`vec3 horizonRingDir = inputs.RdotNG * normalGround - reflectedView;
vec3 horizonRingH = normalize(viewDirection + horizonRingDir);
inputs.NdotH_Horizon = dot(normal, horizonRingH);
vec3 mainLightRadianceComponent = lightingSpecularStrength * normalDistribution(inputs.NdotH, inputs.roughness) * mainLightIntensity * (1.0 - shadow);
vec3 horizonLightRadianceComponent = lightingEnvironmentStrength * normalDistribution(inputs.NdotH_Horizon, min(inputs.roughness + horizonLightDiffusion, 1.0)) * mainLightIntensity * fillLightIntensity;
vec3 ambientLightRadianceComponent = lightingEnvironmentStrength * calculateAmbientRadiance(ssao) + additionalLight;
float normalDirectionModifier = mix(1., min(mix(0.1, 2.0, (inputs.NdotNG + 1.) * 0.5), 1.0), clamp(inputs.roughness * 5.0, 0.0 , 1.0));
inputs.skyRadianceToSurface = (ambientLightRadianceComponent + horizonLightRadianceComponent) * normalDirectionModifier + mainLightRadianceComponent;
inputs.groundRadianceToSurface = 0.5 * GROUND_REFLECTANCE * (ambientLightRadianceComponent + horizonLightRadianceComponent) * normalDirectionModifier + mainLightRadianceComponent;
inputs.averageAmbientRadiance = ambientLightIrradianceComponent[1] * (1.0 + GROUND_REFLECTANCE[1]);`),r.code.add(d.H`
        vec3 reflectedColorComponent = evaluateEnvironmentIllumination(inputs);
        vec3 additionalMaterialReflectanceComponent = inputs.albedoLinear * additionalAmbientIrradiance;
        vec3 emissionComponent = _emission == vec3(0.0) ? _emission : pow(_emission, vec3(GAMMA_SRGB));
        vec3 outColorLinear = reflectedColorComponent + additionalMaterialReflectanceComponent + emissionComponent;
        ${t.pbrMode!==l.f7.Schematic||t.hasColorTexture?d.H`vec3 outColor = pow(blackLevelSoftCompression(outColorLinear, inputs), vec3(INV_GAMMA_SRGB));`:d.H`vec3 outColor = pow(max(vec3(0.0), outColorLinear - 0.005 * inputs.averageAmbientRadiance), vec3(INV_GAMMA_SRGB));`}
        return outColor;
      }
    `);break;case l.f7.Simplified:case l.f7.TerrainWithWater:e.include(v.kR),r.code.add(d.H`const float roughnessTerrain = 0.5;
const float specularityTerrain = 0.5;
const vec3 fresnelReflectionTerrain = vec3(0.04);
vec3 evaluatePBRSimplifiedLighting(vec3 n, vec3 c, float shadow, float ssao, vec3 al, vec3 vd, vec3 nup) {
vec3 viewDirection = -vd;
vec3 h = normalize(viewDirection + mainLightDirection);
float NdotL = clamp(dot(n, mainLightDirection), 0.001, 1.0);
float NdotV = clamp(abs(dot(n, viewDirection)), 0.001, 1.0);
float NdotH = clamp(dot(n, h), 0.0, 1.0);
float NdotNG = clamp(dot(n, nup), -1.0, 1.0);
vec3 albedoLinear = pow(c, vec3(GAMMA_SRGB));
float lightness = 0.3 * albedoLinear[0] + 0.5 * albedoLinear[1] + 0.2 * albedoLinear[2];
vec3 f0 = (0.85 * lightness + 0.15) * fresnelReflectionTerrain;
vec3 f90 =  vec3(clamp(dot(f0, vec3(50.0 * 0.33)), 0.0, 1.0));
vec3 mainLightIrradianceComponent = (1. - shadow) * NdotL * mainLightIntensity;
vec3 ambientLightIrradianceComponent = calculateAmbientIrradiance(n, ssao) + al;
vec3 ambientSky = ambientLightIrradianceComponent + mainLightIrradianceComponent;
vec3 indirectDiffuse = ((1.0 - NdotNG) * mainLightIrradianceComponent + (1.0 + NdotNG ) * ambientSky) * 0.5;
vec3 outDiffColor = albedoLinear * (1.0 - f0) * indirectDiffuse / PI;
vec3 mainLightRadianceComponent = normalDistribution(NdotH, roughnessTerrain) * mainLightIntensity;
vec2 dfg = prefilteredDFGAnalytical(roughnessTerrain, NdotV);
vec3 specularColor = f0 * dfg.x + f90 * dfg.y;
vec3 specularComponent = specularityTerrain * specularColor * mainLightRadianceComponent;
vec3 outColorLinear = outDiffColor + specularComponent;
vec3 outColor = pow(outColorLinear, vec3(INV_GAMMA_SRGB));
return outColor;
}`);break;default:(0,n.Bg)(t.pbrMode);case l.f7.COUNT:}}},58749:function(e,t,r){r.d(t,{F1:function(){return a},Pe:function(){return o},kR:function(){return s}});var n=r(43036),i=r(23410);function o(e){e.uniforms.add(new n.J("mainLightDirection",((e,t)=>t.lighting.mainLight.direction)))}function a(e){e.uniforms.add(new n.J("mainLightIntensity",((e,t)=>t.lighting.mainLight.intensity)))}function s(e){o(e.fragment),a(e.fragment),e.fragment.code.add(i.H`vec3 evaluateMainLighting(vec3 normal_global, float shadowing) {
float dotVal = clamp(dot(normal_global, mainLightDirection), 0.0, 1.0);
return mainLightIntensity * ((1.0 - shadowing) * dotVal);
}`)}},73393:function(e,t,r){r.d(t,{l:function(){return s}});var n=r(31227),i=r(93072),o=r(23410),a=r(15176);function s(e,t){if(!t.multipassEnabled)return;e.fragment.include(n.S),e.fragment.uniforms.add(new a.A("terrainDepthTexture",((e,t)=>t.multipassTerrain.linearDepth?.getTexture())),new i.A("nearFar",((e,t)=>t.camera.nearFar)));const r=t.occlusionPass;e.fragment.code.add(o.H`
   ${r?"bool":"void"} terrainDepthTest(float fragmentDepth) {
      vec4 data = texelFetch(terrainDepthTexture, ivec2(gl_FragCoord.xy), 0);
      float linearDepth = linearDepthFromRGBA(data, nearFar);
      ${r?o.H`return fragmentDepth < linearDepth && data != vec4(0.0, 0.0, 0.0, 1.0);`:o.H`
          if(fragmentDepth ${t.cullAboveGround?">":"<="} linearDepth){
            discard;
          }`}
    }`)}},2833:function(e,t,r){r.d(t,{k:function(){return s},q:function(){return n}});var n,i,o=r(27755),a=r(23410);function s(e,t){const r=e.fragment;switch(r.code.add(a.H`struct ShadingNormalParameters {
vec3 normalView;
vec3 viewDirection;
} shadingParams;`),t.doubleSidedMode){case n.None:r.code.add(a.H`vec3 shadingNormal(ShadingNormalParameters params) {
return normalize(params.normalView);
}`);break;case n.View:r.code.add(a.H`vec3 shadingNormal(ShadingNormalParameters params) {
return dot(params.normalView, params.viewDirection) > 0.0 ? normalize(-params.normalView) : normalize(params.normalView);
}`);break;case n.WindingOrder:r.code.add(a.H`vec3 shadingNormal(ShadingNormalParameters params) {
return gl_FrontFacing ? normalize(params.normalView) : normalize(-params.normalView);
}`);break;default:(0,o.Bg)(t.doubleSidedMode);case n.COUNT:}}(i=n||(n={}))[i.None=0]="None",i[i.View=1]="View",i[i.WindingOrder=2]="WindingOrder",i[i.COUNT=3]="COUNT"},89585:function(e,t,r){r.d(t,{T:function(){return s}});var n=r(23410);function i(e){const t=e.fragment.code;t.add(n.H`vec3 evaluateDiffuseIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float NdotNG)
{
return ((1.0 - NdotNG) * ambientGround + (1.0 + NdotNG) * ambientSky) * 0.5;
}`),t.add(n.H`float integratedRadiance(float cosTheta2, float roughness)
{
return (cosTheta2 - 1.0) / (cosTheta2 * (1.0 - roughness * roughness) - 1.0);
}`),t.add(n.H`vec3 evaluateSpecularIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float RdotNG, float roughness)
{
float cosTheta2 = 1.0 - RdotNG * RdotNG;
float intRadTheta = integratedRadiance(cosTheta2, roughness);
float ground = RdotNG < 0.0 ? 1.0 - intRadTheta : 1.0 + intRadTheta;
float sky = 2.0 - ground;
return (ground * ambientGround + sky * ambientSky) * 0.5;
}`)}var o=r(3864),a=r(95509);function s(e,t){const r=e.fragment.code;e.include(a.e),t.pbrMode!==o.f7.Normal&&t.pbrMode!==o.f7.Schematic&&t.pbrMode!==o.f7.Simplified&&t.pbrMode!==o.f7.TerrainWithWater||(r.add(n.H`float normalDistribution(float NdotH, float roughness)
{
float a = NdotH * roughness;
float b = roughness / (1.0 - NdotH * NdotH + a * a);
return b * b * INV_PI;
}`),r.add(n.H`const vec4 c0 = vec4(-1.0, -0.0275, -0.572,  0.022);
const vec4 c1 = vec4( 1.0,  0.0425,  1.040, -0.040);
const vec2 c2 = vec2(-1.04, 1.04);
vec2 prefilteredDFGAnalytical(float roughness, float NdotV) {
vec4 r = roughness * c0 + c1;
float a004 = min(r.x * r.x, exp2(-9.28 * NdotV)) * r.x + r.y;
return c2 * a004 + r.zw;
}`)),t.pbrMode!==o.f7.Normal&&t.pbrMode!==o.f7.Schematic||(e.include(i),r.add(n.H`struct PBRShadingInfo
{
float NdotL;
float NdotV;
float NdotH;
float VdotH;
float LdotH;
float NdotNG;
float RdotNG;
float NdotAmbDir;
float NdotH_Horizon;
vec3 skyRadianceToSurface;
vec3 groundRadianceToSurface;
vec3 skyIrradianceToSurface;
vec3 groundIrradianceToSurface;
float averageAmbientRadiance;
float ssao;
vec3 albedoLinear;
vec3 f0;
vec3 f90;
vec3 diffuseColor;
float metalness;
float roughness;
};`),r.add(n.H`vec3 evaluateEnvironmentIllumination(PBRShadingInfo inputs) {
vec3 indirectDiffuse = evaluateDiffuseIlluminationHemisphere(inputs.groundIrradianceToSurface, inputs.skyIrradianceToSurface, inputs.NdotNG);
vec3 indirectSpecular = evaluateSpecularIlluminationHemisphere(inputs.groundRadianceToSurface, inputs.skyRadianceToSurface, inputs.RdotNG, inputs.roughness);
vec3 diffuseComponent = inputs.diffuseColor * indirectDiffuse * INV_PI;
vec2 dfg = prefilteredDFGAnalytical(inputs.roughness, inputs.NdotV);
vec3 specularColor = inputs.f0 * dfg.x + inputs.f90 * dfg.y;
vec3 specularComponent = specularColor * indirectSpecular;
return (diffuseComponent + specularComponent);
}`),r.add(n.H`float gamutMapChanel(float x, vec2 p){
return (x < p.x) ? mix(0.0, p.y, x/p.x) : mix(p.y, 1.0, (x - p.x) / (1.0 - p.x) );
}`),r.add(n.H`vec3 blackLevelSoftCompression(vec3 inColor, PBRShadingInfo inputs){
vec3 outColor;
vec2 p = vec2(0.02 * (inputs.averageAmbientRadiance), 0.0075 * (inputs.averageAmbientRadiance));
outColor.x = gamutMapChanel(inColor.x, p) ;
outColor.y = gamutMapChanel(inColor.y, p) ;
outColor.z = gamutMapChanel(inColor.z, p) ;
return outColor;
}`))}},3864:function(e,t,r){r.d(t,{f7:function(){return n},jV:function(){return m}});var n,i,o=r(72129),a=r(32006),s=r(43036),l=r(23410),c=r(37649),u=r(15176),d=r(40017),h=r(97009);(i=n||(n={}))[i.Disabled=0]="Disabled",i[i.Normal=1]="Normal",i[i.Schematic=2]="Schematic",i[i.Water=3]="Water",i[i.WaterOnIntegratedMesh=4]="WaterOnIntegratedMesh",i[i.Simplified=5]="Simplified",i[i.TerrainWithWater=6]="TerrainWithWater",i[i.COUNT=7]="COUNT";class f extends h.E{}function m(e,t){const r=e.fragment,i=t.hasMetallicRoughnessTexture||t.hasEmissionTexture||t.hasOcclusionTexture;if(t.pbrMode===n.Normal&&i&&e.include(o.i,t),t.pbrMode!==n.Schematic)if(t.pbrMode!==n.Disabled){if(t.pbrMode===n.Normal){r.code.add(l.H`vec3 mrr;
vec3 emission;
float occlusion;`);const e=t.pbrTextureBindType;t.hasMetallicRoughnessTexture&&(r.uniforms.add(e===d.P.Pass?new u.A("texMetallicRoughness",(e=>e.textureMetallicRoughness)):new c.R("texMetallicRoughness",(e=>e.textureMetallicRoughness))),r.code.add(l.H`void applyMetallnessAndRoughness(vec2 uv) {
vec3 metallicRoughness = textureLookup(texMetallicRoughness, uv).rgb;
mrr[0] *= metallicRoughness.b;
mrr[1] *= metallicRoughness.g;
}`)),t.hasEmissionTexture&&(r.uniforms.add(e===d.P.Pass?new u.A("texEmission",(e=>e.textureEmissive)):new c.R("texEmission",(e=>e.textureEmissive))),r.code.add(l.H`void applyEmission(vec2 uv) {
emission *= textureLookup(texEmission, uv).rgb;
}`)),t.hasOcclusionTexture?(r.uniforms.add(e===d.P.Pass?new u.A("texOcclusion",(e=>e.textureOcclusion)):new c.R("texOcclusion",(e=>e.textureOcclusion))),r.code.add(l.H`void applyOcclusion(vec2 uv) {
occlusion *= textureLookup(texOcclusion, uv).r;
}
float getBakedOcclusion() {
return occlusion;
}`)):r.code.add(l.H`float getBakedOcclusion() { return 1.0; }`),e===d.P.Pass?r.uniforms.add(new s.J("emissionFactor",(e=>e.emissiveFactor)),new s.J("mrrFactors",(e=>e.mrrFactors))):r.uniforms.add(new a.B("emissionFactor",(e=>e.emissiveFactor)),new a.B("mrrFactors",(e=>e.mrrFactors))),r.code.add(l.H`
    void applyPBRFactors() {
      mrr = mrrFactors;
      emission = emissionFactor;
      occlusion = 1.0;

      ${t.hasMetallicRoughnessTexture?l.H`applyMetallnessAndRoughness(${t.hasMetallicRoughnessTextureTransform?l.H`metallicRoughnessUV`:"vuv0"});`:""}

      ${t.hasEmissionTexture?l.H`applyEmission(${t.hasEmissiveTextureTransform?l.H`emissiveUV`:"vuv0"});`:""}

      ${t.hasOcclusionTexture?l.H`applyOcclusion(${t.hasOcclusionTextureTransform?l.H`occlusionUV`:"vuv0"});`:""}
    }
  `)}}else r.code.add(l.H`float getBakedOcclusion() { return 1.0; }`);else r.code.add(l.H`vec3 mrr = vec3(0.0, 0.6, 0.2);
vec3 emission = vec3(0.0);
float occlusion = 1.0;
void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`)}},95509:function(e,t,r){r.d(t,{e:function(){return i}});var n=r(23410);function i(e){e.vertex.code.add(n.H`const float PI = 3.141592653589793;`),e.fragment.code.add(n.H`const float PI = 3.141592653589793;
const float LIGHT_NORMALIZATION = 1.0 / PI;
const float INV_PI = 0.3183098861837907;
const float HALF_PI = 1.570796326794897;`)}},59181:function(e,t,r){r.d(t,{XE:function(){return p},hb:function(){return m}});r(3308),r(81095);var n=r(52446),i=r(63371),o=r(59842),a=r(23410),s=r(91013),l=r(40017);class c extends s.x{constructor(e,t,r){super(e,"mat4",l.P.Draw,((r,n,i,o)=>r.setUniformMatrix4fv(e,t(n,i,o))),r)}}class u extends s.x{constructor(e,t,r){super(e,"mat4",l.P.Pass,((r,n,i)=>r.setUniformMatrix4fv(e,t(n,i))),r)}}var d=r(15176);class h extends a.K{constructor(){super(...arguments),this.origin=(0,vec3f64.Ue)()}}class f extends a.K{constructor(){super(...arguments),this.modelTransformation=mat4f64.Wd}}function m(e,t){t.receiveShadows&&(e.fragment.uniforms.add(new u("shadowMapMatrix",((e,t)=>t.shadowMap.getShadowMapMatrices(e.origin)),4)),v(e))}function p(e,t){t.receiveShadows&&(e.fragment.uniforms.add(new c("shadowMapMatrix",((e,t)=>t.shadowMap.getShadowMapMatrices(e.origin)),4)),v(e))}function v(e){const t=e.fragment;t.include(n.f),t.uniforms.add(new d.A("shadowMap",((e,t)=>t.shadowMap.depthTexture)),new o._("numCascades",((e,t)=>t.shadowMap.numCascades)),new i.N("cascadeDistances",((e,t)=>t.shadowMap.cascadeDistances))),t.code.add(a.H`int chooseCascade(float depth, out mat4 mat) {
vec4 distance = cascadeDistances;
int i = depth < distance[1] ? 0 : depth < distance[2] ? 1 : depth < distance[3] ? 2 : 3;
mat = i == 0 ? shadowMapMatrix[0] : i == 1 ? shadowMapMatrix[1] : i == 2 ? shadowMapMatrix[2] : shadowMapMatrix[3];
return i;
}
vec3 lightSpacePosition(vec3 _vpos, mat4 mat) {
vec4 lv = mat * vec4(_vpos, 1.0);
lv.xy /= lv.w;
return 0.5 * lv.xyz + vec3(0.5);
}
vec2 cascadeCoordinates(int i, ivec2 textureSize, vec3 lvpos) {
float xScale = float(textureSize.y) / float(textureSize.x);
return vec2((float(i) + lvpos.x) * xScale, lvpos.y);
}
float readShadowMapDepth(ivec2 uv, sampler2D _depthTex) {
return rgba4ToFloat(texelFetch(_depthTex, uv, 0));
}
float posIsInShadow(ivec2 uv, vec3 lvpos, sampler2D _depthTex) {
return readShadowMapDepth(uv, _depthTex) < lvpos.z ? 1.0 : 0.0;
}
float filterShadow(vec2 uv, vec3 lvpos, ivec2 texSize, sampler2D _depthTex) {
vec2 st = fract(uv * vec2(texSize) + vec2(0.5));
ivec2 base = ivec2(uv * vec2(texSize) - vec2(0.5));
float s00 = posIsInShadow(ivec2(base.x, base.y), lvpos, _depthTex);
float s10 = posIsInShadow(ivec2(base.x + 1, base.y), lvpos, _depthTex);
float s11 = posIsInShadow(ivec2(base.x + 1, base.y + 1), lvpos, _depthTex);
float s01 = posIsInShadow(ivec2(base.x, base.y + 1), lvpos, _depthTex);
return mix(mix(s00, s10, st.x), mix(s01, s11, st.x), st.y);
}
float readShadowMap(const in vec3 _vpos, float _linearDepth) {
mat4 mat;
int i = chooseCascade(_linearDepth, mat);
if (i >= numCascades) { return 0.0; }
vec3 lvpos = lightSpacePosition(_vpos, mat);
if (lvpos.z >= 1.0 || lvpos.x < 0.0 || lvpos.x > 1.0 || lvpos.y < 0.0 || lvpos.y > 1.0) { return 0.0; }
ivec2 size = textureSize(shadowMap, 0);
vec2 uv = cascadeCoordinates(i, size, lvpos);
return filterShadow(uv, lvpos, size, shadowMap);
}`)}},30228:function(e,t,r){r.d(t,{DT:function(){return d},NI:function(){return l},R5:function(){return c},av:function(){return s},jF:function(){return u}});var n=r(3965),i=r(82082),o=r(23410),a=r(11125);function s(e,t){t.hasColorTextureTransform?(e.vertex.uniforms.add(new a.c("colorTextureTransformMatrix",(e=>e.colorTextureTransformMatrix??n.Wd))),e.varyings.add("colorUV","vec2"),e.vertex.code.add(o.H`void forwardColorUV(){
colorUV = (colorTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(o.H`void forwardColorUV(){}`)}function l(e,t){t.hasNormalTextureTransform&&t.textureCoordinateType!==i.N.None?(e.vertex.uniforms.add(new a.c("normalTextureTransformMatrix",(e=>e.normalTextureTransformMatrix??n.Wd))),e.varyings.add("normalUV","vec2"),e.vertex.code.add(o.H`void forwardNormalUV(){
normalUV = (normalTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(o.H`void forwardNormalUV(){}`)}function c(e,t){t.hasEmissionTextureTransform&&t.textureCoordinateType!==i.N.None?(e.vertex.uniforms.add(new a.c("emissiveTextureTransformMatrix",(e=>e.emissiveTextureTransformMatrix??n.Wd))),e.varyings.add("emissiveUV","vec2"),e.vertex.code.add(o.H`void forwardEmissiveUV(){
emissiveUV = (emissiveTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(o.H`void forwardEmissiveUV(){}`)}function u(e,t){t.hasOcclusionTextureTransform&&t.textureCoordinateType!==i.N.None?(e.vertex.uniforms.add(new a.c("occlusionTextureTransformMatrix",(e=>e.occlusionTextureTransformMatrix??n.Wd))),e.varyings.add("occlusionUV","vec2"),e.vertex.code.add(o.H`void forwardOcclusionUV(){
occlusionUV = (occlusionTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(o.H`void forwardOcclusionUV(){}`)}function d(e,t){t.hasMetallicRoughnessTextureTransform&&t.textureCoordinateType!==i.N.None?(e.vertex.uniforms.add(new a.c("metallicRoughnessTextureTransformMatrix",(e=>e.metallicRoughnessTextureTransformMatrix??n.Wd))),e.varyings.add("metallicRoughnessUV","vec2"),e.vertex.code.add(o.H`void forwardMetallicRoughnessUV(){
metallicRoughnessUV = (metallicRoughnessTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(o.H`void forwardMetallicRoughnessUV(){}`)}},91024:function(e,t,r){r.d(t,{k:function(){return y}});var n=r(43036),i=r(91013),o=r(40017);class a extends i.x{constructor(e,t,r){super(e,"vec4",o.P.Pass,((r,n,i)=>r.setUniform4fv(e,t(n,i))),r)}}class s extends i.x{constructor(e,t,r){super(e,"float",o.P.Pass,((r,n,i)=>r.setUniform1fv(e,t(n,i))),r)}}var l=r(23410),c=r(11125),u=r(21414),d=(r(39994),r(19431),r(46332),r(3965),r(32114),r(3308)),h=(r(86717),r(81095)),f=(r(6923),r(36663)),m=r(74396),p=r(81977),v=(r(13802),r(4157),r(40266));let g=class extends m.Z{constructor(){super(...arguments),this.SCENEVIEW_HITTEST_RETURN_INTERSECTOR=!1,this.DECONFLICTOR_SHOW_VISIBLE=!1,this.DECONFLICTOR_SHOW_INVISIBLE=!1,this.DECONFLICTOR_SHOW_GRID=!1,this.LABELS_SHOW_BORDER=!1,this.TEXT_SHOW_BASELINE=!1,this.TEXT_SHOW_BORDER=!1,this.OVERLAY_DRAW_DEBUG_TEXTURE=!1,this.OVERLAY_SHOW_CENTER=!1,this.SHOW_POI=!1,this.TESTS_DISABLE_OPTIMIZATIONS=!1,this.TESTS_DISABLE_FAST_UPDATES=!1,this.DRAW_MESH_GEOMETRY_NORMALS=!1,this.FEATURE_TILE_FETCH_SHOW_TILES=!1,this.FEATURE_TILE_TREE_SHOW_TILES=!1,this.TERRAIN_TILE_TREE_SHOW_TILES=!1,this.I3S_TREE_SHOW_TILES=!1,this.I3S_SHOW_MODIFICATIONS=!1,this.LOD_INSTANCE_RENDERER_DISABLE_UPDATES=!1,this.LOD_INSTANCE_RENDERER_COLORIZE_BY_LEVEL=!1,this.EDGES_SHOW_HIDDEN_TRANSPARENT_EDGES=!1,this.LINE_WIREFRAMES=!1}};(0,f._)([(0,p.Cb)()],g.prototype,"SCENEVIEW_HITTEST_RETURN_INTERSECTOR",void 0),(0,f._)([(0,p.Cb)()],g.prototype,"DECONFLICTOR_SHOW_VISIBLE",void 0),(0,f._)([(0,p.Cb)()],g.prototype,"DECONFLICTOR_SHOW_INVISIBLE",void 0),(0,f._)([(0,p.Cb)()],g.prototype,"DECONFLICTOR_SHOW_GRID",void 0),(0,f._)([(0,p.Cb)()],g.prototype,"LABELS_SHOW_BORDER",void 0),(0,f._)([(0,p.Cb)()],g.prototype,"TEXT_SHOW_BASELINE",void 0),(0,f._)([(0,p.Cb)()],g.prototype,"TEXT_SHOW_BORDER",void 0),(0,f._)([(0,p.Cb)()],g.prototype,"OVERLAY_DRAW_DEBUG_TEXTURE",void 0),(0,f._)([(0,p.Cb)()],g.prototype,"OVERLAY_SHOW_CENTER",void 0),(0,f._)([(0,p.Cb)()],g.prototype,"SHOW_POI",void 0),(0,f._)([(0,p.Cb)()],g.prototype,"TESTS_DISABLE_OPTIMIZATIONS",void 0),(0,f._)([(0,p.Cb)()],g.prototype,"TESTS_DISABLE_FAST_UPDATES",void 0),(0,f._)([(0,p.Cb)()],g.prototype,"DRAW_MESH_GEOMETRY_NORMALS",void 0),(0,f._)([(0,p.Cb)()],g.prototype,"FEATURE_TILE_FETCH_SHOW_TILES",void 0),(0,f._)([(0,p.Cb)()],g.prototype,"FEATURE_TILE_TREE_SHOW_TILES",void 0),(0,f._)([(0,p.Cb)()],g.prototype,"TERRAIN_TILE_TREE_SHOW_TILES",void 0),(0,f._)([(0,p.Cb)()],g.prototype,"I3S_TREE_SHOW_TILES",void 0),(0,f._)([(0,p.Cb)()],g.prototype,"I3S_SHOW_MODIFICATIONS",void 0),(0,f._)([(0,p.Cb)()],g.prototype,"LOD_INSTANCE_RENDERER_DISABLE_UPDATES",void 0),(0,f._)([(0,p.Cb)()],g.prototype,"LOD_INSTANCE_RENDERER_COLORIZE_BY_LEVEL",void 0),(0,f._)([(0,p.Cb)()],g.prototype,"EDGES_SHOW_HIDDEN_TRANSPARENT_EDGES",void 0),(0,f._)([(0,p.Cb)()],g.prototype,"LINE_WIREFRAMES",void 0),g=(0,f._)([(0,v.j)("esri.views.3d.support.DebugFlags")],g);new g;var _,x;!function(e){e[e.Undefined=0]="Undefined",e[e.DefinedSize=1]="DefinedSize",e[e.DefinedScale=2]="DefinedScale"}(_||(_={})),function(e){e[e.Undefined=0]="Undefined",e[e.DefinedAngle=1]="DefinedAngle"}(x||(x={}));class T extends l.K{constructor(e){super(),this.vvSize=e?.size??null,this.vvColor=e?.color??null,this.vvOpacity=e?.opacity??null}}(0,d.Ue)(),(0,h.Ue)(),(0,d.Ue)();r(90160);const b=8;function y(e,t){const{vertex:r,attributes:i}=e;t.hasVvInstancing&&(t.vvSize||t.vvColor)&&i.add(u.T.INSTANCEFEATUREATTRIBUTE,"vec4"),t.vvSize?(r.uniforms.add(new n.J("vvSizeMinSize",(e=>e.vvSize.minSize))),r.uniforms.add(new n.J("vvSizeMaxSize",(e=>e.vvSize.maxSize))),r.uniforms.add(new n.J("vvSizeOffset",(e=>e.vvSize.offset))),r.uniforms.add(new n.J("vvSizeFactor",(e=>e.vvSize.factor))),r.uniforms.add(new c.c("vvSymbolRotationMatrix",(e=>e.vvSymbolRotationMatrix))),r.uniforms.add(new n.J("vvSymbolAnchor",(e=>e.vvSymbolAnchor))),r.code.add(l.H`vec3 vvScale(vec4 _featureAttribute) {
return clamp(vvSizeOffset + _featureAttribute.x * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize);
}
vec4 vvTransformPosition(vec3 position, vec4 _featureAttribute) {
return vec4(vvSymbolRotationMatrix * ( vvScale(_featureAttribute) * (position + vvSymbolAnchor)), 1.0);
}`),r.code.add(l.H`
      const float eps = 1.192092896e-07;
      vec4 vvTransformNormal(vec3 _normal, vec4 _featureAttribute) {
        vec3 vvScale = clamp(vvSizeOffset + _featureAttribute.x * vvSizeFactor, vvSizeMinSize + eps, vvSizeMaxSize);
        return vec4(vvSymbolRotationMatrix * _normal / vvScale, 1.0);
      }

      ${t.hasVvInstancing?l.H`
      vec4 vvLocalNormal(vec3 _normal) {
        return vvTransformNormal(_normal, instanceFeatureAttribute);
      }

      vec4 localPosition() {
        return vvTransformPosition(position, instanceFeatureAttribute);
      }`:""}
    `)):r.code.add(l.H`vec4 localPosition() { return vec4(position, 1.0); }
vec4 vvLocalNormal(vec3 _normal) { return vec4(_normal, 1.0); }`),t.vvColor?(r.constants.add("vvColorNumber","int",b),r.uniforms.add(new s("vvColorValues",(e=>e.vvColor.values),b),new a("vvColorColors",(e=>e.vvColor.colors),b)),r.code.add(l.H`
      vec4 interpolateVVColor(float value) {
        if (value <= vvColorValues[0]) {
          return vvColorColors[0];
        }

        for (int i = 1; i < vvColorNumber; ++i) {
          if (vvColorValues[i] >= value) {
            float f = (value - vvColorValues[i-1]) / (vvColorValues[i] - vvColorValues[i-1]);
            return mix(vvColorColors[i-1], vvColorColors[i], f);
          }
        }
        return vvColorColors[vvColorNumber - 1];
      }

      vec4 vvGetColor(vec4 featureAttribute) {
        return interpolateVVColor(featureAttribute.y);
      }

      ${t.hasVvInstancing?l.H`
            vec4 vvColor() {
              return vvGetColor(instanceFeatureAttribute);
            }`:"vec4 vvColor() { return vec4(1.0); }"}
    `)):r.code.add(l.H`vec4 vvColor() { return vec4(1.0); }`)}},44391:function(e,t,r){r.d(t,{F:function(){return n},b:function(){return i}});const n=.1,i=.001},49745:function(e,t,r){r.d(t,{z:function(){return u}});var n=r(44391),i=r(23410);function o(e){e.fragment.code.add(i.H`
    #define discardOrAdjustAlpha(color) { if (color.a < ${i.H.float(n.b)}) { discard; } }
  `)}var a=r(91013);r(40017);class s extends a.x{constructor(e,t){super(e,"float",BindType.P.Draw,((r,n,i)=>r.setUniform1f(e,t(n,i))))}}var l=r(24603),c=r(70984);function u(e,t){d(e,t,new l.p("textureAlphaCutoff",(e=>e.textureAlphaCutoff)))}function d(e,t,r){const n=e.fragment;switch(t.alphaDiscardMode!==c.JJ.Mask&&t.alphaDiscardMode!==c.JJ.MaskBlend||n.uniforms.add(r),t.alphaDiscardMode){case c.JJ.Blend:return e.include(o);case c.JJ.Opaque:n.code.add(i.H`void discardOrAdjustAlpha(inout vec4 color) {
color.a = 1.0;
}`);break;case c.JJ.Mask:n.code.add(i.H`#define discardOrAdjustAlpha(color) { if (color.a < textureAlphaCutoff) { discard; } else { color.a = 1.0; } }`);break;case c.JJ.MaskBlend:e.fragment.code.add(i.H`#define discardOrAdjustAlpha(color) { if (color.a < textureAlphaCutoff) { discard; } }`)}}},77334:function(e,t,r){r.d(t,{GZ:function(){return u}});var n=r(36531),i=r(84164),o=r(56999),a=r(52721),s=r(93072),l=r(63371),c=r(23410);function u(e){e.fragment.uniforms.add(new l.N("projInfo",((e,t)=>function(e){const t=e.projectionMatrix;return 0===t[11]?(0,o.s)(d,2/(e.fullWidth*t[0]),2/(e.fullHeight*t[5]),(1+t[12])/t[0],(1+t[13])/t[5]):(0,o.s)(d,-2/(e.fullWidth*t[0]),-2/(e.fullHeight*t[5]),(1-t[8])/t[0],(1-t[9])/t[5])}(t.camera)))),e.fragment.uniforms.add(new s.A("zScale",((e,t)=>function(e){return 0===e.projectionMatrix[11]?(0,n.t8)(h,0,1):(0,n.t8)(h,1,0)}(t.camera)))),e.fragment.code.add(c.H`vec3 reconstructPosition(vec2 fragCoord, float depth) {
return vec3((fragCoord * projInfo.xy + projInfo.zw) * (zScale.x * depth + zScale.y), depth);
}`)}const d=(0,a.Ue)();const h=(0,i.Ue)()},5331:function(e,t,r){r.d(t,{$:function(){return i}});var n=r(23410);function i({code:e},t){t.doublePrecisionRequiresObfuscation?e.add(n.H`vec3 dpPlusFrc(vec3 a, vec3 b) {
return mix(a, a + b, vec3(notEqual(b, vec3(0))));
}
vec3 dpMinusFrc(vec3 a, vec3 b) {
return mix(vec3(0), a - b, vec3(notEqual(a, b)));
}
vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
vec3 t1 = dpPlusFrc(hiA, hiB);
vec3 e = dpMinusFrc(t1, hiA);
vec3 t2 = dpMinusFrc(hiB, e) + dpMinusFrc(hiA, dpMinusFrc(t1, e)) + loA + loB;
return t1 + t2;
}`):e.add(n.H`vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
vec3 t1 = hiA + hiB;
vec3 e = t1 - hiA;
vec3 t2 = ((hiB - e) + (hiA - (t1 - e))) + loA + loB;
return t1 + t2;
}`)}},10938:function(e,t,r){r.d(t,{y:function(){return a}});var n=r(66352),i=r(23410);function o(e){e.code.add(i.H`vec4 premultiplyAlpha(vec4 v) {
return vec4(v.rgb * v.a, v.a);
}
vec3 rgb2hsv(vec3 c) {
vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);
vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);
float d = q.x - min(q.w, q.y);
float e = 1.0e-10;
return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), min(d / (q.x + e), 1.0), q.x);
}
vec3 hsv2rgb(vec3 c) {
vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
float rgb2v(vec3 c) {
return max(c.x, max(c.y, c.z));
}`)}function a(e){e.include(o),e.code.add(i.H`
    vec3 mixExternalColor(vec3 internalColor, vec3 textureColor, vec3 externalColor, int mode) {
      // workaround for artifacts in OSX using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      vec3 internalMixed = internalColor * textureColor;
      vec3 allMixed = internalMixed * externalColor;

      if (mode == ${i.H.int(n.a9.Multiply)}) {
        return allMixed;
      }
      if (mode == ${i.H.int(n.a9.Ignore)}) {
        return internalMixed;
      }
      if (mode == ${i.H.int(n.a9.Replace)}) {
        return externalColor;
      }

      // tint (or something invalid)
      float vIn = rgb2v(internalMixed);
      vec3 hsvTint = rgb2hsv(externalColor);
      vec3 hsvOut = vec3(hsvTint.x, hsvTint.y, vIn * hsvTint.z);
      return hsv2rgb(hsvOut);
    }

    float mixExternalOpacity(float internalOpacity, float textureOpacity, float externalOpacity, int mode) {
      // workaround for artifacts in OSX using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      float internalMixed = internalOpacity * textureOpacity;
      float allMixed = internalMixed * externalOpacity;

      if (mode == ${i.H.int(n.a9.Ignore)}) {
        return internalMixed;
      }
      if (mode == ${i.H.int(n.a9.Replace)}) {
        return externalOpacity;
      }

      // multiply or tint (or something invalid)
      return allMixed;
    }
  `)}},52446:function(e,t,r){r.d(t,{f:function(){return i}});var n=r(23410);function i(e){e.code.add(n.H`const float MAX_RGBA4_FLOAT =
15.0 / 16.0 +
15.0 / 16.0 / 16.0 +
15.0 / 16.0 / 16.0 / 16.0 +
15.0 / 16.0 / 16.0 / 16.0 / 16.0;
const vec4 FIXED_POINT_FACTORS_RGBA4 = vec4(1.0, 16.0, 16.0 * 16.0, 16.0 * 16.0 * 16.0);
vec4 floatToRgba4(const float value) {
float valueInValidDomain = clamp(value, 0.0, MAX_RGBA4_FLOAT);
vec4 fixedPointU4 = floor(fract(valueInValidDomain * FIXED_POINT_FACTORS_RGBA4) * 16.0);
const float toU4AsFloat = 1.0 / 15.0;
return fixedPointU4 * toU4AsFloat;
}
const vec4 RGBA4_2_FLOAT_FACTORS = vec4(
15.0 / (16.0),
15.0 / (16.0 * 16.0),
15.0 / (16.0 * 16.0 * 16.0),
15.0 / (16.0 * 16.0 * 16.0 * 16.0)
);
float rgba4ToFloat(vec4 rgba) {
return dot(rgba, RGBA4_2_FLOAT_FACTORS);
}`)}},9794:function(e,t,r){r.d(t,{n:function(){return i}});var n=r(23410);function i(e){e.code.add(n.H`const float MAX_RGBA_FLOAT =
255.0 / 256.0 +
255.0 / 256.0 / 256.0 +
255.0 / 256.0 / 256.0 / 256.0 +
255.0 / 256.0 / 256.0 / 256.0 / 256.0;
const vec4 FIXED_POINT_FACTORS = vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0);
vec4 float2rgba(const float value) {
float valueInValidDomain = clamp(value, 0.0, MAX_RGBA_FLOAT);
vec4 fixedPointU8 = floor(fract(valueInValidDomain * FIXED_POINT_FACTORS) * 256.0);
const float toU8AsFloat = 1.0 / 255.0;
return fixedPointU8 * toU8AsFloat;
}
const vec4 RGBA_2_FLOAT_FACTORS = vec4(
255.0 / (256.0),
255.0 / (256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0 * 256.0)
);
float rgba2float(vec4 rgba) {
return dot(rgba, RGBA_2_FLOAT_FACTORS);
}`)}},71354:function(e,t,r){r.d(t,{hY:function(){return f},Sv:function(){return m},_8:function(){return g}});var n=r(32114),i=r(3308),o=r(86717),a=r(81095),s=r(32006),l=r(43036),c=(r(24603),r(91013)),u=r(40017);class d extends c.x{constructor(e,t){super(e,"mat4",u.P.Draw,((r,n,i)=>r.setUniformMatrix4fv(e,t(n,i))))}}var h=r(87621);function f(e,t){t.instancedDoublePrecision?e.constants.add("cameraPosition","vec3",a.AG):e.uniforms.add(new s.B("cameraPosition",((e,t)=>(0,o.s)(v,t.camera.viewInverseTransposeMatrix[3]-e.origin[0],t.camera.viewInverseTransposeMatrix[7]-e.origin[1],t.camera.viewInverseTransposeMatrix[11]-e.origin[2]))))}function m(e,t){if(!t.instancedDoublePrecision)return void e.uniforms.add(new h.g("proj",((e,t)=>t.camera.projectionMatrix)),new d("view",((e,t)=>(0,n.Iu)(p,t.camera.viewMatrix,e.origin))),new s.B("localOrigin",(e=>e.origin)));const r=e=>(0,o.s)(v,e.camera.viewInverseTransposeMatrix[3],e.camera.viewInverseTransposeMatrix[7],e.camera.viewInverseTransposeMatrix[11]);e.uniforms.add(new h.g("proj",((e,t)=>t.camera.projectionMatrix)),new h.g("view",((e,t)=>(0,n.Iu)(p,t.camera.viewMatrix,r(t)))),new l.J("localOrigin",((e,t)=>r(t))))}const p=(0,i.Ue)(),v=(0,a.Ue)();function g(e){e.uniforms.add(new h.g("viewNormal",((e,t)=>t.camera.viewInverseTransposeMatrix)))}},26482:function(e,t,r){r.d(t,{q:function(){return o}});var n=r(91013),i=r(40017);class o extends n.x{constructor(e,t){super(e,"vec2",i.P.Draw,((r,n,i,o)=>r.setUniform2fv(e,t(n,i,o))))}}},93072:function(e,t,r){r.d(t,{A:function(){return o}});var n=r(91013),i=r(40017);class o extends n.x{constructor(e,t){super(e,"vec2",i.P.Pass,((r,n,i)=>r.setUniform2fv(e,t(n,i))))}}},32006:function(e,t,r){r.d(t,{B:function(){return o}});var n=r(91013),i=r(40017);class o extends n.x{constructor(e,t){super(e,"vec3",i.P.Draw,((r,n,i,o)=>r.setUniform3fv(e,t(n,i,o))))}}},43036:function(e,t,r){r.d(t,{J:function(){return o}});var n=r(91013),i=r(40017);class o extends n.x{constructor(e,t){super(e,"vec3",i.P.Pass,((r,n,i)=>r.setUniform3fv(e,t(n,i))))}}},63371:function(e,t,r){r.d(t,{N:function(){return o}});var n=r(91013),i=r(40017);class o extends n.x{constructor(e,t){super(e,"vec4",i.P.Pass,((r,n,i)=>r.setUniform4fv(e,t(n,i))))}}},24603:function(e,t,r){r.d(t,{p:function(){return o}});var n=r(91013),i=r(40017);class o extends n.x{constructor(e,t){super(e,"float",i.P.Pass,((r,n,i)=>r.setUniform1f(e,t(n,i))))}}},59842:function(e,t,r){r.d(t,{_:function(){return o}});var n=r(91013),i=r(40017);class o extends n.x{constructor(e,t){super(e,"int",i.P.Pass,((r,n,i)=>r.setUniform1i(e,t(n,i))))}}},55784:function(e,t,r){r.d(t,{j:function(){return o}});var n=r(91013),i=r(40017);class o extends n.x{constructor(e,t){super(e,"mat3",i.P.Draw,((r,n,i)=>r.setUniformMatrix3fv(e,t(n,i))))}}},11125:function(e,t,r){r.d(t,{c:function(){return o}});var n=r(91013),i=r(40017);class o extends n.x{constructor(e,t){super(e,"mat3",i.P.Pass,((r,n,i)=>r.setUniformMatrix3fv(e,t(n,i))))}}},87621:function(e,t,r){r.d(t,{g:function(){return o}});var n=r(91013),i=r(40017);class o extends n.x{constructor(e,t){super(e,"mat4",i.P.Pass,((r,n,i)=>r.setUniformMatrix4fv(e,t(n,i))))}}},3961:function(e,t,r){r.d(t,{kG:function(){return c}});var n=r(70375),i=r(13802),o=r(40017),a=r(15095);const s=()=>i.Z.getLogger("esri.views.3d.webgl-engine.core.shaderModules.shaderBuilder");class l{constructor(){this._includedModules=new Map}include(e,t){if(this._includedModules.has(e)){const r=this._includedModules.get(e);if(r!==t){s().error("Shader module included multiple times with different configuration.");const t=new Set;for(const n of Object.keys(r))r[n]!==e[n]&&t.add(n);for(const n of Object.keys(e))r[n]!==e[n]&&t.add(n);t.forEach((e=>{}))}}else this._includedModules.set(e,t),e(this.builder,t)}}class c extends l{constructor(){super(...arguments),this.vertex=new h,this.fragment=new h,this.attributes=new f,this.varyings=new m,this.extensions=new p,this.constants=new g,this.outputs=new v}get fragmentUniforms(){return this.fragment.uniforms.entries}get builder(){return this}generate(e){const t=this.extensions.generateSource(e),r=this.attributes.generateSource(e),n=this.varyings.generateSource(e),i="vertex"===e?this.vertex:this.fragment,o=i.uniforms.generateSource(),a=i.code.generateSource(),s="vertex"===e?x:_,l=this.constants.generateSource().concat(i.constants.generateSource()),c=this.outputs.generateSource(e);return`#version 300 es\n${t.join("\n")}\n\n${s}\n\n${l.join("\n")}\n\n${o.join("\n")}\n\n${r.join("\n")}\n\n${n.join("\n")}\n\n${c.join("\n")}\n\n${a.join("\n")}`}generateBindPass(e){const t=new Map;this.vertex.uniforms.entries.forEach((e=>{const r=e.bind[o.P.Pass];r&&t.set(e.name,r)})),this.fragment.uniforms.entries.forEach((e=>{const r=e.bind[o.P.Pass];r&&t.set(e.name,r)}));const r=Array.from(t.values()),n=r.length;return(t,i)=>{for(let o=0;o<n;++o)r[o](e,t,i)}}generateBindDraw(e){const t=new Map;this.vertex.uniforms.entries.forEach((e=>{const r=e.bind[o.P.Draw];r&&t.set(e.name,r)})),this.fragment.uniforms.entries.forEach((e=>{const r=e.bind[o.P.Draw];r&&t.set(e.name,r)}));const r=Array.from(t.values()),n=r.length;return(t,i,o)=>{for(let a=0;a<n;++a)r[a](e,t,i,o)}}}class u{constructor(){this._entries=new Map}add(...e){for(const t of e)this._add(t)}get(e){return this._entries.get(e)}_add(e){if(null!=e){if(this._entries.has(e.name)&&!this._entries.get(e.name).equals(e))throw new n.Z(`Duplicate uniform name ${e.name} for different uniform type`);this._entries.set(e.name,e)}else s().error(`Trying to add null Uniform from ${(new Error).stack}.`)}generateSource(){return Array.from(this._entries.values()).map((e=>null!=e.arraySize?`uniform ${e.type} ${e.name}[${e.arraySize}];`:`uniform ${e.type} ${e.name};`))}get entries(){return Array.from(this._entries.values())}}class d{constructor(){this._entries=new Array}add(e){this._entries.push(e)}generateSource(){return this._entries}}class h extends l{constructor(){super(...arguments),this.uniforms=new u,this.code=new d,this.constants=new g}get builder(){return this}}class f{constructor(){this._entries=new Array}add(e,t){this._entries.push([e,t])}generateSource(e){return"fragment"===e?[]:this._entries.map((e=>`in ${e[1]} ${e[0]};`))}}class m{constructor(){this._entries=new Map}add(e,t){this._entries.has(e)&&(0,a.hu)(this._entries.get(e)===t),this._entries.set(e,t)}generateSource(e){const t=new Array;return this._entries.forEach(((r,n)=>t.push("vertex"===e?`out ${r} ${n};`:`in ${r} ${n};`))),t}}class p{constructor(){this._entries=new Set}add(e){this._entries.add(e)}generateSource(e){const t="vertex"===e?p.ALLOWLIST_VERTEX:p.ALLOWLIST_FRAGMENT;return Array.from(this._entries).filter((e=>t.includes(e))).map((e=>`#extension ${e} : enable`))}}p.ALLOWLIST_FRAGMENT=["GL_EXT_shader_texture_lod","GL_OES_standard_derivatives"],p.ALLOWLIST_VERTEX=[];class v{constructor(){this._entries=new Map}add(e,t,r=0){const n=this._entries.get(r);n?(0,a.hu)(n.name===e&&n.type===t,`Fragment shader output location ${r} occupied`):this._entries.set(r,{name:e,type:t})}generateSource(e){if("vertex"===e)return[];0===this._entries.size&&this._entries.set(0,{name:v.DEFAULT_NAME,type:v.DEFAULT_TYPE});const t=new Array;return this._entries.forEach(((e,r)=>t.push(`layout(location = ${r}) out ${e.type} ${e.name};`))),t}}v.DEFAULT_TYPE="vec4",v.DEFAULT_NAME="fragColor";class g{constructor(){this._entries=new Set}add(e,t,r){let n="ERROR_CONSTRUCTOR_STRING";switch(t){case"float":n=g._numberToFloatStr(r);break;case"int":n=g._numberToIntStr(r);break;case"bool":n=r.toString();break;case"vec2":n=`vec2(${g._numberToFloatStr(r[0])},                            ${g._numberToFloatStr(r[1])})`;break;case"vec3":n=`vec3(${g._numberToFloatStr(r[0])},                            ${g._numberToFloatStr(r[1])},                            ${g._numberToFloatStr(r[2])})`;break;case"vec4":n=`vec4(${g._numberToFloatStr(r[0])},                            ${g._numberToFloatStr(r[1])},                            ${g._numberToFloatStr(r[2])},                            ${g._numberToFloatStr(r[3])})`;break;case"ivec2":n=`ivec2(${g._numberToIntStr(r[0])},                             ${g._numberToIntStr(r[1])})`;break;case"ivec3":n=`ivec3(${g._numberToIntStr(r[0])},                             ${g._numberToIntStr(r[1])},                             ${g._numberToIntStr(r[2])})`;break;case"ivec4":n=`ivec4(${g._numberToIntStr(r[0])},                             ${g._numberToIntStr(r[1])},                             ${g._numberToIntStr(r[2])},                             ${g._numberToIntStr(r[3])})`;break;case"mat2":case"mat3":case"mat4":n=`${t}(${Array.prototype.map.call(r,(e=>g._numberToFloatStr(e))).join(", ")})`}return this._entries.add(`const ${t} ${e} = ${n};`),this}static _numberToIntStr(e){return e.toFixed(0)}static _numberToFloatStr(e){return Number.isInteger(e)?e.toFixed(1):e.toString()}generateSource(){return Array.from(this._entries)}}const _="#ifdef GL_FRAGMENT_PRECISION_HIGH\n  precision highp float;\n  precision highp sampler2D;\n#else\n  precision mediump float;\n  precision mediump sampler2D;\n#endif",x="precision highp float;\nprecision highp sampler2D;"},37649:function(e,t,r){r.d(t,{R:function(){return o}});var n=r(91013),i=r(40017);class o extends n.x{constructor(e,t){super(e,"sampler2D",i.P.Draw,((r,n,i)=>r.bindTexture(e,t(n,i))))}}},15176:function(e,t,r){r.d(t,{A:function(){return o}});var n=r(91013),i=r(40017);class o extends n.x{constructor(e,t){super(e,"sampler2D",i.P.Pass,((r,n,i)=>r.bindTexture(e,t(n,i))))}}},91013:function(e,t,r){r.d(t,{x:function(){return i}});var n=r(40017);class i{constructor(e,t,r,i,o=null){if(this.name=e,this.type=t,this.arraySize=o,this.bind={[n.P.Pass]:null,[n.P.Draw]:null},i)switch(r){case n.P.Pass:this.bind[n.P.Pass]=i;break;case n.P.Draw:this.bind[n.P.Draw]=i}}equals(e){return this.type===e.type&&this.name===e.name&&this.arraySize===e.arraySize}}},23410:function(e,t,r){r.d(t,{H:function(){return i},K:function(){return n}});const n=class{};function i(e,...t){let r="";for(let n=0;n<t.length;n++)r+=e[n]+t[n];return r+=e[e.length-1],r}!function(e){e.int=function(e){return Math.round(e).toString()},e.float=function(e){return e.toPrecision(8)}}(i||(i={}))},40017:function(e,t,r){var n;r.d(t,{P:function(){return n}}),function(e){e[e.Pass=0]="Pass",e[e.Draw=1]="Draw"}(n||(n={}))},9969:function(e,t,r){r.d(t,{J:function(){return n}});class n{constructor(e,t){this._module=e,this._loadModule=t}get(){return this._module}async reload(){return this._module=await this._loadModule(),this._module}}},52756:function(e,t,r){r.d(t,{A:function(){return o}});var n=r(61681),i=r(91907);class o{constructor(e,t,r){this.release=r,this.initializeConfiguration(e,t),this._configuration=t.snapshot(),this._program=this.initializeProgram(e),this._pipeline=this.initializePipeline(e)}destroy(){this._program=(0,n.M2)(this._program),this._pipeline=this._configuration=null}reload(e){(0,n.M2)(this._program),this._program=this.initializeProgram(e),this._pipeline=this.initializePipeline(e)}get program(){return this._program}get compiled(){return this.program.compiled}get key(){return this._configuration.key}get configuration(){return this._configuration}ensureAttributeLocations(e){this.program.assertCompatibleVertexAttributeLocations(e)}get primitiveType(){return i.MX.TRIANGLES}getPipeline(e,t,r){return this._pipeline}initializeConfiguration(e,t){}}},67197:function(e,t,r){r.d(t,{m:function(){return i},o:function(){return o}});var n=r(23410);class i extends n.K{constructor(){super(),this._key="",this._keyDirty=!1,this._parameterBits=this._parameterBits?this._parameterBits.map((()=>0)):[],this._parameterNames||(this._parameterNames=[])}get key(){return this._keyDirty&&(this._keyDirty=!1,this._key=String.fromCharCode.apply(String,this._parameterBits)),this._key}snapshot(){const e=this._parameterNames,t={key:this.key};for(const r of e)t[r]=this[r];return t}}function o(e={}){return(t,r)=>{if(t._parameterNames=t._parameterNames??[],t._parameterNames.push(r),null!=e.constValue)Object.defineProperty(t,r,{get:()=>e.constValue});else{const n=t._parameterNames.length-1,i=e.count||2,o=Math.ceil(Math.log2(i)),a=t._parameterBits??[0];let s=0;for(;a[s]+o>16;)s++,s>=a.length&&a.push(0);t._parameterBits=a;const l=a[s],c=(1<<o)-1<<l;a[s]+=o,Object.defineProperty(t,r,{get(){return this[n]},set(e){if(this[n]!==e&&(this[n]=e,this._keyDirty=!0,this._parameterBits[s]=this._parameterBits[s]&~c|+e<<l&c,"number"!=typeof e&&"boolean"!=typeof e))throw new Error("Configuration value for "+r+" must be boolean or number, got "+typeof e)}})}}}},10107:function(e,t,r){r.d(t,{c:function(){return i}});var n=r(7958);class i{constructor(){this.id=(0,n.D)()}}},95399:function(e,t,r){var n;r.d(t,{U:function(){return n}}),function(e){e[e.Layer=0]="Layer",e[e.Object=1]="Object",e[e.Mesh=2]="Mesh",e[e.Line=3]="Line",e[e.Point=4]="Point",e[e.Material=5]="Material",e[e.Texture=6]="Texture",e[e.COUNT=7]="COUNT"}(n||(n={}))},5474:function(e,t,r){r.d(t,{i:function(){return i}});var n=r(21414);const i=new Map([[n.T.POSITION,0],[n.T.NORMAL,1],[n.T.NORMALCOMPRESSED,1],[n.T.UV0,2],[n.T.COLOR,3],[n.T.COLORFEATUREATTRIBUTE,3],[n.T.SIZE,4],[n.T.TANGENT,4],[n.T.CENTEROFFSETANDDISTANCE,5],[n.T.SYMBOLCOLOR,5],[n.T.FEATUREATTRIBUTE,6],[n.T.INSTANCEFEATUREATTRIBUTE,6],[n.T.INSTANCECOLOR,7],[n.T.OBJECTANDLAYERIDCOLOR,7],[n.T.INSTANCEOBJECTANDLAYERIDCOLOR,7],[n.T.INSTANCEMODEL,8],[n.T.INSTANCEMODELNORMAL,12],[n.T.INSTANCEMODELORIGINHI,11],[n.T.INSTANCEMODELORIGINLO,15]])},97009:function(e,t,r){r.d(t,{F:function(){return l},E:function(){return c}});var n=r(61681),i=r(78668),o=r(23410),a=r(70984);class s{constructor(e){this._material=e.material,this._techniqueRepository=e.techniqueRep,this._output=e.output}dispose(){this._techniqueRepository.release(this._technique)}get technique(){return this._technique}get _stippleTextureRepository(){return this._techniqueRepository.constructionContext.stippleTextureRepository}get _markerTextureRepository(){return this._techniqueRepository.constructionContext.markerTextureRepository}ensureTechnique(e,t){return this._technique=this._techniqueRepository.releaseAndAcquire(e,this._material.getConfiguration(this._output,t),this._technique),this._technique}ensureResources(e){return a.Rw.LOADED}}class l extends s{constructor(e){super(e),this._numLoading=0,this._disposed=!1,this._textureRepository=e.textureRepository,this._textureId=e.textureId,this._acquire(e.textureId,(e=>this._texture=e)),this._acquire(e.normalTextureId,(e=>this._textureNormal=e)),this._acquire(e.emissiveTextureId,(e=>this._textureEmissive=e)),this._acquire(e.occlusionTextureId,(e=>this._textureOcclusion=e)),this._acquire(e.metallicRoughnessTextureId,(e=>this._textureMetallicRoughness=e))}dispose(){this._texture=(0,n.RY)(this._texture),this._textureNormal=(0,n.RY)(this._textureNormal),this._textureEmissive=(0,n.RY)(this._textureEmissive),this._textureOcclusion=(0,n.RY)(this._textureOcclusion),this._textureMetallicRoughness=(0,n.RY)(this._textureMetallicRoughness),this._disposed=!0}ensureResources(e){return 0===this._numLoading?a.Rw.LOADED:a.Rw.LOADING}get textureBindParameters(){return new c(null!=this._texture?this._texture.glTexture:null,null!=this._textureNormal?this._textureNormal.glTexture:null,null!=this._textureEmissive?this._textureEmissive.glTexture:null,null!=this._textureOcclusion?this._textureOcclusion.glTexture:null,null!=this._textureMetallicRoughness?this._textureMetallicRoughness.glTexture:null)}updateTexture(e){null!=this._texture&&e===this._texture.id||(this._texture=(0,n.RY)(this._texture),this._textureId=e,this._acquire(this._textureId,(e=>this._texture=e)))}_acquire(e,t){if(null==e)return void t(null);const r=this._textureRepository.acquire(e);if((0,i.y8)(r))return++this._numLoading,void r.then((e=>{if(this._disposed)return(0,n.RY)(e),void t(null);t(e)})).finally((()=>--this._numLoading));t(r)}}class c extends o.K{constructor(e=null,t=null,r=null,n=null,i=null,o,a){super(),this.texture=e,this.textureNormal=t,this.textureEmissive=r,this.textureOcclusion=n,this.textureMetallicRoughness=i,this.scale=o,this.normalTextureTransformMatrix=a}}},40526:function(e,t,r){r.d(t,{Z:function(){return O}});var n=r(3308),i=r(86717),o=r(35914),a=r(86098);function s(e){if(e.length<a.c8)return Array.from(e);if((0,a.kJ)(e))return Float64Array.from(e);if(!("BYTES_PER_ELEMENT"in e))return Array.from(e);switch(e.BYTES_PER_ELEMENT){case 1:return Uint8Array.from(e);case 2:return(0,a.Uc)(e)?Uint16Array.from(e):Int16Array.from(e);case 4:return Float32Array.from(e);default:return Float64Array.from(e)}}var l=r(70984),c=r(17135),u=r(81095),d=r(15095);class h{constructor(e,t,r){this.primitiveIndices=e,this._numIndexPerPrimitive=t,this.position=r,this._children=void 0,(0,d.hu)(e.length>=1),(0,d.hu)(3===r.size||4===r.size);const{data:n,size:o,indices:a}=r;(0,d.hu)(a.length%this._numIndexPerPrimitive==0),(0,d.hu)(a.length>=e.length*this._numIndexPerPrimitive);const s=e.length;let l=o*a[this._numIndexPerPrimitive*e[0]];f.clear(),f.push(l);const c=(0,u.al)(n[l],n[l+1],n[l+2]),h=(0,u.d9)(c);for(let t=0;t<s;++t){const r=this._numIndexPerPrimitive*e[t];for(let e=0;e<this._numIndexPerPrimitive;++e){l=o*a[r+e],f.push(l);let t=n[l];c[0]=Math.min(t,c[0]),h[0]=Math.max(t,h[0]),t=n[l+1],c[1]=Math.min(t,c[1]),h[1]=Math.max(t,h[1]),t=n[l+2],c[2]=Math.min(t,c[2]),h[2]=Math.max(t,h[2])}}this.bbMin=c,this.bbMax=h;const m=(0,i.m)((0,u.Ue)(),this.bbMin,this.bbMax,.5);this.radius=.5*Math.max(Math.max(h[0]-c[0],h[1]-c[1]),h[2]-c[2]);let p=this.radius*this.radius;for(let e=0;e<f.length;++e){l=f.at(e);const t=n[l]-m[0],r=n[l+1]-m[1],i=n[l+2]-m[2],o=t*t+r*r+i*i;if(o<=p)continue;const a=Math.sqrt(o),s=.5*(a-this.radius);this.radius=this.radius+s,p=this.radius*this.radius;const c=s/a;m[0]+=t*c,m[1]+=r*c,m[2]+=i*c}this.center=m,f.clear()}getChildren(){if(this._children||(0,i.a)(this.bbMin,this.bbMax)<=1)return this._children;const e=(0,i.m)((0,u.Ue)(),this.bbMin,this.bbMax,.5),t=this.primitiveIndices.length,r=new Uint8Array(t),n=new Array(8);for(let e=0;e<8;++e)n[e]=0;const{data:o,size:a,indices:s}=this.position;for(let i=0;i<t;++i){let t=0;const l=this._numIndexPerPrimitive*this.primitiveIndices[i];let c=a*s[l],u=o[c],d=o[c+1],h=o[c+2];for(let e=1;e<this._numIndexPerPrimitive;++e){c=a*s[l+e];const t=o[c],r=o[c+1],n=o[c+2];t<u&&(u=t),r<d&&(d=r),n<h&&(h=n)}u<e[0]&&(t|=1),d<e[1]&&(t|=2),h<e[2]&&(t|=4),r[i]=t,++n[t]}let l=0;for(let e=0;e<8;++e)n[e]>0&&++l;if(l<2)return;const c=new Array(8);for(let e=0;e<8;++e)c[e]=n[e]>0?new Uint32Array(n[e]):void 0;for(let e=0;e<8;++e)n[e]=0;for(let e=0;e<t;++e){const t=r[e];c[t][n[t]++]=this.primitiveIndices[e]}this._children=new Array;for(let e=0;e<8;++e)void 0!==c[e]&&this._children.push(new h(c[e],this._numIndexPerPrimitive,this.position));return this._children}static prune(){f.prune()}}const f=new c.Z({deallocator:null});var m=r(10107),p=r(95399),v=r(19480),g=r(56215);r(68817);function _(e){return e?{p0:(0,u.d9)(e.p0),p1:(0,u.d9)(e.p1),p2:(0,u.d9)(e.p2)}:{p0:(0,u.Ue)(),p1:(0,u.Ue)(),p2:(0,u.Ue)()}}function x(e,t,r){return(0,i.f)(T,t,e),(0,i.f)(b,r,e),.5*(0,i.l)((0,i.b)(T,T,b))}new v.x(g.Ue),new v.x((()=>_()));const T=(0,u.Ue)(),b=(0,u.Ue)();const y=(0,u.Ue)(),S=(0,u.Ue)(),A=(0,u.Ue)(),E=(0,u.Ue)();var w=r(7958);class C{constructor(e){this.channel=e,this.id=(0,w.D)()}}var M=r(21414);r(30560);(0,u.Ue)(),new Float32Array(6);class O extends m.c{constructor(e,t,r=null,n=p.U.Mesh,i=null,a=-1){super(),this.material=e,this.mapPositions=r,this.type=n,this.objectAndLayerIdColor=i,this.edgeIndicesLength=a,this.visible=!0,this._attributes=new Map,this._boundingInfo=null;for(const[e,r]of t)this._attributes.set(e,{...r,indices:(0,o.mi)(r.indices)}),e===M.T.POSITION&&(this.edgeIndicesLength=this.edgeIndicesLength<0?this._attributes.get(e).indices.length:this.edgeIndicesLength)}instantiate(e={}){const t=new O(e.material||this.material,[],this.mapPositions,this.type,this.objectAndLayerIdColor,this.edgeIndicesLength);return this._attributes.forEach(((e,r)=>{e.exclusive=!1,t._attributes.set(r,e)})),t._boundingInfo=this._boundingInfo,t.transformation=e.transformation||this.transformation,t}get attributes(){return this._attributes}getMutableAttribute(e){let t=this._attributes.get(e);return t&&!t.exclusive&&(t={...t,exclusive:!0,data:s(t.data)},this._attributes.set(e,t)),t}setAttributeData(e,t){const r=this._attributes.get(e);r&&this._attributes.set(e,{...r,exclusive:!0,data:t})}get indexCount(){const e=this._attributes.values().next().value.indices;return e?.length??0}get faceCount(){return this.indexCount/3}get boundingInfo(){return null==this._boundingInfo&&(this._boundingInfo=this._calculateBoundingInfo()),this._boundingInfo}computeAttachmentOrigin(e){return!!(this.type===p.U.Mesh?this._computeAttachmentOriginTriangles(e):this.type===p.U.Line?this._computeAttachmentOriginLines(e):this._computeAttachmentOriginPoints(e))&&(null!=this._transformation&&(0,i.e)(e,e,this._transformation),!0)}_computeAttachmentOriginTriangles(e){return function(e,t){if(!e)return!1;const{size:r,data:n,indices:o}=e;(0,i.s)(t,0,0,0),(0,i.s)(E,0,0,0);let a=0,s=0;for(let e=0;e<o.length-2;e+=3){const l=o[e]*r,c=o[e+1]*r,u=o[e+2]*r;(0,i.s)(y,n[l],n[l+1],n[l+2]),(0,i.s)(S,n[c],n[c+1],n[c+2]),(0,i.s)(A,n[u],n[u+1],n[u+2]);const d=x(y,S,A);d?((0,i.g)(y,y,S),(0,i.g)(y,y,A),(0,i.h)(y,y,1/3*d),(0,i.g)(t,t,y),a+=d):((0,i.g)(E,E,y),(0,i.g)(E,E,S),(0,i.g)(E,E,A),s+=3)}return!(0===s&&0===a||(0!==a?((0,i.h)(t,t,1/a),0):0===s||((0,i.h)(t,E,1/s),0)))}(this.attributes.get(M.T.POSITION),e)}_computeAttachmentOriginLines(e){const t=this.attributes.get(M.T.POSITION);return function(e,t,r){if(!e)return!1;(0,i.s)(r,0,0,0),(0,i.s)(E,0,0,0);let n=0,o=0;const{size:a,data:s,indices:l}=e,c=l.length-1,u=c+(t?2:0);for(let e=0;e<u;e+=2){const t=e<c?e+1:0,u=l[e<c?e:c]*a,d=l[t]*a;y[0]=s[u],y[1]=s[u+1],y[2]=s[u+2],S[0]=s[d],S[1]=s[d+1],S[2]=s[d+2],(0,i.h)(y,(0,i.g)(y,y,S),.5);const h=(0,i.o)(y,S);h>0?((0,i.g)(r,r,(0,i.h)(y,y,h)),n+=h):0===n&&((0,i.g)(E,E,y),o++)}return 0!==n?((0,i.h)(r,r,1/n),!0):0!==o&&((0,i.h)(r,E,1/o),!0)}(t,function(e,t){return!(!("isClosed"in e)||!e.isClosed)&&t.indices.length>2}(this.material.parameters,t),e)}_computeAttachmentOriginPoints(e){return function(e,t){if(!e)return!1;const{size:r,data:n,indices:o}=e;(0,i.s)(t,0,0,0);let a=-1,s=0;for(let e=0;e<o.length;e++){const i=o[e]*r;a!==i&&(t[0]+=n[i],t[1]+=n[i+1],t[2]+=n[i+2],s++),a=i}return s>1&&(0,i.h)(t,t,1/s),s>0}(this.attributes.get(M.T.POSITION),e)}invalidateBoundingInfo(){this._boundingInfo=null}_calculateBoundingInfo(){const e=this.attributes.get(M.T.POSITION);if(!e||0===e.indices.length)return null;const t=this.type===p.U.Mesh?3:1;(0,d.hu)(e.indices.length%t==0,"Indexing error: "+e.indices.length+" not divisible by "+t);const r=(0,o.KF)(e.indices.length/t);return new h(r,t,e)}get transformation(){return this._transformation??n.Wd}set transformation(e){this._transformation=e&&e!==n.Wd?(0,n.d9)(e):null}addHighlight(){const e=new C(l.V_.Highlight);return this.highlights=function(e,t){return null==e&&(e=[]),e.push(t),e}(this.highlights,e),e}removeHighlight(e){this.highlights=function(e,t){if(null==e)return null;const r=e.filter((e=>e!==t));return 0===r.length?null:r}(this.highlights,e)}}},90160:function(e,t,r){r.d(t,{F5:function(){return d},yD:function(){return o}});var n=r(81095),i=r(23410);r(12928);var o,a=r(70984),s=r(10107),l=r(95399),c=r(5474),u=r(13705);class d extends s.c{constructor(e,t){super(),this.type=l.U.Material,this.supportsEdges=!1,this._visible=!0,this._renderPriority=0,this._vertexAttributeLocations=c.i,this._pp0=(0,n.al)(0,0,1),this._pp1=(0,n.al)(0,0,0),this._parameters=(0,u.Uf)(e,t),this.validateParameters(this._parameters)}get parameters(){return this._parameters}update(e){return!1}setParameters(e,t=!0){(0,u.LO)(this._parameters,e)&&(this.validateParameters(this._parameters),t&&this.parametersChanged())}validateParameters(e){}get visible(){return this._visible}set visible(e){e!==this._visible&&(this._visible=e,this.parametersChanged())}shouldRender(e){return this.isVisible()&&this.isVisibleForOutput(e.output)&&(!this.parameters.isDecoration||e.bindParameters.decorations===a.Iq.ON)&&0!=(this.parameters.renderOccluded&e.renderOccludedMask)}isVisibleForOutput(e){return!0}get renderPriority(){return this._renderPriority}set renderPriority(e){e!==this._renderPriority&&(this._renderPriority=e,this.parametersChanged())}get vertexAttributeLocations(){return this._vertexAttributeLocations}isVisible(){return this._visible}parametersChanged(){this.repository?.materialChanged(this)}queryRenderOccludedState(e){return this.isVisible()&&this.parameters.renderOccluded===e}intersectDraped(e,t,r,n,i,o){return this._pp0[0]=this._pp1[0]=n[0],this._pp0[1]=this._pp1[1]=n[1],this.intersect(e,t,r,this._pp0,this._pp1,i)}}!function(e){e[e.None=0]="None",e[e.Occlude=1]="Occlude",e[e.Transparent=2]="Transparent",e[e.OccludeAndTransparent=4]="OccludeAndTransparent",e[e.OccludeAndTransparentStencil=8]="OccludeAndTransparentStencil",e[e.Opaque=16]="Opaque"}(o||(o={}));class h extends i.K{constructor(){super(...arguments),this.renderOccluded=o.Occlude,this.isDecoration=!1}}},12045:function(e,t,r){r.d(t,{Bh:function(){return f},IB:function(){return l},j7:function(){return c},je:function(){return h},ve:function(){return u},wu:function(){return a}});var n=r(42842),i=r(91907),o=r(17346);const a=(0,o.wK)(i.zi.SRC_ALPHA,i.zi.ONE,i.zi.ONE_MINUS_SRC_ALPHA,i.zi.ONE_MINUS_SRC_ALPHA),s=(0,o.if)(i.zi.ONE,i.zi.ONE),l=(0,o.if)(i.zi.ZERO,i.zi.ONE_MINUS_SRC_ALPHA);function c(e){return e===n.A.FrontFace?null:e===n.A.Alpha?l:s}const u=5e5,d={factor:-1,units:-2};function h(e){return e?d:null}function f(e,t=i.wb.LESS){return e===n.A.NONE||e===n.A.FrontFace?t:i.wb.LEQUAL}},95194:function(e,t,r){r.d(t,{$:function(){return o}});var n=r(17135),i=r(6174);class o{constructor(e,t,r){this._context=e,this._locations=r,this._textures=new Map,this._freeTextureUnits=new n.Z({deallocator:null}),this._glProgram=e.programCache.acquire(t.generate("vertex"),t.generate("fragment"),r),this._glProgram.stop=()=>{throw new Error("Wrapped _glProgram used directly")},this.bindPass=t.generateBindPass(this),this.bindDraw=t.generateBindDraw(this),this._fragmentUniforms=(0,i.hZ)()?t.fragmentUniforms:null}dispose(){this._glProgram.dispose()}get glName(){return this._glProgram.glName}get hasTransformFeedbackVaryings(){return this._glProgram.hasTransformFeedbackVaryings}get compiled(){return this._glProgram.compiled}setUniform1b(e,t){this._glProgram.setUniform1i(e,t?1:0)}setUniform1i(e,t){this._glProgram.setUniform1i(e,t)}setUniform1f(e,t){this._glProgram.setUniform1f(e,t)}setUniform2fv(e,t){this._glProgram.setUniform2fv(e,t)}setUniform3fv(e,t){this._glProgram.setUniform3fv(e,t)}setUniform4fv(e,t){this._glProgram.setUniform4fv(e,t)}setUniformMatrix3fv(e,t){this._glProgram.setUniformMatrix3fv(e,t)}setUniformMatrix4fv(e,t){this._glProgram.setUniformMatrix4fv(e,t)}setUniform1fv(e,t){this._glProgram.setUniform1fv(e,t)}setUniform1iv(e,t){this._glProgram.setUniform1iv(e,t)}setUniform2iv(e,t){this._glProgram.setUniform3iv(e,t)}setUniform3iv(e,t){this._glProgram.setUniform3iv(e,t)}setUniform4iv(e,t){this._glProgram.setUniform4iv(e,t)}assertCompatibleVertexAttributeLocations(e){e.locations,this._locations}stop(){this._textures.clear(),this._freeTextureUnits.clear()}bindTexture(e,t){if(null==t?.glName){const t=this._textures.get(e);return t&&(this._context.bindTexture(null,t.unit),this._freeTextureUnit(t),this._textures.delete(e)),null}let r=this._textures.get(e);return null==r?(r=this._allocTextureUnit(t),this._textures.set(e,r)):r.texture=t,this._context.useProgram(this),this.setUniform1i(e,r.unit),this._context.bindTexture(t,r.unit),r.unit}rebindTextures(){this._context.useProgram(this),this._textures.forEach(((e,t)=>{this._context.bindTexture(e.texture,e.unit),this.setUniform1i(t,e.unit)})),this._fragmentUniforms?.forEach((e=>{"sampler2D"!==e.type&&"samplerCube"!==e.type||this._textures.has(e.name)}))}_allocTextureUnit(e){return{texture:e,unit:0===this._freeTextureUnits.length?this._textures.size:this._freeTextureUnits.pop()}}_freeTextureUnit(e){this._freeTextureUnits.push(e.unit)}}},46378:function(e,t,r){var n;r.d(t,{r:function(){return n}}),function(e){e[e.INTEGRATED_MESH=0]="INTEGRATED_MESH",e[e.OPAQUE_TERRAIN=1]="OPAQUE_TERRAIN",e[e.OPAQUE_MATERIAL=2]="OPAQUE_MATERIAL",e[e.OPAQUE_NO_SSAO_DEPTH=3]="OPAQUE_NO_SSAO_DEPTH",e[e.TRANSPARENT_MATERIAL=4]="TRANSPARENT_MATERIAL",e[e.TRANSPARENT_NO_SSAO_DEPTH=5]="TRANSPARENT_NO_SSAO_DEPTH",e[e.TRANSPARENT_TERRAIN=6]="TRANSPARENT_TERRAIN",e[e.TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL=7]="TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL",e[e.OCCLUDED_TERRAIN=8]="OCCLUDED_TERRAIN",e[e.OCCLUDER_MATERIAL=9]="OCCLUDER_MATERIAL",e[e.TRANSPARENT_OCCLUDER_MATERIAL=10]="TRANSPARENT_OCCLUDER_MATERIAL",e[e.OCCLUSION_PIXELS=11]="OCCLUSION_PIXELS",e[e.ANTIALIASING=12]="ANTIALIASING",e[e.COMPOSITE=13]="COMPOSITE",e[e.BLIT=14]="BLIT",e[e.SSAO=15]="SSAO",e[e.HIGHLIGHT=16]="HIGHLIGHT",e[e.SHADOW_HIGHLIGHT=17]="SHADOW_HIGHLIGHT",e[e.ENVIRONMENT_OPAQUE=18]="ENVIRONMENT_OPAQUE",e[e.ENVIRONMENT_TRANSPARENT=19]="ENVIRONMENT_TRANSPARENT",e[e.LASERLINES=20]="LASERLINES",e[e.LASERLINES_CONTRAST_CONTROL=21]="LASERLINES_CONTRAST_CONTROL",e[e.HUD_MATERIAL=22]="HUD_MATERIAL",e[e.LABEL_MATERIAL=23]="LABEL_MATERIAL",e[e.LINE_CALLOUTS=24]="LINE_CALLOUTS",e[e.LINE_CALLOUTS_HUD_DEPTH=25]="LINE_CALLOUTS_HUD_DEPTH",e[e.DRAPED_MATERIAL=26]="DRAPED_MATERIAL",e[e.DRAPED_WATER=27]="DRAPED_WATER",e[e.VOXEL=28]="VOXEL",e[e.MAX_SLOTS=29]="MAX_SLOTS"}(n||(n={}))},42842:function(e,t,r){var n;r.d(t,{A:function(){return n}}),function(e){e[e.Color=0]="Color",e[e.Alpha=1]="Alpha",e[e.FrontFace=2]="FrontFace",e[e.NONE=3]="NONE",e[e.COUNT=4]="COUNT"}(n||(n={}))},70984:function(e,t,r){var n,i,o,a,s,l,c,u,d;r.d(t,{Gv:function(){return i},Iq:function(){return u},JJ:function(){return c},Rw:function(){return a},Ti:function(){return d},V_:function(){return l},Vr:function(){return n},hU:function(){return s}}),function(e){e[e.None=0]="None",e[e.Front=1]="Front",e[e.Back=2]="Back",e[e.COUNT=3]="COUNT"}(n||(n={})),function(e){e[e.Less=0]="Less",e[e.Lequal=1]="Lequal",e[e.COUNT=2]="COUNT"}(i||(i={})),function(e){e[e.BACKGROUND=0]="BACKGROUND",e[e.UPDATE=1]="UPDATE"}(o||(o={})),function(e){e[e.NOT_LOADED=0]="NOT_LOADED",e[e.LOADING=1]="LOADING",e[e.LOADED=2]="LOADED"}(a||(a={})),function(e){e[e.IntegratedMeshMaskExcluded=1]="IntegratedMeshMaskExcluded",e[e.OutlineVisualElementMask=2]="OutlineVisualElementMask"}(s||(s={})),function(e){e[e.Highlight=0]="Highlight",e[e.MaskOccludee=1]="MaskOccludee",e[e.COUNT=2]="COUNT"}(l||(l={})),function(e){e[e.Blend=0]="Blend",e[e.Opaque=1]="Opaque",e[e.Mask=2]="Mask",e[e.MaskBlend=3]="MaskBlend",e[e.COUNT=4]="COUNT"}(c||(c={})),function(e){e[e.OFF=0]="OFF",e[e.ON=1]="ON"}(u||(u={})),function(e){e.DDS_ENCODING="image/vnd-ms.dds",e.KTX2_ENCODING="image/ktx2",e.BASIS_ENCODING="image/x.basis"}(d||(d={}))},13705:function(e,t,r){r.d(t,{FZ:function(){return M},Uf:function(){return E},Bw:function(){return v},LO:function(){return w},Hx:function(){return A}});var n=r(7753),i=r(19431),o=r(86717),a=r(81095),s=r(37116),l=r(95399);r(65684);function c(e,t,r){const n=r.parameters;return h.scale=Math.min(n.divisor/(t-n.offset),1),h.factor=function(e){return Math.abs(e*e*e)}(e),h}function u(e,t){return(0,i.t7)(e*Math.max(t.scale,t.minScaleFactor),e,t.factor)}function d(e,t,r,n){return u(e,c(t,r,n))}(0,i.Vl)(10),(0,i.Vl)(12),(0,i.Vl)(70),(0,i.Vl)(40);const h={scale:0,factor:0,minScaleFactor:0};var f=r(15095),m=r(21414);const p=(0,s.Ue)();function v(e,t,r,n,i,o){if(e.visible)if(e.boundingInfo){(0,f.hu)(e.type===l.U.Mesh);const a=t.tolerance;_(e.boundingInfo,r,n,a,i,o)}else{const t=e.attributes.get(m.T.POSITION),a=t.indices;T(r,n,0,a.length/3,a,t,void 0,i,o)}}const g=(0,a.Ue)();function _(e,t,r,n,i,a){if(null==e)return;const l=function(e,t,r){return(0,o.s)(r,1/(t[0]-e[0]),1/(t[1]-e[1]),1/(t[2]-e[2]))}(t,r,g);if((0,s.op)(p,e.bbMin),(0,s.Tn)(p,e.bbMax),null!=i&&i.applyToAabb(p),function(e,t,r,n){return function(e,t,r,n,i){const o=(e[0]-n-t[0])*r[0],a=(e[3]+n-t[0])*r[0];let s=Math.min(o,a),l=Math.max(o,a);const c=(e[1]-n-t[1])*r[1],u=(e[4]+n-t[1])*r[1];if(l=Math.min(l,Math.max(c,u)),l<0)return!1;if(s=Math.max(s,Math.min(c,u)),s>l)return!1;const d=(e[2]-n-t[2])*r[2],h=(e[5]+n-t[2])*r[2];return l=Math.min(l,Math.max(d,h)),!(l<0)&&(s=Math.max(s,Math.min(d,h)),!(s>l)&&s<i)}(e,t,r,n,1/0)}(p,t,l,n)){const{primitiveIndices:o,position:s}=e,l=o?o.length:s.indices.length/3;if(l>O){const o=e.getChildren();if(void 0!==o){for(const e of o)_(e,t,r,n,i,a);return}}T(t,r,0,l,s.indices,s,o,i,a)}}const x=(0,a.Ue)();function T(e,t,r,n,i,o,a,s,l){if(a)return function(e,t,r,n,i,o,a,s,l){const{data:c,stride:u}=o,d=e[0],h=e[1],f=e[2],m=t[0]-d,p=t[1]-h,v=t[2]-f;for(let e=r;e<n;++e){const t=a[e];let r=3*t,n=u*i[r++],o=c[n++],g=c[n++],_=c[n];n=u*i[r++];let T=c[n++],b=c[n++],y=c[n];n=u*i[r];let A=c[n++],E=c[n++],w=c[n];null!=s&&([o,g,_]=s.applyToVertex(o,g,_,e),[T,b,y]=s.applyToVertex(T,b,y,e),[A,E,w]=s.applyToVertex(A,E,w,e));const C=T-o,M=b-g,O=y-_,R=A-o,I=E-g,P=w-_,N=p*P-I*v,H=v*R-P*m,L=m*I-R*p,F=C*N+M*H+O*L;if(Math.abs(F)<=Number.EPSILON)continue;const D=d-o,B=h-g,U=f-_,z=D*N+B*H+U*L;if(F>0){if(z<0||z>F)continue}else if(z>0||z<F)continue;const G=B*O-M*U,V=U*C-O*D,W=D*M-C*B,j=m*G+p*V+v*W;if(F>0){if(j<0||z+j>F)continue}else if(j>0||z+j<F)continue;const k=(R*G+I*V+P*W)/F;k>=0&&l(k,S(C,M,O,R,I,P,x),t,!1)}}(e,t,r,n,i,o,a,s,l);const{data:c,stride:u}=o,d=e[0],h=e[1],f=e[2],m=t[0]-d,p=t[1]-h,v=t[2]-f;for(let e=r,t=3*r;e<n;++e){let r=u*i[t++],n=c[r++],o=c[r++],a=c[r];r=u*i[t++];let g=c[r++],_=c[r++],T=c[r];r=u*i[t++];let b=c[r++],y=c[r++],A=c[r];null!=s&&([n,o,a]=s.applyToVertex(n,o,a,e),[g,_,T]=s.applyToVertex(g,_,T,e),[b,y,A]=s.applyToVertex(b,y,A,e));const E=g-n,w=_-o,C=T-a,M=b-n,O=y-o,R=A-a,I=p*R-O*v,P=v*M-R*m,N=m*O-M*p,H=E*I+w*P+C*N;if(Math.abs(H)<=Number.EPSILON)continue;const L=d-n,F=h-o,D=f-a,B=L*I+F*P+D*N;if(H>0){if(B<0||B>H)continue}else if(B>0||B<H)continue;const U=F*C-w*D,z=D*E-C*L,G=L*w-E*F,V=m*U+p*z+v*G;if(H>0){if(V<0||B+V>H)continue}else if(V>0||B+V<H)continue;const W=(M*U+O*z+R*G)/H;W>=0&&l(W,S(E,w,C,M,O,R,x),e,!1)}}const b=(0,a.Ue)(),y=(0,a.Ue)();function S(e,t,r,n,i,a,s){return(0,o.s)(b,e,t,r),(0,o.s)(y,n,i,a),(0,o.b)(s,b,y),(0,o.n)(s,s),s}function A(e,t,r,n,o){let a=(r.screenLength||0)*e.pixelRatio;null!=o&&(a=d(a,n,t,o));const s=a*Math.tan(.5*e.fovY)/(.5*e.fullHeight);return(0,i.uZ)(s*t,r.minWorldLength||0,null!=r.maxWorldLength?r.maxWorldLength:1/0)}function E(e,t){const r=t?E(t):{};for(const t in e){let n=e[t];n?.forEach&&(n=C(n)),null==n&&t in r||(r[t]=n)}return r}function w(e,t){let r=!1;for(const i in t){const o=t[i];void 0!==o&&(Array.isArray(o)?null===e[i]?(e[i]=o.slice(),r=!0):(0,n.Vx)(e[i],o)&&(r=!0):e[i]!==o&&(r=!0,e[i]=o))}return r}function C(e){const t=[];return e.forEach((e=>t.push(e))),t}const M={multiply:1,ignore:2,replace:3,tint:4},O=1e3},22855:function(e,t,r){var n;r.d(t,{n:function(){return n}}),function(e){e[e.ANIMATING=0]="ANIMATING",e[e.INTERACTING=1]="INTERACTING",e[e.IDLE=2]="IDLE"}(n||(n={}))},30560:function(e,t,r){function n(e,t,r){for(let n=0;n<r;++n)t[2*n]=e[n],t[2*n+1]=e[n]-t[2*n]}function i(e,t){const r=e.length;for(let n=0;n<r;++n)a[0]=e[n],t[n]=a[0];return t}function o(e,t){const r=e.length;for(let n=0;n<r;++n)a[0]=e[n],a[1]=e[n]-a[0],t[n]=a[1];return t}r.d(t,{GB:function(){return o},LF:function(){return n},U8:function(){return i}});const a=new Float32Array(2)},17346:function(e,t,r){r.d(t,{BK:function(){return d},LZ:function(){return u},if:function(){return o},jp:function(){return W},sm:function(){return b},wK:function(){return a},zp:function(){return c}});var n=r(70984),i=r(91907);function o(e,t,r=i.db.ADD,n=[0,0,0,0]){return{srcRgb:e,srcAlpha:e,dstRgb:t,dstAlpha:t,opRgb:r,opAlpha:r,color:{r:n[0],g:n[1],b:n[2],a:n[3]}}}function a(e,t,r,n,o=i.db.ADD,a=i.db.ADD,s=[0,0,0,0]){return{srcRgb:e,srcAlpha:t,dstRgb:r,dstAlpha:n,opRgb:o,opAlpha:a,color:{r:s[0],g:s[1],b:s[2],a:s[3]}}}const s={face:i.LR.BACK,mode:i.Wf.CCW},l={face:i.LR.FRONT,mode:i.Wf.CCW},c=e=>e===n.Vr.Back?s:e===n.Vr.Front?l:null,u={zNear:0,zFar:1},d={r:!0,g:!0,b:!0,a:!0};function h(e){return A.intern(e)}function f(e){return w.intern(e)}function m(e){return M.intern(e)}function p(e){return R.intern(e)}function v(e){return P.intern(e)}function g(e){return H.intern(e)}function _(e){return F.intern(e)}function x(e){return B.intern(e)}function T(e){return z.intern(e)}function b(e){return V.intern(e)}class y{constructor(e,t){this._makeKey=e,this._makeRef=t,this._interns=new Map}intern(e){if(!e)return null;const t=this._makeKey(e),r=this._interns;return r.has(t)||r.set(t,this._makeRef(e)),r.get(t)??null}}function S(e){return"["+e.join(",")+"]"}const A=new y(E,(e=>({__tag:"Blending",...e})));function E(e){return e?S([e.srcRgb,e.srcAlpha,e.dstRgb,e.dstAlpha,e.opRgb,e.opAlpha,e.color.r,e.color.g,e.color.b,e.color.a]):null}const w=new y(C,(e=>({__tag:"Culling",...e})));function C(e){return e?S([e.face,e.mode]):null}const M=new y(O,(e=>({__tag:"PolygonOffset",...e})));function O(e){return e?S([e.factor,e.units]):null}const R=new y(I,(e=>({__tag:"DepthTest",...e})));function I(e){return e?S([e.func]):null}const P=new y(N,(e=>({__tag:"StencilTest",...e})));function N(e){return e?S([e.function.func,e.function.ref,e.function.mask,e.operation.fail,e.operation.zFail,e.operation.zPass]):null}const H=new y(L,(e=>({__tag:"DepthWrite",...e})));function L(e){return e?S([e.zNear,e.zFar]):null}const F=new y(D,(e=>({__tag:"ColorWrite",...e})));function D(e){return e?S([e.r,e.g,e.b,e.a]):null}const B=new y(U,(e=>({__tag:"StencilWrite",...e})));function U(e){return e?S([e.mask]):null}const z=new y(G,(e=>({__tag:"DrawBuffers",...e})));function G(e){return e?S(e.buffers):null}const V=new y((function(e){return e?S([E(e.blending),C(e.culling),O(e.polygonOffset),I(e.depthTest),N(e.stencilTest),L(e.depthWrite),D(e.colorWrite),U(e.stencilWrite),G(e.drawBuffers)]):null}),(e=>({blending:h(e.blending),culling:f(e.culling),polygonOffset:m(e.polygonOffset),depthTest:p(e.depthTest),stencilTest:v(e.stencilTest),depthWrite:g(e.depthWrite),colorWrite:_(e.colorWrite),stencilWrite:x(e.stencilWrite),drawBuffers:T(e.drawBuffers)})));class W{constructor(e){this._pipelineInvalid=!0,this._blendingInvalid=!0,this._cullingInvalid=!0,this._polygonOffsetInvalid=!0,this._depthTestInvalid=!0,this._stencilTestInvalid=!0,this._depthWriteInvalid=!0,this._colorWriteInvalid=!0,this._stencilWriteInvalid=!0,this._drawBuffersInvalid=!0,this._stateSetters=e}setPipeline(e){(this._pipelineInvalid||e!==this._pipeline)&&(this._setBlending(e.blending),this._setCulling(e.culling),this._setPolygonOffset(e.polygonOffset),this._setDepthTest(e.depthTest),this._setStencilTest(e.stencilTest),this._setDepthWrite(e.depthWrite),this._setColorWrite(e.colorWrite),this._setStencilWrite(e.stencilWrite),this._setDrawBuffers(e.drawBuffers),this._pipeline=e),this._pipelineInvalid=!1}invalidateBlending(){this._blendingInvalid=!0,this._pipelineInvalid=!0}invalidateCulling(){this._cullingInvalid=!0,this._pipelineInvalid=!0}invalidatePolygonOffset(){this._polygonOffsetInvalid=!0,this._pipelineInvalid=!0}invalidateDepthTest(){this._depthTestInvalid=!0,this._pipelineInvalid=!0}invalidateStencilTest(){this._stencilTestInvalid=!0,this._pipelineInvalid=!0}invalidateDepthWrite(){this._depthWriteInvalid=!0,this._pipelineInvalid=!0}invalidateColorWrite(){this._colorWriteInvalid=!0,this._pipelineInvalid=!0}invalidateStencilWrite(){this._stencilTestInvalid=!0,this._pipelineInvalid=!0}invalidateDrawBuffers(){this._drawBuffersInvalid=!0,this._pipelineInvalid=!0}_setBlending(e){this._blending=this._setSubState(e,this._blending,this._blendingInvalid,this._stateSetters.setBlending),this._blendingInvalid=!1}_setCulling(e){this._culling=this._setSubState(e,this._culling,this._cullingInvalid,this._stateSetters.setCulling),this._cullingInvalid=!1}_setPolygonOffset(e){this._polygonOffset=this._setSubState(e,this._polygonOffset,this._polygonOffsetInvalid,this._stateSetters.setPolygonOffset),this._polygonOffsetInvalid=!1}_setDepthTest(e){this._depthTest=this._setSubState(e,this._depthTest,this._depthTestInvalid,this._stateSetters.setDepthTest),this._depthTestInvalid=!1}_setStencilTest(e){this._stencilTest=this._setSubState(e,this._stencilTest,this._stencilTestInvalid,this._stateSetters.setStencilTest),this._stencilTestInvalid=!1}_setDepthWrite(e){this._depthWrite=this._setSubState(e,this._depthWrite,this._depthWriteInvalid,this._stateSetters.setDepthWrite),this._depthWriteInvalid=!1}_setColorWrite(e){this._colorWrite=this._setSubState(e,this._colorWrite,this._colorWriteInvalid,this._stateSetters.setColorWrite),this._colorWriteInvalid=!1}_setStencilWrite(e){this._stencilWrite=this._setSubState(e,this._stencilWrite,this._stencilWriteInvalid,this._stateSetters.setStencilWrite),this._stencilTestInvalid=!1}_setDrawBuffers(e){this._drawBuffers=this._setSubState(e,this._drawBuffers,this._drawBuffersInvalid,this._stateSetters.setDrawBuffers),this._drawBuffersInvalid=!1}_setSubState(e,t,r,n){return(r||e!==t)&&(n(e),this._pipelineInvalid=!0),e}}}}]);