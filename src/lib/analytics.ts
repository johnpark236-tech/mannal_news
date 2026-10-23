/* Cookie-less, optional GoatCounter analytics. No credentials in browser code. */
type EventInfo = { path: string; title: string; event?: boolean; no_session?: boolean };
type GoatCounter = { count: (data: EventInfo) => void };
declare global {
  interface Window { goatcounter?: GoatCounter; }
}

const code = (import.meta.env.VITE_GOATCOUNTER_CODE || '').trim();
const enabled = /^[a-z0-9][a-z0-9-]{1,62}$/.test(code);
let loading = false;
const queue: EventInfo[] = [];

function flush() {
  if (typeof window.goatcounter?.count !== 'function') return;
  while (queue.length) window.goatcounter.count(queue.shift()!);
}
function count(data: EventInfo) {
  if (!enabled || typeof document === 'undefined') return;
  queue.push(data);
  if (typeof window.goatcounter?.count === 'function') { flush(); return; }
  if (loading) return;
  loading = true;
  const script = document.createElement('script');
  script.src = 'https://gc.zgo.at/count.js';
  script.async = true;
  script.dataset.goatcounter = 'https://' + code + '.goatcounter.com/count';
  script.dataset.goatcounterSettings = JSON.stringify({ no_onload: true, no_events: true });
  script.onload = flush;
  script.onerror = () => { queue.length = 0; };
  document.head.appendChild(script);
}

export function trackNewsView(id: string, title: string) {
  // Hash routing needs an explicit view event; ordinary HTML load misses each article.
  if (!/^[-a-zA-Z0-9_]+$/.test(id)) return;
  count({ path: '/news/' + id, title, event: false });
}

export function trackNewsDownload(file: string) {
  const name = file.split(/[?#]/)[0].split('/').pop() || 'unknown';
  if (!/\.(?:pdf|pptx?|docx?|xlsx?|txt|zip)$/i.test(name)) return;
  count({ path: 'download/news/' + name, title: '뉴스 자료 다운로드: ' + name, event: true, no_session: true });
}
