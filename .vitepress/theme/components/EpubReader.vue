<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { READER_BOOKS, type ReaderBook } from '../reader-books'

// epubjs n'a pas de types TS fiables en 0.3.x — on type en any.
type EpubBook = any
type Rendition = any

// ---------- État ----------
const book = ref<EpubBook | null>(null)
const rendition = ref<Rendition | null>(null)
const isLoading = ref(false)
const loadError = ref<string | null>(null)
const currentTitle = ref('')
const toc = ref<{ label: string; href: string; subitems?: { label: string; href: string }[] }[]>([])
const progress = ref(0)
const locationsReady = ref(false)
const viewerEl = ref<HTMLElement | null>(null)
const showToc = ref(false)
const showSettings = ref(false)
const isSeeking = ref(false)

// ---------- Préférences ----------
type ThemeName = 'light' | 'sepia' | 'dark'
type FlowName = 'scrolled' | 'paginated'

const THEMES: Record<ThemeName, { bg: string; text: string; label: string }> = {
  light: { bg: '#ffffff', text: '#1a1a1a', label: 'Clair' },
  sepia: { bg: '#f4ecd8', text: '#433422', label: 'Sépia' },
  dark: { bg: '#1a1a1a', text: '#e5e5e5', label: 'Sombre' }
}

const prefs = reactive({
  fontSize: 100, // %
  theme: 'light' as ThemeName,
  flow: 'scrolled' as FlowName
})

const isScrolled = computed(() => prefs.flow === 'scrolled')

// ---------- Persistance (localStorage, client only) ----------
const LS_LAST = 'krlx-reader:last'
const LS_PREFS = 'krlx-reader:prefs'

interface LastRead {
  bookKey: string
  cfi: string
}

function loadPrefs (): void {
  try {
    const raw = localStorage.getItem(LS_PREFS)
    if (raw) {
      const p = JSON.parse(raw)
      if (typeof p.fontSize === 'number') prefs.fontSize = p.fontSize
      if (p.theme && p.theme in THEMES) prefs.theme = p.theme
      if (p.flow === 'scrolled' || p.flow === 'paginated') prefs.flow = p.flow
    }
  } catch { /* ignore */ }
}

function savePrefs (): void {
  try {
    localStorage.setItem(LS_PREFS, JSON.stringify({ fontSize: prefs.fontSize, theme: prefs.theme, flow: prefs.flow }))
  } catch { /* ignore */ }
}

function loadLast (): LastRead | null {
  try {
    const raw = localStorage.getItem(LS_LAST)
    if (!raw) return null
    const l = JSON.parse(raw)
    if (l && typeof l.bookKey === 'string' && typeof l.cfi === 'string') return l
  } catch { /* ignore */ }
  return null
}

function saveLast (bookKey: string, cfi: string): void {
  try {
    localStorage.setItem(LS_LAST, JSON.stringify({ bookKey, cfi }))
  } catch { /* ignore */ }
}

// Le scroll émet beaucoup de relocated : on n'écrit localStorage qu'une fois par seconde
// tout en gardant toujours le tout dernier cfi.
let lastSavedCfi = ''
let saveTimer: ReturnType<typeof setTimeout> | undefined

function throttledSaveLast (bookKey: string, cfi: string): void {
  lastSavedCfi = cfi
  if (saveTimer) return
  saveTimer = setTimeout(() => {
    saveTimer = undefined
    if (lastSavedCfi) saveLast(bookKey, lastSavedCfi)
  }, 1000)
}

// ---------- Résolution du dernier livre (uniquement parmi ceux déclarés) ----------
const lastBook = ref<ReaderBook | null>(null)
const lastCfi = ref<string | undefined>(undefined)
const currentBookKey = ref('')

function resolveLast (): void {
  const last = loadLast()
  if (!last) return
  const found = READER_BOOKS.find((b) => b.title === last.bookKey)
  if (found) {
    lastBook.value = found
    lastCfi.value = last.cfi
  }
}

// ---------- Lecture ----------
async function openBookByUrl (rb: ReaderBook, cfi?: string): Promise<void> {
  try {
    const ePub = (await import('epubjs')).default
    await loadBook(ePub(rb.url), rb.title, cfi)
  } catch (e) {
    loadError.value = (e as Error).message || String(e)
  }
}

