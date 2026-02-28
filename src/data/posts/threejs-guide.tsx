'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Three.js Complete Guide: 3D Graphics for the Web',
    description: 'Master Three.js from scratch — scenes, cameras, renderers, geometries, materials, lighting, textures, animations, OrbitControls, GLTF model loading, shadows, raycasting, post-processing, React Three Fiber, and performance optimization.',
  },
  zh: {
    title: 'Three.js 完全指南：Web 3D 图形开发',
    description: '从零掌握 Three.js — 场景、相机、渲染器、几何体、材质、光照、纹理、动画、OrbitControls、GLTF 模型加载、阴影、射线检测、后处理、React Three Fiber 和性能优化。',
  },
};

export default function ThreejsGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;
  void t;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Three.js and why should I use it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Three.js is a JavaScript library that makes WebGL easy. It provides a high-level API for creating 3D scenes, cameras, lights, materials, and animations in the browser without writing raw GLSL shaders. It powers thousands of production sites including product configurators, data visualizations, games, and immersive experiences.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I install Three.js in a project?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Install via npm: npm install three. Then import with: import * as THREE from "three". For quick prototyping you can also use a CDN script tag or importmap. TypeScript types are included in the package since r150.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between MeshBasicMaterial and MeshStandardMaterial?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MeshBasicMaterial ignores lights entirely and renders a flat color, making it cheap but unrealistic. MeshStandardMaterial uses physically-based rendering (PBR) with roughness and metalness parameters and reacts to lights, producing realistic results at a higher GPU cost.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I load a GLTF or GLB 3D model in Three.js?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Import GLTFLoader from "three/addons/loaders/GLTFLoader.js". Create a loader instance and call loader.load(url, callback). The callback receives a gltf object whose gltf.scene property is a Group you add to your scene. Use DRACOLoader for compressed models.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I make a Three.js canvas responsive?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Listen for the window resize event. In the handler, update camera.aspect to window.innerWidth / window.innerHeight, call camera.updateProjectionMatrix(), and call renderer.setSize(window.innerWidth, window.innerHeight). Also set renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) to handle high-DPI displays without excessive GPU load.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is React Three Fiber and how does it relate to Three.js?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'React Three Fiber (R3F) is a React renderer for Three.js. It lets you build Three.js scenes using JSX components like <mesh>, <boxGeometry>, and <meshStandardMaterial>. It handles the animation loop, disposal, and lifecycle automatically while giving you full access to the Three.js API via hooks like useFrame and useThree.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I enable shadows in Three.js?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Set renderer.shadowMap.enabled = true, set light.castShadow = true on your light source, set mesh.castShadow = true on objects that cast shadows, and set mesh.receiveShadow = true on surfaces that receive shadows. Configure shadow map resolution with light.shadow.mapSize for quality.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I optimize Three.js performance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Key optimizations include: reuse geometries and materials across meshes, use InstancedMesh for repeated objects, reduce draw calls by merging geometry with BufferGeometryUtils.mergeGeometries, limit shadow map resolution, use LOD (Level of Detail) for distant objects, dispose unused resources, and cap pixel ratio at 2.',
        },
      },
    ],
  };

  const cs = {
    backgroundColor: '#1e293b',
    color: '#e2e8f0',
    padding: '1rem',
    borderRadius: '0.5rem',
    overflowX: 'auto' as const,
    fontSize: '0.875rem',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
  };

  const h2s = { fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#0f172a' };
  const h3s = { fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem', color: '#1e293b' };
  const ps = { marginBottom: '1rem', lineHeight: '1.75' };
  const tableStyle = { width: '100%', borderCollapse: 'collapse' as const, fontSize: '0.9rem', margin: '1rem 0 1.5rem 0' };
  const thStyle = { background: '#f1f5f9', border: '1px solid #e2e8f0', padding: '0.5rem 0.75rem', textAlign: 'left' as const, fontWeight: '600' as const, color: '#1e293b' };
  const tdStyle = { border: '1px solid #e2e8f0', padding: '0.5rem 0.75rem', verticalAlign: 'top' as const, color: '#334155' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '1rem 1.25rem', marginBottom: '2rem', borderRadius: '0 0.5rem 0.5rem 0' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1' }}>TL;DR</p>
        <p style={{ margin: 0, lineHeight: '1.7' }}>
          Three.js is the standard JavaScript library for 3D on the web. Create a Scene, add a Camera and Renderer, then
          populate it with meshes (geometry + material), lights, and textures. Use requestAnimationFrame for the render
          loop, OrbitControls for camera interaction, GLTFLoader for 3D models, and React Three Fiber for declarative
          React integration. This guide covers every fundamental with practical code examples.
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.25rem', marginBottom: '2rem', borderRadius: '0.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#334155' }}>Key Takeaways</p>
        <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
          <li style={{ marginBottom: '0.4rem', lineHeight: '1.6' }}>The core trio is Scene + Camera + Renderer — everything builds on top of these three objects.</li>
          <li style={{ marginBottom: '0.4rem', lineHeight: '1.6' }}>Materials range from unlit (MeshBasicMaterial) to full PBR (MeshPhysicalMaterial) depending on your realism needs.</li>
          <li style={{ marginBottom: '0.4rem', lineHeight: '1.6' }}>The animation loop via requestAnimationFrame drives all motion and interaction in Three.js.</li>
          <li style={{ marginBottom: '0.4rem', lineHeight: '1.6' }}>GLTFLoader with DRACOLoader is the industry-standard pipeline for loading 3D models.</li>
          <li style={{ marginBottom: '0.4rem', lineHeight: '1.6' }}>React Three Fiber (R3F) lets you build Three.js scenes with declarative JSX and React lifecycle hooks.</li>
          <li style={{ marginBottom: '0.4rem', lineHeight: '1.6' }}>Performance hinges on draw call reduction, geometry reuse, InstancedMesh, and proper disposal.</li>
        </ul>
      </div>

      {/* ── 1. What Is Three.js ── */}
      <h2 style={h2s}>1. What Is Three.js?</h2>
      <p style={ps}>
        Three.js is an open-source JavaScript library that abstracts WebGL into a friendly, high-level API. Instead of
        writing hundreds of lines of GLSL shader code and managing GPU buffers manually, you work with familiar concepts
        like scenes, meshes, lights, and cameras. It was created by Ricardo Cabello (Mr.doob) in 2010 and is now the
        most widely used 3D library on the web, powering product configurators, data visualizations, interactive
        portfolios, browser games, and immersive experiences.
      </p>

      {/* ── 2. Installation & Setup ── */}
      <h2 style={h2s}>2. Installation and Setup</h2>
      <p style={ps}>Install Three.js from npm and set up a minimal project with Vite for fast development.</p>

      <h3 style={h3s}>Install via npm</h3>
      <pre style={cs}><code>{'# Create a new Vite project\n' +
        'npm create vite@latest my-3d-app -- --template vanilla-ts\n' +
        'cd my-3d-app\n' +
        '\n' +
        '# Install Three.js\n' +
        'npm install three\n' +
        'npm install -D @types/three\n' +
        '\n' +
        '# Start dev server\n' +
        'npm run dev'}</code></pre>

      <h3 style={h3s}>Minimal HTML Setup</h3>
      <pre style={cs}><code>{'<!DOCTYPE html>\n' +
        '<html lang="en">\n' +
        '<head>\n' +
        '  <meta charset="UTF-8" />\n' +
        '  <style>\n' +
        '    body { margin: 0; overflow: hidden; }\n' +
        '    canvas { display: block; }\n' +
        '  </style>\n' +
        '</head>\n' +
        '<body>\n' +
        '  <script type="module" src="/src/main.ts"></script>\n' +
        '</body>\n' +
        '</html>'}</code></pre>

      {/* ── 3. Scene, Camera, Renderer ── */}
      <h2 style={h2s}>3. Scene, Camera, and Renderer Fundamentals</h2>
      <p style={ps}>
        Every Three.js application starts with three core objects: a <strong>Scene</strong> (the container), a{' '}
        <strong>Camera</strong> (the viewpoint), and a <strong>Renderer</strong> (the output). This is the foundation
        that everything else builds upon.
      </p>
      <pre style={cs}><code>{'import * as THREE from \'three\';\n' +
        '\n' +
        '// 1. Scene — the container for all 3D objects\n' +
        'const scene = new THREE.Scene();\n' +
        'scene.background = new THREE.Color(0x111111);\n' +
        '\n' +
        '// 2. Camera — PerspectiveCamera(fov, aspect, near, far)\n' +
        'const camera = new THREE.PerspectiveCamera(\n' +
        '  75,\n' +
        '  window.innerWidth / window.innerHeight,\n' +
        '  0.1,\n' +
        '  1000\n' +
        ');\n' +
        'camera.position.set(0, 2, 5);\n' +
        '\n' +
        '// 3. Renderer — renders the scene from the camera POV\n' +
        'const renderer = new THREE.WebGLRenderer({ antialias: true });\n' +
        'renderer.setSize(window.innerWidth, window.innerHeight);\n' +
        'renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));\n' +
        'document.body.appendChild(renderer.domElement);\n' +
        '\n' +
        '// Render a single frame\n' +
        'renderer.render(scene, camera);'}</code></pre>

      <h3 style={h3s}>Camera Types</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Camera</th>
            <th style={thStyle}>Use Case</th>
            <th style={thStyle}>Key Parameters</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}><strong>PerspectiveCamera</strong></td>
            <td style={tdStyle}>Most 3D scenes — mimics human eye</td>
            <td style={tdStyle}>fov, aspect, near, far</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>OrthographicCamera</strong></td>
            <td style={tdStyle}>2D-looking / isometric views, CAD</td>
            <td style={tdStyle}>left, right, top, bottom, near, far</td>
          </tr>
        </tbody>
      </table>

      {/* ── 4. Geometries ── */}
      <h2 style={h2s}>4. Geometries: Box, Sphere, Plane, and Custom</h2>
      <p style={ps}>
        Geometries define the shape of your 3D objects. Three.js provides many built-in geometries, and you can also
        build custom geometry from vertex data.
      </p>

      <h3 style={h3s}>Built-in Geometries</h3>
      <pre style={cs}><code>{'// BoxGeometry(width, height, depth, widthSeg, heightSeg, depthSeg)\n' +
        'const box = new THREE.BoxGeometry(1, 1, 1);\n' +
        '\n' +
        '// SphereGeometry(radius, widthSegments, heightSegments)\n' +
        'const sphere = new THREE.SphereGeometry(1, 32, 32);\n' +
        '\n' +
        '// PlaneGeometry(width, height, widthSeg, heightSeg)\n' +
        'const plane = new THREE.PlaneGeometry(10, 10);\n' +
        '\n' +
        '// Other common geometries\n' +
        'const cylinder = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);\n' +
        'const torus     = new THREE.TorusGeometry(1, 0.4, 16, 100);\n' +
        'const cone      = new THREE.ConeGeometry(0.5, 1.5, 32);\n' +
        'const ring      = new THREE.RingGeometry(0.5, 1, 32);'}</code></pre>

      <h3 style={h3s}>Custom BufferGeometry</h3>
      <pre style={cs}><code>{'const geometry = new THREE.BufferGeometry();\n' +
        '\n' +
        '// Define a triangle with 3 vertices (x, y, z)\n' +
        'const vertices = new Float32Array([\n' +
        '  -1.0, -1.0,  0.0,   // vertex 0\n' +
        '   1.0, -1.0,  0.0,   // vertex 1\n' +
        '   0.0,  1.0,  0.0,   // vertex 2\n' +
        ']);\n' +
        '\n' +
        'geometry.setAttribute(\n' +
        '  \'position\',\n' +
        '  new THREE.BufferAttribute(vertices, 3)\n' +
        ');\n' +
        '\n' +
        '// Compute normals for lighting\n' +
        'geometry.computeVertexNormals();\n' +
        '\n' +
        'const mesh = new THREE.Mesh(\n' +
        '  geometry,\n' +
        '  new THREE.MeshStandardMaterial({ color: 0x00ff88 })\n' +
        ');\n' +
        'scene.add(mesh);'}</code></pre>

      {/* ── 5. Materials ── */}
      <h2 style={h2s}>5. Materials: Basic, Standard, Physical, and Shader</h2>
      <p style={ps}>
        Materials define how surfaces look. They control color, shininess, transparency, and how light interacts with
        the mesh. Choosing the right material balances visual quality against performance.
      </p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Material</th>
            <th style={thStyle}>Lighting</th>
            <th style={thStyle}>Cost</th>
            <th style={thStyle}>Best For</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}><strong>MeshBasicMaterial</strong></td>
            <td style={tdStyle}>None (unlit)</td>
            <td style={tdStyle}>Cheapest</td>
            <td style={tdStyle}>Wireframes, debug, flat UI</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>MeshLambertMaterial</strong></td>
            <td style={tdStyle}>Diffuse only</td>
            <td style={tdStyle}>Low</td>
            <td style={tdStyle}>Non-shiny objects, low-poly</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>MeshPhongMaterial</strong></td>
            <td style={tdStyle}>Diffuse + specular</td>
            <td style={tdStyle}>Medium</td>
            <td style={tdStyle}>Shiny objects, plastic, metal</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>MeshStandardMaterial</strong></td>
            <td style={tdStyle}>PBR</td>
            <td style={tdStyle}>Higher</td>
            <td style={tdStyle}>Realistic scenes (recommended)</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>MeshPhysicalMaterial</strong></td>
            <td style={tdStyle}>PBR + advanced</td>
            <td style={tdStyle}>Highest</td>
            <td style={tdStyle}>Glass, clearcoat, subsurface</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>ShaderMaterial</strong></td>
            <td style={tdStyle}>Custom GLSL</td>
            <td style={tdStyle}>Varies</td>
            <td style={tdStyle}>Custom effects, procedural</td>
          </tr>
        </tbody>
      </table>

      <pre style={cs}><code>{'// MeshBasicMaterial — ignores lights\n' +
        'const basic = new THREE.MeshBasicMaterial({\n' +
        '  color: 0xff6600,\n' +
        '  wireframe: true,\n' +
        '});\n' +
        '\n' +
        '// MeshStandardMaterial — PBR with roughness & metalness\n' +
        'const standard = new THREE.MeshStandardMaterial({\n' +
        '  color: 0x2194ce,\n' +
        '  roughness: 0.4,\n' +
        '  metalness: 0.6,\n' +
        '});\n' +
        '\n' +
        '// MeshPhysicalMaterial — clearcoat glass effect\n' +
        'const glass = new THREE.MeshPhysicalMaterial({\n' +
        '  color: 0xffffff,\n' +
        '  transmission: 1.0,   // fully transparent like glass\n' +
        '  thickness: 0.5,\n' +
        '  roughness: 0.05,\n' +
        '  ior: 1.5,            // index of refraction\n' +
        '});'}</code></pre>

      <h3 style={h3s}>Custom ShaderMaterial</h3>
      <pre style={cs}><code>{'const shaderMat = new THREE.ShaderMaterial({\n' +
        '  uniforms: {\n' +
        '    uTime:  { value: 0.0 },\n' +
        '    uColor: { value: new THREE.Color(0x00ffaa) },\n' +
        '  },\n' +
        '  vertexShader: \'varying vec2 vUv;\\n\' +\n' +
        '    \'void main(){vUv=uv;\\n\' +\n' +
        '    \'gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}\',\n' +
        '  fragmentShader: \'uniform float uTime;uniform vec3 uColor;\\n\' +\n' +
        '    \'varying vec2 vUv;\\n\' +\n' +
        '    \'void main(){float w=sin(vUv.x*10.0+uTime)*0.5+0.5;\\n\' +\n' +
        '    \'gl_FragColor=vec4(uColor*w,1.0);}\',\n' +
        '});'}</code></pre>

      {/* ── 6. Lighting ── */}
      <h2 style={h2s}>6. Lighting: Ambient, Directional, Point, and Spot</h2>
      <p style={ps}>
        Lights determine how materials appear. Without lights, PBR materials render black. Combine multiple light types
        for realistic illumination.
      </p>

      <pre style={cs}><code>{'// AmbientLight — uniform, non-directional fill\n' +
        'const ambient = new THREE.AmbientLight(0xffffff, 0.3);\n' +
        'scene.add(ambient);\n' +
        '\n' +
        '// DirectionalLight — sunlight, parallel rays\n' +
        'const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);\n' +
        'dirLight.position.set(5, 10, 5);\n' +
        'scene.add(dirLight);\n' +
        '\n' +
        '// PointLight — emits in all directions from a point\n' +
        'const pointLight = new THREE.PointLight(0xff4400, 2, 50);\n' +
        'pointLight.position.set(-3, 4, 2);\n' +
        'scene.add(pointLight);\n' +
        '\n' +
        '// SpotLight — cone of light with angle and penumbra\n' +
        'const spotLight = new THREE.SpotLight(0xffffff, 2);\n' +
        'spotLight.position.set(0, 8, 0);\n' +
        'spotLight.angle = Math.PI / 6;\n' +
        'spotLight.penumbra = 0.3;\n' +
        'spotLight.target.position.set(0, 0, 0);\n' +
        'scene.add(spotLight);\n' +
        'scene.add(spotLight.target);\n' +
        '\n' +
        '// HemisphereLight — sky color + ground color\n' +
        'const hemi = new THREE.HemisphereLight(0x87ceeb, 0x362d1b, 0.5);\n' +
        'scene.add(hemi);'}</code></pre>

      {/* ── 7. Textures ── */}
      <h2 style={h2s}>7. Textures and Texture Loading</h2>
      <p style={ps}>
        Textures map images onto geometry surfaces. Three.js supports color maps, normal maps, roughness maps,
        displacement maps, environment maps, and more.
      </p>

      <pre style={cs}><code>{'const textureLoader = new THREE.TextureLoader();\n' +
        '\n' +
        '// Basic color texture\n' +
        'const colorMap = textureLoader.load(\'/textures/brick_color.jpg\');\n' +
        'const normalMap = textureLoader.load(\'/textures/brick_normal.jpg\');\n' +
        'const roughMap = textureLoader.load(\'/textures/brick_rough.jpg\');\n' +
        '\n' +
        '// Apply multiple maps for realistic PBR\n' +
        'const brickMat = new THREE.MeshStandardMaterial({\n' +
        '  map: colorMap,\n' +
        '  normalMap: normalMap,\n' +
        '  roughnessMap: roughMap,\n' +
        '  roughness: 1.0,\n' +
        '});\n' +
        '\n' +
        '// Repeat and wrap textures\n' +
        'colorMap.wrapS = THREE.RepeatWrapping;\n' +
        'colorMap.wrapT = THREE.RepeatWrapping;\n' +
        'colorMap.repeat.set(4, 4);\n' +
        '\n' +
        '// Environment map for reflections\n' +
        'const cubeLoader = new THREE.CubeTextureLoader();\n' +
        'const envMap = cubeLoader.load([\n' +
        '  \'px.jpg\', \'nx.jpg\',\n' +
        '  \'py.jpg\', \'ny.jpg\',\n' +
        '  \'pz.jpg\', \'nz.jpg\',\n' +
        ']);\n' +
        'scene.environment = envMap;'}</code></pre>

      {/* ── 8. Animation Loop ── */}
      <h2 style={h2s}>8. Animation Loop (requestAnimationFrame)</h2>
      <p style={ps}>
        Three.js does not animate on its own. You create a render loop using <code>requestAnimationFrame</code> that
        updates objects and renders a new frame every ~16ms (60fps). Use a <code>Clock</code> for frame-rate-independent
        animation.
      </p>

      <pre style={cs}><code>{'const clock = new THREE.Clock();\n' +
        '\n' +
        'function animate() {\n' +
        '  requestAnimationFrame(animate);\n' +
        '\n' +
        '  const elapsed = clock.getElapsedTime();\n' +
        '  const delta   = clock.getDelta();\n' +
        '\n' +
        '  // Rotate the cube\n' +
        '  cube.rotation.x += delta * 0.5;\n' +
        '  cube.rotation.y += delta * 0.8;\n' +
        '\n' +
        '  // Oscillate position\n' +
        '  sphere.position.y = Math.sin(elapsed * 2) * 1.5;\n' +
        '\n' +
        '  // Update shader uniform\n' +
        '  shaderMat.uniforms.uTime.value = elapsed;\n' +
        '\n' +
        '  renderer.render(scene, camera);\n' +
        '}\n' +
        '\n' +
        'animate();'}</code></pre>

      {/* ── 9. OrbitControls ── */}
      <h2 style={h2s}>9. OrbitControls: Interactive Camera</h2>
      <p style={ps}>
        OrbitControls lets users rotate, zoom, and pan the camera with mouse or touch input. It is the most commonly
        used camera controller in Three.js projects.
      </p>

      <pre style={cs}><code>{'import { OrbitControls } from \'three/addons/controls/OrbitControls.js\';\n' +
        '\n' +
        'const controls = new OrbitControls(camera, renderer.domElement);\n' +
        '\n' +
        '// Smooth damping for natural feel\n' +
        'controls.enableDamping = true;\n' +
        'controls.dampingFactor = 0.05;\n' +
        '\n' +
        '// Restrict zoom range\n' +
        'controls.minDistance = 2;\n' +
        'controls.maxDistance = 20;\n' +
        '\n' +
        '// Restrict vertical rotation\n' +
        'controls.maxPolarAngle = Math.PI / 2; // don\'t go below ground\n' +
        '\n' +
        '// Auto-rotate\n' +
        'controls.autoRotate = true;\n' +
        'controls.autoRotateSpeed = 2.0;\n' +
        '\n' +
        '// IMPORTANT: update controls in the animation loop\n' +
        'function animate() {\n' +
        '  requestAnimationFrame(animate);\n' +
        '  controls.update(); // required when damping is enabled\n' +
        '  renderer.render(scene, camera);\n' +
        '}\n' +
        'animate();'}</code></pre>

      {/* ── 10. Loading 3D Models ── */}
      <h2 style={h2s}>10. Loading 3D Models (GLTF / GLB)</h2>
      <p style={ps}>
        GLTF (GL Transmission Format) is the recommended format for 3D models on the web. GLB is the binary variant
        that bundles textures into a single file. Use <code>GLTFLoader</code> and optionally <code>DRACOLoader</code>{' '}
        for compressed models.
      </p>

      <pre style={cs}><code>{'import { GLTFLoader } from \'three/addons/loaders/GLTFLoader.js\';\n' +
        'import { DRACOLoader } from \'three/addons/loaders/DRACOLoader.js\';\n' +
        '\n' +
        '// Optional: DRACO compression for smaller files\n' +
        'const dracoLoader = new DRACOLoader();\n' +
        'dracoLoader.setDecoderPath(\'/draco/\');\n' +
        '\n' +
        'const gltfLoader = new GLTFLoader();\n' +
        'gltfLoader.setDRACOLoader(dracoLoader);\n' +
        '\n' +
        '// Load a model\n' +
        'gltfLoader.load(\n' +
        '  \'/models/robot.glb\',\n' +
        '  (gltf) => {\n' +
        '    const model = gltf.scene;\n' +
        '    model.scale.set(0.5, 0.5, 0.5);\n' +
        '    model.position.set(0, 0, 0);\n' +
        '    scene.add(model);\n' +
        '\n' +
        '    // Play animations if present\n' +
        '    if (gltf.animations.length > 0) {\n' +
        '      const mixer = new THREE.AnimationMixer(model);\n' +
        '      const action = mixer.clipAction(gltf.animations[0]);\n' +
        '      action.play();\n' +
        '      // Update mixer in animation loop:\n' +
        '      // mixer.update(delta);\n' +
        '    }\n' +
        '  },\n' +
        '  (progress) => {\n' +
        '    const pct = (progress.loaded / progress.total) * 100;\n' +
        '    console.log(pct.toFixed(1) + \'% loaded\');\n' +
        '  },\n' +
        '  (error) => {\n' +
        '    console.error(\'Failed to load model:\', error);\n' +
        '  }\n' +
        ');'}</code></pre>

      {/* ── 11. Shadows ── */}
      <h2 style={h2s}>11. Shadows</h2>
      <p style={ps}>
        Shadows add depth and realism. They require four settings: enable on the renderer, enable castShadow on the
        light, enable castShadow on meshes, and enable receiveShadow on surfaces.
      </p>

      <pre style={cs}><code>{'// 1. Enable shadows on the renderer\n' +
        'renderer.shadowMap.enabled = true;\n' +
        'renderer.shadowMap.type = THREE.PCFSoftShadowMap;\n' +
        '\n' +
        '// 2. Configure shadow-casting light\n' +
        'dirLight.castShadow = true;\n' +
        'dirLight.shadow.mapSize.width  = 2048;\n' +
        'dirLight.shadow.mapSize.height = 2048;\n' +
        'dirLight.shadow.camera.near = 0.5;\n' +
        'dirLight.shadow.camera.far  = 50;\n' +
        'dirLight.shadow.camera.left   = -10;\n' +
        'dirLight.shadow.camera.right  =  10;\n' +
        'dirLight.shadow.camera.top    =  10;\n' +
        'dirLight.shadow.camera.bottom = -10;\n' +
        '\n' +
        '// 3. Objects that cast shadows\n' +
        'cube.castShadow = true;\n' +
        'sphere.castShadow = true;\n' +
        '\n' +
        '// 4. Ground plane receives shadows\n' +
        'const ground = new THREE.Mesh(\n' +
        '  new THREE.PlaneGeometry(20, 20),\n' +
        '  new THREE.MeshStandardMaterial({ color: 0x808080 })\n' +
        ');\n' +
        'ground.rotation.x = -Math.PI / 2;\n' +
        'ground.receiveShadow = true;\n' +
        'scene.add(ground);'}</code></pre>

      {/* ── 12. Raycasting & Interaction ── */}
      <h2 style={h2s}>12. Raycasting and Interaction</h2>
      <p style={ps}>
        Raycasting lets you detect which objects the user clicks or hovers over. It casts an invisible ray from the
        camera through the mouse position and checks for intersections with 3D objects.
      </p>

      <pre style={cs}><code>{'const raycaster = new THREE.Raycaster();\n' +
        'const mouse = new THREE.Vector2();\n' +
        '\n' +
        'window.addEventListener(\'click\', (event) => {\n' +
        '  // Convert screen coordinates to normalized device coords\n' +
        '  mouse.x =  (event.clientX / window.innerWidth)  * 2 - 1;\n' +
        '  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;\n' +
        '\n' +
        '  raycaster.setFromCamera(mouse, camera);\n' +
        '\n' +
        '  // Test against specific objects\n' +
        '  const intersects = raycaster.intersectObjects(\n' +
        '    [cube, sphere, torus]\n' +
        '  );\n' +
        '\n' +
        '  if (intersects.length > 0) {\n' +
        '    const hit = intersects[0];\n' +
        '    console.log(\'Clicked:\', hit.object.name);\n' +
        '    console.log(\'Distance:\', hit.distance.toFixed(2));\n' +
        '    console.log(\'Point:\', hit.point);\n' +
        '\n' +
        '    // Visual feedback — change color\n' +
        '    hit.object.material.color.set(0xff0000);\n' +
        '  }\n' +
        '});'}</code></pre>

      {/* ── 13. Responsive Canvas ── */}
      <h2 style={h2s}>13. Responsive Canvas</h2>
      <p style={ps}>
        A proper Three.js app must handle window resizing and high-DPI displays. Without this, the canvas will look
        stretched or blurry on different screens.
      </p>

      <pre style={cs}><code>{'window.addEventListener(\'resize\', () => {\n' +
        '  camera.aspect = window.innerWidth / window.innerHeight;\n' +
        '  camera.updateProjectionMatrix();\n' +
        '  renderer.setSize(window.innerWidth, window.innerHeight);\n' +
        '  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));\n' +
        '});'}</code></pre>

      {/* ── 14. Post-Processing ── */}
      <h2 style={h2s}>14. Post-Processing Effects</h2>
      <p style={ps}>
        Post-processing applies screen-space effects after the scene is rendered. Three.js provides an EffectComposer
        pipeline where you chain passes like bloom, depth-of-field, and color grading.
      </p>

      <pre style={cs}><code>{'import { EffectComposer } from \'three/addons/postprocessing/EffectComposer.js\';\n' +
        'import { RenderPass } from \'three/addons/postprocessing/RenderPass.js\';\n' +
        'import { UnrealBloomPass } from \'three/addons/postprocessing/UnrealBloomPass.js\';\n' +
        'import { OutputPass } from \'three/addons/postprocessing/OutputPass.js\';\n' +
        '\n' +
        '// Create composer\n' +
        'const composer = new EffectComposer(renderer);\n' +
        '\n' +
        '// Pass 1: render the scene normally\n' +
        'composer.addPass(new RenderPass(scene, camera));\n' +
        '\n' +
        '// Pass 2: bloom glow effect\n' +
        'const bloomPass = new UnrealBloomPass(\n' +
        '  new THREE.Vector2(window.innerWidth, window.innerHeight),\n' +
        '  0.8,   // strength\n' +
        '  0.3,   // radius\n' +
        '  0.85   // threshold\n' +
        ');\n' +
        'composer.addPass(bloomPass);\n' +
        '\n' +
        '// Pass 3: output (tone mapping + color space)\n' +
        'composer.addPass(new OutputPass());\n' +
        '\n' +
        '// Replace renderer.render with composer.render\n' +
        'function animate() {\n' +
        '  requestAnimationFrame(animate);\n' +
        '  controls.update();\n' +
        '  composer.render(); // instead of renderer.render(scene, camera)\n' +
        '}\n' +
        'animate();'}</code></pre>

      {/* ── 15. React Three Fiber ── */}
      <h2 style={h2s}>15. React Three Fiber (R3F)</h2>
      <p style={ps}>
        React Three Fiber is a React renderer for Three.js. It lets you write Three.js scenes as declarative JSX
        components. R3F manages the canvas, animation loop, disposal, and events automatically.
      </p>

      <h3 style={h3s}>Installation</h3>
      <pre style={cs}><code>{'npm install three @react-three/fiber @react-three/drei\n' +
        'npm install -D @types/three'}</code></pre>

      <h3 style={h3s}>Basic R3F Scene</h3>
      <pre style={cs}><code>{'import { Canvas, useFrame } from \'@react-three/fiber\';\n' +
        'import { OrbitControls } from \'@react-three/drei\';\n' +
        'import { useRef } from \'react\';\n' +
        'import * as THREE from \'three\';\n' +
        '\n' +
        'function SpinningBox() {\n' +
        '  const meshRef = useRef<THREE.Mesh>(null);\n' +
        '\n' +
        '  useFrame((state, delta) => {\n' +
        '    if (meshRef.current) {\n' +
        '      meshRef.current.rotation.x += delta * 0.5;\n' +
        '      meshRef.current.rotation.y += delta * 0.8;\n' +
        '    }\n' +
        '  });\n' +
        '\n' +
        '  return (\n' +
        '    <mesh ref={meshRef}>\n' +
        '      <boxGeometry args={[1, 1, 1]} />\n' +
        '      <meshStandardMaterial color="#2194ce" />\n' +
        '    </mesh>\n' +
        '  );\n' +
        '}\n' +
        '\n' +
        'export default function App() {\n' +
        '  return (\n' +
        '    <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>\n' +
        '      <ambientLight intensity={0.3} />\n' +
        '      <directionalLight position={[5, 10, 5]} />\n' +
        '      <SpinningBox />\n' +
        '      <OrbitControls enableDamping />\n' +
        '    </Canvas>\n' +
        '  );\n' +
        '}'}</code></pre>

      <h3 style={h3s}>Loading Models in R3F</h3>
      <pre style={cs}><code>{'import { useGLTF } from \'@react-three/drei\';\n' +
        '\n' +
        'function Robot() {\n' +
        '  const { scene } = useGLTF(\'/models/robot.glb\');\n' +
        '  return <primitive object={scene} scale={0.5} />;\n' +
        '}\n' +
        '\n' +
        '// Preload for instant display\n' +
        'useGLTF.preload(\'/models/robot.glb\');'}</code></pre>

      {/* ── 16. Performance Optimization ── */}
      <h2 style={h2s}>16. Performance Optimization</h2>
      <p style={ps}>
        3D rendering is GPU-intensive. Optimizing draw calls, geometry, and resource management is critical for smooth
        60fps experiences, especially on mobile devices.
      </p>

      <h3 style={h3s}>InstancedMesh for Repeated Objects</h3>
      <pre style={cs}><code>{'// Instead of 1000 separate Mesh objects (1000 draw calls),\n' +
        '// use InstancedMesh (1 draw call)\n' +
        'const count = 1000;\n' +
        'const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);\n' +
        'const material = new THREE.MeshStandardMaterial();\n' +
        'const instances = new THREE.InstancedMesh(\n' +
        '  geometry, material, count\n' +
        ');\n' +
        '\n' +
        'const dummy = new THREE.Object3D();\n' +
        'for (let i = 0; i < count; i++) {\n' +
        '  dummy.position.set(\n' +
        '    (Math.random() - 0.5) * 20,\n' +
        '    (Math.random() - 0.5) * 20,\n' +
        '    (Math.random() - 0.5) * 20\n' +
        '  );\n' +
        '  dummy.rotation.set(\n' +
        '    Math.random() * Math.PI,\n' +
        '    Math.random() * Math.PI,\n' +
        '    0\n' +
        '  );\n' +
        '  dummy.updateMatrix();\n' +
        '  instances.setMatrixAt(i, dummy.matrix);\n' +
        '}\n' +
        'instances.instanceMatrix.needsUpdate = true;\n' +
        'scene.add(instances);'}</code></pre>

      <h3 style={h3s}>Key Optimization Strategies</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Strategy</th>
            <th style={thStyle}>Impact</th>
            <th style={thStyle}>How</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}><strong>Reuse geometries and materials</strong></td>
            <td style={tdStyle}>High</td>
            <td style={tdStyle}>Share the same Geometry/Material across meshes instead of creating new ones</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>InstancedMesh</strong></td>
            <td style={tdStyle}>Very High</td>
            <td style={tdStyle}>Render thousands of identical objects in a single draw call</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>Merge geometry</strong></td>
            <td style={tdStyle}>High</td>
            <td style={tdStyle}>Use BufferGeometryUtils.mergeGeometries for static objects</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>LOD (Level of Detail)</strong></td>
            <td style={tdStyle}>Medium</td>
            <td style={tdStyle}>Show lower-poly models when objects are far from camera</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>Limit shadow maps</strong></td>
            <td style={tdStyle}>Medium</td>
            <td style={tdStyle}>Use 1024 or 2048 max; disable shadows on unimportant objects</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>Cap pixel ratio</strong></td>
            <td style={tdStyle}>High</td>
            <td style={tdStyle}>Math.min(window.devicePixelRatio, 2) prevents 3x or 4x rendering</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>Dispose resources</strong></td>
            <td style={tdStyle}>Critical</td>
            <td style={tdStyle}>Call geometry.dispose(), material.dispose(), texture.dispose() when removing objects</td>
          </tr>
        </tbody>
      </table>

      <h3 style={h3s}>Proper Disposal Pattern</h3>
      <pre style={cs}><code>{'function dispose(obj) {\n' +
        '  if (obj.geometry) obj.geometry.dispose();\n' +
        '  const mats = Array.isArray(obj.material)\n' +
        '    ? obj.material : [obj.material];\n' +
        '  mats.forEach((m) => {\n' +
        '    if (m.map) m.map.dispose();\n' +
        '    if (m.normalMap) m.normalMap.dispose();\n' +
        '    m.dispose();\n' +
        '  });\n' +
        '}\n' +
        'scene.remove(oldMesh);\n' +
        'dispose(oldMesh);'}</code></pre>

      {/* ── 17. Debugging Tips ── */}
      <h2 style={h2s}>17. Debugging Tips</h2>
      <p style={ps}>
        Debugging 3D scenes can be challenging. Here are essential tools and techniques to diagnose issues quickly.
      </p>

      <h3 style={h3s}>Helpers</h3>
      <pre style={cs}><code>{'// AxesHelper — shows X (red), Y (green), Z (blue) axes\n' +
        'scene.add(new THREE.AxesHelper(5));\n' +
        '\n' +
        '// GridHelper — ground grid for spatial reference\n' +
        'scene.add(new THREE.GridHelper(20, 20));\n' +
        '\n' +
        '// Light helpers — visualize light position/direction\n' +
        'scene.add(new THREE.DirectionalLightHelper(dirLight, 2));\n' +
        'scene.add(new THREE.PointLightHelper(pointLight, 0.5));\n' +
        'scene.add(new THREE.SpotLightHelper(spotLight));\n' +
        '\n' +
        '// Camera helper — visualize shadow camera frustum\n' +
        'scene.add(\n' +
        '  new THREE.CameraHelper(dirLight.shadow.camera)\n' +
        ');\n' +
        '\n' +
        '// Box3Helper — visualize bounding boxes\n' +
        'const box3 = new THREE.Box3().setFromObject(model);\n' +
        'scene.add(new THREE.Box3Helper(box3, 0xff0000));'}</code></pre>

      <h3 style={h3s}>Performance Monitoring</h3>
      <pre style={cs}><code>{'// Stats.js — live FPS, MS, MB monitor\n' +
        'import Stats from \'three/addons/libs/stats.module.js\';\n' +
        '\n' +
        'const stats = new Stats();\n' +
        'document.body.appendChild(stats.dom);\n' +
        '\n' +
        'function animate() {\n' +
        '  stats.begin();\n' +
        '  requestAnimationFrame(animate);\n' +
        '  controls.update();\n' +
        '  renderer.render(scene, camera);\n' +
        '  stats.end();\n' +
        '}\n' +
        '\n' +
        '// Renderer info — check draw calls and triangles\n' +
        'console.log(\'Draw calls:\', renderer.info.render.calls);\n' +
        'console.log(\'Triangles:\', renderer.info.render.triangles);\n' +
        'console.log(\'Geometries:\', renderer.info.memory.geometries);\n' +
        'console.log(\'Textures:\', renderer.info.memory.textures);'}</code></pre>

      <h3 style={h3s}>Common Issues and Solutions</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Problem</th>
            <th style={thStyle}>Cause</th>
            <th style={thStyle}>Fix</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>Black screen</td>
            <td style={tdStyle}>No lights in scene or camera facing wrong direction</td>
            <td style={tdStyle}>Add AmbientLight, check camera.position and camera.lookAt</td>
          </tr>
          <tr>
            <td style={tdStyle}>Object not visible</td>
            <td style={tdStyle}>Object is outside camera frustum or scale is too small/large</td>
            <td style={tdStyle}>Check position, scale, near/far planes, use AxesHelper</td>
          </tr>
          <tr>
            <td style={tdStyle}>Shadow acne (stripy shadows)</td>
            <td style={tdStyle}>Shadow bias too low</td>
            <td style={tdStyle}>Set light.shadow.bias = -0.001</td>
          </tr>
          <tr>
            <td style={tdStyle}>Blurry textures</td>
            <td style={tdStyle}>Texture filtering or low resolution</td>
            <td style={tdStyle}>Set texture.minFilter = THREE.LinearFilter, use higher res images</td>
          </tr>
          <tr>
            <td style={tdStyle}>Memory leak</td>
            <td style={tdStyle}>Geometries/materials/textures not disposed</td>
            <td style={tdStyle}>Call .dispose() on every removed resource</td>
          </tr>
          <tr>
            <td style={tdStyle}>Low FPS</td>
            <td style={tdStyle}>Too many draw calls or large shadow maps</td>
            <td style={tdStyle}>Use InstancedMesh, merge geometry, reduce shadowMap size</td>
          </tr>
        </tbody>
      </table>

      {/* ── 18. Complete Example ── */}
      <h2 style={h2s}>18. Complete Example: Putting It All Together</h2>
      <p style={ps}>
        Here is a complete, production-ready Three.js setup combining everything from this guide: scene, camera,
        renderer, lighting, materials, animation, controls, shadows, responsiveness, and debugging helpers.
      </p>

      <pre style={cs}><code>{'import * as THREE from \'three\';\n' +
        'import { OrbitControls } from \'three/addons/controls/OrbitControls.js\';\n' +
        '\n' +
        'const scene = new THREE.Scene();\n' +
        'scene.background = new THREE.Color(0x1a1a2e);\n' +
        '\n' +
        'const camera = new THREE.PerspectiveCamera(\n' +
        '  60, innerWidth / innerHeight, 0.1, 100\n' +
        ');\n' +
        'camera.position.set(3, 3, 5);\n' +
        '\n' +
        'const renderer = new THREE.WebGLRenderer({ antialias: true });\n' +
        'renderer.setSize(innerWidth, innerHeight);\n' +
        'renderer.shadowMap.enabled = true;\n' +
        'document.body.appendChild(renderer.domElement);\n' +
        '\n' +
        'scene.add(new THREE.AmbientLight(0xffffff, 0.2));\n' +
        'const sun = new THREE.DirectionalLight(0xffd580, 1.5);\n' +
        'sun.position.set(5, 8, 3);\n' +
        'sun.castShadow = true;\n' +
        'scene.add(sun);\n' +
        '\n' +
        'const ground = new THREE.Mesh(\n' +
        '  new THREE.PlaneGeometry(30, 30),\n' +
        '  new THREE.MeshStandardMaterial({ color: 0x333355 })\n' +
        ');\n' +
        'ground.rotation.x = -Math.PI / 2;\n' +
        'ground.receiveShadow = true;\n' +
        'scene.add(ground);\n' +
        '\n' +
        'const cube = new THREE.Mesh(\n' +
        '  new THREE.BoxGeometry(1, 1, 1),\n' +
        '  new THREE.MeshStandardMaterial({ color: 0x2194ce })\n' +
        ');\n' +
        'cube.position.y = 0.5;\n' +
        'cube.castShadow = true;\n' +
        'scene.add(cube);\n' +
        '\n' +
        'const controls = new OrbitControls(camera, renderer.domElement);\n' +
        'controls.enableDamping = true;\n' +
        '\n' +
        'addEventListener(\'resize\', () => {\n' +
        '  camera.aspect = innerWidth / innerHeight;\n' +
        '  camera.updateProjectionMatrix();\n' +
        '  renderer.setSize(innerWidth, innerHeight);\n' +
        '});\n' +
        '\n' +
        'const clock = new THREE.Clock();\n' +
        '(function animate() {\n' +
        '  requestAnimationFrame(animate);\n' +
        '  cube.rotation.y = clock.getElapsedTime() * 0.5;\n' +
        '  controls.update();\n' +
        '  renderer.render(scene, camera);\n' +
        '})();'}</code></pre>

      {/* ── FAQ ── */}
      <h2 style={h2s}>Frequently Asked Questions</h2>
      {faqSchema.mainEntity.map((faq, i) => (
        <div key={i} style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ ...h3s, marginTop: '1rem' }}>{faq.name}</h3>
          <p style={ps}>{faq.acceptedAnswer.text}</p>
        </div>
      ))}

      {/* ── Conclusion ── */}
      <h2 style={h2s}>Conclusion</h2>
      <p style={ps}>
        Three.js gives you the power to create stunning 3D experiences directly in the browser. Start with the
        fundamentals — Scene, Camera, Renderer — then layer on materials, lights, and textures. Use OrbitControls for
        camera interaction, GLTFLoader for 3D models, and the requestAnimationFrame loop for animation. When building
        with React, adopt React Three Fiber for a declarative workflow. Focus on performance from the start by reusing
        resources, leveraging InstancedMesh, and properly disposing unused objects. The web is your canvas — now build
        something amazing.
      </p>
    </article>
  );
}
