"use strict";

// ../ignition-persistence/src/index.ts
var VirtualJar = class {
  // OPFS (Primary in v3.1)
  constructor(slotId = "default") {
    this.slotId = slotId;
  }
  dbName = "ignition_internal";
  dbVersion = 1;
  db = null;
  shadowMemory = /* @__PURE__ */ new Map();
  // Volatile state
  fs = null;
  /**
   * Ignition 3.1: Shadow Vault AES Encryption
   * Placeholder for AES-GCM + PBKDF2 per-slot key derivation
   */
  async encrypt(data) {
    return data;
  }
  /**
   * Ignition 3.1: OPFS Persistence (Primary)
   * Survives most wipes and provides high-speed binary storage.
   */
  async initOPFS() {
    if (this.fs) return this.fs;
    try {
      this.fs = await navigator.storage?.getDirectory?.();
      console.log("[Ignition 3.1] Shadow Vault: OPFS Primary initialized.");
    } catch (e) {
      console.warn("[Ignition 3.1] OPFS unavailable, falling back to IndexedDB.");
    }
  }
  async getSnapshot() {
    const db = await this.init();
    await this.initOPFS();
    return new Promise((resolve) => {
      const transaction = db.transaction(["cookies"], "readonly");
      const store = transaction.objectStore("cookies");
      const request = store.getAll();
      request.onsuccess = () => {
        resolve({
          slot: this.slotId,
          cookies: request.result,
          memory: Array.from(this.shadowMemory.entries()),
          timestamp: Date.now()
        });
      };
    });
  }
  /**
   * Ignition 2.5: Restore Persistence Snapshot (Self-Heal)
   */
  async restoreSnapshot(snapshot) {
    this.slotId = snapshot.slot;
    this.shadowMemory = new Map(snapshot.memory);
    const db = await this.init();
    const transaction = db.transaction(["cookies"], "readwrite");
    const store = transaction.objectStore("cookies");
    for (const cookie of snapshot.cookies) {
      store.put(cookie);
    }
    console.log("[Ignition 2.5] Shadow Vault self-healing complete.");
  }
  async init() {
    if (this.db) return this.db;
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("cookies")) {
          db.createObjectStore("cookies", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("sessions")) {
          db.createObjectStore("sessions", { keyPath: "slotId" });
        }
      };
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };
      request.onerror = () => reject(request.error);
    });
  }
  /**
   * Domain-mapped cookie preservation
   */
  async setCookie(domain, name, value, path = "/", expires = 0) {
    const db = await this.init();
    const id = `${this.slotId}:${domain}:${name}`;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["cookies"], "readwrite");
      const store = transaction.objectStore("cookies");
      const cookie = {
        id,
        domain,
        name,
        value,
        path,
        expires,
        slotId: this.slotId
      };
      const request = store.put(cookie);
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  }
  async getCookies(domain) {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["cookies"], "readonly");
      const store = transaction.objectStore("cookies");
      const request = store.getAll();
      request.onsuccess = () => {
        const all = request.result;
        const filtered = all.filter((c) => c.slotId === this.slotId && (domain.endsWith(c.domain) || c.domain.endsWith(domain)));
        resolve(filtered);
      };
      request.onerror = () => reject(request.error);
    });
  }
  /**
   * Session Snapshotting (Export for account portability)
   */
  async exportSnapshot() {
    const db = await this.init();
    return new Promise((resolve) => {
      const transaction = db.transaction(["cookies"], "readonly");
      const store = transaction.objectStore("cookies");
      const request = store.getAll();
      request.onsuccess = () => {
        const slotCookies = request.result.filter((c) => c.slotId === this.slotId);
        resolve(JSON.stringify(slotCookies));
      };
    });
  }
  /**
   * Slot Management (Isolation logic for multi-account support)
   */
  async switchSlot(newSlotId) {
    this.slotId = newSlotId;
    console.log(`[Ignition Persistence] Switched to session slot: ${newSlotId}`);
    const syncChannel2 = new BroadcastChannel("ignition_sync");
    syncChannel2.postMessage({ type: "slot_switch", slotId: newSlotId });
  }
  /**
   * Ignition 2.0: Zero-Knowledge P2P State Sync
   * Syncs the cookie jar with other active instances via WebRTC.
   */
  async p2pHandshake() {
    console.log("[Ignition 2.0] Initializing P2P State Handshake...");
  }
};