async function openUploadedFile (file: File): Promise<void> {
  try {
    const ePub = (await import('epubjs')).default
    const buffer = await file.arrayBuffer()
    const fallbackTitle = file.name.replace(/\.epub$/i, '')
    await loadBook(ePub(buffer), fallbackTitle)
  } catch (e) {
    loadError.value = (e as Error).message || String(e)
  }
}

// Met à jour le slider + la sauvegarde à partir de la position courante réelle.
// Nécessaire en scrolled : `display(cfi)` ne déclenche pas toujours `relocated`,
// sinon le slider resterait à 0 à la reprise malgré la bonne page affichée.
function syncProgress (r: Rendition): void {
  try {
    const loc = r.currentLocation()
    if (loc && loc.start && loc.start.cfi) {
      const pct = r.book.locations.percentageFromCfi(loc.start.cfi)
      if (typeof pct === 'number' && !Number.isNaN(pct)) {
        progress.value = Math.round(pct * 100)
      }
      throttledSaveLast(currentBookKey.value, loc.start.cfi)
    }
  } catch { /* ignore */ }
}

// Crée (ou recrée) la rendition selon le flow choisi, en reprenant au cfi donné.
async function createRendition (cfi?: string): Promise<void> {
  if (!book.value || !viewerEl.value) return
  try {
    if (rendition.value) rendition.value.destroy()
  } catch { /* ignore */ }
  rendition.value = null

  const r = book.value.renderTo(viewerEl.value, {
    width: '100%',
    height: '100%',
    manager: prefs.flow === 'scrolled' ? 'continuous' : 'default',
    flow: prefs.flow === 'scrolled' ? 'scrolled' : 'paginated',
    spread: prefs.flow === 'scrolled' ? undefined : 'auto',
    minSpreadWidth: prefs.flow === 'scrolled' ? undefined : 800,
    allowScriptedContent: false
  })
  rendition.value = r
  applyTheme(r)

  // Locations (nécessaire au slider de progression)
  r.book.locations.generate(1024).then(() => {
    locationsReady.value = true
    syncProgress(r)
  }).catch(() => { locationsReady.value = false })

  // En scrolled, `relocated` est émis pendant le scroll (debounce 30ms) via
  // reportLocation ; en paginated à chaque changement de page.
  r.on('relocated', (loc: { start: { cfi: string } }) => {
    const pct = r.book.locations.percentageFromCfi(loc.start.cfi)
    if (typeof pct === 'number' && !Number.isNaN(pct)) {
      progress.value = Math.round(pct * 100)
    }
    throttledSaveLast(currentBookKey.value, loc.start.cfi)
  })

  await r.display(cfi || undefined)

  // Amorçage du flux scrollé : sans dépassement initial (1re section plus courte
  // que l'écran), la molette ne peut pas scroller et le lookahead ne se déclenche
  // jamais. fill() précharge les sections voisines → le conteneur dépasse
  // immédiatement et le scroll vertical natif fonctionne.
  if (prefs.flow === 'scrolled') {
    try {
      if (r.manager && typeof r.manager.fill === 'function') {
        await r.manager.fill()
      }
    } catch { /* non bloquant */ }
  }

  // Synchronise slider + position sauvegardée dès l'affichage initial
  // (le relocated seul ne suffit pas en scrolled).
  syncProgress(r)
}

async function loadBook (b: EpubBook, fallbackTitle: string, cfi?: string): Promise<void> {
  isLoading.value = true
  loadError.value = null
  closeBook(false)
  try {
    await b.ready
    const meta = await b.loaded.metadata
    currentTitle.value = meta.title || fallbackTitle
    currentBookKey.value = fallbackTitle
    const nav = await b.loaded.navigation
    toc.value = nav.toc || []

    book.value = b
    await nextTick() // laisse v-else monter le reader-screen

    if (!viewerEl.value) throw new Error('Conteneur de lecture introuvable')

    await createRendition(cfi)
  } catch (e) {
    loadError.value = (e as Error).message || String(e)
    closeBook(false)
  } finally {
    isLoading.value = false
  }
}

