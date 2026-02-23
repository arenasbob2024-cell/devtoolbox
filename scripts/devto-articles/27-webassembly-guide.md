---
title: "WebAssembly in 2026: Rust, C++, and the Browser Runtime"
tags: webassembly, rust, javascript, performance
canonical_url: https://viadreams.cc/en/blog/web-assembly-guide
published: true
---

WebAssembly (WASM) lets you run compiled code at near-native speed in the browser. Here's what you need to know.

## What WASM Actually Is

WASM is a binary instruction format for a stack-based virtual machine. It's:
- **Fast**: Near-native speed, better than JavaScript for CPU-intensive tasks
- **Safe**: Sandboxed, no direct system access
- **Language-agnostic**: Compile from Rust, C++, Go, C#, and more
- **Universal**: Browser, Node.js, Deno, edge functions, native runtimes

## Rust + WASM: The Best Combo

Rust is the best language for WASM today — no garbage collector, tiny output, great tooling.

### Setup

```bash
# Install wasm-pack
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

# Create a WASM library
cargo new --lib wasm-image-processor
```

```toml
# Cargo.toml
[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2"
```

### The Rust Code

```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

#[wasm_bindgen]
pub fn process_image_grayscale(pixels: &mut Vec<u8>) {
    for chunk in pixels.chunks_mut(4) {
        let gray = (chunk[0] as u32 * 299 + chunk[1] as u32 * 587 + chunk[2] as u32 * 114) / 1000;
        chunk[0] = gray as u8;
        chunk[1] = gray as u8;
        chunk[2] = gray as u8;
    }
}
```

### Build and Use

```bash
wasm-pack build --target web
```

```javascript
import init, { fibonacci, process_image_grayscale } from './pkg/wasm_image_processor.js';

await init(); // Load the WASM module

console.log(fibonacci(40)); // 102334155 — runs in microseconds

// Process a canvas image
const ctx = canvas.getContext('2d');
const imageData = ctx.getImageData(0, 0, width, height);
process_image_grayscale(imageData.data);
ctx.putImageData(imageData, 0, 0);
```

## When to Use WASM

**Perfect for:**
- CPU-intensive algorithms (image processing, video encoding, crypto, physics)
- Porting existing C/C++ libraries (OpenCV, SQLite, FFmpeg)
- Games (Unity, Godot export to WASM)
- Code that must run at the same speed server and client

**Not worth it for:**
- Simple DOM manipulation (JavaScript is fine)
- Network-bound operations (I/O is the bottleneck, not CPU)
- Small utilities (overhead not worth it)

## Real-World Examples

- **Figma** uses C++ compiled to WASM for the rendering engine
- **Google Earth** uses C++ WASM for 3D globe rendering
- **Photoshop Web** runs WASM for image editing operations
- **SQLite WASM** runs a full database in the browser

## WASM Outside the Browser

WASM is escaping the browser via WASI (WebAssembly System Interface):

```bash
# Run WASM in Node.js
node --experimental-wasm-modules my-module.wasm

# Run WASM natively with wasmtime
wasmtime my-module.wasm

# Deploy to Cloudflare Workers (WASM supported natively)
wrangler deploy
```

Use [Base64 Encoder](https://viadreams.cc/en/tools/base64-encode-online) to encode your WASM binaries for embedding in JavaScript.

---

*Full WebAssembly guide at [viadreams.cc/en/blog/web-assembly-guide](https://viadreams.cc/en/blog/web-assembly-guide)*
