;(function () {
  const t = document.createElement('link').relList
  if (t && t.supports && t.supports('modulepreload')) return
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r)
  new MutationObserver((r) => {
    for (const n of r)
      if (n.type === 'childList')
        for (const o of n.addedNodes)
          o.tagName === 'LINK' && o.rel === 'modulepreload' && s(o)
  }).observe(document, { childList: !0, subtree: !0 })
  function i(r) {
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
  function s(r) {
    if (r.ep) return
    r.ep = !0
    const n = i(r)
    fetch(r.href, n)
  }
})()
const ll = 'modulepreload',
  al = function (e) {
    return '/' + e
  },
  yr = {},
  tt = function (t, i, s) {
    if (!i || i.length === 0) return t()
    const r = document.getElementsByTagName('link')
    return Promise.all(
      i.map((n) => {
        if (((n = al(n)), n in yr)) return
        yr[n] = !0
        const o = n.endsWith('.css'),
          a = o ? '[rel="stylesheet"]' : ''
        if (!!s)
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
function Ws(e, t) {
  const i = Object.create(null),
    s = e.split(',')
  for (let r = 0; r < s.length; r++) i[s[r]] = !0
  return t ? (r) => !!i[r.toLowerCase()] : (r) => !!i[r]
}
const ue = {},
  Dt = [],
  We = () => {},
  cl = () => !1,
  ul = /^on[^a-z]/,
  Wi = (e) => ul.test(e),
  Us = (e) => e.startsWith('onUpdate:'),
  Pe = Object.assign,
  Ks = (e, t) => {
    const i = e.indexOf(t)
    i > -1 && e.splice(i, 1)
  },
  dl = Object.prototype.hasOwnProperty,
  ee = (e, t) => dl.call(e, t),
  U = Array.isArray,
  Bt = (e) => Ki(e) === '[object Map]',
  Cn = (e) => Ki(e) === '[object Set]',
  Q = (e) => typeof e == 'function',
  ye = (e) => typeof e == 'string',
  Ui = (e) => typeof e == 'symbol',
  de = (e) => e !== null && typeof e == 'object',
  In = (e) => (de(e) || Q(e)) && Q(e.then) && Q(e.catch),
  Mn = Object.prototype.toString,
  Ki = (e) => Mn.call(e),
  fl = (e) => Ki(e).slice(8, -1),
  On = (e) => Ki(e) === '[object Object]',
  Ys = (e) =>
    ye(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  Ai = Ws(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
  ),
  Yi = (e) => {
    const t = Object.create(null)
    return (i) => t[i] || (t[i] = e(i))
  },
  pl = /-(\w)/g,
  Ze = Yi((e) => e.replace(pl, (t, i) => (i ? i.toUpperCase() : ''))),
  hl = /\B([A-Z])/g,
  Xt = Yi((e) => e.replace(hl, '-$1').toLowerCase()),
  Xi = Yi((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  as = Yi((e) => (e ? `on${Xi(e)}` : '')),
  It = (e, t) => !Object.is(e, t),
  Li = (e, t) => {
    for (let i = 0; i < e.length; i++) e[i](t)
  },
  Bi = (e, t, i) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: i })
  },
  Ps = (e) => {
    const t = parseFloat(e)
    return isNaN(t) ? e : t
  }
let _r
const Cs = () =>
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
function ct(e) {
  if (U(e)) {
    const t = {}
    for (let i = 0; i < e.length; i++) {
      const s = e[i],
        r = ye(s) ? bl(s) : ct(s)
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
      .forEach((i) => {
        if (i) {
          const s = i.split(gl)
          s.length > 1 && (t[s[0].trim()] = s[1].trim())
        }
      }),
    t
  )
}
function Ae(e) {
  let t = ''
  if (ye(e)) t = e
  else if (U(e))
    for (let i = 0; i < e.length; i++) {
      const s = Ae(e[i])
      s && (t += s + ' ')
    }
  else if (de(e)) for (const i in e) e[i] && (t += i + ' ')
  return t.trim()
}
const xl =
    'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  wl = Ws(xl)
function An(e) {
  return !!e || e === ''
}
const Ri = (e) =>
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
            (i, [s, r]) => ((i[`${s} =>`] = r), i),
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
      const i = De
      try {
        return (De = this), t()
      } finally {
        De = i
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
      let i, s
      for (i = 0, s = this.effects.length; i < s; i++) this.effects[i].stop()
      for (i = 0, s = this.cleanups.length; i < s; i++) this.cleanups[i]()
      if (this.scopes)
        for (i = 0, s = this.scopes.length; i < s; i++) this.scopes[i].stop(!0)
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
const Xs = (e) => {
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
      let i = 0
      for (let s = 0; s < t.length; s++) {
        const r = t[s]
        kn(r) && !zn(r) ? r.delete(e) : (t[i++] = r), (r.w &= ~xt), (r.n &= ~xt)
      }
      t.length = i
    }
  },
  ji = new WeakMap()
let ni = 0,
  xt = 1
const Is = 30
let qe
const Et = Symbol(''),
  Ms = Symbol('')
class Qs {
  constructor(t, i = null, s) {
    ;(this.fn = t),
      (this.scheduler = i),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      _l(this, s)
  }
  run() {
    if (!this.active) return this.fn()
    let t = qe,
      i = gt
    for (; t; ) {
      if (t === this) return
      t = t.parent
    }
    try {
      return (
        (this.parent = qe),
        (qe = this),
        (gt = !0),
        (xt = 1 << ++ni),
        ni <= Is ? Tl(this) : Sr(this),
        this.fn()
      )
    } finally {
      ni <= Is && El(this),
        (xt = 1 << --ni),
        (qe = this.parent),
        (gt = i),
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
    for (let i = 0; i < t.length; i++) t[i].delete(e)
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
function ke(e, t, i) {
  if (gt && qe) {
    let s = ji.get(e)
    s || ji.set(e, (s = new Map()))
    let r = s.get(i)
    r || s.set(i, (r = Xs())), Dn(r)
  }
}
function Dn(e, t) {
  let i = !1
  ni <= Is ? zn(e) || ((e.n |= xt), (i = !kn(e))) : (i = !e.has(qe)),
    i && (e.add(qe), qe.deps.push(e))
}
function ot(e, t, i, s, r, n) {
  const o = ji.get(e)
  if (!o) return
  let a = []
  if (t === 'clear') a = [...o.values()]
  else if (i === 'length' && U(e)) {
    const l = Number(s)
    o.forEach((u, c) => {
      ;(c === 'length' || (!Ui(c) && c >= l)) && a.push(u)
    })
  } else
    switch ((i !== void 0 && a.push(o.get(i)), t)) {
      case 'add':
        U(e)
          ? Ys(i) && a.push(o.get('length'))
          : (a.push(o.get(Et)), Bt(e) && a.push(o.get(Ms)))
        break
      case 'delete':
        U(e) || (a.push(o.get(Et)), Bt(e) && a.push(o.get(Ms)))
        break
      case 'set':
        Bt(e) && a.push(o.get(Et))
        break
    }
  if (a.length === 1) a[0] && Os(a[0])
  else {
    const l = []
    for (const u of a) u && l.push(...u)
    Os(Xs(l))
  }
}
function Os(e, t) {
  const i = U(e) ? e : [...e]
  for (const s of i) s.computed && Tr(s)
  for (const s of i) s.computed || Tr(s)
}
function Tr(e, t) {
  ;(e !== qe || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}
function Pl(e, t) {
  var i
  return (i = ji.get(e)) == null ? void 0 : i.get(t)
}
const Cl = Ws('__proto__,__v_isRef,__isVue'),
  Bn = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== 'arguments' && e !== 'caller')
      .map((e) => Symbol[e])
      .filter(Ui)
  ),
  Er = Il()
function Il() {
  const e = {}
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach((t) => {
      e[t] = function (...i) {
        const s = te(this)
        for (let n = 0, o = this.length; n < o; n++) ke(s, 'get', n + '')
        const r = s[t](...i)
        return r === -1 || r === !1 ? s[t](...i.map(te)) : r
      }
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((t) => {
      e[t] = function (...i) {
        Qt()
        const s = te(this)[t].apply(this, i)
        return Jt(), s
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
  constructor(t = !1, i = !1) {
    ;(this._isReadonly = t), (this._shallow = i)
  }
  get(t, i, s) {
    const r = this._isReadonly,
      n = this._shallow
    if (i === '__v_isReactive') return !r
    if (i === '__v_isReadonly') return r
    if (i === '__v_isShallow') return n
    if (i === '__v_raw' && s === (r ? (n ? Hl : Vn) : n ? Hn : Fn).get(t))
      return t
    const o = U(t)
    if (!r) {
      if (o && ee(Er, i)) return Reflect.get(Er, i, s)
      if (i === 'hasOwnProperty') return Ml
    }
    const a = Reflect.get(t, i, s)
    return (Ui(i) ? Bn.has(i) : Cl(i)) || (r || ke(t, 'get', i), n)
      ? a
      : we(a)
      ? o && Ys(i)
        ? a
        : a.value
      : de(a)
      ? r
        ? Zi(a)
        : Ji(a)
      : a
  }
}
class Nn extends jn {
  constructor(t = !1) {
    super(!1, t)
  }
  set(t, i, s, r) {
    let n = t[i]
    if (Vt(n) && we(n) && !we(s)) return !1
    if (
      !this._shallow &&
      (!Ni(s) && !Vt(s) && ((n = te(n)), (s = te(s))), !U(t) && we(n) && !we(s))
    )
      return (n.value = s), !0
    const o = U(t) && Ys(i) ? Number(i) < t.length : ee(t, i),
      a = Reflect.set(t, i, s, r)
    return (
      t === te(r) && (o ? It(s, n) && ot(t, 'set', i, s) : ot(t, 'add', i, s)),
      a
    )
  }
  deleteProperty(t, i) {
    const s = ee(t, i)
    t[i]
    const r = Reflect.deleteProperty(t, i)
    return r && s && ot(t, 'delete', i, void 0), r
  }
  has(t, i) {
    const s = Reflect.has(t, i)
    return (!Ui(i) || !Bn.has(i)) && ke(t, 'has', i), s
  }
  ownKeys(t) {
    return ke(t, 'iterate', U(t) ? 'length' : Et), Reflect.ownKeys(t)
  }
}
class Ol extends jn {
  constructor(t = !1) {
    super(!0, t)
  }
  set(t, i) {
    return !0
  }
  deleteProperty(t, i) {
    return !0
  }
}
const Al = new Nn(),
  Ll = new Ol(),
  Rl = new Nn(!0),
  Js = (e) => e,
  Qi = (e) => Reflect.getPrototypeOf(e)
function yi(e, t, i = !1, s = !1) {
  e = e.__v_raw
  const r = te(e),
    n = te(t)
  i || (It(t, n) && ke(r, 'get', t), ke(r, 'get', n))
  const { has: o } = Qi(r),
    a = s ? Js : i ? tr : fi
  if (o.call(r, t)) return a(e.get(t))
  if (o.call(r, n)) return a(e.get(n))
  e !== r && e.get(t)
}
function _i(e, t = !1) {
  const i = this.__v_raw,
    s = te(i),
    r = te(e)
  return (
    t || (It(e, r) && ke(s, 'has', e), ke(s, 'has', r)),
    e === r ? i.has(e) : i.has(e) || i.has(r)
  )
}
function Si(e, t = !1) {
  return (
    (e = e.__v_raw), !t && ke(te(e), 'iterate', Et), Reflect.get(e, 'size', e)
  )
}
function Pr(e) {
  e = te(e)
  const t = te(this)
  return Qi(t).has.call(t, e) || (t.add(e), ot(t, 'add', e, e)), this
}
function Cr(e, t) {
  t = te(t)
  const i = te(this),
    { has: s, get: r } = Qi(i)
  let n = s.call(i, e)
  n || ((e = te(e)), (n = s.call(i, e)))
  const o = r.call(i, e)
  return (
    i.set(e, t), n ? It(t, o) && ot(i, 'set', e, t) : ot(i, 'add', e, t), this
  )
}
function Ir(e) {
  const t = te(this),
    { has: i, get: s } = Qi(t)
  let r = i.call(t, e)
  r || ((e = te(e)), (r = i.call(t, e))), s && s.call(t, e)
  const n = t.delete(e)
  return r && ot(t, 'delete', e, void 0), n
}
function Mr() {
  const e = te(this),
    t = e.size !== 0,
    i = e.clear()
  return t && ot(e, 'clear', void 0, void 0), i
}
function Ti(e, t) {
  return function (s, r) {
    const n = this,
      o = n.__v_raw,
      a = te(o),
      l = t ? Js : e ? tr : fi
    return (
      !e && ke(a, 'iterate', Et), o.forEach((u, c) => s.call(r, l(u), l(c), n))
    )
  }
}
function Ei(e, t, i) {
  return function (...s) {
    const r = this.__v_raw,
      n = te(r),
      o = Bt(n),
      a = e === 'entries' || (e === Symbol.iterator && o),
      l = e === 'keys' && o,
      u = r[e](...s),
      c = i ? Js : t ? tr : fi
    return (
      !t && ke(n, 'iterate', l ? Ms : Et),
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
        return yi(this, n)
      },
      get size() {
        return Si(this)
      },
      has: _i,
      add: Pr,
      set: Cr,
      delete: Ir,
      clear: Mr,
      forEach: Ti(!1, !1),
    },
    t = {
      get(n) {
        return yi(this, n, !1, !0)
      },
      get size() {
        return Si(this)
      },
      has: _i,
      add: Pr,
      set: Cr,
      delete: Ir,
      clear: Mr,
      forEach: Ti(!1, !0),
    },
    i = {
      get(n) {
        return yi(this, n, !0)
      },
      get size() {
        return Si(this, !0)
      },
      has(n) {
        return _i.call(this, n, !0)
      },
      add: dt('add'),
      set: dt('set'),
      delete: dt('delete'),
      clear: dt('clear'),
      forEach: Ti(!0, !1),
    },
    s = {
      get(n) {
        return yi(this, n, !0, !0)
      },
      get size() {
        return Si(this, !0)
      },
      has(n) {
        return _i.call(this, n, !0)
      },
      add: dt('add'),
      set: dt('set'),
      delete: dt('delete'),
      clear: dt('clear'),
      forEach: Ti(!0, !0),
    }
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach((n) => {
      ;(e[n] = Ei(n, !1, !1)),
        (i[n] = Ei(n, !0, !1)),
        (t[n] = Ei(n, !1, !0)),
        (s[n] = Ei(n, !0, !0))
    }),
    [e, i, t, s]
  )
}
const [zl, $l, Dl, Bl] = kl()
function Zs(e, t) {
  const i = t ? (e ? Bl : Dl) : e ? $l : zl
  return (s, r, n) =>
    r === '__v_isReactive'
      ? !e
      : r === '__v_isReadonly'
      ? e
      : r === '__v_raw'
      ? s
      : Reflect.get(ee(i, r) && r in s ? i : s, r, n)
}
const jl = { get: Zs(!1, !1) },
  Nl = { get: Zs(!1, !0) },
  Fl = { get: Zs(!0, !1) },
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
function Ji(e) {
  return Vt(e) ? e : er(e, !1, Al, jl, Fn)
}
function qn(e) {
  return er(e, !1, Rl, Nl, Hn)
}
function Zi(e) {
  return er(e, !0, Ll, Fl, Vn)
}
function er(e, t, i, s, r) {
  if (!de(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e
  const n = r.get(e)
  if (n) return n
  const o = ql(e)
  if (o === 0) return e
  const a = new Proxy(e, o === 2 ? s : i)
  return r.set(e, a), a
}
function jt(e) {
  return Vt(e) ? jt(e.__v_raw) : !!(e && e.__v_isReactive)
}
function Vt(e) {
  return !!(e && e.__v_isReadonly)
}
function Ni(e) {
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
  return Bi(e, '__v_skip', !0), e
}
const fi = (e) => (de(e) ? Ji(e) : e),
  tr = (e) => (de(e) ? Zi(e) : e)
function ir(e) {
  gt && qe && ((e = te(e)), Dn(e.dep || (e.dep = Xs())))
}
function sr(e, t) {
  e = te(e)
  const i = e.dep
  i && Os(i)
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
  constructor(t, i) {
    ;(this.__v_isShallow = i),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = i ? t : te(t)),
      (this._value = i ? t : fi(t))
  }
  get value() {
    return ir(this), this._value
  }
  set value(t) {
    const i = this.__v_isShallow || Ni(t) || Vt(t)
    ;(t = i ? t : te(t)),
      It(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = i ? t : fi(t)), sr(this))
  }
}
function Re(e) {
  return we(e) ? e.value : e
}
const Wl = {
  get: (e, t, i) => Re(Reflect.get(e, t, i)),
  set: (e, t, i, s) => {
    const r = e[t]
    return we(r) && !we(i) ? ((r.value = i), !0) : Reflect.set(e, t, i, s)
  },
}
function Yn(e) {
  return jt(e) ? e : new Proxy(e, Wl)
}
class Ul {
  constructor(t) {
    ;(this.dep = void 0), (this.__v_isRef = !0)
    const { get: i, set: s } = t(
      () => ir(this),
      () => sr(this)
    )
    ;(this._get = i), (this._set = s)
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
  constructor(t, i, s) {
    ;(this._object = t),
      (this._key = i),
      (this._defaultValue = s),
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
function Ql(e, t, i) {
  return we(e)
    ? e
    : Q(e)
    ? new Xl(e)
    : de(e) && arguments.length > 1
    ? Jl(e, t, i)
    : ge(e)
}
function Jl(e, t, i) {
  const s = e[t]
  return we(s) ? s : new Yl(e, t, i)
}
class Zl {
  constructor(t, i, s, r) {
    ;(this._setter = i),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new Qs(t, () => {
        this._dirty || ((this._dirty = !0), sr(this))
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !r),
      (this.__v_isReadonly = s)
  }
  get value() {
    const t = te(this)
    return (
      ir(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    )
  }
  set value(t) {
    this._setter(t)
  }
}
function ea(e, t, i = !1) {
  let s, r
  const n = Q(e)
  return (
    n ? ((s = e), (r = We)) : ((s = e.get), (r = e.set)),
    new Zl(s, r, n || !r, i)
  )
}
function vt(e, t, i, s) {
  let r
  try {
    r = s ? e(...s) : e()
  } catch (n) {
    es(n, t, i)
  }
  return r
}
function Ue(e, t, i, s) {
  if (Q(e)) {
    const n = vt(e, t, i, s)
    return (
      n &&
        In(n) &&
        n.catch((o) => {
          es(o, t, i)
        }),
      n
    )
  }
  const r = []
  for (let n = 0; n < e.length; n++) r.push(Ue(e[n], t, i, s))
  return r
}
function es(e, t, i, s = !0) {
  const r = t ? t.vnode : null
  if (t) {
    let n = t.parent
    const o = t.proxy,
      a = i
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
  ta(e, i, r, s)
}
function ta(e, t, i, s = !0) {
  console.error(e)
}
let pi = !1,
  As = !1
const Ie = []
let Je = 0
const Nt = []
let rt = null,
  _t = 0
const Xn = Promise.resolve()
let rr = null
function bi(e) {
  const t = rr || Xn
  return e ? t.then(this ? e.bind(this) : e) : t
}
function ia(e) {
  let t = Je + 1,
    i = Ie.length
  for (; t < i; ) {
    const s = (t + i) >>> 1,
      r = Ie[s],
      n = hi(r)
    n < e || (n === e && r.pre) ? (t = s + 1) : (i = s)
  }
  return t
}
function nr(e) {
  ;(!Ie.length || !Ie.includes(e, pi && e.allowRecurse ? Je + 1 : Je)) &&
    (e.id == null ? Ie.push(e) : Ie.splice(ia(e.id), 0, e), Qn())
}
function Qn() {
  !pi && !As && ((As = !0), (rr = Xn.then(Zn)))
}
function sa(e) {
  const t = Ie.indexOf(e)
  t > Je && Ie.splice(t, 1)
}
function ra(e) {
  U(e)
    ? Nt.push(...e)
    : (!rt || !rt.includes(e, e.allowRecurse ? _t + 1 : _t)) && Nt.push(e),
    Qn()
}
function Or(e, t = pi ? Je + 1 : 0) {
  for (; t < Ie.length; t++) {
    const i = Ie[t]
    i && i.pre && (Ie.splice(t, 1), t--, i())
  }
}
function Jn(e) {
  if (Nt.length) {
    const t = [...new Set(Nt)]
    if (((Nt.length = 0), rt)) {
      rt.push(...t)
      return
    }
    for (rt = t, rt.sort((i, s) => hi(i) - hi(s)), _t = 0; _t < rt.length; _t++)
      rt[_t]()
    ;(rt = null), (_t = 0)
  }
}
const hi = (e) => (e.id == null ? 1 / 0 : e.id),
  na = (e, t) => {
    const i = hi(e) - hi(t)
    if (i === 0) {
      if (e.pre && !t.pre) return -1
      if (t.pre && !e.pre) return 1
    }
    return i
  }
function Zn(e) {
  ;(As = !1), (pi = !0), Ie.sort(na)
  const t = We
  try {
    for (Je = 0; Je < Ie.length; Je++) {
      const i = Ie[Je]
      i && i.active !== !1 && vt(i, null, 14)
    }
  } finally {
    ;(Je = 0),
      (Ie.length = 0),
      Jn(),
      (pi = !1),
      (rr = null),
      (Ie.length || Nt.length) && Zn()
  }
}
function oa(e, t, ...i) {
  if (e.isUnmounted) return
  const s = e.vnode.props || ue
  let r = i
  const n = t.startsWith('update:'),
    o = n && t.slice(7)
  if (o && o in s) {
    const c = `${o === 'modelValue' ? 'model' : o}Modifiers`,
      { number: d, trim: f } = s[c] || ue
    f && (r = i.map((p) => (ye(p) ? p.trim() : p))), d && (r = i.map(Ps))
  }
  let a,
    l = s[(a = as(t))] || s[(a = as(Ze(t)))]
  !l && n && (l = s[(a = as(Xt(t)))]), l && Ue(l, e, 6, r)
  const u = s[a + 'Once']
  if (u) {
    if (!e.emitted) e.emitted = {}
    else if (e.emitted[a]) return
    ;(e.emitted[a] = !0), Ue(u, e, 6, r)
  }
}
function eo(e, t, i = !1) {
  const s = t.emitsCache,
    r = s.get(e)
  if (r !== void 0) return r
  const n = e.emits
  let o = {},
    a = !1
  if (!Q(e)) {
    const l = (u) => {
      const c = eo(u, t, !0)
      c && ((a = !0), Pe(o, c))
    }
    !i && t.mixins.length && t.mixins.forEach(l),
      e.extends && l(e.extends),
      e.mixins && e.mixins.forEach(l)
  }
  return !n && !a
    ? (de(e) && s.set(e, null), null)
    : (U(n) ? n.forEach((l) => (o[l] = null)) : Pe(o, n),
      de(e) && s.set(e, o),
      o)
}
function ts(e, t) {
  return !e || !Wi(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, '')),
      ee(e, t[0].toLowerCase() + t.slice(1)) || ee(e, Xt(t)) || ee(e, t))
}
let Ne = null,
  is = null
function Fi(e) {
  const t = Ne
  return (Ne = e), (is = (e && e.type.__scopeId) || null), t
}
function zm(e) {
  is = e
}
function $m() {
  is = null
}
function he(e, t = Ne, i) {
  if (!t || e._n) return e
  const s = (...r) => {
    s._d && Fr(-1)
    const n = Fi(t)
    let o
    try {
      o = e(...r)
    } finally {
      Fi(n), s._d && Fr(1)
    }
    return o
  }
  return (s._n = !0), (s._c = !0), (s._d = !0), s
}
function cs(e) {
  const {
    type: t,
    vnode: i,
    proxy: s,
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
  const E = Fi(e)
  try {
    if (i.shapeFlag & 4) {
      const y = r || s,
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
    ;(ai.length = 0), es(y, e, 1), (I = Y(Mt))
  }
  let w = I
  if (b && x !== !1) {
    const y = Object.keys(b),
      { shapeFlag: L } = w
    y.length && L & 7 && (o && y.some(Us) && (b = aa(b, o)), (w = qt(w, b)))
  }
  return (
    i.dirs && ((w = qt(w)), (w.dirs = w.dirs ? w.dirs.concat(i.dirs) : i.dirs)),
    i.transition && (w.transition = i.transition),
    (I = w),
    Fi(E),
    I
  )
}
const la = (e) => {
    let t
    for (const i in e)
      (i === 'class' || i === 'style' || Wi(i)) && ((t || (t = {}))[i] = e[i])
    return t
  },
  aa = (e, t) => {
    const i = {}
    for (const s in e) (!Us(s) || !(s.slice(9) in t)) && (i[s] = e[s])
    return i
  }
function ca(e, t, i) {
  const { props: s, children: r, component: n } = e,
    { props: o, children: a, patchFlag: l } = t,
    u = n.emitsOptions
  if (t.dirs || t.transition) return !0
  if (i && l >= 0) {
    if (l & 1024) return !0
    if (l & 16) return s ? Ar(s, o, u) : !!o
    if (l & 8) {
      const c = t.dynamicProps
      for (let d = 0; d < c.length; d++) {
        const f = c[d]
        if (o[f] !== s[f] && !ts(u, f)) return !0
      }
    }
  } else
    return (r || a) && (!a || !a.$stable)
      ? !0
      : s === o
      ? !1
      : s
      ? o
        ? Ar(s, o, u)
        : !0
      : !!o
  return !1
}
function Ar(e, t, i) {
  const s = Object.keys(t)
  if (s.length !== Object.keys(e).length) return !0
  for (let r = 0; r < s.length; r++) {
    const n = s[r]
    if (t[n] !== e[n] && !ts(i, n)) return !0
  }
  return !1
}
function ua({ vnode: e, parent: t }, i) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = i), (t = t.parent)
}
const to = 'components'
function Ee(e, t) {
  return fa(to, e, !0, t) || e
}
const da = Symbol.for('v-ndc')
function fa(e, t, i = !0, s = !1) {
  const r = Ne || Se
  if (r) {
    const n = r.type
    if (e === to) {
      const a = ec(n, !1)
      if (a && (a === t || a === Ze(t) || a === Xi(Ze(t)))) return n
    }
    const o = Lr(r[e] || n[e], t) || Lr(r.appContext[e], t)
    return !o && s ? n : o
  }
}
function Lr(e, t) {
  return e && (e[t] || e[Ze(t)] || e[Xi(Ze(t))])
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
const Pi = {}
function bt(e, t, i) {
  return or(e, t, i)
}
function or(
  e,
  t,
  { immediate: i, deep: s, flush: r, onTrack: n, onTrigger: o } = ue
) {
  var a
  const l = Rn() === ((a = Se) == null ? void 0 : a.scope) ? Se : null
  let u,
    c = !1,
    d = !1
  if (
    (we(e)
      ? ((u = () => e.value), (c = Ni(e)))
      : jt(e)
      ? ((u = () => e), (s = !0))
      : U(e)
      ? ((d = !0),
        (c = e.some((y) => jt(y) || Ni(y))),
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
    t && s)
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
  if (gi)
    if (
      ((p = We),
      t ? i && Ue(t, l, 3, [u(), d ? [] : void 0, p]) : u(),
      r === 'sync')
    ) {
      const y = sc()
      g = y.__watcherHandles || (y.__watcherHandles = [])
    } else return We
  let x = d ? new Array(e.length).fill(Pi) : Pi
  const I = () => {
    if (E.active)
      if (t) {
        const y = E.run()
        ;(s || c || (d ? y.some((L, N) => It(L, x[N])) : It(y, x))) &&
          (f && f(),
          Ue(t, l, 3, [y, x === Pi ? void 0 : d && x[0] === Pi ? [] : x, p]),
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
  const E = new Qs(u, b)
  t
    ? i
      ? I()
      : (x = E.run())
    : r === 'post'
    ? Oe(E.run.bind(E), l && l.suspense)
    : E.run()
  const w = () => {
    E.stop(), l && l.scope && Ks(l.scope.effects, E)
  }
  return g && g.push(w), w
}
function ga(e, t, i) {
  const s = this.proxy,
    r = ye(e) ? (e.includes('.') ? io(s, e) : () => s[e]) : e.bind(s, s)
  let n
  Q(t) ? (n = t) : ((n = t.handler), (i = t))
  const o = Se
  Gt(this)
  const a = or(r, n.bind(s), i)
  return o ? Gt(o) : Pt(), a
}
function io(e, t) {
  const i = t.split('.')
  return () => {
    let s = e
    for (let r = 0; r < i.length && s; r++) s = s[i[r]]
    return s
  }
}
function Tt(e, t) {
  if (!de(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e
  if ((t.add(e), we(e))) Tt(e.value, t)
  else if (U(e)) for (let i = 0; i < e.length; i++) Tt(e[i], t)
  else if (Cn(e) || Bt(e))
    e.forEach((i) => {
      Tt(i, t)
    })
  else if (On(e)) for (const i in e) Tt(e[i], t)
  return e
}
function ei(e, t) {
  const i = Ne
  if (i === null) return e
  const s = os(i) || i.proxy,
    r = e.dirs || (e.dirs = [])
  for (let n = 0; n < t.length; n++) {
    let [o, a, l, u = ue] = t[n]
    o &&
      (Q(o) && (o = { mounted: o, updated: o }),
      o.deep && Tt(a),
      r.push({
        dir: o,
        instance: s,
        value: a,
        oldValue: void 0,
        arg: l,
        modifiers: u,
      }))
  }
  return e
}
function wt(e, t, i, s) {
  const r = e.dirs,
    n = t && t.dirs
  for (let o = 0; o < r.length; o++) {
    const a = r[o]
    n && (a.oldValue = n[o].value)
    let l = a.dir[s]
    l && (Qt(), Ue(l, i, 8, [e.el, a, e, t]), Jt())
  }
}
/*! #__NO_SIDE_EFFECTS__ */ function so(e, t) {
  return Q(e) ? (() => Pe({ name: e.name }, t, { setup: e }))() : e
}
const ki = (e) => !!e.type.__asyncLoader,
  ro = (e) => e.type.__isKeepAlive
function va(e, t) {
  no(e, 'a', t)
}
function ba(e, t) {
  no(e, 'da', t)
}
function no(e, t, i = Se) {
  const s =
    e.__wdc ||
    (e.__wdc = () => {
      let r = i
      for (; r; ) {
        if (r.isDeactivated) return
        r = r.parent
      }
      return e()
    })
  if ((ss(t, s, i), i)) {
    let r = i.parent
    for (; r && r.parent; ) ro(r.parent.vnode) && xa(s, t, i, r), (r = r.parent)
  }
}
function xa(e, t, i, s) {
  const r = ss(t, e, s, !0)
  lo(() => {
    Ks(s[t], r)
  }, i)
}
function ss(e, t, i = Se, s = !1) {
  if (i) {
    const r = i[e] || (i[e] = []),
      n =
        t.__weh ||
        (t.__weh = (...o) => {
          if (i.isUnmounted) return
          Qt(), Gt(i)
          const a = Ue(t, i, e, o)
          return Pt(), Jt(), a
        })
    return s ? r.unshift(n) : r.push(n), n
  }
}
const ut =
    (e) =>
    (t, i = Se) =>
      (!gi || e === 'sp') && ss(e, (...s) => t(...s), i),
  wa = ut('bm'),
  xi = ut('m'),
  oo = ut('bu'),
  lr = ut('u'),
  ar = ut('bum'),
  lo = ut('um'),
  ya = ut('sp'),
  _a = ut('rtg'),
  Sa = ut('rtc')
function Ta(e, t = Se) {
  ss('ec', e, t)
}
function ao(e, t, i, s) {
  let r
  const n = i && i[s]
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
  return i && (i[s] = r), r
}
const Ls = (e) => (e ? (yo(e) ? os(e) || e.proxy : Ls(e.parent)) : null),
  li = Pe(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Ls(e.parent),
    $root: (e) => Ls(e.root),
    $emit: (e) => e.emit,
    $options: (e) => cr(e),
    $forceUpdate: (e) => e.f || (e.f = () => nr(e.update)),
    $nextTick: (e) => e.n || (e.n = bi.bind(e.proxy)),
    $watch: (e) => ga.bind(e),
  }),
  us = (e, t) => e !== ue && !e.__isScriptSetup && ee(e, t),
  Ea = {
    get({ _: e }, t) {
      const {
        ctx: i,
        setupState: s,
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
              return s[t]
            case 2:
              return r[t]
            case 4:
              return i[t]
            case 3:
              return n[t]
          }
        else {
          if (us(s, t)) return (o[t] = 1), s[t]
          if (r !== ue && ee(r, t)) return (o[t] = 2), r[t]
          if ((u = e.propsOptions[0]) && ee(u, t)) return (o[t] = 3), n[t]
          if (i !== ue && ee(i, t)) return (o[t] = 4), i[t]
          Rs && (o[t] = 0)
        }
      }
      const c = li[t]
      let d, f
      if (c) return t === '$attrs' && ke(e, 'get', t), c(e)
      if ((d = a.__cssModules) && (d = d[t])) return d
      if (i !== ue && ee(i, t)) return (o[t] = 4), i[t]
      if (((f = l.config.globalProperties), ee(f, t))) return f[t]
    },
    set({ _: e }, t, i) {
      const { data: s, setupState: r, ctx: n } = e
      return us(r, t)
        ? ((r[t] = i), !0)
        : s !== ue && ee(s, t)
        ? ((s[t] = i), !0)
        : ee(e.props, t) || (t[0] === '$' && t.slice(1) in e)
        ? !1
        : ((n[t] = i), !0)
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: i,
          ctx: s,
          appContext: r,
          propsOptions: n,
        },
      },
      o
    ) {
      let a
      return (
        !!i[o] ||
        (e !== ue && ee(e, o)) ||
        us(t, o) ||
        ((a = n[0]) && ee(a, o)) ||
        ee(s, o) ||
        ee(li, o) ||
        ee(r.config.globalProperties, o)
      )
    },
    defineProperty(e, t, i) {
      return (
        i.get != null
          ? (e._.accessCache[t] = 0)
          : ee(i, 'value') && this.set(e, t, i.value, null),
        Reflect.defineProperty(e, t, i)
      )
    },
  }
function Rr(e) {
  return U(e) ? e.reduce((t, i) => ((t[i] = null), t), {}) : e
}
let Rs = !0
function Pa(e) {
  const t = cr(e),
    i = e.proxy,
    s = e.ctx
  ;(Rs = !1), t.beforeCreate && kr(t.beforeCreate, e, 'bc')
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
  if ((u && Ca(u, s, null), o))
    for (const ie in o) {
      const F = o[ie]
      Q(F) && (s[ie] = F.bind(i))
    }
  if (r) {
    const ie = r.call(i, i)
    de(ie) && (e.data = Ji(ie))
  }
  if (((Rs = !0), n))
    for (const ie in n) {
      const F = n[ie],
        me = Q(F) ? F.bind(i, i) : Q(F.get) ? F.get.bind(i, i) : We,
        fe = !Q(F) && Q(F.set) ? F.set.bind(i) : We,
        _e = Te({ get: me, set: fe })
      Object.defineProperty(s, ie, {
        enumerable: !0,
        configurable: !0,
        get: () => _e.value,
        set: (xe) => (_e.value = xe),
      })
    }
  if (a) for (const ie in a) co(a[ie], s, i, ie)
  if (l) {
    const ie = Q(l) ? l.call(i) : l
    Reflect.ownKeys(ie).forEach((F) => {
      Ft(F, ie[F])
    })
  }
  c && kr(c, e, 'c')
  function re(ie, F) {
    U(F) ? F.forEach((me) => ie(me.bind(i))) : F && ie(F.bind(i))
  }
  if (
    (re(wa, d),
    re(xi, f),
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
      const ie = e.exposed || (e.exposed = {})
      C.forEach((F) => {
        Object.defineProperty(ie, F, {
          get: () => i[F],
          set: (me) => (i[F] = me),
        })
      })
    } else e.exposed || (e.exposed = {})
  L && e.render === We && (e.render = L),
    D != null && (e.inheritAttrs = D),
    K && (e.components = K),
    V && (e.directives = V)
}
function Ca(e, t, i = We) {
  U(e) && (e = ks(e))
  for (const s in e) {
    const r = e[s]
    let n
    de(r)
      ? 'default' in r
        ? (n = lt(r.from || s, r.default, !0))
        : (n = lt(r.from || s))
      : (n = lt(r)),
      we(n)
        ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => n.value,
            set: (o) => (n.value = o),
          })
        : (t[s] = n)
  }
}
function kr(e, t, i) {
  Ue(U(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, i)
}
function co(e, t, i, s) {
  const r = s.includes('.') ? io(i, s) : () => i[s]
  if (ye(e)) {
    const n = t[e]
    Q(n) && bt(r, n)
  } else if (Q(e)) bt(r, e.bind(i))
  else if (de(e))
    if (U(e)) e.forEach((n) => co(n, t, i, s))
    else {
      const n = Q(e.handler) ? e.handler.bind(i) : t[e.handler]
      Q(n) && bt(r, n, e)
    }
}
function cr(e) {
  const t = e.type,
    { mixins: i, extends: s } = t,
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
      : !r.length && !i && !s
      ? (l = t)
      : ((l = {}), r.length && r.forEach((u) => Hi(l, u, o, !0)), Hi(l, t, o)),
    de(t) && n.set(t, l),
    l
  )
}
function Hi(e, t, i, s = !1) {
  const { mixins: r, extends: n } = t
  n && Hi(e, n, i, !0), r && r.forEach((o) => Hi(e, o, i, !0))
  for (const o in t)
    if (!(s && o === 'expose')) {
      const a = Ia[o] || (i && i[o])
      e[o] = a ? a(e[o], t[o]) : t[o]
    }
  return e
}
const Ia = {
  data: zr,
  props: $r,
  emits: $r,
  methods: oi,
  computed: oi,
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
  components: oi,
  directives: oi,
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
  return oi(ks(e), ks(t))
}
function ks(e) {
  if (U(e)) {
    const t = {}
    for (let i = 0; i < e.length; i++) t[e[i]] = e[i]
    return t
  }
  return e
}
function Me(e, t) {
  return e ? [...new Set([].concat(e, t))] : t
}
function oi(e, t) {
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
  const i = Pe(Object.create(null), e)
  for (const s in t) i[s] = Me(e[s], t[s])
  return i
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
  return function (s, r = null) {
    Q(s) || (s = Pe({}, s)), r != null && !de(r) && (r = null)
    const n = uo(),
      o = new WeakSet()
    let a = !1
    const l = (n.app = {
      _uid: Aa++,
      _component: s,
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
          const f = Y(s, r)
          return (
            (f.appContext = n),
            c && t ? t(f, u) : e(f, u, d),
            (a = !0),
            (l._container = u),
            (u.__vue_app__ = l),
            os(f.component) || f.component.proxy
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
        Vi = l
        try {
          return u()
        } finally {
          Vi = null
        }
      },
    })
    return l
  }
}
let Vi = null
function Ft(e, t) {
  if (Se) {
    let i = Se.provides
    const s = Se.parent && Se.parent.provides
    s === i && (i = Se.provides = Object.create(s)), (i[e] = t)
  }
}
function lt(e, t, i = !1) {
  const s = Se || Ne
  if (s || Vi) {
    const r = s
      ? s.parent == null
        ? s.vnode.appContext && s.vnode.appContext.provides
        : s.parent.provides
      : Vi._context.provides
    if (r && e in r) return r[e]
    if (arguments.length > 1) return i && Q(t) ? t.call(s && s.proxy) : t
  }
}
function Ra(e, t, i, s = !1) {
  const r = {},
    n = {}
  Bi(n, ns, 1), (e.propsDefaults = Object.create(null)), fo(e, t, r, n)
  for (const o in e.propsOptions[0]) o in r || (r[o] = void 0)
  i ? (e.props = s ? r : qn(r)) : e.type.props ? (e.props = r) : (e.props = n),
    (e.attrs = n)
}
function ka(e, t, i, s) {
  const {
      props: r,
      attrs: n,
      vnode: { patchFlag: o },
    } = e,
    a = te(r),
    [l] = e.propsOptions
  let u = !1
  if ((s || o > 0) && !(o & 16)) {
    if (o & 8) {
      const c = e.vnode.dynamicProps
      for (let d = 0; d < c.length; d++) {
        let f = c[d]
        if (ts(e.emitsOptions, f)) continue
        const p = t[f]
        if (l)
          if (ee(n, f)) p !== n[f] && ((n[f] = p), (u = !0))
          else {
            const g = Ze(f)
            r[g] = zs(l, a, g, p, e, !1)
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
          ? i &&
            (i[d] !== void 0 || i[c] !== void 0) &&
            (r[d] = zs(l, a, d, void 0, e, !0))
          : delete r[d])
    if (n !== a) for (const d in n) (!t || !ee(t, d)) && (delete n[d], (u = !0))
  }
  u && ot(e, 'set', '$attrs')
}
function fo(e, t, i, s) {
  const [r, n] = e.propsOptions
  let o = !1,
    a
  if (t)
    for (let l in t) {
      if (Ai(l)) continue
      const u = t[l]
      let c
      r && ee(r, (c = Ze(l)))
        ? !n || !n.includes(c)
          ? (i[c] = u)
          : ((a || (a = {}))[c] = u)
        : ts(e.emitsOptions, l) ||
          ((!(l in s) || u !== s[l]) && ((s[l] = u), (o = !0)))
    }
  if (n) {
    const l = te(i),
      u = a || ue
    for (let c = 0; c < n.length; c++) {
      const d = n[c]
      i[d] = zs(r, l, d, u[d], e, !ee(u, d))
    }
  }
  return o
}
function zs(e, t, i, s, r, n) {
  const o = e[i]
  if (o != null) {
    const a = ee(o, 'default')
    if (a && s === void 0) {
      const l = o.default
      if (o.type !== Function && !o.skipFactory && Q(l)) {
        const { propsDefaults: u } = r
        i in u ? (s = u[i]) : (Gt(r), (s = u[i] = l.call(null, t)), Pt())
      } else s = l
    }
    o[0] && (n && !a ? (s = !1) : o[1] && (s === '' || s === Xt(i)) && (s = !0))
  }
  return s
}
function po(e, t, i = !1) {
  const s = t.propsCache,
    r = s.get(e)
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
    !i && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c)
  }
  if (!n && !l) return de(e) && s.set(e, Dt), Dt
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
  return de(e) && s.set(e, u), u
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
  return U(t) ? t.findIndex((i) => jr(i, e)) : Q(t) && jr(t, e) ? 0 : -1
}
const ho = (e) => e[0] === '_' || e === '$stable',
  ur = (e) => (U(e) ? e.map(Qe) : [Qe(e)]),
  za = (e, t, i) => {
    if (t._n) return t
    const s = he((...r) => ur(t(...r)), i)
    return (s._c = !1), s
  },
  mo = (e, t, i) => {
    const s = e._ctx
    for (const r in e) {
      if (ho(r)) continue
      const n = e[r]
      if (Q(n)) t[r] = za(r, n, s)
      else if (n != null) {
        const o = ur(n)
        t[r] = () => o
      }
    }
  },
  go = (e, t) => {
    const i = ur(t)
    e.slots.default = () => i
  },
  $a = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const i = t._
      i ? ((e.slots = te(t)), Bi(t, '_', i)) : mo(t, (e.slots = {}))
    } else (e.slots = {}), t && go(e, t)
    Bi(e.slots, ns, 1)
  },
  Da = (e, t, i) => {
    const { vnode: s, slots: r } = e
    let n = !0,
      o = ue
    if (s.shapeFlag & 32) {
      const a = t._
      a
        ? i && a === 1
          ? (n = !1)
          : (Pe(r, t), !i && a === 1 && delete r._)
        : ((n = !t.$stable), mo(t, r)),
        (o = t)
    } else t && (go(e, t), (o = { default: 1 }))
    if (n) for (const a in r) !ho(a) && o[a] == null && delete r[a]
  }
function $s(e, t, i, s, r = !1) {
  if (U(e)) {
    e.forEach((f, p) => $s(f, t && (U(t) ? t[p] : t), i, s, r))
    return
  }
  if (ki(s) && !r) return
  const n = s.shapeFlag & 4 ? os(s.component) || s.component.proxy : s.el,
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
            ? U(x) && Ks(x, n)
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
      o ? ((g.id = -1), Oe(g, i)) : g()
    }
  }
}
const Oe = ha
function Ba(e) {
  return ja(e)
}
function ja(e, t) {
  const i = Cs()
  i.__VUE__ = !0
  const {
      insert: s,
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
      h && !ti(h, m) && ((S = P(h)), xe(h, M, O, !0), (h = null)),
        m.patchFlag === -2 && ((z = !1), (m.dynamicChildren = null))
      const { type: A, ref: G, shapeFlag: H } = m
      switch (A) {
        case rs:
          I(h, m, v, S)
          break
        case Mt:
          b(h, m, v, S)
          break
        case zi:
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
      G != null && M && $s(G, h && h.ref, O, m || h, !m)
    },
    I = (h, m, v, S) => {
      if (h == null) s((m.el = a(m.children)), v, S)
      else {
        const M = (m.el = h.el)
        m.children !== h.children && u(M, m.children)
      }
    },
    b = (h, m, v, S) => {
      h == null ? s((m.el = l(m.children || '')), v, S) : (m.el = h.el)
    },
    E = (h, m, v, S) => {
      ;[h.el, h.anchor] = g(h.children, m, v, S, h.el, h.anchor)
    },
    w = ({ el: h, anchor: m }, v, S) => {
      let M
      for (; h && h !== m; ) (M = f(h)), s(h, v, S), (h = M)
      s(m, v, S)
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
            !Ai(oe) &&
            n(z, oe, null, H[oe], O, h.children, S, M, Ce)
        'value' in H && n(z, 'value', null, H.value),
          (A = H.onVnodeBeforeMount) && Xe(A, S, h)
      }
      Z && wt(h, null, S, 'beforeMount')
      const ae = Na(M, X)
      ae && X.beforeEnter(z),
        s(z, m, v),
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
            z.el && (z.type === Le || !ti(z, A) || z.shapeFlag & 70)
              ? d(z.el)
              : v
        x(z, A, G, null, S, M, O, B, !0)
      }
    },
    D = (h, m, v, S, M, O, B) => {
      if (v !== S) {
        if (v !== ue)
          for (const R in v)
            !Ai(R) && !(R in S) && n(h, R, v[R], null, B, m.children, M, O, Ce)
        for (const R in S) {
          if (Ai(R)) continue
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
          ? (s(A, v, S), s(G, v, S), k(m.children, v, G, M, O, B, R, z))
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
          ie(S, m, v)
          return
        } else (S.next = m), sa(S.update), S.update()
      else (m.el = h.el), (S.vnode = m)
    },
    re = (h, m, v, S, M, O, B) => {
      const R = () => {
          if (h.isMounted) {
            let { next: G, bu: H, u: W, parent: X, vnode: Z } = h,
              ae = G,
              oe
            yt(h, !1),
              G ? ((G.el = Z.el), ie(h, G, B)) : (G = Z),
              H && Li(H),
              (oe = G.props && G.props.onVnodeBeforeUpdate) && Xe(oe, X, G, Z),
              yt(h, !0)
            const be = cs(h),
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
              oe = ki(m)
            if (
              (yt(h, !1),
              X && Li(X),
              !oe && (G = W && W.onVnodeBeforeMount) && Xe(G, ae, m),
              yt(h, !0),
              H && se)
            ) {
              const be = () => {
                ;(h.subTree = cs(h)), se(H, h.subTree, h, M, null)
              }
              oe
                ? m.type.__asyncLoader().then(() => !h.isUnmounted && be())
                : be()
            } else {
              const be = (h.subTree = cs(h))
              x(null, be, v, S, h, M, O), (m.el = be.el)
            }
            if ((Z && Oe(Z, M), !oe && (G = W && W.onVnodeMounted))) {
              const be = m
              Oe(() => Xe(G, ae, be), M)
            }
            ;(m.shapeFlag & 256 ||
              (ae && ki(ae.vnode) && ae.vnode.shapeFlag & 256)) &&
              h.a &&
              Oe(h.a, M),
              (h.isMounted = !0),
              (m = v = S = null)
          }
        },
        z = (h.effect = new Qs(R, () => nr(A), h.scope)),
        A = (h.update = () => z.run())
      ;(A.id = h.uid), yt(h, !0), A()
    },
    ie = (h, m, v) => {
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
        if (ti(X, Z)) x(X, Z, v, null, M, O, B, R, z)
        else break
        A++
      }
      for (; A <= H && A <= W; ) {
        const X = h[H],
          Z = (m[W] = z ? pt(m[W]) : Qe(m[W]))
        if (ti(X, Z)) x(X, Z, v, null, M, O, B, R, z)
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
              if (Zt[oe - Z] === 0 && ti(ze, m[oe])) {
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
        s(O, m, v)
        for (let H = 0; H < z.length; H++) _e(z[H], m, v, S)
        s(h.anchor, m, v)
        return
      }
      if (B === zi) {
        w(h, m, v)
        return
      }
      if (S !== 2 && A & 1 && R)
        if (S === 0) R.beforeEnter(O), s(O, m, v), Oe(() => R.enter(O), M)
        else {
          const { leave: H, delayLeave: W, afterLeave: X } = R,
            Z = () => s(O, m, v),
            ae = () => {
              H(O, () => {
                Z(), X && X()
              })
            }
          W ? W(O, Z, ae) : ae()
        }
      else s(O, m, v)
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
      if ((R != null && $s(R, null, v, h, !0), G & 256)) {
        m.ctx.deactivate(h)
        return
      }
      const X = G & 1 && W,
        Z = !ki(h)
      let ae
      if ((Z && (ae = B && B.onVnodeBeforeUnmount) && Xe(ae, m, h), G & 6))
        wi(h.component, v, S)
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
      if (m === zi) {
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
    wi = (h, m, v) => {
      const { bum: S, scope: M, update: O, subTree: B, um: R } = h
      S && Li(S),
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
  let q, se
  return t && ([q, se] = t($)), { render: j, hydrate: q, createApp: La(j, q) }
}
function yt({ effect: e, update: t }, i) {
  e.allowRecurse = t.allowRecurse = i
}
function Na(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted
}
function vo(e, t, i = !1) {
  const s = e.children,
    r = t.children
  if (U(s) && U(r))
    for (let n = 0; n < s.length; n++) {
      const o = s[n]
      let a = r[n]
      a.shapeFlag & 1 &&
        !a.dynamicChildren &&
        ((a.patchFlag <= 0 || a.patchFlag === 32) &&
          ((a = r[n] = pt(r[n])), (a.el = o.el)),
        i || vo(o, a)),
        a.type === rs && (a.el = o.el)
    }
}
function Fa(e) {
  const t = e.slice(),
    i = [0]
  let s, r, n, o, a
  const l = e.length
  for (s = 0; s < l; s++) {
    const u = e[s]
    if (u !== 0) {
      if (((r = i[i.length - 1]), e[r] < u)) {
        ;(t[s] = r), i.push(s)
        continue
      }
      for (n = 0, o = i.length - 1; n < o; )
        (a = (n + o) >> 1), e[i[a]] < u ? (n = a + 1) : (o = a)
      u < e[i[n]] && (n > 0 && (t[s] = i[n - 1]), (i[n] = s))
    }
  }
  for (n = i.length, o = i[n - 1]; n-- > 0; ) (i[n] = o), (o = t[o])
  return i
}
const Ha = (e) => e.__isTeleport,
  Le = Symbol.for('v-fgt'),
  rs = Symbol.for('v-txt'),
  Mt = Symbol.for('v-cmt'),
  zi = Symbol.for('v-stc'),
  ai = []
let Ge = null
function ce(e = !1) {
  ai.push((Ge = e ? null : []))
}
function Va() {
  ai.pop(), (Ge = ai[ai.length - 1] || null)
}
let mi = 1
function Fr(e) {
  mi += e
}
function bo(e) {
  return (
    (e.dynamicChildren = mi > 0 ? Ge || Dt : null),
    Va(),
    mi > 0 && Ge && Ge.push(e),
    e
  )
}
function ve(e, t, i, s, r, n) {
  return bo(_(e, t, i, s, r, n, !0))
}
function ci(e, t, i, s, r) {
  return bo(Y(e, t, i, s, r, !0))
}
function Ds(e) {
  return e ? e.__v_isVNode === !0 : !1
}
function ti(e, t) {
  return e.type === t.type && e.key === t.key
}
const ns = '__vInternal',
  xo = ({ key: e }) => e ?? null,
  $i = ({ ref: e, ref_key: t, ref_for: i }) => (
    typeof e == 'number' && (e = '' + e),
    e != null
      ? ye(e) || we(e) || Q(e)
        ? { i: Ne, r: e, k: t, f: !!i }
        : e
      : null
  )
function _(
  e,
  t = null,
  i = null,
  s = 0,
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
    ref: t && $i(t),
    scopeId: is,
    slotScopeIds: null,
    children: i,
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
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: Ne,
  }
  return (
    a
      ? (dr(l, i), n & 128 && e.normalize(l))
      : i && (l.shapeFlag |= ye(i) ? 8 : 16),
    mi > 0 &&
      !o &&
      Ge &&
      (l.patchFlag > 0 || n & 6) &&
      l.patchFlag !== 32 &&
      Ge.push(l),
    l
  )
}
const Y = qa
function qa(e, t = null, i = null, s = 0, r = null, n = !1) {
  if (((!e || e === da) && (e = Mt), Ds(e))) {
    const a = qt(e, t, !0)
    return (
      i && dr(a, i),
      mi > 0 &&
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
      de(l) && (Gn(l) && !U(l) && (l = Pe({}, l)), (t.style = ct(l)))
  }
  const o = ye(e) ? 1 : pa(e) ? 128 : Ha(e) ? 64 : de(e) ? 4 : Q(e) ? 2 : 0
  return _(e, t, i, s, r, o, n, !0)
}
function Ga(e) {
  return e ? (Gn(e) || ns in e ? Pe({}, e) : e) : null
}
function qt(e, t, i = !1) {
  const { props: s, ref: r, patchFlag: n, children: o } = e,
    a = t ? Wa(s || {}, t) : s
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && xo(a),
    ref:
      t && t.ref ? (i && r ? (U(r) ? r.concat($i(t)) : [r, $i(t)]) : $i(t)) : r,
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
  return Y(rs, null, e, t)
}
function Fe(e, t) {
  const i = Y(zi, null, e)
  return (i.staticCount = t), i
}
function ds(e = '', t = !1) {
  return t ? (ce(), ci(Mt, null, e)) : Y(Mt, null, e)
}
function Qe(e) {
  return e == null || typeof e == 'boolean'
    ? Y(Mt)
    : U(e)
    ? Y(Le, null, e.slice())
    : typeof e == 'object'
    ? pt(e)
    : Y(rs, null, String(e))
}
function pt(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : qt(e)
}
function dr(e, t) {
  let i = 0
  const { shapeFlag: s } = e
  if (t == null) t = null
  else if (U(t)) i = 16
  else if (typeof t == 'object')
    if (s & 65) {
      const r = t.default
      r && (r._c && (r._d = !1), dr(e, r()), r._c && (r._d = !0))
      return
    } else {
      i = 32
      const r = t._
      !r && !(ns in t)
        ? (t._ctx = Ne)
        : r === 3 &&
          Ne &&
          (Ne.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)))
    }
  else
    Q(t)
      ? ((t = { default: t, _ctx: Ne }), (i = 32))
      : ((t = String(t)), s & 64 ? ((i = 16), (t = [$e(t)])) : (i = 8))
  ;(e.children = t), (e.shapeFlag |= i)
}
function Wa(...e) {
  const t = {}
  for (let i = 0; i < e.length; i++) {
    const s = e[i]
    for (const r in s)
      if (r === 'class')
        t.class !== s.class && (t.class = Ae([t.class, s.class]))
      else if (r === 'style') t.style = ct([t.style, s.style])
      else if (Wi(r)) {
        const n = t[r],
          o = s[r]
        o &&
          n !== o &&
          !(U(n) && n.includes(o)) &&
          (t[r] = n ? [].concat(n, o) : o)
      } else r !== '' && (t[r] = s[r])
  }
  return t
}
function Xe(e, t, i, s = null) {
  Ue(e, t, 7, [i, s])
}
const Ua = uo()
let Ka = 0
function Ya(e, t, i) {
  const s = e.type,
    r = (t ? t.appContext : e.appContext) || Ua,
    n = {
      uid: Ka++,
      vnode: e,
      type: s,
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
      propsOptions: po(s, r),
      emitsOptions: eo(s, r),
      emit: null,
      emitted: null,
      propsDefaults: ue,
      inheritAttrs: s.inheritAttrs,
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
      suspense: i,
      suspenseId: i ? i.pendingId : 0,
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
;(kt = Cs()[Hr]) || (kt = Cs()[Hr] = []),
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
let gi = !1
function Xa(e, t = !1) {
  gi = t
  const { props: i, children: s } = e.vnode,
    r = yo(e)
  Ra(e, i, r, t), $a(e, s)
  const n = r ? Qa(e, t) : void 0
  return (gi = !1), n
}
function Qa(e, t) {
  const i = e.type
  ;(e.accessCache = Object.create(null)), (e.proxy = Wn(new Proxy(e.ctx, Ea)))
  const { setup: s } = i
  if (s) {
    const r = (e.setupContext = s.length > 1 ? Za(e) : null)
    Gt(e), Qt()
    const n = vt(s, e, 0, [e.props, r])
    if ((Jt(), Pt(), In(n))) {
      if ((n.then(Pt, Pt), t))
        return n
          .then((o) => {
            Vr(e, o, t)
          })
          .catch((o) => {
            es(o, e, 0)
          })
      e.asyncDep = n
    } else Vr(e, n, t)
  } else _o(e, t)
}
function Vr(e, t, i) {
  Q(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : de(t) && (e.setupState = Yn(t)),
    _o(e, i)
}
let qr
function _o(e, t, i) {
  const s = e.type
  if (!e.render) {
    if (!t && qr && !s.render) {
      const r = s.template || cr(e).template
      if (r) {
        const { isCustomElement: n, compilerOptions: o } = e.appContext.config,
          { delimiters: a, compilerOptions: l } = s,
          u = Pe(Pe({ isCustomElement: n, delimiters: a }, o), l)
        s.render = qr(r, u)
      }
    }
    e.render = s.render || We
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
      get(t, i) {
        return ke(e, 'get', '$attrs'), t[i]
      },
    }))
  )
}
function Za(e) {
  const t = (i) => {
    e.exposed = i || {}
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
function os(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Yn(Wn(e.exposed)), {
        get(t, i) {
          if (i in t) return t[i]
          if (i in li) return li[i](e)
        },
        has(t, i) {
          return i in t || i in li
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
const Te = (e, t) => ea(e, t, gi)
function je(e, t, i) {
  const s = arguments.length
  return s === 2
    ? de(t) && !U(t)
      ? Ds(t)
        ? Y(e, null, [t])
        : Y(e, t)
      : Y(e, null, t)
    : (s > 3
        ? (i = Array.prototype.slice.call(arguments, 2))
        : s === 3 && Ds(i) && (i = [i]),
      Y(e, t, i))
}
const ic = Symbol.for('v-scx'),
  sc = () => lt(ic),
  rc = '3.3.9',
  nc = 'http://www.w3.org/2000/svg',
  St = typeof document < 'u' ? document : null,
  Gr = St && St.createElement('template'),
  oc = {
    insert: (e, t, i) => {
      t.insertBefore(e, i || null)
    },
    remove: (e) => {
      const t = e.parentNode
      t && t.removeChild(e)
    },
    createElement: (e, t, i, s) => {
      const r = t
        ? St.createElementNS(nc, e)
        : St.createElement(e, i ? { is: i } : void 0)
      return (
        e === 'select' &&
          s &&
          s.multiple != null &&
          r.setAttribute('multiple', s.multiple),
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
    insertStaticContent(e, t, i, s, r, n) {
      const o = i ? i.previousSibling : t.lastChild
      if (r && (r === n || r.nextSibling))
        for (
          ;
          t.insertBefore(r.cloneNode(!0), i),
            !(r === n || !(r = r.nextSibling));

        );
      else {
        Gr.innerHTML = s ? `<svg>${e}</svg>` : e
        const a = Gr.content
        if (s) {
          const l = a.firstChild
          for (; l.firstChild; ) a.appendChild(l.firstChild)
          a.removeChild(l)
        }
        t.insertBefore(a, i)
      }
      return [
        o ? o.nextSibling : t.firstChild,
        i ? i.previousSibling : t.lastChild,
      ]
    },
  },
  lc = Symbol('_vtc')
function ac(e, t, i) {
  const s = e[lc]
  s && (t = (t ? [t, ...s] : [...s]).join(' ')),
    t == null
      ? e.removeAttribute('class')
      : i
      ? e.setAttribute('class', t)
      : (e.className = t)
}
const pr = Symbol('_vod'),
  ii = {
    beforeMount(e, { value: t }, { transition: i }) {
      ;(e[pr] = e.style.display === 'none' ? '' : e.style.display),
        i && t ? i.beforeEnter(e) : si(e, t)
    },
    mounted(e, { value: t }, { transition: i }) {
      i && t && i.enter(e)
    },
    updated(e, { value: t, oldValue: i }, { transition: s }) {
      !t != !i &&
        (s
          ? t
            ? (s.beforeEnter(e), si(e, !0), s.enter(e))
            : s.leave(e, () => {
                si(e, !1)
              })
          : si(e, t))
    },
    beforeUnmount(e, { value: t }) {
      si(e, t)
    },
  }
function si(e, t) {
  e.style.display = t ? e[pr] : 'none'
}
function cc(e, t, i) {
  const s = e.style,
    r = ye(i)
  if (i && !r) {
    if (t && !ye(t)) for (const n in t) i[n] == null && Bs(s, n, '')
    for (const n in i) Bs(s, n, i[n])
  } else {
    const n = s.display
    r ? t !== i && (s.cssText = i) : t && e.removeAttribute('style'),
      pr in e && (s.display = n)
  }
}
const Wr = /\s*!important$/
function Bs(e, t, i) {
  if (U(i)) i.forEach((s) => Bs(e, t, s))
  else if ((i == null && (i = ''), t.startsWith('--'))) e.setProperty(t, i)
  else {
    const s = uc(e, t)
    Wr.test(i)
      ? e.setProperty(Xt(s), i.replace(Wr, ''), 'important')
      : (e[s] = i)
  }
}
const Ur = ['Webkit', 'Moz', 'ms'],
  fs = {}
function uc(e, t) {
  const i = fs[t]
  if (i) return i
  let s = Ze(t)
  if (s !== 'filter' && s in e) return (fs[t] = s)
  s = Xi(s)
  for (let r = 0; r < Ur.length; r++) {
    const n = Ur[r] + s
    if (n in e) return (fs[t] = n)
  }
  return t
}
const Kr = 'http://www.w3.org/1999/xlink'
function dc(e, t, i, s, r) {
  if (s && t.startsWith('xlink:'))
    i == null
      ? e.removeAttributeNS(Kr, t.slice(6, t.length))
      : e.setAttributeNS(Kr, t, i)
  else {
    const n = wl(t)
    i == null || (n && !An(i))
      ? e.removeAttribute(t)
      : e.setAttribute(t, n ? '' : i)
  }
}
function fc(e, t, i, s, r, n, o) {
  if (t === 'innerHTML' || t === 'textContent') {
    s && o(s, r, n), (e[t] = i ?? '')
    return
  }
  const a = e.tagName
  if (t === 'value' && a !== 'PROGRESS' && !a.includes('-')) {
    e._value = i
    const u = a === 'OPTION' ? e.getAttribute('value') : e.value,
      c = i ?? ''
    u !== c && (e.value = c), i == null && e.removeAttribute(t)
    return
  }
  let l = !1
  if (i === '' || i == null) {
    const u = typeof e[t]
    u === 'boolean'
      ? (i = An(i))
      : i == null && u === 'string'
      ? ((i = ''), (l = !0))
      : u === 'number' && ((i = 0), (l = !0))
  }
  try {
    e[t] = i
  } catch {}
  l && e.removeAttribute(t)
}
function zt(e, t, i, s) {
  e.addEventListener(t, i, s)
}
function pc(e, t, i, s) {
  e.removeEventListener(t, i, s)
}
const Yr = Symbol('_vei')
function hc(e, t, i, s, r = null) {
  const n = e[Yr] || (e[Yr] = {}),
    o = n[t]
  if (s && o) o.value = s
  else {
    const [a, l] = mc(t)
    if (s) {
      const u = (n[t] = bc(s, r))
      zt(e, a, u, l)
    } else o && (pc(e, a, o, l), (n[t] = void 0))
  }
}
const Xr = /(?:Once|Passive|Capture)$/
function mc(e) {
  let t
  if (Xr.test(e)) {
    t = {}
    let s
    for (; (s = e.match(Xr)); )
      (e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0)
  }
  return [e[2] === ':' ? e.slice(3) : Xt(e.slice(2)), t]
}
let ps = 0
const gc = Promise.resolve(),
  vc = () => ps || (gc.then(() => (ps = 0)), (ps = Date.now()))
function bc(e, t) {
  const i = (s) => {
    if (!s._vts) s._vts = Date.now()
    else if (s._vts <= i.attached) return
    Ue(xc(s, i.value), t, 5, [s])
  }
  return (i.value = e), (i.attached = vc()), i
}
function xc(e, t) {
  if (U(t)) {
    const i = e.stopImmediatePropagation
    return (
      (e.stopImmediatePropagation = () => {
        i.call(e), (e._stopped = !0)
      }),
      t.map((s) => (r) => !r._stopped && s && s(r))
    )
  } else return t
}
const Qr = /^on[a-z]/,
  wc = (e, t, i, s, r = !1, n, o, a, l) => {
    t === 'class'
      ? ac(e, s, r)
      : t === 'style'
      ? cc(e, i, s)
      : Wi(t)
      ? Us(t) || hc(e, t, i, s, o)
      : (
          t[0] === '.'
            ? ((t = t.slice(1)), !0)
            : t[0] === '^'
            ? ((t = t.slice(1)), !1)
            : yc(e, t, s, r)
        )
      ? fc(e, t, s, n, o, a, l)
      : (t === 'true-value'
          ? (e._trueValue = s)
          : t === 'false-value' && (e._falseValue = s),
        dc(e, t, s, r))
  }
function yc(e, t, i, s) {
  return s
    ? !!(
        t === 'innerHTML' ||
        t === 'textContent' ||
        (t in e && Qr.test(t) && Q(i))
      )
    : t === 'spellcheck' ||
      t === 'draggable' ||
      t === 'translate' ||
      t === 'form' ||
      (t === 'list' && e.tagName === 'INPUT') ||
      (t === 'type' && e.tagName === 'TEXTAREA') ||
      (Qr.test(t) && ye(i))
    ? !1
    : t in e
}
const Jr = (e) => {
  const t = e.props['onUpdate:modelValue'] || !1
  return U(t) ? (i) => Li(t, i) : t
}
function _c(e) {
  e.target.composing = !0
}
function Zr(e) {
  const t = e.target
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event('input')))
}
const hs = Symbol('_assign'),
  Dm = {
    created(e, { modifiers: { lazy: t, trim: i, number: s } }, r) {
      e[hs] = Jr(r)
      const n = s || (r.props && r.props.type === 'number')
      zt(e, t ? 'change' : 'input', (o) => {
        if (o.target.composing) return
        let a = e.value
        i && (a = a.trim()), n && (a = Ps(a)), e[hs](a)
      }),
        i &&
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
      { value: t, modifiers: { lazy: i, trim: s, number: r } },
      n
    ) {
      if (((e[hs] = Jr(n)), e.composing)) return
      const o = r || e.type === 'number' ? Ps(e.value) : e.value,
        a = t ?? ''
      o !== a &&
        ((document.activeElement === e &&
          e.type !== 'range' &&
          (i || (s && e.value.trim() === a))) ||
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
    exact: (e, t) => Sc.some((i) => e[`${i}Key`] && !t.includes(i)),
  },
  Ec =
    (e, t) =>
    (i, ...s) => {
      for (let r = 0; r < t.length; r++) {
        const n = Tc[t[r]]
        if (n && n(i, t)) return
      }
      return e(i, ...s)
    },
  Pc = Pe({ patchProp: wc }, oc)
let en
function Cc() {
  return en || (en = Ba(Pc))
}
const Ic = (...e) => {
  const t = Cc().createApp(...e),
    { mount: i } = t
  return (
    (t.mount = (s) => {
      const r = Mc(s)
      if (!r) return
      const n = t._component
      !Q(n) && !n.render && !n.template && (n.template = r.innerHTML),
        (r.innerHTML = '')
      const o = i(r, !1, r instanceof SVGElement)
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
function ms(e, t) {
  const i = {}
  for (const s in t) {
    const r = t[s]
    i[s] = Ke(r) ? r.map(e) : e(r)
  }
  return i
}
const ui = () => {},
  Ke = Array.isArray,
  Ac = /\/$/,
  Lc = (e) => e.replace(Ac, '')
function gs(e, t, i = '/') {
  let s,
    r = {},
    n = '',
    o = ''
  const a = t.indexOf('#')
  let l = t.indexOf('?')
  return (
    a < l && a >= 0 && (l = -1),
    l > -1 &&
      ((s = t.slice(0, l)),
      (n = t.slice(l + 1, a > -1 ? a : t.length)),
      (r = e(n))),
    a > -1 && ((s = s || t.slice(0, a)), (o = t.slice(a, t.length))),
    (s = $c(s ?? t, i)),
    { fullPath: s + (n && '?') + n + o, path: s, query: r, hash: o }
  )
}
function Rc(e, t) {
  const i = t.query ? e(t.query) : ''
  return t.path + (i && '?') + i + (t.hash || '')
}
function tn(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || '/'
}
function kc(e, t, i) {
  const s = t.matched.length - 1,
    r = i.matched.length - 1
  return (
    s > -1 &&
    s === r &&
    Wt(t.matched[s], i.matched[r]) &&
    So(t.params, i.params) &&
    e(t.query) === e(i.query) &&
    t.hash === i.hash
  )
}
function Wt(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t)
}
function So(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1
  for (const i in e) if (!zc(e[i], t[i])) return !1
  return !0
}
function zc(e, t) {
  return Ke(e) ? sn(e, t) : Ke(t) ? sn(t, e) : e === t
}
function sn(e, t) {
  return Ke(t)
    ? e.length === t.length && e.every((i, s) => i === t[s])
    : e.length === 1 && e[0] === t
}
function $c(e, t) {
  if (e.startsWith('/')) return e
  if (!e) return t
  const i = t.split('/'),
    s = e.split('/'),
    r = s[s.length - 1]
  ;(r === '..' || r === '.') && s.push('')
  let n = i.length - 1,
    o,
    a
  for (o = 0; o < s.length; o++)
    if (((a = s[o]), a !== '.'))
      if (a === '..') n > 1 && n--
      else break
  return (
    i.slice(0, n).join('/') +
    '/' +
    s.slice(o - (o === s.length ? 1 : 0)).join('/')
  )
}
var vi
;(function (e) {
  ;(e.pop = 'pop'), (e.push = 'push')
})(vi || (vi = {}))
var di
;(function (e) {
  ;(e.back = 'back'), (e.forward = 'forward'), (e.unknown = '')
})(di || (di = {}))
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
  const i = document.documentElement.getBoundingClientRect(),
    s = e.getBoundingClientRect()
  return {
    behavior: t.behavior,
    left: s.left - i.left - (t.left || 0),
    top: s.top - i.top - (t.top || 0),
  }
}
const ls = () => ({ left: window.pageXOffset, top: window.pageYOffset })
function Fc(e) {
  let t
  if ('el' in e) {
    const i = e.el,
      s = typeof i == 'string' && i.startsWith('#'),
      r =
        typeof i == 'string'
          ? s
            ? document.getElementById(i.slice(1))
            : document.querySelector(i)
          : i
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
const js = new Map()
function Hc(e, t) {
  js.set(e, t)
}
function Vc(e) {
  const t = js.get(e)
  return js.delete(e), t
}
let qc = () => location.protocol + '//' + location.host
function To(e, t) {
  const { pathname: i, search: s, hash: r } = t,
    n = e.indexOf('#')
  if (n > -1) {
    let a = r.includes(e.slice(n)) ? e.slice(n).length : 1,
      l = r.slice(a)
    return l[0] !== '/' && (l = '/' + l), tn(l, '')
  }
  return tn(i, e) + s + r
}
function Gc(e, t, i, s) {
  let r = [],
    n = [],
    o = null
  const a = ({ state: f }) => {
    const p = To(e, location),
      g = i.value,
      x = t.value
    let I = 0
    if (f) {
      if (((i.value = p), (t.value = f), o && o === g)) {
        o = null
        return
      }
      I = x ? f.position - x.position : 0
    } else s(p)
    r.forEach((b) => {
      b(i.value, g, {
        delta: I,
        type: vi.pop,
        direction: I ? (I > 0 ? di.forward : di.back) : di.unknown,
      })
    })
  }
  function l() {
    o = i.value
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
    f.state && f.replaceState(ne({}, f.state, { scroll: ls() }), '')
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
function nn(e, t, i, s = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: i,
    replaced: s,
    position: window.history.length,
    scroll: r ? ls() : null,
  }
}
function Wc(e) {
  const { history: t, location: i } = window,
    s = { value: To(e, i) },
    r = { value: t.state }
  r.value ||
    n(
      s.value,
      {
        back: null,
        current: s.value,
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
          ? (i.host && document.querySelector('base') ? e : e.slice(d)) + l
          : qc() + e + l
    try {
      t[c ? 'replaceState' : 'pushState'](u, '', f), (r.value = u)
    } catch (p) {
      console.error(p), i[c ? 'replace' : 'assign'](f)
    }
  }
  function o(l, u) {
    const c = ne({}, t.state, nn(r.value.back, l, r.value.forward, !0), u, {
      position: r.value.position,
    })
    n(l, c, !0), (s.value = l)
  }
  function a(l, u) {
    const c = ne({}, r.value, t.state, { forward: l, scroll: ls() })
    n(c.current, c, !0)
    const d = ne({}, nn(s.value, l, null), { position: c.position + 1 }, u)
    n(l, d, !1), (s.value = l)
  }
  return { location: s, state: r, push: a, replace: o }
}
function Uc(e) {
  e = Dc(e)
  const t = Wc(e),
    i = Gc(e, t.state, t.location, t.replace)
  function s(n, o = !0) {
    o || i.pauseListeners(), history.go(n)
  }
  const r = ne(
    { location: '', base: e, go: s, createHref: jc.bind(null, e) },
    t,
    i
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
function it(e, t) {
  return e instanceof Error && Po in e && (t == null || !!(e.type & t))
}
const ln = '[^/]+?',
  Yc = { sensitive: !1, strict: !1, start: !0, end: !0 },
  Xc = /[.+*?^${}()[\]/\\]/g
function Qc(e, t) {
  const i = ne({}, Yc, t),
    s = []
  let r = i.start ? '^' : ''
  const n = []
  for (const u of e) {
    const c = u.length ? [] : [90]
    i.strict && !u.length && (r += '/')
    for (let d = 0; d < u.length; d++) {
      const f = u[d]
      let p = 40 + (i.sensitive ? 0.25 : 0)
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
    s.push(c)
  }
  if (i.strict && i.end) {
    const u = s.length - 1
    s[u][s[u].length - 1] += 0.7000000000000001
  }
  i.strict || (r += '/?'), i.end ? (r += '$') : i.strict && (r += '(?:/|$)')
  const o = new RegExp(r, i.sensitive ? '' : 'i')
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
  return { re: o, score: s, keys: n, parse: a, stringify: l }
}
function Jc(e, t) {
  let i = 0
  for (; i < e.length && i < t.length; ) {
    const s = t[i] - e[i]
    if (s) return s
    i++
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
  let i = 0
  const s = e.score,
    r = t.score
  for (; i < s.length && i < r.length; ) {
    const n = Jc(s[i], r[i])
    if (n) return n
    i++
  }
  if (Math.abs(r.length - s.length) === 1) {
    if (an(s)) return 1
    if (an(r)) return -1
  }
  return r.length - s.length
}
function an(e) {
  const t = e[e.length - 1]
  return e.length > 0 && t[t.length - 1] < 0
}
const eu = { type: 0, value: '' },
  tu = /[a-zA-Z0-9_]/
function iu(e) {
  if (!e) return [[]]
  if (e === '/') return [[eu]]
  if (!e.startsWith('/')) throw new Error(`Invalid path "${e}"`)
  function t(p) {
    throw new Error(`ERR (${i})/"${u}": ${p}`)
  }
  let i = 0,
    s = i
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
      (i === 0
        ? n.push({ type: 0, value: u })
        : i === 1 || i === 2 || i === 3
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
    if (((l = e[a++]), l === '\\' && i !== 2)) {
      ;(s = i), (i = 4)
      continue
    }
    switch (i) {
      case 0:
        l === '/' ? (u && d(), o()) : l === ':' ? (d(), (i = 1)) : f()
        break
      case 4:
        f(), (i = s)
        break
      case 1:
        l === '('
          ? (i = 2)
          : tu.test(l)
          ? f()
          : (d(), (i = 0), l !== '*' && l !== '?' && l !== '+' && a--)
        break
      case 2:
        l === ')'
          ? c[c.length - 1] == '\\'
            ? (c = c.slice(0, -1) + l)
            : (i = 3)
          : (c += l)
        break
      case 3:
        d(), (i = 0), l !== '*' && l !== '?' && l !== '+' && a--, (c = '')
        break
      default:
        t('Unknown state')
        break
    }
  }
  return i === 2 && t(`Unfinished custom RegExp for param "${u}"`), d(), o(), r
}
function su(e, t, i) {
  const s = Qc(iu(e.path), i),
    r = ne(s, { record: e, parent: t, children: [], alias: [] })
  return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r
}
function ru(e, t) {
  const i = [],
    s = new Map()
  t = dn({ strict: !1, end: !0, sensitive: !1 }, t)
  function r(c) {
    return s.get(c)
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
        ((b = su(w, d, x)),
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
      : ui
  }
  function o(c) {
    if (Eo(c)) {
      const d = s.get(c)
      d &&
        (s.delete(c),
        i.splice(i.indexOf(d), 1),
        d.children.forEach(o),
        d.alias.forEach(o))
    } else {
      const d = i.indexOf(c)
      d > -1 &&
        (i.splice(d, 1),
        c.record.name && s.delete(c.record.name),
        c.children.forEach(o),
        c.alias.forEach(o))
    }
  }
  function a() {
    return i
  }
  function l(c) {
    let d = 0
    for (
      ;
      d < i.length &&
      Zc(c, i[d]) >= 0 &&
      (c.record.path !== i[d].record.path || !Co(c, i[d]));

    )
      d++
    i.splice(d, 0, c), c.record.name && !un(c) && s.set(c.record.name, c)
  }
  function u(c, d) {
    let f,
      p = {},
      g,
      x
    if ('name' in c && c.name) {
      if (((f = s.get(c.name)), !f)) throw Ut(1, { location: c })
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
        (f = i.find((E) => E.re.test(g))),
        f && ((p = f.parse(g)), (x = f.record.name))
    else {
      if (((f = d.name ? s.get(d.name) : i.find((E) => E.re.test(d.path))), !f))
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
  const i = {}
  for (const s of t) s in e && (i[s] = e[s])
  return i
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
    i = e.props || !1
  if ('component' in e) t.default = i
  else for (const s in e.components) t[s] = typeof i == 'object' ? i[s] : i
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
  return e.reduce((t, i) => ne(t, i.meta), {})
}
function dn(e, t) {
  const i = {}
  for (const s in e) i[s] = s in t ? t[s] : e[s]
  return i
}
function Co(e, t) {
  return t.children.some((i) => i === e || Co(e, i))
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
function Ns(e) {
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
  return Ns(e).replace(uu, '%3D')
}
function xu(e) {
  return hr(e).replace(Io, '%23').replace(du, '%3F')
}
function wu(e) {
  return e == null ? '' : xu(e).replace(cu, '%2F')
}
function qi(e) {
  try {
    return decodeURIComponent('' + e)
  } catch {}
  return '' + e
}
function yu(e) {
  const t = {}
  if (e === '' || e === '?') return t
  const s = (e[0] === '?' ? e.slice(1) : e).split('&')
  for (let r = 0; r < s.length; ++r) {
    const n = s[r].replace(Mo, ' '),
      o = n.indexOf('='),
      a = qi(o < 0 ? n : n.slice(0, o)),
      l = o < 0 ? null : qi(n.slice(o + 1))
    if (a in t) {
      let u = t[a]
      Ke(u) || (u = t[a] = [u]), u.push(l)
    } else t[a] = l
  }
  return t
}
function fn(e) {
  let t = ''
  for (let i in e) {
    const s = e[i]
    if (((i = bu(i)), s == null)) {
      s !== void 0 && (t += (t.length ? '&' : '') + i)
      continue
    }
    ;(Ke(s) ? s.map((n) => n && Ns(n)) : [s && Ns(s)]).forEach((n) => {
      n !== void 0 &&
        ((t += (t.length ? '&' : '') + i), n != null && (t += '=' + n))
    })
  }
  return t
}
function _u(e) {
  const t = {}
  for (const i in e) {
    const s = e[i]
    s !== void 0 &&
      (t[i] = Ke(s)
        ? s.map((r) => (r == null ? null : '' + r))
        : s == null
        ? s
        : '' + s)
  }
  return t
}
const Su = Symbol(''),
  pn = Symbol(''),
  mr = Symbol(''),
  Ro = Symbol(''),
  Fs = Symbol('')
function ri() {
  let e = []
  function t(s) {
    return (
      e.push(s),
      () => {
        const r = e.indexOf(s)
        r > -1 && e.splice(r, 1)
      }
    )
  }
  function i() {
    e = []
  }
  return { add: t, list: () => e.slice(), reset: i }
}
function ht(e, t, i, s, r) {
  const n = s && (s.enterCallbacks[r] = s.enterCallbacks[r] || [])
  return () =>
    new Promise((o, a) => {
      const l = (d) => {
          d === !1
            ? a(Ut(4, { from: i, to: t }))
            : d instanceof Error
            ? a(d)
            : Kc(d)
            ? a(Ut(2, { from: t, to: d }))
            : (n &&
                s.enterCallbacks[r] === n &&
                typeof d == 'function' &&
                n.push(d),
              o())
        },
        u = e.call(s && s.instances[r], t, i, l)
      let c = Promise.resolve(u)
      e.length < 3 && (c = c.then(l)), c.catch((d) => a(d))
    })
}
function vs(e, t, i, s) {
  const r = []
  for (const n of e)
    for (const o in n.components) {
      let a = n.components[o]
      if (!(t !== 'beforeRouteEnter' && !n.instances[o]))
        if (Tu(a)) {
          const u = (a.__vccOpts || a)[t]
          u && r.push(ht(u, i, s, n, o))
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
              return f && ht(f, i, s, n, o)()
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
  const t = lt(mr),
    i = lt(Ro),
    s = Te(() => t.resolve(Re(e.to))),
    r = Te(() => {
      const { matched: l } = s.value,
        { length: u } = l,
        c = l[u - 1],
        d = i.matched
      if (!c || !d.length) return -1
      const f = d.findIndex(Wt.bind(null, c))
      if (f > -1) return f
      const p = mn(l[u - 2])
      return u > 1 && mn(c) === p && d[d.length - 1].path !== p
        ? d.findIndex(Wt.bind(null, l[u - 2]))
        : f
    }),
    n = Te(() => r.value > -1 && Iu(i.params, s.value.params)),
    o = Te(
      () =>
        r.value > -1 &&
        r.value === i.matched.length - 1 &&
        So(i.params, s.value.params)
    )
  function a(l = {}) {
    return Cu(l)
      ? t[Re(e.replace) ? 'replace' : 'push'](Re(e.to)).catch(ui)
      : Promise.resolve()
  }
  return {
    route: s,
    href: Te(() => s.value.href),
    isActive: n,
    isExactActive: o,
    navigate: a,
  }
}
const Eu = so({
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
      const i = Ji(hn(e)),
        { options: s } = lt(mr),
        r = Te(() => ({
          [gn(e.activeClass, s.linkActiveClass, 'router-link-active')]:
            i.isActive,
          [gn(
            e.exactActiveClass,
            s.linkExactActiveClass,
            'router-link-exact-active'
          )]: i.isExactActive,
        }))
      return () => {
        const n = t.default && t.default(i)
        return e.custom
          ? n
          : je(
              'a',
              {
                'aria-current': i.isExactActive ? e.ariaCurrentValue : null,
                href: i.href,
                onClick: i.navigate,
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
  for (const i in t) {
    const s = t[i],
      r = e[i]
    if (typeof s == 'string') {
      if (s !== r) return !1
    } else if (!Ke(r) || r.length !== s.length || s.some((n, o) => n !== r[o]))
      return !1
  }
  return !0
}
function mn(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : ''
}
const gn = (e, t, i) => e ?? t ?? i,
  Mu = so({
    name: 'RouterView',
    inheritAttrs: !1,
    props: { name: { type: String, default: 'default' }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: i }) {
      const s = lt(Fs),
        r = Te(() => e.route || s.value),
        n = lt(pn, 0),
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
        Ft(Fs, r)
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
          if (!f) return vn(i.default, { Component: f, route: u })
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
          return vn(i.default, { Component: I, route: u }) || I
        }
      )
    },
  })
function vn(e, t) {
  if (!e) return null
  const i = e(t)
  return i.length === 1 ? i[0] : i
}
const Ou = Mu
function Au(e) {
  const t = ru(e.routes, e),
    i = e.parseQuery || yu,
    s = e.stringifyQuery || fn,
    r = e.history,
    n = ri(),
    o = ri(),
    a = ri(),
    l = Un(ft)
  let u = ft
  $t &&
    e.scrollBehavior &&
    'scrollRestoration' in history &&
    (history.scrollRestoration = 'manual')
  const c = ms.bind(null, (P) => '' + P),
    d = ms.bind(null, wu),
    f = ms.bind(null, qi)
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
      const v = gs(i, P, j.path),
        S = t.resolve({ path: v.path }, j),
        M = r.createHref(v.fullPath)
      return ne(v, S, {
        params: f(S.params),
        hash: qi(v.hash),
        redirectedFrom: void 0,
        href: M,
      })
    }
    let $
    if ('path' in P) $ = ne({}, P, { path: gs(i, P.path, j.path).path })
    else {
      const v = ne({}, P.params)
      for (const S in v) v[S] == null && delete v[S]
      ;($ = ne({}, P, { params: d(v) })), (j.params = d(j.params))
    }
    const q = t.resolve($, j),
      se = P.hash || ''
    q.params = c(f(q.params))
    const h = Rc(s, ne({}, P, { hash: vu(se), path: q.path })),
      m = r.createHref(h)
    return ne(
      { fullPath: h, hash: se, query: s === fn ? _u(P.query) : P.query || {} },
      q,
      { redirectedFrom: void 0, href: m }
    )
  }
  function E(P) {
    return typeof P == 'string' ? gs(i, P, l.value.path) : ne({}, P)
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
      se = P.state,
      h = P.force,
      m = P.replace === !0,
      v = N($)
    if (v)
      return J(
        ne(E(v), {
          state: typeof v == 'object' ? ne({}, se, v.state) : se,
          force: h,
          replace: m,
        }),
        j || $
      )
    const S = $
    S.redirectedFrom = j
    let M
    return (
      !h && kc(s, q, $) && ((M = Ut(16, { to: S, from: q })), _e(q, q, !0, !1)),
      (M ? Promise.resolve(M) : C(S, q))
        .catch((O) => (it(O) ? (it(O, 2) ? O : fe(O)) : F(O, S, q)))
        .then((O) => {
          if (O) {
            if (it(O, 2))
              return J(
                ne({ replace: m }, E(O.to), {
                  state: typeof O.to == 'object' ? ne({}, se, O.to.state) : se,
                  force: h,
                }),
                j || S
              )
          } else O = K(S, q, !0, m, se)
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
    const [q, se, h] = Lu(P, j)
    $ = vs(q.reverse(), 'beforeRouteLeave', P, j)
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
          $ = vs(se, 'beforeRouteUpdate', P, j)
          for (const v of se)
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
            ($ = vs(h, 'beforeRouteEnter', P, j)),
            $.push(m),
            Ce($)
          )
        )
        .then(() => {
          $ = []
          for (const v of o.list()) $.push(ht(v, P, j))
          return $.push(m), Ce($)
        })
        .catch((v) => (it(v, 8) ? v : Promise.reject(v)))
    )
  }
  function D(P, j, $) {
    a.list().forEach((q) => T(() => q(P, j, $)))
  }
  function K(P, j, $, q, se) {
    const h = w(P, j)
    if (h) return h
    const m = j === ft,
      v = $t ? history.state : {}
    $ &&
      (q || m
        ? r.replace(P.fullPath, ne({ scroll: m && v && v.scroll }, se))
        : r.push(P.fullPath, se)),
      (l.value = P),
      _e(P, j, $, m),
      fe()
  }
  let V
  function le() {
    V ||
      (V = r.listen((P, j, $) => {
        if (!wi.listening) return
        const q = b(P),
          se = N(q)
        if (se) {
          J(ne(se, { replace: !0 }), q).catch(ui)
          return
        }
        u = q
        const h = l.value
        $t && Hc(rn(h.fullPath, $.delta), ls()),
          C(q, h)
            .catch((m) =>
              it(m, 12)
                ? m
                : it(m, 2)
                ? (J(m.to, q)
                    .then((v) => {
                      it(v, 20) && !$.delta && $.type === vi.pop && r.go(-1, !1)
                    })
                    .catch(ui),
                  Promise.reject())
                : ($.delta && r.go(-$.delta, !1), F(m, q, h))
            )
            .then((m) => {
              ;(m = m || K(q, h, !1)),
                m &&
                  ($.delta && !it(m, 8)
                    ? r.go(-$.delta, !1)
                    : $.type === vi.pop && it(m, 20) && r.go(-1, !1)),
                D(q, h, m)
            })
            .catch(ui)
      }))
  }
  let pe = ri(),
    re = ri(),
    ie
  function F(P, j, $) {
    fe(P)
    const q = re.list()
    return (
      q.length ? q.forEach((se) => se(P, j, $)) : console.error(P),
      Promise.reject(P)
    )
  }
  function me() {
    return ie && l.value !== ft
      ? Promise.resolve()
      : new Promise((P, j) => {
          pe.add([P, j])
        })
  }
  function fe(P) {
    return (
      ie ||
        ((ie = !P),
        le(),
        pe.list().forEach(([j, $]) => (P ? $(P) : j())),
        pe.reset()),
      P
    )
  }
  function _e(P, j, $, q) {
    const { scrollBehavior: se } = e
    if (!$t || !se) return Promise.resolve()
    const h =
      (!$ && Vc(rn(P.fullPath, 0))) ||
      ((q || !$) && history.state && history.state.scroll) ||
      null
    return bi()
      .then(() => se(P, j, h))
      .then((m) => m && Fc(m))
      .catch((m) => F(m, P, j))
  }
  const xe = (P) => r.go(P)
  let At
  const Lt = new Set(),
    wi = {
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
            ((At = !0), y(r.location).catch((se) => {}))
        const $ = {}
        for (const se in ft)
          Object.defineProperty($, se, {
            get: () => l.value[se],
            enumerable: !0,
          })
        P.provide(mr, j), P.provide(Ro, qn($)), P.provide(Fs, l)
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
                (ie = !1)),
              q()
          })
      },
    }
  function Ce(P) {
    return P.reduce((j, $) => j.then(() => T($)), Promise.resolve())
  }
  return wi
}
function Lu(e, t) {
  const i = [],
    s = [],
    r = [],
    n = Math.max(t.matched.length, e.matched.length)
  for (let o = 0; o < n; o++) {
    const a = t.matched[o]
    a && (e.matched.find((u) => Wt(u, a)) ? s.push(a) : i.push(a))
    const l = e.matched[o]
    l && (t.matched.find((u) => Wt(u, l)) || r.push(l))
  }
  return [i, s, r]
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
    Object.keys(t).forEach((i) => {
      typeof e[i] > 'u'
        ? (e[i] = t[i])
        : bn(t[i]) && bn(e[i]) && Object.keys(t[i]).length > 0 && gr(e[i], t[i])
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
function at() {
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
  Object.keys(t).forEach((i) => {
    try {
      t[i] = null
    } catch {}
    try {
      delete t[i]
    } catch {}
  })
}
function Hs(e, t) {
  return t === void 0 && (t = 0), setTimeout(e, t)
}
function Ct() {
  return Date.now()
}
function $u(e) {
  const t = He()
  let i
  return (
    t.getComputedStyle && (i = t.getComputedStyle(e, null)),
    !i && e.currentStyle && (i = e.currentStyle),
    i || (i = e.style),
    i
  )
}
function Du(e, t) {
  t === void 0 && (t = 'x')
  const i = He()
  let s, r, n
  const o = $u(e)
  return (
    i.WebKitCSSMatrix
      ? ((r = o.transform || o.webkitTransform),
        r.split(',').length > 6 &&
          (r = r
            .split(', ')
            .map((a) => a.replace(',', '.'))
            .join(', ')),
        (n = new i.WebKitCSSMatrix(r === 'none' ? '' : r)))
      : ((n =
          o.MozTransform ||
          o.OTransform ||
          o.MsTransform ||
          o.msTransform ||
          o.transform ||
          o
            .getPropertyValue('transform')
            .replace('translate(', 'matrix(1, 0, 0, 1,')),
        (s = n.toString().split(','))),
    t === 'x' &&
      (i.WebKitCSSMatrix
        ? (r = n.m41)
        : s.length === 16
        ? (r = parseFloat(s[12]))
        : (r = parseFloat(s[4]))),
    t === 'y' &&
      (i.WebKitCSSMatrix
        ? (r = n.m42)
        : s.length === 16
        ? (r = parseFloat(s[13]))
        : (r = parseFloat(s[5]))),
    r || 0
  )
}
function Ci(e) {
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
  for (let i = 1; i < arguments.length; i += 1) {
    const s = i < 0 || arguments.length <= i ? void 0 : arguments[i]
    if (s != null && !Bu(s)) {
      const r = Object.keys(Object(s)).filter((n) => t.indexOf(n) < 0)
      for (let n = 0, o = r.length; n < o; n += 1) {
        const a = r[n],
          l = Object.getOwnPropertyDescriptor(s, a)
        l !== void 0 &&
          l.enumerable &&
          (Ci(e[a]) && Ci(s[a])
            ? s[a].__swiper__
              ? (e[a] = s[a])
              : Be(e[a], s[a])
            : !Ci(e[a]) && Ci(s[a])
            ? ((e[a] = {}), s[a].__swiper__ ? (e[a] = s[a]) : Be(e[a], s[a]))
            : (e[a] = s[a]))
      }
    }
  }
  return e
}
function Ii(e, t, i) {
  e.style.setProperty(t, i)
}
function zo(e) {
  let { swiper: t, targetPosition: i, side: s } = e
  const r = He(),
    n = -t.translate
  let o = null,
    a
  const l = t.params.speed
  ;(t.wrapperEl.style.scrollSnapType = 'none'),
    r.cancelAnimationFrame(t.cssModeFrameID)
  const u = i > n ? 'next' : 'prev',
    c = (f, p) => (u === 'next' && f >= p) || (u === 'prev' && f <= p),
    d = () => {
      ;(a = new Date().getTime()), o === null && (o = a)
      const f = Math.max(Math.min((a - o) / l, 1), 0),
        p = 0.5 - Math.cos(f * Math.PI) / 2
      let g = n + p * (i - n)
      if ((c(g, i) && (g = i), t.wrapperEl.scrollTo({ [s]: g }), c(g, i))) {
        ;(t.wrapperEl.style.overflow = 'hidden'),
          (t.wrapperEl.style.scrollSnapType = ''),
          setTimeout(() => {
            ;(t.wrapperEl.style.overflow = ''), t.wrapperEl.scrollTo({ [s]: g })
          }),
          r.cancelAnimationFrame(t.cssModeFrameID)
        return
      }
      t.cssModeFrameID = r.requestAnimationFrame(d)
    }
  d()
}
function nt(e, t) {
  return t === void 0 && (t = ''), [...e.children].filter((i) => i.matches(t))
}
function Gi(e) {
  try {
    console.warn(e)
    return
  } catch {}
}
function Vs(e, t) {
  t === void 0 && (t = [])
  const i = document.createElement(e)
  return i.classList.add(...(Array.isArray(t) ? t : ku(t))), i
}
function ju(e, t) {
  const i = []
  for (; e.previousElementSibling; ) {
    const s = e.previousElementSibling
    t ? s.matches(t) && i.push(s) : i.push(s), (e = s)
  }
  return i
}
function Nu(e, t) {
  const i = []
  for (; e.nextElementSibling; ) {
    const s = e.nextElementSibling
    t ? s.matches(t) && i.push(s) : i.push(s), (e = s)
  }
  return i
}
function mt(e, t) {
  return He().getComputedStyle(e, null).getPropertyValue(t)
}
function xn(e) {
  let t = e,
    i
  if (t) {
    for (i = 0; (t = t.previousSibling) !== null; ) t.nodeType === 1 && (i += 1)
    return i
  }
}
function Fu(e, t) {
  const i = []
  let s = e.parentElement
  for (; s; ) t ? s.matches(t) && i.push(s) : i.push(s), (s = s.parentElement)
  return i
}
function bs(e, t) {
  function i(s) {
    s.target === e && (t.call(e, s), e.removeEventListener('transitionend', i))
  }
  t && e.addEventListener('transitionend', i)
}
function wn(e, t, i) {
  const s = He()
  return i
    ? e[t === 'width' ? 'offsetWidth' : 'offsetHeight'] +
        parseFloat(
          s
            .getComputedStyle(e, null)
            .getPropertyValue(t === 'width' ? 'margin-right' : 'margin-top')
        ) +
        parseFloat(
          s
            .getComputedStyle(e, null)
            .getPropertyValue(t === 'width' ? 'margin-left' : 'margin-bottom')
        )
    : e.offsetWidth
}
let xs
function Hu() {
  const e = He(),
    t = at()
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
  return xs || (xs = Hu()), xs
}
let ws
function Vu(e) {
  let { userAgent: t } = e === void 0 ? {} : e
  const i = $o(),
    s = He(),
    r = s.navigator.platform,
    n = t || s.navigator.userAgent,
    o = { ios: !1, android: !1 },
    a = s.screen.width,
    l = s.screen.height,
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
      i.touch &&
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
  return e === void 0 && (e = {}), ws || (ws = Vu(e)), ws
}
let ys
function Gu() {
  const e = He()
  let t = !1
  function i() {
    const s = e.navigator.userAgent.toLowerCase()
    return (
      s.indexOf('safari') >= 0 &&
      s.indexOf('chrome') < 0 &&
      s.indexOf('android') < 0
    )
  }
  if (i()) {
    const s = String(e.navigator.userAgent)
    if (s.includes('Version/')) {
      const [r, n] = s
        .split('Version/')[1]
        .split(' ')[0]
        .split('.')
        .map((o) => Number(o))
      t = r < 16 || (r === 16 && n < 2)
    }
  }
  return {
    isSafari: t || i(),
    needPerspectiveFix: t,
    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
      e.navigator.userAgent
    ),
  }
}
function Wu() {
  return ys || (ys = Gu()), ys
}
function Uu(e) {
  let { swiper: t, on: i, emit: s } = e
  const r = He()
  let n = null,
    o = null
  const a = () => {
      !t || t.destroyed || !t.initialized || (s('beforeResize'), s('resize'))
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
      !t || t.destroyed || !t.initialized || s('orientationchange')
    }
  i('init', () => {
    if (t.params.resizeObserver && typeof r.ResizeObserver < 'u') {
      l()
      return
    }
    r.addEventListener('resize', a), r.addEventListener('orientationchange', c)
  }),
    i('destroy', () => {
      u(),
        r.removeEventListener('resize', a),
        r.removeEventListener('orientationchange', c)
    })
}
function Ku(e) {
  let { swiper: t, extendParams: i, on: s, emit: r } = e
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
  i({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
    s('init', l),
    s('destroy', u)
}
var Yu = {
  on(e, t, i) {
    const s = this
    if (!s.eventsListeners || s.destroyed || typeof t != 'function') return s
    const r = i ? 'unshift' : 'push'
    return (
      e.split(' ').forEach((n) => {
        s.eventsListeners[n] || (s.eventsListeners[n] = []),
          s.eventsListeners[n][r](t)
      }),
      s
    )
  },
  once(e, t, i) {
    const s = this
    if (!s.eventsListeners || s.destroyed || typeof t != 'function') return s
    function r() {
      s.off(e, r), r.__emitterProxy && delete r.__emitterProxy
      for (var n = arguments.length, o = new Array(n), a = 0; a < n; a++)
        o[a] = arguments[a]
      t.apply(s, o)
    }
    return (r.__emitterProxy = t), s.on(e, r, i)
  },
  onAny(e, t) {
    const i = this
    if (!i.eventsListeners || i.destroyed || typeof e != 'function') return i
    const s = t ? 'unshift' : 'push'
    return i.eventsAnyListeners.indexOf(e) < 0 && i.eventsAnyListeners[s](e), i
  },
  offAny(e) {
    const t = this
    if (!t.eventsListeners || t.destroyed || !t.eventsAnyListeners) return t
    const i = t.eventsAnyListeners.indexOf(e)
    return i >= 0 && t.eventsAnyListeners.splice(i, 1), t
  },
  off(e, t) {
    const i = this
    return (
      !i.eventsListeners ||
        i.destroyed ||
        !i.eventsListeners ||
        e.split(' ').forEach((s) => {
          typeof t > 'u'
            ? (i.eventsListeners[s] = [])
            : i.eventsListeners[s] &&
              i.eventsListeners[s].forEach((r, n) => {
                ;(r === t || (r.__emitterProxy && r.__emitterProxy === t)) &&
                  i.eventsListeners[s].splice(n, 1)
              })
        }),
      i
    )
  },
  emit() {
    const e = this
    if (!e.eventsListeners || e.destroyed || !e.eventsListeners) return e
    let t, i, s
    for (var r = arguments.length, n = new Array(r), o = 0; o < r; o++)
      n[o] = arguments[o]
    return (
      typeof n[0] == 'string' || Array.isArray(n[0])
        ? ((t = n[0]), (i = n.slice(1, n.length)), (s = e))
        : ((t = n[0].events), (i = n[0].data), (s = n[0].context || e)),
      i.unshift(s),
      (Array.isArray(t) ? t : t.split(' ')).forEach((l) => {
        e.eventsAnyListeners &&
          e.eventsAnyListeners.length &&
          e.eventsAnyListeners.forEach((u) => {
            u.apply(s, [l, ...i])
          }),
          e.eventsListeners &&
            e.eventsListeners[l] &&
            e.eventsListeners[l].forEach((u) => {
              u.apply(s, i)
            })
      }),
      e
    )
  },
}
function Xu() {
  const e = this
  let t, i
  const s = e.el
  typeof e.params.width < 'u' && e.params.width !== null
    ? (t = e.params.width)
    : (t = s.clientWidth),
    typeof e.params.height < 'u' && e.params.height !== null
      ? (i = e.params.height)
      : (i = s.clientHeight),
    !((t === 0 && e.isHorizontal()) || (i === 0 && e.isVertical())) &&
      ((t =
        t -
        parseInt(mt(s, 'padding-left') || 0, 10) -
        parseInt(mt(s, 'padding-right') || 0, 10)),
      (i =
        i -
        parseInt(mt(s, 'padding-top') || 0, 10) -
        parseInt(mt(s, 'padding-bottom') || 0, 10)),
      Number.isNaN(t) && (t = 0),
      Number.isNaN(i) && (i = 0),
      Object.assign(e, { width: t, height: i, size: e.isHorizontal() ? t : i }))
}
function Qu() {
  const e = this
  function t(C, D) {
    return parseFloat(C.getPropertyValue(e.getDirectionLabel(D)) || 0)
  }
  const i = e.params,
    { wrapperEl: s, slidesEl: r, size: n, rtlTranslate: o, wrongRTL: a } = e,
    l = e.virtual && i.virtual.enabled,
    u = l ? e.virtual.slides.length : e.slides.length,
    c = nt(r, `.${e.params.slideClass}, swiper-slide`),
    d = l ? e.virtual.slides.length : c.length
  let f = []
  const p = [],
    g = []
  let x = i.slidesOffsetBefore
  typeof x == 'function' && (x = i.slidesOffsetBefore.call(e))
  let I = i.slidesOffsetAfter
  typeof I == 'function' && (I = i.slidesOffsetAfter.call(e))
  const b = e.snapGrid.length,
    E = e.slidesGrid.length
  let w = i.spaceBetween,
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
    i.centeredSlides &&
      i.cssMode &&
      (Ii(s, '--swiper-centered-offset-before', ''),
      Ii(s, '--swiper-centered-offset-after', ''))
  const J = i.grid && i.grid.rows > 1 && e.grid
  J ? e.grid.initSlides(c) : e.grid && e.grid.unsetSlides()
  let k
  const T =
    i.slidesPerView === 'auto' &&
    i.breakpoints &&
    Object.keys(i.breakpoints).filter(
      (C) => typeof i.breakpoints[C].slidesPerView < 'u'
    ).length > 0
  for (let C = 0; C < d; C += 1) {
    k = 0
    let D
    if (
      (c[C] && (D = c[C]),
      J && e.grid.updateSlide(C, D, c),
      !(c[C] && mt(D, 'display') === 'none'))
    ) {
      if (i.slidesPerView === 'auto') {
        T && (c[C].style[e.getDirectionLabel('width')] = '')
        const K = getComputedStyle(D),
          V = D.style.transform,
          le = D.style.webkitTransform
        if (
          (V && (D.style.transform = 'none'),
          le && (D.style.webkitTransform = 'none'),
          i.roundLengths)
        )
          k = e.isHorizontal() ? wn(D, 'width', !0) : wn(D, 'height', !0)
        else {
          const pe = t(K, 'width'),
            re = t(K, 'padding-left'),
            ie = t(K, 'padding-right'),
            F = t(K, 'margin-left'),
            me = t(K, 'margin-right'),
            fe = K.getPropertyValue('box-sizing')
          if (fe && fe === 'border-box') k = pe + F + me
          else {
            const { clientWidth: _e, offsetWidth: xe } = D
            k = pe + re + ie + F + me + (xe - _e)
          }
        }
        V && (D.style.transform = V),
          le && (D.style.webkitTransform = le),
          i.roundLengths && (k = Math.floor(k))
      } else
        (k = (n - (i.slidesPerView - 1) * w) / i.slidesPerView),
          i.roundLengths && (k = Math.floor(k)),
          c[C] && (c[C].style[e.getDirectionLabel('width')] = `${k}px`)
      c[C] && (c[C].swiperSlideSize = k),
        g.push(k),
        i.centeredSlides
          ? ((y = y + k / 2 + L / 2 + w),
            L === 0 && C !== 0 && (y = y - n / 2 - w),
            C === 0 && (y = y - n / 2 - w),
            Math.abs(y) < 1 / 1e3 && (y = 0),
            i.roundLengths && (y = Math.floor(y)),
            N % i.slidesPerGroup === 0 && f.push(y),
            p.push(y))
          : (i.roundLengths && (y = Math.floor(y)),
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
      (i.effect === 'slide' || i.effect === 'coverflow') &&
      (s.style.width = `${e.virtualSize + w}px`),
    i.setWrapperSize &&
      (s.style[e.getDirectionLabel('width')] = `${e.virtualSize + w}px`),
    J && e.grid.updateWrapperSize(k, f),
    !i.centeredSlides)
  ) {
    const C = []
    for (let D = 0; D < f.length; D += 1) {
      let K = f[D]
      i.roundLengths && (K = Math.floor(K)),
        f[D] <= e.virtualSize - n && C.push(K)
    }
    ;(f = C),
      Math.floor(e.virtualSize - n) - Math.floor(f[f.length - 1]) > 1 &&
        f.push(e.virtualSize - n)
  }
  if (l && i.loop) {
    const C = g[0] + w
    if (i.slidesPerGroup > 1) {
      const D = Math.ceil(
          (e.virtual.slidesBefore + e.virtual.slidesAfter) / i.slidesPerGroup
        ),
        K = C * i.slidesPerGroup
      for (let V = 0; V < D; V += 1) f.push(f[f.length - 1] + K)
    }
    for (let D = 0; D < e.virtual.slidesBefore + e.virtual.slidesAfter; D += 1)
      i.slidesPerGroup === 1 && f.push(f[f.length - 1] + C),
        p.push(p[p.length - 1] + C),
        (e.virtualSize += C)
  }
  if ((f.length === 0 && (f = [0]), w !== 0)) {
    const C =
      e.isHorizontal() && o ? 'marginLeft' : e.getDirectionLabel('marginRight')
    c.filter((D, K) =>
      !i.cssMode || i.loop ? !0 : K !== c.length - 1
    ).forEach((D) => {
      D.style[C] = `${w}px`
    })
  }
  if (i.centeredSlides && i.centeredSlidesBounds) {
    let C = 0
    g.forEach((K) => {
      C += K + (w || 0)
    }),
      (C -= w)
    const D = C - n
    f = f.map((K) => (K <= 0 ? -x : K > D ? D + I : K))
  }
  if (i.centerInsufficientSlides) {
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
    i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
  ) {
    Ii(s, '--swiper-centered-offset-before', `${-f[0]}px`),
      Ii(
        s,
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
    i.watchSlidesProgress && e.updateSlidesOffset(),
    e.emit('slidesUpdated'),
    !l && !i.cssMode && (i.effect === 'slide' || i.effect === 'fade'))
  ) {
    const C = `${i.containerModifierClass}backface-hidden`,
      D = e.el.classList.contains(C)
    d <= i.maxBackfaceHiddenSlides
      ? D || e.el.classList.add(C)
      : D && e.el.classList.remove(C)
  }
}
function Ju(e) {
  const t = this,
    i = [],
    s = t.virtual && t.params.virtual.enabled
  let r = 0,
    n
  typeof e == 'number'
    ? t.setTransition(e)
    : e === !0 && t.setTransition(t.params.speed)
  const o = (a) => (s ? t.slides[t.getSlideIndexByData(a)] : t.slides[a])
  if (t.params.slidesPerView !== 'auto' && t.params.slidesPerView > 1)
    if (t.params.centeredSlides)
      (t.visibleSlides || []).forEach((a) => {
        i.push(a)
      })
    else
      for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
        const a = t.activeIndex + n
        if (a > t.slides.length && !s) break
        i.push(o(a))
      }
  else i.push(o(t.activeIndex))
  for (n = 0; n < i.length; n += 1)
    if (typeof i[n] < 'u') {
      const a = i[n].offsetHeight
      r = a > r ? a : r
    }
  ;(r || r === 0) && (t.wrapperEl.style.height = `${r}px`)
}
function Zu() {
  const e = this,
    t = e.slides,
    i = e.isElement
      ? e.isHorizontal()
        ? e.wrapperEl.offsetLeft
        : e.wrapperEl.offsetTop
      : 0
  for (let s = 0; s < t.length; s += 1)
    t[s].swiperSlideOffset =
      (e.isHorizontal() ? t[s].offsetLeft : t[s].offsetTop) -
      i -
      e.cssOverflowAdjustment()
}
function ed(e) {
  e === void 0 && (e = (this && this.translate) || 0)
  const t = this,
    i = t.params,
    { slides: s, rtlTranslate: r, snapGrid: n } = t
  if (s.length === 0) return
  typeof s[0].swiperSlideOffset > 'u' && t.updateSlidesOffset()
  let o = -e
  r && (o = e),
    s.forEach((l) => {
      l.classList.remove(i.slideVisibleClass, i.slideFullyVisibleClass)
    }),
    (t.visibleSlidesIndexes = []),
    (t.visibleSlides = [])
  let a = i.spaceBetween
  typeof a == 'string' && a.indexOf('%') >= 0
    ? (a = (parseFloat(a.replace('%', '')) / 100) * t.size)
    : typeof a == 'string' && (a = parseFloat(a))
  for (let l = 0; l < s.length; l += 1) {
    const u = s[l]
    let c = u.swiperSlideOffset
    i.cssMode && i.centeredSlides && (c -= s[0].swiperSlideOffset)
    const d =
        (o + (i.centeredSlides ? t.minTranslate() : 0) - c) /
        (u.swiperSlideSize + a),
      f =
        (o - n[0] + (i.centeredSlides ? t.minTranslate() : 0) - c) /
        (u.swiperSlideSize + a),
      p = -(o - c),
      g = p + t.slidesSizesGrid[l],
      x = p >= 0 && p <= t.size - t.slidesSizesGrid[l]
    ;((p >= 0 && p < t.size - 1) ||
      (g > 1 && g <= t.size) ||
      (p <= 0 && g >= t.size)) &&
      (t.visibleSlides.push(u),
      t.visibleSlidesIndexes.push(l),
      s[l].classList.add(i.slideVisibleClass)),
      x && s[l].classList.add(i.slideFullyVisibleClass),
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
  const i = t.params,
    s = t.maxTranslate() - t.minTranslate()
  let { progress: r, isBeginning: n, isEnd: o, progressLoop: a } = t
  const l = n,
    u = o
  if (s === 0) (r = 0), (n = !0), (o = !0)
  else {
    r = (e - t.minTranslate()) / s
    const c = Math.abs(e - t.minTranslate()) < 1,
      d = Math.abs(e - t.maxTranslate()) < 1
    ;(n = c || r <= 0), (o = d || r >= 1), c && (r = 0), d && (r = 1)
  }
  if (i.loop) {
    const c = t.getSlideIndexByData(0),
      d = t.getSlideIndexByData(t.slides.length - 1),
      f = t.slidesGrid[c],
      p = t.slidesGrid[d],
      g = t.slidesGrid[t.slidesGrid.length - 1],
      x = Math.abs(e)
    x >= f ? (a = (x - f) / g) : (a = (x + g - p) / g), a > 1 && (a -= 1)
  }
  Object.assign(t, { progress: r, progressLoop: a, isBeginning: n, isEnd: o }),
    (i.watchSlidesProgress || (i.centeredSlides && i.autoHeight)) &&
      t.updateSlidesProgress(e),
    n && !l && t.emit('reachBeginning toEdge'),
    o && !u && t.emit('reachEnd toEdge'),
    ((l && !n) || (u && !o)) && t.emit('fromEdge'),
    t.emit('progress', r)
}
function id() {
  const e = this,
    { slides: t, params: i, slidesEl: s, activeIndex: r } = e,
    n = e.virtual && i.virtual.enabled,
    o = e.grid && i.grid && i.grid.rows > 1,
    a = (d) => nt(s, `.${i.slideClass}${d}, swiper-slide${d}`)[0]
  t.forEach((d) => {
    d.classList.remove(i.slideActiveClass, i.slideNextClass, i.slidePrevClass)
  })
  let l, u, c
  if (n)
    if (i.loop) {
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
    (l.classList.add(i.slideActiveClass),
    o
      ? (c && c.classList.add(i.slideNextClass),
        u && u.classList.add(i.slidePrevClass))
      : ((c = Nu(l, `.${i.slideClass}, swiper-slide`)[0]),
        i.loop && !c && (c = t[0]),
        c && c.classList.add(i.slideNextClass),
        (u = ju(l, `.${i.slideClass}, swiper-slide`)[0]),
        i.loop && !u === 0 && (u = t[t.length - 1]),
        u && u.classList.add(i.slidePrevClass))),
    e.emitSlidesClasses()
}
const Di = (e, t) => {
    if (!e || e.destroyed || !e.params) return
    const i = () => (e.isElement ? 'swiper-slide' : `.${e.params.slideClass}`),
      s = t.closest(i())
    if (s) {
      let r = s.querySelector(`.${e.params.lazyPreloaderClass}`)
      !r &&
        e.isElement &&
        (s.shadowRoot
          ? (r = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`))
          : requestAnimationFrame(() => {
              s.shadowRoot &&
                ((r = s.shadowRoot.querySelector(
                  `.${e.params.lazyPreloaderClass}`
                )),
                r && r.remove())
            })),
        r && r.remove()
    }
  },
  _s = (e, t) => {
    if (!e.slides[t]) return
    const i = e.slides[t].querySelector('[loading="lazy"]')
    i && i.removeAttribute('loading')
  },
  qs = (e) => {
    if (!e || e.destroyed || !e.params) return
    let t = e.params.lazyPreloadPrevNext
    const i = e.slides.length
    if (!i || !t || t < 0) return
    t = Math.min(t, i)
    const s =
        e.params.slidesPerView === 'auto'
          ? e.slidesPerViewDynamic()
          : Math.ceil(e.params.slidesPerView),
      r = e.activeIndex
    if (e.params.grid && e.params.grid.rows > 1) {
      const o = r,
        a = [o - t]
      a.push(...Array.from({ length: t }).map((l, u) => o + s + u)),
        e.slides.forEach((l, u) => {
          a.includes(l.column) && _s(e, u)
        })
      return
    }
    const n = r + s - 1
    if (e.params.rewind || e.params.loop)
      for (let o = r - t; o <= n + t; o += 1) {
        const a = ((o % i) + i) % i
        ;(a < r || a > n) && _s(e, a)
      }
    else
      for (let o = Math.max(r - t, 0); o <= Math.min(n + t, i - 1); o += 1)
        o !== r && (o > n || o < r) && _s(e, o)
  }
function sd(e) {
  const { slidesGrid: t, params: i } = e,
    s = e.rtlTranslate ? e.translate : -e.translate
  let r
  for (let n = 0; n < t.length; n += 1)
    typeof t[n + 1] < 'u'
      ? s >= t[n] && s < t[n + 1] - (t[n + 1] - t[n]) / 2
        ? (r = n)
        : s >= t[n] && s < t[n + 1] && (r = n + 1)
      : s >= t[n] && (r = n)
  return i.normalizeSlideIndex && (r < 0 || typeof r > 'u') && (r = 0), r
}
function rd(e) {
  const t = this,
    i = t.rtlTranslate ? t.translate : -t.translate,
    { snapGrid: s, params: r, activeIndex: n, realIndex: o, snapIndex: a } = t
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
  if ((typeof l > 'u' && (l = sd(t)), s.indexOf(i) >= 0)) u = s.indexOf(i)
  else {
    const p = Math.min(r.slidesPerGroupSkip, l)
    u = p + Math.floor((l - p) / r.slidesPerGroup)
  }
  if ((u >= s.length && (u = s.length - 1), l === n && !t.params.loop)) {
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
    t.initialized && qs(t),
    t.emit('activeIndexChange'),
    t.emit('snapIndexChange'),
    (t.initialized || t.params.runCallbacksOnInit) &&
      (o !== f && t.emit('realIndexChange'), t.emit('slideChange'))
}
function nd(e, t) {
  const i = this,
    s = i.params
  let r = e.closest(`.${s.slideClass}, swiper-slide`)
  !r &&
    i.isElement &&
    t &&
    t.length > 1 &&
    t.includes(e) &&
    [...t.slice(t.indexOf(e) + 1, t.length)].forEach((a) => {
      !r && a.matches && a.matches(`.${s.slideClass}, swiper-slide`) && (r = a)
    })
  let n = !1,
    o
  if (r) {
    for (let a = 0; a < i.slides.length; a += 1)
      if (i.slides[a] === r) {
        ;(n = !0), (o = a)
        break
      }
  }
  if (r && n)
    (i.clickedSlide = r),
      i.virtual && i.params.virtual.enabled
        ? (i.clickedIndex = parseInt(
            r.getAttribute('data-swiper-slide-index'),
            10
          ))
        : (i.clickedIndex = o)
  else {
    ;(i.clickedSlide = void 0), (i.clickedIndex = void 0)
    return
  }
  s.slideToClickedSlide &&
    i.clickedIndex !== void 0 &&
    i.clickedIndex !== i.activeIndex &&
    i.slideToClickedSlide()
}
var od = {
  updateSize: Xu,
  updateSlides: Qu,
  updateAutoHeight: Ju,
  updateSlidesOffset: Zu,
  updateSlidesProgress: ed,
  updateProgress: td,
  updateSlidesClasses: id,
  updateActiveIndex: rd,
  updateClickedSlide: nd,
}
function ld(e) {
  e === void 0 && (e = this.isHorizontal() ? 'x' : 'y')
  const t = this,
    { params: i, rtlTranslate: s, translate: r, wrapperEl: n } = t
  if (i.virtualTranslate) return s ? -r : r
  if (i.cssMode) return r
  let o = Du(n, e)
  return (o += t.cssOverflowAdjustment()), s && (o = -o), o || 0
}
function ad(e, t) {
  const i = this,
    { rtlTranslate: s, params: r, wrapperEl: n, progress: o } = i
  let a = 0,
    l = 0
  const u = 0
  i.isHorizontal() ? (a = s ? -e : e) : (l = e),
    r.roundLengths && ((a = Math.floor(a)), (l = Math.floor(l))),
    (i.previousTranslate = i.translate),
    (i.translate = i.isHorizontal() ? a : l),
    r.cssMode
      ? (n[i.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = i.isHorizontal()
          ? -a
          : -l)
      : r.virtualTranslate ||
        (i.isHorizontal()
          ? (a -= i.cssOverflowAdjustment())
          : (l -= i.cssOverflowAdjustment()),
        (n.style.transform = `translate3d(${a}px, ${l}px, ${u}px)`))
  let c
  const d = i.maxTranslate() - i.minTranslate()
  d === 0 ? (c = 0) : (c = (e - i.minTranslate()) / d),
    c !== o && i.updateProgress(e),
    i.emit('setTranslate', i.translate, t)
}
function cd() {
  return -this.snapGrid[0]
}
function ud() {
  return -this.snapGrid[this.snapGrid.length - 1]
}
function dd(e, t, i, s, r) {
  e === void 0 && (e = 0),
    t === void 0 && (t = this.params.speed),
    i === void 0 && (i = !0),
    s === void 0 && (s = !0)
  const n = this,
    { params: o, wrapperEl: a } = n
  if (n.animating && o.preventInteractionOnTransition) return !1
  const l = n.minTranslate(),
    u = n.maxTranslate()
  let c
  if (
    (s && e > l ? (c = l) : s && e < u ? (c = u) : (c = e),
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
        i && (n.emit('beforeTransitionStart', t, r), n.emit('transitionEnd')))
      : (n.setTransition(t),
        n.setTranslate(c),
        i && (n.emit('beforeTransitionStart', t, r), n.emit('transitionStart')),
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
                  i && n.emit('transitionEnd')))
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
  const i = this
  i.params.cssMode ||
    ((i.wrapperEl.style.transitionDuration = `${e}ms`),
    (i.wrapperEl.style.transitionDelay = e === 0 ? '0ms' : '')),
    i.emit('setTransition', e, t)
}
function Do(e) {
  let { swiper: t, runCallbacks: i, direction: s, step: r } = e
  const { activeIndex: n, previousIndex: o } = t
  let a = s
  if (
    (a || (n > o ? (a = 'next') : n < o ? (a = 'prev') : (a = 'reset')),
    t.emit(`transition${r}`),
    i && n !== o)
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
  const i = this,
    { params: s } = i
  s.cssMode ||
    (s.autoHeight && i.updateAutoHeight(),
    Do({ swiper: i, runCallbacks: e, direction: t, step: 'Start' }))
}
function md(e, t) {
  e === void 0 && (e = !0)
  const i = this,
    { params: s } = i
  ;(i.animating = !1),
    !s.cssMode &&
      (i.setTransition(0),
      Do({ swiper: i, runCallbacks: e, direction: t, step: 'End' }))
}
var gd = { setTransition: pd, transitionStart: hd, transitionEnd: md }
function vd(e, t, i, s, r) {
  e === void 0 && (e = 0),
    t === void 0 && (t = this.params.speed),
    i === void 0 && (i = !0),
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
  if ((n.animating && a.preventInteractionOnTransition) || (!g && !s && !r))
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
  o !== (c || 0) && i && n.emit('beforeSlideChangeStart'), n.updateProgress(b)
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
      E !== 'reset' && (n.transitionStart(i, E), n.transitionEnd(i, E)),
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
    n.emit('beforeTransitionStart', t, s),
    n.transitionStart(i, E),
    t === 0
      ? n.transitionEnd(i, E)
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
                n.transitionEnd(i, E)))
          }),
        n.wrapperEl.addEventListener(
          'transitionend',
          n.onSlideToWrapperTransitionEnd
        )),
    !0
  )
}
function bd(e, t, i, s) {
  e === void 0 && (e = 0),
    t === void 0 && (t = this.params.speed),
    i === void 0 && (i = !0),
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
      r.slideTo(o, t, i, s)
    }),
    r
  )
}
function xd(e, t, i) {
  e === void 0 && (e = this.params.speed), t === void 0 && (t = !0)
  const s = this,
    { enabled: r, params: n, animating: o } = s
  if (!r) return s
  let a = n.slidesPerGroup
  n.slidesPerView === 'auto' &&
    n.slidesPerGroup === 1 &&
    n.slidesPerGroupAuto &&
    (a = Math.max(s.slidesPerViewDynamic('current', !0), 1))
  const l = s.activeIndex < n.slidesPerGroupSkip ? 1 : a,
    u = s.virtual && n.virtual.enabled
  if (n.loop) {
    if (o && !u && n.loopPreventsSliding) return !1
    if (
      (s.loopFix({ direction: 'next' }),
      (s._clientLeft = s.wrapperEl.clientLeft),
      s.activeIndex === s.slides.length - 1 && n.cssMode)
    )
      return (
        requestAnimationFrame(() => {
          s.slideTo(s.activeIndex + l, e, t, i)
        }),
        !0
      )
  }
  return n.rewind && s.isEnd
    ? s.slideTo(0, e, t, i)
    : s.slideTo(s.activeIndex + l, e, t, i)
}
function wd(e, t, i) {
  e === void 0 && (e = this.params.speed), t === void 0 && (t = !0)
  const s = this,
    {
      params: r,
      snapGrid: n,
      slidesGrid: o,
      rtlTranslate: a,
      enabled: l,
      animating: u,
    } = s
  if (!l) return s
  const c = s.virtual && r.virtual.enabled
  if (r.loop) {
    if (u && !c && r.loopPreventsSliding) return !1
    s.loopFix({ direction: 'prev' }), (s._clientLeft = s.wrapperEl.clientLeft)
  }
  const d = a ? s.translate : -s.translate
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
      I < 0 && (I = s.activeIndex - 1),
      r.slidesPerView === 'auto' &&
        r.slidesPerGroup === 1 &&
        r.slidesPerGroupAuto &&
        ((I = I - s.slidesPerViewDynamic('previous', !0) + 1),
        (I = Math.max(I, 0)))),
    r.rewind && s.isBeginning)
  ) {
    const b =
      s.params.virtual && s.params.virtual.enabled && s.virtual
        ? s.virtual.slides.length - 1
        : s.slides.length - 1
    return s.slideTo(b, e, t, i)
  } else if (r.loop && s.activeIndex === 0 && r.cssMode)
    return (
      requestAnimationFrame(() => {
        s.slideTo(I, e, t, i)
      }),
      !0
    )
  return s.slideTo(I, e, t, i)
}
function yd(e, t, i) {
  e === void 0 && (e = this.params.speed), t === void 0 && (t = !0)
  const s = this
  return s.slideTo(s.activeIndex, e, t, i)
}
function _d(e, t, i, s) {
  e === void 0 && (e = this.params.speed),
    t === void 0 && (t = !0),
    s === void 0 && (s = 0.5)
  const r = this
  let n = r.activeIndex
  const o = Math.min(r.params.slidesPerGroupSkip, n),
    a = o + Math.floor((n - o) / r.params.slidesPerGroup),
    l = r.rtlTranslate ? r.translate : -r.translate
  if (l >= r.snapGrid[a]) {
    const u = r.snapGrid[a],
      c = r.snapGrid[a + 1]
    l - u > (c - u) * s && (n += r.params.slidesPerGroup)
  } else {
    const u = r.snapGrid[a - 1],
      c = r.snapGrid[a]
    l - u <= (c - u) * s && (n -= r.params.slidesPerGroup)
  }
  return (
    (n = Math.max(n, 0)),
    (n = Math.min(n, r.slidesGrid.length - 1)),
    r.slideTo(n, e, t, i)
  )
}
function Sd() {
  const e = this,
    { params: t, slidesEl: i } = e,
    s = t.slidesPerView === 'auto' ? e.slidesPerViewDynamic() : t.slidesPerView
  let r = e.clickedIndex,
    n
  const o = e.isElement ? 'swiper-slide' : `.${t.slideClass}`
  if (t.loop) {
    if (e.animating) return
    ;(n = parseInt(e.clickedSlide.getAttribute('data-swiper-slide-index'), 10)),
      t.centeredSlides
        ? r < e.loopedSlides - s / 2 ||
          r > e.slides.length - e.loopedSlides + s / 2
          ? (e.loopFix(),
            (r = e.getSlideIndex(
              nt(i, `${o}[data-swiper-slide-index="${n}"]`)[0]
            )),
            Hs(() => {
              e.slideTo(r)
            }))
          : e.slideTo(r)
        : r > e.slides.length - s
        ? (e.loopFix(),
          (r = e.getSlideIndex(
            nt(i, `${o}[data-swiper-slide-index="${n}"]`)[0]
          )),
          Hs(() => {
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
    { params: i, slidesEl: s } = t
  if (!i.loop || (t.virtual && t.params.virtual.enabled)) return
  const r = () => {
      nt(s, `.${i.slideClass}, swiper-slide`).forEach((d, f) => {
        d.setAttribute('data-swiper-slide-index', f)
      })
    },
    n = t.grid && i.grid && i.grid.rows > 1,
    o = i.slidesPerGroup * (n ? i.grid.rows : 1),
    a = t.slides.length % o !== 0,
    l = n && t.slides.length % i.grid.rows !== 0,
    u = (c) => {
      for (let d = 0; d < c; d += 1) {
        const f = t.isElement
          ? Vs('swiper-slide', [i.slideBlankClass])
          : Vs('div', [i.slideClass, i.slideBlankClass])
        t.slidesEl.append(f)
      }
    }
  if (a) {
    if (i.loopAddBlankSlides) {
      const c = o - (t.slides.length % o)
      u(c), t.recalcSlides(), t.updateSlides()
    } else
      Gi(
        'Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)'
      )
    r()
  } else if (l) {
    if (i.loopAddBlankSlides) {
      const c = i.grid.rows - (t.slides.length % i.grid.rows)
      u(c), t.recalcSlides(), t.updateSlides()
    } else
      Gi(
        'Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)'
      )
    r()
  } else r()
  t.loopFix({
    slideRealIndex: e,
    direction: i.centeredSlides ? void 0 : 'next',
  })
}
function Pd(e) {
  let {
    slideRealIndex: t,
    slideTo: i = !0,
    direction: s,
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
    i &&
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
    ? Gi(
        'Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters'
      )
    : E &&
      p.grid.fill === 'row' &&
      Gi(
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
  const N = s === 'next' || !s,
    J = s === 'prev' || !s
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
    i)
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
      direction: s,
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
              slideTo: le.params.slidesPerView === p.slidesPerView ? i : !1,
            })
        })
      : l.controller.control instanceof l.constructor &&
        l.controller.control.params.loop &&
        l.controller.control.loopFix({
          ...V,
          slideTo:
            l.controller.control.params.slidesPerView === p.slidesPerView
              ? i
              : !1,
        })
  }
  l.emit('loopFix')
}
function Cd() {
  const e = this,
    { params: t, slidesEl: i } = e
  if (!t.loop || (e.virtual && e.params.virtual.enabled)) return
  e.recalcSlides()
  const s = []
  e.slides.forEach((r) => {
    const n =
      typeof r.swiperSlideIndex > 'u'
        ? r.getAttribute('data-swiper-slide-index') * 1
        : r.swiperSlideIndex
    s[n] = r
  }),
    e.slides.forEach((r) => {
      r.removeAttribute('data-swiper-slide-index')
    }),
    s.forEach((r) => {
      i.append(r)
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
  const i = t.params.touchEventsTarget === 'container' ? t.el : t.wrapperEl
  t.isElement && (t.__preventObserver__ = !0),
    (i.style.cursor = 'move'),
    (i.style.cursor = e ? 'grabbing' : 'grab'),
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
  function i(s) {
    if (!s || s === at() || s === He()) return null
    s.assignedSlot && (s = s.assignedSlot)
    const r = s.closest(e)
    return !r && !s.getRootNode ? null : r || i(s.getRootNode().host)
  }
  return i(t)
}
function yn(e, t, i) {
  const s = He(),
    { params: r } = e,
    n = r.edgeSwipeDetection,
    o = r.edgeSwipeThreshold
  return n && (i <= o || i >= s.innerWidth - o)
    ? n === 'prevent'
      ? (t.preventDefault(), !0)
      : !1
    : !0
}
function Rd(e) {
  const t = this,
    i = at()
  let s = e
  s.originalEvent && (s = s.originalEvent)
  const r = t.touchEventsData
  if (s.type === 'pointerdown') {
    if (r.pointerId !== null && r.pointerId !== s.pointerId) return
    r.pointerId = s.pointerId
  } else
    s.type === 'touchstart' &&
      s.targetTouches.length === 1 &&
      (r.touchId = s.targetTouches[0].identifier)
  if (s.type === 'touchstart') {
    yn(t, s, s.targetTouches[0].pageX)
    return
  }
  const { params: n, touches: o, enabled: a } = t
  if (
    !a ||
    (!n.simulateTouch && s.pointerType === 'mouse') ||
    (t.animating && n.preventInteractionOnTransition)
  )
    return
  !t.animating && n.cssMode && n.loop && t.loopFix()
  let l = s.target
  if (
    (n.touchEventsTarget === 'wrapper' && !t.wrapperEl.contains(l)) ||
    ('which' in s && s.which === 3) ||
    ('button' in s && s.button > 0) ||
    (r.isTouched && r.isMoved)
  )
    return
  const u = !!n.noSwipingClass && n.noSwipingClass !== '',
    c = s.composedPath ? s.composedPath() : s.path
  u && s.target && s.target.shadowRoot && c && (l = c[0])
  const d = n.noSwipingSelector ? n.noSwipingSelector : `.${n.noSwipingClass}`,
    f = !!(s.target && s.target.shadowRoot)
  if (n.noSwiping && (f ? Ld(d, l) : l.closest(d))) {
    t.allowClick = !0
    return
  }
  if (n.swipeHandler && !l.closest(n.swipeHandler)) return
  ;(o.currentX = s.pageX), (o.currentY = s.pageY)
  const p = o.currentX,
    g = o.currentY
  if (!yn(t, s, p)) return
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
    i.activeElement &&
      i.activeElement.matches(r.focusableElements) &&
      i.activeElement !== l &&
      i.activeElement.blur()
  const I = x && t.allowTouchMove && n.touchStartPreventDefault
  ;(n.touchStartForcePreventDefault || I) &&
    !l.isContentEditable &&
    s.preventDefault(),
    n.freeMode &&
      n.freeMode.enabled &&
      t.freeMode &&
      t.animating &&
      !n.cssMode &&
      t.freeMode.onTouchStart(),
    t.emit('touchStart', s)
}
function kd(e) {
  const t = at(),
    i = this,
    s = i.touchEventsData,
    { params: r, touches: n, rtlTranslate: o, enabled: a } = i
  if (!a || (!r.simulateTouch && e.pointerType === 'mouse')) return
  let l = e
  if (
    (l.originalEvent && (l = l.originalEvent),
    l.type === 'pointermove' &&
      (s.touchId !== null || l.pointerId !== s.pointerId))
  )
    return
  let u
  if (l.type === 'touchmove') {
    if (
      ((u = [...l.changedTouches].filter((N) => N.identifier === s.touchId)[0]),
      !u || u.identifier !== s.touchId)
    )
      return
  } else u = l
  if (!s.isTouched) {
    s.startMoving && s.isScrolling && i.emit('touchMoveOpposite', l)
    return
  }
  const c = u.pageX,
    d = u.pageY
  if (l.preventedByNestedSwiper) {
    ;(n.startX = c), (n.startY = d)
    return
  }
  if (!i.allowTouchMove) {
    l.target.matches(s.focusableElements) || (i.allowClick = !1),
      s.isTouched &&
        (Object.assign(n, { startX: c, startY: d, currentX: c, currentY: d }),
        (s.touchStartTime = Ct()))
    return
  }
  if (r.touchReleaseOnEdges && !r.loop) {
    if (i.isVertical()) {
      if (
        (d < n.startY && i.translate <= i.maxTranslate()) ||
        (d > n.startY && i.translate >= i.minTranslate())
      ) {
        ;(s.isTouched = !1), (s.isMoved = !1)
        return
      }
    } else if (
      (c < n.startX && i.translate <= i.maxTranslate()) ||
      (c > n.startX && i.translate >= i.minTranslate())
    )
      return
  }
  if (
    t.activeElement &&
    l.target === t.activeElement &&
    l.target.matches(s.focusableElements)
  ) {
    ;(s.isMoved = !0), (i.allowClick = !1)
    return
  }
  s.allowTouchCallbacks && i.emit('touchMove', l),
    (n.previousX = n.currentX),
    (n.previousY = n.currentY),
    (n.currentX = c),
    (n.currentY = d)
  const f = n.currentX - n.startX,
    p = n.currentY - n.startY
  if (i.params.threshold && Math.sqrt(f ** 2 + p ** 2) < i.params.threshold)
    return
  if (typeof s.isScrolling > 'u') {
    let N
    ;(i.isHorizontal() && n.currentY === n.startY) ||
    (i.isVertical() && n.currentX === n.startX)
      ? (s.isScrolling = !1)
      : f * f + p * p >= 25 &&
        ((N = (Math.atan2(Math.abs(p), Math.abs(f)) * 180) / Math.PI),
        (s.isScrolling = i.isHorizontal()
          ? N > r.touchAngle
          : 90 - N > r.touchAngle))
  }
  if (
    (s.isScrolling && i.emit('touchMoveOpposite', l),
    typeof s.startMoving > 'u' &&
      (n.currentX !== n.startX || n.currentY !== n.startY) &&
      (s.startMoving = !0),
    s.isScrolling)
  ) {
    s.isTouched = !1
    return
  }
  if (!s.startMoving) return
  ;(i.allowClick = !1),
    !r.cssMode && l.cancelable && l.preventDefault(),
    r.touchMoveStopPropagation && !r.nested && l.stopPropagation()
  let g = i.isHorizontal() ? f : p,
    x = i.isHorizontal() ? n.currentX - n.previousX : n.currentY - n.previousY
  r.oneWayMovement &&
    ((g = Math.abs(g) * (o ? 1 : -1)), (x = Math.abs(x) * (o ? 1 : -1))),
    (n.diff = g),
    (g *= r.touchRatio),
    o && ((g = -g), (x = -x))
  const I = i.touchesDirection
  ;(i.swipeDirection = g > 0 ? 'prev' : 'next'),
    (i.touchesDirection = x > 0 ? 'prev' : 'next')
  const b = i.params.loop && !r.cssMode,
    E =
      (i.touchesDirection === 'next' && i.allowSlideNext) ||
      (i.touchesDirection === 'prev' && i.allowSlidePrev)
  if (!s.isMoved) {
    if (
      (b && E && i.loopFix({ direction: i.swipeDirection }),
      (s.startTranslate = i.getTranslate()),
      i.setTransition(0),
      i.animating)
    ) {
      const N = new window.CustomEvent('transitionend', {
        bubbles: !0,
        cancelable: !0,
      })
      i.wrapperEl.dispatchEvent(N)
    }
    ;(s.allowMomentumBounce = !1),
      r.grabCursor &&
        (i.allowSlideNext === !0 || i.allowSlidePrev === !0) &&
        i.setGrabCursor(!0),
      i.emit('sliderFirstMove', l)
  }
  let w
  if (
    (new Date().getTime(),
    s.isMoved &&
      s.allowThresholdMove &&
      I !== i.touchesDirection &&
      b &&
      E &&
      Math.abs(g) >= 1)
  ) {
    Object.assign(n, {
      startX: c,
      startY: d,
      currentX: c,
      currentY: d,
      startTranslate: s.currentTranslate,
    }),
      (s.loopSwapReset = !0),
      (s.startTranslate = s.currentTranslate)
    return
  }
  i.emit('sliderMove', l),
    (s.isMoved = !0),
    (s.currentTranslate = g + s.startTranslate)
  let y = !0,
    L = r.resistanceRatio
  if (
    (r.touchReleaseOnEdges && (L = 0),
    g > 0
      ? (b &&
          E &&
          !w &&
          s.allowThresholdMove &&
          s.currentTranslate >
            (r.centeredSlides
              ? i.minTranslate() - i.slidesSizesGrid[i.activeIndex + 1]
              : i.minTranslate()) &&
          i.loopFix({
            direction: 'prev',
            setTranslate: !0,
            activeSlideIndex: 0,
          }),
        s.currentTranslate > i.minTranslate() &&
          ((y = !1),
          r.resistance &&
            (s.currentTranslate =
              i.minTranslate() -
              1 +
              (-i.minTranslate() + s.startTranslate + g) ** L)))
      : g < 0 &&
        (b &&
          E &&
          !w &&
          s.allowThresholdMove &&
          s.currentTranslate <
            (r.centeredSlides
              ? i.maxTranslate() +
                i.slidesSizesGrid[i.slidesSizesGrid.length - 1]
              : i.maxTranslate()) &&
          i.loopFix({
            direction: 'next',
            setTranslate: !0,
            activeSlideIndex:
              i.slides.length -
              (r.slidesPerView === 'auto'
                ? i.slidesPerViewDynamic()
                : Math.ceil(parseFloat(r.slidesPerView, 10))),
          }),
        s.currentTranslate < i.maxTranslate() &&
          ((y = !1),
          r.resistance &&
            (s.currentTranslate =
              i.maxTranslate() +
              1 -
              (i.maxTranslate() - s.startTranslate - g) ** L))),
    y && (l.preventedByNestedSwiper = !0),
    !i.allowSlideNext &&
      i.swipeDirection === 'next' &&
      s.currentTranslate < s.startTranslate &&
      (s.currentTranslate = s.startTranslate),
    !i.allowSlidePrev &&
      i.swipeDirection === 'prev' &&
      s.currentTranslate > s.startTranslate &&
      (s.currentTranslate = s.startTranslate),
    !i.allowSlidePrev &&
      !i.allowSlideNext &&
      (s.currentTranslate = s.startTranslate),
    r.threshold > 0)
  )
    if (Math.abs(g) > r.threshold || s.allowThresholdMove) {
      if (!s.allowThresholdMove) {
        ;(s.allowThresholdMove = !0),
          (n.startX = n.currentX),
          (n.startY = n.currentY),
          (s.currentTranslate = s.startTranslate),
          (n.diff = i.isHorizontal()
            ? n.currentX - n.startX
            : n.currentY - n.startY)
        return
      }
    } else {
      s.currentTranslate = s.startTranslate
      return
    }
  !r.followFinger ||
    r.cssMode ||
    (((r.freeMode && r.freeMode.enabled && i.freeMode) ||
      r.watchSlidesProgress) &&
      (i.updateActiveIndex(), i.updateSlidesClasses()),
    r.freeMode && r.freeMode.enabled && i.freeMode && i.freeMode.onTouchMove(),
    i.updateProgress(s.currentTranslate),
    i.setTranslate(s.currentTranslate))
}
function zd(e) {
  const t = this,
    i = t.touchEventsData
  let s = e
  s.originalEvent && (s = s.originalEvent)
  let r
  if (s.type === 'touchend' || s.type === 'touchcancel') {
    if (
      ((r = [...s.changedTouches].filter((L) => L.identifier === i.touchId)[0]),
      !r || r.identifier !== i.touchId)
    )
      return
  } else {
    if (i.touchId !== null || s.pointerId !== i.pointerId) return
    r = s
  }
  if (
    ['pointercancel', 'pointerout', 'pointerleave', 'contextmenu'].includes(
      s.type
    ) &&
    !(
      ['pointercancel', 'contextmenu'].includes(s.type) &&
      (t.browser.isSafari || t.browser.isWebView)
    )
  )
    return
  ;(i.pointerId = null), (i.touchId = null)
  const {
    params: o,
    touches: a,
    rtlTranslate: l,
    slidesGrid: u,
    enabled: c,
  } = t
  if (!c || (!o.simulateTouch && s.pointerType === 'mouse')) return
  if (
    (i.allowTouchCallbacks && t.emit('touchEnd', s),
    (i.allowTouchCallbacks = !1),
    !i.isTouched)
  ) {
    i.isMoved && o.grabCursor && t.setGrabCursor(!1),
      (i.isMoved = !1),
      (i.startMoving = !1)
    return
  }
  o.grabCursor &&
    i.isMoved &&
    i.isTouched &&
    (t.allowSlideNext === !0 || t.allowSlidePrev === !0) &&
    t.setGrabCursor(!1)
  const d = Ct(),
    f = d - i.touchStartTime
  if (t.allowClick) {
    const L = s.path || (s.composedPath && s.composedPath())
    t.updateClickedSlide((L && L[0]) || s.target, L),
      t.emit('tap click', s),
      f < 300 && d - i.lastClickTime < 300 && t.emit('doubleTap doubleClick', s)
  }
  if (
    ((i.lastClickTime = Ct()),
    Hs(() => {
      t.destroyed || (t.allowClick = !0)
    }),
    !i.isTouched ||
      !i.isMoved ||
      !t.swipeDirection ||
      (a.diff === 0 && !i.loopSwapReset) ||
      (i.currentTranslate === i.startTranslate && !i.loopSwapReset))
  ) {
    ;(i.isTouched = !1), (i.isMoved = !1), (i.startMoving = !1)
    return
  }
  ;(i.isTouched = !1), (i.isMoved = !1), (i.startMoving = !1)
  let p
  if (
    (o.followFinger
      ? (p = l ? t.translate : -t.translate)
      : (p = -i.currentTranslate),
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
    (s.target === t.navigation.nextEl || s.target === t.navigation.prevEl)
      ? s.target === t.navigation.nextEl
        ? t.slideTo(x + y)
        : t.slideTo(x)
      : (t.swipeDirection === 'next' && t.slideTo(b !== null ? b : x + y),
        t.swipeDirection === 'prev' && t.slideTo(E !== null ? E : x))
  }
}
function _n() {
  const e = this,
    { params: t, el: i } = e
  if (i && i.offsetWidth === 0) return
  t.breakpoints && e.setBreakpoint()
  const { allowSlideNext: s, allowSlidePrev: r, snapGrid: n } = e,
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
    (e.allowSlideNext = s),
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
    { wrapperEl: t, rtlTranslate: i, enabled: s } = e
  if (!s) return
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
    r !== e.progress && e.updateProgress(i ? -e.translate : e.translate),
    e.emit('setTranslate', e.translate, !1)
}
function Bd(e) {
  const t = this
  Di(t, e.target),
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
  const i = at(),
    { params: s, el: r, wrapperEl: n, device: o } = e,
    a = !!s.nested,
    l = t === 'on' ? 'addEventListener' : 'removeEventListener',
    u = t
  i[l]('touchstart', e.onDocumentTouchStart, { passive: !1, capture: a }),
    r[l]('touchstart', e.onTouchStart, { passive: !1 }),
    r[l]('pointerdown', e.onTouchStart, { passive: !1 }),
    i[l]('touchmove', e.onTouchMove, { passive: !1, capture: a }),
    i[l]('pointermove', e.onTouchMove, { passive: !1, capture: a }),
    i[l]('touchend', e.onTouchEnd, { passive: !0 }),
    i[l]('pointerup', e.onTouchEnd, { passive: !0 }),
    i[l]('pointercancel', e.onTouchEnd, { passive: !0 }),
    i[l]('touchcancel', e.onTouchEnd, { passive: !0 }),
    i[l]('pointerout', e.onTouchEnd, { passive: !0 }),
    i[l]('pointerleave', e.onTouchEnd, { passive: !0 }),
    i[l]('contextmenu', e.onTouchEnd, { passive: !0 }),
    (s.preventClicks || s.preventClicksPropagation) &&
      r[l]('click', e.onClick, !0),
    s.cssMode && n[l]('scroll', e.onScroll),
    s.updateOnWindowResize
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
    { realIndex: t, initialized: i, params: s, el: r } = e,
    n = s.breakpoints
  if (!n || (n && Object.keys(n).length === 0)) return
  const o = e.getBreakpoint(n, e.params.breakpointsBase, e.el)
  if (!o || e.currentBreakpoint === o) return
  const l = (o in n ? n[o] : void 0) || e.originalParams,
    u = Sn(e, s),
    c = Sn(e, l),
    d = s.enabled
  u && !c
    ? (r.classList.remove(
        `${s.containerModifierClass}grid`,
        `${s.containerModifierClass}grid-column`
      ),
      e.emitContainerClasses())
    : !u &&
      c &&
      (r.classList.add(`${s.containerModifierClass}grid`),
      ((l.grid.fill && l.grid.fill === 'column') ||
        (!l.grid.fill && s.grid.fill === 'column')) &&
        r.classList.add(`${s.containerModifierClass}grid-column`),
      e.emitContainerClasses()),
    ['navigation', 'pagination', 'scrollbar'].forEach((b) => {
      if (typeof l[b] > 'u') return
      const E = s[b] && s[b].enabled,
        w = l[b] && l[b].enabled
      E && !w && e[b].disable(), !E && w && e[b].enable()
    })
  const f = l.direction && l.direction !== s.direction,
    p = s.loop && (l.slidesPerView !== s.slidesPerView || f),
    g = s.loop
  f && i && e.changeDirection(), Be(e.params, l)
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
    i &&
      (p
        ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides())
        : !g && I
        ? (e.loopCreate(t), e.updateSlides())
        : g && !I && e.loopDestroy()),
    e.emit('breakpoint', l)
}
function qd(e, t, i) {
  if ((t === void 0 && (t = 'window'), !e || (t === 'container' && !i))) return
  let s = !1
  const r = He(),
    n = t === 'window' ? r.innerHeight : i.clientHeight,
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
      ? r.matchMedia(`(min-width: ${u}px)`).matches && (s = l)
      : u <= i.clientWidth && (s = l)
  }
  return s || 'max'
}
var Gd = { setBreakpoint: Vd, getBreakpoint: qd }
function Wd(e, t) {
  const i = []
  return (
    e.forEach((s) => {
      typeof s == 'object'
        ? Object.keys(s).forEach((r) => {
            s[r] && i.push(t + r)
          })
        : typeof s == 'string' && i.push(t + s)
    }),
    i
  )
}
function Ud() {
  const e = this,
    { classNames: t, params: i, rtl: s, el: r, device: n } = e,
    o = Wd(
      [
        'initialized',
        i.direction,
        { 'free-mode': e.params.freeMode && i.freeMode.enabled },
        { autoheight: i.autoHeight },
        { rtl: s },
        { grid: i.grid && i.grid.rows > 1 },
        {
          'grid-column': i.grid && i.grid.rows > 1 && i.grid.fill === 'column',
        },
        { android: n.android },
        { ios: n.ios },
        { 'css-mode': i.cssMode },
        { centered: i.cssMode && i.centeredSlides },
        { 'watch-progress': i.watchSlidesProgress },
      ],
      i.containerModifierClass
    )
  t.push(...o), r.classList.add(...t), e.emitContainerClasses()
}
function Kd() {
  const e = this,
    { el: t, classNames: i } = e
  t.classList.remove(...i), e.emitContainerClasses()
}
var Yd = { addClasses: Ud, removeClasses: Kd }
function Xd() {
  const e = this,
    { isLocked: t, params: i } = e,
    { slidesOffsetBefore: s } = i
  if (s) {
    const r = e.slides.length - 1,
      n = e.slidesGrid[r] + e.slidesSizesGrid[r] + s * 2
    e.isLocked = e.size > n
  } else e.isLocked = e.snapGrid.length === 1
  i.allowSlideNext === !0 && (e.allowSlideNext = !e.isLocked),
    i.allowSlidePrev === !0 && (e.allowSlidePrev = !e.isLocked),
    t && t !== e.isLocked && (e.isEnd = !1),
    t !== e.isLocked && e.emit(e.isLocked ? 'lock' : 'unlock')
}
var Qd = { checkOverflow: Xd },
  Gs = {
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
  return function (s) {
    s === void 0 && (s = {})
    const r = Object.keys(s)[0],
      n = s[r]
    if (typeof n != 'object' || n === null) {
      Be(t, s)
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
      Be(t, s)
      return
    }
    typeof e[r] == 'object' && !('enabled' in e[r]) && (e[r].enabled = !0),
      e[r] || (e[r] = { enabled: !1 }),
      Be(t, s)
  }
}
const Ss = {
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
  Ts = {}
let vr = class st {
  constructor() {
    let t, i
    for (var s = arguments.length, r = new Array(s), n = 0; n < s; n++)
      r[n] = arguments[n]
    r.length === 1 &&
    r[0].constructor &&
    Object.prototype.toString.call(r[0]).slice(8, -1) === 'Object'
      ? (i = r[0])
      : ([t, i] = r),
      i || (i = {}),
      (i = Be({}, i)),
      t && !i.el && (i.el = t)
    const o = at()
    if (
      i.el &&
      typeof i.el == 'string' &&
      o.querySelectorAll(i.el).length > 1
    ) {
      const c = []
      return (
        o.querySelectorAll(i.el).forEach((d) => {
          const f = Be({}, i, { el: d })
          c.push(new st(f))
        }),
        c
      )
    }
    const a = this
    ;(a.__swiper__ = !0),
      (a.support = $o()),
      (a.device = qu({ userAgent: i.userAgent })),
      (a.browser = Wu()),
      (a.eventsListeners = {}),
      (a.eventsAnyListeners = []),
      (a.modules = [...a.__modules__]),
      i.modules && Array.isArray(i.modules) && a.modules.push(...i.modules)
    const l = {}
    a.modules.forEach((c) => {
      c({
        params: i,
        swiper: a,
        extendParams: Jd(i, l),
        on: a.on.bind(a),
        once: a.once.bind(a),
        off: a.off.bind(a),
        emit: a.emit.bind(a),
      })
    })
    const u = Be({}, Gs, l)
    return (
      (a.params = Be({}, u, Ts, i)),
      (a.originalParams = Be({}, a.params)),
      (a.passedParams = Be({}, i)),
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
    const { slidesEl: i, params: s } = this,
      r = nt(i, `.${s.slideClass}, swiper-slide`),
      n = xn(r[0])
    return xn(t) - n
  }
  getSlideIndexByData(t) {
    return this.getSlideIndex(
      this.slides.filter(
        (i) => i.getAttribute('data-swiper-slide-index') * 1 === t
      )[0]
    )
  }
  recalcSlides() {
    const t = this,
      { slidesEl: i, params: s } = t
    t.slides = nt(i, `.${s.slideClass}, swiper-slide`)
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
  setProgress(t, i) {
    const s = this
    t = Math.min(Math.max(t, 0), 1)
    const r = s.minTranslate(),
      o = (s.maxTranslate() - r) * t + r
    s.translateTo(o, typeof i > 'u' ? 0 : i),
      s.updateActiveIndex(),
      s.updateSlidesClasses()
  }
  emitContainerClasses() {
    const t = this
    if (!t.params._emitClasses || !t.el) return
    const i = t.el.className
      .split(' ')
      .filter(
        (s) =>
          s.indexOf('swiper') === 0 ||
          s.indexOf(t.params.containerModifierClass) === 0
      )
    t.emit('_containerClasses', i.join(' '))
  }
  getSlideClasses(t) {
    const i = this
    return i.destroyed
      ? ''
      : t.className
          .split(' ')
          .filter(
            (s) =>
              s.indexOf('swiper-slide') === 0 ||
              s.indexOf(i.params.slideClass) === 0
          )
          .join(' ')
  }
  emitSlidesClasses() {
    const t = this
    if (!t.params._emitClasses || !t.el) return
    const i = []
    t.slides.forEach((s) => {
      const r = t.getSlideClasses(s)
      i.push({ slideEl: s, classNames: r }), t.emit('_slideClass', s, r)
    }),
      t.emit('_slideClasses', i)
  }
  slidesPerViewDynamic(t, i) {
    t === void 0 && (t = 'current'), i === void 0 && (i = !1)
    const s = this,
      {
        params: r,
        slides: n,
        slidesGrid: o,
        slidesSizesGrid: a,
        size: l,
        activeIndex: u,
      } = s
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
        (i ? o[d] + a[d] - o[u] < l : o[d] - o[u] < l) && (c += 1)
    else for (let d = u - 1; d >= 0; d -= 1) o[u] - o[d] < l && (c += 1)
    return c
  }
  update() {
    const t = this
    if (!t || t.destroyed) return
    const { snapGrid: i, params: s } = t
    s.breakpoints && t.setBreakpoint(),
      [...t.el.querySelectorAll('[loading="lazy"]')].forEach((o) => {
        o.complete && Di(t, o)
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
    if (s.freeMode && s.freeMode.enabled && !s.cssMode)
      r(), s.autoHeight && t.updateAutoHeight()
    else {
      if (
        (s.slidesPerView === 'auto' || s.slidesPerView > 1) &&
        t.isEnd &&
        !s.centeredSlides
      ) {
        const o = t.virtual && s.virtual.enabled ? t.virtual.slides : t.slides
        n = t.slideTo(o.length - 1, 0, !1, !0)
      } else n = t.slideTo(t.activeIndex, 0, !1, !0)
      n || r()
    }
    s.watchOverflow && i !== t.snapGrid && t.checkOverflow(), t.emit('update')
  }
  changeDirection(t, i) {
    i === void 0 && (i = !0)
    const s = this,
      r = s.params.direction
    return (
      t || (t = r === 'horizontal' ? 'vertical' : 'horizontal'),
      t === r ||
        (t !== 'horizontal' && t !== 'vertical') ||
        (s.el.classList.remove(`${s.params.containerModifierClass}${r}`),
        s.el.classList.add(`${s.params.containerModifierClass}${t}`),
        s.emitContainerClasses(),
        (s.params.direction = t),
        s.slides.forEach((n) => {
          t === 'vertical' ? (n.style.width = '') : (n.style.height = '')
        }),
        s.emit('changeDirection'),
        i && s.update()),
      s
    )
  }
  changeLanguageDirection(t) {
    const i = this
    ;(i.rtl && t === 'rtl') ||
      (!i.rtl && t === 'ltr') ||
      ((i.rtl = t === 'rtl'),
      (i.rtlTranslate = i.params.direction === 'horizontal' && i.rtl),
      i.rtl
        ? (i.el.classList.add(`${i.params.containerModifierClass}rtl`),
          (i.el.dir = 'rtl'))
        : (i.el.classList.remove(`${i.params.containerModifierClass}rtl`),
          (i.el.dir = 'ltr')),
      i.update())
  }
  mount(t) {
    const i = this
    if (i.mounted) return !0
    let s = t || i.params.el
    if ((typeof s == 'string' && (s = document.querySelector(s)), !s)) return !1
    ;(s.swiper = i),
      s.parentNode &&
        s.parentNode.host &&
        s.parentNode.host.nodeName === 'SWIPER-CONTAINER' &&
        (i.isElement = !0)
    const r = () =>
      `.${(i.params.wrapperClass || '').trim().split(' ').join('.')}`
    let o = (() =>
      s && s.shadowRoot && s.shadowRoot.querySelector
        ? s.shadowRoot.querySelector(r())
        : nt(s, r())[0])()
    return (
      !o &&
        i.params.createElements &&
        ((o = Vs('div', i.params.wrapperClass)),
        s.append(o),
        nt(s, `.${i.params.slideClass}`).forEach((a) => {
          o.append(a)
        })),
      Object.assign(i, {
        el: s,
        wrapperEl: o,
        slidesEl:
          i.isElement && !s.parentNode.host.slideSlots ? s.parentNode.host : o,
        hostEl: i.isElement ? s.parentNode.host : s,
        mounted: !0,
        rtl: s.dir.toLowerCase() === 'rtl' || mt(s, 'direction') === 'rtl',
        rtlTranslate:
          i.params.direction === 'horizontal' &&
          (s.dir.toLowerCase() === 'rtl' || mt(s, 'direction') === 'rtl'),
        wrongRTL: mt(o, 'display') === '-webkit-box',
      }),
      !0
    )
  }
  init(t) {
    const i = this
    if (i.initialized || i.mount(t) === !1) return i
    i.emit('beforeInit'),
      i.params.breakpoints && i.setBreakpoint(),
      i.addClasses(),
      i.updateSize(),
      i.updateSlides(),
      i.params.watchOverflow && i.checkOverflow(),
      i.params.grabCursor && i.enabled && i.setGrabCursor(),
      i.params.loop && i.virtual && i.params.virtual.enabled
        ? i.slideTo(
            i.params.initialSlide + i.virtual.slidesBefore,
            0,
            i.params.runCallbacksOnInit,
            !1,
            !0
          )
        : i.slideTo(
            i.params.initialSlide,
            0,
            i.params.runCallbacksOnInit,
            !1,
            !0
          ),
      i.params.loop && i.loopCreate(),
      i.attachEvents()
    const r = [...i.el.querySelectorAll('[loading="lazy"]')]
    return (
      i.isElement && r.push(...i.hostEl.querySelectorAll('[loading="lazy"]')),
      r.forEach((n) => {
        n.complete
          ? Di(i, n)
          : n.addEventListener('load', (o) => {
              Di(i, o.target)
            })
      }),
      qs(i),
      (i.initialized = !0),
      qs(i),
      i.emit('init'),
      i.emit('afterInit'),
      i
    )
  }
  destroy(t, i) {
    t === void 0 && (t = !0), i === void 0 && (i = !0)
    const s = this,
      { params: r, el: n, wrapperEl: o, slides: a } = s
    return (
      typeof s.params > 'u' ||
        s.destroyed ||
        (s.emit('beforeDestroy'),
        (s.initialized = !1),
        s.detachEvents(),
        r.loop && s.loopDestroy(),
        i &&
          (s.removeClasses(),
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
        s.emit('destroy'),
        Object.keys(s.eventsListeners).forEach((l) => {
          s.off(l)
        }),
        t !== !1 && ((s.el.swiper = null), zu(s)),
        (s.destroyed = !0)),
      null
    )
  }
  static extendDefaults(t) {
    Be(Ts, t)
  }
  static get extendedDefaults() {
    return Ts
  }
  static get defaults() {
    return Gs
  }
  static installModule(t) {
    st.prototype.__modules__ || (st.prototype.__modules__ = [])
    const i = st.prototype.__modules__
    typeof t == 'function' && i.indexOf(t) < 0 && i.push(t)
  }
  static use(t) {
    return Array.isArray(t)
      ? (t.forEach((i) => st.installModule(i)), st)
      : (st.installModule(t), st)
  }
}
Object.keys(Ss).forEach((e) => {
  Object.keys(Ss[e]).forEach((t) => {
    vr.prototype[t] = Ss[e][t]
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
  const i = ['__proto__', 'constructor', 'prototype']
  Object.keys(t)
    .filter((s) => i.indexOf(s) < 0)
    .forEach((s) => {
      typeof e[s] > 'u'
        ? (e[s] = t[s])
        : Ot(t[s]) && Ot(e[s]) && Object.keys(t[s]).length > 0
        ? t[s].__swiper__
          ? (e[s] = t[s])
          : Ht(e[s], t[s])
        : (e[s] = t[s])
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
      .map((s) => s.trim())
      .filter((s) => !!s),
    i = []
  return (
    t.forEach((s) => {
      i.indexOf(s) < 0 && i.push(s)
    }),
    i.join(' ')
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
    slides: i,
    passedParams: s,
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
    s.thumbs &&
    s.thumbs.swiper &&
    c.thumbs &&
    !c.thumbs.swiper &&
    (I = !0),
    r.includes('controller') &&
      s.controller &&
      s.controller.control &&
      c.controller &&
      !c.controller.control &&
      (b = !0),
    r.includes('pagination') &&
      s.pagination &&
      (s.pagination.el || l) &&
      (c.pagination || c.pagination === !1) &&
      d &&
      !d.el &&
      (E = !0),
    r.includes('scrollbar') &&
      s.scrollbar &&
      (s.scrollbar.el || a) &&
      (c.scrollbar || c.scrollbar === !1) &&
      p &&
      !p.el &&
      (w = !0),
    r.includes('navigation') &&
      s.navigation &&
      (s.navigation.prevEl || o) &&
      (s.navigation.nextEl || n) &&
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
    (c.loop && !s.loop ? (L = !0) : !c.loop && s.loop ? (N = !0) : (J = !0)),
    u.forEach((T) => {
      if (Ot(c[T]) && Ot(s[T]))
        Object.assign(c[T], s[T]),
          (T === 'navigation' || T === 'pagination' || T === 'scrollbar') &&
            'enabled' in s[T] &&
            !s[T].enabled &&
            k(T)
      else {
        const C = s[T]
        ;(C === !0 || C === !1) &&
        (T === 'navigation' || T === 'pagination' || T === 'scrollbar')
          ? C === !1 && k(T)
          : (c[T] = s[T])
      }
    }),
    u.includes('controller') &&
      !b &&
      t.controller &&
      t.controller.control &&
      c.controller &&
      c.controller.control &&
      (t.controller.control = c.controller.control),
    r.includes('children') && i && g && c.virtual.enabled
      ? ((g.slides = i), g.update(!0))
      : r.includes('virtual') &&
        g &&
        c.virtual.enabled &&
        (i && (g.slides = i), g.update(!0)),
    r.includes('children') && i && c.loop && (J = !0),
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
    r.includes('allowSlideNext') && (t.allowSlideNext = s.allowSlideNext),
    r.includes('allowSlidePrev') && (t.allowSlidePrev = s.allowSlidePrev),
    r.includes('direction') && t.changeDirection(s.direction, !1),
    (L || J) && t.loopDestroy(),
    (N || J) && t.loopCreate(),
    t.update()
}
function Tn(e, t) {
  e === void 0 && (e = {}), t === void 0 && (t = !0)
  const i = { on: {} },
    s = {},
    r = {}
  Ht(i, Gs), (i._emitClasses = !0), (i.init = !1)
  const n = {},
    o = jo.map((l) => l.replace(/_/, '')),
    a = Object.assign({}, e)
  return (
    Object.keys(a).forEach((l) => {
      typeof e[l] > 'u' ||
        (o.indexOf(l) >= 0
          ? Ot(e[l])
            ? ((i[l] = {}), (r[l] = {}), Ht(i[l], e[l]), Ht(r[l], e[l]))
            : ((i[l] = e[l]), (r[l] = e[l]))
          : l.search(/on[A-Z]/) === 0 && typeof e[l] == 'function'
          ? t
            ? (s[`${l[2].toLowerCase()}${l.substr(3)}`] = e[l])
            : (i.on[`${l[2].toLowerCase()}${l.substr(3)}`] = e[l])
          : (n[l] = e[l]))
    }),
    ['navigation', 'pagination', 'scrollbar'].forEach((l) => {
      i[l] === !0 && (i[l] = {}), i[l] === !1 && delete i[l]
    }),
    { params: i, passedParams: r, rest: n, events: s }
  )
}
function tf(e, t) {
  let {
    el: i,
    nextEl: s,
    prevEl: r,
    paginationEl: n,
    scrollbarEl: o,
    swiper: a,
  } = e
  No(t) &&
    s &&
    r &&
    ((a.params.navigation.nextEl = s),
    (a.originalParams.navigation.nextEl = s),
    (a.params.navigation.prevEl = r),
    (a.originalParams.navigation.prevEl = r)),
    Fo(t) &&
      n &&
      ((a.params.pagination.el = n), (a.originalParams.pagination.el = n)),
    Ho(t) &&
      o &&
      ((a.params.scrollbar.el = o), (a.originalParams.scrollbar.el = o)),
    a.init(i)
}
function sf(e, t, i, s, r) {
  const n = []
  if (!t) return n
  const o = (l) => {
    n.indexOf(l) < 0 && n.push(l)
  }
  if (i && s) {
    const l = s.map(r),
      u = i.map(r)
    l.join('') !== u.join('') && o('children'),
      s.length !== i.length && o('children')
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
function Es(e, t, i) {
  e === void 0 && (e = {})
  const s = [],
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
              ? s.push(l)
              : r[a] && r[a].push(l)
        })
    }
  return (
    Object.keys(e).forEach((o) => {
      if (typeof e[o] != 'function') return
      const a = e[o]()
      n(a, o)
    }),
    (i.value = t.value),
    (t.value = s),
    { slides: s, slots: r }
  )
}
function nf(e, t, i) {
  if (!i) return null
  const s = (c) => {
      let d = c
      return c < 0 ? (d = t.length + c) : d >= t.length && (d = d - t.length), d
    },
    r = e.value.isHorizontal()
      ? { [e.value.rtlTranslate ? 'right' : 'left']: `${i.offset}px` }
      : { top: `${i.offset}px` },
    { from: n, to: o } = i,
    a = e.value.params.loop ? -t.length : 0,
    l = e.value.params.loop ? t.length * 2 : t.length,
    u = []
  for (let c = a; c < l; c += 1) c >= n && c <= o && u.push(t[s(c)])
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
      let { slots: i, emit: s } = t
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
      Es(i, p, g), (f.value = y), (g.value = p.value)
      const L = () => {
        Es(i, p, g), (l.value = !0)
      }
      ;(w.onAny = function (k) {
        for (
          var T = arguments.length, C = new Array(T > 1 ? T - 1 : 0), D = 1;
          D < T;
          D++
        )
          C[D - 1] = arguments[D]
        s(k, ...C)
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
          bi(() => {
            rf(d.value)
          })
        }),
        xi(() => {
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
            s('swiper', d.value))
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
        const { slides: k, slots: T } = Es(i, p, g)
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
      let { slots: i } = t,
        s = !1
      const { swiperRef: r } = e,
        n = ge(null),
        o = ge('swiper-slide'),
        a = ge(!1)
      function l(d, f, p) {
        f === n.value && (o.value = p)
      }
      xi(() => {
        !r || !r.value || (r.value.on('_slideClass', l), (s = !0))
      }),
        oo(() => {
          s || !r || !r.value || (r.value.on('_slideClass', l), (s = !0))
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
                  i.default && i.default(u.value),
                  e.lazy &&
                    !a.value &&
                    je('div', { class: 'swiper-lazy-preloader' }),
                ]
              )
            : [
                i.default && i.default(u.value),
                e.lazy &&
                  !a.value &&
                  je('div', { class: 'swiper-lazy-preloader' }),
              ]
        )
    },
  }
function af(e) {
  let { swiper: t, extendParams: i, on: s, emit: r, params: n } = e
  ;(t.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
    i({
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
      const F = at()
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
      at().addEventListener('visibilitychange', D)
    },
    ie = () => {
      at().removeEventListener('visibilitychange', D)
    }
  s('init', () => {
    t.params.autoplay.enabled && (le(), re(), J())
  }),
    s('destroy', () => {
      pe(), ie(), t.autoplay.running && k()
    }),
    s('_freeModeStaticRelease', () => {
      ;(g || b) && C()
    }),
    s('_freeModeNoMomentumRelease', () => {
      t.params.autoplay.disableOnInteraction ? k() : T(!0, !0)
    }),
    s('beforeTransitionStart', (F, me, fe) => {
      t.destroyed ||
        !t.autoplay.running ||
        (fe || !t.params.autoplay.disableOnInteraction ? T(!0, !0) : k())
    }),
    s('sliderFirstMove', () => {
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
    s('touchEnd', () => {
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
    s('slideChange', () => {
      t.destroyed || !t.autoplay.running || (I = !0)
    }),
    Object.assign(t.autoplay, { start: J, stop: k, pause: T, resume: C })
}
function cf(e) {
  let { swiper: t, extendParams: i, emit: s, once: r } = e
  i({
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
          bs(d, () => {
            !t ||
              t.destroyed ||
              !g.allowMomentumBounce ||
              (s('momentumBounce'),
              t.setTransition(c.speed),
              setTimeout(() => {
                t.setTranslate(L),
                  bs(d, () => {
                    !t || t.destroyed || t.transitionEnd()
                  })
              }, 0))
          }))
        : t.velocity
        ? (s('_freeModeNoMomentumRelease'),
          t.updateProgress(w),
          t.setTransition(b),
          t.setTranslate(w),
          t.transitionStart(!0, t.swipeDirection),
          t.animating ||
            ((t.animating = !0),
            bs(d, () => {
              !t || t.destroyed || t.transitionEnd()
            })))
        : t.updateProgress(w),
        t.updateActiveIndex(),
        t.updateSlidesClasses()
    } else if (c.freeMode.sticky) {
      t.slideToClosest()
      return
    } else c.freeMode && s('_freeModeNoMomentumRelease')
    ;(!c.freeMode.momentum || I >= c.longSwipesMs) &&
      (s('_freeModeStaticRelease'),
      t.updateProgress(),
      t.updateActiveIndex(),
      t.updateSlidesClasses())
  }
  Object.assign(t, {
    freeMode: { onTouchStart: n, onTouchMove: o, onTouchEnd: a },
  })
}
const qo = 'images/partner-logo/1.png',
  Go = 'images/partner-logo/6.png',
  Wo = 'images/partner-logo/2.png',
  Uo = 'images/partner-logo/7.png',
  Ko = 'images/partner-logo/3.png',
  Yo = 'images/partner-logo/8.png',
  Xo = 'images/partner-logo/4.png',
  Qo = 'images/partner-logo/9.png',
  Jo = 'images/partner-logo/5.png',
  Zo = 'images/partner-logo/10.png',
  et = (e, t) => {
    const i = e.__vccOpts || e
    for (const [s, r] of t) i[s] = r
    return i
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
function Tf(e, t, i, s, r, n) {
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
              modules: s.modules,
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
  Lf = 'images/approach-img.jpg',
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
  jf = 'images/performance/p1.jpg',
  Nf = 'images/performance/p2.jpg',
  Ff = 'images/performance/p3.jpg',
  Hf = 'images/performance/p4.jpg',
  Vf = 'images/performance/p5.jpg',
  qf = 'images/performance/p6.jpg',
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
function Yf(e, t, i, s, r, n) {
  return ce(), ve('section', Wf, Kf)
}
const Xf = et(Gf, [['render', Yf]]),
  Qf = 'images/electronic-img.png',
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
  ip = { class: 'col-span-6 max-lg:col-span-full' },
  sp = { class: 'electronic-content' },
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
function Lp(e, t, i, s, r, n) {
  return (
    ce(),
    ve('section', Zf, [
      _('div', ep, [
        _('div', tp, [
          _('div', ip, [
            _('div', sp, [
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
                                Ri(o.tabname),
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
                    ei(_('div', ap, fp, 512), [[ii, r.activeTabIndex === 0]]),
                    ei(_('div', pp, gp, 512), [[ii, r.activeTabIndex === 1]]),
                    ei(_('div', vp, yp, 512), [[ii, r.activeTabIndex === 2]]),
                    ei(_('div', _p, Ep, 512), [[ii, r.activeTabIndex === 3]]),
                    ei(_('div', Pp, Op, 512), [[ii, r.activeTabIndex === 4]]),
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
  kp = 'images/complete-img.jpg',
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
      return (t, i) => (
        ce(),
        ve('section', zp, [
          _('div', $p, [
            _('div', Dp, [
              _('div', Bp, [
                _(
                  'div',
                  {
                    class: 'bg-cover bg-no-repeat h-full bg-center',
                    style: ct({ backgroundImage: `url(${Re(kp)})` }),
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
  Fp = 'images/cybersecurity-img.jpg',
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
      return (t, i) => (
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
                    style: ct({ backgroundImage: `url(${Re(Fp)})` }),
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
  Kp = 'images/BlogAreaImg/blog1.jpg',
  Yp = 'images/BlogAreaImg/blog2.jpg',
  Xp = 'images/BlogAreaImg/blog3.jpg',
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
function th(e, t, i, s, r, n) {
  return ce(), ve('section', Jp, eh)
}
const ih = et(Qp, [['render', th]]),
  sh = {
    components: {
      PartnerArea: Ef,
      SecurityArea: Af,
      ApproachArea: Bf,
      PerformanceSolution: Xf,
      ElectronicArea: Rp,
      CompleteArea: Np,
      CybersecurityArea: Up,
      BlogArea: ih,
    },
  }
function rh(e, t, i, s, r, n) {
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
const nh = et(sh, [['render', rh]]),
  oh = Uc(),
  lh = [
    { path: '/', name: 'Home', component: nh },
    {
      path: '/404',
      component: () => tt(() => import('./PageNotFound-45228738.js'), []),
    },
    {
      path: '/about',
      name: 'About',
      meta: { title: 'About' },
      component: () =>
        tt(
          () => import('./About-b85da452.js'),
          ['/assets/About-b85da452.js', '/assets/About-7293366d.css']
        ),
    },
    {
      path: '/blog-index',
      name: 'BlogIndex',
      meta: { title: 'Blog Index' },
      component: () =>
        tt(
          () => import('./Index-214ea5cc.js'),
          ['/assets/Index-214ea5cc.js', '/assets/BlogAside-8f769f44.js']
        ),
    },
    {
      path: '/blog-details',
      name: 'BlogDetails',
      meta: { title: 'Blog Details' },
      component: () =>
        tt(
          () => import('./Index-a75fe94f.js'),
          [
            '/assets/Index-a75fe94f.js',
            '/assets/BlogAside-8f769f44.js',
            '/assets/index-7c05a50f.js',
            '/assets/Index-326d94af.css',
          ]
        ),
    },
    {
      path: '/team',
      name: 'Team',
      meta: { title: 'Team' },
      component: () => tt(() => import('./Team-8073e362.js'), []),
    },
    {
      path: '/contact-us',
      name: 'ContactUs',
      meta: { title: 'Contact' },
      component: () =>
        tt(
          () => import('./ContactUs-e4bc88c9.js'),
          [
            '/assets/ContactUs-e4bc88c9.js',
            '/assets/FaqContactArea-53eb6581.js',
            '/assets/index-7c05a50f.js',
          ]
        ),
    },
    {
      path: '/faq',
      name: 'FAQ',
      meta: { title: 'FAQ' },
      component: () =>
        tt(
          () => import('./faq-51c839e8.js'),
          [
            '/assets/faq-51c839e8.js',
            '/assets/FaqContactArea-53eb6581.js',
            '/assets/index-7c05a50f.js',
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
            tt(
              () => import('./ServiceDetails-4c5190cc.js'),
              [
                '/assets/ServiceDetails-4c5190cc.js',
                '/assets/BlogAside-8f769f44.js',
                '/assets/ServiceDetails-3d77bcb8.css',
              ]
            ),
        },
        {
          path: 'index',
          name: 'ServiceIndex',
          meta: { title: 'Service Index' },
          component: () =>
            tt(
              () => import('./ServiceIndex-2aef60c4.js'),
              [
                '/assets/ServiceIndex-2aef60c4.js',
                '/assets/ServiceIndex-d047b74c.css',
              ]
            ),
        },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: '/404' },
  ],
  ah = Au({
    history: oh,
    routes: lh,
    scrollBehavior() {
      return { top: 0 }
    },
  }),
  ch = 'images/page-bg.png',
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
        let e = this.$route.matched.filter((i) => i.meta && i.meta.title)
        const t = e[0]
        this.isHome(t) ||
          (e = [{ path: '/', meta: { title: 'Home' } }].concat(e)),
          (this.pathlist = e.filter((i) => i.meta && i.meta.title))
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
function gh(e, t, i, s, r, n) {
  const o = Ee('router-link')
  return (
    ce(),
    ve(
      'div',
      {
        class:
          'relative bg-cover bg-no-repeat bg-center pt-40 pb-24 md:pt-52 md:pb-36 text-center px-3 text-white before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#0e0129] before:opacity-90 before:-z-10',
        style: ct({ backgroundImage: `url(${s.pagebg})` }),
      },
      [
        _('div', dh, [
          _('div', fh, [
            _(
              'h2',
              ph,
              Ri(r.pathlist && r.pathlist[r.pathlist.length - 1].meta.title),
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
                            ci(
                              o,
                              { key: 0, class: 'hover:text-xred', to: a.path },
                              {
                                default: he(() => [$e(Ri(a.meta.title), 1)]),
                                _: 2,
                              },
                              1032,
                              ['to']
                            ))
                          : (ce(), ve('span', mh, Ri(a.meta.title), 1)),
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
  bh = 'images/background_Img.jpg'
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
function tm(e, t, i, s, r, n) {
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
                style: ct({ backgroundImage: `url(${s.bgimg})` }),
              },
              Zh,
              4
            ),
          ]))
        : (ce(), ve('section', em, [Y(a)])),
    ])
  )
}
const im = et(xh, [['render', tm]]),
  sm = 'images/footer-bg.jpg',
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
      return (t, i) => (
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
                style: ct({ backgroundImage: `url(${Re(sm)})` }),
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
  am = 'images/sunny.png',
  cm = 'images/night.png'
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
  function i(...s) {
    return new Promise((r, n) => {
      Promise.resolve(
        e(() => t.apply(this, s), { fn: t, thisArg: this, args: s })
      )
        .then(r)
        .catch(n)
    })
  }
  return i
}
const il = (e) => e()
function hm(e = il) {
  const t = ge(!0)
  function i() {
    t.value = !1
  }
  function s() {
    t.value = !0
  }
  const r = (...n) => {
    t.value && e(...n)
  }
  return { isActive: Zi(t), pause: i, resume: s, eventFilter: r }
}
function mm(e) {
  return e || wo()
}
function gm(...e) {
  if (e.length !== 1) return Ql(...e)
  const t = e[0]
  return typeof t == 'function' ? Zi(Kl(() => ({ get: t, set: tl }))) : ge(t)
}
function vm(e, t, i = {}) {
  const { eventFilter: s = il, ...r } = i
  return bt(e, pm(s, t), r)
}
function bm(e, t, i = {}) {
  const { eventFilter: s, ...r } = i,
    { eventFilter: n, pause: o, resume: a, isActive: l } = hm(s)
  return {
    stop: vm(e, t, { ...r, eventFilter: n }),
    pause: o,
    resume: a,
    isActive: l,
  }
}
function sl(e, t = !0, i) {
  const s = mm(i)
  s ? xi(e, s) : t ? e() : bi(e)
}
function xm(e = !1, t = {}) {
  const { truthyValue: i = !0, falsyValue: s = !1 } = t,
    r = we(e),
    n = ge(e)
  function o(a) {
    if (arguments.length) return (n.value = a), n.value
    {
      const l = Kt(i)
      return (n.value = n.value === l ? Kt(s) : l), n.value
    }
  }
  return r ? o : [n, o]
}
function rl(e) {
  var t
  const i = Kt(e)
  return (t = i == null ? void 0 : i.$el) != null ? t : i
}
const Yt = um ? window : void 0
function En(...e) {
  let t, i, s, r
  if (
    (typeof e[0] == 'string' || Array.isArray(e[0])
      ? (([i, s, r] = e), (t = Yt))
      : ([t, i, s, r] = e),
    !t)
  )
    return tl
  Array.isArray(i) || (i = [i]), Array.isArray(s) || (s = [s])
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
        n.push(...i.flatMap((p) => s.map((g) => a(c, p, g, f))))
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
      xi(() => {
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
  const { window: i = Yt } = t,
    s = ym(() => i && 'matchMedia' in i && typeof i.matchMedia == 'function')
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
      s.value &&
        (a(),
        (r = i.matchMedia(Kt(e))),
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
const Mi =
    typeof globalThis < 'u'
      ? globalThis
      : typeof window < 'u'
      ? window
      : typeof global < 'u'
      ? global
      : typeof self < 'u'
      ? self
      : {},
  Oi = '__vueuse_ssr_handlers__',
  Sm = Tm()
function Tm() {
  return Oi in Mi || (Mi[Oi] = Mi[Oi] || {}), Mi[Oi]
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
function Cm(e, t, i, s = {}) {
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
    } = s,
    x = (c ? Un : ge)(typeof t == 'function' ? t() : t)
  if (!i)
    try {
      i = nl('getDefaultStorage', () => {
        var T
        return (T = Yt) == null ? void 0 : T.localStorage
      })()
    } catch (T) {
      p(T)
    }
  if (!i) return x
  const I = Kt(t),
    b = Em(I),
    E = (r = s.serializer) != null ? r : Pm[b],
    { pause: w, resume: y } = bm(x, () => L(x.value), {
      flush: n,
      deep: o,
      eventFilter: f,
    })
  return (
    d &&
      a &&
      sl(() => {
        En(d, 'storage', k), En(d, Pn, J), g && k()
      }),
    g || k(),
    x
  )
  function L(T) {
    try {
      if (T == null) i.removeItem(e)
      else {
        const C = E.write(T),
          D = i.getItem(e)
        D !== C &&
          (i.setItem(e, C),
          d &&
            d.dispatchEvent(
              new CustomEvent(Pn, {
                detail: { key: e, oldValue: D, newValue: C, storageArea: i },
              })
            ))
      }
    } catch (C) {
      p(C)
    }
  }
  function N(T) {
    const C = T ? T.newValue : i.getItem(e)
    if (C == null) return l && I != null && i.setItem(e, E.write(I)), I
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
    if (!(T && T.storageArea !== i)) {
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
          T ? bi(y) : y()
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
      attribute: i = 'class',
      initialValue: s = 'auto',
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
        ? gm(s)
        : Cm(o, s, n, { window: r, listenToStorageChanges: a })),
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
    I(t, i, (L = d[y]) != null ? L : y)
  }
  function E(y) {
    e.onChanged ? e.onChanged(y, b) : b(y)
  }
  bt(x, E, { flush: 'post', immediate: !0 }), sl(() => E(x.value))
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
  const { valueDark: t = 'dark', valueLight: i = '', window: s = Yt } = e,
    r = Im({
      ...e,
      onChanged: (a, l) => {
        var u
        e.onChanged
          ? (u = e.onChanged) == null || u.call(e, a === 'dark', l, a)
          : l(a)
      },
      modes: { dark: t, light: i },
    }),
    n = Te(() =>
      r.system ? r.system.value : ol({ window: s }).value ? 'dark' : 'light'
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
        i = xm(t)
      return (s, r) => (
        ce(),
        ve(
          'div',
          {
            class:
              'fixed z-20 top-[150px] h-10 w-12 bg-[#67696b] right-0 rounded-l-full pl-2.5 pt-1',
            onClick: r[0] || (r[0] = (n) => Re(i)()),
          },
          [
            _('label', Om, [
              _(
                'span',
                {
                  class:
                    'transition-background-image rounded-full absolute cursor-pointer top-0 bottom-0 left-0 right-0 bg-[#4d4949] before:absolute before:h-[30px] before:w-[30px] before:left-[2.5px] before:top-0 before:bottom-0 before:my-auto before:bg-no-repeat before:bg-center ease-linear duration-400',
                  style: ct({
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
    components: { HeaderArea: im, FooterArea: lm, DarkToggle: Am },
    computed: {
      is404Route() {
        return this.$route.path === '/404'
      },
    },
  }
function Rm(e, t, i, s, r, n) {
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
        n.is404Route ? ds('', !0) : (ce(), ci(o, { key: 0 })),
        n.is404Route ? ds('', !0) : (ce(), ci(a, { key: 1 })),
        Y(l),
        n.is404Route ? ds('', !0) : (ce(), ci(u, { key: 2 })),
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
  Ji as D,
  Rp as E,
  Le as F,
  ar as G,
  Te as H,
  jt as I,
  Vt as J,
  lt as K,
  Ft as L,
  Re as M,
  bi as N,
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
  ci as i,
  ei as j,
  ao as k,
  Ec as l,
  $e as m,
  ct as n,
  ce as o,
  zm as p,
  $m as q,
  Ee as r,
  Ae as s,
  Ri as t,
  ii as u,
  Dm as v,
  he as w,
  wo as x,
  ge as y,
  wa as z,
}