function closeBook (save: boolean = true): void {
  try {
    if (rendition.value) rendition.value.destroy()
    if (book.value) book.value.destroy()
  } catch { /* ignore */ }
  rendition.value = null
  book.value = null
  toc.value = []
  progress.value = 0
  locationsReady.value = false
  showToc.value = false
  showSettings.value = false
  // après une lecture, on peut proposer la reprise dans la bibliothèque
  resolveLast()
}

// ---------- Navigation ----------
function next (): void { if (rendition.value) rendition.value.next() }
function prev (): void { if (rendition.value) rendition.value.prev() }

function goToTocItem (href: string): void {
  if (!rendition.value) return
  rendition.value.display(href)
  showToc.value = false
}

function onSeekInput (): void {
  isSeeking.value = true
}

async function onSeekChange (): Promise<void> {
  if (!rendition.value || !locationsReady.value) return
  const cfi = rendition.value.book.locations.cfiFromPercentage(progress.value / 100)
  if (cfi) {
    await rendition.value.display(cfi)
    syncProgress(rendition.value)
  }
  isSeeking.value = false
}

// ---------- Réglages ----------
function applyTheme (r: Rendition): void {
  r.themes.fontSize(`${prefs.fontSize}%`)
  const t = THEMES[prefs.theme]
  r.themes.override('color', t.text)
  r.themes.override('background', t.bg)
}

function setFontSize (delta: number): void {
  prefs.fontSize = Math.min(180, Math.max(70, prefs.fontSize + delta))
  if (rendition.value) applyTheme(rendition.value)
  savePrefs()
}

function setTheme (name: ThemeName): void {
  prefs.theme = name
  if (rendition.value) applyTheme(rendition.value)
  savePrefs()
}

async function setFlow (flow: FlowName): Promise<void> {
  if (prefs.flow === flow || !book.value) return
  // on garde la position courante avant de recréer la rendition
  let currentCfi: string | undefined
  try {
    const loc = rendition.value?.currentLocation?.()
    currentCfi = loc?.start?.cfi
  } catch { /* ignore */ }
  prefs.flow = flow
  savePrefs()
  isLoading.value = true
  try {
    await createRendition(currentCfi)
  } finally {
    isLoading.value = false
  }
}

function handleUpload (e: Event): void {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) {
    void openUploadedFile(file)
  }
  input.value = ''
}

// ---------- Clavier ----------
function getScroller (): HTMLElement | null {
  if (!viewerEl.value) return null
  return viewerEl.value.querySelector('.epub-container') as HTMLElement | null
}

function onKeydown (e: KeyboardEvent): void {
  if (!rendition.value || showToc.value) return
  const tag = (e.target as HTMLElement)?.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

  if (prefs.flow === 'paginated') {
    // Paginé : droite/PageDn/Espace = page suivante, gauche/PageUp = précédente
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault(); next()
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault(); prev()
    }
    return
  }

  // Scrolled : gauche/droite = défilement d'un écran
  if (e.key === 'ArrowRight') { e.preventDefault(); next() }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
  // Haut/bas, espace, PgUp/PgDn : scroll vertical natif du conteneur
  else if (['ArrowUp', 'ArrowDown', ' ', 'PageUp', 'PageDown'].includes(e.key)) {
    const scroller = getScroller()
    if (scroller) {
      e.preventDefault()
      const step = e.key === 'ArrowUp' || e.key === 'PageUp' ? -1 : 1
      const amount = e.key === 'ArrowUp' || e.key === 'ArrowDown' ? 80 : scroller.clientHeight * 0.9
      scroller.scrollBy({ top: step * amount, behavior: 'smooth' })
    }
  }
}

function onResize (): void {
  if (rendition.value) rendition.value.resize()
}

// ---------- Curseur natif sur cette page (le thème met cursor:none partout) ----------
function enableNativeCursor (): void {
  document.body.classList.add('reader-active')
}
function disableNativeCursor (): void {
  document.body.classList.remove('reader-active')
}

// ---------- Cycle de vie ----------
onMounted(() => {
  loadPrefs()
  resolveLast()
  enableNativeCursor()
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', onResize)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => { /* SW optionnel */ })
  }
})

onBeforeUnmount(() => {
  disableNativeCursor()
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', onResize)
  closeBook()
})

