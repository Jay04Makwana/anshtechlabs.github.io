;(function () {
  const t = document.createElement('link').relList
  if (t && t.supports && t.supports('modulepreload')) return
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) i(r)
  new MutationObserver((r) => {
    for (const n of r)
      if (n.type === 'childList')
        for (const o of n.addedNodes)
          o.tagName === 'LINK' && o.rel === 'modulepreload' && i(o)
  }).observe(document, { childList: !0, subtree: !0 })
  function s(r) {
    const n = {}
    return (
      r.integrity && (n.integrity = r.integrity),
      r.referrerPolicy && (n.referrerPolicy = r.referrerPolicy),
      r.crossOrigin === 'use-credentials'
        ? (n.credentials = 'include')
        : r.crossOrigin === 'anonymous'
        ? (n.credentials = 'omit')
        : (n.credentials = 'same-origin'),
      n
    )
  }
  function i(r) {
    if (r.ep) return
    r.ep = !0
    const n = s(r)
    fetch(r.href, n)
  }
})()
const ll = 'modulepreload',
  al = function (e) {
    return '/' + e
  },
  yr = {},
  ut = function (t, s, i) {
    if (!s || s.length === 0) return t()
    const r = document.getElementsByTagName('link')
    return Promise.all(
      s.map((n) => {
        if (((n = al(n)), n in yr)) return
        yr[n] = !0
        const o = n.endsWith('.css'),
          a = o ? '[rel="stylesheet"]' : ''
        if (!!i)
          for (let c = r.length - 1; c >= 0; c--) {
            const d = r[c]
            if (d.href === n && (!o || d.rel === 'stylesheet')) return
          }
        else if (document.querySelector(`link[href="${n}"]${a}`)) return
        const u = document.createElement('link')
        if (
          ((u.rel = o ? 'stylesheet' : ll),
          o || ((u.as = 'script'), (u.crossOrigin = '')),
          (u.href = n),
          document.head.appendChild(u),
          o)
        )
          return new Promise((c, d) => {
            u.addEventListener('load', c),
              u.addEventListener('error', () =>
                d(new Error(`Unable to preload CSS for ${n}`))
              )
          })
      })
    )
      .then(() => t())
      .catch((n) => {
        const o = new Event('vite:preloadError', { cancelable: !0 })
        if (((o.payload = n), window.dispatchEvent(o), !o.defaultPrevented))
          throw n
      })
  }
function Wi(e, t) {
  const s = Object.create(null),
    i = e.split(',')
  for (let r = 0; r < i.length; r++) s[i[r]] = !0
  return t ? (r) => !!s[r.toLowerCase()] : (r) => !!s[r]
}
const ue = {},
  Dt = [],
  We = () => {},
  cl = () => !1,
  ul = /^on[^a-z]/,
  Ws = (e) => ul.test(e),
  Ui = (e) => e.startsWith('onUpdate:'),
  Pe = Object.assign,
  Ki = (e, t) => {
    const s = e.indexOf(t)
    s > -1 && e.splice(s, 1)
  },
  dl = Object.prototype.hasOwnProperty,
  ee = (e, t) => dl.call(e, t),
  U = Array.isArray,
  Bt = (e) => Ks(e) === '[object Map]',
  Cn = (e) => Ks(e) === '[object Set]',
  Q = (e) => typeof e == 'function',
  ye = (e) => typeof e == 'string',
  Us = (e) => typeof e == 'symbol',
  de = (e) => e !== null && typeof e == 'object',
  In = (e) => (de(e) || Q(e)) && Q(e.then) && Q(e.catch),
  Mn = Object.prototype.toString,
  Ks = (e) => Mn.call(e),
  fl = (e) => Ks(e).slice(8, -1),
  On = (e) => Ks(e) === '[object Object]',
  Yi = (e) =>
    ye(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  As = Wi(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
  ),
  Ys = (e) => {
    const t = Object.create(null)
    return (s) => t[s] || (t[s] = e(s))
  },
  pl = /-(\w)/g,
  Ze = Ys((e) => e.replace(pl, (t, s) => (s ? s.toUpperCase() : ''))),
  hl = /\B([A-Z])/g,
  Xt = Ys((e) => e.replace(hl, '-$1').toLowerCase()),
  Xs = Ys((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  ai = Ys((e) => (e ? `on${Xs(e)}` : '')),
  It = (e, t) => !Object.is(e, t),
  Ls = (e, t) => {
    for (let s = 0; s < e.length; s++) e[s](t)
  },
  Bs = (e, t, s) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: s })
  },
  Pi = (e) => {
    const t = parseFloat(e)
    return isNaN(t) ? e : t
  }
let _r
const Ci = () =>
  _r ||
  (_r =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
      ? self
      : typeof window < 'u'
      ? window
      : typeof global < 'u'
      ? global
      : {})
function at(e) {
  if (U(e)) {
    const t = {}
    for (let s = 0; s < e.length; s++) {
      const i = e[s],
        r = ye(i) ? bl(i) : at(i)
      if (r) for (const n in r) t[n] = r[n]
    }
    return t
  } else if (ye(e) || de(e)) return e
}
const ml = /;(?![^(]*\))/g,
  gl = /:([^]+)/,
  vl = /\/\*[^]*?\*\//g
function bl(e) {
  const t = {}
  return (
    e
      .replace(vl, '')
      .split(ml)
      .forEach((s) => {
        if (s) {
          const i = s.split(gl)
          i.length > 1 && (t[i[0].trim()] = i[1].trim())
        }
      }),
    t
  )
}
function Ae(e) {
  let t = ''
  if (ye(e)) t = e
  else if (U(e))
    for (let s = 0; s < e.length; s++) {
      const i = Ae(e[s])
      i && (t += i + ' ')
    }
  else if (de(e)) for (const s in e) e[s] && (t += s + ' ')
  return t.trim()
}
const xl =
    'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  wl = Wi(xl)
function An(e) {
  return !!e || e === ''
}
const Rs = (e) =>
    ye(e)
      ? e
      : e == null
      ? ''
      : U(e) || (de(e) && (e.toString === Mn || !Q(e.toString)))
      ? JSON.stringify(e, Ln, 2)
      : String(e),
  Ln = (e, t) =>
    t && t.__v_isRef
      ? Ln(e, t.value)
      : Bt(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (s, [i, r]) => ((s[`${i} =>`] = r), s),
            {}
          ),
        }
      : Cn(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : de(t) && !U(t) && !On(t)
      ? String(t)
      : t
let De
class yl {
  constructor(t = !1) {
    ;(this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = De),
      !t && De && (this.index = (De.scopes || (De.scopes = [])).push(this) - 1)
  }
  get active() {
    return this._active
  }
  run(t) {
    if (this._active) {
      const s = De
      try {
        return (De = this), t()
      } finally {
        De = s
      }
    }
  }
  on() {
    De = this
  }
  off() {
    De = this.parent
  }
  stop(t) {
    if (this._active) {
      let s, i
      for (s = 0, i = this.effects.length; s < i; s++) this.effects[s].stop()
      for (s = 0, i = this.cleanups.length; s < i; s++) this.cleanups[s]()
      if (this.scopes)
        for (s = 0, i = this.scopes.length; s < i; s++) this.scopes[s].stop(!0)
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop()
        r &&
          r !== this &&
          ((this.parent.scopes[this.index] = r), (r.index = this.index))
      }
      ;(this.parent = void 0), (this._active = !1)
    }
  }
}
function _l(e, t = De) {
  t && t.active && t.effects.push(e)
}
function Rn() {
  return De
}
function Sl(e) {
  De && De.cleanups.push(e)
}
const Xi = (e) => {
    const t = new Set(e)
    return (t.w = 0), (t.n = 0), t
  },
  kn = (e) => (e.w & xt) > 0,
  zn = (e) => (e.n & xt) > 0,
  Tl = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= xt
  },
  El = (e) => {
    const { deps: t } = e
    if (t.length) {
      let s = 0
      for (let i = 0; i < t.length; i++) {
        const r = t[i]
        kn(r) && !zn(r) ? r.delete(e) : (t[s++] = r), (r.w &= ~xt), (r.n &= ~xt)
      }
      t.length = s
    }
  },
  js = new WeakMap()
let ns = 0,
  xt = 1
const Ii = 30
let qe
const Et = Symbol(''),
  Mi = Symbol('')
class Qi {
  constructor(t, s = null, i) {
    ;(this.fn = t),
      (this.scheduler = s),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      _l(this, i)
  }
  run() {
    if (!this.active) return this.fn()
    let t = qe,
      s = gt
    for (; t; ) {
      if (t === this) return
      t = t.parent
    }
    try {
      return (
        (this.parent = qe),
        (qe = this),
        (gt = !0),
        (xt = 1 << ++ns),
        ns <= Ii ? Tl(this) : Sr(this),
        this.fn()
      )
    } finally {
      ns <= Ii && El(this),
        (xt = 1 << --ns),
        (qe = this.parent),
        (gt = s),
        (this.parent = void 0),
        this.deferStop && this.stop()
    }
  }
  stop() {
    qe === this
      ? (this.deferStop = !0)
      : this.active &&
        (Sr(this), this.onStop && this.onStop(), (this.active = !1))
  }
}
function Sr(e) {
  const { deps: t } = e
  if (t.length) {
    for (let s = 0; s < t.length; s++) t[s].delete(e)
    t.length = 0
  }
}
let gt = !0
const $n = []
function Qt() {
  $n.push(gt), (gt = !1)
}
function Jt() {
  const e = $n.pop()
  gt = e === void 0 ? !0 : e
}
function ke(e, t, s) {
  if (gt && qe) {
    let i = js.get(e)
    i || js.set(e, (i = new Map()))
    let r = i.get(s)
    r || i.set(s, (r = Xi())), Dn(r)
  }
}
function Dn(e, t) {
  let s = !1
  ns <= Ii ? zn(e) || ((e.n |= xt), (s = !kn(e))) : (s = !e.has(qe)),
    s && (e.add(qe), qe.deps.push(e))
}
function nt(e, t, s, i, r, n) {
  const o = js.get(e)
  if (!o) return
  let a = []
  if (t === 'clear') a = [...o.values()]
  else if (s === 'length' && U(e)) {
    const l = Number(i)
    o.forEach((u, c) => {
      ;(c === 'length' || (!Us(c) && c >= l)) && a.push(u)
    })
  } else
    switch ((s !== void 0 && a.push(o.get(s)), t)) {
      case 'add':
        U(e)
          ? Yi(s) && a.push(o.get('length'))
          : (a.push(o.get(Et)), Bt(e) && a.push(o.get(Mi)))
        break
      case 'delete':
        U(e) || (a.push(o.get(Et)), Bt(e) && a.push(o.get(Mi)))
        break
      case 'set':
        Bt(e) && a.push(o.get(Et))
        break
    }
  if (a.length === 1) a[0] && Oi(a[0])
  else {
    const l = []
    for (const u of a) u && l.push(...u)
    Oi(Xi(l))
  }
}
function Oi(e, t) {
  const s = U(e) ? e : [...e]
  for (const i of s) i.computed && Tr(i)
  for (const i of s) i.computed || Tr(i)
}
function Tr(e, t) {
  ;(e !== qe || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}
function Pl(e, t) {
  var s
  return (s = js.get(e)) == null ? void 0 : s.get(t)
}
const Cl = Wi('__proto__,__v_isRef,__isVue'),
  Bn = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== 'arguments' && e !== 'caller')
      .map((e) => Symbol[e])
      .filter(Us)
  ),
  Er = Il()
function Il() {
  const e = {}
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach((t) => {
      e[t] = function (...s) {
        const i = te(this)
        for (let n = 0, o = this.length; n < o; n++) ke(i, 'get', n + '')
        const r = i[t](...s)
        return r === -1 || r === !1 ? i[t](...s.map(te)) : r
      }
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((t) => {
      e[t] = function (...s) {
        Qt()
        const i = te(this)[t].apply(this, s)
        return Jt(), i
      }
    }),
    e
  )
}
function Ml(e) {
  const t = te(this)
  return ke(t, 'has', e), t.hasOwnProperty(e)
}
class jn {
  constructor(t = !1, s = !1) {
    ;(this._isReadonly = t), (this._shallow = s)
  }
  get(t, s, i) {
    const r = this._isReadonly,
      n = this._shallow
    if (s === '__v_isReactive') return !r
    if (s === '__v_isReadonly') return r
    if (s === '__v_isShallow') return n
    if (s === '__v_raw' && i === (r ? (n ? Hl : Vn) : n ? Hn : Fn).get(t))
      return t
    const o = U(t)
    if (!r) {
      if (o && ee(Er, s)) return Reflect.get(Er, s, i)
      if (s === 'hasOwnProperty') return Ml
    }
    const a = Reflect.get(t, s, i)
    return (Us(s) ? Bn.has(s) : Cl(s)) || (r || ke(t, 'get', s), n)
      ? a
      : we(a)
      ? o && Yi(s)
        ? a
        : a.value
      : de(a)
      ? r
        ? Zs(a)
        : Js(a)
      : a
  }
}
class Nn extends jn {
  constructor(t = !1) {
    super(!1, t)
  }
  set(t, s, i, r) {
    let n = t[s]
    if (Vt(n) && we(n) && !we(i)) return !1
    if (
      !this._shallow &&
      (!Ns(i) && !Vt(i) && ((n = te(n)), (i = te(i))), !U(t) && we(n) && !we(i))
    )
      return (n.value = i), !0
    const o = U(t) && Yi(s) ? Number(s) < t.length : ee(t, s),
      a = Reflect.set(t, s, i, r)
    return (
      t === te(r) && (o ? It(i, n) && nt(t, 'set', s, i) : nt(t, 'add', s, i)),
      a
    )
  }
  deleteProperty(t, s) {
    const i = ee(t, s)
    t[s]
    const r = Reflect.deleteProperty(t, s)
    return r && i && nt(t, 'delete', s, void 0), r
  }
  has(t, s) {
    const i = Reflect.has(t, s)
    return (!Us(s) || !Bn.has(s)) && ke(t, 'has', s), i
  }
  ownKeys(t) {
    return ke(t, 'iterate', U(t) ? 'length' : Et), Reflect.ownKeys(t)
  }
}
class Ol extends jn {
  constructor(t = !1) {
    super(!0, t)
  }
  set(t, s) {
    return !0
  }
  deleteProperty(t, s) {
    return !0
  }
}
const Al = new Nn(),
  Ll = new Ol(),
  Rl = new Nn(!0),
  Ji = (e) => e,
  Qs = (e) => Reflect.getPrototypeOf(e)
function ys(e, t, s = !1, i = !1) {
  e = e.__v_raw
  const r = te(e),
    n = te(t)
  s || (It(t, n) && ke(r, 'get', t), ke(r, 'get', n))
  const { has: o } = Qs(r),
    a = i ? Ji : s ? tr : fs
  if (o.call(r, t)) return a(e.get(t))
  if (o.call(r, n)) return a(e.get(n))
  e !== r && e.get(t)
}
function _s(e, t = !1) {
  const s = this.__v_raw,
    i = te(s),
    r = te(e)
  return (
    t || (It(e, r) && ke(i, 'has', e), ke(i, 'has', r)),
    e === r ? s.has(e) : s.has(e) || s.has(r)
  )
}
function Ss(e, t = !1) {
  return (
    (e = e.__v_raw), !t && ke(te(e), 'iterate', Et), Reflect.get(e, 'size', e)
  )
}
function Pr(e) {
  e = te(e)
  const t = te(this)
  return Qs(t).has.call(t, e) || (t.add(e), nt(t, 'add', e, e)), this
}
function Cr(e, t) {
  t = te(t)
  const s = te(this),
    { has: i, get: r } = Qs(s)
  let n = i.call(s, e)
  n || ((e = te(e)), (n = i.call(s, e)))
  const o = r.call(s, e)
  return (
    s.set(e, t), n ? It(t, o) && nt(s, 'set', e, t) : nt(s, 'add', e, t), this
  )
}
function Ir(e) {
  const t = te(this),
    { has: s, get: i } = Qs(t)
  let r = s.call(t, e)
  r || ((e = te(e)), (r = s.call(t, e))), i && i.call(t, e)
  const n = t.delete(e)
  return r && nt(t, 'delete', e, void 0), n
}
function Mr() {
  const e = te(this),
    t = e.size !== 0,
    s = e.clear()
  return t && nt(e, 'clear', void 0, void 0), s
}
function Ts(e, t) {
  return function (i, r) {
    const n = this,
      o = n.__v_raw,
      a = te(o),
      l = t ? Ji : e ? tr : fs
    return (
      !e && ke(a, 'iterate', Et), o.forEach((u, c) => i.call(r, l(u), l(c), n))
    )
  }
}
function Es(e, t, s) {
  return function (...i) {
    const r = this.__v_raw,
      n = te(r),
      o = Bt(n),
      a = e === 'entries' || (e === Symbol.iterator && o),
      l = e === 'keys' && o,
      u = r[e](...i),
      c = s ? Ji : t ? tr : fs
    return (
      !t && ke(n, 'iterate', l ? Mi : Et),
      {
        next() {
          const { value: d, done: f } = u.next()
          return f
            ? { value: d, done: f }
            : { value: a ? [c(d[0]), c(d[1])] : c(d), done: f }
        },
        [Symbol.iterator]() {
          return this
        },
      }
    )
  }
}
function dt(e) {
  return function (...t) {
    return e === 'delete' ? !1 : e === 'clear' ? void 0 : this
  }
}
function kl() {
  const e = {
      get(n) {
        return ys(this, n)
      },
      get size() {
        return Ss(this)
      },
      has: _s,
      add: Pr,
      set: Cr,
      delete: Ir,
      clear: Mr,
      forEach: Ts(!1, !1),
    },
    t = {
      get(n) {
        return ys(this, n, !1, !0)
      },
      get size() {
        return Ss(this)
      },
      has: _s,
      add: Pr,
      set: Cr,
      delete: Ir,
      clear: Mr,
      forEach: Ts(!1, !0),
    },
    s = {
      get(n) {
        return ys(this, n, !0)
      },
      get size() {
        return Ss(this, !0)
      },
      has(n) {
        return _s.call(this, n, !0)
      },
      add: dt('add'),
      set: dt('set'),
      delete: dt('delete'),
      clear: dt('clear'),
      forEach: Ts(!0, !1),
    },
    i = {
      get(n) {
        return ys(this, n, !0, !0)
      },
      get size() {
        return Ss(this, !0)
      },
      has(n) {
        return _s.call(this, n, !0)
      },
      add: dt('add'),
      set: dt('set'),
      delete: dt('delete'),
      clear: dt('clear'),
      forEach: Ts(!0, !0),
    }
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach((n) => {
      ;(e[n] = Es(n, !1, !1)),
        (s[n] = Es(n, !0, !1)),
        (t[n] = Es(n, !1, !0)),
        (i[n] = Es(n, !0, !0))
    }),
    [e, s, t, i]
  )
}
const [zl, $l, Dl, Bl] = kl()
function Zi(e, t) {
  const s = t ? (e ? Bl : Dl) : e ? $l : zl
  return (i, r, n) =>
    r === '__v_isReactive'
      ? !e
      : r === '__v_isReadonly'
      ? e
      : r === '__v_raw'
      ? i
      : Reflect.get(ee(s, r) && r in i ? s : i, r, n)
}
const jl = { get: Zi(!1, !1) },
  Nl = { get: Zi(!1, !0) },
  Fl = { get: Zi(!0, !1) },
  Fn = new WeakMap(),
  Hn = new WeakMap(),
  Vn = new WeakMap(),
  Hl = new WeakMap()
function Vl(e) {
  switch (e) {
    case 'Object':
    case 'Array':
      return 1
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2
    default:
      return 0
  }
}
function ql(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Vl(fl(e))
}
function Js(e) {
  return Vt(e) ? e : er(e, !1, Al, jl, Fn)
}
function qn(e) {
  return er(e, !1, Rl, Nl, Hn)
}
function Zs(e) {
  return er(e, !0, Ll, Fl, Vn)
}
function er(e, t, s, i, r) {
  if (!de(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e
  const n = r.get(e)
  if (n) return n
  const o = ql(e)
  if (o === 0) return e
  const a = new Proxy(e, o === 2 ? i : s)
  return r.set(e, a), a
}
function jt(e) {
  return Vt(e) ? jt(e.__v_raw) : !!(e && e.__v_isReactive)
}
function Vt(e) {
  return !!(e && e.__v_isReadonly)
}
function Ns(e) {
  return !!(e && e.__v_isShallow)
}
function Gn(e) {
  return jt(e) || Vt(e)
}
function te(e) {
  const t = e && e.__v_raw
  return t ? te(t) : e
}
function Wn(e) {
  return Bs(e, '__v_skip', !0), e
}
const fs = (e) => (de(e) ? Js(e) : e),
  tr = (e) => (de(e) ? Zs(e) : e)
function sr(e) {
  gt && qe && ((e = te(e)), Dn(e.dep || (e.dep = Xi())))
}
function ir(e, t) {
  e = te(e)
  const s = e.dep
  s && Oi(s)
}
function we(e) {
  return !!(e && e.__v_isRef === !0)
}
function ge(e) {
  return Kn(e, !1)
}
function Un(e) {
  return Kn(e, !0)
}
function Kn(e, t) {
  return we(e) ? e : new Gl(e, t)
}
class Gl {
  constructor(t, s) {
    ;(this.__v_isShallow = s),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = s ? t : te(t)),
      (this._value = s ? t : fs(t))
  }
  get value() {
    return sr(this), this._value
  }
  set value(t) {
    const s = this.__v_isShallow || Ns(t) || Vt(t)
    ;(t = s ? t : te(t)),
      It(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = s ? t : fs(t)), ir(this))
  }
}
function Re(e) {
  return we(e) ? e.value : e
}
const Wl = {
  get: (e, t, s) => Re(Reflect.get(e, t, s)),
  set: (e, t, s, i) => {
    const r = e[t]
    return we(r) && !we(s) ? ((r.value = s), !0) : Reflect.set(e, t, s, i)
  },
}
function Yn(e) {
  return jt(e) ? e : new Proxy(e, Wl)
}
class Ul {
  constructor(t) {
    ;(this.dep = void 0), (this.__v_isRef = !0)
    const { get: s, set: i } = t(
      () => sr(this),
      () => ir(this)
    )
    ;(this._get = s), (this._set = i)
  }
  get value() {
    return this._get()
  }
  set value(t) {
    this._set(t)
  }
}
function Kl(e) {
  return new Ul(e)
}
class Yl {
  constructor(t, s, i) {
    ;(this._object = t),
      (this._key = s),
      (this._defaultValue = i),
      (this.__v_isRef = !0)
  }
  get value() {
    const t = this._object[this._key]
    return t === void 0 ? this._defaultValue : t
  }
  set value(t) {
    this._object[this._key] = t
  }
  get dep() {
    return Pl(te(this._object), this._key)
  }
}
class Xl {
  constructor(t) {
    ;(this._getter = t), (this.__v_isRef = !0), (this.__v_isReadonly = !0)
  }
  get value() {
    return this._getter()
  }
}
function Ql(e, t, s) {
  return we(e)
    ? e
    : Q(e)
    ? new Xl(e)
    : de(e) && arguments.length > 1
    ? Jl(e, t, s)
    : ge(e)
}
function Jl(e, t, s) {
  const i = e[t]
  return we(i) ? i : new Yl(e, t, s)
}
class Zl {
  constructor(t, s, i, r) {
    ;(this._setter = s),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new Qi(t, () => {
        this._dirty || ((this._dirty = !0), ir(this))
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !r),
      (this.__v_isReadonly = i)
  }
  get value() {
    const t = te(this)
    return (
      sr(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    )
  }
  set value(t) {
    this._setter(t)
  }
}
function ea(e, t, s = !1) {
  let i, r
  const n = Q(e)
  return (
    n ? ((i = e), (r = We)) : ((i = e.get), (r = e.set)),
    new Zl(i, r, n || !r, s)
  )
}
function vt(e, t, s, i) {
  let r
  try {
    r = i ? e(...i) : e()
  } catch (n) {
    ei(n, t, s)
  }
  return r
}
function Ue(e, t, s, i) {
  if (Q(e)) {
    const n = vt(e, t, s, i)
    return (
      n &&
        In(n) &&
        n.catch((o) => {
          ei(o, t, s)
        }),
      n
    )
  }
  const r = []
  for (let n = 0; n < e.length; n++) r.push(Ue(e[n], t, s, i))
  return r
}
function ei(e, t, s, i = !0) {
  const r = t ? t.vnode : null
  if (t) {
    let n = t.parent
    const o = t.proxy,
      a = s
    for (; n; ) {
      const u = n.ec
      if (u) {
        for (let c = 0; c < u.length; c++) if (u[c](e, o, a) === !1) return
      }
      n = n.parent
    }
    const l = t.appContext.config.errorHandler
    if (l) {
      vt(l, null, 10, [e, o, a])
      return
    }
  }
  ta(e, s, r, i)
}
function ta(e, t, s, i = !0) {
  console.error(e)
}
let ps = !1,
  Ai = !1
const Ie = []
let Je = 0
const Nt = []
let it = null,
  _t = 0
const Xn = Promise.resolve()
let rr = null
function bs(e) {
  const t = rr || Xn
  return e ? t.then(this ? e.bind(this) : e) : t
}
function sa(e) {
  let t = Je + 1,
    s = Ie.length
  for (; t < s; ) {
    const i = (t + s) >>> 1,
      r = Ie[i],
      n = hs(r)
    n < e || (n === e && r.pre) ? (t = i + 1) : (s = i)
  }
  return t
}
function nr(e) {
  ;(!Ie.length || !Ie.includes(e, ps && e.allowRecurse ? Je + 1 : Je)) &&
    (e.id == null ? Ie.push(e) : Ie.splice(sa(e.id), 0, e), Qn())
}
function Qn() {
  !ps && !Ai && ((Ai = !0), (rr = Xn.then(Zn)))
}
function ia(e) {
  const t = Ie.indexOf(e)
  t > Je && Ie.splice(t, 1)
}
function ra(e) {
  U(e)
    ? Nt.push(...e)
    : (!it || !it.includes(e, e.allowRecurse ? _t + 1 : _t)) && Nt.push(e),
    Qn()
}
function Or(e, t = ps ? Je + 1 : 0) {
  for (; t < Ie.length; t++) {
    const s = Ie[t]
    s && s.pre && (Ie.splice(t, 1), t--, s())
  }
}
function Jn(e) {
  if (Nt.length) {
    const t = [...new Set(Nt)]
    if (((Nt.length = 0), it)) {
      it.push(...t)
      return
    }
    for (it = t, it.sort((s, i) => hs(s) - hs(i)), _t = 0; _t < it.length; _t++)
      it[_t]()
    ;(it = null), (_t = 0)
  }
}
const hs = (e) => (e.id == null ? 1 / 0 : e.id),
  na = (e, t) => {
    const s = hs(e) - hs(t)
    if (s === 0) {
      if (e.pre && !t.pre) return -1
      if (t.pre && !e.pre) return 1
    }
    return s
  }
function Zn(e) {
  ;(Ai = !1), (ps = !0), Ie.sort(na)
  const t = We
  try {
    for (Je = 0; Je < Ie.length; Je++) {
      const s = Ie[Je]
      s && s.active !== !1 && vt(s, null, 14)
    }
  } finally {
    ;(Je = 0),
      (Ie.length = 0),
      Jn(),
      (ps = !1),
      (rr = null),
      (Ie.length || Nt.length) && Zn()
  }
}
function oa(e, t, ...s) {
  if (e.isUnmounted) return
  const i = e.vnode.props || ue
  let r = s
  const n = t.startsWith('update:'),
    o = n && t.slice(7)
  if (o && o in i) {
    const c = `${o === 'modelValue' ? 'model' : o}Modifiers`,
      { number: d, trim: f } = i[c] || ue
    f && (r = s.map((p) => (ye(p) ? p.trim() : p))), d && (r = s.map(Pi))
  }
  let a,
    l = i[(a = ai(t))] || i[(a = ai(Ze(t)))]
  !l && n && (l = i[(a = ai(Xt(t)))]), l && Ue(l, e, 6, r)
  const u = i[a + 'Once']
  if (u) {
    if (!e.emitted) e.emitted = {}
    else if (e.emitted[a]) return
    ;(e.emitted[a] = !0), Ue(u, e, 6, r)
  }
}
function eo(e, t, s = !1) {
  const i = t.emitsCache,
    r = i.get(e)
  if (r !== void 0) return r
  const n = e.emits
  let o = {},
    a = !1
  if (!Q(e)) {
    const l = (u) => {
      const c = eo(u, t, !0)
      c && ((a = !0), Pe(o, c))
    }
    !s && t.mixins.length && t.mixins.forEach(l),
      e.extends && l(e.extends),
      e.mixins && e.mixins.forEach(l)
  }
  return !n && !a
    ? (de(e) && i.set(e, null), null)
    : (U(n) ? n.forEach((l) => (o[l] = null)) : Pe(o, n),
      de(e) && i.set(e, o),
      o)
}
function ti(e, t) {
  return !e || !Ws(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, '')),
      ee(e, t[0].toLowerCase() + t.slice(1)) || ee(e, Xt(t)) || ee(e, t))
}
let Ne = null,
  si = null
function Fs(e) {
  const t = Ne
  return (Ne = e), (si = (e && e.type.__scopeId) || null), t
}
function zm(e) {
  si = e
}
function $m() {
  si = null
}
function he(e, t = Ne, s) {
  if (!t || e._n) return e
  const i = (...r) => {
    i._d && Fr(-1)
    const n = Fs(t)
    let o
    try {
      o = e(...r)
    } finally {
      Fs(n), i._d && Fr(1)
    }
    return o
  }
  return (i._n = !0), (i._c = !0), (i._d = !0), i
}
function ci(e) {
  const {
    type: t,
    vnode: s,
    proxy: i,
    withProxy: r,
    props: n,
    propsOptions: [o],
    slots: a,
    attrs: l,
    emit: u,
    render: c,
    renderCache: d,
    data: f,
    setupState: p,
    ctx: g,
    inheritAttrs: x,
  } = e
  let I, b
  const E = Fs(e)
  try {
    if (s.shapeFlag & 4) {
      const y = r || i,
        L = y
      ;(I = Qe(c.call(L, y, d, n, p, f, g))), (b = l)
    } else {
      const y = t
      ;(I = Qe(
        y.length > 1 ? y(n, { attrs: l, slots: a, emit: u }) : y(n, null)
      )),
        (b = t.props ? l : la(l))
    }
  } catch (y) {
    ;(as.length = 0), ei(y, e, 1), (I = Y(Mt))
  }
  let w = I
  if (b && x !== !1) {
    const y = Object.keys(b),
      { shapeFlag: L } = w
    y.length && L & 7 && (o && y.some(Ui) && (b = aa(b, o)), (w = qt(w, b)))
  }
  return (
    s.dirs && ((w = qt(w)), (w.dirs = w.dirs ? w.dirs.concat(s.dirs) : s.dirs)),
    s.transition && (w.transition = s.transition),
    (I = w),
    Fs(E),
    I
  )
}
const la = (e) => {
    let t
    for (const s in e)
      (s === 'class' || s === 'style' || Ws(s)) && ((t || (t = {}))[s] = e[s])
    return t
  },
  aa = (e, t) => {
    const s = {}
    for (const i in e) (!Ui(i) || !(i.slice(9) in t)) && (s[i] = e[i])
    return s
  }
function ca(e, t, s) {
  const { props: i, children: r, component: n } = e,
    { props: o, children: a, patchFlag: l } = t,
    u = n.emitsOptions
  if (t.dirs || t.transition) return !0
  if (s && l >= 0) {
    if (l & 1024) return !0
    if (l & 16) return i ? Ar(i, o, u) : !!o
    if (l & 8) {
      const c = t.dynamicProps
      for (let d = 0; d < c.length; d++) {
        const f = c[d]
        if (o[f] !== i[f] && !ti(u, f)) return !0
      }
    }
  } else
    return (r || a) && (!a || !a.$stable)
      ? !0
      : i === o
      ? !1
      : i
      ? o
        ? Ar(i, o, u)
        : !0
      : !!o
  return !1
}
function Ar(e, t, s) {
  const i = Object.keys(t)
  if (i.length !== Object.keys(e).length) return !0
  for (let r = 0; r < i.length; r++) {
    const n = i[r]
    if (t[n] !== e[n] && !ti(s, n)) return !0
  }
  return !1
}
function ua({ vnode: e, parent: t }, s) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = s), (t = t.parent)
}
const to = 'components'
function Ee(e, t) {
  return fa(to, e, !0, t) || e
}
const da = Symbol.for('v-ndc')
function fa(e, t, s = !0, i = !1) {
  const r = Ne || Se
  if (r) {
    const n = r.type
    if (e === to) {
      const a = ec(n, !1)
      if (a && (a === t || a === Ze(t) || a === Xs(Ze(t)))) return n
    }
    const o = Lr(r[e] || n[e], t) || Lr(r.appContext[e], t)
    return !o && i ? n : o
  }
}
function Lr(e, t) {
  return e && (e[t] || e[Ze(t)] || e[Xs(Ze(t))])
}
const pa = (e) => e.__isSuspense
function ha(e, t) {
  t && t.pendingBranch
    ? U(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : ra(e)
}
function ma(e, t) {
  return or(e, null, t)
}
const Ps = {}
function bt(e, t, s) {
  return or(e, t, s)
}
function or(
  e,
  t,
  { immediate: s, deep: i, flush: r, onTrack: n, onTrigger: o } = ue
) {
  var a
  const l = Rn() === ((a = Se) == null ? void 0 : a.scope) ? Se : null
  let u,
    c = !1,
    d = !1
  if (
    (we(e)
      ? ((u = () => e.value), (c = Ns(e)))
      : jt(e)
      ? ((u = () => e), (i = !0))
      : U(e)
      ? ((d = !0),
        (c = e.some((y) => jt(y) || Ns(y))),
        (u = () =>
          e.map((y) => {
            if (we(y)) return y.value
            if (jt(y)) return Tt(y)
            if (Q(y)) return vt(y, l, 2)
          })))
      : Q(e)
      ? t
        ? (u = () => vt(e, l, 2))
        : (u = () => {
            if (!(l && l.isUnmounted)) return f && f(), Ue(e, l, 3, [p])
          })
      : (u = We),
    t && i)
  ) {
    const y = u
    u = () => Tt(y())
  }
  let f,
    p = (y) => {
      f = E.onStop = () => {
        vt(y, l, 4), (f = E.onStop = void 0)
      }
    },
    g
  if (gs)
    if (
      ((p = We),
      t ? s && Ue(t, l, 3, [u(), d ? [] : void 0, p]) : u(),
      r === 'sync')
    ) {
      const y = ic()
      g = y.__watcherHandles || (y.__watcherHandles = [])
    } else return We
  let x = d ? new Array(e.length).fill(Ps) : Ps
  const I = () => {
    if (E.active)
      if (t) {
        const y = E.run()
        ;(i || c || (d ? y.some((L, N) => It(L, x[N])) : It(y, x))) &&
          (f && f(),
          Ue(t, l, 3, [y, x === Ps ? void 0 : d && x[0] === Ps ? [] : x, p]),
          (x = y))
      } else E.run()
  }
  I.allowRecurse = !!t
  let b
  r === 'sync'
    ? (b = I)
    : r === 'post'
    ? (b = () => Oe(I, l && l.suspense))
    : ((I.pre = !0), l && (I.id = l.uid), (b = () => nr(I)))
  const E = new Qi(u, b)
  t
    ? s
      ? I()
      : (x = E.run())
    : r === 'post'
    ? Oe(E.run.bind(E), l && l.suspense)
    : E.run()
  const w = () => {
    E.stop(), l && l.scope && Ki(l.scope.effects, E)
  }
  return g && g.push(w), w
}
function ga(e, t, s) {
  const i = this.proxy,
    r = ye(e) ? (e.includes('.') ? so(i, e) : () => i[e]) : e.bind(i, i)
  let n
  Q(t) ? (n = t) : ((n = t.handler), (s = t))
  const o = Se
  Gt(this)
  const a = or(r, n.bind(i), s)
  return o ? Gt(o) : Pt(), a
}
function so(e, t) {
  const s = t.split('.')
  return () => {
    let i = e
    for (let r = 0; r < s.length && i; r++) i = i[s[r]]
    return i
  }
}
function Tt(e, t) {
  if (!de(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e
  if ((t.add(e), we(e))) Tt(e.value, t)
  else if (U(e)) for (let s = 0; s < e.length; s++) Tt(e[s], t)
  else if (Cn(e) || Bt(e))
    e.forEach((s) => {
      Tt(s, t)
    })
  else if (On(e)) for (const s in e) Tt(e[s], t)
  return e
}
function es(e, t) {
  const s = Ne
  if (s === null) return e
  const i = oi(s) || s.proxy,
    r = e.dirs || (e.dirs = [])
  for (let n = 0; n < t.length; n++) {
    let [o, a, l, u = ue] = t[n]
    o &&
      (Q(o) && (o = { mounted: o, updated: o }),
      o.deep && Tt(a),
      r.push({
        dir: o,
        instance: i,
        value: a,
        oldValue: void 0,
        arg: l,
        modifiers: u,
      }))
  }
  return e
}
function wt(e, t, s, i) {
  const r = e.dirs,
    n = t && t.dirs
  for (let o = 0; o < r.length; o++) {
    const a = r[o]
    n && (a.oldValue = n[o].value)
    let l = a.dir[i]
    l && (Qt(), Ue(l, s, 8, [e.el, a, e, t]), Jt())
  }
}
/*! #__NO_SIDE_EFFECTS__ */ function io(e, t) {
  return Q(e) ? (() => Pe({ name: e.name }, t, { setup: e }))() : e
}
const ks = (e) => !!e.type.__asyncLoader,
  ro = (e) => e.type.__isKeepAlive
function va(e, t) {
  no(e, 'a', t)
}
function ba(e, t) {
  no(e, 'da', t)
}
function no(e, t, s = Se) {
  const i =
    e.__wdc ||
    (e.__wdc = () => {
      let r = s
      for (; r; ) {
        if (r.isDeactivated) return
        r = r.parent
      }
      return e()
    })
  if ((ii(t, i, s), s)) {
    let r = s.parent
    for (; r && r.parent; ) ro(r.parent.vnode) && xa(i, t, s, r), (r = r.parent)
  }
}
function xa(e, t, s, i) {
  const r = ii(t, e, i, !0)
  lo(() => {
    Ki(i[t], r)
  }, s)
}
function ii(e, t, s = Se, i = !1) {
  if (s) {
    const r = s[e] || (s[e] = []),
      n =
        t.__weh ||
        (t.__weh = (...o) => {
          if (s.isUnmounted) return
          Qt(), Gt(s)
          const a = Ue(t, s, e, o)
          return Pt(), Jt(), a
        })
    return i ? r.unshift(n) : r.push(n), n
  }
}
const ct =
    (e) =>
    (t, s = Se) =>
      (!gs || e === 'sp') && ii(e, (...i) => t(...i), s),
  wa = ct('bm'),
  xs = ct('m'),
  oo = ct('bu'),
  lr = ct('u'),
  ar = ct('bum'),
  lo = ct('um'),
  ya = ct('sp'),
  _a = ct('rtg'),
  Sa = ct('rtc')
function Ta(e, t = Se) {
  ii('ec', e, t)
}
function ao(e, t, s, i) {
  let r
  const n = s && s[i]
  if (U(e) || ye(e)) {
    r = new Array(e.length)
    for (let o = 0, a = e.length; o < a; o++)
      r[o] = t(e[o], o, void 0, n && n[o])
  } else if (typeof e == 'number') {
    r = new Array(e)
    for (let o = 0; o < e; o++) r[o] = t(o + 1, o, void 0, n && n[o])
  } else if (de(e))
    if (e[Symbol.iterator])
      r = Array.from(e, (o, a) => t(o, a, void 0, n && n[a]))
    else {
      const o = Object.keys(e)
      r = new Array(o.length)
      for (let a = 0, l = o.length; a < l; a++) {
        const u = o[a]
        r[a] = t(e[u], u, a, n && n[a])
      }
    }
  else r = []
  return s && (s[i] = r), r
}
const Li = (e) => (e ? (yo(e) ? oi(e) || e.proxy : Li(e.parent)) : null),
  ls = Pe(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Li(e.parent),
    $root: (e) => Li(e.root),
    $emit: (e) => e.emit,
    $options: (e) => cr(e),
    $forceUpdate: (e) => e.f || (e.f = () => nr(e.update)),
    $nextTick: (e) => e.n || (e.n = bs.bind(e.proxy)),
    $watch: (e) => ga.bind(e),
  }),
  ui = (e, t) => e !== ue && !e.__isScriptSetup && ee(e, t),
  Ea = {
    get({ _: e }, t) {
      const {
        ctx: s,
        setupState: i,
        data: r,
        props: n,
        accessCache: o,
        type: a,
        appContext: l,
      } = e
      let u
      if (t[0] !== '$') {
        const p = o[t]
        if (p !== void 0)
          switch (p) {
            case 1:
              return i[t]
            case 2:
              return r[t]
            case 4:
              return s[t]
            case 3:
              return n[t]
          }
        else {
          if (ui(i, t)) return (o[t] = 1), i[t]
          if (r !== ue && ee(r, t)) return (o[t] = 2), r[t]
          if ((u = e.propsOptions[0]) && ee(u, t)) return (o[t] = 3), n[t]
          if (s !== ue && ee(s, t)) return (o[t] = 4), s[t]
          Ri && (o[t] = 0)
        }
      }
      const c = ls[t]
      let d, f
      if (c) return t === '$attrs' && ke(e, 'get', t), c(e)
      if ((d = a.__cssModules) && (d = d[t])) return d
      if (s !== ue && ee(s, t)) return (o[t] = 4), s[t]
      if (((f = l.config.globalProperties), ee(f, t))) return f[t]
    },
    set({ _: e }, t, s) {
      const { data: i, setupState: r, ctx: n } = e
      return ui(r, t)
        ? ((r[t] = s), !0)
        : i !== ue && ee(i, t)
        ? ((i[t] = s), !0)
        : ee(e.props, t) || (t[0] === '$' && t.slice(1) in e)
        ? !1
        : ((n[t] = s), !0)
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: s,
          ctx: i,
          appContext: r,
          propsOptions: n,
        },
      },
      o
    ) {
      let a
      return (
        !!s[o] ||
        (e !== ue && ee(e, o)) ||
        ui(t, o) ||
        ((a = n[0]) && ee(a, o)) ||
        ee(i, o) ||
        ee(ls, o) ||
        ee(r.config.globalProperties, o)
      )
    },
    defineProperty(e, t, s) {
      return (
        s.get != null
          ? (e._.accessCache[t] = 0)
          : ee(s, 'value') && this.set(e, t, s.value, null),
        Reflect.defineProperty(e, t, s)
      )
    },
  }
function Rr(e) {
  return U(e) ? e.reduce((t, s) => ((t[s] = null), t), {}) : e
}
let Ri = !0
function Pa(e) {
  const t = cr(e),
    s = e.proxy,
    i = e.ctx
  ;(Ri = !1), t.beforeCreate && kr(t.beforeCreate, e, 'bc')
  const {
    data: r,
    computed: n,
    methods: o,
    watch: a,
    provide: l,
    inject: u,
    created: c,
    beforeMount: d,
    mounted: f,
    beforeUpdate: p,
    updated: g,
    activated: x,
    deactivated: I,
    beforeDestroy: b,
    beforeUnmount: E,
    destroyed: w,
    unmounted: y,
    render: L,
    renderTracked: N,
    renderTriggered: J,
    errorCaptured: k,
    serverPrefetch: T,
    expose: C,
    inheritAttrs: D,
    components: K,
    directives: V,
    filters: le,
  } = t
  if ((u && Ca(u, i, null), o))
    for (const se in o) {
      const F = o[se]
      Q(F) && (i[se] = F.bind(s))
    }
  if (r) {
    const se = r.call(s, s)
    de(se) && (e.data = Js(se))
  }
  if (((Ri = !0), n))
    for (const se in n) {
      const F = n[se],
        me = Q(F) ? F.bind(s, s) : Q(F.get) ? F.get.bind(s, s) : We,
        fe = !Q(F) && Q(F.set) ? F.set.bind(s) : We,
        _e = Te({ get: me, set: fe })
      Object.defineProperty(i, se, {
        enumerable: !0,
        configurable: !0,
        get: () => _e.value,
        set: (xe) => (_e.value = xe),
      })
    }
  if (a) for (const se in a) co(a[se], i, s, se)
  if (l) {
    const se = Q(l) ? l.call(s) : l
    Reflect.ownKeys(se).forEach((F) => {
      Ft(F, se[F])
    })
  }
  c && kr(c, e, 'c')
  function re(se, F) {
    U(F) ? F.forEach((me) => se(me.bind(s))) : F && se(F.bind(s))
  }
  if (
    (re(wa, d),
    re(xs, f),
    re(oo, p),
    re(lr, g),
    re(va, x),
    re(ba, I),
    re(Ta, k),
    re(Sa, N),
    re(_a, J),
    re(ar, E),
    re(lo, y),
    re(ya, T),
    U(C))
  )
    if (C.length) {
      const se = e.exposed || (e.exposed = {})
      C.forEach((F) => {
        Object.defineProperty(se, F, {
          get: () => s[F],
          set: (me) => (s[F] = me),
        })
      })
    } else e.exposed || (e.exposed = {})
  L && e.render === We && (e.render = L),
    D != null && (e.inheritAttrs = D),
    K && (e.components = K),
    V && (e.directives = V)
}
function Ca(e, t, s = We) {
  U(e) && (e = ki(e))
  for (const i in e) {
    const r = e[i]
    let n
    de(r)
      ? 'default' in r
        ? (n = ot(r.from || i, r.default, !0))
        : (n = ot(r.from || i))
      : (n = ot(r)),
      we(n)
        ? Object.defineProperty(t, i, {
            enumerable: !0,
            configurable: !0,
            get: () => n.value,
            set: (o) => (n.value = o),
          })
        : (t[i] = n)
  }
}
function kr(e, t, s) {
  Ue(U(e) ? e.map((i) => i.bind(t.proxy)) : e.bind(t.proxy), t, s)
}
function co(e, t, s, i) {
  const r = i.includes('.') ? so(s, i) : () => s[i]
  if (ye(e)) {
    const n = t[e]
    Q(n) && bt(r, n)
  } else if (Q(e)) bt(r, e.bind(s))
  else if (de(e))
    if (U(e)) e.forEach((n) => co(n, t, s, i))
    else {
      const n = Q(e.handler) ? e.handler.bind(s) : t[e.handler]
      Q(n) && bt(r, n, e)
    }
}
function cr(e) {
  const t = e.type,
    { mixins: s, extends: i } = t,
    {
      mixins: r,
      optionsCache: n,
      config: { optionMergeStrategies: o },
    } = e.appContext,
    a = n.get(t)
  let l
  return (
    a
      ? (l = a)
      : !r.length && !s && !i
      ? (l = t)
      : ((l = {}), r.length && r.forEach((u) => Hs(l, u, o, !0)), Hs(l, t, o)),
    de(t) && n.set(t, l),
    l
  )
}
function Hs(e, t, s, i = !1) {
  const { mixins: r, extends: n } = t
  n && Hs(e, n, s, !0), r && r.forEach((o) => Hs(e, o, s, !0))
  for (const o in t)
    if (!(i && o === 'expose')) {
      const a = Ia[o] || (s && s[o])
      e[o] = a ? a(e[o], t[o]) : t[o]
    }
  return e
}
const Ia = {
  data: zr,
  props: $r,
  emits: $r,
  methods: os,
  computed: os,
  beforeCreate: Me,
  created: Me,
  beforeMount: Me,
  mounted: Me,
  beforeUpdate: Me,
  updated: Me,
  beforeDestroy: Me,
  beforeUnmount: Me,
  destroyed: Me,
  unmounted: Me,
  activated: Me,
  deactivated: Me,
  errorCaptured: Me,
  serverPrefetch: Me,
  components: os,
  directives: os,
  watch: Oa,
  provide: zr,
  inject: Ma,
}
function zr(e, t) {
  return t
    ? e
      ? function () {
          return Pe(
            Q(e) ? e.call(this, this) : e,
            Q(t) ? t.call(this, this) : t
          )
        }
      : t
    : e
}
function Ma(e, t) {
  return os(ki(e), ki(t))
}
function ki(e) {
  if (U(e)) {
    const t = {}
    for (let s = 0; s < e.length; s++) t[e[s]] = e[s]
    return t
  }
  return e
}
function Me(e, t) {
  return e ? [...new Set([].concat(e, t))] : t
}
function os(e, t) {
  return e ? Pe(Object.create(null), e, t) : t
}
function $r(e, t) {
  return e
    ? U(e) && U(t)
      ? [...new Set([...e, ...t])]
      : Pe(Object.create(null), Rr(e), Rr(t ?? {}))
    : t
}
function Oa(e, t) {
  if (!e) return t
  if (!t) return e
  const s = Pe(Object.create(null), e)
  for (const i in t) s[i] = Me(e[i], t[i])
  return s
}
function uo() {
  return {
    app: null,
    config: {
      isNativeTag: cl,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  }
}
let Aa = 0
function La(e, t) {
  return function (i, r = null) {
    Q(i) || (i = Pe({}, i)), r != null && !de(r) && (r = null)
    const n = uo(),
      o = new WeakSet()
    let a = !1
    const l = (n.app = {
      _uid: Aa++,
      _component: i,
      _props: r,
      _container: null,
      _context: n,
      _instance: null,
      version: rc,
      get config() {
        return n.config
      },
      set config(u) {},
      use(u, ...c) {
        return (
          o.has(u) ||
            (u && Q(u.install)
              ? (o.add(u), u.install(l, ...c))
              : Q(u) && (o.add(u), u(l, ...c))),
          l
        )
      },
      mixin(u) {
        return n.mixins.includes(u) || n.mixins.push(u), l
      },
      component(u, c) {
        return c ? ((n.components[u] = c), l) : n.components[u]
      },
      directive(u, c) {
        return c ? ((n.directives[u] = c), l) : n.directives[u]
      },
      mount(u, c, d) {
        if (!a) {
          const f = Y(i, r)
          return (
            (f.appContext = n),
            c && t ? t(f, u) : e(f, u, d),
            (a = !0),
            (l._container = u),
            (u.__vue_app__ = l),
            oi(f.component) || f.component.proxy
          )
        }
      },
      unmount() {
        a && (e(null, l._container), delete l._container.__vue_app__)
      },
      provide(u, c) {
        return (n.provides[u] = c), l
      },
      runWithContext(u) {
        Vs = l
        try {
          return u()
        } finally {
          Vs = null
        }
      },
    })
    return l
  }
}
let Vs = null
function Ft(e, t) {
  if (Se) {
    let s = Se.provides
    const i = Se.parent && Se.parent.provides
    i === s && (s = Se.provides = Object.create(i)), (s[e] = t)
  }
}
function ot(e, t, s = !1) {
  const i = Se || Ne
  if (i || Vs) {
    const r = i
      ? i.parent == null
        ? i.vnode.appContext && i.vnode.appContext.provides
        : i.parent.provides
      : Vs._context.provides
    if (r && e in r) return r[e]
    if (arguments.length > 1) return s && Q(t) ? t.call(i && i.proxy) : t
  }
}
function Ra(e, t, s, i = !1) {
  const r = {},
    n = {}
  Bs(n, ni, 1), (e.propsDefaults = Object.create(null)), fo(e, t, r, n)
  for (const o in e.propsOptions[0]) o in r || (r[o] = void 0)
  s ? (e.props = i ? r : qn(r)) : e.type.props ? (e.props = r) : (e.props = n),
    (e.attrs = n)
}
function ka(e, t, s, i) {
  const {
      props: r,
      attrs: n,
      vnode: { patchFlag: o },
    } = e,
    a = te(r),
    [l] = e.propsOptions
  let u = !1
  if ((i || o > 0) && !(o & 16)) {
    if (o & 8) {
      const c = e.vnode.dynamicProps
      for (let d = 0; d < c.length; d++) {
        let f = c[d]
        if (ti(e.emitsOptions, f)) continue
        const p = t[f]
        if (l)
          if (ee(n, f)) p !== n[f] && ((n[f] = p), (u = !0))
          else {
            const g = Ze(f)
            r[g] = zi(l, a, g, p, e, !1)
          }
        else p !== n[f] && ((n[f] = p), (u = !0))
      }
    }
  } else {
    fo(e, t, r, n) && (u = !0)
    let c
    for (const d in a)
      (!t || (!ee(t, d) && ((c = Xt(d)) === d || !ee(t, c)))) &&
        (l
          ? s &&
            (s[d] !== void 0 || s[c] !== void 0) &&
            (r[d] = zi(l, a, d, void 0, e, !0))
          : delete r[d])
    if (n !== a) for (const d in n) (!t || !ee(t, d)) && (delete n[d], (u = !0))
  }
  u && nt(e, 'set', '$attrs')
}
function fo(e, t, s, i) {
  const [r, n] = e.propsOptions
  let o = !1,
    a
  if (t)
    for (let l in t) {
      if (As(l)) continue
      const u = t[l]
      let c
      r && ee(r, (c = Ze(l)))
        ? !n || !n.includes(c)
          ? (s[c] = u)
          : ((a || (a = {}))[c] = u)
        : ti(e.emitsOptions, l) ||
          ((!(l in i) || u !== i[l]) && ((i[l] = u), (o = !0)))
    }
  if (n) {
    const l = te(s),
      u = a || ue
    for (let c = 0; c < n.length; c++) {
      const d = n[c]
      s[d] = zi(r, l, d, u[d], e, !ee(u, d))
    }
  }
  return o
}
function zi(e, t, s, i, r, n) {
  const o = e[s]
  if (o != null) {
    const a = ee(o, 'default')
    if (a && i === void 0) {
      const l = o.default
      if (o.type !== Function && !o.skipFactory && Q(l)) {
        const { propsDefaults: u } = r
        s in u ? (i = u[s]) : (Gt(r), (i = u[s] = l.call(null, t)), Pt())
      } else i = l
    }
    o[0] && (n && !a ? (i = !1) : o[1] && (i === '' || i === Xt(s)) && (i = !0))
  }
  return i
}
function po(e, t, s = !1) {
  const i = t.propsCache,
    r = i.get(e)
  if (r) return r
  const n = e.props,
    o = {},
    a = []
  let l = !1
  if (!Q(e)) {
    const c = (d) => {
      l = !0
      const [f, p] = po(d, t, !0)
      Pe(o, f), p && a.push(...p)
    }
    !s && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c)
  }
  if (!n && !l) return de(e) && i.set(e, Dt), Dt
  if (U(n))
    for (let c = 0; c < n.length; c++) {
      const d = Ze(n[c])
      Dr(d) && (o[d] = ue)
    }
  else if (n)
    for (const c in n) {
      const d = Ze(c)
      if (Dr(d)) {
        const f = n[c],
          p = (o[d] = U(f) || Q(f) ? { type: f } : Pe({}, f))
        if (p) {
          const g = Nr(Boolean, p.type),
            x = Nr(String, p.type)
          ;(p[0] = g > -1),
            (p[1] = x < 0 || g < x),
            (g > -1 || ee(p, 'default')) && a.push(d)
        }
      }
    }
  const u = [o, a]
  return de(e) && i.set(e, u), u
}
function Dr(e) {
  return e[0] !== '$'
}
function Br(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/)
  return t ? t[2] : e === null ? 'null' : ''
}
function jr(e, t) {
  return Br(e) === Br(t)
}
function Nr(e, t) {
  return U(t) ? t.findIndex((s) => jr(s, e)) : Q(t) && jr(t, e) ? 0 : -1
}
const ho = (e) => e[0] === '_' || e === '$stable',
  ur = (e) => (U(e) ? e.map(Qe) : [Qe(e)]),
  za = (e, t, s) => {
    if (t._n) return t
    const i = he((...r) => ur(t(...r)), s)
    return (i._c = !1), i
  },
  mo = (e, t, s) => {
    const i = e._ctx
    for (const r in e) {
      if (ho(r)) continue
      const n = e[r]
      if (Q(n)) t[r] = za(r, n, i)
      else if (n != null) {
        const o = ur(n)
        t[r] = () => o
      }
    }
  },
  go = (e, t) => {
    const s = ur(t)
    e.slots.default = () => s
  },
  $a = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const s = t._
      s ? ((e.slots = te(t)), Bs(t, '_', s)) : mo(t, (e.slots = {}))
    } else (e.slots = {}), t && go(e, t)
    Bs(e.slots, ni, 1)
  },
  Da = (e, t, s) => {
    const { vnode: i, slots: r } = e
    let n = !0,
      o = ue
    if (i.shapeFlag & 32) {
      const a = t._
      a
        ? s && a === 1
          ? (n = !1)
          : (Pe(r, t), !s && a === 1 && delete r._)
        : ((n = !t.$stable), mo(t, r)),
        (o = t)
    } else t && (go(e, t), (o = { default: 1 }))
    if (n) for (const a in r) !ho(a) && o[a] == null && delete r[a]
  }
function $i(e, t, s, i, r = !1) {
  if (U(e)) {
    e.forEach((f, p) => $i(f, t && (U(t) ? t[p] : t), s, i, r))
    return
  }
  if (ks(i) && !r) return
  const n = i.shapeFlag & 4 ? oi(i.component) || i.component.proxy : i.el,
    o = r ? null : n,
    { i: a, r: l } = e,
    u = t && t.r,
    c = a.refs === ue ? (a.refs = {}) : a.refs,
    d = a.setupState
  if (
    (u != null &&
      u !== l &&
      (ye(u)
        ? ((c[u] = null), ee(d, u) && (d[u] = null))
        : we(u) && (u.value = null)),
    Q(l))
  )
    vt(l, a, 12, [o, c])
  else {
    const f = ye(l),
      p = we(l)
    if (f || p) {
      const g = () => {
        if (e.f) {
          const x = f ? (ee(d, l) ? d[l] : c[l]) : l.value
          r
            ? U(x) && Ki(x, n)
            : U(x)
            ? x.includes(n) || x.push(n)
            : f
            ? ((c[l] = [n]), ee(d, l) && (d[l] = c[l]))
            : ((l.value = [n]), e.k && (c[e.k] = l.value))
        } else
          f
            ? ((c[l] = o), ee(d, l) && (d[l] = o))
            : p && ((l.value = o), e.k && (c[e.k] = o))
      }
      o ? ((g.id = -1), Oe(g, s)) : g()
    }
  }
}
const Oe = ha
function Ba(e) {
  return ja(e)
}
function ja(e, t) {
  const s = Ci()
  s.__VUE__ = !0
  const {
      insert: i,
      remove: r,
      patchProp: n,
      createElement: o,
      createText: a,
      createComment: l,
      setText: u,
      setElementText: c,
      parentNode: d,
      nextSibling: f,
      setScopeId: p = We,
      insertStaticContent: g,
    } = e,
    x = (
      h,
      m,
      v,
      S = null,
      M = null,
      O = null,
      B = !1,
      R = null,
      z = !!m.dynamicChildren
    ) => {
      if (h === m) return
      h && !ts(h, m) && ((S = P(h)), xe(h, M, O, !0), (h = null)),
        m.patchFlag === -2 && ((z = !1), (m.dynamicChildren = null))
      const { type: A, ref: G, shapeFlag: H } = m
      switch (A) {
        case ri:
          I(h, m, v, S)
          break
        case Mt:
          b(h, m, v, S)
          break
        case zs:
          h == null && E(m, v, S, B)
          break
        case Le:
          K(h, m, v, S, M, O, B, R, z)
          break
        default:
          H & 1
            ? L(h, m, v, S, M, O, B, R, z)
            : H & 6
            ? V(h, m, v, S, M, O, B, R, z)
            : (H & 64 || H & 128) && A.process(h, m, v, S, M, O, B, R, z, $)
      }
      G != null && M && $i(G, h && h.ref, O, m || h, !m)
    },
    I = (h, m, v, S) => {
      if (h == null) i((m.el = a(m.children)), v, S)
      else {
        const M = (m.el = h.el)
        m.children !== h.children && u(M, m.children)
      }
    },
    b = (h, m, v, S) => {
      h == null ? i((m.el = l(m.children || '')), v, S) : (m.el = h.el)
    },
    E = (h, m, v, S) => {
      ;[h.el, h.anchor] = g(h.children, m, v, S, h.el, h.anchor)
    },
    w = ({ el: h, anchor: m }, v, S) => {
      let M
      for (; h && h !== m; ) (M = f(h)), i(h, v, S), (h = M)
      i(m, v, S)
    },
    y = ({ el: h, anchor: m }) => {
      let v
      for (; h && h !== m; ) (v = f(h)), r(h), (h = v)
      r(m)
    },
    L = (h, m, v, S, M, O, B, R, z) => {
      ;(B = B || m.type === 'svg'),
        h == null ? N(m, v, S, M, O, B, R, z) : T(h, m, M, O, B, R, z)
    },
    N = (h, m, v, S, M, O, B, R) => {
      let z, A
      const { type: G, props: H, shapeFlag: W, transition: X, dirs: Z } = h
      if (
        ((z = h.el = o(h.type, O, H && H.is, H)),
        W & 8
          ? c(z, h.children)
          : W & 16 &&
            k(h.children, z, null, S, M, O && G !== 'foreignObject', B, R),
        Z && wt(h, null, S, 'created'),
        J(z, h, h.scopeId, B, S),
        H)
      ) {
        for (const oe in H)
          oe !== 'value' &&
            !As(oe) &&
            n(z, oe, null, H[oe], O, h.children, S, M, Ce)
        'value' in H && n(z, 'value', null, H.value),
          (A = H.onVnodeBeforeMount) && Xe(A, S, h)
      }
      Z && wt(h, null, S, 'beforeMount')
      const ae = Na(M, X)
      ae && X.beforeEnter(z),
        i(z, m, v),
        ((A = H && H.onVnodeMounted) || ae || Z) &&
          Oe(() => {
            A && Xe(A, S, h), ae && X.enter(z), Z && wt(h, null, S, 'mounted')
          }, M)
    },
    J = (h, m, v, S, M) => {
      if ((v && p(h, v), S)) for (let O = 0; O < S.length; O++) p(h, S[O])
      if (M) {
        let O = M.subTree
        if (m === O) {
          const B = M.vnode
          J(h, B, B.scopeId, B.slotScopeIds, M.parent)
        }
      }
    },
    k = (h, m, v, S, M, O, B, R, z = 0) => {
      for (let A = z; A < h.length; A++) {
        const G = (h[A] = R ? pt(h[A]) : Qe(h[A]))
        x(null, G, m, v, S, M, O, B, R)
      }
    },
    T = (h, m, v, S, M, O, B) => {
      const R = (m.el = h.el)
      let { patchFlag: z, dynamicChildren: A, dirs: G } = m
      z |= h.patchFlag & 16
      const H = h.props || ue,
        W = m.props || ue
      let X
      v && yt(v, !1),
        (X = W.onVnodeBeforeUpdate) && Xe(X, v, m, h),
        G && wt(m, h, v, 'beforeUpdate'),
        v && yt(v, !0)
      const Z = M && m.type !== 'foreignObject'
      if (
        (A
          ? C(h.dynamicChildren, A, R, v, S, Z, O)
          : B || F(h, m, R, null, v, S, Z, O, !1),
        z > 0)
      ) {
        if (z & 16) D(R, m, H, W, v, S, M)
        else if (
          (z & 2 && H.class !== W.class && n(R, 'class', null, W.class, M),
          z & 4 && n(R, 'style', H.style, W.style, M),
          z & 8)
        ) {
          const ae = m.dynamicProps
          for (let oe = 0; oe < ae.length; oe++) {
            const be = ae[oe],
              Ve = H[be],
              Rt = W[be]
            ;(Rt !== Ve || be === 'value') &&
              n(R, be, Ve, Rt, M, h.children, v, S, Ce)
          }
        }
        z & 1 && h.children !== m.children && c(R, m.children)
      } else !B && A == null && D(R, m, H, W, v, S, M)
      ;((X = W.onVnodeUpdated) || G) &&
        Oe(() => {
          X && Xe(X, v, m, h), G && wt(m, h, v, 'updated')
        }, S)
    },
    C = (h, m, v, S, M, O, B) => {
      for (let R = 0; R < m.length; R++) {
        const z = h[R],
          A = m[R],
          G =
            z.el && (z.type === Le || !ts(z, A) || z.shapeFlag & 70)
              ? d(z.el)
              : v
        x(z, A, G, null, S, M, O, B, !0)
      }
    },
    D = (h, m, v, S, M, O, B) => {
      if (v !== S) {
        if (v !== ue)
          for (const R in v)
            !As(R) && !(R in S) && n(h, R, v[R], null, B, m.children, M, O, Ce)
        for (const R in S) {
          if (As(R)) continue
          const z = S[R],
            A = v[R]
          z !== A && R !== 'value' && n(h, R, A, z, B, m.children, M, O, Ce)
        }
        'value' in S && n(h, 'value', v.value, S.value)
      }
    },
    K = (h, m, v, S, M, O, B, R, z) => {
      const A = (m.el = h ? h.el : a('')),
        G = (m.anchor = h ? h.anchor : a(''))
      let { patchFlag: H, dynamicChildren: W, slotScopeIds: X } = m
      X && (R = R ? R.concat(X) : X),
        h == null
          ? (i(A, v, S), i(G, v, S), k(m.children, v, G, M, O, B, R, z))
          : H > 0 && H & 64 && W && h.dynamicChildren
          ? (C(h.dynamicChildren, W, v, M, O, B, R),
            (m.key != null || (M && m === M.subTree)) && vo(h, m, !0))
          : F(h, m, v, G, M, O, B, R, z)
    },
    V = (h, m, v, S, M, O, B, R, z) => {
      ;(m.slotScopeIds = R),
        h == null
          ? m.shapeFlag & 512
            ? M.ctx.activate(m, v, S, B, z)
            : le(m, v, S, M, O, B, z)
          : pe(h, m, z)
    },
    le = (h, m, v, S, M, O, B) => {
      const R = (h.component = Ya(h, S, M))
      if ((ro(h) && (R.ctx.renderer = $), Xa(R), R.asyncDep)) {
        if ((M && M.registerDep(R, re), !h.el)) {
          const z = (R.subTree = Y(Mt))
          b(null, z, m, v)
        }
        return
      }
      re(R, h, m, v, M, O, B)
    },
    pe = (h, m, v) => {
      const S = (m.component = h.component)
      if (ca(h, m, v))
        if (S.asyncDep && !S.asyncResolved) {
          se(S, m, v)
          return
        } else (S.next = m), ia(S.update), S.update()
      else (m.el = h.el), (S.vnode = m)
    },
    re = (h, m, v, S, M, O, B) => {
      const R = () => {
          if (h.isMounted) {
            let { next: G, bu: H, u: W, parent: X, vnode: Z } = h,
              ae = G,
              oe
            yt(h, !1),
              G ? ((G.el = Z.el), se(h, G, B)) : (G = Z),
              H && Ls(H),
              (oe = G.props && G.props.onVnodeBeforeUpdate) && Xe(oe, X, G, Z),
              yt(h, !0)
            const be = ci(h),
              Ve = h.subTree
            ;(h.subTree = be),
              x(Ve, be, d(Ve.el), P(Ve), h, M, O),
              (G.el = be.el),
              ae === null && ua(h, be.el),
              W && Oe(W, M),
              (oe = G.props && G.props.onVnodeUpdated) &&
                Oe(() => Xe(oe, X, G, Z), M)
          } else {
            let G
            const { el: H, props: W } = m,
              { bm: X, m: Z, parent: ae } = h,
              oe = ks(m)
            if (
              (yt(h, !1),
              X && Ls(X),
              !oe && (G = W && W.onVnodeBeforeMount) && Xe(G, ae, m),
              yt(h, !0),
              H && ie)
            ) {
              const be = () => {
                ;(h.subTree = ci(h)), ie(H, h.subTree, h, M, null)
              }
              oe
                ? m.type.__asyncLoader().then(() => !h.isUnmounted && be())
                : be()
            } else {
              const be = (h.subTree = ci(h))
              x(null, be, v, S, h, M, O), (m.el = be.el)
            }
            if ((Z && Oe(Z, M), !oe && (G = W && W.onVnodeMounted))) {
              const be = m
              Oe(() => Xe(G, ae, be), M)
            }
            ;(m.shapeFlag & 256 ||
              (ae && ks(ae.vnode) && ae.vnode.shapeFlag & 256)) &&
              h.a &&
              Oe(h.a, M),
              (h.isMounted = !0),
              (m = v = S = null)
          }
        },
        z = (h.effect = new Qi(R, () => nr(A), h.scope)),
        A = (h.update = () => z.run())
      ;(A.id = h.uid), yt(h, !0), A()
    },
    se = (h, m, v) => {
      m.component = h
      const S = h.vnode.props
      ;(h.vnode = m),
        (h.next = null),
        ka(h, m.props, S, v),
        Da(h, m.children, v),
        Qt(),
        Or(),
        Jt()
    },
    F = (h, m, v, S, M, O, B, R, z = !1) => {
      const A = h && h.children,
        G = h ? h.shapeFlag : 0,
        H = m.children,
        { patchFlag: W, shapeFlag: X } = m
      if (W > 0) {
        if (W & 128) {
          fe(A, H, v, S, M, O, B, R, z)
          return
        } else if (W & 256) {
          me(A, H, v, S, M, O, B, R, z)
          return
        }
      }
      X & 8
        ? (G & 16 && Ce(A, M, O), H !== A && c(v, H))
        : G & 16
        ? X & 16
          ? fe(A, H, v, S, M, O, B, R, z)
          : Ce(A, M, O, !0)
        : (G & 8 && c(v, ''), X & 16 && k(H, v, S, M, O, B, R, z))
    },
    me = (h, m, v, S, M, O, B, R, z) => {
      ;(h = h || Dt), (m = m || Dt)
      const A = h.length,
        G = m.length,
        H = Math.min(A, G)
      let W
      for (W = 0; W < H; W++) {
        const X = (m[W] = z ? pt(m[W]) : Qe(m[W]))
        x(h[W], X, v, null, M, O, B, R, z)
      }
      A > G ? Ce(h, M, O, !0, !1, H) : k(m, v, S, M, O, B, R, z, H)
    },
    fe = (h, m, v, S, M, O, B, R, z) => {
      let A = 0
      const G = m.length
      let H = h.length - 1,
        W = G - 1
      for (; A <= H && A <= W; ) {
        const X = h[A],
          Z = (m[A] = z ? pt(m[A]) : Qe(m[A]))
        if (ts(X, Z)) x(X, Z, v, null, M, O, B, R, z)
        else break
        A++
      }
      for (; A <= H && A <= W; ) {
        const X = h[H],
          Z = (m[W] = z ? pt(m[W]) : Qe(m[W]))
        if (ts(X, Z)) x(X, Z, v, null, M, O, B, R, z)
        else break
        H--, W--
      }
      if (A > H) {
        if (A <= W) {
          const X = W + 1,
            Z = X < G ? m[X].el : S
          for (; A <= W; )
            x(null, (m[A] = z ? pt(m[A]) : Qe(m[A])), v, Z, M, O, B, R, z), A++
        }
      } else if (A > W) for (; A <= H; ) xe(h[A], M, O, !0), A++
      else {
        const X = A,
          Z = A,
          ae = new Map()
        for (A = Z; A <= W; A++) {
          const ze = (m[A] = z ? pt(m[A]) : Qe(m[A]))
          ze.key != null && ae.set(ze.key, A)
        }
        let oe,
          be = 0
        const Ve = W - Z + 1
        let Rt = !1,
          br = 0
        const Zt = new Array(Ve)
        for (A = 0; A < Ve; A++) Zt[A] = 0
        for (A = X; A <= H; A++) {
          const ze = h[A]
          if (be >= Ve) {
            xe(ze, M, O, !0)
            continue
          }
          let Ye
          if (ze.key != null) Ye = ae.get(ze.key)
          else
            for (oe = Z; oe <= W; oe++)
              if (Zt[oe - Z] === 0 && ts(ze, m[oe])) {
                Ye = oe
                break
              }
          Ye === void 0
            ? xe(ze, M, O, !0)
            : ((Zt[Ye - Z] = A + 1),
              Ye >= br ? (br = Ye) : (Rt = !0),
              x(ze, m[Ye], v, null, M, O, B, R, z),
              be++)
        }
        const xr = Rt ? Fa(Zt) : Dt
        for (oe = xr.length - 1, A = Ve - 1; A >= 0; A--) {
          const ze = Z + A,
            Ye = m[ze],
            wr = ze + 1 < G ? m[ze + 1].el : S
          Zt[A] === 0
            ? x(null, Ye, v, wr, M, O, B, R, z)
            : Rt && (oe < 0 || A !== xr[oe] ? _e(Ye, v, wr, 2) : oe--)
        }
      }
    },
    _e = (h, m, v, S, M = null) => {
      const { el: O, type: B, transition: R, children: z, shapeFlag: A } = h
      if (A & 6) {
        _e(h.component.subTree, m, v, S)
        return
      }
      if (A & 128) {
        h.suspense.move(m, v, S)
        return
      }
      if (A & 64) {
        B.move(h, m, v, $)
        return
      }
      if (B === Le) {
        i(O, m, v)
        for (let H = 0; H < z.length; H++) _e(z[H], m, v, S)
        i(h.anchor, m, v)
        return
      }
      if (B === zs) {
        w(h, m, v)
        return
      }
      if (S !== 2 && A & 1 && R)
        if (S === 0) R.beforeEnter(O), i(O, m, v), Oe(() => R.enter(O), M)
        else {
          const { leave: H, delayLeave: W, afterLeave: X } = R,
            Z = () => i(O, m, v),
            ae = () => {
              H(O, () => {
                Z(), X && X()
              })
            }
          W ? W(O, Z, ae) : ae()
        }
      else i(O, m, v)
    },
    xe = (h, m, v, S = !1, M = !1) => {
      const {
        type: O,
        props: B,
        ref: R,
        children: z,
        dynamicChildren: A,
        shapeFlag: G,
        patchFlag: H,
        dirs: W,
      } = h
      if ((R != null && $i(R, null, v, h, !0), G & 256)) {
        m.ctx.deactivate(h)
        return
      }
      const X = G & 1 && W,
        Z = !ks(h)
      let ae
      if ((Z && (ae = B && B.onVnodeBeforeUnmount) && Xe(ae, m, h), G & 6))
        ws(h.component, v, S)
      else {
        if (G & 128) {
          h.suspense.unmount(v, S)
          return
        }
        X && wt(h, null, m, 'beforeUnmount'),
          G & 64
            ? h.type.remove(h, m, v, M, $, S)
            : A && (O !== Le || (H > 0 && H & 64))
            ? Ce(A, m, v, !1, !0)
            : ((O === Le && H & 384) || (!M && G & 16)) && Ce(z, m, v),
          S && At(h)
      }
      ;((Z && (ae = B && B.onVnodeUnmounted)) || X) &&
        Oe(() => {
          ae && Xe(ae, m, h), X && wt(h, null, m, 'unmounted')
        }, v)
    },
    At = (h) => {
      const { type: m, el: v, anchor: S, transition: M } = h
      if (m === Le) {
        Lt(v, S)
        return
      }
      if (m === zs) {
        y(h)
        return
      }
      const O = () => {
        r(v), M && !M.persisted && M.afterLeave && M.afterLeave()
      }
      if (h.shapeFlag & 1 && M && !M.persisted) {
        const { leave: B, delayLeave: R } = M,
          z = () => B(v, O)
        R ? R(h.el, O, z) : z()
      } else O()
    },
    Lt = (h, m) => {
      let v
      for (; h !== m; ) (v = f(h)), r(h), (h = v)
      r(m)
    },
    ws = (h, m, v) => {
      const { bum: S, scope: M, update: O, subTree: B, um: R } = h
      S && Ls(S),
        M.stop(),
        O && ((O.active = !1), xe(B, h, m, v)),
        R && Oe(R, m),
        Oe(() => {
          h.isUnmounted = !0
        }, m),
        m &&
          m.pendingBranch &&
          !m.isUnmounted &&
          h.asyncDep &&
          !h.asyncResolved &&
          h.suspenseId === m.pendingId &&
          (m.deps--, m.deps === 0 && m.resolve())
    },
    Ce = (h, m, v, S = !1, M = !1, O = 0) => {
      for (let B = O; B < h.length; B++) xe(h[B], m, v, S, M)
    },
    P = (h) =>
      h.shapeFlag & 6
        ? P(h.component.subTree)
        : h.shapeFlag & 128
        ? h.suspense.next()
        : f(h.anchor || h.el),
    j = (h, m, v) => {
      h == null
        ? m._vnode && xe(m._vnode, null, null, !0)
        : x(m._vnode || null, h, m, null, null, null, v),
        Or(),
        Jn(),
        (m._vnode = h)
    },
    $ = { p: x, um: xe, m: _e, r: At, mt: le, mc: k, pc: F, pbc: C, n: P, o: e }
  let q, ie
  return t && ([q, ie] = t($)), { render: j, hydrate: q, createApp: La(j, q) }
}
function yt({ effect: e, update: t }, s) {
  e.allowRecurse = t.allowRecurse = s
}
function Na(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted
}
function vo(e, t, s = !1) {
  const i = e.children,
    r = t.children
  if (U(i) && U(r))
    for (let n = 0; n < i.length; n++) {
      const o = i[n]
      let a = r[n]
      a.shapeFlag & 1 &&
        !a.dynamicChildren &&
        ((a.patchFlag <= 0 || a.patchFlag === 32) &&
          ((a = r[n] = pt(r[n])), (a.el = o.el)),
        s || vo(o, a)),
        a.type === ri && (a.el = o.el)
    }
}
function Fa(e) {
  const t = e.slice(),
    s = [0]
  let i, r, n, o, a
  const l = e.length
  for (i = 0; i < l; i++) {
    const u = e[i]
    if (u !== 0) {
      if (((r = s[s.length - 1]), e[r] < u)) {
        ;(t[i] = r), s.push(i)
        continue
      }
      for (n = 0, o = s.length - 1; n < o; )
        (a = (n + o) >> 1), e[s[a]] < u ? (n = a + 1) : (o = a)
      u < e[s[n]] && (n > 0 && (t[i] = s[n - 1]), (s[n] = i))
    }
  }
  for (n = s.length, o = s[n - 1]; n-- > 0; ) (s[n] = o), (o = t[o])
  return s
}
const Ha = (e) => e.__isTeleport,
  Le = Symbol.for('v-fgt'),
  ri = Symbol.for('v-txt'),
  Mt = Symbol.for('v-cmt'),
  zs = Symbol.for('v-stc'),
  as = []
let Ge = null
function ce(e = !1) {
  as.push((Ge = e ? null : []))
}
function Va() {
  as.pop(), (Ge = as[as.length - 1] || null)
}
let ms = 1
function Fr(e) {
  ms += e
}
function bo(e) {
  return (
    (e.dynamicChildren = ms > 0 ? Ge || Dt : null),
    Va(),
    ms > 0 && Ge && Ge.push(e),
    e
  )
}
function ve(e, t, s, i, r, n) {
  return bo(_(e, t, s, i, r, n, !0))
}
function cs(e, t, s, i, r) {
  return bo(Y(e, t, s, i, r, !0))
}
function Di(e) {
  return e ? e.__v_isVNode === !0 : !1
}
function ts(e, t) {
  return e.type === t.type && e.key === t.key
}
const ni = '__vInternal',
  xo = ({ key: e }) => e ?? null,
  $s = ({ ref: e, ref_key: t, ref_for: s }) => (
    typeof e == 'number' && (e = '' + e),
    e != null
      ? ye(e) || we(e) || Q(e)
        ? { i: Ne, r: e, k: t, f: !!s }
        : e
      : null
  )
function _(
  e,
  t = null,
  s = null,
  i = 0,
  r = null,
  n = e === Le ? 0 : 1,
  o = !1,
  a = !1
) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && xo(t),
    ref: t && $s(t),
    scopeId: si,
    slotScopeIds: null,
    children: s,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: n,
    patchFlag: i,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: Ne,
  }
  return (
    a
      ? (dr(l, s), n & 128 && e.normalize(l))
      : s && (l.shapeFlag |= ye(s) ? 8 : 16),
    ms > 0 &&
      !o &&
      Ge &&
      (l.patchFlag > 0 || n & 6) &&
      l.patchFlag !== 32 &&
      Ge.push(l),
    l
  )
}
const Y = qa
function qa(e, t = null, s = null, i = 0, r = null, n = !1) {
  if (((!e || e === da) && (e = Mt), Di(e))) {
    const a = qt(e, t, !0)
    return (
      s && dr(a, s),
      ms > 0 &&
        !n &&
        Ge &&
        (a.shapeFlag & 6 ? (Ge[Ge.indexOf(e)] = a) : Ge.push(a)),
      (a.patchFlag |= -2),
      a
    )
  }
  if ((tc(e) && (e = e.__vccOpts), t)) {
    t = Ga(t)
    let { class: a, style: l } = t
    a && !ye(a) && (t.class = Ae(a)),
      de(l) && (Gn(l) && !U(l) && (l = Pe({}, l)), (t.style = at(l)))
  }
  const o = ye(e) ? 1 : pa(e) ? 128 : Ha(e) ? 64 : de(e) ? 4 : Q(e) ? 2 : 0
  return _(e, t, s, i, r, o, n, !0)
}
function Ga(e) {
  return e ? (Gn(e) || ni in e ? Pe({}, e) : e) : null
}
function qt(e, t, s = !1) {
  const { props: i, ref: r, patchFlag: n, children: o } = e,
    a = t ? Wa(i || {}, t) : i
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && xo(a),
    ref:
      t && t.ref ? (s && r ? (U(r) ? r.concat($s(t)) : [r, $s(t)]) : $s(t)) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Le ? (n === -1 ? 16 : n | 16) : n,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && qt(e.ssContent),
    ssFallback: e.ssFallback && qt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  }
}
function $e(e = ' ', t = 0) {
  return Y(ri, null, e, t)
}
function Fe(e, t) {
  const s = Y(zs, null, e)
  return (s.staticCount = t), s
}
function di(e = '', t = !1) {
  return t ? (ce(), cs(Mt, null, e)) : Y(Mt, null, e)
}
function Qe(e) {
  return e == null || typeof e == 'boolean'
    ? Y(Mt)
    : U(e)
    ? Y(Le, null, e.slice())
    : typeof e == 'object'
    ? pt(e)
    : Y(ri, null, String(e))
}
function pt(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : qt(e)
}
function dr(e, t) {
  let s = 0
  const { shapeFlag: i } = e
  if (t == null) t = null
  else if (U(t)) s = 16
  else if (typeof t == 'object')
    if (i & 65) {
      const r = t.default
      r && (r._c && (r._d = !1), dr(e, r()), r._c && (r._d = !0))
      return
    } else {
      s = 32
      const r = t._
      !r && !(ni in t)
        ? (t._ctx = Ne)
        : r === 3 &&
          Ne &&
          (Ne.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)))
    }
  else
    Q(t)
      ? ((t = { default: t, _ctx: Ne }), (s = 32))
      : ((t = String(t)), i & 64 ? ((s = 16), (t = [$e(t)])) : (s = 8))
  ;(e.children = t), (e.shapeFlag |= s)
}
function Wa(...e) {
  const t = {}
  for (let s = 0; s < e.length; s++) {
    const i = e[s]
    for (const r in i)
      if (r === 'class')
        t.class !== i.class && (t.class = Ae([t.class, i.class]))
      else if (r === 'style') t.style = at([t.style, i.style])
      else if (Ws(r)) {
        const n = t[r],
          o = i[r]
        o &&
          n !== o &&
          !(U(n) && n.includes(o)) &&
          (t[r] = n ? [].concat(n, o) : o)
      } else r !== '' && (t[r] = i[r])
  }
  return t
}
function Xe(e, t, s, i = null) {
  Ue(e, t, 7, [s, i])
}
const Ua = uo()
let Ka = 0
function Ya(e, t, s) {
  const i = e.type,
    r = (t ? t.appContext : e.appContext) || Ua,
    n = {
      uid: Ka++,
      vnode: e,
      type: i,
      parent: t,
      appContext: r,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new yl(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(r.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: po(i, r),
      emitsOptions: eo(i, r),
      emit: null,
      emitted: null,
      propsDefaults: ue,
      inheritAttrs: i.inheritAttrs,
      ctx: ue,
      data: ue,
      props: ue,
      attrs: ue,
      slots: ue,
      refs: ue,
      setupState: ue,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: s,
      suspenseId: s ? s.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    }
  return (
    (n.ctx = { _: n }),
    (n.root = t ? t.root : n),
    (n.emit = oa.bind(null, n)),
    e.ce && e.ce(n),
    n
  )
}
let Se = null
const wo = () => Se || Ne
let fr,
  kt,
  Hr = '__VUE_INSTANCE_SETTERS__'
;(kt = Ci()[Hr]) || (kt = Ci()[Hr] = []),
  kt.push((e) => (Se = e)),
  (fr = (e) => {
    kt.length > 1 ? kt.forEach((t) => t(e)) : kt[0](e)
  })
const Gt = (e) => {
    fr(e), e.scope.on()
  },
  Pt = () => {
    Se && Se.scope.off(), fr(null)
  }
function yo(e) {
  return e.vnode.shapeFlag & 4
}
let gs = !1
function Xa(e, t = !1) {
  gs = t
  const { props: s, children: i } = e.vnode,
    r = yo(e)
  Ra(e, s, r, t), $a(e, i)
  const n = r ? Qa(e, t) : void 0
  return (gs = !1), n
}
function Qa(e, t) {
  const s = e.type
  ;(e.accessCache = Object.create(null)), (e.proxy = Wn(new Proxy(e.ctx, Ea)))
  const { setup: i } = s
  if (i) {
    const r = (e.setupContext = i.length > 1 ? Za(e) : null)
    Gt(e), Qt()
    const n = vt(i, e, 0, [e.props, r])
    if ((Jt(), Pt(), In(n))) {
      if ((n.then(Pt, Pt), t))
        return n
          .then((o) => {
            Vr(e, o, t)
          })
          .catch((o) => {
            ei(o, e, 0)
          })
      e.asyncDep = n
    } else Vr(e, n, t)
  } else _o(e, t)
}
function Vr(e, t, s) {
  Q(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : de(t) && (e.setupState = Yn(t)),
    _o(e, s)
}
let qr
function _o(e, t, s) {
  const i = e.type
  if (!e.render) {
    if (!t && qr && !i.render) {
      const r = i.template || cr(e).template
      if (r) {
        const { isCustomElement: n, compilerOptions: o } = e.appContext.config,
          { delimiters: a, compilerOptions: l } = i,
          u = Pe(Pe({ isCustomElement: n, delimiters: a }, o), l)
        i.render = qr(r, u)
      }
    }
    e.render = i.render || We
  }
  {
    Gt(e), Qt()
    try {
      Pa(e)
    } finally {
      Jt(), Pt()
    }
  }
}
function Ja(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, s) {
        return ke(e, 'get', '$attrs'), t[s]
      },
    }))
  )
}
function Za(e) {
  const t = (s) => {
    e.exposed = s || {}
  }
  return {
    get attrs() {
      return Ja(e)
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  }
}
function oi(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Yn(Wn(e.exposed)), {
        get(t, s) {
          if (s in t) return t[s]
          if (s in ls) return ls[s](e)
        },
        has(t, s) {
          return s in t || s in ls
        },
      }))
    )
}
function ec(e, t = !0) {
  return Q(e) ? e.displayName || e.name : e.name || (t && e.__name)
}
function tc(e) {
  return Q(e) && '__vccOpts' in e
}
const Te = (e, t) => ea(e, t, gs)
function je(e, t, s) {
  const i = arguments.length
  return i === 2
    ? de(t) && !U(t)
      ? Di(t)
        ? Y(e, null, [t])
        : Y(e, t)
      : Y(e, null, t)
    : (i > 3
        ? (s = Array.prototype.slice.call(arguments, 2))
        : i === 3 && Di(s) && (s = [s]),
      Y(e, t, s))
}
const sc = Symbol.for('v-scx'),
  ic = () => ot(sc),
  rc = '3.3.9',
  nc = 'http://www.w3.org/2000/svg',
  St = typeof document < 'u' ? document : null,
  Gr = St && St.createElement('template'),
  oc = {
    insert: (e, t, s) => {
      t.insertBefore(e, s || null)
    },
    remove: (e) => {
      const t = e.parentNode
      t && t.removeChild(e)
    },
    createElement: (e, t, s, i) => {
      const r = t
        ? St.createElementNS(nc, e)
        : St.createElement(e, s ? { is: s } : void 0)
      return (
        e === 'select' &&
          i &&
          i.multiple != null &&
          r.setAttribute('multiple', i.multiple),
        r
      )
    },
    createText: (e) => St.createTextNode(e),
    createComment: (e) => St.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t
    },
    setElementText: (e, t) => {
      e.textContent = t
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => St.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '')
    },
    insertStaticContent(e, t, s, i, r, n) {
      const o = s ? s.previousSibling : t.lastChild
      if (r && (r === n || r.nextSibling))
        for (
          ;
          t.insertBefore(r.cloneNode(!0), s),
            !(r === n || !(r = r.nextSibling));

        );
      else {
        Gr.innerHTML = i ? `<svg>${e}</svg>` : e
        const a = Gr.content
        if (i) {
          const l = a.firstChild
          for (; l.firstChild; ) a.appendChild(l.firstChild)
          a.removeChild(l)
        }
        t.insertBefore(a, s)
      }
      return [
        o ? o.nextSibling : t.firstChild,
        s ? s.previousSibling : t.lastChild,
      ]
    },
  },
  lc = Symbol('_vtc')
function ac(e, t, s) {
  const i = e[lc]
  i && (t = (t ? [t, ...i] : [...i]).join(' ')),
    t == null
      ? e.removeAttribute('class')
      : s
      ? e.setAttribute('class', t)
      : (e.className = t)
}
const pr = Symbol('_vod'),
  ss = {
    beforeMount(e, { value: t }, { transition: s }) {
      ;(e[pr] = e.style.display === 'none' ? '' : e.style.display),
        s && t ? s.beforeEnter(e) : is(e, t)
    },
    mounted(e, { value: t }, { transition: s }) {
      s && t && s.enter(e)
    },
    updated(e, { value: t, oldValue: s }, { transition: i }) {
      !t != !s &&
        (i
          ? t
            ? (i.beforeEnter(e), is(e, !0), i.enter(e))
            : i.leave(e, () => {
                is(e, !1)
              })
          : is(e, t))
    },
    beforeUnmount(e, { value: t }) {
      is(e, t)
    },
  }
function is(e, t) {
  e.style.display = t ? e[pr] : 'none'
}
function cc(e, t, s) {
  const i = e.style,
    r = ye(s)
  if (s && !r) {
    if (t && !ye(t)) for (const n in t) s[n] == null && Bi(i, n, '')
    for (const n in s) Bi(i, n, s[n])
  } else {
    const n = i.display
    r ? t !== s && (i.cssText = s) : t && e.removeAttribute('style'),
      pr in e && (i.display = n)
  }
}
const Wr = /\s*!important$/
function Bi(e, t, s) {
  if (U(s)) s.forEach((i) => Bi(e, t, i))
  else if ((s == null && (s = ''), t.startsWith('--'))) e.setProperty(t, s)
  else {
    const i = uc(e, t)
    Wr.test(s)
      ? e.setProperty(Xt(i), s.replace(Wr, ''), 'important')
      : (e[i] = s)
  }
}
const Ur = ['Webkit', 'Moz', 'ms'],
  fi = {}
function uc(e, t) {
  const s = fi[t]
  if (s) return s
  let i = Ze(t)
  if (i !== 'filter' && i in e) return (fi[t] = i)
  i = Xs(i)
  for (let r = 0; r < Ur.length; r++) {
    const n = Ur[r] + i
    if (n in e) return (fi[t] = n)
  }
  return t
}
const Kr = 'http://www.w3.org/1999/xlink'
function dc(e, t, s, i, r) {
  if (i && t.startsWith('xlink:'))
    s == null
      ? e.removeAttributeNS(Kr, t.slice(6, t.length))
      : e.setAttributeNS(Kr, t, s)
  else {
    const n = wl(t)
    s == null || (n && !An(s))
      ? e.removeAttribute(t)
      : e.setAttribute(t, n ? '' : s)
  }
}
function fc(e, t, s, i, r, n, o) {
  if (t === 'innerHTML' || t === 'textContent') {
    i && o(i, r, n), (e[t] = s ?? '')
    return
  }
  const a = e.tagName
  if (t === 'value' && a !== 'PROGRESS' && !a.includes('-')) {
    e._value = s
    const u = a === 'OPTION' ? e.getAttribute('value') : e.value,
      c = s ?? ''
    u !== c && (e.value = c), s == null && e.removeAttribute(t)
    return
  }
  let l = !1
  if (s === '' || s == null) {
    const u = typeof e[t]
    u === 'boolean'
      ? (s = An(s))
      : s == null && u === 'string'
      ? ((s = ''), (l = !0))
      : u === 'number' && ((s = 0), (l = !0))
  }
  try {
    e[t] = s
  } catch {}
  l && e.removeAttribute(t)
}
function zt(e, t, s, i) {
  e.addEventListener(t, s, i)
}
function pc(e, t, s, i) {
  e.removeEventListener(t, s, i)
}
const Yr = Symbol('_vei')
function hc(e, t, s, i, r = null) {
  const n = e[Yr] || (e[Yr] = {}),
    o = n[t]
  if (i && o) o.value = i
  else {
    const [a, l] = mc(t)
    if (i) {
      const u = (n[t] = bc(i, r))
      zt(e, a, u, l)
    } else o && (pc(e, a, o, l), (n[t] = void 0))
  }
}
const Xr = /(?:Once|Passive|Capture)$/
function mc(e) {
  let t
  if (Xr.test(e)) {
    t = {}
    let i
    for (; (i = e.match(Xr)); )
      (e = e.slice(0, e.length - i[0].length)), (t[i[0].toLowerCase()] = !0)
  }
  return [e[2] === ':' ? e.slice(3) : Xt(e.slice(2)), t]
}
let pi = 0
const gc = Promise.resolve(),
  vc = () => pi || (gc.then(() => (pi = 0)), (pi = Date.now()))
function bc(e, t) {
  const s = (i) => {
    if (!i._vts) i._vts = Date.now()
    else if (i._vts <= s.attached) return
    Ue(xc(i, s.value), t, 5, [i])
  }
  return (s.value = e), (s.attached = vc()), s
}
function xc(e, t) {
  if (U(t)) {
    const s = e.stopImmediatePropagation
    return (
      (e.stopImmediatePropagation = () => {
        s.call(e), (e._stopped = !0)
      }),
      t.map((i) => (r) => !r._stopped && i && i(r))
    )
  } else return t
}
const Qr = /^on[a-z]/,
  wc = (e, t, s, i, r = !1, n, o, a, l) => {
    t === 'class'
      ? ac(e, i, r)
      : t === 'style'
      ? cc(e, s, i)
      : Ws(t)
      ? Ui(t) || hc(e, t, s, i, o)
      : (
          t[0] === '.'
            ? ((t = t.slice(1)), !0)
            : t[0] === '^'
            ? ((t = t.slice(1)), !1)
            : yc(e, t, i, r)
        )
      ? fc(e, t, i, n, o, a, l)
      : (t === 'true-value'
          ? (e._trueValue = i)
          : t === 'false-value' && (e._falseValue = i),
        dc(e, t, i, r))
  }
function yc(e, t, s, i) {
  return i
    ? !!(
        t === 'innerHTML' ||
        t === 'textContent' ||
        (t in e && Qr.test(t) && Q(s))
      )
    : t === 'spellcheck' ||
      t === 'draggable' ||
      t === 'translate' ||
      t === 'form' ||
      (t === 'list' && e.tagName === 'INPUT') ||
      (t === 'type' && e.tagName === 'TEXTAREA') ||
      (Qr.test(t) && ye(s))
    ? !1
    : t in e
}
const Jr = (e) => {
  const t = e.props['onUpdate:modelValue'] || !1
  return U(t) ? (s) => Ls(t, s) : t
}
function _c(e) {
  e.target.composing = !0
}
function Zr(e) {
  const t = e.target
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event('input')))
}
const hi = Symbol('_assign'),
  Dm = {
    created(e, { modifiers: { lazy: t, trim: s, number: i } }, r) {
      e[hi] = Jr(r)
      const n = i || (r.props && r.props.type === 'number')
      zt(e, t ? 'change' : 'input', (o) => {
        if (o.target.composing) return
        let a = e.value
        s && (a = a.trim()), n && (a = Pi(a)), e[hi](a)
      }),
        s &&
          zt(e, 'change', () => {
            e.value = e.value.trim()
          }),
        t ||
          (zt(e, 'compositionstart', _c),
          zt(e, 'compositionend', Zr),
          zt(e, 'change', Zr))
    },
    mounted(e, { value: t }) {
      e.value = t ?? ''
    },
    beforeUpdate(
      e,
      { value: t, modifiers: { lazy: s, trim: i, number: r } },
      n
    ) {
      if (((e[hi] = Jr(n)), e.composing)) return
      const o = r || e.type === 'number' ? Pi(e.value) : e.value,
        a = t ?? ''
      o !== a &&
        ((document.activeElement === e &&
          e.type !== 'range' &&
          (s || (i && e.value.trim() === a))) ||
          (e.value = a))
    },
  },
  Sc = ['ctrl', 'shift', 'alt', 'meta'],
  Tc = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => 'button' in e && e.button !== 0,
    middle: (e) => 'button' in e && e.button !== 1,
    right: (e) => 'button' in e && e.button !== 2,
    exact: (e, t) => Sc.some((s) => e[`${s}Key`] && !t.includes(s)),
  },
  Ec =
    (e, t) =>
    (s, ...i) => {
      for (let r = 0; r < t.length; r++) {
        const n = Tc[t[r]]
        if (n && n(s, t)) return
      }
      return e(s, ...i)
    },
  Pc = Pe({ patchProp: wc }, oc)
let en
function Cc() {
  return en || (en = Ba(Pc))
}
const Ic = (...e) => {
  const t = Cc().createApp(...e),
    { mount: s } = t
  return (
    (t.mount = (i) => {
      const r = Mc(i)
      if (!r) return
      const n = t._component
      !Q(n) && !n.render && !n.template && (n.template = r.innerHTML),
        (r.innerHTML = '')
      const o = s(r, !1, r instanceof SVGElement)
      return (
        r instanceof Element &&
          (r.removeAttribute('v-cloak'), r.setAttribute('data-v-app', '')),
        o
      )
    }),
    t
  )
}
function Mc(e) {
  return ye(e) ? document.querySelector(e) : e
}
/*!
 * vue-router v4.2.5
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ const $t = typeof window < 'u'
function Oc(e) {
  return e.__esModule || e[Symbol.toStringTag] === 'Module'
}
const ne = Object.assign
function mi(e, t) {
  const s = {}
  for (const i in t) {
    const r = t[i]
    s[i] = Ke(r) ? r.map(e) : e(r)
  }
  return s
}
const us = () => {},
  Ke = Array.isArray,
  Ac = /\/$/,
  Lc = (e) => e.replace(Ac, '')
function gi(e, t, s = '/') {
  let i,
    r = {},
    n = '',
    o = ''
  const a = t.indexOf('#')
  let l = t.indexOf('?')
  return (
    a < l && a >= 0 && (l = -1),
    l > -1 &&
      ((i = t.slice(0, l)),
      (n = t.slice(l + 1, a > -1 ? a : t.length)),
      (r = e(n))),
    a > -1 && ((i = i || t.slice(0, a)), (o = t.slice(a, t.length))),
    (i = $c(i ?? t, s)),
    { fullPath: i + (n && '?') + n + o, path: i, query: r, hash: o }
  )
}
function Rc(e, t) {
  const s = t.query ? e(t.query) : ''
  return t.path + (s && '?') + s + (t.hash || '')
}
function tn(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || '/'
}
function kc(e, t, s) {
  const i = t.matched.length - 1,
    r = s.matched.length - 1
  return (
    i > -1 &&
    i === r &&
    Wt(t.matched[i], s.matched[r]) &&
    So(t.params, s.params) &&
    e(t.query) === e(s.query) &&
    t.hash === s.hash
  )
}
function Wt(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t)
}
function So(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1
  for (const s in e) if (!zc(e[s], t[s])) return !1
  return !0
}
function zc(e, t) {
  return Ke(e) ? sn(e, t) : Ke(t) ? sn(t, e) : e === t
}
function sn(e, t) {
  return Ke(t)
    ? e.length === t.length && e.every((s, i) => s === t[i])
    : e.length === 1 && e[0] === t
}
function $c(e, t) {
  if (e.startsWith('/')) return e
  if (!e) return t
  const s = t.split('/'),
    i = e.split('/'),
    r = i[i.length - 1]
  ;(r === '..' || r === '.') && i.push('')
  let n = s.length - 1,
    o,
    a
  for (o = 0; o < i.length; o++)
    if (((a = i[o]), a !== '.'))
      if (a === '..') n > 1 && n--
      else break
  return (
    s.slice(0, n).join('/') +
    '/' +
    i.slice(o - (o === i.length ? 1 : 0)).join('/')
  )
}
var vs
;(function (e) {
  ;(e.pop = 'pop'), (e.push = 'push')
})(vs || (vs = {}))
var ds
;(function (e) {
  ;(e.back = 'back'), (e.forward = 'forward'), (e.unknown = '')
})(ds || (ds = {}))
function Dc(e) {
  if (!e)
    if ($t) {
      const t = document.querySelector('base')
      ;(e = (t && t.getAttribute('href')) || '/'),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ''))
    } else e = '/'
  return e[0] !== '/' && e[0] !== '#' && (e = '/' + e), Lc(e)
}
const Bc = /^[^#]+#/
function jc(e, t) {
  return e.replace(Bc, '#') + t
}
function Nc(e, t) {
  const s = document.documentElement.getBoundingClientRect(),
    i = e.getBoundingClientRect()
  return {
    behavior: t.behavior,
    left: i.left - s.left - (t.left || 0),
    top: i.top - s.top - (t.top || 0),
  }
}
const li = () => ({ left: window.pageXOffset, top: window.pageYOffset })
function Fc(e) {
  let t
  if ('el' in e) {
    const s = e.el,
      i = typeof s == 'string' && s.startsWith('#'),
      r =
        typeof s == 'string'
          ? i
            ? document.getElementById(s.slice(1))
            : document.querySelector(s)
          : s
    if (!r) return
    t = Nc(r, e)
  } else t = e
  'scrollBehavior' in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset
      )
}
function rn(e, t) {
  return (history.state ? history.state.position - t : -1) + e
}
const ji = new Map()
function Hc(e, t) {
  ji.set(e, t)
}
function Vc(e) {
  const t = ji.get(e)
  return ji.delete(e), t
}
let qc = () => location.protocol + '//' + location.host
function To(e, t) {
  const { pathname: s, search: i, hash: r } = t,
    n = e.indexOf('#')
  if (n > -1) {
    let a = r.includes(e.slice(n)) ? e.slice(n).length : 1,
      l = r.slice(a)
    return l[0] !== '/' && (l = '/' + l), tn(l, '')
  }
  return tn(s, e) + i + r
}
function Gc(e, t, s, i) {
  let r = [],
    n = [],
    o = null
  const a = ({ state: f }) => {
    const p = To(e, location),
      g = s.value,
      x = t.value
    let I = 0
    if (f) {
      if (((s.value = p), (t.value = f), o && o === g)) {
        o = null
        return
      }
      I = x ? f.position - x.position : 0
    } else i(p)
    r.forEach((b) => {
      b(s.value, g, {
        delta: I,
        type: vs.pop,
        direction: I ? (I > 0 ? ds.forward : ds.back) : ds.unknown,
      })
    })
  }
  function l() {
    o = s.value
  }
  function u(f) {
    r.push(f)
    const p = () => {
      const g = r.indexOf(f)
      g > -1 && r.splice(g, 1)
    }
    return n.push(p), p
  }
  function c() {
    const { history: f } = window
    f.state && f.replaceState(ne({}, f.state, { scroll: li() }), '')
  }
  function d() {
    for (const f of n) f()
    ;(n = []),
      window.removeEventListener('popstate', a),
      window.removeEventListener('beforeunload', c)
  }
  return (
    window.addEventListener('popstate', a),
    window.addEventListener('beforeunload', c, { passive: !0 }),
    { pauseListeners: l, listen: u, destroy: d }
  )
}
function nn(e, t, s, i = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: s,
    replaced: i,
    position: window.history.length,
    scroll: r ? li() : null,
  }
}
function Wc(e) {
  const { history: t, location: s } = window,
    i = { value: To(e, s) },
    r = { value: t.state }
  r.value ||
    n(
      i.value,
      {
        back: null,
        current: i.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0
    )
  function n(l, u, c) {
    const d = e.indexOf('#'),
      f =
        d > -1
          ? (s.host && document.querySelector('base') ? e : e.slice(d)) + l
          : qc() + e + l
    try {
      t[c ? 'replaceState' : 'pushState'](u, '', f), (r.value = u)
    } catch (p) {
      console.error(p), s[c ? 'replace' : 'assign'](f)
    }
  }
  function o(l, u) {
    const c = ne({}, t.state, nn(r.value.back, l, r.value.forward, !0), u, {
      position: r.value.position,
    })
    n(l, c, !0), (i.value = l)
  }
  function a(l, u) {
    const c = ne({}, r.value, t.state, { forward: l, scroll: li() })
    n(c.current, c, !0)
    const d = ne({}, nn(i.value, l, null), { position: c.position + 1 }, u)
    n(l, d, !1), (i.value = l)
  }
  return { location: i, state: r, push: a, replace: o }
}
function Uc(e) {
  e = Dc(e)
  const t = Wc(e),
    s = Gc(e, t.state, t.location, t.replace)
  function i(n, o = !0) {
    o || s.pauseListeners(), history.go(n)
  }
  const r = ne(
    { location: '', base: e, go: i, createHref: jc.bind(null, e) },
    t,
    s
  )
  return (
    Object.defineProperty(r, 'location', {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(r, 'state', {
      enumerable: !0,
      get: () => t.state.value,
    }),
    r
  )
}
function Kc(e) {
  return typeof e == 'string' || (e && typeof e == 'object')
}
function Eo(e) {
  return typeof e == 'string' || typeof e == 'symbol'
}
const ft = {
    path: '/',
    name: void 0,
    params: {},
    query: {},
    hash: '',
    fullPath: '/',
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  Po = Symbol('')
var on
;(function (e) {
  ;(e[(e.aborted = 4)] = 'aborted'),
    (e[(e.cancelled = 8)] = 'cancelled'),
    (e[(e.duplicated = 16)] = 'duplicated')
})(on || (on = {}))
function Ut(e, t) {
  return ne(new Error(), { type: e, [Po]: !0 }, t)
}
function tt(e, t) {
  return e instanceof Error && Po in e && (t == null || !!(e.type & t))
}
const ln = '[^/]+?',
  Yc = { sensitive: !1, strict: !1, start: !0, end: !0 },
  Xc = /[.+*?^${}()[\]/\\]/g
function Qc(e, t) {
  const s = ne({}, Yc, t),
    i = []
  let r = s.start ? '^' : ''
  const n = []
  for (const u of e) {
    const c = u.length ? [] : [90]
    s.strict && !u.length && (r += '/')
    for (let d = 0; d < u.length; d++) {
      const f = u[d]
      let p = 40 + (s.sensitive ? 0.25 : 0)
      if (f.type === 0)
        d || (r += '/'), (r += f.value.replace(Xc, '\\$&')), (p += 40)
      else if (f.type === 1) {
        const { value: g, repeatable: x, optional: I, regexp: b } = f
        n.push({ name: g, repeatable: x, optional: I })
        const E = b || ln
        if (E !== ln) {
          p += 10
          try {
            new RegExp(`(${E})`)
          } catch (y) {
            throw new Error(
              `Invalid custom RegExp for param "${g}" (${E}): ` + y.message
            )
          }
        }
        let w = x ? `((?:${E})(?:/(?:${E}))*)` : `(${E})`
        d || (w = I && u.length < 2 ? `(?:/${w})` : '/' + w),
          I && (w += '?'),
          (r += w),
          (p += 20),
          I && (p += -8),
          x && (p += -20),
          E === '.*' && (p += -50)
      }
      c.push(p)
    }
    i.push(c)
  }
  if (s.strict && s.end) {
    const u = i.length - 1
    i[u][i[u].length - 1] += 0.7000000000000001
  }
  s.strict || (r += '/?'), s.end ? (r += '$') : s.strict && (r += '(?:/|$)')
  const o = new RegExp(r, s.sensitive ? '' : 'i')
  function a(u) {
    const c = u.match(o),
      d = {}
    if (!c) return null
    for (let f = 1; f < c.length; f++) {
      const p = c[f] || '',
        g = n[f - 1]
      d[g.name] = p && g.repeatable ? p.split('/') : p
    }
    return d
  }
  function l(u) {
    let c = '',
      d = !1
    for (const f of e) {
      ;(!d || !c.endsWith('/')) && (c += '/'), (d = !1)
      for (const p of f)
        if (p.type === 0) c += p.value
        else if (p.type === 1) {
          const { value: g, repeatable: x, optional: I } = p,
            b = g in u ? u[g] : ''
          if (Ke(b) && !x)
            throw new Error(
              `Provided param "${g}" is an array but it is not repeatable (* or + modifiers)`
            )
          const E = Ke(b) ? b.join('/') : b
          if (!E)
            if (I)
              f.length < 2 &&
                (c.endsWith('/') ? (c = c.slice(0, -1)) : (d = !0))
            else throw new Error(`Missing required param "${g}"`)
          c += E
        }
    }
    return c || '/'
  }
  return { re: o, score: i, keys: n, parse: a, stringify: l }
}
function Jc(e, t) {
  let s = 0
  for (; s < e.length && s < t.length; ) {
    const i = t[s] - e[s]
    if (i) return i
    s++
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
    ? t.length === 1 && t[0] === 40 + 40
      ? 1
      : -1
    : 0
}
function Zc(e, t) {
  let s = 0
  const i = e.score,
    r = t.score
  for (; s < i.length && s < r.length; ) {
    const n = Jc(i[s], r[s])
    if (n) return n
    s++
  }
  if (Math.abs(r.length - i.length) === 1) {
    if (an(i)) return 1
    if (an(r)) return -1
  }
  return r.length - i.length
}
function an(e) {
  const t = e[e.length - 1]
  return e.length > 0 && t[t.length - 1] < 0
}
const eu = { type: 0, value: '' },
  tu = /[a-zA-Z0-9_]/
function su(e) {
  if (!e) return [[]]
  if (e === '/') return [[eu]]
  if (!e.startsWith('/')) throw new Error(`Invalid path "${e}"`)
  function t(p) {
    throw new Error(`ERR (${s})/"${u}": ${p}`)
  }
  let s = 0,
    i = s
  const r = []
  let n
  function o() {
    n && r.push(n), (n = [])
  }
  let a = 0,
    l,
    u = '',
    c = ''
  function d() {
    u &&
      (s === 0
        ? n.push({ type: 0, value: u })
        : s === 1 || s === 2 || s === 3
        ? (n.length > 1 &&
            (l === '*' || l === '+') &&
            t(
              `A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`
            ),
          n.push({
            type: 1,
            value: u,
            regexp: c,
            repeatable: l === '*' || l === '+',
            optional: l === '*' || l === '?',
          }))
        : t('Invalid state to consume buffer'),
      (u = ''))
  }
  function f() {
    u += l
  }
  for (; a < e.length; ) {
    if (((l = e[a++]), l === '\\' && s !== 2)) {
      ;(i = s), (s = 4)
      continue
    }
    switch (s) {
      case 0:
        l === '/' ? (u && d(), o()) : l === ':' ? (d(), (s = 1)) : f()
        break
      case 4:
        f(), (s = i)
        break
      case 1:
        l === '('
          ? (s = 2)
          : tu.test(l)
          ? f()
          : (d(), (s = 0), l !== '*' && l !== '?' && l !== '+' && a--)
        break
      case 2:
        l === ')'
          ? c[c.length - 1] == '\\'
            ? (c = c.slice(0, -1) + l)
            : (s = 3)
          : (c += l)
        break
      case 3:
        d(), (s = 0), l !== '*' && l !== '?' && l !== '+' && a--, (c = '')
        break
      default:
        t('Unknown state')
        break
    }
  }
  return s === 2 && t(`Unfinished custom RegExp for param "${u}"`), d(), o(), r
}
function iu(e, t, s) {
  const i = Qc(su(e.path), s),
    r = ne(i, { record: e, parent: t, children: [], alias: [] })
  return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r
}
function ru(e, t) {
  const s = [],
    i = new Map()
  t = dn({ strict: !1, end: !0, sensitive: !1 }, t)
  function r(c) {
    return i.get(c)
  }
  function n(c, d, f) {
    const p = !f,
      g = nu(c)
    g.aliasOf = f && f.record
    const x = dn(t, c),
      I = [g]
    if ('alias' in c) {
      const w = typeof c.alias == 'string' ? [c.alias] : c.alias
      for (const y of w)
        I.push(
          ne({}, g, {
            components: f ? f.record.components : g.components,
            path: y,
            aliasOf: f ? f.record : g,
          })
        )
    }
    let b, E
    for (const w of I) {
      const { path: y } = w
      if (d && y[0] !== '/') {
        const L = d.record.path,
          N = L[L.length - 1] === '/' ? '' : '/'
        w.path = d.record.path + (y && N + y)
      }
      if (
        ((b = iu(w, d, x)),
        f
          ? f.alias.push(b)
          : ((E = E || b),
            E !== b && E.alias.push(b),
            p && c.name && !un(b) && o(c.name)),
        g.children)
      ) {
        const L = g.children
        for (let N = 0; N < L.length; N++) n(L[N], b, f && f.children[N])
      }
      ;(f = f || b),
        ((b.record.components && Object.keys(b.record.components).length) ||
          b.record.name ||
          b.record.redirect) &&
          l(b)
    }
    return E
      ? () => {
          o(E)
        }
      : us
  }
  function o(c) {
    if (Eo(c)) {
      const d = i.get(c)
      d &&
        (i.delete(c),
        s.splice(s.indexOf(d), 1),
        d.children.forEach(o),
        d.alias.forEach(o))
    } else {
      const d = s.indexOf(c)
      d > -1 &&
        (s.splice(d, 1),
        c.record.name && i.delete(c.record.name),
        c.children.forEach(o),
        c.alias.forEach(o))
    }
  }
  function a() {
    return s
  }
  function l(c) {
    let d = 0
    for (
      ;
      d < s.length &&
      Zc(c, s[d]) >= 0 &&
      (c.record.path !== s[d].record.path || !Co(c, s[d]));

    )
      d++
    s.splice(d, 0, c), c.record.name && !un(c) && i.set(c.record.name, c)
  }
  function u(c, d) {
    let f,
      p = {},
      g,
      x
    if ('name' in c && c.name) {
      if (((f = i.get(c.name)), !f)) throw Ut(1, { location: c })
      ;(x = f.record.name),
        (p = ne(
          cn(
            d.params,
            f.keys.filter((E) => !E.optional).map((E) => E.name)
          ),
          c.params &&
            cn(
              c.params,
              f.keys.map((E) => E.name)
            )
        )),
        (g = f.stringify(p))
    } else if ('path' in c)
      (g = c.path),
        (f = s.find((E) => E.re.test(g))),
        f && ((p = f.parse(g)), (x = f.record.name))
    else {
      if (((f = d.name ? i.get(d.name) : s.find((E) => E.re.test(d.path))), !f))
        throw Ut(1, { location: c, currentLocation: d })
      ;(x = f.record.name),
        (p = ne({}, d.params, c.params)),
        (g = f.stringify(p))
    }
    const I = []
    let b = f
    for (; b; ) I.unshift(b.record), (b = b.parent)
    return { name: x, path: g, params: p, matched: I, meta: lu(I) }
  }
  return (
    e.forEach((c) => n(c)),
    {
      addRoute: n,
      resolve: u,
      removeRoute: o,
      getRoutes: a,
      getRecordMatcher: r,
    }
  )
}
function cn(e, t) {
  const s = {}
  for (const i of t) i in e && (s[i] = e[i])
  return s
}
function nu(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: ou(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      'components' in e
        ? e.components || null
        : e.component && { default: e.component },
  }
}
function ou(e) {
  const t = {},
    s = e.props || !1
  if ('component' in e) t.default = s
  else for (const i in e.components) t[i] = typeof s == 'object' ? s[i] : s
  return t
}
function un(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0
    e = e.parent
  }
  return !1
}
function lu(e) {
  return e.reduce((t, s) => ne(t, s.meta), {})
}
function dn(e, t) {
  const s = {}
  for (const i in e) s[i] = i in t ? t[i] : e[i]
  return s
}
function Co(e, t) {
  return t.children.some((s) => s === e || Co(e, s))
}
const Io = /#/g,
  au = /&/g,
  cu = /\//g,
  uu = /=/g,
  du = /\?/g,
  Mo = /\+/g,
  fu = /%5B/g,
  pu = /%5D/g,
  Oo = /%5E/g,
  hu = /%60/g,
  Ao = /%7B/g,
  mu = /%7C/g,
  Lo = /%7D/g,
  gu = /%20/g
function hr(e) {
  return encodeURI('' + e)
    .replace(mu, '|')
    .replace(fu, '[')
    .replace(pu, ']')
}
function vu(e) {
  return hr(e).replace(Ao, '{').replace(Lo, '}').replace(Oo, '^')
}
function Ni(e) {
  return hr(e)
    .replace(Mo, '%2B')
    .replace(gu, '+')
    .replace(Io, '%23')
    .replace(au, '%26')
    .replace(hu, '`')
    .replace(Ao, '{')
    .replace(Lo, '}')
    .replace(Oo, '^')
}
function bu(e) {
  return Ni(e).replace(uu, '%3D')
}
function xu(e) {
  return hr(e).replace(Io, '%23').replace(du, '%3F')
}
function wu(e) {
  return e == null ? '' : xu(e).replace(cu, '%2F')
}
function qs(e) {
  try {
    return decodeURIComponent('' + e)
  } catch {}
  return '' + e
}
function yu(e) {
  const t = {}
  if (e === '' || e === '?') return t
  const i = (e[0] === '?' ? e.slice(1) : e).split('&')
  for (let r = 0; r < i.length; ++r) {
    const n = i[r].replace(Mo, ' '),
      o = n.indexOf('='),
      a = qs(o < 0 ? n : n.slice(0, o)),
      l = o < 0 ? null : qs(n.slice(o + 1))
    if (a in t) {
      let u = t[a]
      Ke(u) || (u = t[a] = [u]), u.push(l)
    } else t[a] = l
  }
  return t
}
function fn(e) {
  let t = ''
  for (let s in e) {
    const i = e[s]
    if (((s = bu(s)), i == null)) {
      i !== void 0 && (t += (t.length ? '&' : '') + s)
      continue
    }
    ;(Ke(i) ? i.map((n) => n && Ni(n)) : [i && Ni(i)]).forEach((n) => {
      n !== void 0 &&
        ((t += (t.length ? '&' : '') + s), n != null && (t += '=' + n))
    })
  }
  return t
}
function _u(e) {
  const t = {}
  for (const s in e) {
    const i = e[s]
    i !== void 0 &&
      (t[s] = Ke(i)
        ? i.map((r) => (r == null ? null : '' + r))
        : i == null
        ? i
        : '' + i)
  }
  return t
}
const Su = Symbol(''),
  pn = Symbol(''),
  mr = Symbol(''),
  Ro = Symbol(''),
  Fi = Symbol('')
function rs() {
  let e = []
  function t(i) {
    return (
      e.push(i),
      () => {
        const r = e.indexOf(i)
        r > -1 && e.splice(r, 1)
      }
    )
  }
  function s() {
    e = []
  }
  return { add: t, list: () => e.slice(), reset: s }
}
function ht(e, t, s, i, r) {
  const n = i && (i.enterCallbacks[r] = i.enterCallbacks[r] || [])
  return () =>
    new Promise((o, a) => {
      const l = (d) => {
          d === !1
            ? a(Ut(4, { from: s, to: t }))
            : d instanceof Error
            ? a(d)
            : Kc(d)
            ? a(Ut(2, { from: t, to: d }))
            : (n &&
                i.enterCallbacks[r] === n &&
                typeof d == 'function' &&
                n.push(d),
              o())
        },
        u = e.call(i && i.instances[r], t, s, l)
      let c = Promise.resolve(u)
      e.length < 3 && (c = c.then(l)), c.catch((d) => a(d))
    })
}
function vi(e, t, s, i) {
  const r = []
  for (const n of e)
    for (const o in n.components) {
      let a = n.components[o]
      if (!(t !== 'beforeRouteEnter' && !n.instances[o]))
        if (Tu(a)) {
          const u = (a.__vccOpts || a)[t]
          u && r.push(ht(u, s, i, n, o))
        } else {
          let l = a()
          r.push(() =>
            l.then((u) => {
              if (!u)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${o}" at "${n.path}"`)
                )
              const c = Oc(u) ? u.default : u
              n.components[o] = c
              const f = (c.__vccOpts || c)[t]
              return f && ht(f, s, i, n, o)()
            })
          )
        }
    }
  return r
}
function Tu(e) {
  return (
    typeof e == 'object' ||
    'displayName' in e ||
    'props' in e ||
    '__vccOpts' in e
  )
}
function hn(e) {
  const t = ot(mr),
    s = ot(Ro),
    i = Te(() => t.resolve(Re(e.to))),
    r = Te(() => {
      const { matched: l } = i.value,
        { length: u } = l,
        c = l[u - 1],
        d = s.matched
      if (!c || !d.length) return -1
      const f = d.findIndex(Wt.bind(null, c))
      if (f > -1) return f
      const p = mn(l[u - 2])
      return u > 1 && mn(c) === p && d[d.length - 1].path !== p
        ? d.findIndex(Wt.bind(null, l[u - 2]))
        : f
    }),
    n = Te(() => r.value > -1 && Iu(s.params, i.value.params)),
    o = Te(
      () =>
        r.value > -1 &&
        r.value === s.matched.length - 1 &&
        So(s.params, i.value.params)
    )
  function a(l = {}) {
    return Cu(l)
      ? t[Re(e.replace) ? 'replace' : 'push'](Re(e.to)).catch(us)
      : Promise.resolve()
  }
  return {
    route: i,
    href: Te(() => i.value.href),
    isActive: n,
    isExactActive: o,
    navigate: a,
  }
}
const Eu = io({
    name: 'RouterLink',
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: 'page' },
    },
    useLink: hn,
    setup(e, { slots: t }) {
      const s = Js(hn(e)),
        { options: i } = ot(mr),
        r = Te(() => ({
          [gn(e.activeClass, i.linkActiveClass, 'router-link-active')]:
            s.isActive,
          [gn(
            e.exactActiveClass,
            i.linkExactActiveClass,
            'router-link-exact-active'
          )]: s.isExactActive,
        }))
      return () => {
        const n = t.default && t.default(s)
        return e.custom
          ? n
          : je(
              'a',
              {
                'aria-current': s.isExactActive ? e.ariaCurrentValue : null,
                href: s.href,
                onClick: s.navigate,
                class: r.value,
              },
              n
            )
      }
    },
  }),
  Pu = Eu
function Cu(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute('target')
      if (/\b_blank\b/i.test(t)) return
    }
    return e.preventDefault && e.preventDefault(), !0
  }
}
function Iu(e, t) {
  for (const s in t) {
    const i = t[s],
      r = e[s]
    if (typeof i == 'string') {
      if (i !== r) return !1
    } else if (!Ke(r) || r.length !== i.length || i.some((n, o) => n !== r[o]))
      return !1
  }
  return !0
}
function mn(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : ''
}
const gn = (e, t, s) => e ?? t ?? s,
  Mu = io({
    name: 'RouterView',
    inheritAttrs: !1,
    props: { name: { type: String, default: 'default' }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: s }) {
      const i = ot(Fi),
        r = Te(() => e.route || i.value),
        n = ot(pn, 0),
        o = Te(() => {
          let u = Re(n)
          const { matched: c } = r.value
          let d
          for (; (d = c[u]) && !d.components; ) u++
          return u
        }),
        a = Te(() => r.value.matched[o.value])
      Ft(
        pn,
        Te(() => o.value + 1)
      ),
        Ft(Su, a),
        Ft(Fi, r)
      const l = ge()
      return (
        bt(
          () => [l.value, a.value, e.name],
          ([u, c, d], [f, p, g]) => {
            c &&
              ((c.instances[d] = u),
              p &&
                p !== c &&
                u &&
                u === f &&
                (c.leaveGuards.size || (c.leaveGuards = p.leaveGuards),
                c.updateGuards.size || (c.updateGuards = p.updateGuards))),
              u &&
                c &&
                (!p || !Wt(c, p) || !f) &&
                (c.enterCallbacks[d] || []).forEach((x) => x(u))
          },
          { flush: 'post' }
        ),
        () => {
          const u = r.value,
            c = e.name,
            d = a.value,
            f = d && d.components[c]
          if (!f) return vn(s.default, { Component: f, route: u })
          const p = d.props[c],
            g = p
              ? p === !0
                ? u.params
                : typeof p == 'function'
                ? p(u)
                : p
              : null,
            I = je(
              f,
              ne({}, g, t, {
                onVnodeUnmounted: (b) => {
                  b.component.isUnmounted && (d.instances[c] = null)
                },
                ref: l,
              })
            )
          return vn(s.default, { Component: I, route: u }) || I
        }
      )
    },
  })
function vn(e, t) {
  if (!e) return null
  const s = e(t)
  return s.length === 1 ? s[0] : s
}
const Ou = Mu
function Au(e) {
  const t = ru(e.routes, e),
    s = e.parseQuery || yu,
    i = e.stringifyQuery || fn,
    r = e.history,
    n = rs(),
    o = rs(),
    a = rs(),
    l = Un(ft)
  let u = ft
  $t &&
    e.scrollBehavior &&
    'scrollRestoration' in history &&
    (history.scrollRestoration = 'manual')
  const c = mi.bind(null, (P) => '' + P),
    d = mi.bind(null, wu),
    f = mi.bind(null, qs)
  function p(P, j) {
    let $, q
    return (
      Eo(P) ? (($ = t.getRecordMatcher(P)), (q = j)) : (q = P), t.addRoute(q, $)
    )
  }
  function g(P) {
    const j = t.getRecordMatcher(P)
    j && t.removeRoute(j)
  }
  function x() {
    return t.getRoutes().map((P) => P.record)
  }
  function I(P) {
    return !!t.getRecordMatcher(P)
  }
  function b(P, j) {
    if (((j = ne({}, j || l.value)), typeof P == 'string')) {
      const v = gi(s, P, j.path),
        S = t.resolve({ path: v.path }, j),
        M = r.createHref(v.fullPath)
      return ne(v, S, {
        params: f(S.params),
        hash: qs(v.hash),
        redirectedFrom: void 0,
        href: M,
      })
    }
    let $
    if ('path' in P) $ = ne({}, P, { path: gi(s, P.path, j.path).path })
    else {
      const v = ne({}, P.params)
      for (const S in v) v[S] == null && delete v[S]
      ;($ = ne({}, P, { params: d(v) })), (j.params = d(j.params))
    }
    const q = t.resolve($, j),
      ie = P.hash || ''
    q.params = c(f(q.params))
    const h = Rc(i, ne({}, P, { hash: vu(ie), path: q.path })),
      m = r.createHref(h)
    return ne(
      { fullPath: h, hash: ie, query: i === fn ? _u(P.query) : P.query || {} },
      q,
      { redirectedFrom: void 0, href: m }
    )
  }
  function E(P) {
    return typeof P == 'string' ? gi(s, P, l.value.path) : ne({}, P)
  }
  function w(P, j) {
    if (u !== P) return Ut(8, { from: j, to: P })
  }
  function y(P) {
    return J(P)
  }
  function L(P) {
    return y(ne(E(P), { replace: !0 }))
  }
  function N(P) {
    const j = P.matched[P.matched.length - 1]
    if (j && j.redirect) {
      const { redirect: $ } = j
      let q = typeof $ == 'function' ? $(P) : $
      return (
        typeof q == 'string' &&
          ((q = q.includes('?') || q.includes('#') ? (q = E(q)) : { path: q }),
          (q.params = {})),
        ne(
          { query: P.query, hash: P.hash, params: 'path' in q ? {} : P.params },
          q
        )
      )
    }
  }
  function J(P, j) {
    const $ = (u = b(P)),
      q = l.value,
      ie = P.state,
      h = P.force,
      m = P.replace === !0,
      v = N($)
    if (v)
      return J(
        ne(E(v), {
          state: typeof v == 'object' ? ne({}, ie, v.state) : ie,
          force: h,
          replace: m,
        }),
        j || $
      )
    const S = $
    S.redirectedFrom = j
    let M
    return (
      !h && kc(i, q, $) && ((M = Ut(16, { to: S, from: q })), _e(q, q, !0, !1)),
      (M ? Promise.resolve(M) : C(S, q))
        .catch((O) => (tt(O) ? (tt(O, 2) ? O : fe(O)) : F(O, S, q)))
        .then((O) => {
          if (O) {
            if (tt(O, 2))
              return J(
                ne({ replace: m }, E(O.to), {
                  state: typeof O.to == 'object' ? ne({}, ie, O.to.state) : ie,
                  force: h,
                }),
                j || S
              )
          } else O = K(S, q, !0, m, ie)
          return D(S, q, O), O
        })
    )
  }
  function k(P, j) {
    const $ = w(P, j)
    return $ ? Promise.reject($) : Promise.resolve()
  }
  function T(P) {
    const j = Lt.values().next().value
    return j && typeof j.runWithContext == 'function'
      ? j.runWithContext(P)
      : P()
  }
  function C(P, j) {
    let $
    const [q, ie, h] = Lu(P, j)
    $ = vi(q.reverse(), 'beforeRouteLeave', P, j)
    for (const v of q)
      v.leaveGuards.forEach((S) => {
        $.push(ht(S, P, j))
      })
    const m = k.bind(null, P, j)
    return (
      $.push(m),
      Ce($)
        .then(() => {
          $ = []
          for (const v of n.list()) $.push(ht(v, P, j))
          return $.push(m), Ce($)
        })
        .then(() => {
          $ = vi(ie, 'beforeRouteUpdate', P, j)
          for (const v of ie)
            v.updateGuards.forEach((S) => {
              $.push(ht(S, P, j))
            })
          return $.push(m), Ce($)
        })
        .then(() => {
          $ = []
          for (const v of h)
            if (v.beforeEnter)
              if (Ke(v.beforeEnter))
                for (const S of v.beforeEnter) $.push(ht(S, P, j))
              else $.push(ht(v.beforeEnter, P, j))
          return $.push(m), Ce($)
        })
        .then(
          () => (
            P.matched.forEach((v) => (v.enterCallbacks = {})),
            ($ = vi(h, 'beforeRouteEnter', P, j)),
            $.push(m),
            Ce($)
          )
        )
        .then(() => {
          $ = []
          for (const v of o.list()) $.push(ht(v, P, j))
          return $.push(m), Ce($)
        })
        .catch((v) => (tt(v, 8) ? v : Promise.reject(v)))
    )
  }
  function D(P, j, $) {
    a.list().forEach((q) => T(() => q(P, j, $)))
  }
  function K(P, j, $, q, ie) {
    const h = w(P, j)
    if (h) return h
    const m = j === ft,
      v = $t ? history.state : {}
    $ &&
      (q || m
        ? r.replace(P.fullPath, ne({ scroll: m && v && v.scroll }, ie))
        : r.push(P.fullPath, ie)),
      (l.value = P),
      _e(P, j, $, m),
      fe()
  }
  let V
  function le() {
    V ||
      (V = r.listen((P, j, $) => {
        if (!ws.listening) return
        const q = b(P),
          ie = N(q)
        if (ie) {
          J(ne(ie, { replace: !0 }), q).catch(us)
          return
        }
        u = q
        const h = l.value
        $t && Hc(rn(h.fullPath, $.delta), li()),
          C(q, h)
            .catch((m) =>
              tt(m, 12)
                ? m
                : tt(m, 2)
                ? (J(m.to, q)
                    .then((v) => {
                      tt(v, 20) && !$.delta && $.type === vs.pop && r.go(-1, !1)
                    })
                    .catch(us),
                  Promise.reject())
                : ($.delta && r.go(-$.delta, !1), F(m, q, h))
            )
            .then((m) => {
              ;(m = m || K(q, h, !1)),
                m &&
                  ($.delta && !tt(m, 8)
                    ? r.go(-$.delta, !1)
                    : $.type === vs.pop && tt(m, 20) && r.go(-1, !1)),
                D(q, h, m)
            })
            .catch(us)
      }))
  }
  let pe = rs(),
    re = rs(),
    se
  function F(P, j, $) {
    fe(P)
    const q = re.list()
    return (
      q.length ? q.forEach((ie) => ie(P, j, $)) : console.error(P),
      Promise.reject(P)
    )
  }
  function me() {
    return se && l.value !== ft
      ? Promise.resolve()
      : new Promise((P, j) => {
          pe.add([P, j])
        })
  }
  function fe(P) {
    return (
      se ||
        ((se = !P),
        le(),
        pe.list().forEach(([j, $]) => (P ? $(P) : j())),
        pe.reset()),
      P
    )
  }
  function _e(P, j, $, q) {
    const { scrollBehavior: ie } = e
    if (!$t || !ie) return Promise.resolve()
    const h =
      (!$ && Vc(rn(P.fullPath, 0))) ||
      ((q || !$) && history.state && history.state.scroll) ||
      null
    return bs()
      .then(() => ie(P, j, h))
      .then((m) => m && Fc(m))
      .catch((m) => F(m, P, j))
  }
  const xe = (P) => r.go(P)
  let At
  const Lt = new Set(),
    ws = {
      currentRoute: l,
      listening: !0,
      addRoute: p,
      removeRoute: g,
      hasRoute: I,
      getRoutes: x,
      resolve: b,
      options: e,
      push: y,
      replace: L,
      go: xe,
      back: () => xe(-1),
      forward: () => xe(1),
      beforeEach: n.add,
      beforeResolve: o.add,
      afterEach: a.add,
      onError: re.add,
      isReady: me,
      install(P) {
        const j = this
        P.component('RouterLink', Pu),
          P.component('RouterView', Ou),
          (P.config.globalProperties.$router = j),
          Object.defineProperty(P.config.globalProperties, '$route', {
            enumerable: !0,
            get: () => Re(l),
          }),
          $t &&
            !At &&
            l.value === ft &&
            ((At = !0), y(r.location).catch((ie) => {}))
        const $ = {}
        for (const ie in ft)
          Object.defineProperty($, ie, {
            get: () => l.value[ie],
            enumerable: !0,
          })
        P.provide(mr, j), P.provide(Ro, qn($)), P.provide(Fi, l)
        const q = P.unmount
        Lt.add(P),
          (P.unmount = function () {
            Lt.delete(P),
              Lt.size < 1 &&
                ((u = ft),
                V && V(),
                (V = null),
                (l.value = ft),
                (At = !1),
                (se = !1)),
              q()
          })
      },
    }
  function Ce(P) {
    return P.reduce((j, $) => j.then(() => T($)), Promise.resolve())
  }
  return ws
}
function Lu(e, t) {
  const s = [],
    i = [],
    r = [],
    n = Math.max(t.matched.length, e.matched.length)
  for (let o = 0; o < n; o++) {
    const a = t.matched[o]
    a && (e.matched.find((u) => Wt(u, a)) ? i.push(a) : s.push(a))
    const l = e.matched[o]
    l && (t.matched.find((u) => Wt(u, l)) || r.push(l))
  }
  return [s, i, r]
}
function bn(e) {
  return (
    e !== null &&
    typeof e == 'object' &&
    'constructor' in e &&
    e.constructor === Object
  )
}
function gr(e, t) {
  e === void 0 && (e = {}),
    t === void 0 && (t = {}),
    Object.keys(t).forEach((s) => {
      typeof e[s] > 'u'
        ? (e[s] = t[s])
        : bn(t[s]) && bn(e[s]) && Object.keys(t[s]).length > 0 && gr(e[s], t[s])
    })
}
const ko = {
  body: {},
  addEventListener() {},
  removeEventListener() {},
  activeElement: { blur() {}, nodeName: '' },
  querySelector() {
    return null
  },
  querySelectorAll() {
    return []
  },
  getElementById() {
    return null
  },
  createEvent() {
    return { initEvent() {} }
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName() {
        return []
      },
    }
  },
  createElementNS() {
    return {}
  },
  importNode() {
    return null
  },
  location: {
    hash: '',
    host: '',
    hostname: '',
    href: '',
    origin: '',
    pathname: '',
    protocol: '',
    search: '',
  },
}
function lt() {
  const e = typeof document < 'u' ? document : {}
  return gr(e, ko), e
}
const Ru = {
  document: ko,
  navigator: { userAgent: '' },
  location: {
    hash: '',
    host: '',
    hostname: '',
    href: '',
    origin: '',
    pathname: '',
    protocol: '',
    search: '',
  },
  history: { replaceState() {}, pushState() {}, go() {}, back() {} },
  CustomEvent: function () {
    return this
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle() {
    return {
      getPropertyValue() {
        return ''
      },
    }
  },
  Image() {},
  Date() {},
  screen: {},
  setTimeout() {},
  clearTimeout() {},
  matchMedia() {
    return {}
  },
  requestAnimationFrame(e) {
    return typeof setTimeout > 'u' ? (e(), null) : setTimeout(e, 0)
  },
  cancelAnimationFrame(e) {
    typeof setTimeout > 'u' || clearTimeout(e)
  },
}
function He() {
  const e = typeof window < 'u' ? window : {}
  return gr(e, Ru), e
}
function ku(e) {
  return (
    e === void 0 && (e = ''),
    e
      .trim()
      .split(' ')
      .filter((t) => !!t.trim())
  )
}
function zu(e) {
  const t = e
  Object.keys(t).forEach((s) => {
    try {
      t[s] = null
    } catch {}
    try {
      delete t[s]
    } catch {}
  })
}
function Hi(e, t) {
  return t === void 0 && (t = 0), setTimeout(e, t)
}
function Ct() {
  return Date.now()
}
function $u(e) {
  const t = He()
  let s
  return (
    t.getComputedStyle && (s = t.getComputedStyle(e, null)),
    !s && e.currentStyle && (s = e.currentStyle),
    s || (s = e.style),
    s
  )
}
function Du(e, t) {
  t === void 0 && (t = 'x')
  const s = He()
  let i, r, n
  const o = $u(e)
  return (
    s.WebKitCSSMatrix
      ? ((r = o.transform || o.webkitTransform),
        r.split(',').length > 6 &&
          (r = r
            .split(', ')
            .map((a) => a.replace(',', '.'))
            .join(', ')),
        (n = new s.WebKitCSSMatrix(r === 'none' ? '' : r)))
      : ((n =
          o.MozTransform ||
          o.OTransform ||
          o.MsTransform ||
          o.msTransform ||
          o.transform ||
          o
            .getPropertyValue('transform')
            .replace('translate(', 'matrix(1, 0, 0, 1,')),
        (i = n.toString().split(','))),
    t === 'x' &&
      (s.WebKitCSSMatrix
        ? (r = n.m41)
        : i.length === 16
        ? (r = parseFloat(i[12]))
        : (r = parseFloat(i[4]))),
    t === 'y' &&
      (s.WebKitCSSMatrix
        ? (r = n.m42)
        : i.length === 16
        ? (r = parseFloat(i[13]))
        : (r = parseFloat(i[5]))),
    r || 0
  )
}
function Cs(e) {
  return (
    typeof e == 'object' &&
    e !== null &&
    e.constructor &&
    Object.prototype.toString.call(e).slice(8, -1) === 'Object'
  )
}
function Bu(e) {
  return typeof window < 'u' && typeof window.HTMLElement < 'u'
    ? e instanceof HTMLElement
    : e && (e.nodeType === 1 || e.nodeType === 11)
}
function Be() {
  const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
    t = ['__proto__', 'constructor', 'prototype']
  for (let s = 1; s < arguments.length; s += 1) {
    const i = s < 0 || arguments.length <= s ? void 0 : arguments[s]
    if (i != null && !Bu(i)) {
      const r = Object.keys(Object(i)).filter((n) => t.indexOf(n) < 0)
      for (let n = 0, o = r.length; n < o; n += 1) {
        const a = r[n],
          l = Object.getOwnPropertyDescriptor(i, a)
        l !== void 0 &&
          l.enumerable &&
          (Cs(e[a]) && Cs(i[a])
            ? i[a].__swiper__
              ? (e[a] = i[a])
              : Be(e[a], i[a])
            : !Cs(e[a]) && Cs(i[a])
            ? ((e[a] = {}), i[a].__swiper__ ? (e[a] = i[a]) : Be(e[a], i[a]))
            : (e[a] = i[a]))
      }
    }
  }
  return e
}
function Is(e, t, s) {
  e.style.setProperty(t, s)
}
function zo(e) {
  let { swiper: t, targetPosition: s, side: i } = e
  const r = He(),
    n = -t.translate
  let o = null,
    a
  const l = t.params.speed
  ;(t.wrapperEl.style.scrollSnapType = 'none'),
    r.cancelAnimationFrame(t.cssModeFrameID)
  const u = s > n ? 'next' : 'prev',
    c = (f, p) => (u === 'next' && f >= p) || (u === 'prev' && f <= p),
    d = () => {
      ;(a = new Date().getTime()), o === null && (o = a)
      const f = Math.max(Math.min((a - o) / l, 1), 0),
        p = 0.5 - Math.cos(f * Math.PI) / 2
      let g = n + p * (s - n)
      if ((c(g, s) && (g = s), t.wrapperEl.scrollTo({ [i]: g }), c(g, s))) {
        ;(t.wrapperEl.style.overflow = 'hidden'),
          (t.wrapperEl.style.scrollSnapType = ''),
          setTimeout(() => {
            ;(t.wrapperEl.style.overflow = ''), t.wrapperEl.scrollTo({ [i]: g })
          }),
          r.cancelAnimationFrame(t.cssModeFrameID)
        return
      }
      t.cssModeFrameID = r.requestAnimationFrame(d)
    }
  d()
}
function rt(e, t) {
  return t === void 0 && (t = ''), [...e.children].filter((s) => s.matches(t))
}
function Gs(e) {
  try {
    console.warn(e)
    return
  } catch {}
}
function Vi(e, t) {
  t === void 0 && (t = [])
  const s = document.createElement(e)
  return s.classList.add(...(Array.isArray(t) ? t : ku(t))), s
}
function ju(e, t) {
  const s = []
  for (; e.previousElementSibling; ) {
    const i = e.previousElementSibling
    t ? i.matches(t) && s.push(i) : s.push(i), (e = i)
  }
  return s
}
function Nu(e, t) {
  const s = []
  for (; e.nextElementSibling; ) {
    const i = e.nextElementSibling
    t ? i.matches(t) && s.push(i) : s.push(i), (e = i)
  }
  return s
}
function mt(e, t) {
  return He().getComputedStyle(e, null).getPropertyValue(t)
}
function xn(e) {
  let t = e,
    s
  if (t) {
    for (s = 0; (t = t.previousSibling) !== null; ) t.nodeType === 1 && (s += 1)
    return s
  }
}
function Fu(e, t) {
  const s = []
  let i = e.parentElement
  for (; i; ) t ? i.matches(t) && s.push(i) : s.push(i), (i = i.parentElement)
  return s
}
function bi(e, t) {
  function s(i) {
    i.target === e && (t.call(e, i), e.removeEventListener('transitionend', s))
  }
  t && e.addEventListener('transitionend', s)
}
function wn(e, t, s) {
  const i = He()
  return s
    ? e[t === 'width' ? 'offsetWidth' : 'offsetHeight'] +
        parseFloat(
          i
            .getComputedStyle(e, null)
            .getPropertyValue(t === 'width' ? 'margin-right' : 'margin-top')
        ) +
        parseFloat(
          i
            .getComputedStyle(e, null)
            .getPropertyValue(t === 'width' ? 'margin-left' : 'margin-bottom')
        )
    : e.offsetWidth
}
let xi
function Hu() {
  const e = He(),
    t = lt()
  return {
    smoothScroll:
      t.documentElement &&
      t.documentElement.style &&
      'scrollBehavior' in t.documentElement.style,
    touch: !!(
      'ontouchstart' in e ||
      (e.DocumentTouch && t instanceof e.DocumentTouch)
    ),
  }
}
function $o() {
  return xi || (xi = Hu()), xi
}
let wi
function Vu(e) {
  let { userAgent: t } = e === void 0 ? {} : e
  const s = $o(),
    i = He(),
    r = i.navigator.platform,
    n = t || i.navigator.userAgent,
    o = { ios: !1, android: !1 },
    a = i.screen.width,
    l = i.screen.height,
    u = n.match(/(Android);?[\s\/]+([\d.]+)?/)
  let c = n.match(/(iPad).*OS\s([\d_]+)/)
  const d = n.match(/(iPod)(.*OS\s([\d_]+))?/),
    f = !c && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
    p = r === 'Win32'
  let g = r === 'MacIntel'
  const x = [
    '1024x1366',
    '1366x1024',
    '834x1194',
    '1194x834',
    '834x1112',
    '1112x834',
    '768x1024',
    '1024x768',
    '820x1180',
    '1180x820',
    '810x1080',
    '1080x810',
  ]
  return (
    !c &&
      g &&
      s.touch &&
      x.indexOf(`${a}x${l}`) >= 0 &&
      ((c = n.match(/(Version)\/([\d.]+)/)),
      c || (c = [0, 1, '13_0_0']),
      (g = !1)),
    u && !p && ((o.os = 'android'), (o.android = !0)),
    (c || f || d) && ((o.os = 'ios'), (o.ios = !0)),
    o
  )
}
function qu(e) {
  return e === void 0 && (e = {}), wi || (wi = Vu(e)), wi
}
let yi
function Gu() {
  const e = He()
  let t = !1
  function s() {
    const i = e.navigator.userAgent.toLowerCase()
    return (
      i.indexOf('safari') >= 0 &&
      i.indexOf('chrome') < 0 &&
      i.indexOf('android') < 0
    )
  }
  if (s()) {
    const i = String(e.navigator.userAgent)
    if (i.includes('Version/')) {
      const [r, n] = i
        .split('Version/')[1]
        .split(' ')[0]
        .split('.')
        .map((o) => Number(o))
      t = r < 16 || (r === 16 && n < 2)
    }
  }
  return {
    isSafari: t || s(),
    needPerspectiveFix: t,
    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
      e.navigator.userAgent
    ),
  }
}
function Wu() {
  return yi || (yi = Gu()), yi
}
function Uu(e) {
  let { swiper: t, on: s, emit: i } = e
  const r = He()
  let n = null,
    o = null
  const a = () => {
      !t || t.destroyed || !t.initialized || (i('beforeResize'), i('resize'))
    },
    l = () => {
      !t ||
        t.destroyed ||
        !t.initialized ||
        ((n = new ResizeObserver((d) => {
          o = r.requestAnimationFrame(() => {
            const { width: f, height: p } = t
            let g = f,
              x = p
            d.forEach((I) => {
              let { contentBoxSize: b, contentRect: E, target: w } = I
              ;(w && w !== t.el) ||
                ((g = E ? E.width : (b[0] || b).inlineSize),
                (x = E ? E.height : (b[0] || b).blockSize))
            }),
              (g !== f || x !== p) && a()
          })
        })),
        n.observe(t.el))
    },
    u = () => {
      o && r.cancelAnimationFrame(o),
        n && n.unobserve && t.el && (n.unobserve(t.el), (n = null))
    },
    c = () => {
      !t || t.destroyed || !t.initialized || i('orientationchange')
    }
  s('init', () => {
    if (t.params.resizeObserver && typeof r.ResizeObserver < 'u') {
      l()
      return
    }
    r.addEventListener('resize', a), r.addEventListener('orientationchange', c)
  }),
    s('destroy', () => {
      u(),
        r.removeEventListener('resize', a),
        r.removeEventListener('orientationchange', c)
    })
}
function Ku(e) {
  let { swiper: t, extendParams: s, on: i, emit: r } = e
  const n = [],
    o = He(),
    a = function (c, d) {
      d === void 0 && (d = {})
      const f = o.MutationObserver || o.WebkitMutationObserver,
        p = new f((g) => {
          if (t.__preventObserver__) return
          if (g.length === 1) {
            r('observerUpdate', g[0])
            return
          }
          const x = function () {
            r('observerUpdate', g[0])
          }
          o.requestAnimationFrame
            ? o.requestAnimationFrame(x)
            : o.setTimeout(x, 0)
        })
      p.observe(c, {
        attributes: typeof d.attributes > 'u' ? !0 : d.attributes,
        childList: typeof d.childList > 'u' ? !0 : d.childList,
        characterData: typeof d.characterData > 'u' ? !0 : d.characterData,
      }),
        n.push(p)
    },
    l = () => {
      if (t.params.observer) {
        if (t.params.observeParents) {
          const c = Fu(t.hostEl)
          for (let d = 0; d < c.length; d += 1) a(c[d])
        }
        a(t.hostEl, { childList: t.params.observeSlideChildren }),
          a(t.wrapperEl, { attributes: !1 })
      }
    },
    u = () => {
      n.forEach((c) => {
        c.disconnect()
      }),
        n.splice(0, n.length)
    }
  s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
    i('init', l),
    i('destroy', u)
}
var Yu = {
  on(e, t, s) {
    const i = this
    if (!i.eventsListeners || i.destroyed || typeof t != 'function') return i
    const r = s ? 'unshift' : 'push'
    return (
      e.split(' ').forEach((n) => {
        i.eventsListeners[n] || (i.eventsListeners[n] = []),
          i.eventsListeners[n][r](t)
      }),
      i
    )
  },
  once(e, t, s) {
    const i = this
    if (!i.eventsListeners || i.destroyed || typeof t != 'function') return i
    function r() {
      i.off(e, r), r.__emitterProxy && delete r.__emitterProxy
      for (var n = arguments.length, o = new Array(n), a = 0; a < n; a++)
        o[a] = arguments[a]
      t.apply(i, o)
    }
    return (r.__emitterProxy = t), i.on(e, r, s)
  },
  onAny(e, t) {
    const s = this
    if (!s.eventsListeners || s.destroyed || typeof e != 'function') return s
    const i = t ? 'unshift' : 'push'
    return s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s
  },
  offAny(e) {
    const t = this
    if (!t.eventsListeners || t.destroyed || !t.eventsAnyListeners) return t
    const s = t.eventsAnyListeners.indexOf(e)
    return s >= 0 && t.eventsAnyListeners.splice(s, 1), t
  },
  off(e, t) {
    const s = this
    return (
      !s.eventsListeners ||
        s.destroyed ||
        !s.eventsListeners ||
        e.split(' ').forEach((i) => {
          typeof t > 'u'
            ? (s.eventsListeners[i] = [])
            : s.eventsListeners[i] &&
              s.eventsListeners[i].forEach((r, n) => {
                ;(r === t || (r.__emitterProxy && r.__emitterProxy === t)) &&
                  s.eventsListeners[i].splice(n, 1)
              })
        }),
      s
    )
  },
  emit() {
    const e = this
    if (!e.eventsListeners || e.destroyed || !e.eventsListeners) return e
    let t, s, i
    for (var r = arguments.length, n = new Array(r), o = 0; o < r; o++)
      n[o] = arguments[o]
    return (
      typeof n[0] == 'string' || Array.isArray(n[0])
        ? ((t = n[0]), (s = n.slice(1, n.length)), (i = e))
        : ((t = n[0].events), (s = n[0].data), (i = n[0].context || e)),
      s.unshift(i),
      (Array.isArray(t) ? t : t.split(' ')).forEach((l) => {
        e.eventsAnyListeners &&
          e.eventsAnyListeners.length &&
          e.eventsAnyListeners.forEach((u) => {
            u.apply(i, [l, ...s])
          }),
          e.eventsListeners &&
            e.eventsListeners[l] &&
            e.eventsListeners[l].forEach((u) => {
              u.apply(i, s)
            })
      }),
      e
    )
  },
}
function Xu() {
  const e = this
  let t, s
  const i = e.el
  typeof e.params.width < 'u' && e.params.width !== null
    ? (t = e.params.width)
    : (t = i.clientWidth),
    typeof e.params.height < 'u' && e.params.height !== null
      ? (s = e.params.height)
      : (s = i.clientHeight),
    !((t === 0 && e.isHorizontal()) || (s === 0 && e.isVertical())) &&
      ((t =
        t -
        parseInt(mt(i, 'padding-left') || 0, 10) -
        parseInt(mt(i, 'padding-right') || 0, 10)),
      (s =
        s -
        parseInt(mt(i, 'padding-top') || 0, 10) -
        parseInt(mt(i, 'padding-bottom') || 0, 10)),
      Number.isNaN(t) && (t = 0),
      Number.isNaN(s) && (s = 0),
      Object.assign(e, { width: t, height: s, size: e.isHorizontal() ? t : s }))
}
function Qu() {
  const e = this
  function t(C, D) {
    return parseFloat(C.getPropertyValue(e.getDirectionLabel(D)) || 0)
  }
  const s = e.params,
    { wrapperEl: i, slidesEl: r, size: n, rtlTranslate: o, wrongRTL: a } = e,
    l = e.virtual && s.virtual.enabled,
    u = l ? e.virtual.slides.length : e.slides.length,
    c = rt(r, `.${e.params.slideClass}, swiper-slide`),
    d = l ? e.virtual.slides.length : c.length
  let f = []
  const p = [],
    g = []
  let x = s.slidesOffsetBefore
  typeof x == 'function' && (x = s.slidesOffsetBefore.call(e))
  let I = s.slidesOffsetAfter
  typeof I == 'function' && (I = s.slidesOffsetAfter.call(e))
  const b = e.snapGrid.length,
    E = e.slidesGrid.length
  let w = s.spaceBetween,
    y = -x,
    L = 0,
    N = 0
  if (typeof n > 'u') return
  typeof w == 'string' && w.indexOf('%') >= 0
    ? (w = (parseFloat(w.replace('%', '')) / 100) * n)
    : typeof w == 'string' && (w = parseFloat(w)),
    (e.virtualSize = -w),
    c.forEach((C) => {
      o ? (C.style.marginLeft = '') : (C.style.marginRight = ''),
        (C.style.marginBottom = ''),
        (C.style.marginTop = '')
    }),
    s.centeredSlides &&
      s.cssMode &&
      (Is(i, '--swiper-centered-offset-before', ''),
      Is(i, '--swiper-centered-offset-after', ''))
  const J = s.grid && s.grid.rows > 1 && e.grid
  J ? e.grid.initSlides(c) : e.grid && e.grid.unsetSlides()
  let k
  const T =
    s.slidesPerView === 'auto' &&
    s.breakpoints &&
    Object.keys(s.breakpoints).filter(
      (C) => typeof s.breakpoints[C].slidesPerView < 'u'
    ).length > 0
  for (let C = 0; C < d; C += 1) {
    k = 0
    let D
    if (
      (c[C] && (D = c[C]),
      J && e.grid.updateSlide(C, D, c),
      !(c[C] && mt(D, 'display') === 'none'))
    ) {
      if (s.slidesPerView === 'auto') {
        T && (c[C].style[e.getDirectionLabel('width')] = '')
        const K = getComputedStyle(D),
          V = D.style.transform,
          le = D.style.webkitTransform
        if (
          (V && (D.style.transform = 'none'),
          le && (D.style.webkitTransform = 'none'),
          s.roundLengths)
        )
          k = e.isHorizontal() ? wn(D, 'width', !0) : wn(D, 'height', !0)
        else {
          const pe = t(K, 'width'),
            re = t(K, 'padding-left'),
            se = t(K, 'padding-right'),
            F = t(K, 'margin-left'),
            me = t(K, 'margin-right'),
            fe = K.getPropertyValue('box-sizing')
          if (fe && fe === 'border-box') k = pe + F + me
          else {
            const { clientWidth: _e, offsetWidth: xe } = D
            k = pe + re + se + F + me + (xe - _e)
          }
        }
        V && (D.style.transform = V),
          le && (D.style.webkitTransform = le),
          s.roundLengths && (k = Math.floor(k))
      } else
        (k = (n - (s.slidesPerView - 1) * w) / s.slidesPerView),
          s.roundLengths && (k = Math.floor(k)),
          c[C] && (c[C].style[e.getDirectionLabel('width')] = `${k}px`)
      c[C] && (c[C].swiperSlideSize = k),
        g.push(k),
        s.centeredSlides
          ? ((y = y + k / 2 + L / 2 + w),
            L === 0 && C !== 0 && (y = y - n / 2 - w),
            C === 0 && (y = y - n / 2 - w),
            Math.abs(y) < 1 / 1e3 && (y = 0),
            s.roundLengths && (y = Math.floor(y)),
            N % s.slidesPerGroup === 0 && f.push(y),
            p.push(y))
          : (s.roundLengths && (y = Math.floor(y)),
            (N - Math.min(e.params.slidesPerGroupSkip, N)) %
              e.params.slidesPerGroup ===
              0 && f.push(y),
            p.push(y),
            (y = y + k + w)),
        (e.virtualSize += k + w),
        (L = k),
        (N += 1)
    }
  }
  if (
    ((e.virtualSize = Math.max(e.virtualSize, n) + I),
    o &&
      a &&
      (s.effect === 'slide' || s.effect === 'coverflow') &&
      (i.style.width = `${e.virtualSize + w}px`),
    s.setWrapperSize &&
      (i.style[e.getDirectionLabel('width')] = `${e.virtualSize + w}px`),
    J && e.grid.updateWrapperSize(k, f),
    !s.centeredSlides)
  ) {
    const C = []
    for (let D = 0; D < f.length; D += 1) {
      let K = f[D]
      s.roundLengths && (K = Math.floor(K)),
        f[D] <= e.virtualSize - n && C.push(K)
    }
    ;(f = C),
      Math.floor(e.virtualSize - n) - Math.floor(f[f.length - 1]) > 1 &&
        f.push(e.virtualSize - n)
  }
  if (l && s.loop) {
    const C = g[0] + w
    if (s.slidesPerGroup > 1) {
      const D = Math.ceil(
          (e.virtual.slidesBefore + e.virtual.slidesAfter) / s.slidesPerGroup
        ),
        K = C * s.slidesPerGroup
      for (let V = 0; V < D; V += 1) f.push(f[f.length - 1] + K)
    }
    for (let D = 0; D < e.virtual.slidesBefore + e.virtual.slidesAfter; D += 1)
      s.slidesPerGroup === 1 && f.push(f[f.length - 1] + C),
        p.push(p[p.length - 1] + C),
        (e.virtualSize += C)
  }
  if ((f.length === 0 && (f = [0]), w !== 0)) {
    const C =
      e.isHorizontal() && o ? 'marginLeft' : e.getDirectionLabel('marginRight')
    c.filter((D, K) =>
      !s.cssMode || s.loop ? !0 : K !== c.length - 1
    ).forEach((D) => {
      D.style[C] = `${w}px`
    })
  }
  if (s.centeredSlides && s.centeredSlidesBounds) {
    let C = 0
    g.forEach((K) => {
      C += K + (w || 0)
    }),
      (C -= w)
    const D = C - n
    f = f.map((K) => (K <= 0 ? -x : K > D ? D + I : K))
  }
  if (s.centerInsufficientSlides) {
    let C = 0
    if (
      (g.forEach((D) => {
        C += D + (w || 0)
      }),
      (C -= w),
      C < n)
    ) {
      const D = (n - C) / 2
      f.forEach((K, V) => {
        f[V] = K - D
      }),
        p.forEach((K, V) => {
          p[V] = K + D
        })
    }
  }
  if (
    (Object.assign(e, {
      slides: c,
      snapGrid: f,
      slidesGrid: p,
      slidesSizesGrid: g,
    }),
    s.centeredSlides && s.cssMode && !s.centeredSlidesBounds)
  ) {
    Is(i, '--swiper-centered-offset-before', `${-f[0]}px`),
      Is(
        i,
        '--swiper-centered-offset-after',
        `${e.size / 2 - g[g.length - 1] / 2}px`
      )
    const C = -e.snapGrid[0],
      D = -e.slidesGrid[0]
    ;(e.snapGrid = e.snapGrid.map((K) => K + C)),
      (e.slidesGrid = e.slidesGrid.map((K) => K + D))
  }
  if (
    (d !== u && e.emit('slidesLengthChange'),
    f.length !== b &&
      (e.params.watchOverflow && e.checkOverflow(),
      e.emit('snapGridLengthChange')),
    p.length !== E && e.emit('slidesGridLengthChange'),
    s.watchSlidesProgress && e.updateSlidesOffset(),
    e.emit('slidesUpdated'),
    !l && !s.cssMode && (s.effect === 'slide' || s.effect === 'fade'))
  ) {
    const C = `${s.containerModifierClass}backface-hidden`,
      D = e.el.classList.contains(C)
    d <= s.maxBackfaceHiddenSlides
      ? D || e.el.classList.add(C)
      : D && e.el.classList.remove(C)
  }
}
function Ju(e) {
  const t = this,
    s = [],
    i = t.virtual && t.params.virtual.enabled
  let r = 0,
    n
  typeof e == 'number'
    ? t.setTransition(e)
    : e === !0 && t.setTransition(t.params.speed)
  const o = (a) => (i ? t.slides[t.getSlideIndexByData(a)] : t.slides[a])
  if (t.params.slidesPerView !== 'auto' && t.params.slidesPerView > 1)
    if (t.params.centeredSlides)
      (t.visibleSlides || []).forEach((a) => {
        s.push(a)
      })
    else
      for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
        const a = t.activeIndex + n
        if (a > t.slides.length && !i) break
        s.push(o(a))
      }
  else s.push(o(t.activeIndex))
  for (n = 0; n < s.length; n += 1)
    if (typeof s[n] < 'u') {
      const a = s[n].offsetHeight
      r = a > r ? a : r
    }
  ;(r || r === 0) && (t.wrapperEl.style.height = `${r}px`)
}
function Zu() {
  const e = this,
    t = e.slides,
    s = e.isElement
      ? e.isHorizontal()
        ? e.wrapperEl.offsetLeft
        : e.wrapperEl.offsetTop
      : 0
  for (let i = 0; i < t.length; i += 1)
    t[i].swiperSlideOffset =
      (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) -
      s -
      e.cssOverflowAdjustment()
}
function ed(e) {
  e === void 0 && (e = (this && this.translate) || 0)
  const t = this,
    s = t.params,
    { slides: i, rtlTranslate: r, snapGrid: n } = t
  if (i.length === 0) return
  typeof i[0].swiperSlideOffset > 'u' && t.updateSlidesOffset()
  let o = -e
  r && (o = e),
    i.forEach((l) => {
      l.classList.remove(s.slideVisibleClass, s.slideFullyVisibleClass)
    }),
    (t.visibleSlidesIndexes = []),
    (t.visibleSlides = [])
  let a = s.spaceBetween
  typeof a == 'string' && a.indexOf('%') >= 0
    ? (a = (parseFloat(a.replace('%', '')) / 100) * t.size)
    : typeof a == 'string' && (a = parseFloat(a))
  for (let l = 0; l < i.length; l += 1) {
    const u = i[l]
    let c = u.swiperSlideOffset
    s.cssMode && s.centeredSlides && (c -= i[0].swiperSlideOffset)
    const d =
        (o + (s.centeredSlides ? t.minTranslate() : 0) - c) /
        (u.swiperSlideSize + a),
      f =
        (o - n[0] + (s.centeredSlides ? t.minTranslate() : 0) - c) /
        (u.swiperSlideSize + a),
      p = -(o - c),
      g = p + t.slidesSizesGrid[l],
      x = p >= 0 && p <= t.size - t.slidesSizesGrid[l]
    ;((p >= 0 && p < t.size - 1) ||
      (g > 1 && g <= t.size) ||
      (p <= 0 && g >= t.size)) &&
      (t.visibleSlides.push(u),
      t.visibleSlidesIndexes.push(l),
      i[l].classList.add(s.slideVisibleClass)),
      x && i[l].classList.add(s.slideFullyVisibleClass),
      (u.progress = r ? -d : d),
      (u.originalProgress = r ? -f : f)
  }
}
function td(e) {
  const t = this
  if (typeof e > 'u') {
    const c = t.rtlTranslate ? -1 : 1
    e = (t && t.translate && t.translate * c) || 0
  }
  const s = t.params,
    i = t.maxTranslate() - t.minTranslate()
  let { progress: r, isBeginning: n, isEnd: o, progressLoop: a } = t
  const l = n,
    u = o
  if (i === 0) (r = 0), (n = !0), (o = !0)
  else {
    r = (e - t.minTranslate()) / i
    const c = Math.abs(e - t.minTranslate()) < 1,
      d = Math.abs(e - t.maxTranslate()) < 1
    ;(n = c || r <= 0), (o = d || r >= 1), c && (r = 0), d && (r = 1)
  }
  if (s.loop) {
    const c = t.getSlideIndexByData(0),
      d = t.getSlideIndexByData(t.slides.length - 1),
      f = t.slidesGrid[c],
      p = t.slidesGrid[d],
      g = t.slidesGrid[t.slidesGrid.length - 1],
      x = Math.abs(e)
    x >= f ? (a = (x - f) / g) : (a = (x + g - p) / g), a > 1 && (a -= 1)
  }
  Object.assign(t, { progress: r, progressLoop: a, isBeginning: n, isEnd: o }),
    (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
      t.updateSlidesProgress(e),
    n && !l && t.emit('reachBeginning toEdge'),
    o && !u && t.emit('reachEnd toEdge'),
    ((l && !n) || (u && !o)) && t.emit('fromEdge'),
    t.emit('progress', r)
}
function sd() {
  const e = this,
    { slides: t, params: s, slidesEl: i, activeIndex: r } = e,
    n = e.virtual && s.virtual.enabled,
    o = e.grid && s.grid && s.grid.rows > 1,
    a = (d) => rt(i, `.${s.slideClass}${d}, swiper-slide${d}`)[0]
  t.forEach((d) => {
    d.classList.remove(s.slideActiveClass, s.slideNextClass, s.slidePrevClass)
  })
  let l, u, c
  if (n)
    if (s.loop) {
      let d = r - e.virtual.slidesBefore
      d < 0 && (d = e.virtual.slides.length + d),
        d >= e.virtual.slides.length && (d -= e.virtual.slides.length),
        (l = a(`[data-swiper-slide-index="${d}"]`))
    } else l = a(`[data-swiper-slide-index="${r}"]`)
  else
    o
      ? ((l = t.filter((d) => d.column === r)[0]),
        (c = t.filter((d) => d.column === r + 1)[0]),
        (u = t.filter((d) => d.column === r - 1)[0]))
      : (l = t[r])
  l &&
    (l.classList.add(s.slideActiveClass),
    o
      ? (c && c.classList.add(s.slideNextClass),
        u && u.classList.add(s.slidePrevClass))
      : ((c = Nu(l, `.${s.slideClass}, swiper-slide`)[0]),
        s.loop && !c && (c = t[0]),
        c && c.classList.add(s.slideNextClass),
        (u = ju(l, `.${s.slideClass}, swiper-slide`)[0]),
        s.loop && !u === 0 && (u = t[t.length - 1]),
        u && u.classList.add(s.slidePrevClass))),
    e.emitSlidesClasses()
}
const Ds = (e, t) => {
    if (!e || e.destroyed || !e.params) return
    const s = () => (e.isElement ? 'swiper-slide' : `.${e.params.slideClass}`),
      i = t.closest(s())
    if (i) {
      let r = i.querySelector(`.${e.params.lazyPreloaderClass}`)
      !r &&
        e.isElement &&
        (i.shadowRoot
          ? (r = i.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`))
          : requestAnimationFrame(() => {
              i.shadowRoot &&
                ((r = i.shadowRoot.querySelector(
                  `.${e.params.lazyPreloaderClass}`
                )),
                r && r.remove())
            })),
        r && r.remove()
    }
  },
  _i = (e, t) => {
    if (!e.slides[t]) return
    const s = e.slides[t].querySelector('[loading="lazy"]')
    s && s.removeAttribute('loading')
  },
  qi = (e) => {
    if (!e || e.destroyed || !e.params) return
    let t = e.params.lazyPreloadPrevNext
    const s = e.slides.length
    if (!s || !t || t < 0) return
    t = Math.min(t, s)
    const i =
        e.params.slidesPerView === 'auto'
          ? e.slidesPerViewDynamic()
          : Math.ceil(e.params.slidesPerView),
      r = e.activeIndex
    if (e.params.grid && e.params.grid.rows > 1) {
      const o = r,
        a = [o - t]
      a.push(...Array.from({ length: t }).map((l, u) => o + i + u)),
        e.slides.forEach((l, u) => {
          a.includes(l.column) && _i(e, u)
        })
      return
    }
    const n = r + i - 1
    if (e.params.rewind || e.params.loop)
      for (let o = r - t; o <= n + t; o += 1) {
        const a = ((o % s) + s) % s
        ;(a < r || a > n) && _i(e, a)
      }
    else
      for (let o = Math.max(r - t, 0); o <= Math.min(n + t, s - 1); o += 1)
        o !== r && (o > n || o < r) && _i(e, o)
  }
function id(e) {
  const { slidesGrid: t, params: s } = e,
    i = e.rtlTranslate ? e.translate : -e.translate
  let r
  for (let n = 0; n < t.length; n += 1)
    typeof t[n + 1] < 'u'
      ? i >= t[n] && i < t[n + 1] - (t[n + 1] - t[n]) / 2
        ? (r = n)
        : i >= t[n] && i < t[n + 1] && (r = n + 1)
      : i >= t[n] && (r = n)
  return s.normalizeSlideIndex && (r < 0 || typeof r > 'u') && (r = 0), r
}
function rd(e) {
  const t = this,
    s = t.rtlTranslate ? t.translate : -t.translate,
    { snapGrid: i, params: r, activeIndex: n, realIndex: o, snapIndex: a } = t
  let l = e,
    u
  const c = (p) => {
    let g = p - t.virtual.slidesBefore
    return (
      g < 0 && (g = t.virtual.slides.length + g),
      g >= t.virtual.slides.length && (g -= t.virtual.slides.length),
      g
    )
  }
  if ((typeof l > 'u' && (l = id(t)), i.indexOf(s) >= 0)) u = i.indexOf(s)
  else {
    const p = Math.min(r.slidesPerGroupSkip, l)
    u = p + Math.floor((l - p) / r.slidesPerGroup)
  }
  if ((u >= i.length && (u = i.length - 1), l === n && !t.params.loop)) {
    u !== a && ((t.snapIndex = u), t.emit('snapIndexChange'))
    return
  }
  if (l === n && t.params.loop && t.virtual && t.params.virtual.enabled) {
    t.realIndex = c(l)
    return
  }
  const d = t.grid && r.grid && r.grid.rows > 1
  let f
  if (t.virtual && r.virtual.enabled && r.loop) f = c(l)
  else if (d) {
    const p = t.slides.filter((x) => x.column === l)[0]
    let g = parseInt(p.getAttribute('data-swiper-slide-index'), 10)
    Number.isNaN(g) && (g = Math.max(t.slides.indexOf(p), 0)),
      (f = Math.floor(g / r.grid.rows))
  } else if (t.slides[l]) {
    const p = t.slides[l].getAttribute('data-swiper-slide-index')
    p ? (f = parseInt(p, 10)) : (f = l)
  } else f = l
  Object.assign(t, {
    previousSnapIndex: a,
    snapIndex: u,
    previousRealIndex: o,
    realIndex: f,
    previousIndex: n,
    activeIndex: l,
  }),
    t.initialized && qi(t),
    t.emit('activeIndexChange'),
    t.emit('snapIndexChange'),
    (t.initialized || t.params.runCallbacksOnInit) &&
      (o !== f && t.emit('realIndexChange'), t.emit('slideChange'))
}
function nd(e, t) {
  const s = this,
    i = s.params
  let r = e.closest(`.${i.slideClass}, swiper-slide`)
  !r &&
    s.isElement &&
    t &&
    t.length > 1 &&
    t.includes(e) &&
    [...t.slice(t.indexOf(e) + 1, t.length)].forEach((a) => {
      !r && a.matches && a.matches(`.${i.slideClass}, swiper-slide`) && (r = a)
    })
  let n = !1,
    o
  if (r) {
    for (let a = 0; a < s.slides.length; a += 1)
      if (s.slides[a] === r) {
        ;(n = !0), (o = a)
        break
      }
  }
  if (r && n)
    (s.clickedSlide = r),
      s.virtual && s.params.virtual.enabled
        ? (s.clickedIndex = parseInt(
            r.getAttribute('data-swiper-slide-index'),
            10
          ))
        : (s.clickedIndex = o)
  else {
    ;(s.clickedSlide = void 0), (s.clickedIndex = void 0)
    return
  }
  i.slideToClickedSlide &&
    s.clickedIndex !== void 0 &&
    s.clickedIndex !== s.activeIndex &&
    s.slideToClickedSlide()
}
var od = {
  updateSize: Xu,
  updateSlides: Qu,
  updateAutoHeight: Ju,
  updateSlidesOffset: Zu,
  updateSlidesProgress: ed,
  updateProgress: td,
  updateSlidesClasses: sd,
  updateActiveIndex: rd,
  updateClickedSlide: nd,
}
function ld(e) {
  e === void 0 && (e = this.isHorizontal() ? 'x' : 'y')
  const t = this,
    { params: s, rtlTranslate: i, translate: r, wrapperEl: n } = t
  if (s.virtualTranslate) return i ? -r : r
  if (s.cssMode) return r
  let o = Du(n, e)
  return (o += t.cssOverflowAdjustment()), i && (o = -o), o || 0
}
function ad(e, t) {
  const s = this,
    { rtlTranslate: i, params: r, wrapperEl: n, progress: o } = s
  let a = 0,
    l = 0
  const u = 0
  s.isHorizontal() ? (a = i ? -e : e) : (l = e),
    r.roundLengths && ((a = Math.floor(a)), (l = Math.floor(l))),
    (s.previousTranslate = s.translate),
    (s.translate = s.isHorizontal() ? a : l),
    r.cssMode
      ? (n[s.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = s.isHorizontal()
          ? -a
          : -l)
      : r.virtualTranslate ||
        (s.isHorizontal()
          ? (a -= s.cssOverflowAdjustment())
          : (l -= s.cssOverflowAdjustment()),
        (n.style.transform = `translate3d(${a}px, ${l}px, ${u}px)`))
  let c
  const d = s.maxTranslate() - s.minTranslate()
  d === 0 ? (c = 0) : (c = (e - s.minTranslate()) / d),
    c !== o && s.updateProgress(e),
    s.emit('setTranslate', s.translate, t)
}
function cd() {
  return -this.snapGrid[0]
}
function ud() {
  return -this.snapGrid[this.snapGrid.length - 1]
}
function dd(e, t, s, i, r) {
  e === void 0 && (e = 0),
    t === void 0 && (t = this.params.speed),
    s === void 0 && (s = !0),
    i === void 0 && (i = !0)
  const n = this,
    { params: o, wrapperEl: a } = n
  if (n.animating && o.preventInteractionOnTransition) return !1
  const l = n.minTranslate(),
    u = n.maxTranslate()
  let c
  if (
    (i && e > l ? (c = l) : i && e < u ? (c = u) : (c = e),
    n.updateProgress(c),
    o.cssMode)
  ) {
    const d = n.isHorizontal()
    if (t === 0) a[d ? 'scrollLeft' : 'scrollTop'] = -c
    else {
      if (!n.support.smoothScroll)
        return (
          zo({ swiper: n, targetPosition: -c, side: d ? 'left' : 'top' }), !0
        )
      a.scrollTo({ [d ? 'left' : 'top']: -c, behavior: 'smooth' })
    }
    return !0
  }
  return (
    t === 0
      ? (n.setTransition(0),
        n.setTranslate(c),
        s && (n.emit('beforeTransitionStart', t, r), n.emit('transitionEnd')))
      : (n.setTransition(t),
        n.setTranslate(c),
        s && (n.emit('beforeTransitionStart', t, r), n.emit('transitionStart')),
        n.animating ||
          ((n.animating = !0),
          n.onTranslateToWrapperTransitionEnd ||
            (n.onTranslateToWrapperTransitionEnd = function (f) {
              !n ||
                n.destroyed ||
                (f.target === this &&
                  (n.wrapperEl.removeEventListener(
                    'transitionend',
                    n.onTranslateToWrapperTransitionEnd
                  ),
                  (n.onTranslateToWrapperTransitionEnd = null),
                  delete n.onTranslateToWrapperTransitionEnd,
                  s && n.emit('transitionEnd')))
            }),
          n.wrapperEl.addEventListener(
            'transitionend',
            n.onTranslateToWrapperTransitionEnd
          ))),
    !0
  )
}
var fd = {
  getTranslate: ld,
  setTranslate: ad,
  minTranslate: cd,
  maxTranslate: ud,
  translateTo: dd,
}
function pd(e, t) {
  const s = this
  s.params.cssMode ||
    ((s.wrapperEl.style.transitionDuration = `${e}ms`),
    (s.wrapperEl.style.transitionDelay = e === 0 ? '0ms' : '')),
    s.emit('setTransition', e, t)
}
function Do(e) {
  let { swiper: t, runCallbacks: s, direction: i, step: r } = e
  const { activeIndex: n, previousIndex: o } = t
  let a = i
  if (
    (a || (n > o ? (a = 'next') : n < o ? (a = 'prev') : (a = 'reset')),
    t.emit(`transition${r}`),
    s && n !== o)
  ) {
    if (a === 'reset') {
      t.emit(`slideResetTransition${r}`)
      return
    }
    t.emit(`slideChangeTransition${r}`),
      a === 'next'
        ? t.emit(`slideNextTransition${r}`)
        : t.emit(`slidePrevTransition${r}`)
  }
}
function hd(e, t) {
  e === void 0 && (e = !0)
  const s = this,
    { params: i } = s
  i.cssMode ||
    (i.autoHeight && s.updateAutoHeight(),
    Do({ swiper: s, runCallbacks: e, direction: t, step: 'Start' }))
}
function md(e, t) {
  e === void 0 && (e = !0)
  const s = this,
    { params: i } = s
  ;(s.animating = !1),
    !i.cssMode &&
      (s.setTransition(0),
      Do({ swiper: s, runCallbacks: e, direction: t, step: 'End' }))
}
var gd = { setTransition: pd, transitionStart: hd, transitionEnd: md }
function vd(e, t, s, i, r) {
  e === void 0 && (e = 0),
    t === void 0 && (t = this.params.speed),
    s === void 0 && (s = !0),
    typeof e == 'string' && (e = parseInt(e, 10))
  const n = this
  let o = e
  o < 0 && (o = 0)
  const {
    params: a,
    snapGrid: l,
    slidesGrid: u,
    previousIndex: c,
    activeIndex: d,
    rtlTranslate: f,
    wrapperEl: p,
    enabled: g,
  } = n
  if ((n.animating && a.preventInteractionOnTransition) || (!g && !i && !r))
    return !1
  const x = Math.min(n.params.slidesPerGroupSkip, o)
  let I = x + Math.floor((o - x) / n.params.slidesPerGroup)
  I >= l.length && (I = l.length - 1)
  const b = -l[I]
  if (a.normalizeSlideIndex)
    for (let w = 0; w < u.length; w += 1) {
      const y = -Math.floor(b * 100),
        L = Math.floor(u[w] * 100),
        N = Math.floor(u[w + 1] * 100)
      typeof u[w + 1] < 'u'
        ? y >= L && y < N - (N - L) / 2
          ? (o = w)
          : y >= L && y < N && (o = w + 1)
        : y >= L && (o = w)
    }
  if (
    n.initialized &&
    o !== d &&
    ((!n.allowSlideNext &&
      (f
        ? b > n.translate && b > n.minTranslate()
        : b < n.translate && b < n.minTranslate())) ||
      (!n.allowSlidePrev &&
        b > n.translate &&
        b > n.maxTranslate() &&
        (d || 0) !== o))
  )
    return !1
  o !== (c || 0) && s && n.emit('beforeSlideChangeStart'), n.updateProgress(b)
  let E
  if (
    (o > d ? (E = 'next') : o < d ? (E = 'prev') : (E = 'reset'),
    (f && -b === n.translate) || (!f && b === n.translate))
  )
    return (
      n.updateActiveIndex(o),
      a.autoHeight && n.updateAutoHeight(),
      n.updateSlidesClasses(),
      a.effect !== 'slide' && n.setTranslate(b),
      E !== 'reset' && (n.transitionStart(s, E), n.transitionEnd(s, E)),
      !1
    )
  if (a.cssMode) {
    const w = n.isHorizontal(),
      y = f ? b : -b
    if (t === 0) {
      const L = n.virtual && n.params.virtual.enabled
      L &&
        ((n.wrapperEl.style.scrollSnapType = 'none'),
        (n._immediateVirtual = !0)),
        L && !n._cssModeVirtualInitialSet && n.params.initialSlide > 0
          ? ((n._cssModeVirtualInitialSet = !0),
            requestAnimationFrame(() => {
              p[w ? 'scrollLeft' : 'scrollTop'] = y
            }))
          : (p[w ? 'scrollLeft' : 'scrollTop'] = y),
        L &&
          requestAnimationFrame(() => {
            ;(n.wrapperEl.style.scrollSnapType = ''), (n._immediateVirtual = !1)
          })
    } else {
      if (!n.support.smoothScroll)
        return (
          zo({ swiper: n, targetPosition: y, side: w ? 'left' : 'top' }), !0
        )
      p.scrollTo({ [w ? 'left' : 'top']: y, behavior: 'smooth' })
    }
    return !0
  }
  return (
    n.setTransition(t),
    n.setTranslate(b),
    n.updateActiveIndex(o),
    n.updateSlidesClasses(),
    n.emit('beforeTransitionStart', t, i),
    n.transitionStart(s, E),
    t === 0
      ? n.transitionEnd(s, E)
      : n.animating ||
        ((n.animating = !0),
        n.onSlideToWrapperTransitionEnd ||
          (n.onSlideToWrapperTransitionEnd = function (y) {
            !n ||
              n.destroyed ||
              (y.target === this &&
                (n.wrapperEl.removeEventListener(
                  'transitionend',
                  n.onSlideToWrapperTransitionEnd
                ),
                (n.onSlideToWrapperTransitionEnd = null),
                delete n.onSlideToWrapperTransitionEnd,
                n.transitionEnd(s, E)))
          }),
        n.wrapperEl.addEventListener(
          'transitionend',
          n.onSlideToWrapperTransitionEnd
        )),
    !0
  )
}
function bd(e, t, s, i) {
  e === void 0 && (e = 0),
    t === void 0 && (t = this.params.speed),
    s === void 0 && (s = !0),
    typeof e == 'string' && (e = parseInt(e, 10))
  const r = this,
    n = r.grid && r.params.grid && r.params.grid.rows > 1
  let o = e
  if (r.params.loop)
    if (r.virtual && r.params.virtual.enabled) o = o + r.virtual.slidesBefore
    else {
      let a
      if (n) {
        const f = o * r.params.grid.rows
        a = r.slides.filter(
          (p) => p.getAttribute('data-swiper-slide-index') * 1 === f
        )[0].column
      } else a = r.getSlideIndexByData(o)
      const l = n
          ? Math.ceil(r.slides.length / r.params.grid.rows)
          : r.slides.length,
        { centeredSlides: u } = r.params
      let c = r.params.slidesPerView
      c === 'auto'
        ? (c = r.slidesPerViewDynamic())
        : ((c = Math.ceil(parseFloat(r.params.slidesPerView, 10))),
          u && c % 2 === 0 && (c = c + 1))
      let d = l - a < c
      if ((u && (d = d || a < Math.ceil(c / 2)), d)) {
        const f = u
          ? a < r.activeIndex
            ? 'prev'
            : 'next'
          : a - r.activeIndex - 1 < r.params.slidesPerView
          ? 'next'
          : 'prev'
        r.loopFix({
          direction: f,
          slideTo: !0,
          activeSlideIndex: f === 'next' ? a + 1 : a - l + 1,
          slideRealIndex: f === 'next' ? r.realIndex : void 0,
        })
      }
      if (n) {
        const f = o * r.params.grid.rows
        o = r.slides.filter(
          (p) => p.getAttribute('data-swiper-slide-index') * 1 === f
        )[0].column
      } else o = r.getSlideIndexByData(o)
    }
  return (
    requestAnimationFrame(() => {
      r.slideTo(o, t, s, i)
    }),
    r
  )
}
function xd(e, t, s) {
  e === void 0 && (e = this.params.speed), t === void 0 && (t = !0)
  const i = this,
    { enabled: r, params: n, animating: o } = i
  if (!r) return i
  let a = n.slidesPerGroup
  n.slidesPerView === 'auto' &&
    n.slidesPerGroup === 1 &&
    n.slidesPerGroupAuto &&
    (a = Math.max(i.slidesPerViewDynamic('current', !0), 1))
  const l = i.activeIndex < n.slidesPerGroupSkip ? 1 : a,
    u = i.virtual && n.virtual.enabled
  if (n.loop) {
    if (o && !u && n.loopPreventsSliding) return !1
    if (
      (i.loopFix({ direction: 'next' }),
      (i._clientLeft = i.wrapperEl.clientLeft),
      i.activeIndex === i.slides.length - 1 && n.cssMode)
    )
      return (
        requestAnimationFrame(() => {
          i.slideTo(i.activeIndex + l, e, t, s)
        }),
        !0
      )
  }
  return n.rewind && i.isEnd
    ? i.slideTo(0, e, t, s)
    : i.slideTo(i.activeIndex + l, e, t, s)
}
function wd(e, t, s) {
  e === void 0 && (e = this.params.speed), t === void 0 && (t = !0)
  const i = this,
    {
      params: r,
      snapGrid: n,
      slidesGrid: o,
      rtlTranslate: a,
      enabled: l,
      animating: u,
    } = i
  if (!l) return i
  const c = i.virtual && r.virtual.enabled
  if (r.loop) {
    if (u && !c && r.loopPreventsSliding) return !1
    i.loopFix({ direction: 'prev' }), (i._clientLeft = i.wrapperEl.clientLeft)
  }
  const d = a ? i.translate : -i.translate
  function f(b) {
    return b < 0 ? -Math.floor(Math.abs(b)) : Math.floor(b)
  }
  const p = f(d),
    g = n.map((b) => f(b))
  let x = n[g.indexOf(p) - 1]
  if (typeof x > 'u' && r.cssMode) {
    let b
    n.forEach((E, w) => {
      p >= E && (b = w)
    }),
      typeof b < 'u' && (x = n[b > 0 ? b - 1 : b])
  }
  let I = 0
  if (
    (typeof x < 'u' &&
      ((I = o.indexOf(x)),
      I < 0 && (I = i.activeIndex - 1),
      r.slidesPerView === 'auto' &&
        r.slidesPerGroup === 1 &&
        r.slidesPerGroupAuto &&
        ((I = I - i.slidesPerViewDynamic('previous', !0) + 1),
        (I = Math.max(I, 0)))),
    r.rewind && i.isBeginning)
  ) {
    const b =
      i.params.virtual && i.params.virtual.enabled && i.virtual
        ? i.virtual.slides.length - 1
        : i.slides.length - 1
    return i.slideTo(b, e, t, s)
  } else if (r.loop && i.activeIndex === 0 && r.cssMode)
    return (
      requestAnimationFrame(() => {
        i.slideTo(I, e, t, s)
      }),
      !0
    )
  return i.slideTo(I, e, t, s)
}
function yd(e, t, s) {
  e === void 0 && (e = this.params.speed), t === void 0 && (t = !0)
  const i = this
  return i.slideTo(i.activeIndex, e, t, s)
}
function _d(e, t, s, i) {
  e === void 0 && (e = this.params.speed),
    t === void 0 && (t = !0),
    i === void 0 && (i = 0.5)
  const r = this
  let n = r.activeIndex
  const o = Math.min(r.params.slidesPerGroupSkip, n),
    a = o + Math.floor((n - o) / r.params.slidesPerGroup),
    l = r.rtlTranslate ? r.translate : -r.translate
  if (l >= r.snapGrid[a]) {
    const u = r.snapGrid[a],
      c = r.snapGrid[a + 1]
    l - u > (c - u) * i && (n += r.params.slidesPerGroup)
  } else {
    const u = r.snapGrid[a - 1],
      c = r.snapGrid[a]
    l - u <= (c - u) * i && (n -= r.params.slidesPerGroup)
  }
  return (
    (n = Math.max(n, 0)),
    (n = Math.min(n, r.slidesGrid.length - 1)),
    r.slideTo(n, e, t, s)
  )
}
function Sd() {
  const e = this,
    { params: t, slidesEl: s } = e,
    i = t.slidesPerView === 'auto' ? e.slidesPerViewDynamic() : t.slidesPerView
  let r = e.clickedIndex,
    n
  const o = e.isElement ? 'swiper-slide' : `.${t.slideClass}`
  if (t.loop) {
    if (e.animating) return
    ;(n = parseInt(e.clickedSlide.getAttribute('data-swiper-slide-index'), 10)),
      t.centeredSlides
        ? r < e.loopedSlides - i / 2 ||
          r > e.slides.length - e.loopedSlides + i / 2
          ? (e.loopFix(),
            (r = e.getSlideIndex(
              rt(s, `${o}[data-swiper-slide-index="${n}"]`)[0]
            )),
            Hi(() => {
              e.slideTo(r)
            }))
          : e.slideTo(r)
        : r > e.slides.length - i
        ? (e.loopFix(),
          (r = e.getSlideIndex(
            rt(s, `${o}[data-swiper-slide-index="${n}"]`)[0]
          )),
          Hi(() => {
            e.slideTo(r)
          }))
        : e.slideTo(r)
  } else e.slideTo(r)
}
var Td = {
  slideTo: vd,
  slideToLoop: bd,
  slideNext: xd,
  slidePrev: wd,
  slideReset: yd,
  slideToClosest: _d,
  slideToClickedSlide: Sd,
}
function Ed(e) {
  const t = this,
    { params: s, slidesEl: i } = t
  if (!s.loop || (t.virtual && t.params.virtual.enabled)) return
  const r = () => {
      rt(i, `.${s.slideClass}, swiper-slide`).forEach((d, f) => {
        d.setAttribute('data-swiper-slide-index', f)
      })
    },
    n = t.grid && s.grid && s.grid.rows > 1,
    o = s.slidesPerGroup * (n ? s.grid.rows : 1),
    a = t.slides.length % o !== 0,
    l = n && t.slides.length % s.grid.rows !== 0,
    u = (c) => {
      for (let d = 0; d < c; d += 1) {
        const f = t.isElement
          ? Vi('swiper-slide', [s.slideBlankClass])
          : Vi('div', [s.slideClass, s.slideBlankClass])
        t.slidesEl.append(f)
      }
    }
  if (a) {
    if (s.loopAddBlankSlides) {
      const c = o - (t.slides.length % o)
      u(c), t.recalcSlides(), t.updateSlides()
    } else
      Gs(
        'Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)'
      )
    r()
  } else if (l) {
    if (s.loopAddBlankSlides) {
      const c = s.grid.rows - (t.slides.length % s.grid.rows)
      u(c), t.recalcSlides(), t.updateSlides()
    } else
      Gs(
        'Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)'
      )
    r()
  } else r()
  t.loopFix({
    slideRealIndex: e,
    direction: s.centeredSlides ? void 0 : 'next',
  })
}
function Pd(e) {
  let {
    slideRealIndex: t,
    slideTo: s = !0,
    direction: i,
    setTranslate: r,
    activeSlideIndex: n,
    byController: o,
    byMousewheel: a,
  } = e === void 0 ? {} : e
  const l = this
  if (!l.params.loop) return
  l.emit('beforeLoopFix')
  const {
      slides: u,
      allowSlidePrev: c,
      allowSlideNext: d,
      slidesEl: f,
      params: p,
    } = l,
    { centeredSlides: g } = p
  if (
    ((l.allowSlidePrev = !0),
    (l.allowSlideNext = !0),
    l.virtual && p.virtual.enabled)
  ) {
    s &&
      (!p.centeredSlides && l.snapIndex === 0
        ? l.slideTo(l.virtual.slides.length, 0, !1, !0)
        : p.centeredSlides && l.snapIndex < p.slidesPerView
        ? l.slideTo(l.virtual.slides.length + l.snapIndex, 0, !1, !0)
        : l.snapIndex === l.snapGrid.length - 1 &&
          l.slideTo(l.virtual.slidesBefore, 0, !1, !0)),
      (l.allowSlidePrev = c),
      (l.allowSlideNext = d),
      l.emit('loopFix')
    return
  }
  let x = p.slidesPerView
  x === 'auto'
    ? (x = l.slidesPerViewDynamic())
    : ((x = Math.ceil(parseFloat(p.slidesPerView, 10))),
      g && x % 2 === 0 && (x = x + 1))
  const I = p.slidesPerGroupAuto ? x : p.slidesPerGroup
  let b = I
  b % I !== 0 && (b += I - (b % I)),
    (b += p.loopAdditionalSlides),
    (l.loopedSlides = b)
  const E = l.grid && p.grid && p.grid.rows > 1
  u.length < x + b
    ? Gs(
        'Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters'
      )
    : E &&
      p.grid.fill === 'row' &&
      Gs(
        'Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`'
      )
  const w = [],
    y = []
  let L = l.activeIndex
  typeof n > 'u'
    ? (n = l.getSlideIndex(
        u.filter((V) => V.classList.contains(p.slideActiveClass))[0]
      ))
    : (L = n)
  const N = i === 'next' || !i,
    J = i === 'prev' || !i
  let k = 0,
    T = 0
  const C = E ? Math.ceil(u.length / p.grid.rows) : u.length,
    K = (E ? u[n].column : n) + (g && typeof r > 'u' ? -x / 2 + 0.5 : 0)
  if (K < b) {
    k = Math.max(b - K, I)
    for (let V = 0; V < b - K; V += 1) {
      const le = V - Math.floor(V / C) * C
      if (E) {
        const pe = C - le - 1
        for (let re = u.length - 1; re >= 0; re -= 1)
          u[re].column === pe && w.push(re)
      } else w.push(C - le - 1)
    }
  } else if (K + x > C - b) {
    T = Math.max(K - (C - b * 2), I)
    for (let V = 0; V < T; V += 1) {
      const le = V - Math.floor(V / C) * C
      E
        ? u.forEach((pe, re) => {
            pe.column === le && y.push(re)
          })
        : y.push(le)
    }
  }
  if (
    ((l.__preventObserver__ = !0),
    requestAnimationFrame(() => {
      l.__preventObserver__ = !1
    }),
    J &&
      w.forEach((V) => {
        ;(u[V].swiperLoopMoveDOM = !0),
          f.prepend(u[V]),
          (u[V].swiperLoopMoveDOM = !1)
      }),
    N &&
      y.forEach((V) => {
        ;(u[V].swiperLoopMoveDOM = !0),
          f.append(u[V]),
          (u[V].swiperLoopMoveDOM = !1)
      }),
    l.recalcSlides(),
    p.slidesPerView === 'auto'
      ? l.updateSlides()
      : E &&
        ((w.length > 0 && J) || (y.length > 0 && N)) &&
        l.slides.forEach((V, le) => {
          l.grid.updateSlide(le, V, l.slides)
        }),
    p.watchSlidesProgress && l.updateSlidesOffset(),
    s)
  ) {
    if (w.length > 0 && J) {
      if (typeof t > 'u') {
        const V = l.slidesGrid[L],
          pe = l.slidesGrid[L + k] - V
        a
          ? l.setTranslate(l.translate - pe)
          : (l.slideTo(L + k, 0, !1, !0),
            r &&
              ((l.touchEventsData.startTranslate =
                l.touchEventsData.startTranslate - pe),
              (l.touchEventsData.currentTranslate =
                l.touchEventsData.currentTranslate - pe)))
      } else if (r) {
        const V = E ? w.length / p.grid.rows : w.length
        l.slideTo(l.activeIndex + V, 0, !1, !0),
          (l.touchEventsData.currentTranslate = l.translate)
      }
    } else if (y.length > 0 && N)
      if (typeof t > 'u') {
        const V = l.slidesGrid[L],
          pe = l.slidesGrid[L - T] - V
        a
          ? l.setTranslate(l.translate - pe)
          : (l.slideTo(L - T, 0, !1, !0),
            r &&
              ((l.touchEventsData.startTranslate =
                l.touchEventsData.startTranslate - pe),
              (l.touchEventsData.currentTranslate =
                l.touchEventsData.currentTranslate - pe)))
      } else {
        const V = E ? y.length / p.grid.rows : y.length
        l.slideTo(l.activeIndex - V, 0, !1, !0)
      }
  }
  if (
    ((l.allowSlidePrev = c),
    (l.allowSlideNext = d),
    l.controller && l.controller.control && !o)
  ) {
    const V = {
      slideRealIndex: t,
      direction: i,
      setTranslate: r,
      activeSlideIndex: n,
      byController: !0,
    }
    Array.isArray(l.controller.control)
      ? l.controller.control.forEach((le) => {
          !le.destroyed &&
            le.params.loop &&
            le.loopFix({
              ...V,
              slideTo: le.params.slidesPerView === p.slidesPerView ? s : !1,
            })
        })
      : l.controller.control instanceof l.constructor &&
        l.controller.control.params.loop &&
        l.controller.control.loopFix({
          ...V,
          slideTo:
            l.controller.control.params.slidesPerView === p.slidesPerView
              ? s
              : !1,
        })
  }
  l.emit('loopFix')
}
function Cd() {
  const e = this,
    { params: t, slidesEl: s } = e
  if (!t.loop || (e.virtual && e.params.virtual.enabled)) return
  e.recalcSlides()
  const i = []
  e.slides.forEach((r) => {
    const n =
      typeof r.swiperSlideIndex > 'u'
        ? r.getAttribute('data-swiper-slide-index') * 1
        : r.swiperSlideIndex
    i[n] = r
  }),
    e.slides.forEach((r) => {
      r.removeAttribute('data-swiper-slide-index')
    }),
    i.forEach((r) => {
      s.append(r)
    }),
    e.recalcSlides(),
    e.slideTo(e.realIndex, 0)
}
var Id = { loopCreate: Ed, loopFix: Pd, loopDestroy: Cd }
function Md(e) {
  const t = this
  if (
    !t.params.simulateTouch ||
    (t.params.watchOverflow && t.isLocked) ||
    t.params.cssMode
  )
    return
  const s = t.params.touchEventsTarget === 'container' ? t.el : t.wrapperEl
  t.isElement && (t.__preventObserver__ = !0),
    (s.style.cursor = 'move'),
    (s.style.cursor = e ? 'grabbing' : 'grab'),
    t.isElement &&
      requestAnimationFrame(() => {
        t.__preventObserver__ = !1
      })
}
function Od() {
  const e = this
  ;(e.params.watchOverflow && e.isLocked) ||
    e.params.cssMode ||
    (e.isElement && (e.__preventObserver__ = !0),
    (e[
      e.params.touchEventsTarget === 'container' ? 'el' : 'wrapperEl'
    ].style.cursor = ''),
    e.isElement &&
      requestAnimationFrame(() => {
        e.__preventObserver__ = !1
      }))
}
var Ad = { setGrabCursor: Md, unsetGrabCursor: Od }
function Ld(e, t) {
  t === void 0 && (t = this)
  function s(i) {
    if (!i || i === lt() || i === He()) return null
    i.assignedSlot && (i = i.assignedSlot)
    const r = i.closest(e)
    return !r && !i.getRootNode ? null : r || s(i.getRootNode().host)
  }
  return s(t)
}
function yn(e, t, s) {
  const i = He(),
    { params: r } = e,
    n = r.edgeSwipeDetection,
    o = r.edgeSwipeThreshold
  return n && (s <= o || s >= i.innerWidth - o)
    ? n === 'prevent'
      ? (t.preventDefault(), !0)
      : !1
    : !0
}
function Rd(e) {
  const t = this,
    s = lt()
  let i = e
  i.originalEvent && (i = i.originalEvent)
  const r = t.touchEventsData
  if (i.type === 'pointerdown') {
    if (r.pointerId !== null && r.pointerId !== i.pointerId) return
    r.pointerId = i.pointerId
  } else
    i.type === 'touchstart' &&
      i.targetTouches.length === 1 &&
      (r.touchId = i.targetTouches[0].identifier)
  if (i.type === 'touchstart') {
    yn(t, i, i.targetTouches[0].pageX)
    return
  }
  const { params: n, touches: o, enabled: a } = t
  if (
    !a ||
    (!n.simulateTouch && i.pointerType === 'mouse') ||
    (t.animating && n.preventInteractionOnTransition)
  )
    return
  !t.animating && n.cssMode && n.loop && t.loopFix()
  let l = i.target
  if (
    (n.touchEventsTarget === 'wrapper' && !t.wrapperEl.contains(l)) ||
    ('which' in i && i.which === 3) ||
    ('button' in i && i.button > 0) ||
    (r.isTouched && r.isMoved)
  )
    return
  const u = !!n.noSwipingClass && n.noSwipingClass !== '',
    c = i.composedPath ? i.composedPath() : i.path
  u && i.target && i.target.shadowRoot && c && (l = c[0])
  const d = n.noSwipingSelector ? n.noSwipingSelector : `.${n.noSwipingClass}`,
    f = !!(i.target && i.target.shadowRoot)
  if (n.noSwiping && (f ? Ld(d, l) : l.closest(d))) {
    t.allowClick = !0
    return
  }
  if (n.swipeHandler && !l.closest(n.swipeHandler)) return
  ;(o.currentX = i.pageX), (o.currentY = i.pageY)
  const p = o.currentX,
    g = o.currentY
  if (!yn(t, i, p)) return
  Object.assign(r, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0,
  }),
    (o.startX = p),
    (o.startY = g),
    (r.touchStartTime = Ct()),
    (t.allowClick = !0),
    t.updateSize(),
    (t.swipeDirection = void 0),
    n.threshold > 0 && (r.allowThresholdMove = !1)
  let x = !0
  l.matches(r.focusableElements) &&
    ((x = !1), l.nodeName === 'SELECT' && (r.isTouched = !1)),
    s.activeElement &&
      s.activeElement.matches(r.focusableElements) &&
      s.activeElement !== l &&
      s.activeElement.blur()
  const I = x && t.allowTouchMove && n.touchStartPreventDefault
  ;(n.touchStartForcePreventDefault || I) &&
    !l.isContentEditable &&
    i.preventDefault(),
    n.freeMode &&
      n.freeMode.enabled &&
      t.freeMode &&
      t.animating &&
      !n.cssMode &&
      t.freeMode.onTouchStart(),
    t.emit('touchStart', i)
}
function kd(e) {
  const t = lt(),
    s = this,
    i = s.touchEventsData,
    { params: r, touches: n, rtlTranslate: o, enabled: a } = s
  if (!a || (!r.simulateTouch && e.pointerType === 'mouse')) return
  let l = e
  if (
    (l.originalEvent && (l = l.originalEvent),
    l.type === 'pointermove' &&
      (i.touchId !== null || l.pointerId !== i.pointerId))
  )
    return
  let u
  if (l.type === 'touchmove') {
    if (
      ((u = [...l.changedTouches].filter((N) => N.identifier === i.touchId)[0]),
      !u || u.identifier !== i.touchId)
    )
      return
  } else u = l
  if (!i.isTouched) {
    i.startMoving && i.isScrolling && s.emit('touchMoveOpposite', l)
    return
  }
  const c = u.pageX,
    d = u.pageY
  if (l.preventedByNestedSwiper) {
    ;(n.startX = c), (n.startY = d)
    return
  }
  if (!s.allowTouchMove) {
    l.target.matches(i.focusableElements) || (s.allowClick = !1),
      i.isTouched &&
        (Object.assign(n, { startX: c, startY: d, currentX: c, currentY: d }),
        (i.touchStartTime = Ct()))
    return
  }
  if (r.touchReleaseOnEdges && !r.loop) {
    if (s.isVertical()) {
      if (
        (d < n.startY && s.translate <= s.maxTranslate()) ||
        (d > n.startY && s.translate >= s.minTranslate())
      ) {
        ;(i.isTouched = !1), (i.isMoved = !1)
        return
      }
    } else if (
      (c < n.startX && s.translate <= s.maxTranslate()) ||
      (c > n.startX && s.translate >= s.minTranslate())
    )
      return
  }
  if (
    t.activeElement &&
    l.target === t.activeElement &&
    l.target.matches(i.focusableElements)
  ) {
    ;(i.isMoved = !0), (s.allowClick = !1)
    return
  }
  i.allowTouchCallbacks && s.emit('touchMove', l),
    (n.previousX = n.currentX),
    (n.previousY = n.currentY),
    (n.currentX = c),
    (n.currentY = d)
  const f = n.currentX - n.startX,
    p = n.currentY - n.startY
  if (s.params.threshold && Math.sqrt(f ** 2 + p ** 2) < s.params.threshold)
    return
  if (typeof i.isScrolling > 'u') {
    let N
    ;(s.isHorizontal() && n.currentY === n.startY) ||
    (s.isVertical() && n.currentX === n.startX)
      ? (i.isScrolling = !1)
      : f * f + p * p >= 25 &&
        ((N = (Math.atan2(Math.abs(p), Math.abs(f)) * 180) / Math.PI),
        (i.isScrolling = s.isHorizontal()
          ? N > r.touchAngle
          : 90 - N > r.touchAngle))
  }
  if (
    (i.isScrolling && s.emit('touchMoveOpposite', l),
    typeof i.startMoving > 'u' &&
      (n.currentX !== n.startX || n.currentY !== n.startY) &&
      (i.startMoving = !0),
    i.isScrolling)
  ) {
    i.isTouched = !1
    return
  }
  if (!i.startMoving) return
  ;(s.allowClick = !1),
    !r.cssMode && l.cancelable && l.preventDefault(),
    r.touchMoveStopPropagation && !r.nested && l.stopPropagation()
  let g = s.isHorizontal() ? f : p,
    x = s.isHorizontal() ? n.currentX - n.previousX : n.currentY - n.previousY
  r.oneWayMovement &&
    ((g = Math.abs(g) * (o ? 1 : -1)), (x = Math.abs(x) * (o ? 1 : -1))),
    (n.diff = g),
    (g *= r.touchRatio),
    o && ((g = -g), (x = -x))
  const I = s.touchesDirection
  ;(s.swipeDirection = g > 0 ? 'prev' : 'next'),
    (s.touchesDirection = x > 0 ? 'prev' : 'next')
  const b = s.params.loop && !r.cssMode,
    E =
      (s.touchesDirection === 'next' && s.allowSlideNext) ||
      (s.touchesDirection === 'prev' && s.allowSlidePrev)
  if (!i.isMoved) {
    if (
      (b && E && s.loopFix({ direction: s.swipeDirection }),
      (i.startTranslate = s.getTranslate()),
      s.setTransition(0),
      s.animating)
    ) {
      const N = new window.CustomEvent('transitionend', {
        bubbles: !0,
        cancelable: !0,
      })
      s.wrapperEl.dispatchEvent(N)
    }
    ;(i.allowMomentumBounce = !1),
      r.grabCursor &&
        (s.allowSlideNext === !0 || s.allowSlidePrev === !0) &&
        s.setGrabCursor(!0),
      s.emit('sliderFirstMove', l)
  }
  let w
  if (
    (new Date().getTime(),
    i.isMoved &&
      i.allowThresholdMove &&
      I !== s.touchesDirection &&
      b &&
      E &&
      Math.abs(g) >= 1)
  ) {
    Object.assign(n, {
      startX: c,
      startY: d,
      currentX: c,
      currentY: d,
      startTranslate: i.currentTranslate,
    }),
      (i.loopSwapReset = !0),
      (i.startTranslate = i.currentTranslate)
    return
  }
  s.emit('sliderMove', l),
    (i.isMoved = !0),
    (i.currentTranslate = g + i.startTranslate)
  let y = !0,
    L = r.resistanceRatio
  if (
    (r.touchReleaseOnEdges && (L = 0),
    g > 0
      ? (b &&
          E &&
          !w &&
          i.allowThresholdMove &&
          i.currentTranslate >
            (r.centeredSlides
              ? s.minTranslate() - s.slidesSizesGrid[s.activeIndex + 1]
              : s.minTranslate()) &&
          s.loopFix({
            direction: 'prev',
            setTranslate: !0,
            activeSlideIndex: 0,
          }),
        i.currentTranslate > s.minTranslate() &&
          ((y = !1),
          r.resistance &&
            (i.currentTranslate =
              s.minTranslate() -
              1 +
              (-s.minTranslate() + i.startTranslate + g) ** L)))
      : g < 0 &&
        (b &&
          E &&
          !w &&
          i.allowThresholdMove &&
          i.currentTranslate <
            (r.centeredSlides
              ? s.maxTranslate() +
                s.slidesSizesGrid[s.slidesSizesGrid.length - 1]
              : s.maxTranslate()) &&
          s.loopFix({
            direction: 'next',
            setTranslate: !0,
            activeSlideIndex:
              s.slides.length -
              (r.slidesPerView === 'auto'
                ? s.slidesPerViewDynamic()
                : Math.ceil(parseFloat(r.slidesPerView, 10))),
          }),
        i.currentTranslate < s.maxTranslate() &&
          ((y = !1),
          r.resistance &&
            (i.currentTranslate =
              s.maxTranslate() +
              1 -
              (s.maxTranslate() - i.startTranslate - g) ** L))),
    y && (l.preventedByNestedSwiper = !0),
    !s.allowSlideNext &&
      s.swipeDirection === 'next' &&
      i.currentTranslate < i.startTranslate &&
      (i.currentTranslate = i.startTranslate),
    !s.allowSlidePrev &&
      s.swipeDirection === 'prev' &&
      i.currentTranslate > i.startTranslate &&
      (i.currentTranslate = i.startTranslate),
    !s.allowSlidePrev &&
      !s.allowSlideNext &&
      (i.currentTranslate = i.startTranslate),
    r.threshold > 0)
  )
    if (Math.abs(g) > r.threshold || i.allowThresholdMove) {
      if (!i.allowThresholdMove) {
        ;(i.allowThresholdMove = !0),
          (n.startX = n.currentX),
          (n.startY = n.currentY),
          (i.currentTranslate = i.startTranslate),
          (n.diff = s.isHorizontal()
            ? n.currentX - n.startX
            : n.currentY - n.startY)
        return
      }
    } else {
      i.currentTranslate = i.startTranslate
      return
    }
  !r.followFinger ||
    r.cssMode ||
    (((r.freeMode && r.freeMode.enabled && s.freeMode) ||
      r.watchSlidesProgress) &&
      (s.updateActiveIndex(), s.updateSlidesClasses()),
    r.freeMode && r.freeMode.enabled && s.freeMode && s.freeMode.onTouchMove(),
    s.updateProgress(i.currentTranslate),
    s.setTranslate(i.currentTranslate))
}
function zd(e) {
  const t = this,
    s = t.touchEventsData
  let i = e
  i.originalEvent && (i = i.originalEvent)
  let r
  if (i.type === 'touchend' || i.type === 'touchcancel') {
    if (
      ((r = [...i.changedTouches].filter((L) => L.identifier === s.touchId)[0]),
      !r || r.identifier !== s.touchId)
    )
      return
  } else {
    if (s.touchId !== null || i.pointerId !== s.pointerId) return
    r = i
  }
  if (
    ['pointercancel', 'pointerout', 'pointerleave', 'contextmenu'].includes(
      i.type
    ) &&
    !(
      ['pointercancel', 'contextmenu'].includes(i.type) &&
      (t.browser.isSafari || t.browser.isWebView)
    )
  )
    return
  ;(s.pointerId = null), (s.touchId = null)
  const {
    params: o,
    touches: a,
    rtlTranslate: l,
    slidesGrid: u,
    enabled: c,
  } = t
  if (!c || (!o.simulateTouch && i.pointerType === 'mouse')) return
  if (
    (s.allowTouchCallbacks && t.emit('touchEnd', i),
    (s.allowTouchCallbacks = !1),
    !s.isTouched)
  ) {
    s.isMoved && o.grabCursor && t.setGrabCursor(!1),
      (s.isMoved = !1),
      (s.startMoving = !1)
    return
  }
  o.grabCursor &&
    s.isMoved &&
    s.isTouched &&
    (t.allowSlideNext === !0 || t.allowSlidePrev === !0) &&
    t.setGrabCursor(!1)
  const d = Ct(),
    f = d - s.touchStartTime
  if (t.allowClick) {
    const L = i.path || (i.composedPath && i.composedPath())
    t.updateClickedSlide((L && L[0]) || i.target, L),
      t.emit('tap click', i),
      f < 300 && d - s.lastClickTime < 300 && t.emit('doubleTap doubleClick', i)
  }
  if (
    ((s.lastClickTime = Ct()),
    Hi(() => {
      t.destroyed || (t.allowClick = !0)
    }),
    !s.isTouched ||
      !s.isMoved ||
      !t.swipeDirection ||
      (a.diff === 0 && !s.loopSwapReset) ||
      (s.currentTranslate === s.startTranslate && !s.loopSwapReset))
  ) {
    ;(s.isTouched = !1), (s.isMoved = !1), (s.startMoving = !1)
    return
  }
  ;(s.isTouched = !1), (s.isMoved = !1), (s.startMoving = !1)
  let p
  if (
    (o.followFinger
      ? (p = l ? t.translate : -t.translate)
      : (p = -s.currentTranslate),
    o.cssMode)
  )
    return
  if (o.freeMode && o.freeMode.enabled) {
    t.freeMode.onTouchEnd({ currentPos: p })
    return
  }
  const g = p >= -t.maxTranslate() && !t.params.loop
  let x = 0,
    I = t.slidesSizesGrid[0]
  for (
    let L = 0;
    L < u.length;
    L += L < o.slidesPerGroupSkip ? 1 : o.slidesPerGroup
  ) {
    const N = L < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup
    typeof u[L + N] < 'u'
      ? (g || (p >= u[L] && p < u[L + N])) && ((x = L), (I = u[L + N] - u[L]))
      : (g || p >= u[L]) && ((x = L), (I = u[u.length - 1] - u[u.length - 2]))
  }
  let b = null,
    E = null
  o.rewind &&
    (t.isBeginning
      ? (E =
          o.virtual && o.virtual.enabled && t.virtual
            ? t.virtual.slides.length - 1
            : t.slides.length - 1)
      : t.isEnd && (b = 0))
  const w = (p - u[x]) / I,
    y = x < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup
  if (f > o.longSwipesMs) {
    if (!o.longSwipes) {
      t.slideTo(t.activeIndex)
      return
    }
    t.swipeDirection === 'next' &&
      (w >= o.longSwipesRatio
        ? t.slideTo(o.rewind && t.isEnd ? b : x + y)
        : t.slideTo(x)),
      t.swipeDirection === 'prev' &&
        (w > 1 - o.longSwipesRatio
          ? t.slideTo(x + y)
          : E !== null && w < 0 && Math.abs(w) > o.longSwipesRatio
          ? t.slideTo(E)
          : t.slideTo(x))
  } else {
    if (!o.shortSwipes) {
      t.slideTo(t.activeIndex)
      return
    }
    t.navigation &&
    (i.target === t.navigation.nextEl || i.target === t.navigation.prevEl)
      ? i.target === t.navigation.nextEl
        ? t.slideTo(x + y)
        : t.slideTo(x)
      : (t.swipeDirection === 'next' && t.slideTo(b !== null ? b : x + y),
        t.swipeDirection === 'prev' && t.slideTo(E !== null ? E : x))
  }
}
function _n() {
  const e = this,
    { params: t, el: s } = e
  if (s && s.offsetWidth === 0) return
  t.breakpoints && e.setBreakpoint()
  const { allowSlideNext: i, allowSlidePrev: r, snapGrid: n } = e,
    o = e.virtual && e.params.virtual.enabled
  ;(e.allowSlideNext = !0),
    (e.allowSlidePrev = !0),
    e.updateSize(),
    e.updateSlides(),
    e.updateSlidesClasses()
  const a = o && t.loop
  ;(t.slidesPerView === 'auto' || t.slidesPerView > 1) &&
  e.isEnd &&
  !e.isBeginning &&
  !e.params.centeredSlides &&
  !a
    ? e.slideTo(e.slides.length - 1, 0, !1, !0)
    : e.params.loop && !o
    ? e.slideToLoop(e.realIndex, 0, !1, !0)
    : e.slideTo(e.activeIndex, 0, !1, !0),
    e.autoplay &&
      e.autoplay.running &&
      e.autoplay.paused &&
      (clearTimeout(e.autoplay.resizeTimeout),
      (e.autoplay.resizeTimeout = setTimeout(() => {
        e.autoplay &&
          e.autoplay.running &&
          e.autoplay.paused &&
          e.autoplay.resume()
      }, 500))),
    (e.allowSlidePrev = r),
    (e.allowSlideNext = i),
    e.params.watchOverflow && n !== e.snapGrid && e.checkOverflow()
}
function $d(e) {
  const t = this
  t.enabled &&
    (t.allowClick ||
      (t.params.preventClicks && e.preventDefault(),
      t.params.preventClicksPropagation &&
        t.animating &&
        (e.stopPropagation(), e.stopImmediatePropagation())))
}
function Dd() {
  const e = this,
    { wrapperEl: t, rtlTranslate: s, enabled: i } = e
  if (!i) return
  ;(e.previousTranslate = e.translate),
    e.isHorizontal()
      ? (e.translate = -t.scrollLeft)
      : (e.translate = -t.scrollTop),
    e.translate === 0 && (e.translate = 0),
    e.updateActiveIndex(),
    e.updateSlidesClasses()
  let r
  const n = e.maxTranslate() - e.minTranslate()
  n === 0 ? (r = 0) : (r = (e.translate - e.minTranslate()) / n),
    r !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
    e.emit('setTranslate', e.translate, !1)
}
function Bd(e) {
  const t = this
  Ds(t, e.target),
    !(
      t.params.cssMode ||
      (t.params.slidesPerView !== 'auto' && !t.params.autoHeight)
    ) && t.update()
}
function jd() {
  const e = this
  e.documentTouchHandlerProceeded ||
    ((e.documentTouchHandlerProceeded = !0),
    e.params.touchReleaseOnEdges && (e.el.style.touchAction = 'auto'))
}
const Bo = (e, t) => {
  const s = lt(),
    { params: i, el: r, wrapperEl: n, device: o } = e,
    a = !!i.nested,
    l = t === 'on' ? 'addEventListener' : 'removeEventListener',
    u = t
  s[l]('touchstart', e.onDocumentTouchStart, { passive: !1, capture: a }),
    r[l]('touchstart', e.onTouchStart, { passive: !1 }),
    r[l]('pointerdown', e.onTouchStart, { passive: !1 }),
    s[l]('touchmove', e.onTouchMove, { passive: !1, capture: a }),
    s[l]('pointermove', e.onTouchMove, { passive: !1, capture: a }),
    s[l]('touchend', e.onTouchEnd, { passive: !0 }),
    s[l]('pointerup', e.onTouchEnd, { passive: !0 }),
    s[l]('pointercancel', e.onTouchEnd, { passive: !0 }),
    s[l]('touchcancel', e.onTouchEnd, { passive: !0 }),
    s[l]('pointerout', e.onTouchEnd, { passive: !0 }),
    s[l]('pointerleave', e.onTouchEnd, { passive: !0 }),
    s[l]('contextmenu', e.onTouchEnd, { passive: !0 }),
    (i.preventClicks || i.preventClicksPropagation) &&
      r[l]('click', e.onClick, !0),
    i.cssMode && n[l]('scroll', e.onScroll),
    i.updateOnWindowResize
      ? e[u](
          o.ios || o.android
            ? 'resize orientationchange observerUpdate'
            : 'resize observerUpdate',
          _n,
          !0
        )
      : e[u]('observerUpdate', _n, !0),
    r[l]('load', e.onLoad, { capture: !0 })
}
function Nd() {
  const e = this,
    { params: t } = e
  ;(e.onTouchStart = Rd.bind(e)),
    (e.onTouchMove = kd.bind(e)),
    (e.onTouchEnd = zd.bind(e)),
    (e.onDocumentTouchStart = jd.bind(e)),
    t.cssMode && (e.onScroll = Dd.bind(e)),
    (e.onClick = $d.bind(e)),
    (e.onLoad = Bd.bind(e)),
    Bo(e, 'on')
}
function Fd() {
  Bo(this, 'off')
}
var Hd = { attachEvents: Nd, detachEvents: Fd }
const Sn = (e, t) => e.grid && t.grid && t.grid.rows > 1
function Vd() {
  const e = this,
    { realIndex: t, initialized: s, params: i, el: r } = e,
    n = i.breakpoints
  if (!n || (n && Object.keys(n).length === 0)) return
  const o = e.getBreakpoint(n, e.params.breakpointsBase, e.el)
  if (!o || e.currentBreakpoint === o) return
  const l = (o in n ? n[o] : void 0) || e.originalParams,
    u = Sn(e, i),
    c = Sn(e, l),
    d = i.enabled
  u && !c
    ? (r.classList.remove(
        `${i.containerModifierClass}grid`,
        `${i.containerModifierClass}grid-column`
      ),
      e.emitContainerClasses())
    : !u &&
      c &&
      (r.classList.add(`${i.containerModifierClass}grid`),
      ((l.grid.fill && l.grid.fill === 'column') ||
        (!l.grid.fill && i.grid.fill === 'column')) &&
        r.classList.add(`${i.containerModifierClass}grid-column`),
      e.emitContainerClasses()),
    ['navigation', 'pagination', 'scrollbar'].forEach((b) => {
      if (typeof l[b] > 'u') return
      const E = i[b] && i[b].enabled,
        w = l[b] && l[b].enabled
      E && !w && e[b].disable(), !E && w && e[b].enable()
    })
  const f = l.direction && l.direction !== i.direction,
    p = i.loop && (l.slidesPerView !== i.slidesPerView || f),
    g = i.loop
  f && s && e.changeDirection(), Be(e.params, l)
  const x = e.params.enabled,
    I = e.params.loop
  Object.assign(e, {
    allowTouchMove: e.params.allowTouchMove,
    allowSlideNext: e.params.allowSlideNext,
    allowSlidePrev: e.params.allowSlidePrev,
  }),
    d && !x ? e.disable() : !d && x && e.enable(),
    (e.currentBreakpoint = o),
    e.emit('_beforeBreakpoint', l),
    s &&
      (p
        ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides())
        : !g && I
        ? (e.loopCreate(t), e.updateSlides())
        : g && !I && e.loopDestroy()),
    e.emit('breakpoint', l)
}
function qd(e, t, s) {
  if ((t === void 0 && (t = 'window'), !e || (t === 'container' && !s))) return
  let i = !1
  const r = He(),
    n = t === 'window' ? r.innerHeight : s.clientHeight,
    o = Object.keys(e).map((a) => {
      if (typeof a == 'string' && a.indexOf('@') === 0) {
        const l = parseFloat(a.substr(1))
        return { value: n * l, point: a }
      }
      return { value: a, point: a }
    })
  o.sort((a, l) => parseInt(a.value, 10) - parseInt(l.value, 10))
  for (let a = 0; a < o.length; a += 1) {
    const { point: l, value: u } = o[a]
    t === 'window'
      ? r.matchMedia(`(min-width: ${u}px)`).matches && (i = l)
      : u <= s.clientWidth && (i = l)
  }
  return i || 'max'
}
var Gd = { setBreakpoint: Vd, getBreakpoint: qd }
function Wd(e, t) {
  const s = []
  return (
    e.forEach((i) => {
      typeof i == 'object'
        ? Object.keys(i).forEach((r) => {
            i[r] && s.push(t + r)
          })
        : typeof i == 'string' && s.push(t + i)
    }),
    s
  )
}
function Ud() {
  const e = this,
    { classNames: t, params: s, rtl: i, el: r, device: n } = e,
    o = Wd(
      [
        'initialized',
        s.direction,
        { 'free-mode': e.params.freeMode && s.freeMode.enabled },
        { autoheight: s.autoHeight },
        { rtl: i },
        { grid: s.grid && s.grid.rows > 1 },
        {
          'grid-column': s.grid && s.grid.rows > 1 && s.grid.fill === 'column',
        },
        { android: n.android },
        { ios: n.ios },
        { 'css-mode': s.cssMode },
        { centered: s.cssMode && s.centeredSlides },
        { 'watch-progress': s.watchSlidesProgress },
      ],
      s.containerModifierClass
    )
  t.push(...o), r.classList.add(...t), e.emitContainerClasses()
}
function Kd() {
  const e = this,
    { el: t, classNames: s } = e
  t.classList.remove(...s), e.emitContainerClasses()
}
var Yd = { addClasses: Ud, removeClasses: Kd }
function Xd() {
  const e = this,
    { isLocked: t, params: s } = e,
    { slidesOffsetBefore: i } = s
  if (i) {
    const r = e.slides.length - 1,
      n = e.slidesGrid[r] + e.slidesSizesGrid[r] + i * 2
    e.isLocked = e.size > n
  } else e.isLocked = e.snapGrid.length === 1
  s.allowSlideNext === !0 && (e.allowSlideNext = !e.isLocked),
    s.allowSlidePrev === !0 && (e.allowSlidePrev = !e.isLocked),
    t && t !== e.isLocked && (e.isEnd = !1),
    t !== e.isLocked && e.emit(e.isLocked ? 'lock' : 'unlock')
}
var Qd = { checkOverflow: Xd },
  Gi = {
    init: !0,
    direction: 'horizontal',
    oneWayMovement: !1,
    touchEventsTarget: 'wrapper',
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    eventsPrefix: 'swiper',
    enabled: !0,
    focusableElements: 'input, select, option, textarea, button, video, label',
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: 'slide',
    breakpoints: void 0,
    breakpointsBase: 'window',
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopAddBlankSlides: !0,
    loopAdditionalSlides: 0,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: 'swiper-no-swiping',
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: 'swiper-',
    slideClass: 'swiper-slide',
    slideBlankClass: 'swiper-slide-blank',
    slideActiveClass: 'swiper-slide-active',
    slideVisibleClass: 'swiper-slide-visible',
    slideFullyVisibleClass: 'swiper-slide-fully-visible',
    slideNextClass: 'swiper-slide-next',
    slidePrevClass: 'swiper-slide-prev',
    wrapperClass: 'swiper-wrapper',
    lazyPreloaderClass: 'swiper-lazy-preloader',
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  }
function Jd(e, t) {
  return function (i) {
    i === void 0 && (i = {})
    const r = Object.keys(i)[0],
      n = i[r]
    if (typeof n != 'object' || n === null) {
      Be(t, i)
      return
    }
    if (
      (e[r] === !0 && (e[r] = { enabled: !0 }),
      r === 'navigation' &&
        e[r] &&
        e[r].enabled &&
        !e[r].prevEl &&
        !e[r].nextEl &&
        (e[r].auto = !0),
      ['pagination', 'scrollbar'].indexOf(r) >= 0 &&
        e[r] &&
        e[r].enabled &&
        !e[r].el &&
        (e[r].auto = !0),
      !(r in e && 'enabled' in n))
    ) {
      Be(t, i)
      return
    }
    typeof e[r] == 'object' && !('enabled' in e[r]) && (e[r].enabled = !0),
      e[r] || (e[r] = { enabled: !1 }),
      Be(t, i)
  }
}
const Si = {
    eventsEmitter: Yu,
    update: od,
    translate: fd,
    transition: gd,
    slide: Td,
    loop: Id,
    grabCursor: Ad,
    events: Hd,
    breakpoints: Gd,
    checkOverflow: Qd,
    classes: Yd,
  },
  Ti = {}
let vr = class st {
  constructor() {
    let t, s
    for (var i = arguments.length, r = new Array(i), n = 0; n < i; n++)
      r[n] = arguments[n]
    r.length === 1 &&
    r[0].constructor &&
    Object.prototype.toString.call(r[0]).slice(8, -1) === 'Object'
      ? (s = r[0])
      : ([t, s] = r),
      s || (s = {}),
      (s = Be({}, s)),
      t && !s.el && (s.el = t)
    const o = lt()
    if (
      s.el &&
      typeof s.el == 'string' &&
      o.querySelectorAll(s.el).length > 1
    ) {
      const c = []
      return (
        o.querySelectorAll(s.el).forEach((d) => {
          const f = Be({}, s, { el: d })
          c.push(new st(f))
        }),
        c
      )
    }
    const a = this
    ;(a.__swiper__ = !0),
      (a.support = $o()),
      (a.device = qu({ userAgent: s.userAgent })),
      (a.browser = Wu()),
      (a.eventsListeners = {}),
      (a.eventsAnyListeners = []),
      (a.modules = [...a.__modules__]),
      s.modules && Array.isArray(s.modules) && a.modules.push(...s.modules)
    const l = {}
    a.modules.forEach((c) => {
      c({
        params: s,
        swiper: a,
        extendParams: Jd(s, l),
        on: a.on.bind(a),
        once: a.once.bind(a),
        off: a.off.bind(a),
        emit: a.emit.bind(a),
      })
    })
    const u = Be({}, Gi, l)
    return (
      (a.params = Be({}, u, Ti, s)),
      (a.originalParams = Be({}, a.params)),
      (a.passedParams = Be({}, s)),
      a.params &&
        a.params.on &&
        Object.keys(a.params.on).forEach((c) => {
          a.on(c, a.params.on[c])
        }),
      a.params && a.params.onAny && a.onAny(a.params.onAny),
      Object.assign(a, {
        enabled: a.params.enabled,
        el: t,
        classNames: [],
        slides: [],
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal() {
          return a.params.direction === 'horizontal'
        },
        isVertical() {
          return a.params.direction === 'vertical'
        },
        activeIndex: 0,
        realIndex: 0,
        isBeginning: !0,
        isEnd: !1,
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: !1,
        cssOverflowAdjustment() {
          return Math.trunc(this.translate / 2 ** 23) * 2 ** 23
        },
        allowSlideNext: a.params.allowSlideNext,
        allowSlidePrev: a.params.allowSlidePrev,
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: a.params.focusableElements,
          lastClickTime: 0,
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          startMoving: void 0,
          pointerId: null,
          touchId: null,
        },
        allowClick: !0,
        allowTouchMove: a.params.allowTouchMove,
        touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
        imagesToLoad: [],
        imagesLoaded: 0,
      }),
      a.emit('_swiper'),
      a.params.init && a.init(),
      a
    )
  }
  getDirectionLabel(t) {
    return this.isHorizontal()
      ? t
      : {
          width: 'height',
          'margin-top': 'margin-left',
          'margin-bottom ': 'margin-right',
          'margin-left': 'margin-top',
          'margin-right': 'margin-bottom',
          'padding-left': 'padding-top',
          'padding-right': 'padding-bottom',
          marginRight: 'marginBottom',
        }[t]
  }
  getSlideIndex(t) {
    const { slidesEl: s, params: i } = this,
      r = rt(s, `.${i.slideClass}, swiper-slide`),
      n = xn(r[0])
    return xn(t) - n
  }
  getSlideIndexByData(t) {
    return this.getSlideIndex(
      this.slides.filter(
        (s) => s.getAttribute('data-swiper-slide-index') * 1 === t
      )[0]
    )
  }
  recalcSlides() {
    const t = this,
      { slidesEl: s, params: i } = t
    t.slides = rt(s, `.${i.slideClass}, swiper-slide`)
  }
  enable() {
    const t = this
    t.enabled ||
      ((t.enabled = !0),
      t.params.grabCursor && t.setGrabCursor(),
      t.emit('enable'))
  }
  disable() {
    const t = this
    t.enabled &&
      ((t.enabled = !1),
      t.params.grabCursor && t.unsetGrabCursor(),
      t.emit('disable'))
  }
  setProgress(t, s) {
    const i = this
    t = Math.min(Math.max(t, 0), 1)
    const r = i.minTranslate(),
      o = (i.maxTranslate() - r) * t + r
    i.translateTo(o, typeof s > 'u' ? 0 : s),
      i.updateActiveIndex(),
      i.updateSlidesClasses()
  }
  emitContainerClasses() {
    const t = this
    if (!t.params._emitClasses || !t.el) return
    const s = t.el.className
      .split(' ')
      .filter(
        (i) =>
          i.indexOf('swiper') === 0 ||
          i.indexOf(t.params.containerModifierClass) === 0
      )
    t.emit('_containerClasses', s.join(' '))
  }
  getSlideClasses(t) {
    const s = this
    return s.destroyed
      ? ''
      : t.className
          .split(' ')
          .filter(
            (i) =>
              i.indexOf('swiper-slide') === 0 ||
              i.indexOf(s.params.slideClass) === 0
          )
          .join(' ')
  }
  emitSlidesClasses() {
    const t = this
    if (!t.params._emitClasses || !t.el) return
    const s = []
    t.slides.forEach((i) => {
      const r = t.getSlideClasses(i)
      s.push({ slideEl: i, classNames: r }), t.emit('_slideClass', i, r)
    }),
      t.emit('_slideClasses', s)
  }
  slidesPerViewDynamic(t, s) {
    t === void 0 && (t = 'current'), s === void 0 && (s = !1)
    const i = this,
      {
        params: r,
        slides: n,
        slidesGrid: o,
        slidesSizesGrid: a,
        size: l,
        activeIndex: u,
      } = i
    let c = 1
    if (typeof r.slidesPerView == 'number') return r.slidesPerView
    if (r.centeredSlides) {
      let d = n[u] ? n[u].swiperSlideSize : 0,
        f
      for (let p = u + 1; p < n.length; p += 1)
        n[p] && !f && ((d += n[p].swiperSlideSize), (c += 1), d > l && (f = !0))
      for (let p = u - 1; p >= 0; p -= 1)
        n[p] && !f && ((d += n[p].swiperSlideSize), (c += 1), d > l && (f = !0))
    } else if (t === 'current')
      for (let d = u + 1; d < n.length; d += 1)
        (s ? o[d] + a[d] - o[u] < l : o[d] - o[u] < l) && (c += 1)
    else for (let d = u - 1; d >= 0; d -= 1) o[u] - o[d] < l && (c += 1)
    return c
  }
  update() {
    const t = this
    if (!t || t.destroyed) return
    const { snapGrid: s, params: i } = t
    i.breakpoints && t.setBreakpoint(),
      [...t.el.querySelectorAll('[loading="lazy"]')].forEach((o) => {
        o.complete && Ds(t, o)
      }),
      t.updateSize(),
      t.updateSlides(),
      t.updateProgress(),
      t.updateSlidesClasses()
    function r() {
      const o = t.rtlTranslate ? t.translate * -1 : t.translate,
        a = Math.min(Math.max(o, t.maxTranslate()), t.minTranslate())
      t.setTranslate(a), t.updateActiveIndex(), t.updateSlidesClasses()
    }
    let n
    if (i.freeMode && i.freeMode.enabled && !i.cssMode)
      r(), i.autoHeight && t.updateAutoHeight()
    else {
      if (
        (i.slidesPerView === 'auto' || i.slidesPerView > 1) &&
        t.isEnd &&
        !i.centeredSlides
      ) {
        const o = t.virtual && i.virtual.enabled ? t.virtual.slides : t.slides
        n = t.slideTo(o.length - 1, 0, !1, !0)
      } else n = t.slideTo(t.activeIndex, 0, !1, !0)
      n || r()
    }
    i.watchOverflow && s !== t.snapGrid && t.checkOverflow(), t.emit('update')
  }
  changeDirection(t, s) {
    s === void 0 && (s = !0)
    const i = this,
      r = i.params.direction
    return (
      t || (t = r === 'horizontal' ? 'vertical' : 'horizontal'),
      t === r ||
        (t !== 'horizontal' && t !== 'vertical') ||
        (i.el.classList.remove(`${i.params.containerModifierClass}${r}`),
        i.el.classList.add(`${i.params.containerModifierClass}${t}`),
        i.emitContainerClasses(),
        (i.params.direction = t),
        i.slides.forEach((n) => {
          t === 'vertical' ? (n.style.width = '') : (n.style.height = '')
        }),
        i.emit('changeDirection'),
        s && i.update()),
      i
    )
  }
  changeLanguageDirection(t) {
    const s = this
    ;(s.rtl && t === 'rtl') ||
      (!s.rtl && t === 'ltr') ||
      ((s.rtl = t === 'rtl'),
      (s.rtlTranslate = s.params.direction === 'horizontal' && s.rtl),
      s.rtl
        ? (s.el.classList.add(`${s.params.containerModifierClass}rtl`),
          (s.el.dir = 'rtl'))
        : (s.el.classList.remove(`${s.params.containerModifierClass}rtl`),
          (s.el.dir = 'ltr')),
      s.update())
  }
  mount(t) {
    const s = this
    if (s.mounted) return !0
    let i = t || s.params.el
    if ((typeof i == 'string' && (i = document.querySelector(i)), !i)) return !1
    ;(i.swiper = s),
      i.parentNode &&
        i.parentNode.host &&
        i.parentNode.host.nodeName === 'SWIPER-CONTAINER' &&
        (s.isElement = !0)
    const r = () =>
      `.${(s.params.wrapperClass || '').trim().split(' ').join('.')}`
    let o = (() =>
      i && i.shadowRoot && i.shadowRoot.querySelector
        ? i.shadowRoot.querySelector(r())
        : rt(i, r())[0])()
    return (
      !o &&
        s.params.createElements &&
        ((o = Vi('div', s.params.wrapperClass)),
        i.append(o),
        rt(i, `.${s.params.slideClass}`).forEach((a) => {
          o.append(a)
        })),
      Object.assign(s, {
        el: i,
        wrapperEl: o,
        slidesEl:
          s.isElement && !i.parentNode.host.slideSlots ? i.parentNode.host : o,
        hostEl: s.isElement ? i.parentNode.host : i,
        mounted: !0,
        rtl: i.dir.toLowerCase() === 'rtl' || mt(i, 'direction') === 'rtl',
        rtlTranslate:
          s.params.direction === 'horizontal' &&
          (i.dir.toLowerCase() === 'rtl' || mt(i, 'direction') === 'rtl'),
        wrongRTL: mt(o, 'display') === '-webkit-box',
      }),
      !0
    )
  }
  init(t) {
    const s = this
    if (s.initialized || s.mount(t) === !1) return s
    s.emit('beforeInit'),
      s.params.breakpoints && s.setBreakpoint(),
      s.addClasses(),
      s.updateSize(),
      s.updateSlides(),
      s.params.watchOverflow && s.checkOverflow(),
      s.params.grabCursor && s.enabled && s.setGrabCursor(),
      s.params.loop && s.virtual && s.params.virtual.enabled
        ? s.slideTo(
            s.params.initialSlide + s.virtual.slidesBefore,
            0,
            s.params.runCallbacksOnInit,
            !1,
            !0
          )
        : s.slideTo(
            s.params.initialSlide,
            0,
            s.params.runCallbacksOnInit,
            !1,
            !0
          ),
      s.params.loop && s.loopCreate(),
      s.attachEvents()
    const r = [...s.el.querySelectorAll('[loading="lazy"]')]
    return (
      s.isElement && r.push(...s.hostEl.querySelectorAll('[loading="lazy"]')),
      r.forEach((n) => {
        n.complete
          ? Ds(s, n)
          : n.addEventListener('load', (o) => {
              Ds(s, o.target)
            })
      }),
      qi(s),
      (s.initialized = !0),
      qi(s),
      s.emit('init'),
      s.emit('afterInit'),
      s
    )
  }
  destroy(t, s) {
    t === void 0 && (t = !0), s === void 0 && (s = !0)
    const i = this,
      { params: r, el: n, wrapperEl: o, slides: a } = i
    return (
      typeof i.params > 'u' ||
        i.destroyed ||
        (i.emit('beforeDestroy'),
        (i.initialized = !1),
        i.detachEvents(),
        r.loop && i.loopDestroy(),
        s &&
          (i.removeClasses(),
          n.removeAttribute('style'),
          o.removeAttribute('style'),
          a &&
            a.length &&
            a.forEach((l) => {
              l.classList.remove(
                r.slideVisibleClass,
                r.slideFullyVisibleClass,
                r.slideActiveClass,
                r.slideNextClass,
                r.slidePrevClass
              ),
                l.removeAttribute('style'),
                l.removeAttribute('data-swiper-slide-index')
            })),
        i.emit('destroy'),
        Object.keys(i.eventsListeners).forEach((l) => {
          i.off(l)
        }),
        t !== !1 && ((i.el.swiper = null), zu(i)),
        (i.destroyed = !0)),
      null
    )
  }
  static extendDefaults(t) {
    Be(Ti, t)
  }
  static get extendedDefaults() {
    return Ti
  }
  static get defaults() {
    return Gi
  }
  static installModule(t) {
    st.prototype.__modules__ || (st.prototype.__modules__ = [])
    const s = st.prototype.__modules__
    typeof t == 'function' && s.indexOf(t) < 0 && s.push(t)
  }
  static use(t) {
    return Array.isArray(t)
      ? (t.forEach((s) => st.installModule(s)), st)
      : (st.installModule(t), st)
  }
}
Object.keys(Si).forEach((e) => {
  Object.keys(Si[e]).forEach((t) => {
    vr.prototype[t] = Si[e][t]
  })
})
vr.use([Uu, Ku])
const jo = [
  'eventsPrefix',
  'injectStyles',
  'injectStylesUrls',
  'modules',
  'init',
  '_direction',
  'oneWayMovement',
  'touchEventsTarget',
  'initialSlide',
  '_speed',
  'cssMode',
  'updateOnWindowResize',
  'resizeObserver',
  'nested',
  'focusableElements',
  '_enabled',
  '_width',
  '_height',
  'preventInteractionOnTransition',
  'userAgent',
  'url',
  '_edgeSwipeDetection',
  '_edgeSwipeThreshold',
  '_freeMode',
  '_autoHeight',
  'setWrapperSize',
  'virtualTranslate',
  '_effect',
  'breakpoints',
  'breakpointsBase',
  '_spaceBetween',
  '_slidesPerView',
  'maxBackfaceHiddenSlides',
  '_grid',
  '_slidesPerGroup',
  '_slidesPerGroupSkip',
  '_slidesPerGroupAuto',
  '_centeredSlides',
  '_centeredSlidesBounds',
  '_slidesOffsetBefore',
  '_slidesOffsetAfter',
  'normalizeSlideIndex',
  '_centerInsufficientSlides',
  '_watchOverflow',
  'roundLengths',
  'touchRatio',
  'touchAngle',
  'simulateTouch',
  '_shortSwipes',
  '_longSwipes',
  'longSwipesRatio',
  'longSwipesMs',
  '_followFinger',
  'allowTouchMove',
  '_threshold',
  'touchMoveStopPropagation',
  'touchStartPreventDefault',
  'touchStartForcePreventDefault',
  'touchReleaseOnEdges',
  'uniqueNavElements',
  '_resistance',
  '_resistanceRatio',
  '_watchSlidesProgress',
  '_grabCursor',
  'preventClicks',
  'preventClicksPropagation',
  '_slideToClickedSlide',
  '_loop',
  'loopAdditionalSlides',
  'loopAddBlankSlides',
  'loopPreventsSliding',
  '_rewind',
  '_allowSlidePrev',
  '_allowSlideNext',
  '_swipeHandler',
  '_noSwiping',
  'noSwipingClass',
  'noSwipingSelector',
  'passiveListeners',
  'containerModifierClass',
  'slideClass',
  'slideActiveClass',
  'slideVisibleClass',
  'slideFullyVisibleClass',
  'slideNextClass',
  'slidePrevClass',
  'slideBlankClass',
  'wrapperClass',
  'lazyPreloaderClass',
  'lazyPreloadPrevNext',
  'runCallbacksOnInit',
  'observer',
  'observeParents',
  'observeSlideChildren',
  'a11y',
  '_autoplay',
  '_controller',
  'coverflowEffect',
  'cubeEffect',
  'fadeEffect',
  'flipEffect',
  'creativeEffect',
  'cardsEffect',
  'hashNavigation',
  'history',
  'keyboard',
  'mousewheel',
  '_navigation',
  '_pagination',
  'parallax',
  '_scrollbar',
  '_thumbs',
  'virtual',
  'zoom',
  'control',
]
function Ot(e) {
  return (
    typeof e == 'object' &&
    e !== null &&
    e.constructor &&
    Object.prototype.toString.call(e).slice(8, -1) === 'Object' &&
    !e.__swiper__
  )
}
function Ht(e, t) {
  const s = ['__proto__', 'constructor', 'prototype']
  Object.keys(t)
    .filter((i) => s.indexOf(i) < 0)
    .forEach((i) => {
      typeof e[i] > 'u'
        ? (e[i] = t[i])
        : Ot(t[i]) && Ot(e[i]) && Object.keys(t[i]).length > 0
        ? t[i].__swiper__
          ? (e[i] = t[i])
          : Ht(e[i], t[i])
        : (e[i] = t[i])
    })
}
function No(e) {
  return (
    e === void 0 && (e = {}),
    e.navigation &&
      typeof e.navigation.nextEl > 'u' &&
      typeof e.navigation.prevEl > 'u'
  )
}
function Fo(e) {
  return e === void 0 && (e = {}), e.pagination && typeof e.pagination.el > 'u'
}
function Ho(e) {
  return e === void 0 && (e = {}), e.scrollbar && typeof e.scrollbar.el > 'u'
}
function Vo(e) {
  e === void 0 && (e = '')
  const t = e
      .split(' ')
      .map((i) => i.trim())
      .filter((i) => !!i),
    s = []
  return (
    t.forEach((i) => {
      s.indexOf(i) < 0 && s.push(i)
    }),
    s.join(' ')
  )
}
function Zd(e) {
  return (
    e === void 0 && (e = ''),
    e
      ? e.includes('swiper-wrapper')
        ? e
        : `swiper-wrapper ${e}`
      : 'swiper-wrapper'
  )
}
function ef(e) {
  let {
    swiper: t,
    slides: s,
    passedParams: i,
    changedParams: r,
    nextEl: n,
    prevEl: o,
    scrollbarEl: a,
    paginationEl: l,
  } = e
  const u = r.filter(
      (T) => T !== 'children' && T !== 'direction' && T !== 'wrapperClass'
    ),
    {
      params: c,
      pagination: d,
      navigation: f,
      scrollbar: p,
      virtual: g,
      thumbs: x,
    } = t
  let I, b, E, w, y, L, N, J
  r.includes('thumbs') &&
    i.thumbs &&
    i.thumbs.swiper &&
    c.thumbs &&
    !c.thumbs.swiper &&
    (I = !0),
    r.includes('controller') &&
      i.controller &&
      i.controller.control &&
      c.controller &&
      !c.controller.control &&
      (b = !0),
    r.includes('pagination') &&
      i.pagination &&
      (i.pagination.el || l) &&
      (c.pagination || c.pagination === !1) &&
      d &&
      !d.el &&
      (E = !0),
    r.includes('scrollbar') &&
      i.scrollbar &&
      (i.scrollbar.el || a) &&
      (c.scrollbar || c.scrollbar === !1) &&
      p &&
      !p.el &&
      (w = !0),
    r.includes('navigation') &&
      i.navigation &&
      (i.navigation.prevEl || o) &&
      (i.navigation.nextEl || n) &&
      (c.navigation || c.navigation === !1) &&
      f &&
      !f.prevEl &&
      !f.nextEl &&
      (y = !0)
  const k = (T) => {
    t[T] &&
      (t[T].destroy(),
      T === 'navigation'
        ? (t.isElement && (t[T].prevEl.remove(), t[T].nextEl.remove()),
          (c[T].prevEl = void 0),
          (c[T].nextEl = void 0),
          (t[T].prevEl = void 0),
          (t[T].nextEl = void 0))
        : (t.isElement && t[T].el.remove(),
          (c[T].el = void 0),
          (t[T].el = void 0)))
  }
  r.includes('loop') &&
    t.isElement &&
    (c.loop && !i.loop ? (L = !0) : !c.loop && i.loop ? (N = !0) : (J = !0)),
    u.forEach((T) => {
      if (Ot(c[T]) && Ot(i[T]))
        Object.assign(c[T], i[T]),
          (T === 'navigation' || T === 'pagination' || T === 'scrollbar') &&
            'enabled' in i[T] &&
            !i[T].enabled &&
            k(T)
      else {
        const C = i[T]
        ;(C === !0 || C === !1) &&
        (T === 'navigation' || T === 'pagination' || T === 'scrollbar')
          ? C === !1 && k(T)
          : (c[T] = i[T])
      }
    }),
    u.includes('controller') &&
      !b &&
      t.controller &&
      t.controller.control &&
      c.controller &&
      c.controller.control &&
      (t.controller.control = c.controller.control),
    r.includes('children') && s && g && c.virtual.enabled
      ? ((g.slides = s), g.update(!0))
      : r.includes('virtual') &&
        g &&
        c.virtual.enabled &&
        (s && (g.slides = s), g.update(!0)),
    r.includes('children') && s && c.loop && (J = !0),
    I && x.init() && x.update(!0),
    b && (t.controller.control = c.controller.control),
    E &&
      (t.isElement &&
        (!l || typeof l == 'string') &&
        ((l = document.createElement('div')),
        l.classList.add('swiper-pagination'),
        l.part.add('pagination'),
        t.el.appendChild(l)),
      l && (c.pagination.el = l),
      d.init(),
      d.render(),
      d.update()),
    w &&
      (t.isElement &&
        (!a || typeof a == 'string') &&
        ((a = document.createElement('div')),
        a.classList.add('swiper-scrollbar'),
        a.part.add('scrollbar'),
        t.el.appendChild(a)),
      a && (c.scrollbar.el = a),
      p.init(),
      p.updateSize(),
      p.setTranslate()),
    y &&
      (t.isElement &&
        ((!n || typeof n == 'string') &&
          ((n = document.createElement('div')),
          n.classList.add('swiper-button-next'),
          (n.innerHTML = t.hostEl.constructor.nextButtonSvg),
          n.part.add('button-next'),
          t.el.appendChild(n)),
        (!o || typeof o == 'string') &&
          ((o = document.createElement('div')),
          o.classList.add('swiper-button-prev'),
          (o.innerHTML = t.hostEl.constructor.prevButtonSvg),
          o.part.add('button-prev'),
          t.el.appendChild(o))),
      n && (c.navigation.nextEl = n),
      o && (c.navigation.prevEl = o),
      f.init(),
      f.update()),
    r.includes('allowSlideNext') && (t.allowSlideNext = i.allowSlideNext),
    r.includes('allowSlidePrev') && (t.allowSlidePrev = i.allowSlidePrev),
    r.includes('direction') && t.changeDirection(i.direction, !1),
    (L || J) && t.loopDestroy(),
    (N || J) && t.loopCreate(),
    t.update()
}
function Tn(e, t) {
  e === void 0 && (e = {}), t === void 0 && (t = !0)
  const s = { on: {} },
    i = {},
    r = {}
  Ht(s, Gi), (s._emitClasses = !0), (s.init = !1)
  const n = {},
    o = jo.map((l) => l.replace(/_/, '')),
    a = Object.assign({}, e)
  return (
    Object.keys(a).forEach((l) => {
      typeof e[l] > 'u' ||
        (o.indexOf(l) >= 0
          ? Ot(e[l])
            ? ((s[l] = {}), (r[l] = {}), Ht(s[l], e[l]), Ht(r[l], e[l]))
            : ((s[l] = e[l]), (r[l] = e[l]))
          : l.search(/on[A-Z]/) === 0 && typeof e[l] == 'function'
          ? t
            ? (i[`${l[2].toLowerCase()}${l.substr(3)}`] = e[l])
            : (s.on[`${l[2].toLowerCase()}${l.substr(3)}`] = e[l])
          : (n[l] = e[l]))
    }),
    ['navigation', 'pagination', 'scrollbar'].forEach((l) => {
      s[l] === !0 && (s[l] = {}), s[l] === !1 && delete s[l]
    }),
    { params: s, passedParams: r, rest: n, events: i }
  )
}
function tf(e, t) {
  let {
    el: s,
    nextEl: i,
    prevEl: r,
    paginationEl: n,
    scrollbarEl: o,
    swiper: a,
  } = e
  No(t) &&
    i &&
    r &&
    ((a.params.navigation.nextEl = i),
    (a.originalParams.navigation.nextEl = i),
    (a.params.navigation.prevEl = r),
    (a.originalParams.navigation.prevEl = r)),
    Fo(t) &&
      n &&
      ((a.params.pagination.el = n), (a.originalParams.pagination.el = n)),
    Ho(t) &&
      o &&
      ((a.params.scrollbar.el = o), (a.originalParams.scrollbar.el = o)),
    a.init(s)
}
function sf(e, t, s, i, r) {
  const n = []
  if (!t) return n
  const o = (l) => {
    n.indexOf(l) < 0 && n.push(l)
  }
  if (s && i) {
    const l = i.map(r),
      u = s.map(r)
    l.join('') !== u.join('') && o('children'),
      i.length !== s.length && o('children')
  }
  return (
    jo
      .filter((l) => l[0] === '_')
      .map((l) => l.replace(/_/, ''))
      .forEach((l) => {
        if (l in e && l in t)
          if (Ot(e[l]) && Ot(t[l])) {
            const u = Object.keys(e[l]),
              c = Object.keys(t[l])
            u.length !== c.length
              ? o(l)
              : (u.forEach((d) => {
                  e[l][d] !== t[l][d] && o(l)
                }),
                c.forEach((d) => {
                  e[l][d] !== t[l][d] && o(l)
                }))
          } else e[l] !== t[l] && o(l)
      }),
    n
  )
}
const rf = (e) => {
  !e ||
    e.destroyed ||
    !e.params.virtual ||
    (e.params.virtual && !e.params.virtual.enabled) ||
    (e.updateSlides(),
    e.updateProgress(),
    e.updateSlidesClasses(),
    e.parallax &&
      e.params.parallax &&
      e.params.parallax.enabled &&
      e.parallax.setTranslate())
}
function Ei(e, t, s) {
  e === void 0 && (e = {})
  const i = [],
    r = {
      'container-start': [],
      'container-end': [],
      'wrapper-start': [],
      'wrapper-end': [],
    },
    n = (o, a) => {
      Array.isArray(o) &&
        o.forEach((l) => {
          const u = typeof l.type == 'symbol'
          a === 'default' && (a = 'container-end'),
            u && l.children
              ? n(l.children, a)
              : l.type &&
                (l.type.name === 'SwiperSlide' ||
                  l.type.name === 'AsyncComponentWrapper')
              ? i.push(l)
              : r[a] && r[a].push(l)
        })
    }
  return (
    Object.keys(e).forEach((o) => {
      if (typeof e[o] != 'function') return
      const a = e[o]()
      n(a, o)
    }),
    (s.value = t.value),
    (t.value = i),
    { slides: i, slots: r }
  )
}
function nf(e, t, s) {
  if (!s) return null
  const i = (c) => {
      let d = c
      return c < 0 ? (d = t.length + c) : d >= t.length && (d = d - t.length), d
    },
    r = e.value.isHorizontal()
      ? { [e.value.rtlTranslate ? 'right' : 'left']: `${s.offset}px` }
      : { top: `${s.offset}px` },
    { from: n, to: o } = s,
    a = e.value.params.loop ? -t.length : 0,
    l = e.value.params.loop ? t.length * 2 : t.length,
    u = []
  for (let c = a; c < l; c += 1) c >= n && c <= o && u.push(t[i(c)])
  return u.map(
    (c) => (
      c.props || (c.props = {}),
      c.props.style || (c.props.style = {}),
      (c.props.swiperRef = e),
      (c.props.style = r),
      je(c.type, { ...c.props }, c.children)
    )
  )
}
const of = {
    name: 'Swiper',
    props: {
      tag: { type: String, default: 'div' },
      wrapperTag: { type: String, default: 'div' },
      modules: { type: Array, default: void 0 },
      init: { type: Boolean, default: void 0 },
      direction: { type: String, default: void 0 },
      oneWayMovement: { type: Boolean, default: void 0 },
      touchEventsTarget: { type: String, default: void 0 },
      initialSlide: { type: Number, default: void 0 },
      speed: { type: Number, default: void 0 },
      cssMode: { type: Boolean, default: void 0 },
      updateOnWindowResize: { type: Boolean, default: void 0 },
      resizeObserver: { type: Boolean, default: void 0 },
      nested: { type: Boolean, default: void 0 },
      focusableElements: { type: String, default: void 0 },
      width: { type: Number, default: void 0 },
      height: { type: Number, default: void 0 },
      preventInteractionOnTransition: { type: Boolean, default: void 0 },
      userAgent: { type: String, default: void 0 },
      url: { type: String, default: void 0 },
      edgeSwipeDetection: { type: [Boolean, String], default: void 0 },
      edgeSwipeThreshold: { type: Number, default: void 0 },
      autoHeight: { type: Boolean, default: void 0 },
      setWrapperSize: { type: Boolean, default: void 0 },
      virtualTranslate: { type: Boolean, default: void 0 },
      effect: { type: String, default: void 0 },
      breakpoints: { type: Object, default: void 0 },
      spaceBetween: { type: [Number, String], default: void 0 },
      slidesPerView: { type: [Number, String], default: void 0 },
      maxBackfaceHiddenSlides: { type: Number, default: void 0 },
      slidesPerGroup: { type: Number, default: void 0 },
      slidesPerGroupSkip: { type: Number, default: void 0 },
      slidesPerGroupAuto: { type: Boolean, default: void 0 },
      centeredSlides: { type: Boolean, default: void 0 },
      centeredSlidesBounds: { type: Boolean, default: void 0 },
      slidesOffsetBefore: { type: Number, default: void 0 },
      slidesOffsetAfter: { type: Number, default: void 0 },
      normalizeSlideIndex: { type: Boolean, default: void 0 },
      centerInsufficientSlides: { type: Boolean, default: void 0 },
      watchOverflow: { type: Boolean, default: void 0 },
      roundLengths: { type: Boolean, default: void 0 },
      touchRatio: { type: Number, default: void 0 },
      touchAngle: { type: Number, default: void 0 },
      simulateTouch: { type: Boolean, default: void 0 },
      shortSwipes: { type: Boolean, default: void 0 },
      longSwipes: { type: Boolean, default: void 0 },
      longSwipesRatio: { type: Number, default: void 0 },
      longSwipesMs: { type: Number, default: void 0 },
      followFinger: { type: Boolean, default: void 0 },
      allowTouchMove: { type: Boolean, default: void 0 },
      threshold: { type: Number, default: void 0 },
      touchMoveStopPropagation: { type: Boolean, default: void 0 },
      touchStartPreventDefault: { type: Boolean, default: void 0 },
      touchStartForcePreventDefault: { type: Boolean, default: void 0 },
      touchReleaseOnEdges: { type: Boolean, default: void 0 },
      uniqueNavElements: { type: Boolean, default: void 0 },
      resistance: { type: Boolean, default: void 0 },
      resistanceRatio: { type: Number, default: void 0 },
      watchSlidesProgress: { type: Boolean, default: void 0 },
      grabCursor: { type: Boolean, default: void 0 },
      preventClicks: { type: Boolean, default: void 0 },
      preventClicksPropagation: { type: Boolean, default: void 0 },
      slideToClickedSlide: { type: Boolean, default: void 0 },
      loop: { type: Boolean, default: void 0 },
      loopedSlides: { type: Number, default: void 0 },
      loopPreventsSliding: { type: Boolean, default: void 0 },
      rewind: { type: Boolean, default: void 0 },
      allowSlidePrev: { type: Boolean, default: void 0 },
      allowSlideNext: { type: Boolean, default: void 0 },
      swipeHandler: { type: Boolean, default: void 0 },
      noSwiping: { type: Boolean, default: void 0 },
      noSwipingClass: { type: String, default: void 0 },
      noSwipingSelector: { type: String, default: void 0 },
      passiveListeners: { type: Boolean, default: void 0 },
      containerModifierClass: { type: String, default: void 0 },
      slideClass: { type: String, default: void 0 },
      slideActiveClass: { type: String, default: void 0 },
      slideVisibleClass: { type: String, default: void 0 },
      slideFullyVisibleClass: { type: String, default: void 0 },
      slideBlankClass: { type: String, default: void 0 },
      slideNextClass: { type: String, default: void 0 },
      slidePrevClass: { type: String, default: void 0 },
      wrapperClass: { type: String, default: void 0 },
      lazyPreloaderClass: { type: String, default: void 0 },
      lazyPreloadPrevNext: { type: Number, default: void 0 },
      runCallbacksOnInit: { type: Boolean, default: void 0 },
      observer: { type: Boolean, default: void 0 },
      observeParents: { type: Boolean, default: void 0 },
      observeSlideChildren: { type: Boolean, default: void 0 },
      a11y: { type: [Boolean, Object], default: void 0 },
      autoplay: { type: [Boolean, Object], default: void 0 },
      controller: { type: Object, default: void 0 },
      coverflowEffect: { type: Object, default: void 0 },
      cubeEffect: { type: Object, default: void 0 },
      fadeEffect: { type: Object, default: void 0 },
      flipEffect: { type: Object, default: void 0 },
      creativeEffect: { type: Object, default: void 0 },
      cardsEffect: { type: Object, default: void 0 },
      hashNavigation: { type: [Boolean, Object], default: void 0 },
      history: { type: [Boolean, Object], default: void 0 },
      keyboard: { type: [Boolean, Object], default: void 0 },
      mousewheel: { type: [Boolean, Object], default: void 0 },
      navigation: { type: [Boolean, Object], default: void 0 },
      pagination: { type: [Boolean, Object], default: void 0 },
      parallax: { type: [Boolean, Object], default: void 0 },
      scrollbar: { type: [Boolean, Object], default: void 0 },
      thumbs: { type: Object, default: void 0 },
      virtual: { type: [Boolean, Object], default: void 0 },
      zoom: { type: [Boolean, Object], default: void 0 },
      grid: { type: [Object], default: void 0 },
      freeMode: { type: [Boolean, Object], default: void 0 },
      enabled: { type: Boolean, default: void 0 },
    },
    emits: [
      '_beforeBreakpoint',
      '_containerClasses',
      '_slideClass',
      '_slideClasses',
      '_swiper',
      '_freeModeNoMomentumRelease',
      'activeIndexChange',
      'afterInit',
      'autoplay',
      'autoplayStart',
      'autoplayStop',
      'autoplayPause',
      'autoplayResume',
      'autoplayTimeLeft',
      'beforeDestroy',
      'beforeInit',
      'beforeLoopFix',
      'beforeResize',
      'beforeSlideChangeStart',
      'beforeTransitionStart',
      'breakpoint',
      'breakpointsBase',
      'changeDirection',
      'click',
      'disable',
      'doubleTap',
      'doubleClick',
      'destroy',
      'enable',
      'fromEdge',
      'hashChange',
      'hashSet',
      'init',
      'keyPress',
      'lock',
      'loopFix',
      'momentumBounce',
      'navigationHide',
      'navigationShow',
      'navigationPrev',
      'navigationNext',
      'observerUpdate',
      'orientationchange',
      'paginationHide',
      'paginationRender',
      'paginationShow',
      'paginationUpdate',
      'progress',
      'reachBeginning',
      'reachEnd',
      'realIndexChange',
      'resize',
      'scroll',
      'scrollbarDragEnd',
      'scrollbarDragMove',
      'scrollbarDragStart',
      'setTransition',
      'setTranslate',
      'slidesUpdated',
      'slideChange',
      'slideChangeTransitionEnd',
      'slideChangeTransitionStart',
      'slideNextTransitionEnd',
      'slideNextTransitionStart',
      'slidePrevTransitionEnd',
      'slidePrevTransitionStart',
      'slideResetTransitionStart',
      'slideResetTransitionEnd',
      'sliderMove',
      'sliderFirstMove',
      'slidesLengthChange',
      'slidesGridLengthChange',
      'snapGridLengthChange',
      'snapIndexChange',
      'swiper',
      'tap',
      'toEdge',
      'touchEnd',
      'touchMove',
      'touchMoveOpposite',
      'touchStart',
      'transitionEnd',
      'transitionStart',
      'unlock',
      'update',
      'virtualUpdate',
      'zoomChange',
    ],
    setup(e, t) {
      let { slots: s, emit: i } = t
      const { tag: r, wrapperTag: n } = e,
        o = ge('swiper'),
        a = ge(null),
        l = ge(!1),
        u = ge(!1),
        c = ge(null),
        d = ge(null),
        f = ge(null),
        p = { value: [] },
        g = { value: [] },
        x = ge(null),
        I = ge(null),
        b = ge(null),
        E = ge(null),
        { params: w, passedParams: y } = Tn(e, !1)
      Ei(s, p, g), (f.value = y), (g.value = p.value)
      const L = () => {
        Ei(s, p, g), (l.value = !0)
      }
      ;(w.onAny = function (k) {
        for (
          var T = arguments.length, C = new Array(T > 1 ? T - 1 : 0), D = 1;
          D < T;
          D++
        )
          C[D - 1] = arguments[D]
        i(k, ...C)
      }),
        Object.assign(w.on, {
          _beforeBreakpoint: L,
          _containerClasses(k, T) {
            o.value = T
          },
        })
      const N = { ...w }
      if (
        (delete N.wrapperClass,
        (d.value = new vr(N)),
        d.value.virtual && d.value.params.virtual.enabled)
      ) {
        d.value.virtual.slides = p.value
        const k = {
          cache: !1,
          slides: p.value,
          renderExternal: (T) => {
            a.value = T
          },
          renderExternalUpdate: !1,
        }
        Ht(d.value.params.virtual, k), Ht(d.value.originalParams.virtual, k)
      }
      lr(() => {
        !u.value && d.value && (d.value.emitSlidesClasses(), (u.value = !0))
        const { passedParams: k } = Tn(e, !1),
          T = sf(k, f.value, p.value, g.value, (C) => C.props && C.props.key)
        ;(f.value = k),
          (T.length || l.value) &&
            d.value &&
            !d.value.destroyed &&
            ef({
              swiper: d.value,
              slides: p.value,
              passedParams: k,
              changedParams: T,
              nextEl: x.value,
              prevEl: I.value,
              scrollbarEl: E.value,
              paginationEl: b.value,
            }),
          (l.value = !1)
      }),
        Ft('swiper', d),
        bt(a, () => {
          bs(() => {
            rf(d.value)
          })
        }),
        xs(() => {
          c.value &&
            (tf(
              {
                el: c.value,
                nextEl: x.value,
                prevEl: I.value,
                paginationEl: b.value,
                scrollbarEl: E.value,
                swiper: d.value,
              },
              w
            ),
            i('swiper', d.value))
        }),
        ar(() => {
          d.value && !d.value.destroyed && d.value.destroy(!0, !1)
        })
      function J(k) {
        return w.virtual
          ? nf(d, k, a.value)
          : (k.forEach((T, C) => {
              T.props || (T.props = {}),
                (T.props.swiperRef = d),
                (T.props.swiperSlideIndex = C)
            }),
            k)
      }
      return () => {
        const { slides: k, slots: T } = Ei(s, p, g)
        return je(r, { ref: c, class: Vo(o.value) }, [
          T['container-start'],
          je(n, { class: Zd(w.wrapperClass) }, [
            T['wrapper-start'],
            J(k),
            T['wrapper-end'],
          ]),
          No(e) && [
            je('div', { ref: I, class: 'swiper-button-prev' }),
            je('div', { ref: x, class: 'swiper-button-next' }),
          ],
          Ho(e) && je('div', { ref: E, class: 'swiper-scrollbar' }),
          Fo(e) && je('div', { ref: b, class: 'swiper-pagination' }),
          T['container-end'],
        ])
      }
    },
  },
  lf = {
    name: 'SwiperSlide',
    props: {
      tag: { type: String, default: 'div' },
      swiperRef: { type: Object, required: !1 },
      swiperSlideIndex: { type: Number, default: void 0, required: !1 },
      zoom: { type: Boolean, default: void 0, required: !1 },
      lazy: { type: Boolean, default: !1, required: !1 },
      virtualIndex: { type: [String, Number], default: void 0 },
    },
    setup(e, t) {
      let { slots: s } = t,
        i = !1
      const { swiperRef: r } = e,
        n = ge(null),
        o = ge('swiper-slide'),
        a = ge(!1)
      function l(d, f, p) {
        f === n.value && (o.value = p)
      }
      xs(() => {
        !r || !r.value || (r.value.on('_slideClass', l), (i = !0))
      }),
        oo(() => {
          i || !r || !r.value || (r.value.on('_slideClass', l), (i = !0))
        }),
        lr(() => {
          !n.value ||
            !r ||
            !r.value ||
            (typeof e.swiperSlideIndex < 'u' &&
              (n.value.swiperSlideIndex = e.swiperSlideIndex),
            r.value.destroyed &&
              o.value !== 'swiper-slide' &&
              (o.value = 'swiper-slide'))
        }),
        ar(() => {
          !r || !r.value || r.value.off('_slideClass', l)
        })
      const u = Te(() => ({
        isActive: o.value.indexOf('swiper-slide-active') >= 0,
        isVisible: o.value.indexOf('swiper-slide-visible') >= 0,
        isPrev: o.value.indexOf('swiper-slide-prev') >= 0,
        isNext: o.value.indexOf('swiper-slide-next') >= 0,
      }))
      Ft('swiperSlide', u)
      const c = () => {
        a.value = !0
      }
      return () =>
        je(
          e.tag,
          {
            class: Vo(`${o.value}`),
            ref: n,
            'data-swiper-slide-index':
              typeof e.virtualIndex > 'u' && r && r.value && r.value.params.loop
                ? e.swiperSlideIndex
                : e.virtualIndex,
            onLoadCapture: c,
          },
          e.zoom
            ? je(
                'div',
                {
                  class: 'swiper-zoom-container',
                  'data-swiper-zoom':
                    typeof e.zoom == 'number' ? e.zoom : void 0,
                },
                [
                  s.default && s.default(u.value),
                  e.lazy &&
                    !a.value &&
                    je('div', { class: 'swiper-lazy-preloader' }),
                ]
              )
            : [
                s.default && s.default(u.value),
                e.lazy &&
                  !a.value &&
                  je('div', { class: 'swiper-lazy-preloader' }),
              ]
        )
    },
  }
function af(e) {
  let { swiper: t, extendParams: s, on: i, emit: r, params: n } = e
  ;(t.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
    s({
      autoplay: {
        enabled: !1,
        delay: 3e3,
        waitForTransition: !0,
        disableOnInteraction: !1,
        stopOnLastSlide: !1,
        reverseDirection: !1,
        pauseOnMouseEnter: !1,
      },
    })
  let o,
    a,
    l = n && n.autoplay ? n.autoplay.delay : 3e3,
    u = n && n.autoplay ? n.autoplay.delay : 3e3,
    c,
    d = new Date().getTime(),
    f,
    p,
    g,
    x,
    I,
    b,
    E
  function w(F) {
    !t ||
      t.destroyed ||
      !t.wrapperEl ||
      (F.target === t.wrapperEl &&
        (t.wrapperEl.removeEventListener('transitionend', w), !E && C()))
  }
  const y = () => {
      if (t.destroyed || !t.autoplay.running) return
      t.autoplay.paused ? (f = !0) : f && ((u = c), (f = !1))
      const F = t.autoplay.paused ? c : d + u - new Date().getTime()
      ;(t.autoplay.timeLeft = F),
        r('autoplayTimeLeft', F, F / l),
        (a = requestAnimationFrame(() => {
          y()
        }))
    },
    L = () => {
      let F
      return (
        t.virtual && t.params.virtual.enabled
          ? (F = t.slides.filter((fe) =>
              fe.classList.contains('swiper-slide-active')
            )[0])
          : (F = t.slides[t.activeIndex]),
        F ? parseInt(F.getAttribute('data-swiper-autoplay'), 10) : void 0
      )
    },
    N = (F) => {
      if (t.destroyed || !t.autoplay.running) return
      cancelAnimationFrame(a), y()
      let me = typeof F > 'u' ? t.params.autoplay.delay : F
      ;(l = t.params.autoplay.delay), (u = t.params.autoplay.delay)
      const fe = L()
      !Number.isNaN(fe) &&
        fe > 0 &&
        typeof F > 'u' &&
        ((me = fe), (l = fe), (u = fe)),
        (c = me)
      const _e = t.params.speed,
        xe = () => {
          !t ||
            t.destroyed ||
            (t.params.autoplay.reverseDirection
              ? !t.isBeginning || t.params.loop || t.params.rewind
                ? (t.slidePrev(_e, !0, !0), r('autoplay'))
                : t.params.autoplay.stopOnLastSlide ||
                  (t.slideTo(t.slides.length - 1, _e, !0, !0), r('autoplay'))
              : !t.isEnd || t.params.loop || t.params.rewind
              ? (t.slideNext(_e, !0, !0), r('autoplay'))
              : t.params.autoplay.stopOnLastSlide ||
                (t.slideTo(0, _e, !0, !0), r('autoplay')),
            t.params.cssMode &&
              ((d = new Date().getTime()),
              requestAnimationFrame(() => {
                N()
              })))
        }
      return (
        me > 0
          ? (clearTimeout(o),
            (o = setTimeout(() => {
              xe()
            }, me)))
          : requestAnimationFrame(() => {
              xe()
            }),
        me
      )
    },
    J = () => {
      ;(d = new Date().getTime()),
        (t.autoplay.running = !0),
        N(),
        r('autoplayStart')
    },
    k = () => {
      ;(t.autoplay.running = !1),
        clearTimeout(o),
        cancelAnimationFrame(a),
        r('autoplayStop')
    },
    T = (F, me) => {
      if (t.destroyed || !t.autoplay.running) return
      clearTimeout(o), F || (b = !0)
      const fe = () => {
        r('autoplayPause'),
          t.params.autoplay.waitForTransition
            ? t.wrapperEl.addEventListener('transitionend', w)
            : C()
      }
      if (((t.autoplay.paused = !0), me)) {
        I && (c = t.params.autoplay.delay), (I = !1), fe()
        return
      }
      ;(c = (c || t.params.autoplay.delay) - (new Date().getTime() - d)),
        !(t.isEnd && c < 0 && !t.params.loop) && (c < 0 && (c = 0), fe())
    },
    C = () => {
      ;(t.isEnd && c < 0 && !t.params.loop) ||
        t.destroyed ||
        !t.autoplay.running ||
        ((d = new Date().getTime()),
        b ? ((b = !1), N(c)) : N(),
        (t.autoplay.paused = !1),
        r('autoplayResume'))
    },
    D = () => {
      if (t.destroyed || !t.autoplay.running) return
      const F = lt()
      F.visibilityState === 'hidden' && ((b = !0), T(!0)),
        F.visibilityState === 'visible' && C()
    },
    K = (F) => {
      F.pointerType === 'mouse' &&
        ((b = !0), (E = !0), !(t.animating || t.autoplay.paused) && T(!0))
    },
    V = (F) => {
      F.pointerType === 'mouse' && ((E = !1), t.autoplay.paused && C())
    },
    le = () => {
      t.params.autoplay.pauseOnMouseEnter &&
        (t.el.addEventListener('pointerenter', K),
        t.el.addEventListener('pointerleave', V))
    },
    pe = () => {
      t.el.removeEventListener('pointerenter', K),
        t.el.removeEventListener('pointerleave', V)
    },
    re = () => {
      lt().addEventListener('visibilitychange', D)
    },
    se = () => {
      lt().removeEventListener('visibilitychange', D)
    }
  i('init', () => {
    t.params.autoplay.enabled && (le(), re(), J())
  }),
    i('destroy', () => {
      pe(), se(), t.autoplay.running && k()
    }),
    i('_freeModeStaticRelease', () => {
      ;(g || b) && C()
    }),
    i('_freeModeNoMomentumRelease', () => {
      t.params.autoplay.disableOnInteraction ? k() : T(!0, !0)
    }),
    i('beforeTransitionStart', (F, me, fe) => {
      t.destroyed ||
        !t.autoplay.running ||
        (fe || !t.params.autoplay.disableOnInteraction ? T(!0, !0) : k())
    }),
    i('sliderFirstMove', () => {
      if (!(t.destroyed || !t.autoplay.running)) {
        if (t.params.autoplay.disableOnInteraction) {
          k()
          return
        }
        ;(p = !0),
          (g = !1),
          (b = !1),
          (x = setTimeout(() => {
            ;(b = !0), (g = !0), T(!0)
          }, 200))
      }
    }),
    i('touchEnd', () => {
      if (!(t.destroyed || !t.autoplay.running || !p)) {
        if (
          (clearTimeout(x),
          clearTimeout(o),
          t.params.autoplay.disableOnInteraction)
        ) {
          ;(g = !1), (p = !1)
          return
        }
        g && t.params.cssMode && C(), (g = !1), (p = !1)
      }
    }),
    i('slideChange', () => {
      t.destroyed || !t.autoplay.running || (I = !0)
    }),
    Object.assign(t.autoplay, { start: J, stop: k, pause: T, resume: C })
}
function cf(e) {
  let { swiper: t, extendParams: s, emit: i, once: r } = e
  s({
    freeMode: {
      enabled: !1,
      momentum: !0,
      momentumRatio: 1,
      momentumBounce: !0,
      momentumBounceRatio: 1,
      momentumVelocityRatio: 1,
      sticky: !1,
      minimumVelocity: 0.02,
    },
  })
  function n() {
    if (t.params.cssMode) return
    const l = t.getTranslate()
    t.setTranslate(l),
      t.setTransition(0),
      (t.touchEventsData.velocities.length = 0),
      t.freeMode.onTouchEnd({ currentPos: t.rtl ? t.translate : -t.translate })
  }
  function o() {
    if (t.params.cssMode) return
    const { touchEventsData: l, touches: u } = t
    l.velocities.length === 0 &&
      l.velocities.push({
        position: u[t.isHorizontal() ? 'startX' : 'startY'],
        time: l.touchStartTime,
      }),
      l.velocities.push({
        position: u[t.isHorizontal() ? 'currentX' : 'currentY'],
        time: Ct(),
      })
  }
  function a(l) {
    let { currentPos: u } = l
    if (t.params.cssMode) return
    const {
        params: c,
        wrapperEl: d,
        rtlTranslate: f,
        snapGrid: p,
        touchEventsData: g,
      } = t,
      I = Ct() - g.touchStartTime
    if (u < -t.minTranslate()) {
      t.slideTo(t.activeIndex)
      return
    }
    if (u > -t.maxTranslate()) {
      t.slides.length < p.length
        ? t.slideTo(p.length - 1)
        : t.slideTo(t.slides.length - 1)
      return
    }
    if (c.freeMode.momentum) {
      if (g.velocities.length > 1) {
        const k = g.velocities.pop(),
          T = g.velocities.pop(),
          C = k.position - T.position,
          D = k.time - T.time
        ;(t.velocity = C / D),
          (t.velocity /= 2),
          Math.abs(t.velocity) < c.freeMode.minimumVelocity && (t.velocity = 0),
          (D > 150 || Ct() - k.time > 300) && (t.velocity = 0)
      } else t.velocity = 0
      ;(t.velocity *= c.freeMode.momentumVelocityRatio),
        (g.velocities.length = 0)
      let b = 1e3 * c.freeMode.momentumRatio
      const E = t.velocity * b
      let w = t.translate + E
      f && (w = -w)
      let y = !1,
        L
      const N = Math.abs(t.velocity) * 20 * c.freeMode.momentumBounceRatio
      let J
      if (w < t.maxTranslate())
        c.freeMode.momentumBounce
          ? (w + t.maxTranslate() < -N && (w = t.maxTranslate() - N),
            (L = t.maxTranslate()),
            (y = !0),
            (g.allowMomentumBounce = !0))
          : (w = t.maxTranslate()),
          c.loop && c.centeredSlides && (J = !0)
      else if (w > t.minTranslate())
        c.freeMode.momentumBounce
          ? (w - t.minTranslate() > N && (w = t.minTranslate() + N),
            (L = t.minTranslate()),
            (y = !0),
            (g.allowMomentumBounce = !0))
          : (w = t.minTranslate()),
          c.loop && c.centeredSlides && (J = !0)
      else if (c.freeMode.sticky) {
        let k
        for (let T = 0; T < p.length; T += 1)
          if (p[T] > -w) {
            k = T
            break
          }
        Math.abs(p[k] - w) < Math.abs(p[k - 1] - w) ||
        t.swipeDirection === 'next'
          ? (w = p[k])
          : (w = p[k - 1]),
          (w = -w)
      }
      if (
        (J &&
          r('transitionEnd', () => {
            t.loopFix()
          }),
        t.velocity !== 0)
      ) {
        if (
          (f
            ? (b = Math.abs((-w - t.translate) / t.velocity))
            : (b = Math.abs((w - t.translate) / t.velocity)),
          c.freeMode.sticky)
        ) {
          const k = Math.abs((f ? -w : w) - t.translate),
            T = t.slidesSizesGrid[t.activeIndex]
          k < T
            ? (b = c.speed)
            : k < 2 * T
            ? (b = c.speed * 1.5)
            : (b = c.speed * 2.5)
        }
      } else if (c.freeMode.sticky) {
        t.slideToClosest()
        return
      }
      c.freeMode.momentumBounce && y
        ? (t.updateProgress(L),
          t.setTransition(b),
          t.setTranslate(w),
          t.transitionStart(!0, t.swipeDirection),
          (t.animating = !0),
          bi(d, () => {
            !t ||
              t.destroyed ||
              !g.allowMomentumBounce ||
              (i('momentumBounce'),
              t.setTransition(c.speed),
              setTimeout(() => {
                t.setTranslate(L),
                  bi(d, () => {
                    !t || t.destroyed || t.transitionEnd()
                  })
              }, 0))
          }))
        : t.velocity
        ? (i('_freeModeNoMomentumRelease'),
          t.updateProgress(w),
          t.setTransition(b),
          t.setTranslate(w),
          t.transitionStart(!0, t.swipeDirection),
          t.animating ||
            ((t.animating = !0),
            bi(d, () => {
              !t || t.destroyed || t.transitionEnd()
            })))
        : t.updateProgress(w),
        t.updateActiveIndex(),
        t.updateSlidesClasses()
    } else if (c.freeMode.sticky) {
      t.slideToClosest()
      return
    } else c.freeMode && i('_freeModeNoMomentumRelease')
    ;(!c.freeMode.momentum || I >= c.longSwipesMs) &&
      (i('_freeModeStaticRelease'),
      t.updateProgress(),
      t.updateActiveIndex(),
      t.updateSlidesClasses())
  }
  Object.assign(t, {
    freeMode: { onTouchStart: n, onTouchMove: o, onTouchEnd: a },
  })
}
const qo =
    'https://jay04makwana.github.io/anshtechlabs.github.io/images/partner-logo/1.png',
  Go =
    'https://jay04makwana.github.io/anshtechlabs.github.io/images/partner-logo/6.png',
  Wo =
    'https://jay04makwana.github.io/anshtechlabs.github.io/images/partner-logo/2.png',
  Uo =
    'https://jay04makwana.github.io/anshtechlabs.github.io/images/partner-logo/7.png',
  Ko =
    'https://jay04makwana.github.io/anshtechlabs.github.io/images/partner-logo/3.png',
  Yo =
    'https://jay04makwana.github.io/anshtechlabs.github.io/images/partner-logo/8.png',
  Xo =
    'https://jay04makwana.github.io/anshtechlabs.github.io/images/partner-logo/4.png',
  Qo =
    'https://jay04makwana.github.io/anshtechlabs.github.io/images/partner-logo/9.png',
  Jo =
    'https://jay04makwana.github.io/anshtechlabs.github.io/images/partner-logo/5.png',
  Zo =
    'https://jay04makwana.github.io/anshtechlabs.github.io/images/partner-logo/10.png',
  et = (e, t) => {
    const s = e.__vccOpts || e
    for (const [i, r] of t) s[i] = r
    return s
  },
  uf = {
    components: { Swiper: of, SwiperSlide: lf },
    setup() {
      return { modules: [af, cf] }
    },
  },
  df = { class: 'bg-white' },
  ff = { class: 'py-24' },
  pf = { class: 'container mx-auto' },
  hf = _(
    'div',
    { class: 'flex flex-col items-center overflow-hidden relative group' },
    [
      _('img', { src: qo, alt: 'Image' }),
      _(
        'a',
        {
          class:
            'absolute transform translate-y-full group-hover:translate-y-0 duration-500',
          href: '#',
        },
        [_('img', { src: Go, alt: 'Image' })]
      ),
    ],
    -1
  ),
  mf = _(
    'div',
    { class: 'flex flex-col items-center overflow-hidden relative group' },
    [
      _('img', { class: 'object-center', src: Wo, alt: 'Image' }),
      _(
        'a',
        {
          class:
            'absolute transform translate-y-full group-hover:translate-y-0 duration-500',
          href: '#',
        },
        [_('img', { src: Uo, alt: 'Image' })]
      ),
    ],
    -1
  ),
  gf = _(
    'div',
    { class: 'flex flex-col items-center overflow-hidden relative group' },
    [
      _('img', { class: 'object-center', src: Ko, alt: 'Image' }),
      _(
        'a',
        {
          class:
            'absolute transform translate-y-full group-hover:translate-y-0 duration-500',
          href: '#',
        },
        [_('img', { src: Yo, alt: 'Image' })]
      ),
    ],
    -1
  ),
  vf = _(
    'div',
    { class: 'flex flex-col items-center overflow-hidden relative group' },
    [
      _('img', { class: 'object-center', src: Xo, alt: 'Image' }),
      _(
        'a',
        {
          class:
            'absolute transform translate-y-full group-hover:translate-y-0 duration-500',
          href: '#',
        },
        [_('img', { src: Qo, alt: 'Image' })]
      ),
    ],
    -1
  ),
  bf = _(
    'div',
    { class: 'flex flex-col items-center overflow-hidden relative group' },
    [
      _('img', { class: 'object-center', src: Jo, alt: 'Image' }),
      _(
        'a',
        {
          class:
            'absolute transform translate-y-full group-hover:translate-y-0 duration-500',
          href: '#',
        },
        [_('img', { src: Zo, alt: 'Image' })]
      ),
    ],
    -1
  ),
  xf = _(
    'div',
    { class: 'flex flex-col items-center overflow-hidden relative group' },
    [
      _('img', { src: qo, alt: 'Image' }),
      _(
        'a',
        {
          class:
            'absolute transform translate-y-full group-hover:translate-y-0 duration-500',
          href: '#',
        },
        [_('img', { src: Go, alt: 'Image' })]
      ),
    ],
    -1
  ),
  wf = _(
    'div',
    { class: 'flex flex-col items-center overflow-hidden relative group' },
    [
      _('img', { class: 'object-center', src: Wo, alt: 'Image' }),
      _(
        'a',
        {
          class:
            'absolute transform translate-y-full group-hover:translate-y-0 duration-500',
          href: '#',
        },
        [_('img', { src: Uo, alt: 'Image' })]
      ),
    ],
    -1
  ),
  yf = _(
    'div',
    { class: 'flex flex-col items-center overflow-hidden relative group' },
    [
      _('img', { class: 'object-center', src: Ko, alt: 'Image' }),
      _(
        'a',
        {
          class:
            'absolute transform translate-y-full group-hover:translate-y-0 duration-500',
          href: '#',
        },
        [_('img', { src: Yo, alt: 'Image' })]
      ),
    ],
    -1
  ),
  _f = _(
    'div',
    { class: 'flex flex-col items-center overflow-hidden relative group' },
    [
      _('img', { class: 'object-center', src: Xo, alt: 'Image' }),
      _(
        'a',
        {
          class:
            'absolute transform translate-y-full group-hover:translate-y-0 duration-500',
          href: '#',
        },
        [_('img', { src: Qo, alt: 'Image' })]
      ),
    ],
    -1
  ),
  Sf = _(
    'div',
    { class: 'flex flex-col items-center overflow-hidden relative group' },
    [
      _('img', { class: 'object-center', src: Jo, alt: 'Image' }),
      _(
        'a',
        {
          class:
            'absolute transform translate-y-full group-hover:translate-y-0 duration-500',
          href: '#',
        },
        [_('img', { src: Zo, alt: 'Image' })]
      ),
    ],
    -1
  )
function Tf(e, t, s, i, r, n) {
  const o = Ee('swiper-slide'),
    a = Ee('swiper')
  return (
    ce(),
    ve('section', df, [
      _('div', ff, [
        _('div', pf, [
          Y(
            a,
            {
              modules: i.modules,
              loop: !0,
              'space-between': 0,
              breakpoints: {
                0: { slidesPerView: 3 },
                768: { slidesPerView: 5 },
              },
              onSwiper: e.onSwiper,
              onSlideChange: e.onSlideChange,
              freeMode: !0,
              speed: 1e3,
              autoplay: {
                delay: 2e3,
                disableOnInteraction: !1,
                pauseOnMouseEnter: !0,
              },
            },
            {
              default: he(() => [
                Y(o, null, { default: he(() => [hf]), _: 1 }),
                Y(o, null, { default: he(() => [mf]), _: 1 }),
                Y(o, null, { default: he(() => [gf]), _: 1 }),
                Y(o, null, { default: he(() => [vf]), _: 1 }),
                Y(o, null, { default: he(() => [bf]), _: 1 }),
                Y(o, null, { default: he(() => [xf]), _: 1 }),
                Y(o, null, { default: he(() => [wf]), _: 1 }),
                Y(o, null, { default: he(() => [yf]), _: 1 }),
                Y(o, null, { default: he(() => [_f]), _: 1 }),
                Y(o, null, { default: he(() => [Sf]), _: 1 }),
              ]),
              _: 1,
            },
            8,
            ['modules', 'onSwiper', 'onSlideChange']
          ),
        ]),
      ]),
    ])
  )
}
const Ef = et(uf, [['render', Tf]]),
  Pf = {},
  Cf = { class: 'py-24' },
  If = Fe(
    '<div class="container mx-auto"><div class="max-w-[660px] mx-auto mb-10"><h1 class="font-bold text-4xl text-center p-5 text-xpurple dark:text-white">Complete Website Security</h1><p class="text-center text-sm lg:text-md">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus quam neque quibusdam corrupti aspernatur corporis alias nisi dolorum expedita veritatis voluptates minima sapiente.</p></div><div class="grid grid-cols-12 gap-4"><div class="col-span-12 md:col-span-6 lg:col-span-3"><div class="group p-5 lg:p-8 relative bg-[#fef4f8] dark:bg-xblack z-10 transition hover:-translate-y-2 duration-500"><div class="max-lg:flex max-lg:justify-center"><div class="h-12 w-12 flex items-center justify-center rounded-full p-8 bg-gradient-to-b from-[#d2044d] to-[#ff5e68] duration-500 group-hover:[transform:rotateY(360deg)]"><div><i class="pi pi-users text-white text-4xl duration-500"></i></div></div></div><div class="max-lg:text-center"><h3 class="pt-5 mb-2 text-xl lg:text-2xl font-semibold font-barlow"> Malware Detection Removal </h3><p class="text-md"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </p></div></div></div><div class="col-span-12 md:col-span-6 lg:col-span-3"><div class="group p-5 lg:p-8 relative bg-[#fef4f8] dark:bg-xblack z-10 transition hover:-translate-y-2 duration-500"><div class="max-lg:flex max-lg:justify-center"><div class="h-12 w-12 flex items-center justify-center rounded-full p-8 bg-gradient-to-b from-[#d2044d] to-[#ff5e68] duration-500 group-hover:[transform:rotateY(360deg)]"><div><i class="pi pi-users text-white text-4xl duration-500"></i></div></div></div><div class="max-lg:text-center"><h3 class="pt-5 mb-2 text-xl lg:text-2xl font-semibold font-barlow max-md:text-center"> Content Delivery Network </h3><p class="text-md"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </p></div></div></div><div class="col-span-12 md:col-span-6 lg:col-span-3"><div class="group p-5 lg:p-8 relative bg-[#fef4f8] dark:bg-xblack z-10 transition hover:-translate-y-2 duration-500"><div class="max-lg:flex max-lg:justify-center"><div class="h-12 w-12 flex items-center justify-center rounded-full p-8 bg-gradient-to-b from-[#d2044d] to-[#ff5e68] duration-500 group-hover:[transform:rotateY(360deg)]"><div><i class="pi pi-users text-white text-4xl duration-500"></i></div></div></div><div class="max-lg:text-center"><h3 class="pt-5 mb-2 text-xl lg:text-2xl font-semibold font-barlow max-md:text-center"> 24/7 Cyber Security Support </h3><p class="text-md"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </p></div></div></div><div class="col-span-12 md:col-span-6 lg:col-span-3"><div class="group p-5 lg:p-8 relative bg-[#fef4f8] dark:bg-xblack z-10 transition hover:-translate-y-2 duration-500"><div class="max-lg:flex max-lg:justify-center"><div class="h-12 w-12 flex items-center justify-center rounded-full p-8 bg-gradient-to-b from-[#d2044d] to-[#ff5e68] duration-500 group-hover:[transform:rotateY(360deg)]"><div><i class="pi pi-users text-white text-4xl duration-500"></i></div></div></div><div class="max-lg:text-center"><h3 class="pt-5 mb-2 text-xl lg:text-2xl font-semibold font-barlow max-md:text-center"> Managed Web Application </h3><p class="text-md"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </p></div></div></div></div></div>',
    1
  ),
  Mf = [If]
function Of(e, t) {
  return ce(), ve('section', Cf, Mf)
}
const Af = et(Pf, [['render', Of]]),
  Lf =
    'https://jay04makwana.github.io/anshtechlabs.github.io/images/approach-img.jpg',
  Rf = {},
  kf = { class: 'py-24' },
  zf = Fe(
    '<div class="container mx-auto"><div class="grid grid-cols-12 items-center"><div class="col-span-12 lg:col-span-6 px-3"><div><img class="w-full" src="' +
      Lf +
      '" alt="Image"></div></div><div class="col-span-12 lg:col-span-6 px-3 text-center lg:text-start"><div><div class="text-3xl lg:text-4xl font-barlow font-bold my-5 text-xpurple dark:text-white"> Our Approach To Security </div><p class="text-md lg:text-base"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsumv </p><ul class="mt-8"><li class="inline-block dark:bg-xblack lg:block max-w-full md:max-w-[45%] lg:max-w-full shadow p-5 lg:p-8 relative pl-5 lg:pl-24 mx-3 lg:mx-0 mb-8 hover:-translate-y-2 duration-500 group"><i class="pi pi-users lg:absolute lg:top-8 lg:left-8 text-3xl p-3 bg-zinc-100 dark:text-xred rounded-full group-hover:bg-xred group-hover:text-white duration-500"></i><div class="font-semibold text-xl lg:text-2xl font-barlow mb-3 text-xpurple dark:text-white"> Secure by Design </div><p class="text-sm lg:text-md"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut suspendisse ultrices </p></li><li class="inline-block dark:bg-xblack lg:block max-w-full md:max-w-[45%] lg:max-w-full shadow p-5 lg:p-8 relative pl-5 lg:pl-24 mx-3 lg:mx-0 mb-8 hover:-translate-y-2 duration-500 group"><i class="pi pi-users lg:absolute lg:top-8 lg:left-8 text-3xl p-3 bg-zinc-100 dark:text-xred rounded-full group-hover:bg-xred group-hover:text-white duration-500"></i><div class="font-semibold text-xl lg:text-2xl font-barlow mb-3 text-xpurple dark:text-white"> Compliant by Design </div><p class="text-sm lg:text-md"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut suspendisse ultrices </p></li><li class="inline-block dark:bg-xblack lg:block max-w-full md:max-w-[45%] lg:max-w-full shadow p-5 lg:p-8 relative pl-5 lg:pl-24 mx-3 lg:mx-0 hover:-translate-y-2 duration-500 group"><i class="pi pi-users lg:absolute lg:top-8 lg:left-8 text-3xl p-3 bg-zinc-100 dark:text-xred rounded-full group-hover:bg-xred group-hover:text-white duration-500"></i><div class="font-semibold text-xl lg:text-2xl font-barlow mb-3 text-xpurple dark:text-white"> Continuous Monitoring </div><p class="text-sm lg:text-md"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut suspendisse ultrices </p></li></ul></div></div></div></div>',
    1
  ),
  $f = [zf]
function Df(e, t) {
  return ce(), ve('section', kf, $f)
}
const Bf = et(Rf, [['render', Df]]),
  jf =
    'https://jay04makwana.github.io/anshtechlabs.github.io/images/performance/p1.jpg',
  Nf =
    'https://jay04makwana.github.io/anshtechlabs.github.io/images/performance/p2.jpg',
  Ff =
    'https://jay04makwana.github.io/anshtechlabs.github.io/images/performance/p3.jpg',
  Hf =
    'https://jay04makwana.github.io/anshtechlabs.github.io/images/performance/p4.jpg',
  Vf =
    'https://jay04makwana.github.io/anshtechlabs.github.io/images/performance/p5.jpg',
  qf =
    'https://jay04makwana.github.io/anshtechlabs.github.io/images/performance/p6.jpg',
  Gf = {},
  Wf = { class: 'py-24' },
  Uf = Fe(
    '<div class="container mx-auto"><div class="max-w-[660px] mx-auto mb-10"><h1 class="font-barlow font-bold text-4xl text-center p-5 text-xpurple dark:text-white">High-Performance Solution</h1><p class="text-center text-sm lg:text-md">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus quam neque quibusdam corrupti aspernatur corporis alias nisi dolorum expedita veritatis voluptates minima</p></div><div class="grid grid-cols-12 gap-4 text-white"><div class="col-span-5 max-lg:col-span-12"><div class="group relative transition delay-150 hover:-translate-y-2 duration-500 h-[400px]"><img class="w-full h-full" src="' +
      jf +
      '" alt=""><div class="absolute left-0 bottom-0 h-0 group-hover:h-full w-full bg-gradient-to-br from-xred to-xred z-10 opacity-70 group-hover:bottom-auto group-hover:top-0 duration-700"></div><div class="absolute top-0 left-0 bg-gradient-to-b from-[#ff000000] to-[#0e0129fc] h-full w-full"></div><div class="text-white absolute left-0 right-0 bottom-0 p-5 z-10"><p class="font-barlow font-semibold text-xl lg:text-2xl mb-3">Secure Managed IT</p><p class="mb-4 text-sm lg:text-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolorer</p><a href="#" class="text-xred text-ls dark:text-white font-semibold group-hover:text-white duration:500">Read more</a></div></div></div><div class="col-span-7 max-lg:col-span-12"><div class="grid grid-cols-12 gap-4"><div class="lg:col-span-6 max-sm:col-span-12 max-lg:col-span-6"><div class="group relative transition delay-150 hover:-translate-y-2 duration-500 h-[400px]"><img class="h-full w-full" src="' +
      Nf +
      '" alt=""><div class="absolute left-0 bottom-0 h-0 group-hover:h-full w-full bg-gradient-to-br from-xred to-xred z-10 opacity-70 group-hover:bottom-auto group-hover:top-0 duration-700"></div><div class="absolute top-0 left-0 bg-gradient-to-b from-[#ff000000] to-[#0e0129fc] h-full w-full"></div><div class="text-white absolute left-0 right-0 bottom-0 p-5 z-10"><p class="font-barlow font-semibold text-xl lg:text-2xl mb-3">Compliance</p><p class="mb-4 text-sm lg:text-md">Lorem ipsum dolor sit amet sed, consectetur adipiscing elit do</p><a href="#" class="text-xred text-ls dark:text-white font-semibold group-hover:text-white duration:500">Read more</a></div></div></div><div class="lg:col-span-6 max-sm:col-span-12 max-lg:col-span-6"><div class="group relative transition delay-150 hover:-translate-y-2 duration-500 h-[400px]"><img class="w-full h-full" src="' +
      Ff +
      '" alt=""><div class="absolute left-0 bottom-0 h-0 group-hover:h-full w-full bg-gradient-to-br from-xred to-xred z-10 opacity-70 group-hover:bottom-auto group-hover:top-0 duration-700"></div><div class="absolute top-0 left-0 bg-gradient-to-b from-[#ff000000] to-[#0e0129fc] h-full w-full"></div><div class="text-white absolute left-0 right-0 bottom-0 p-5 z-10"><p class="font-barlow font-semibold text-xl lg:text-2xl mb-3">Cyber Security</p><p class="mb-4 text-sm lg:text-md">Lorem ipsum dolor sit amet sed, consectetur adipiscing elit do</p><a href="#" class="text-xred text-ls dark:text-white font-semibold group-hover:text-white duration:500">Read more</a></div></div></div></div></div><div class="col-span-7 max-lg:col-span-12"><div class="grid grid-cols-12 gap-4"><div class="lg:col-span-6 max-sm:col-span-12 max-lg:col-span-6"><div class="group relative transition delay-150 hover:-translate-y-2 duration-500 h-[400px]"><img class="w-full h-full" src="' +
      Hf +
      '" alt=""><div class="absolute left-0 bottom-0 h-0 group-hover:h-full w-full bg-gradient-to-br from-xred to-xred z-10 opacity-70 group-hover:bottom-auto group-hover:top-0 duration-700"></div><div class="absolute top-0 left-0 bg-gradient-to-b from-[#ff000000] to-[#0e0129fc] h-full w-full"></div><div class="text-white absolute left-0 right-0 bottom-0 p-5 z-10"><p class="font-barlow font-semibold text-xl lg:text-2xl mb-3">Disaster Planning</p><p class="mb-4 text-sm lg:text-md">Lorem ipsum dolor sit amet sed, consectetur adipiscing elit do</p><a href="#" class="text-xred text-ls dark:text-white font-semibold group-hover:text-white duration:500">Read more</a></div></div></div><div class="lg:col-span-6 max-sm:col-span-12 max-lg:col-span-6"><div class="group relative transition delay-150 hover:-translate-y-2 duration-500 h-[400px]"><img class="w-full h-full" src="' +
      Vf +
      '" alt=""><div class="absolute left-0 bottom-0 h-0 group-hover:h-full w-full bg-gradient-to-br from-xred to-xred z-10 opacity-70 group-hover:bottom-auto group-hover:top-0 duration-700"></div><div class="absolute top-0 left-0 bg-gradient-to-b from-[#ff000000] to-[#0e0129fc] h-full w-full"></div><div class="text-white absolute left-0 right-0 bottom-0 p-5 z-10"><p class="font-barlow font-semibold text-xl lg:text-2xl mb-3">Secure by Design</p><p class="mb-4 text-sm lg:text-md">Lorem ipsum dolor sit amet sed, consectetur adipiscing elit do</p><a href="#" class="text-xred text-ls dark:text-white font-semibold group-hover:text-white duration:500">Read more</a></div></div></div></div></div><div class="col-span-5 max-lg:col-span-12"><div class="group relative transition delay-150 hover:-translate-y-2 duration-500 h-[400px]"><img class="w-full h-full" src="' +
      qf +
      '" alt=""><div class="absolute left-0 bottom-0 h-0 group-hover:h-full w-full bg-gradient-to-br from-xred to-xred z-10 opacity-70 group-hover:bottom-auto group-hover:top-0 duration-700"></div><div class="absolute top-0 left-0 bg-gradient-to-b from-[#ff000000] to-[#0e0129fc] h-full w-full"></div><div class="text-white absolute left-0 right-0 bottom-0 p-5"><p class="font-barlow font-semibold text-xl lg:text-2xl mb-3">Secure Awareness Training</p><p class="mb-4 text-sm lg:text-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolorer</p><a href="#" class="text-xred text-ls dark:text-white font-semibold group-hover:text-white duration:500">Read more</a></div></div></div></div></div>',
    1
  ),
  Kf = [Uf]
function Yf(e, t, s, i, r, n) {
  return ce(), ve('section', Wf, Kf)
}
const Xf = et(Gf, [['render', Yf]]),
  Qf =
    'https://jay04makwana.github.io/anshtechlabs.github.io/images/electronic-img.png',
  Jf = {
    data() {
      return {
        isInnerDivClicked: !1,
        activeTabIndex: 0,
        hello: !1,
        tabs: [
          { tabname: 'Intercom System' },
          { tabname: 'CCTV' },
          { tabname: 'GDPR' },
          { tabname: 'Encription' },
          { tabname: 'Our Goal' },
        ],
      }
    },
    methods: {
      selectTab(e) {
        e !== this.activeTabIndex && (this.isInnerDivClicked = !1),
          (this.activeTabIndex = e),
          (this.isInnerDivClicked = !0)
      },
    },
    created() {
      const e = this.tabs.find((t) => t.selected)
      e && (this.activeTabIndex = this.tabs.indexOf(e)),
        (this.isInnerDivClicked = !0)
    },
  },
  Zf = { class: 'py-24 bg-[#010c16] text-white' },
  ep = { class: 'container mx-auto' },
  tp = { class: 'grid grid-cols-12 max-lg:text-center' },
  sp = { class: 'col-span-6 max-lg:col-span-full' },
  ip = { class: 'electronic-content' },
  rp = _(
    'h2',
    { class: 'font-barlow font-bold text-2xl lg:text-4xl mb-12' },
    ' Innovative Electronic Protection of Your Office and Home Control Online ',
    -1
  ),
  np = { class: 'border-b-2 border-solid border-[#2f3840] mb-5' },
  op = ['onClick'],
  lp = {
    class:
      'tab_content relative overflow-hidden leading-6 font-normal font-rubik text-sm lg:text-base mx-3',
  },
  ap = {
    class: 'tabs_item animate__animated animate__slideInUp animate__faster',
  },
  cp = _(
    'p',
    { class: 'mb-4' },
    ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo ducimus vero, vero corporis voluptates beatae pariatur laudantium, fugiat illum ab deserunt nostrum aliquid quisquam esse? Voluptatibus quia velit numquam esse porro ipsum dolor, sit amet consectetur adipisicing elit. Illo ducimus vero, corporis. ',
    -1
  ),
  up = _(
    'p',
    null,
    ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis, soluta, aspernatur dolorum sequi quisquam ullam in pariatur nihil dolorem cumque excepturi totam. Qui excepturi quasi cumque placeat fuga. Ea, eius? ',
    -1
  ),
  dp = _('div', null, 'feferferfer', -1),
  fp = [cp, up, dp],
  pp = {
    class:
      'tabs_item h-full duration-500 ease-out transform animate__animated animate__slideInUp',
  },
  hp = _(
    'p',
    null,
    ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo ducimus vero, vero corporis voluptates beatae pariatur laudantium, fugiat illum ab deserunt nostrum aliquid quisquam esse? Voluptatibus quia velit numquam esse porro ipsum dolor, sit amet consectetur adipisicing elit. Illo ducimus vero, corporis. ',
    -1
  ),
  mp = _(
    'p',
    null,
    ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis, soluta, aspernatur dolorum sequi quisquam ullam in pariatur nihil dolorem cumque excepturi totam. Qui excepturi quasi cumque placeat fuga. Ea, eius? ',
    -1
  ),
  gp = [hp, mp],
  vp = {
    class:
      'tabs_item h-full duration-500 ease-out transform animate__animated animate__slideInUp',
  },
  bp = _(
    'p',
    null,
    ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo ducimus vero, vero corporis voluptates beatae pariatur laudantium, fugiat illum ab deserunt nostrum aliquid quisquam esse? Voluptatibus quia velit numquam esse porro ipsum dolor, sit amet consectetur adipisicing elit. Illo ducimus vero, corporis. ',
    -1
  ),
  xp = _(
    'p',
    null,
    ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis, soluta, aspernatur dolorum sequi quisquam ullam in pariatur nihil dolorem cumque excepturi totam. Qui excepturi quasi cumque placeat fuga. Ea, eius? ',
    -1
  ),
  wp = _('div', null, 'feferferfer', -1),
  yp = [bp, xp, wp],
  _p = {
    class:
      'tabs_item h-full duration-500 ease-out transform animate__animated animate__slideInUp',
  },
  Sp = _(
    'p',
    null,
    ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo ducimus vero, vero corporis voluptates beatae pariatur laudantium, fugiat illum ab deserunt nostrum aliquid quisquam esse? Voluptatibus quia velit numquam esse porro ipsum dolor, sit amet consectetur adipisicing elit. Illo ducimus vero, corporis. ',
    -1
  ),
  Tp = _(
    'p',
    null,
    ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis, soluta, aspernatur dolorum sequi quisquam ullam in pariatur nihil dolorem cumque excepturi totam. Qui excepturi quasi cumque placeat fuga. Ea, eius? ',
    -1
  ),
  Ep = [Sp, Tp],
  Pp = {
    class:
      'tabs_item h-full duration-500 ease-out transform animate__animated animate__slideInUp',
  },
  Cp = _(
    'p',
    null,
    ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo ducimus vero, vero corporis voluptates beatae pariatur laudantium, fugiat illum ab deserunt nostrum aliquid quisquam esse? Voluptatibus quia velit numquam esse porro ipsum dolor, sit amet consectetur adipisicing elit. Illo ducimus vero, corporis. ',
    -1
  ),
  Ip = _(
    'p',
    null,
    ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis, soluta, aspernatur dolorum sequi quisquam ullam in pariatur nihil dolorem cumque excepturi totam. Qui excepturi quasi cumque placeat fuga. Ea, eius? ',
    -1
  ),
  Mp = _('div', null, 'feferferfer', -1),
  Op = [Cp, Ip, Mp],
  Ap = _(
    'div',
    {
      class: 'col-span-6 max-lg:col-span-full flex items-center justify-center',
    },
    [_('div', null, [_('img', { src: Qf, alt: 'Image' })])],
    -1
  )
function Lp(e, t, s, i, r, n) {
  return (
    ce(),
    ve('section', Zf, [
      _('div', ep, [
        _('div', tp, [
          _('div', sp, [
            _('div', ip, [
              rp,
              _('div', null, [
                _('div', null, [
                  _('ul', np, [
                    (ce(!0),
                    ve(
                      Le,
                      null,
                      ao(
                        r.tabs,
                        (o, a) => (
                          ce(),
                          ve(
                            'li',
                            {
                              class: Ae([
                                'cursor-pointer relative p-0 mr-8 pb-3 inline-block font-semibold current text-xred group',
                                { 'is-active': a === r.activeTabIndex },
                              ]),
                              key: a,
                              onClick: Ec((l) => n.selectTab(a), ['prevent']),
                            },
                            [
                              _(
                                'span',
                                {
                                  class: Ae([
                                    'pl-0 duration-500',
                                    {
                                      'text-white': a !== r.activeTabIndex,
                                      'text-xred': a === r.activeTabIndex,
                                    },
                                  ]),
                                },
                                Rs(o.tabname),
                                3
                              ),
                              _(
                                'div',
                                {
                                  class: Ae([
                                    'absolute bottom-[-2px] h-[2px] bg-xred max-lg:hidden duration-500',
                                    {
                                      'right-0 w-0':
                                        !r.isInnerDivClicked ||
                                        a !== r.activeTabIndex,
                                      'w-full right-auto left-0':
                                        r.isInnerDivClicked &&
                                        a === r.activeTabIndex,
                                    },
                                  ]),
                                },
                                null,
                                2
                              ),
                            ],
                            10,
                            op
                          )
                        )
                      ),
                      128
                    )),
                  ]),
                  _('div', lp, [
                    es(_('div', ap, fp, 512), [[ss, r.activeTabIndex === 0]]),
                    es(_('div', pp, gp, 512), [[ss, r.activeTabIndex === 1]]),
                    es(_('div', vp, yp, 512), [[ss, r.activeTabIndex === 2]]),
                    es(_('div', _p, Ep, 512), [[ss, r.activeTabIndex === 3]]),
                    es(_('div', Pp, Op, 512), [[ss, r.activeTabIndex === 4]]),
                  ]),
                ]),
              ]),
            ]),
          ]),
          Ap,
        ]),
      ]),
    ])
  )
}
const Rp = et(Jf, [['render', Lp]]),
  kp =
    'https://jay04makwana.github.io/anshtechlabs.github.io/images/complete-img.jpg',
  zp = { class: 'py-24' },
  $p = { class: 'max-w-[540px] md:max-w-[720px] lg:max-w-full mx-auto' },
  Dp = { class: 'grid grid-cols-12' },
  Bp = { class: 'col-span-full lg:col-span-6 pr-3 h-full max-lg:h-[300px]' },
  jp = Fe(
    '<div class="col-span-full lg:col-span-6 px-3 dark:text-white"><div class="lg:max-w-[545px] min-[1700px]:max-w-[635px] max-lg:text-center mr-auto h-full"><div class="font-barlow font-bold text-3xl lg:text-4xl text-xpurple dark:text-white mb-5"> The most Complete and Effective Protection for Your Home and Office </div><p class="mb-5"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor elit incididunt ut labore et dolore magna aliqua. Quis ipsum </p><div class="grid grid-cols-12 gap-5"><div class="col-span-12 min-[576px]:col-span-6 group p-5 relative bg-[#fef4f8] dark:bg-xblack z-10 transition hover:-translate-y-2 duration-500"><div class="flex justify-center lg:justify-start"><div class="h-12 w-12 flex items-center justify-center rounded-full p-8 bg-gradient-to-b from-[#d2044d] to-[#ff5e68] group-hover:bg-none group-hover:bg-white duration-500 group-hover:[transform:rotateY(360deg)]"><div><i class="pi pi-users text-white text-4xl group-hover:text-xred duration-500"></i></div></div></div><div class="group-hover:text-white"><h3 class="mt-5 mb-2 text-2xl font-semibold font-barlow text-xpurple group-hover:text-white dark:text-white"> Check and Search Hazards </h3><p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </p></div><div class="absolute -z-10 h-full right-0 top-0 w-0 bg-gradient-to-br from-[#d2044d] to-[#ff5e68] duration-500 group-hover:left-0 group-hover:right-auto group-hover:w-full"></div></div><div class="col-span-12 min-[576px]:col-span-6 group p-5 relative bg-[#fef4f8] dark:bg-xblack z-10 transition hover:-translate-y-2 duration-500"><div class="flex justify-center lg:justify-start"><div class="h-12 w-12 flex items-center justify-center rounded-full p-8 bg-gradient-to-b from-[#d2044d] to-[#ff5e68] group-hover:bg-none group-hover:bg-white duration-500 group-hover:[transform:rotateY(360deg)]"><div><i class="pi pi-users text-white text-4xl group-hover:text-xred duration-500"></i></div></div></div><div class="group-hover:text-white"><h3 class="mt-5 mb-2 text-2xl font-semibold font-barlow text-xpurple group-hover:text-white dark:text-white"> Install and Configure Software </h3><p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </p></div><div class="absolute -z-10 h-full right-0 top-0 w-0 bg-gradient-to-br from-[#d2044d] to-[#ff5e68] duration-500 group-hover:left-0 group-hover:right-auto group-hover:w-full"></div></div><div class="col-span-12 min-[576px]:col-span-6 group p-5 relative bg-[#fef4f8] dark:bg-xblack z-10 transition hover:-translate-y-2 duration-500"><div class="flex justify-center lg:justify-start"><div class="h-12 w-12 flex items-center justify-center rounded-full p-8 bg-gradient-to-b from-[#d2044d] to-[#ff5e68] group-hover:bg-none group-hover:bg-white duration-500 group-hover:[transform:rotateY(360deg)]"><div><i class="pi pi-users text-white text-4xl group-hover:text-xred duration-500"></i></div></div></div><div class="group-hover:text-white"><h3 class="mt-5 mb-2 text-2xl font-semibold font-barlow text-xpurple group-hover:text-white dark:text-white"> Departure of the Our Experts </h3><p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </p></div><div class="absolute -z-10 h-full right-0 top-0 w-0 bg-gradient-to-br from-[#d2044d] to-[#ff5e68] duration-500 group-hover:left-0 group-hover:right-auto group-hover:w-full"></div></div><div class="col-span-12 min-[576px]:col-span-6 group p-5 relative bg-[#fef4f8] dark:bg-xblack z-10 transition hover:-translate-y-2 duration-500"><div class="flex justify-center lg:justify-start"><div class="h-12 w-12 flex items-center justify-center rounded-full p-8 bg-gradient-to-b from-[#d2044d] to-[#ff5e68] group-hover:bg-none group-hover:bg-white duration-500 group-hover:[transform:rotateY(360deg)]"><div><i class="pi pi-users text-white text-4xl group-hover:text-xred duration-500"></i></div></div></div><div class="group-hover:text-white"><h3 class="mt-5 mb-2 text-2xl font-semibold font-barlow text-xpurple group-hover:text-white dark:text-white"> 24/7 Support and Remote Admit </h3><p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </p></div><div class="absolute -z-10 h-full right-0 top-0 w-0 bg-gradient-to-br from-[#d2044d] to-[#ff5e68] duration-500 group-hover:left-0 group-hover:right-auto group-hover:w-full"></div></div></div></div></div>',
    1
  ),
  Np = {
    __name: 'CompleteArea',
    setup(e) {
      return (t, s) => (
        ce(),
        ve('section', zp, [
          _('div', $p, [
            _('div', Dp, [
              _('div', Bp, [
                _(
                  'div',
                  {
                    class: 'bg-cover bg-no-repeat h-full bg-center',
                    style: at({ backgroundImage: `url(${Re(kp)})` }),
                  },
                  null,
                  4
                ),
              ]),
              jp,
            ]),
          ]),
        ])
      )
    },
  },
  Fp =
    'https://jay04makwana.github.io/anshtechlabs.github.io/images/cybersecurity-img.jpg',
  Hp = { class: 'py-24' },
  Vp = { class: 'max-w-[540px] md:max-w-[720px] lg:max-w-full mx-auto' },
  qp = { class: 'grid grid-cols-12' },
  Gp = Fe(
    '<div class="col-span-full lg:col-span-6 px-3"><div class="lg:max-w-[545px] min-[1700px]:max-w-[635px] max-lg:text-center ml-auto dark:text-white"><div class="font-barlow font-bold text-3xl lg:text-4xl text-xpurple dark:text-white mb-5"> 24/7 Cybersecurity Operation Center </div><p class="mb-8 text-md"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse. </p><div class="grid grid-cols-12 -mx-3 text-left text-[13px] xl:text-md"><div class="col-span-12 min-[576px]:col-span-6 px-3"><ul class="mb-8 xl:last:mb-0"><li class="inline-block bg-[#fdeff4] dark:bg-xblack p-2.5 mb-8 w-full font-semibold relative pl-[35px] z-10 cursor-pointer hover:text-white group"><i class="pi pi-check absolute top-3 left-2.5 text-sm font-semibold text-xred group-hover:text-white transition duration-500"></i> Managed Web Application <div class="absolute top-0 right-0 w-0 group-hover:w-full h-full bg-gradient-to-br from-[#d2044d] to-[#ff5e68] -z-10 group-hover:left-0 group-hover:right-auto duration-500"></div></li><li class="inline-block bg-[#fdeff4] dark:bg-xblack p-2.5 mb-8 w-full font-semibold relative pl-[35px] z-10 cursor-pointer hover:text-white group"><i class="pi pi-check absolute top-3 left-2.5 text-sm font-semibold text-xred group-hover:text-white transition duration-500"></i> SIEM Threat Detection <div class="absolute top-0 right-0 w-0 group-hover:w-full h-full bg-gradient-to-br from-[#d2044d] to-[#ff5e68] -z-10 group-hover:left-0 group-hover:right-auto duration-500"></div></li><li class="inline-block bg-[#fdeff4] dark:bg-xblack p-2.5 mb-8 w-full font-semibold relative pl-[35px] z-10 cursor-pointer hover:text-white group"><i class="pi pi-check absolute top-3 left-2.5 text-sm font-semibold text-xred group-hover:text-white transition duration-500"></i> Content Delivery Network <div class="absolute top-0 right-0 w-0 group-hover:w-full h-full bg-gradient-to-br from-[#d2044d] to-[#ff5e68] -z-10 group-hover:left-0 group-hover:right-auto duration-500"></div></li><li class="inline-block bg-[#fdeff4] dark:bg-xblack p-2.5 mb-8 w-full font-semibold relative pl-[35px] z-10 cursor-pointer hover:text-white group"><i class="pi pi-check absolute top-3 left-2.5 text-sm font-semibold text-xred group-hover:text-white transition duration-500"></i> Website Hack Repair <div class="absolute top-0 right-0 w-0 group-hover:w-full h-full bg-gradient-to-br from-[#d2044d] to-[#ff5e68] -z-10 group-hover:left-0 group-hover:right-auto duration-500"></div></li><li class="inline-block bg-[#fdeff4] dark:bg-xblack p-2.5 w-full font-semibold relative pl-[35px] z-10 cursor-pointer hover:text-white group"><i class="pi pi-check absolute top-3 left-2.5 text-sm font-semibold text-xred group-hover:text-white transition duration-500"></i> Instant Malware Removal <div class="absolute top-0 right-0 w-0 group-hover:w-full h-full bg-gradient-to-br from-[#d2044d] to-[#ff5e68] -z-10 group-hover:left-0 group-hover:right-auto duration-500"></div></li></ul></div><div class="col-span-12 min-[576px]:col-span-6 px-3"><ul class="mb-8 xl:last:mb-0"><li class="inline-block bg-[#fdeff4] dark:bg-xblack p-2.5 mb-8 w-full font-semibold relative pl-[35px] z-10 cursor-pointer hover:text-white group"><i class="pi pi-check absolute top-3 left-2.5 text-sm font-semibold text-xred group-hover:text-white transition duration-500"></i> Instant Malware Removal <div class="absolute top-0 right-0 w-0 group-hover:w-full h-full bg-gradient-to-br from-[#d2044d] to-[#ff5e68] -z-10 group-hover:left-0 group-hover:right-auto duration-500"></div></li><li class="inline-block bg-[#fdeff4] dark:bg-xblack p-2.5 mb-8 w-full font-semibold relative pl-[35px] z-10 cursor-pointer hover:text-white group"><i class="pi pi-check absolute top-3 left-2.5 text-sm font-semibold text-xred group-hover:text-white transition duration-500"></i> Instant Malware Removal <div class="absolute top-0 right-0 w-0 group-hover:w-full h-full bg-gradient-to-br from-[#d2044d] to-[#ff5e68] -z-10 group-hover:left-0 group-hover:right-auto duration-500"></div></li><li class="inline-block bg-[#fdeff4] dark:bg-xblack p-2.5 mb-8 w-full font-semibold relative pl-[35px] z-10 cursor-pointer hover:text-white group"><i class="pi pi-check absolute top-3 left-2.5 text-sm font-semibold text-xred group-hover:text-white transition duration-500"></i> Instant Malware Removal <div class="absolute top-0 right-0 w-0 group-hover:w-full h-full bg-gradient-to-br from-[#d2044d] to-[#ff5e68] -z-10 group-hover:left-0 group-hover:right-auto duration-500"></div></li><li class="inline-block bg-[#fdeff4] dark:bg-xblack p-2.5 mb-8 w-full font-semibold relative pl-[35px] z-10 cursor-pointer hover:text-white group"><i class="pi pi-check absolute top-3 left-2.5 text-sm font-semibold text-xred group-hover:text-white transition duration-500"></i> Instant Malware Removal <div class="absolute top-0 right-0 w-0 group-hover:w-full h-full bg-gradient-to-br from-[#d2044d] to-[#ff5e68] -z-10 group-hover:left-0 group-hover:right-auto duration-500"></div></li><li class="inline-block bg-[#fdeff4] dark:bg-xblack p-2.5 w-full font-semibold relative pl-[35px] z-10 cursor-pointer hover:text-white group"><i class="pi pi-check absolute top-3 left-2.5 text-sm font-semibold text-xred group-hover:text-white transition duration-500"></i> Instant Malware Removal <div class="absolute top-0 right-0 w-0 group-hover:w-full h-full bg-gradient-to-br from-[#d2044d] to-[#ff5e68] -z-10 group-hover:left-0 group-hover:right-auto duration-500"></div></li></ul></div></div></div></div>',
    1
  ),
  Wp = {
    class:
      'col-span-full lg:col-span-6 pl-3 lg:pr-0 pr-3 max-lg:h-[300px] w-full',
  },
  Up = {
    __name: 'CybersecurityArea',
    setup(e) {
      return (t, s) => (
        ce(),
        ve('section', Hp, [
          _('div', Vp, [
            _('div', qp, [
              Gp,
              _('div', Wp, [
                _(
                  'div',
                  {
                    class: 'bg-cover bg-no-repeat bg-center h-full',
                    style: at({ backgroundImage: `url(${Re(Fp)})` }),
                  },
                  null,
                  4
                ),
              ]),
            ]),
          ]),
        ])
      )
    },
  },
  Kp =
    'https://jay04makwana.github.io/anshtechlabs.github.io/images/BlogAreaImg/blog1.jpg',
  Yp =
    'https://jay04makwana.github.io/anshtechlabs.github.io/images/BlogAreaImg/blog2.jpg',
  Xp =
    'https://jay04makwana.github.io/anshtechlabs.github.io/images/BlogAreaImg/blog3.jpg',
  Qp = {},
  Jp = { class: 'py-24' },
  Zp = Fe(
    '<div class="container mx-auto"><div class="max-w-[660px] mx-auto mb-10"><h1 class="font-barlow font-bold text-3xl lg:text-5xl max-md:text-xl text-center p-5 text-xpurple dark:text-white"> Latest News From Blog </h1><p class="text-center text-sm lg:text-md"> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus quam neque quibusdam corrupti aspernatur corporis alias nisi dolorum expedita veritatis voluptates minima. </p></div><div class="grid grid-cols-12 max-lg:text-center"><div class="col-span-4 max-lg:col-span-6 max-sm:col-span-12 px-3 mb-8"><div class="relative transition delay-150 hover:-translate-y-2 duration-500"><img class="w-full h-auto" src="' +
      Kp +
      '" alt=""><div class="absolute top-0 left-0 bg-gradient-to-b from-[#ff000000] to-[#0e0129fc] h-full w-full"></div><div class="text-white absolute left-0 right-0 bottom-0 p-5"><p class="font-barlow font-bold text-2xl sm:text-xl lg:text-2xl mb-3">Secure Managed IT</p><p class="mb-4 text-sm lg:text-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolorer</p><a href="#" class="text-xred text-ls font-semibold">Read more</a></div></div></div><div class="col-span-4 max-lg:col-span-6 max-sm:col-span-12 px-3 mb-8"><div class="relative transition delay-150 hover:-translate-y-2 duration-500"><img class="w-full h-auto" src="' +
      Yp +
      '" alt=""><div class="absolute top-0 left-0 bg-gradient-to-b from-[#ff000000] to-[#0e0129fc] h-full w-full"></div><div class="text-white absolute left-0 right-0 bottom-0 p-5"><p class="font-barlow font-bold text-2xl sm:text-xl lg:text-2xl mb-3">Cloud Security</p><p class="mb-4 text-sm lg:text-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolorer</p><a href="#" class="text-xred text-ls font-semibold">Read more</a></div></div></div><div class="col-span-4 max-lg:col-span-6 max-lg:col-start-4 max-sm:col-span-12 px-3 mb-8"><div class="relative transition delay-150 hover:-translate-y-2 duration-500"><img class="w-full h-auto" src="' +
      Xp +
      '" alt=""><div class="absolute top-0 left-0 bg-gradient-to-b from-[#ff000000] to-[#0e0129fc] h-full w-full"></div><div class="text-white absolute left-0 right-0 bottom-0 p-5"><p class="font-barlow font-bold text-2xl sm:text-xl lg:text-2xl mb-3">Secured Managed Web</p><p class="mb-4 text-sm lg:text-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolorer</p><a href="#" class="text-xred text-ls font-semibold">Read more</a></div></div></div></div></div>',
    1
  ),
  eh = [Zp]
function th(e, t, s, i, r, n) {
  return ce(), ve('section', Jp, eh)
}
const sh = et(Qp, [['render', th]]),
  ih = {
    components: {
      PartnerArea: Ef,
      SecurityArea: Af,
      ApproachArea: Bf,
      PerformanceSolution: Xf,
      ElectronicArea: Rp,
      CompleteArea: Np,
      CybersecurityArea: Up,
      BlogArea: sh,
    },
  }
function rh(e, t, s, i, r, n) {
  const o = Ee('partner-area'),
    a = Ee('security-area'),
    l = Ee('approach-area'),
    u = Ee('performance-solution'),
    c = Ee('electronic-area'),
    d = Ee('complete-area'),
    f = Ee('cybersecurity-area'),
    p = Ee('blog-area')
  return (
    ce(), ve(Le, null, [Y(o), Y(a), Y(l), Y(u), Y(c), Y(d), Y(f), Y(p)], 64)
  )
}
const nh = et(ih, [['render', rh]]),
  oh = Uc(),
  lh = [
    { path: '/', name: 'Home', component: nh },
    {
      path: '/about',
      name: 'About',
      meta: { title: 'About' },
      component: () =>
        ut(
          () => import('./About-4eea6cdf.js'),
          ['assets/About-4eea6cdf.js', 'assets/About-7293366d.css']
        ),
    },
    {
      path: '/blog-index',
      name: 'BlogIndex',
      meta: { title: 'Blog Index' },
      component: () =>
        ut(
          () => import('./Index-9ee68b7b.js'),
          ['assets/Index-9ee68b7b.js', 'assets/BlogAside-5a664b5c.js']
        ),
    },
    {
      path: '/blog-details',
      name: 'BlogDetails',
      meta: { title: 'Blog Details' },
      component: () =>
        ut(
          () => import('./Index-e27882ff.js'),
          [
            'assets/Index-e27882ff.js',
            'assets/BlogAside-5a664b5c.js',
            'assets/index-c99718b6.js',
            'assets/Index-326d94af.css',
          ]
        ),
    },
    {
      path: '/team',
      name: 'Team',
      meta: { title: 'Team' },
      component: () => ut(() => import('./Team-db10b7d3.js'), []),
    },
    {
      path: '/contact-us',
      name: 'ContactUs',
      meta: { title: 'Contact' },
      component: () =>
        ut(
          () => import('./ContactUs-5d3c9e6b.js'),
          [
            'assets/ContactUs-5d3c9e6b.js',
            'assets/FaqContactArea-936062e6.js',
            'assets/index-c99718b6.js',
          ]
        ),
    },
    {
      path: '/faq',
      name: 'FAQ',
      meta: { title: 'FAQ' },
      component: () =>
        ut(
          () => import('./faq-eba3f9f9.js'),
          [
            'assets/faq-eba3f9f9.js',
            'assets/FaqContactArea-936062e6.js',
            'assets/index-c99718b6.js',
          ]
        ),
    },
    {
      path: '/service',
      redirect: '/',
      meta: { title: 'Service' },
      children: [
        {
          path: 'details',
          name: 'ServiceDetails',
          meta: { title: 'Service Details' },
          component: () =>
            ut(
              () => import('./ServiceDetails-63484fb9.js'),
              [
                'assets/ServiceDetails-63484fb9.js',
                'assets/BlogAside-5a664b5c.js',
                'assets/ServiceDetails-3d77bcb8.css',
              ]
            ),
        },
        {
          path: 'index',
          name: 'ServiceIndex',
          meta: { title: 'Service Index' },
          component: () =>
            ut(
              () => import('./ServiceIndex-4c9d1168.js'),
              [
                'assets/ServiceIndex-4c9d1168.js',
                'assets/ServiceIndex-d047b74c.css',
              ]
            ),
        },
      ],
    },
  ],
  ah = Au({
    history: oh,
    routes: lh,
    scrollBehavior() {
      return { top: 0 }
    },
  }),
  ch =
    'https://jay04makwana.github.io/anshtechlabs.github.io/images/page-bg.png',
  uh = {
    setup() {
      return { pagebg: ch }
    },
    data() {
      return { pathlist: null }
    },
    watch: {
      $route(e) {
        e.path.startsWith('/redirect/') || this.getBreadcrumb()
      },
    },
    created() {
      this.getBreadcrumb()
    },
    methods: {
      getBreadcrumb() {
        let e = this.$route.matched.filter((s) => s.meta && s.meta.title)
        const t = e[0]
        this.isHome(t) ||
          (e = [{ path: '/', meta: { title: 'Home' } }].concat(e)),
          (this.pathlist = e.filter((s) => s.meta && s.meta.title))
      },
      isHome(e) {
        const t = e && e.name
        return t
          ? t.trim().toLocaleLowerCase() === 'Home'.toLocaleLowerCase()
          : !1
      },
    },
  },
  dh = { class: 'container mx-auto' },
  fh = { class: 'page-title-content' },
  ph = { class: 'text-4xl font-bold font-barlow mb-3.5 capitalize' },
  hh = { class: 'my-2 flex justify-center' },
  mh = { key: 1 }
function gh(e, t, s, i, r, n) {
  const o = Ee('router-link')
  return (
    ce(),
    ve(
      'div',
      {
        class:
          'relative bg-cover bg-no-repeat bg-center pt-40 pb-24 md:pt-52 md:pb-36 text-center px-3 text-white before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#0e0129] before:opacity-90 before:-z-10',
        style: at({ backgroundImage: `url(${i.pagebg})` }),
      },
      [
        _('div', dh, [
          _('div', fh, [
            _(
              'h2',
              ph,
              Rs(r.pathlist && r.pathlist[r.pathlist.length - 1].meta.title),
              1
            ),
            _('ul', hh, [
              (ce(!0),
              ve(
                Le,
                null,
                ao(
                  r.pathlist,
                  (a, l) => (
                    ce(),
                    ve(
                      'li',
                      {
                        key: a.path,
                        class: Ae([
                          'inline-block duration-500 font-medium font-md px-3.5 relative',
                          {
                            'before:absolute before:top-2.5 before:-right-1.5 before:bg-xred before:h-2.5 before:w-2.5':
                              l < r.pathlist.length - 1,
                            'text-xred': l === r.pathlist.length - 1,
                          },
                        ]),
                      },
                      [
                        l === 0
                          ? (ce(),
                            cs(
                              o,
                              { key: 0, class: 'hover:text-xred', to: a.path },
                              {
                                default: he(() => [$e(Rs(a.meta.title), 1)]),
                                _: 2,
                              },
                              1032,
                              ['to']
                            ))
                          : (ce(), ve('span', mh, Rs(a.meta.title), 1)),
                      ],
                      2
                    )
                  )
                ),
                128
              )),
            ]),
          ]),
        ]),
      ],
      4
    )
  )
}
const vh = et(uh, [['render', gh]]),
  bh =
    'https://jay04makwana.github.io/anshtechlabs.github.io/images/background_Img.jpg'
const xh = {
    components: { BreadCrumb: vh },
    setup() {
      return { bgimg: bh }
    },
    data() {
      return {
        scrl: !1,
        smallopenmenu: !1,
        homeopen: !1,
        pagesopen: !1,
        useropen: !1,
        serviceopen: !1,
        shopopen: !1,
        blogopen: !1,
        isHovered: !1,
      }
    },
    beforeMount() {
      window.removeEventListener('scroll', this.userScroll)
    },
    mounted() {
      window.addEventListener('scroll', this.userScroll)
    },
    methods: {
      userScroll() {
        window.scrollY > 50 ? (this.scrl = !0) : (this.scrl = !1)
      },
      handleMouseOver() {
        this.isHovered = !0
      },
      handleMouseOut() {
        this.isHovered = !1
      },
    },
  },
  wh = { class: '' },
  yh = {
    class:
      'text-white fixed z-20 top-0 container mx-auto max-w-full max-lg:bg-[#25245e]',
  },
  _h = Fe(
    '<div class="px-12"><div class="grid grid-cols-12 items-center"><div class="col-span-12 md:col-span-8"><ul class="flex justify-center flex-col sm:flex-row items-center md:justify-start max-sm:mb-1 sm:gap-3"><li class="max-sm:mb-1"><a href="#" class="hover:text-xred transition-all duration-500"><i class="pi pi-envelope pr-2"></i> Email: hello@seku.com </a></li><li><a href="#" class="hover:text-xred transition-all duration-500"><i class="pi pi-map-marker mr-2"></i> 658 Lane Drive St. California </a></li></ul></div><div class="col-span-12 md:col-span-4"><ul class="flex justify-center gap-3 md:justify-end"><li class=""><a href="#" target="_blank" class="text-sm hover:text-xred"><i class="pi pi-facebook relative top-1"></i></a></li><li class=""><a href="#" target="_blank" class="text-sm hover:text-xred"><i class="pi pi-twitter relative top-1"></i></a></li><li class=""><a href="#" target="_blank" class="text-sm hover:text-xred"><i class="pi pi-linkedin relative top-1"></i></a></li><li class=""><a href="#" target="_blank" class="text-sm hover:text-xred"><i class="pi pi-instagram mr-1 relative top-1"></i></a></li></ul></div></div></div>',
    1
  ),
  Sh = [_h],
  Th = { class: 'font-bold text-2xl text-white flex items-center' },
  Eh = { class: 'flex justify-center items-center' },
  Ph = { class: 'flex' },
  Ch = { class: 'relative inline-block' },
  Ih = { class: 'relative inline-block group/item' },
  Mh = _(
    'a',
    {
      href: '#',
      class:
        'text-white font-semibold py-3 px-4 text-base transition-colors duration-300 ease-in-out group-hover/item:text-xred focus:outline-none inline-block relative',
    },
    [$e('Services'), _('i', { class: 'pi pi-angle-right absolute top-1/3' })],
    -1
  ),
  Oh = {
    class:
      'hidden group-hover/item:block absolute bg-[#ffffff] w-64 shadow-md group-hover:block font-semibold',
  },
  Ah = {
    class:
      'relative group/inneritem border-b border-dashed border-gray-300 hover:bg-[#f3f3f3]',
  },
  Lh = _(
    'div',
    {
      class:
        'absolute bottom-[-1px] right-0 h-[1px] bg-xred w-0 group-hover/inneritem:w-full group-hover/inneritem:left-0 group-hover/inneritem:right-auto duration-500',
    },
    null,
    -1
  ),
  Rh = Fe(
    '<li class="relative group/inneritem border-b border-dashed border-gray-300 hover:bg-[#f3f3f3]"><div class="absolute bottom-[-1px] right-0 h-[1px] bg-xred w-0 group-hover/inneritem:w-full group-hover/inneritem:left-0 group-hover/inneritem:right-auto duration-500"></div><a href="#" class="block px-4 py-2 text-xpurple no-underline hover:text-xred">Service style two</a></li><li class="relative group/inneritem border-b border-dashed border-gray-300 hover:bg-[#f3f3f3]"><div class="absolute bottom-[-1px] right-0 h-[1px] bg-xred w-0 group-hover/inneritem:w-full group-hover/inneritem:left-0 group-hover/inneritem:right-auto duration-500"></div><a href="#" class="block px-4 py-2 text-xpurple no-underline hover:text-xred">Service style three</a></li>',
    2
  ),
  kh = {
    class:
      'relative group/inneritem border-b border-dashed border-gray-300 hover:bg-[#f3f3f3]',
  },
  zh = _(
    'div',
    {
      class:
        'absolute bottom-[-1px] right-0 h-[1px] bg-xred w-0 group-hover/inneritem:w-full group-hover/inneritem:left-0 group-hover/inneritem:right-auto duration-500',
    },
    null,
    -1
  ),
  $h = { class: 'relative inline-block group/item' },
  Dh = { class: 'relative inline-block' },
  Bh = Fe(
    '<div class=""><div class=""><button type="submit" class="cursor-pointer mx-auto bg-xred z-20 text-white font-semibold relative text-center overflow-hidden py-2 px-8 group"><div class="absolute top-0 left-0 w-0 h-full -z-10 bg-[#0e0129] group-hover:left-auto group-hover:right-0 group-hover:w-1/2 duration-500"></div><div class="absolute top-0 right-0 w-0 h-full -z-10 bg-[#0e0129] group-hover:left-0 group-hover:right-auto group-hover:w-1/2 duration-500"></div> Get A Quote </button></div></div>',
    1
  ),
  jh = { class: 'bg-[#25245e]' },
  Nh = {
    class: 'flex flex-row flex-no-wrap justify-between items-center mx-8 my-1',
  },
  Fh = _('h1', { class: 'text-3xl font-bold' }, 'ATL', -1),
  Hh = {
    class:
      'bg-transparent border-none w-12 h-12 flex justify-center items-center relative',
  },
  Vh = { class: '' },
  qh = { class: 'list-none flex flex-col flex-no-wrap' },
  Gh = { class: 'py-4 border-t border-[#25245e]' },
  Wh = { class: 'py-4 border-t border-[#25245e]' },
  Uh = Fe(
    '<ul class=""><li class="p-5 hover:text-xred border-b border-gray-300 font-bold">Service style one </li><li class="p-5 hover:text-xred border-b border-gray-300 font-bold">Service style two </li><li class="p-5 hover:text-xred border-b border-gray-300 font-bold">Service style three</li><li class="p-5 hover:text-xred border-b border-gray-300 font-bold">Service Details </li></ul>',
    1
  ),
  Kh = [Uh],
  Yh = { class: 'py-4 border-t border-[#25245e]' },
  Xh = { class: 'py-4 border-t border-[#25245e]' },
  Qh = { key: 0 },
  Jh = Fe(
    '<div class="max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto pt-40"><div class="grid grid-cols-12 justify-center"><div class="col-span-9 max-lg:col-span-12 max-sm:col-span-12 max-lg:text-center mb-10"><div class="max-w-full lg:max-w-[690px] mb-[-8px] overflow-hidden pt-10"><p class="text-lg animate__animated animate__slideInDown font-barlow">All Research up to Blockchain Interoperability is completed</p><h1 class="text-4xl lg:text-7xl my-6 font-bold translate-x-96 animate__animated animate__slideInLeft font-barlow"> Modern Information Protect from Hackers</h1><p class="text-sm md:text-md lg:text-lg mb-9 animate__animated animate__slideInRight">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil architecto laborum eaque! Deserunt maxime, minus quas molestiae reiciendis esse natus nisi iure.</p><div class="flex gap-4 max-lg:items-center max-lg:justify-center"><div class=""><button type="submit" class="text-sm lg:text-base cursor-pointer mx-auto bg-xred z-10 text-white font-semibold relative text-center overflow-hidden py-3.5 px-8 group"><div class="absolute top-0 left-0 w-0 h-full -z-10 bg-[#0e0129] group-hover:left-auto group-hover:right-0 group-hover:w-1/2 duration-500"></div><div class="absolute top-0 right-0 w-0 h-full -z-10 bg-[#0e0129] group-hover:left-0 group-hover:right-auto group-hover:w-1/2 duration-500"></div> Booking Now </button></div><div class=""><button type="submit" class="text-sm lg:text-base cursor-pointer mx-auto bg-white hover:text-white font-semibold z-10 text-[#0e0129] relative text-center overflow-hidden py-3.5 px-8 group"><div class="absolute top-0 left-0 w-0 h-full -z-10 bg-[#0e0129] group-hover:left-auto group-hover:right-0 group-hover:w-1/2 duration-500"></div><div class="absolute top-0 right-0 w-0 h-full -z-10 bg-[#0e0129] group-hover:left-0 group-hover:right-auto group-hover:w-1/2 duration-500"></div> About Us </button></div></div></div></div><div class="col-span-3 max-lg:col-span-12 max-sm:col-span-12 flex items-center justify-center"><a href="#play" class="video-btn flex items-center justify-center w-20 h-20 leading-[89px] text-center text-xred relative top-1 z-10 bg-gradient-to-br from-[#d2044d] to-[#ff5e68]"><div class="v1 block absolute top-0 right-0 bottom-0 left-0 -z-10 bg-gradient-to-br from-[#d2044d] to-[#ff5e68]"></div><div class="v2 block absolute top-0 right-0 bottom-0 left-0 -z-10 bg-gradient-to-br from-[#d2044d] to-[#ff5e68]"></div><i class="pi pi-play text-white text-5xl flex font-bold"></i></a></div></div></div><div class="max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1320px] pt-20 mt-10 max-lg:pt-0 mx-auto"><div class="grid grid-cols-12 gap-4 pb-10"><div class="col-span-4 max-lg:col-span-6 max-sm:col-span-12 relative group"><div class="bg-[#140f14] border-r-none lg:border-r-2 border-xred relative p-8 z-10"><div class="absolute -z-10 h-full right-0 top-0 w-0 bg-gradient-to-br from-[#d2044d] to-[#ff5e68] opacity-75 duration-500 group-hover:left-0 group-hover:right-auto group-hover:w-full"></div><h3 class="font-barlow text-xred group-hover:text-white relative pl-12 mb-5 text-xl lg:text-2xl font-bold"><i class="pi pi-shield group-hover:text-white text-xred text-[40px] absolute top-[-4px] left-[-3px]"></i>Security </h3><p class="pb-0 text-white text-sm lg:text-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p><span class="pi pi-shield absolute bottom-0 right-0 pr-3 pb-3 -z-10 text-[80px] text-[#292529] opacity-50"></span></div></div><div class="col-span-4 max-lg:col-span-6 max-sm:col-span-12 group relative"><div class="bg-[#140f14] border-r-none lg:border-r-2 border-xred relative p-8 z-10"><div class="absolute -z-10 h-full right-0 top-0 w-0 bg-gradient-to-br from-[#d2044d] to-[#ff5e68] opacity-75 duration-500 group-hover:left-0 group-hover:right-auto group-hover:w-full"></div><h3 class="font-barlow text-xred group-hover:text-white relative pl-12 mb-5 text-xl lg:text-2xl font-bold"><i class="pi pi-lock text-xred group-hover:text-white text-[40px] absolute top-[-4px] left-[-3px]"></i>Privacy </h3><p class="pb-0 text-white text-sm lg:text-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p><span class="pi pi-lock absolute bottom-0 right-0 pr-3 pb-3 -z-10 text-[80px] text-[#292529] opacity-50"></span></div></div><div class="col-span-4 max-lg:col-span-6 max-lg:col-start-4 max-sm:col-span-12 group relative"><div class="bg-[#140f14] border-r-none lg:border-r-2 border-xred relative p-8 z-10"><div class="absolute -z-10 h-full right-0 top-0 w-0 bg-gradient-to-br from-[#d2044d] to-[#ff5e68] opacity-75 duration-500 group-hover:left-0 group-hover:right-auto group-hover:w-full"></div><h3 class="font-barlow text-xred relative group-hover:text-white pl-12 mb-5 text-xl lg:text-2xl font-bold"><i class="pi pi-cog group-hover:text-white text-xred text-[40px] absolute top-[-4px] left-[-3px]"></i> Industry Certified</h3><p class="pb-0 text-white text-sm lg:text-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p><span class="pi pi-cog absolute bottom-0 right-0 pr-3 pb-3 -z-10 text-[80px] text-[#292529] opacity-50"></span></div></div></div></div>',
    2
  ),
  Zh = [Jh],
  em = { key: 1 }
function tm(e, t, s, i, r, n) {
  const o = Ee('router-link'),
    a = Ee('bread-crumb')
  return (
    ce(),
    ve('div', wh, [
      _('header', yh, [
        _(
          'div',
          {
            class: Ae([
              'text-center py-3.5 border-b border-solid border-[#11132d] text-sm duration-500',
              { 'max-lg:hidden': r.scrl },
            ]),
          },
          Sh,
          2
        ),
        _(
          'div',
          {
            class: Ae([
              {
                'isSticky animate__animated animate__fadeInDown bg-[#11132d]':
                  r.scrl,
                hidden: !r.scrl,
              },
              'flex justify-between bg-[#11132d33] border-y border-1 border-[#11132d] -z-10 px-12 py-4 max-lg:hidden',
            ]),
          },
          [
            _('div', Th, [
              Y(o, { to: '/' }, { default: he(() => [$e(' ATL')]), _: 1 }),
            ]),
            _('div', Eh, [
              _('ul', Ph, [
                _('li', Ch, [
                  Y(
                    o,
                    {
                      to: '/about',
                      class:
                        'inline-block text-white font-semibold py-3 px-4 text-base transition-colors duration-300 ease-in-out hover:text-xred focus:outline-none',
                    },
                    { default: he(() => [$e('About')]), _: 1 }
                  ),
                ]),
                _('li', Ih, [
                  Mh,
                  _('ul', Oh, [
                    _('li', Ah, [
                      Lh,
                      Y(
                        o,
                        {
                          to: '/service/index',
                          href: '#',
                          class:
                            'block px-4 py-2 text-xpurple no-underline hover:text-xred',
                        },
                        { default: he(() => [$e('Service style one')]), _: 1 }
                      ),
                    ]),
                    Rh,
                    _('li', kh, [
                      zh,
                      Y(
                        o,
                        {
                          to: '/service/details',
                          class:
                            'block px-4 py-2 text-xpurple no-underline hover:text-xred',
                        },
                        { default: he(() => [$e('Services Details')]), _: 1 }
                      ),
                    ]),
                  ]),
                ]),
                _('li', $h, [
                  Y(
                    o,
                    {
                      to: '/blog-index',
                      class:
                        'text-white font-semibold py-3 px-4 text-base transition-colors duration-300 ease-in-out group-hover/item:text-xred focus:outline-none inline-block relative',
                    },
                    { default: he(() => [$e('Blog')]), _: 1 }
                  ),
                ]),
                _('li', Dh, [
                  Y(
                    o,
                    {
                      to: '/contact-us',
                      class:
                        'text-white font-semibold px-4 py-3 text-base transition-colors duration-300 ease-in-out hover:text-xred focus:outline-none inline-block',
                    },
                    { default: he(() => [$e('Contact')]), _: 1 }
                  ),
                ]),
              ]),
            ]),
            Bh,
          ],
          2
        ),
        _(
          'div',
          {
            class: Ae([
              {
                'isSticky animate__animated animate__fadeInDown bg-[#25245e] py-2':
                  r.scrl,
                '': !r.scrl,
              },
              'lg:hidden max-lg:bg-[#25245e] bg-opacity-25',
            ]),
          },
          [
            _('header', jh, [
              _('section', Nh, [
                Fh,
                _('button', Hh, [
                  _('div', Vh, [
                    _(
                      'i',
                      {
                        onClick:
                          t[0] ||
                          (t[0] = (l) => (r.smallopenmenu = !r.smallopenmenu)),
                        class: Ae([
                          'pi text-3xl font-bold',
                          {
                            'pi-times ': r.smallopenmenu,
                            'pi-bars': !r.smallopenmenu,
                          },
                        ]),
                      },
                      null,
                      2
                    ),
                  ]),
                ]),
              ]),
              _(
                'nav',
                {
                  class: Ae([
                    'bg-white w-full transition-all duration-500',
                    {
                      'max-h-96 overflow-y-scroll': r.smallopenmenu,
                      'max-h-0 overflow-hidden': !r.smallopenmenu,
                    },
                  ]),
                },
                [
                  _('ul', qh, [
                    _('li', Gh, [
                      Y(
                        o,
                        {
                          to: '/about',
                          class: 'px-2 block font-bold text-[#25245e]',
                        },
                        { default: he(() => [$e('About')]), _: 1 }
                      ),
                    ]),
                    _('li', Wh, [
                      Y(
                        o,
                        {
                          to: '/service',
                          class: 'relative px-2 block font-bold text-[#25245e]',
                        },
                        {
                          default: he(() => [
                            $e('Services '),
                            _(
                              'i',
                              {
                                onClick:
                                  t[1] ||
                                  (t[1] = (l) =>
                                    (r.serviceopen = !r.serviceopen)),
                                class: Ae([
                                  {
                                    'pi-minus': r.serviceopen,
                                    'pi-plus': !r.serviceopen,
                                  },
                                  'pi text-[#25245e] absolute right-0 top-1/3 pr-4 leading-1',
                                ]),
                              },
                              null,
                              2
                            ),
                          ]),
                          _: 1,
                        }
                      ),
                      _(
                        'nav',
                        {
                          class: Ae([
                            'text-[#25245e] transition-all duration-500 overflow-hidden',
                            {
                              'max-h-96 ': r.serviceopen,
                              'max-h-0': !r.serviceopen,
                            },
                          ]),
                        },
                        Kh,
                        2
                      ),
                    ]),
                    _('li', Yh, [
                      Y(
                        o,
                        {
                          to: '/blog-index',
                          class: 'relative px-2 block font-bold text-[#25245e]',
                        },
                        { default: he(() => [$e('Blog')]), _: 1 }
                      ),
                    ]),
                    _('li', Xh, [
                      Y(
                        o,
                        {
                          to: '/contact-us',
                          class: 'px-2 block font-bold text-[#25245e]',
                        },
                        { default: he(() => [$e('Contact')]), _: 1 }
                      ),
                    ]),
                  ]),
                ],
                2
              ),
            ]),
          ],
          2
        ),
      ]),
      e.$route.path == '/'
        ? (ce(),
          ve('section', Qh, [
            _(
              'div',
              {
                class:
                  'bg-cover bg-no-repeat bg-center min-h-[100vh] px-3 text-white',
                style: at({ backgroundImage: `url(${i.bgimg})` }),
              },
              Zh,
              4
            ),
          ]))
        : (ce(), ve('section', em, [Y(a)])),
    ])
  )
}
const sm = et(xh, [['render', tm]]),
  im =
    'https://jay04makwana.github.io/anshtechlabs.github.io/images/footer-bg.jpg',
  rm = Fe(
    '<div class="container mx-auto bg-opacity-90 p-8"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"><div class="col-span-2 md:col-span-1"><div class="text-white"><h3 class="text-lg font-semibold mb-4 underline underline-offset-8">Contact Us</h3><ul><li><a href="tel:+892-569-756" class="flex flex-col py-1"><i class="pi pi-phone mr-2 text-rose-600"><span class="font-bold text-white px-2">Hotline:</span></i><span class="hover:text-rose-600 duration-700 px-6 py-1">Phone: +892-569-756</span></a></li><li><a href="mailto:hello@seku.com" class="flex flex-col py-1"><i class="pi pi-envelope mr-2 text-rose-600"><span class="font-bold text-white px-2">Email:</span></i><span class="hover:text-rose-600 duration-700 px-6 py-1">hello@seku.com</span></a></li><li class="flex flex-col py-2"><i class="pi pi-map-marker mr-2 text-rose-600"><span class="font-bold text-white px-2">Address:</span></i><span class="px-6 py-1">658 Lane Drive st Riverside. California</span></li></ul></div></div><div class="col-span-2 md:col-span-1"><div class="text-white"><h3 class="text-lg font-semibold mb-4 underline underline-offset-8">Services Link</h3><ul><li class="py-1"><a href="#" class="flex items-center hover:text-rose-600 duration-700 transition ease-in-out delay-150 hover:translate-x-2 hover:scale-100"><i class="pi pi-angle-double-right mr-2 text-rose-600"></i> Web Site Protection </a></li><li class="py-1"><a href="#" class="flex items-center hover:text-rose-600 duration-700 transition ease-in-out delay-150 hover:translate-x-2 hover:scale-100"><i class="pi pi-angle-double-right mr-2 text-rose-600"></i> Hosting &amp; Server Guard </a></li><li class="py-1"><a href="#" class="flex items-center hover:text-rose-600 duration-700 transition ease-in-out delay-150 hover:translate-x-2 hover:scale-100"><i class="pi pi-angle-double-right mr-2 text-rose-600"></i> Web Administrator </a></li><li class="py-1"><a href="#" class="flex items-center hover:text-rose-600 duration-700 transition ease-in-out delay-150 hover:translate-x-2 hover:scale-100"><i class="pi pi-angle-double-right mr-2 text-rose-600"></i> Conducting Training </a></li><li class="py-1"><a href="#" class="flex items-center hover:text-rose-600 duration-700 transition ease-in-out delay-150 hover:translate-x-2 hover:scale-100"><i class="pi pi-angle-double-right mr-2 text-rose-600"></i> GRPS Smart Protection </a></li><li class="py-1"><a href="#" class="flex items-center hover:text-rose-600 duration-700 transition ease-in-out delay-150 hover:translate-x-2 hover:scale-100"><i class="pi pi-angle-double-right mr-2 text-rose-600"></i> Security App </a></li></ul></div></div><div class="col-span-2 md:col-span-1"><div class="text-white"><h3 class="text-lg font-semibold mb-4 underline underline-offset-8">Support &amp; Help</h3><ul><li class="py-1"><a href="#" class="flex items-center hover:text-rose-600 duration-700 transition ease-in-out delay-150 hover:translate-x-2 hover:scale-100"><i class="pi pi-angle-double-right mr-2 text-rose-600"></i> Support Forum </a></li><li class="py-1"><a href="#" class="flex items-center hover:text-rose-600 duration-700 transition ease-in-out delay-150 hover:translate-x-2 hover:scale-100"><i class="pi pi-angle-double-right mr-2 text-rose-600"></i> FAQ Questions </a></li><li class="py-1"><a href="#" class="flex items-center hover:text-rose-600 duration-700 transition ease-in-out delay-150 hover:translate-x-2 hover:scale-100"><i class="pi pi-angle-double-right mr-2 text-rose-600"></i> 24/7 Support for Help </a></li><li class="py-1"><a href="#" class="flex items-center hover:text-rose-600 duration-700 transition ease-in-out delay-150 hover:translate-x-2 hover:scale-100"><i class="pi pi-angle-double-right mr-2 text-rose-600"></i> Counseling </a></li><li class="py-1"><a href="#" class="flex items-center hover:text-rose-600 duration-700 transition ease-in-out delay-150 hover:translate-x-2 hover:scale-100"><i class="pi pi-angle-double-right mr-2 text-rose-600"></i> Protection </a></li><li class="py-1"><a href="#" class="flex items-center hover:text-rose-600 duration-700 transition ease-in-out delay-150 hover:translate-x-2 hover:scale-100"><i class="pi pi-angle-double-right mr-2 text-rose-600"></i> Security </a></li></ul></div></div><div class="col-span-2 md:col-span-1"><div class="text-white"><h3 class="text-lg font-semibold mb-4 underline underline-offset-8">Quick Links</h3><ul><li class="py-1"><a href="#" class="flex items-center hover:text-rose-600 duration-700 transition ease-in-out delay-150 hover:translate-x-2 hover:scale-100"><i class="pi pi-angle-double-right mr-2 text-rose-600"></i> Security </a></li><li class="py-1"><a href="#" class="flex items-center hover:text-rose-600 duration-700 transition ease-in-out delay-150 hover:translate-x-2 hover:scale-100"><i class="pi pi-angle-double-right mr-2 text-rose-600"></i> Protection </a></li><li class="py-1"><a href="#" class="flex items-center hover:text-rose-600 duration-700 transition ease-in-out delay-150 hover:translate-x-2 hover:scale-100"><i class="pi pi-angle-double-right mr-2 text-rose-600"></i> Antivirus Packages </a></li><li class="py-1"><a href="#" class="flex items-center hover:text-rose-600 duration-700 transition ease-in-out delay-150 hover:translate-x-2 hover:scale-100"><i class="pi pi-angle-double-right mr-2 text-rose-600"></i> Security App </a></li><li class="py-1"><a href="#" class="flex items-center hover:text-rose-600 duration-700 transition ease-in-out delay-150 hover:translate-x-2 hover:scale-100"><i class="pi pi-angle-double-right mr-2 text-rose-600"></i> Website Security </a></li><li class="py-1"><a href="#" class="flex items-center hover:text-rose-600 duration-700 transition ease-in-out delay-150 hover:translate-x-2 hover:scale-100"><i class="pi pi-angle-double-right mr-2 text-rose-600"></i> Degital Security </a></li></ul></div></div></div></div>',
    1
  ),
  nm = [rm],
  om = Fe(
    '<footer class="bg-[#05224c]"><div class="container mx-auto"><div class="grid grid-cols-12 justify-between items-center text-white font-semibold py-6"><div class="col-span-6 max-md:col-span-12 items-start"><div class="max-md:text-center"><p>© Seku is Proudly Owned by <a href="https://envytheme.com/" class="hover:text-rose-600 duration-700" target="_blank">EnvyTheme</a></p></div></div><div class="col-span-6 max-md:col-span-12"><div class="text-end max-md:text-center"><a href="terms-conditions.html" class="hover:text-rose-600 duration-700">Terms &amp; Condition</a><span> -  </span><a href="privacy-policy.html" class="hover:text-rose-600 duration-700">Privacy Policy</a></div></div></div></div></footer>',
    1
  ),
  lm = {
    __name: 'FooterArea',
    setup(e) {
      return (t, s) => (
        ce(),
        ve(
          Le,
          null,
          [
            _(
              'div',
              {
                class:
                  'z-10 relative before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#0e0129] before:opacity-90 before:-z-10 h-full p-20',
                style: at({ backgroundImage: `url(${Re(im)})` }),
              },
              nm,
              4
            ),
            om,
          ],
          64
        )
      )
    },
  },
  am = 'https://jay04makwana.github.io/anshtechlabs.github.io/images/sunny.png',
  cm = 'https://jay04makwana.github.io/anshtechlabs.github.io/images/night.png'
function el(e) {
  return Rn() ? (Sl(e), !0) : !1
}
function Kt(e) {
  return typeof e == 'function' ? e() : Re(e)
}
const um = typeof window < 'u' && typeof document < 'u'
typeof WorkerGlobalScope < 'u' && globalThis instanceof WorkerGlobalScope
const dm = Object.prototype.toString,
  fm = (e) => dm.call(e) === '[object Object]',
  tl = () => {}
function pm(e, t) {
  function s(...i) {
    return new Promise((r, n) => {
      Promise.resolve(
        e(() => t.apply(this, i), { fn: t, thisArg: this, args: i })
      )
        .then(r)
        .catch(n)
    })
  }
  return s
}
const sl = (e) => e()
function hm(e = sl) {
  const t = ge(!0)
  function s() {
    t.value = !1
  }
  function i() {
    t.value = !0
  }
  const r = (...n) => {
    t.value && e(...n)
  }
  return { isActive: Zs(t), pause: s, resume: i, eventFilter: r }
}
function mm(e) {
  return e || wo()
}
function gm(...e) {
  if (e.length !== 1) return Ql(...e)
  const t = e[0]
  return typeof t == 'function' ? Zs(Kl(() => ({ get: t, set: tl }))) : ge(t)
}
function vm(e, t, s = {}) {
  const { eventFilter: i = sl, ...r } = s
  return bt(e, pm(i, t), r)
}
function bm(e, t, s = {}) {
  const { eventFilter: i, ...r } = s,
    { eventFilter: n, pause: o, resume: a, isActive: l } = hm(i)
  return {
    stop: vm(e, t, { ...r, eventFilter: n }),
    pause: o,
    resume: a,
    isActive: l,
  }
}
function il(e, t = !0, s) {
  const i = mm(s)
  i ? xs(e, i) : t ? e() : bs(e)
}
function xm(e = !1, t = {}) {
  const { truthyValue: s = !0, falsyValue: i = !1 } = t,
    r = we(e),
    n = ge(e)
  function o(a) {
    if (arguments.length) return (n.value = a), n.value
    {
      const l = Kt(s)
      return (n.value = n.value === l ? Kt(i) : l), n.value
    }
  }
  return r ? o : [n, o]
}
function rl(e) {
  var t
  const s = Kt(e)
  return (t = s == null ? void 0 : s.$el) != null ? t : s
}
const Yt = um ? window : void 0
function En(...e) {
  let t, s, i, r
  if (
    (typeof e[0] == 'string' || Array.isArray(e[0])
      ? (([s, i, r] = e), (t = Yt))
      : ([t, s, i, r] = e),
    !t)
  )
    return tl
  Array.isArray(s) || (s = [s]), Array.isArray(i) || (i = [i])
  const n = [],
    o = () => {
      n.forEach((c) => c()), (n.length = 0)
    },
    a = (c, d, f, p) => (
      c.addEventListener(d, f, p), () => c.removeEventListener(d, f, p)
    ),
    l = bt(
      () => [rl(t), Kt(r)],
      ([c, d]) => {
        if ((o(), !c)) return
        const f = fm(d) ? { ...d } : d
        n.push(...s.flatMap((p) => i.map((g) => a(c, p, g, f))))
      },
      { immediate: !0, flush: 'post' }
    ),
    u = () => {
      l(), o()
    }
  return el(u), u
}
function wm() {
  const e = ge(!1)
  return (
    wo() &&
      xs(() => {
        e.value = !0
      }),
    e
  )
}
function ym(e) {
  const t = wm()
  return Te(() => (t.value, !!e()))
}
function _m(e, t = {}) {
  const { window: s = Yt } = t,
    i = ym(() => s && 'matchMedia' in s && typeof s.matchMedia == 'function')
  let r
  const n = ge(!1),
    o = (u) => {
      n.value = u.matches
    },
    a = () => {
      r &&
        ('removeEventListener' in r
          ? r.removeEventListener('change', o)
          : r.removeListener(o))
    },
    l = ma(() => {
      i.value &&
        (a(),
        (r = s.matchMedia(Kt(e))),
        'addEventListener' in r
          ? r.addEventListener('change', o)
          : r.addListener(o),
        (n.value = r.matches))
    })
  return (
    el(() => {
      l(), a(), (r = void 0)
    }),
    n
  )
}
const Ms =
    typeof globalThis < 'u'
      ? globalThis
      : typeof window < 'u'
      ? window
      : typeof global < 'u'
      ? global
      : typeof self < 'u'
      ? self
      : {},
  Os = '__vueuse_ssr_handlers__',
  Sm = Tm()
function Tm() {
  return Os in Ms || (Ms[Os] = Ms[Os] || {}), Ms[Os]
}
function nl(e, t) {
  return Sm[e] || t
}
function Em(e) {
  return e == null
    ? 'any'
    : e instanceof Set
    ? 'set'
    : e instanceof Map
    ? 'map'
    : e instanceof Date
    ? 'date'
    : typeof e == 'boolean'
    ? 'boolean'
    : typeof e == 'string'
    ? 'string'
    : typeof e == 'object'
    ? 'object'
    : Number.isNaN(e)
    ? 'any'
    : 'number'
}
const Pm = {
    boolean: { read: (e) => e === 'true', write: (e) => String(e) },
    object: { read: (e) => JSON.parse(e), write: (e) => JSON.stringify(e) },
    number: { read: (e) => Number.parseFloat(e), write: (e) => String(e) },
    any: { read: (e) => e, write: (e) => String(e) },
    string: { read: (e) => e, write: (e) => String(e) },
    map: {
      read: (e) => new Map(JSON.parse(e)),
      write: (e) => JSON.stringify(Array.from(e.entries())),
    },
    set: {
      read: (e) => new Set(JSON.parse(e)),
      write: (e) => JSON.stringify(Array.from(e)),
    },
    date: { read: (e) => new Date(e), write: (e) => e.toISOString() },
  },
  Pn = 'vueuse-storage'
function Cm(e, t, s, i = {}) {
  var r
  const {
      flush: n = 'pre',
      deep: o = !0,
      listenToStorageChanges: a = !0,
      writeDefaults: l = !0,
      mergeDefaults: u = !1,
      shallow: c,
      window: d = Yt,
      eventFilter: f,
      onError: p = (T) => {
        console.error(T)
      },
      initOnMounted: g,
    } = i,
    x = (c ? Un : ge)(typeof t == 'function' ? t() : t)
  if (!s)
    try {
      s = nl('getDefaultStorage', () => {
        var T
        return (T = Yt) == null ? void 0 : T.localStorage
      })()
    } catch (T) {
      p(T)
    }
  if (!s) return x
  const I = Kt(t),
    b = Em(I),
    E = (r = i.serializer) != null ? r : Pm[b],
    { pause: w, resume: y } = bm(x, () => L(x.value), {
      flush: n,
      deep: o,
      eventFilter: f,
    })
  return (
    d &&
      a &&
      il(() => {
        En(d, 'storage', k), En(d, Pn, J), g && k()
      }),
    g || k(),
    x
  )
  function L(T) {
    try {
      if (T == null) s.removeItem(e)
      else {
        const C = E.write(T),
          D = s.getItem(e)
        D !== C &&
          (s.setItem(e, C),
          d &&
            d.dispatchEvent(
              new CustomEvent(Pn, {
                detail: { key: e, oldValue: D, newValue: C, storageArea: s },
              })
            ))
      }
    } catch (C) {
      p(C)
    }
  }
  function N(T) {
    const C = T ? T.newValue : s.getItem(e)
    if (C == null) return l && I != null && s.setItem(e, E.write(I)), I
    if (!T && u) {
      const D = E.read(C)
      return typeof u == 'function'
        ? u(D, I)
        : b === 'object' && !Array.isArray(D)
        ? { ...I, ...D }
        : D
    } else return typeof C != 'string' ? C : E.read(C)
  }
  function J(T) {
    k(T.detail)
  }
  function k(T) {
    if (!(T && T.storageArea !== s)) {
      if (T && T.key == null) {
        x.value = I
        return
      }
      if (!(T && T.key !== e)) {
        w()
        try {
          ;(T == null ? void 0 : T.newValue) !== E.write(x.value) &&
            (x.value = N(T))
        } catch (C) {
          p(C)
        } finally {
          T ? bs(y) : y()
        }
      }
    }
  }
}
function ol(e) {
  return _m('(prefers-color-scheme: dark)', e)
}
function Im(e = {}) {
  const {
      selector: t = 'html',
      attribute: s = 'class',
      initialValue: i = 'auto',
      window: r = Yt,
      storage: n,
      storageKey: o = 'vueuse-color-scheme',
      listenToStorageChanges: a = !0,
      storageRef: l,
      emitAuto: u,
      disableTransition: c = !0,
    } = e,
    d = { auto: '', light: 'light', dark: 'dark', ...(e.modes || {}) },
    f = ol({ window: r }),
    p = Te(() => (f.value ? 'dark' : 'light')),
    g =
      l ||
      (o == null
        ? gm(i)
        : Cm(o, i, n, { window: r, listenToStorageChanges: a })),
    x = Te(() => (g.value === 'auto' ? p.value : g.value)),
    I = nl('updateHTMLAttrs', (y, L, N) => {
      const J =
        typeof y == 'string'
          ? r == null
            ? void 0
            : r.document.querySelector(y)
          : rl(y)
      if (!J) return
      let k
      if (c) {
        k = r.document.createElement('style')
        const T =
          '*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}'
        k.appendChild(document.createTextNode(T)),
          r.document.head.appendChild(k)
      }
      if (L === 'class') {
        const T = N.split(/\s/g)
        Object.values(d)
          .flatMap((C) => (C || '').split(/\s/g))
          .filter(Boolean)
          .forEach((C) => {
            T.includes(C) ? J.classList.add(C) : J.classList.remove(C)
          })
      } else J.setAttribute(L, N)
      c && (r.getComputedStyle(k).opacity, document.head.removeChild(k))
    })
  function b(y) {
    var L
    I(t, s, (L = d[y]) != null ? L : y)
  }
  function E(y) {
    e.onChanged ? e.onChanged(y, b) : b(y)
  }
  bt(x, E, { flush: 'post', immediate: !0 }), il(() => E(x.value))
  const w = Te({
    get() {
      return u ? g.value : x.value
    },
    set(y) {
      g.value = y
    },
  })
  try {
    return Object.assign(w, { store: g, system: p, state: x })
  } catch {
    return w
  }
}
function Mm(e = {}) {
  const { valueDark: t = 'dark', valueLight: s = '', window: i = Yt } = e,
    r = Im({
      ...e,
      onChanged: (a, l) => {
        var u
        e.onChanged
          ? (u = e.onChanged) == null || u.call(e, a === 'dark', l, a)
          : l(a)
      },
      modes: { dark: t, light: s },
    }),
    n = Te(() =>
      r.system ? r.system.value : ol({ window: i }).value ? 'dark' : 'light'
    )
  return Te({
    get() {
      return r.value === 'dark'
    },
    set(a) {
      const l = a ? 'dark' : 'light'
      n.value === l ? (r.value = 'auto') : (r.value = l)
    },
  })
}
const Om = { class: 'relative inline-block w-[35px] h-[30px]' },
  Am = {
    __name: 'DarkToggle',
    setup(e) {
      const t = Mm(),
        s = xm(t)
      return (i, r) => (
        ce(),
        ve(
          'div',
          {
            class:
              'fixed z-20 top-[150px] h-10 w-12 bg-[#67696b] right-0 rounded-l-full pl-2.5 pt-1',
            onClick: r[0] || (r[0] = (n) => Re(s)()),
          },
          [
            _('label', Om, [
              _(
                'span',
                {
                  class:
                    'transition-background-image rounded-full absolute cursor-pointer top-0 bottom-0 left-0 right-0 bg-[#4d4949] before:absolute before:h-[30px] before:w-[30px] before:left-[2.5px] before:top-0 before:bottom-0 before:my-auto before:bg-no-repeat before:bg-center ease-linear duration-400',
                  style: at({
                    '--bg-image': Re(t) ? `url(${Re(am)})` : `url(${Re(cm)})`,
                  }),
                },
                null,
                4
              ),
            ]),
          ]
        )
      )
    },
  },
  Lm = {
    components: { HeaderArea: sm, FooterArea: lm, DarkToggle: Am },
    computed: {
      is404Route() {
        return this.$route.path === '/404'
      },
    },
  }
function Rm(e, t, s, i, r, n) {
  const o = Ee('Dark-toggle'),
    a = Ee('header-area'),
    l = Ee('router-view'),
    u = Ee('footer-area')
  return (
    ce(),
    ve(
      Le,
      null,
      [
        n.is404Route ? di('', !0) : (ce(), cs(o, { key: 0 })),
        n.is404Route ? di('', !0) : (ce(), cs(a, { key: 1 })),
        Y(l),
        n.is404Route ? di('', !0) : (ce(), cs(u, { key: 2 })),
      ],
      64
    )
  )
}
const km = et(Lm, [['render', Rm]])
Ic(km).use(ah).mount('#app')
export {
  af as A,
  bt as B,
  we as C,
  Js as D,
  Rp as E,
  Le as F,
  ar as G,
  Te as H,
  jt as I,
  Vt as J,
  ot as K,
  Ft as L,
  Re as M,
  bs as N,
  Ef as P,
  of as S,
  et as _,
  lf as a,
  _ as b,
  ve as c,
  Y as d,
  Up as e,
  Bf as f,
  Np as g,
  Fe as h,
  cs as i,
  es as j,
  ao as k,
  Ec as l,
  $e as m,
  at as n,
  ce as o,
  zm as p,
  $m as q,
  Ee as r,
  Ae as s,
  Rs as t,
  ss as u,
  Dm as v,
  he as w,
  wo as x,
  ge as y,
  wa as z,
}