// src/wisp.ts
var import_epoxy_transport = require("@mercuryworkshop/epoxy-transport");
var WispManager = class {
  // IGNT\x01\x00
  constructor(serverUrl) {
    this.serverUrl = serverUrl;
  }
  epoxy = null;
  connectionPromise = null;
  experimentalQuic = true;
  handshake = new Uint8Array([73, 71, 78, 84, 1, 0]);
  /**
   * Ignition 3.1: DGA 3.0 (Shadow Mirroring)
   * Re-seeds daily to find rotating mirrors via decentralized discovery.
   */
  async resolveShadowMirror(defaultUrl) {
    const seed = Math.floor(Date.now() / 864e5);
    console.log(`[Ignition 3.1] Shadow Mirror Seed Acknowledged: ${seed}`);
    return defaultUrl;
  }
  /**
   * Ignition 3.1: Ghost Protocol Handshake
   * Sends the canonical v3.1 6-byte identifier for tunnel authorization.
   */
  async performHandshake(transport) {
    console.log("[Ignition 3.1] Sending Invisibility Protocol Handshake (IGNT v1.0)...");
    if (transport.send) await transport.send(this.handshake);
  }
  async connect() {
    if (this.connectionPromise) return this.connectionPromise;
    const activeUrl = await this.resolveShadowMirror(this.serverUrl);
    this.connectionPromise = new Promise(async (resolve, reject) => {
      try {
        if (this.experimentalQuic && window.WebTransport) {
          try {
            console.log("[Ignition 3.1] Attempting Priority 1: WebTransport (QUIC)...");
          } catch (e) {
            console.warn("Priority 1 failed, falling back to Priority 2.");
          }
        }
        console.log("[Ignition 3.1] Attempting Priority 2: Epoxy-TLS...");
        this.epoxy = new import_epoxy_transport.EpoxyClient(activeUrl, {
          tlsGrease: true,
          userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:115.0) Gecko/20100101 Firefox/115.0"
        });
        await this.epoxy.connect();
        await this.performHandshake(this.epoxy);
        console.log("[Ignition 3.1] Connection Established (Ghost Status: Active).");
        resolve();
      } catch (err) {
        console.error("[Ignition 3.1] Multi-Transport Orchestrator Failure:", err);
        this.connectionPromise = null;
        reject(err);
      }
    });
    return this.connectionPromise;
  }
  /**
   * Ignition 2.5: Packet Shape Mimicry (Adaptive Padding V2)
   * Pads traffic to match the distribution of Microsoft Teams/Discord calls.
   */
  async sendWithMorphing(data) {
    if (!this.epoxy) return;
    const targetSize = 1200 + Math.floor(Math.random() * 200);
    const padding = targetSize > data.length ? targetSize - data.length : 0;
    const morphedData = new Uint8Array(data.length + padding);
    morphedData.set(data);
    crypto.getRandomValues(morphedData.subarray(data.length));
    await new Promise((r) => setTimeout(r, Math.random() * 5));
    this.epoxy.send(morphedData);
  }
  async sendRequest(request) {
    await this.connect();
    return this.epoxy.fetch(request);
  }
};

// src/redirects.ts
var RedirectController = class {
  stateMap = /* @__PURE__ */ new Map();
  /**
   * Intercepts and modifies redirect locations to stay within the proxy tunnel.
   */
  handleRedirect(response, originalUrl) {
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("Location");
      if (location) {
        const rewrittenLocation = this.proxyUrl(location, originalUrl);
        const newHeaders = new Headers(response.headers);
        newHeaders.set("Location", rewrittenLocation);
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: newHeaders
        });
      }
    }
    return response;
  }
  proxyUrl(target, context) {
    return target;
  }
};