const resumeAvailable = computed(() => lastBook.value !== null)
</script>

<template>
  <div class="reader-app" :class="`theme-${prefs.theme}`">
    <!-- ============ Écran bibliothèque ============ -->
    <div v-if="!book" class="library-screen">
      <div class="library-inner">
        <h1 class="library-title">Lecteur d'epub</h1>
        <p class="library-sub">Lisez les epub du site, ou importez le vôtre.</p>

        <div v-if="loadError" class="alert alert-error mb-4">
          <span>Erreur : {{ loadError }}</span>
        </div>

        <div v-if="resumeAvailable && lastBook" class="card bg-base-200 shadow-sm mb-6">
          <div class="card-body p-4 flex-row items-center justify-between">
            <div>
              <div class="text-xs opacity-60">Reprendre la lecture</div>
              <div class="font-semibold">{{ lastBook.title }}</div>
            </div>
            <button class="btn btn-primary btn-sm" :disabled="isLoading" @click="openBookByUrl(lastBook, lastCfi)">
              <span v-if="isLoading" class="loading loading-spinner loading-xs"></span>
              Reprendre
            </button>
          </div>
        </div>

        <div class="card bg-base-200 shadow-sm mb-6">
          <div class="card-body p-4">
            <div class="font-semibold mb-2">Importer un fichier</div>
            <label class="btn btn-outline w-full">
              <input
                type="file"
                accept=".epub,application/epub+zip"
                class="hidden"
                @change="handleUpload"
              />
              Choisir un fichier .epub
            </label>
            <div class="text-xs opacity-60 mt-2">
              Lecture immédiate, le fichier reste sur votre appareil.
            </div>
          </div>
        </div>

        <div class="font-semibold mb-2">Bibliothèque du site</div>
        <ul class="book-list">
          <li v-for="rb in READER_BOOKS" :key="rb.title" class="book-item">
            <span class="book-title">{{ rb.title }}</span>
            <button class="btn btn-sm" :disabled="isLoading" @click="openBookByUrl(rb)">
              <span v-if="isLoading" class="loading loading-spinner loading-xs"></span>
              Lire
            </button>
          </li>
        </ul>
        <p class="text-xs opacity-40 mt-6">
          Astuce : installez cette page comme application (menu du navigateur) pour lire hors-ligne.
        </p>
      </div>
    </div>

    <!-- ============ Lecteur ============ -->
    <div v-else class="reader-screen">
      <header class="reader-header">
        <button class="btn btn-ghost btn-sm reader-icon-btn" title="Retour à la bibliothèque" @click="closeBook(true)">
          ←
        </button>
        <span class="reader-title">{{ currentTitle }}</span>
        <div class="flex items-center gap-1">
          <button class="btn btn-ghost btn-sm reader-icon-btn" title="Sommaire" @click="showToc = !showToc">☰</button>
          <button class="btn btn-ghost btn-sm reader-icon-btn" title="Réglages" @click="showSettings = !showSettings">⚙</button>
        </div>
      </header>

      <div ref="viewerEl" class="reader-viewer" :class="`theme-${prefs.theme}`"></div>

      <footer class="reader-footer">
        <button
          class="btn btn-circle btn-sm reader-icon-btn"
          :title="isScrolled ? 'Défiler vers le haut' : 'Page précédente'"
          @click="prev"
        >‹</button>
        <div class="flex-1 flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="100"
            class="range range-primary range-xs flex-1"
            v-model.number="progress"
            :disabled="!locationsReady"
            @input="onSeekInput"
            @change="onSeekChange"
          />
          <span class="text-xs w-9 text-right">{{ progress }}%</span>
        </div>
        <button
          class="btn btn-circle btn-sm reader-icon-btn"
          :title="isScrolled ? 'Défiler vers le bas' : 'Page suivante'"
          @click="next"
        >›</button>
      </footer>

      <!-- Overlay sommaire -->
      <div v-if="showToc" class="overlay" @click.self="showToc = false">
        <div class="panel">
          <div class="panel-head">
            <span class="font-semibold">Sommaire</span>
            <button class="btn btn-ghost btn-xs reader-icon-btn" @click="showToc = false">✕</button>
          </div>
          <ul class="toc-list">
            <li v-for="item in toc" :key="item.href">
              <button class="toc-link" @click="goToTocItem(item.href)">{{ item.label }}</button>
              <ul v-if="item.subitems && item.subitems.length" class="toc-sublist">
                <li v-for="sub in item.subitems" :key="sub.href">
                  <button class="toc-link" @click="goToTocItem(sub.href)">{{ sub.label }}</button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <!-- Overlay réglages -->
      <div v-if="showSettings" class="overlay" @click.self="showSettings = false">
        <div class="panel">
          <div class="panel-head">
            <span class="font-semibold">Réglages</span>
            <button class="btn btn-ghost btn-xs reader-icon-btn" @click="showSettings = false">✕</button>
          </div>
          <div class="settings-body">
            <div class="mb-4">
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm">Taille de police</span>
                <span class="text-xs opacity-60">{{ prefs.fontSize }}%</span>
              </div>
              <div class="flex items-center gap-2">
                <button class="btn btn-outline btn-xs" @click="setFontSize(-10)">A−</button>
                <input
                  type="range"
                  min="70"
                  max="180"
                  class="range range-primary range-xs flex-1"
                  v-model.number="prefs.fontSize"
                  @change="setFontSize(0)"
                />
                <button class="btn btn-outline btn-xs" @click="setFontSize(10)">A+</button>
              </div>
            </div>
            <div class="mb-4">
              <span class="text-sm block mb-1">Thème</span>
              <div class="flex gap-2">
                <button
                  v-for="(t, name) in THEMES"
                  :key="name"
                  class="btn btn-sm flex-1"
                  :class="prefs.theme === name ? 'btn-primary' : 'btn-outline'"
                  @click="setTheme(name as ThemeName)"
                >
                  {{ t.label }}
                </button>
              </div>
            </div>
            <div>
              <span class="text-sm block mb-1">Défilement</span>
              <div class="flex gap-2">
                <button
                  class="btn btn-sm flex-1"
                  :class="prefs.flow === 'scrolled' ? 'btn-primary' : 'btn-outline'"
                  @click="setFlow('scrolled')"
                >
                  Continu
                </button>
                <button
                  class="btn btn-sm flex-1"
                  :class="prefs.flow === 'paginated' ? 'btn-primary' : 'btn-outline'"
                  @click="setFlow('paginated')"
                >
                  Paginé
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Écran de chargement -->
      <div v-if="isLoading" class="loading-overlay">
        <span class="loading loading-spinner loading-lg"></span>
        <span class="mt-2 text-sm">Chargement…</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ---------- Variables de thème (header, footer, panneaux, bibliothèque) ---------- */
