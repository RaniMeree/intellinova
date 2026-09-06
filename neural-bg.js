/* ===========================================================
   INTELLIVATION · NEURAL DEPTH BACKGROUND
   A slow, dim, six-layer neural network in 3D perspective,
   drawn on a plain 2D canvas (no WebGL, no libraries) behind
   any section marked with data-neural.
   Options (attributes on the section):
     data-neural="hero" | "header"      density / framing
     data-neural-intensity="0.75"       0..1, brightness
     data-neural-motion="1"             1 calm, 2 lively
   Public API: window.NeuralBG.setIntensity(v), .setMotion(v)
   =========================================================== */
(function () {
  'use strict';
  var sections = document.querySelectorAll('[data-neural]');
  if (!sections.length) return;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var TAU = Math.PI * 2;
  function rnd(a, b) { return a + Math.random() * (b - a); }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function smooth(e0, e1, x) { var t = clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); }
  function mixc(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
  function rgba(c, a) { return 'rgba(' + (c[0] | 0) + ',' + (c[1] | 0) + ',' + (c[2] | 0) + ',' + a.toFixed(3) + ')'; }
  var CYAN = [0, 229, 255], CYAN_DIM = [0, 184, 204], GREEN = [34, 197, 94], LIME = [163, 230, 53];

  window.NeuralBG = window.NeuralBG || {
    instances: [],
    setIntensity: function (v) { this.instances.forEach(function (i) { i.setIntensity(v); }); },
    setMotion: function (v) { this.instances.forEach(function (i) { i.setMotion(v); }); }
  };

  function mount(el) {
    var variant = el.getAttribute('data-neural') || 'hero';
    var intensity = parseFloat(el.getAttribute('data-neural-intensity'));
    if (isNaN(intensity)) intensity = variant === 'header' ? 0.7 : 0.75;
    var motion = parseFloat(el.getAttribute('data-neural-motion'));
    if (isNaN(motion)) motion = 1;
    var SIZES = variant === 'header' ? [6, 10, 12, 12, 10, 6] : [8, 14, 18, 18, 14, 8];
    var SPAN = 118, MAXP = 90, FOV = 36 * Math.PI / 180;

    var canvas = document.createElement('canvas');
    canvas.className = 'neural-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var shade = document.createElement('div');
    shade.className = 'neural-shade';
    shade.setAttribute('aria-hidden', 'true');
    el.insertBefore(shade, el.firstChild);
    el.insertBefore(canvas, el.firstChild);
    el.classList.add('neural-on');

    // ---- scene
    var nodes = [], edges = [], pulses = [], starts = [], off = 0;
    SIZES.forEach(function (n, li) {
      starts.push(off); off += n;
      var x = -SPAN / 2 + SPAN * li / (SIZES.length - 1);
      for (var k = 0; k < n; k++) {
        var ang = rnd(0, TAU), r = Math.sqrt(Math.random()) * (20 + (li === 2 || li === 3 ? 4 : 0));
        nodes.push({ bx: x + rnd(-4, 4), by: Math.cos(ang) * r * 1.15, bz: Math.sin(ang) * r,
          x: 0, y: 0, z: 0, sx: 0, sy: 0, sc: 0, dep: 1, fade: 0, li: li, a: 0, ph: rnd(0, TAU),
          size: (li === 0 || li === SIZES.length - 1) ? 6.5 : 5.4 });
      }
    });
    for (var l = 0; l < SIZES.length - 1; l++) {
      for (var i = 0; i < SIZES[l]; i++) for (var j = 0; j < SIZES[l + 1]; j++) {
        if (Math.random() < 0.5) continue;
        edges.push({ a: starts[l] + i, b: starts[l + 1] + j, w: Math.pow(Math.random(), 2) });
      }
    }

    var W = 0, H = 0, raf = 0, last = 0, timer = 0, visible = true, camZ = 150, focal = 1;
    var mouse = { x: 0, y: 0, on: false }, rot = { x: 0, y: 0 };

    function fire() {
      nodes.forEach(function (n) { if (n.li === 0 && Math.random() < 0.6) n.a = 1; });
      edges.forEach(function (e) {
        var l = nodes[e.a].li;
        if (e.w > 0.3 && Math.random() < 0.6 && pulses.length < MAXP) pulses.push({ e: e, t: -l * 0.26, s: rnd(0.42, 0.55) });
      });
    }

    // project a scene point through the current rotation and a perspective camera
    var cy_ = 1, sy_ = 0, cx_ = 1, sx_ = 0;
    function project(x, y, z, out) {
      var x1 = x * cy_ + z * sy_, z1 = -x * sy_ + z * cy_;
      var y2 = y * cx_ - z1 * sx_, z2 = y * sx_ + z1 * cx_;
      var dep = camZ - z2;
      var sc = focal / dep;
      out.sx = W / 2 + x1 * sc; out.sy = H / 2 - y2 * sc; out.sc = sc; out.dep = dep;
      out.fade = smooth(260, 120, dep);
    }

    function step(t, dt) {
      timer += dt * motion; if (timer > 2400) { timer = 0; fire(); }
      var px = mouse.on ? (mouse.x / W - 0.5) : 0, py = mouse.on ? (mouse.y / H - 0.5) : 0;
      rot.y += ((Math.sin(t * 0.00006 * motion) * 0.28 + px * 0.35) - rot.y) * 0.035;
      rot.x += ((Math.cos(t * 0.00005 * motion) * 0.12 - py * 0.22) - rot.x) * 0.035;
      cy_ = Math.cos(rot.y); sy_ = Math.sin(rot.y); cx_ = Math.cos(rot.x); sx_ = Math.sin(rot.x);

      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i], k = t * 0.00035 * motion + n.ph;
        n.x = n.bx + Math.sin(k) * 1.4; n.y = n.by + Math.cos(k * 1.3) * 1.4; n.z = n.bz + Math.sin(k * 0.8) * 1.4;
        n.a = Math.max(0, n.a - dt * 0.00055 * motion);
        project(n.x, n.y, n.z, n);
      }

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineCap = 'round';
      ctx.lineWidth = 1;

      // edges
      for (var j = 0; j < edges.length; j++) {
        var e = edges[j], a = nodes[e.a], b = nodes[e.b];
        var act = clamp((a.a + b.a) * 0.3, 0, 1);
        var fade = (a.fade + b.fade) * 0.5;
        var al = (0.06 + e.w * 0.22) * fade * intensity * (0.45 + 0.9 * act);
        if (al < 0.01) continue;
        ctx.strokeStyle = rgba(mixc(CYAN_DIM, GREEN, act), al);
        ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(b.sx, b.sy); ctx.stroke();
      }

      // pulses
      var tmp = { sx: 0, sy: 0, sc: 0, dep: 1, fade: 0 };
      for (var m = pulses.length - 1; m >= 0; m--) {
        var p = pulses[m]; p.t += p.s * motion * dt / 1000;
        if (p.t < 0) continue;
        if (p.t >= 1) { nodes[p.e.b].a = 1; pulses.splice(m, 1); continue; }
        var pa = nodes[p.e.a], pb = nodes[p.e.b];
        project(pa.x + (pb.x - pa.x) * p.t, pa.y + (pb.y - pa.y) * p.t, pa.z + (pb.z - pa.z) * p.t, tmp);
        var life = Math.min(1, p.t * 4) * Math.min(1, (1 - p.t) * 4);
        var pr = 3.2 * (150 / tmp.dep), pal = life * tmp.fade * intensity;
        // one solid dot with a tight, smooth falloff (no halo ring)
        var pg = ctx.createRadialGradient(tmp.sx, tmp.sy, 0, tmp.sx, tmp.sy, pr);
        pg.addColorStop(0, rgba(LIME, pal)); pg.addColorStop(0.5, rgba(LIME, pal * 0.9)); pg.addColorStop(1, rgba(LIME, 0));
        ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(tmp.sx, tmp.sy, pr, 0, TAU); ctx.fill();
      }

      // neurons
      for (var q = 0; q < nodes.length; q++) {
        var nn = nodes[q];
        var r = (nn.size + nn.a * 4) * (150 / nn.dep) * 0.5;
        var col = mixc(CYAN, mixc(GREEN, LIME, nn.a), clamp(nn.a * 1.4, 0, 1));
        var na = nn.fade * intensity * (0.5 + 0.5 * nn.a);
        // solid core that fades out smoothly instead of a core plus a separate halo
        var ng = ctx.createRadialGradient(nn.sx, nn.sy, 0, nn.sx, nn.sy, r * 1.6);
        ng.addColorStop(0, rgba(col, na * 0.9)); ng.addColorStop(0.55, rgba(col, na * 0.8)); ng.addColorStop(1, rgba(col, 0));
        ctx.fillStyle = ng; ctx.beginPath(); ctx.arc(nn.sx, nn.sy, r * 1.6, 0, TAU); ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    }

    function size() {
      var rect = el.getBoundingClientRect();
      W = rect.width || 1; H = rect.height || 1;
      var dpr = Math.min(window.devicePixelRatio || 1, W < 700 ? 1.5 : 2);
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      camZ = (W < 700 ? 210 : 150) * (variant === 'header' ? 0.85 : 1);
      focal = (H / 2) / Math.tan(FOV / 2);
      // always paint one frame so the section is never empty (hidden tabs, static captures)
      if (reduced) still(); else step(last || 16, 16);
    }
    function still() { fire(); var t = 0; for (var i = 0; i < 70; i++) { t += 16; step(t, 16); } }
    function loop(ts) { if (!last) last = ts; var dt = Math.min(40, ts - last); last = ts; step(ts, dt); raf = requestAnimationFrame(loop); }
    function start() { if (reduced) { still(); return; } if (!raf && visible && !document.hidden) { last = 0; raf = requestAnimationFrame(loop); } }
    function stop() { if (raf) { cancelAnimationFrame(raf); raf = 0; } }

    el.addEventListener('pointermove', function (e) { var r = el.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.on = true; });
    el.addEventListener('pointerleave', function () { mouse.on = false; });
    if ('ResizeObserver' in window) new ResizeObserver(function () { size(); }).observe(el);
    else window.addEventListener('resize', size);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; if (visible) start(); else stop(); }, { threshold: 0.02 }).observe(el);
    }
    document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else start(); });

    window.NeuralBG.instances.push({
      el: el,
      setIntensity: function (v) { intensity = v; if (reduced) still(); },
      setMotion: function (v) { motion = v; },
      fire: fire
    });
    size();
    start();
  }

  function init() { Array.prototype.forEach.call(sections, mount); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