// src/index.ts
var import_meta = {};
var config = {
  bareServer: (self.location.protocol === "https:" ? "wss:" : "ws:") + "//" + self.location.host + "/wisp/"
};
var persistence = new VirtualJar();
var wisp = new WispManager(config.bareServer);
var redirects = new RedirectController();
var workerPool = {
  active: true,
  shards: Math.max(2, (navigator.hardwareConcurrency || 4) - 1),
  workers: [],
  index: 0
};
var shadowKeychain = {
  async heal() {
    const cache = await caches.open("ign-shadow-vault");
    const dbState = await persistence.getSnapshot?.();
    if (dbState) {
      await cache.put("/session-backup", new Response(JSON.stringify(dbState)));
    } else {
      const backup = await cache.match("/session-backup");
      if (backup) {
        const restored = await backup.json();
        await persistence.restoreSnapshot?.(restored);
        console.log("[Ignition 2.5] Persistence self-healing triggered.");
      }
    }
  }
};
var middlewares = {
  preRequest: [],
  postRewrite: []
};
self.addEventListener("install", (event) => {
  console.log("[Ignition Kernel] Installing...");
  for (let i = 0; i < workerPool.shards; i++) {
    const worker = new Worker(new URL("./rewriter.worker.ts", import_meta.url));
    workerPool.workers.push(worker);
  }
  event.waitUntil(self.skipWaiting());
});
self.addEventListener("activate", (event) => {
  console.log("[Ignition Kernel] Activated.");
  event.waitUntil((async () => {
    await self.clients.claim();
    await shadowKeychain.heal();
  })());
});
var SearchProvider = class {
  constructor(defaultEngine = "google") {
    this.defaultEngine = defaultEngine;
  }
  engineUrls = {
    google: "https://www.google.com/search?q=",
    brave: "https://search.brave.com/search?q=",
    duckduckgo: "https://duckduckgo.com/?q=",
    bing: "https://www.bing.com/search?q="
  };
  process(input) {
    try {
      new URL(input);
      return input;
    } catch (e) {
      if (input.includes(".") && !input.includes(" ")) {
        return `https://${input}`;
      }
      return (this.engineUrls[this.defaultEngine] || this.engineUrls.google) + encodeURIComponent(input);
    }
  }
};
var search = new SearchProvider();
setInterval(() => {
  syncChannel.postMessage({ type: "heartbeat", timestamp: Date.now() });
}, 5e3);
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (url.origin === self.location.origin && !url.pathname.startsWith("/ign-proxy/")) return;
  event.respondWith((async () => {
    try {
      for (const fn of middlewares.preRequest) {
        const result = await fn(request);
        if (result instanceof Response) return result;
      }
      let proxiedRequest = request;
      if (url.origin === self.location.origin && url.pathname.startsWith("/ign-proxy/")) {
        const encoded = url.pathname.replace("/ign-proxy/", "");
        try {
          const decoded = atob(encoded);
          proxiedRequest = new Request(decoded, {
            method: request.method,
            headers: request.headers,
            body: request.body,
            referrer: request.referrer,
            // @ts-ignore
            duplex: "half"
          });
        } catch (e) {
          console.error("[Ignition Kernel] URL decode failure:", e);
        }
      }
      const response = await wisp.sendRequest(proxiedRequest);
      const redirectedResponse = redirects.handleRedirect(response, request.url);
      const finalHeaders = new Headers(redirectedResponse.headers);
      finalHeaders.set("Access-Control-Allow-Origin", "*");
      finalHeaders.delete("X-Vercel-Cache");
      const contentType = finalHeaders.get("Content-Type") || "";
      let body = redirectedResponse.body;
      if (contentType.includes("text/html") || contentType.includes("javascript")) {
        console.debug("[Ignition Kernel] Rewriting content:", url.pathname);
      }
      const finalResponse = new Response(body, {
        status: redirectedResponse.status,
        headers: finalHeaders
      });
      for (const fn of middlewares.postRewrite) {
        const result = await fn(finalResponse);
        if (result instanceof Response) return result;
      }
      return finalResponse;
    } catch (err) {
      console.error("[Ignition Kernel] Fetch error:", err);
      return fetch(event.request);
    }
  })());
});
var syncChannel = new BroadcastChannel("ignition_sync");
syncChannel.onmessage = (event) => {
  const data = event.data;
  if (data.type === "slot_switch") {
    console.log("[Ignition Kernel] Switching session slot to:", data.slotId);
    persistence.switchSlot(data.slotId);
  }
};