.reader-app {
  --reader-bg: #f7f8fa;
  --reader-fg: #1a1a1a;
  --reader-border: rgba(0, 0, 0, 0.1);
  --reader-muted: rgba(0, 0, 0, 0.55);
  --reader-panel: #ffffff;
  --reader-hover: rgba(0, 0, 0, 0.06);
  height: 100vh;
  height: 100dvh;
  background: var(--reader-bg);
  color: var(--reader-fg);
  font-family: Arial, Helvetica, sans-serif;
}
.reader-app.theme-light {
  --reader-bg: #f7f8fa;
  --reader-fg: #1a1a1a;
  --reader-border: rgba(0, 0, 0, 0.1);
  --reader-muted: rgba(0, 0, 0, 0.55);
  --reader-panel: #ffffff;
  --reader-hover: rgba(0, 0, 0, 0.06);
  /* DaisyUI utilise ses propres variables pour card/btn/range — on les
     verrouille sur le thème clair pour ne pas hériter du dark via
     prefers-color-scheme (OS sombre). */
  color-scheme: light;
  --b1: 100% 0 0;
  --b2: 96.1151% 0 0;
  --b3: 92.4169% 0.00108 197.137559;
  --bc: 27.8078% 0.029596 256.847952;
  --p: 49.12% 0.3096 275.75;
  --pc: 89.824% 0.06192 275.75;
  --n: 32.1785% 0.02476 255.701624;
  --nc: 89.4994% 0.011585 252.096176;
  --er: 71.76% 0.221 22.18;
  --erc: 0% 0 0;
}
.reader-app.theme-dark {
  --reader-bg: #111111;
  --reader-fg: #e5e5e5;
  --reader-border: rgba(255, 255, 255, 0.14);
  --reader-muted: rgba(255, 255, 255, 0.55);
  --reader-panel: #1c1c1c;
  --reader-hover: rgba(255, 255, 255, 0.08);
  color-scheme: dark;
  --b1: 25.3267% 0.015896 252.417568;
  --b2: 23.2607% 0.013807 253.100675;
  --b3: 21.1484% 0.01165 254.087939;
  --bc: 74.6477% 0.0216 264.435964;
  --p: 65.69% 0.196 275.75;
  --pc: 13.138% 0.0392 275.75;
  --n: 31.3815% 0.021108 254.139175;
  --nc: 74.6477% 0.0216 264.435964;
  --er: 71.76% 0.221 22.18;
  --erc: 0% 0 0;
}
.reader-app.theme-sepia {
  --reader-bg: #f4ecd8;
  --reader-fg: #433422;
  --reader-border: rgba(67, 52, 34, 0.15);
  --reader-muted: rgba(67, 52, 34, 0.6);
  --reader-panel: #fdf8ec;
  --reader-hover: rgba(67, 52, 34, 0.08);
  color-scheme: light;
  --b1: 98.5% 0.015 90;
  --b2: 95% 0.03 90;
  --b3: 91% 0.04 90;
  --bc: 32% 0.045 60;
  --p: 40% 0.07 55;
  --pc: 95% 0.02 90;
  --n: 32% 0.045 60;
  --nc: 93% 0.02 85;
  --er: 71.76% 0.221 22.18;
  --erc: 0% 0 0;
}

/* ---------- Bibliothèque ---------- */
.library-screen {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  padding: 3rem 1.5rem;
}
.library-inner {
  width: 100%;
  max-width: 40rem;
}
.library-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}
.library-sub {
  opacity: 0.6;
  margin-bottom: 2rem;
}
.book-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.book-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--reader-border);
}
.book-title {
  font-weight: 500;
}

/* ---------- Lecteur ---------- */
.reader-screen {
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
}
.reader-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--reader-border);
  background: var(--reader-bg);
  color: var(--reader-fg);
}
.reader-title {
  flex: 1;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.reader-icon-btn {
  color: var(--reader-fg);
  border-color: var(--reader-border);
}
.reader-icon-btn:hover {
  background: var(--reader-hover);
}
.reader-viewer {
  flex: 1;
  min-height: 0;
  position: relative;
}
.reader-footer {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-top: 1px solid var(--reader-border);
  background: var(--reader-bg);
  color: var(--reader-fg);
}

/* Thèmes appliqués au conteneur de rendu (l'iframe est gérée par epubjs) */
.reader-viewer.theme-light { background: #ffffff; }
.reader-viewer.theme-sepia { background: #f4ecd8; }
.reader-viewer.theme-dark { background: #1a1a1a; }

/* ---------- Overlays ---------- */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 30;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
}
.panel {
  background: var(--reader-panel);
  color: var(--reader-fg);
  width: 100%;
  max-width: 24rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);
}
.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--reader-border);
}
.toc-list {
  list-style: none;
  padding: 0.5rem;
  margin: 0;
  overflow-y: auto;
}
.toc-link {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.9rem;
  color: var(--reader-fg);
}
.toc-link:hover {
  background: var(--reader-hover);
}
.toc-sublist {
  list-style: none;
  padding-left: 1rem;
}
.settings-body {
  padding: 1rem;
  overflow-y: auto;
  color: var(--reader-fg);
}
.loading-overlay {
  position: fixed;
  inset: 0;
  background: rgba(247, 248, 250, 0.9);
  z-index: 40;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--reader-fg);
}
.theme-dark .loading-overlay {
  background: rgba(17, 17, 17, 0.9);
}
</style>

<!-- Style global : la page reader n'a pas le Layout, on restaure le curseur natif
     et on masque le curseur custom GSAP (rendu par le Layout, inutile ici) -->
<style>
body.reader-active,
body.reader-active a {
  cursor: auto;
}
body.reader-active .cursor,
body.reader-active .small-cursor {
  display: none;
}
</style>
