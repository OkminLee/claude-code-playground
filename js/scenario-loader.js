const cache = new Map();
let manifest = null;
const APP_VERSION = '3';

export const loader = {
  async getManifest() {
    if (manifest) return manifest;
    const res = await fetch(`scenarios/manifest.json?v=${APP_VERSION}`);
    if (!res.ok) throw new Error('Failed to load manifest');
    manifest = await res.json();
    return manifest;
  },

  async getScenario(id) {
    if (cache.has(id)) return cache.get(id);
    const m = await this.getManifest();
    const entry = m.scenarios.find(s => s.id === id);
    if (!entry) return null;
    const res = await fetch(`scenarios/${entry.file}?v=${APP_VERSION}`);
    if (!res.ok) throw new Error(`Failed to load scenario: ${id}`);
    const data = await res.json();
    cache.set(id, data);
    return data;
  },

  async getByChapter(chapter) {
    const m = await this.getManifest();
    return m.scenarios.filter(s => s.chapter === chapter);
  },

  async filter({ audience, difficulty } = {}) {
    const m = await this.getManifest();
    let results = m.scenarios;
    if (audience && audience !== 'all') {
      results = results.filter(s => s.audience === audience || s.audience === 'all');
    }
    if (difficulty) {
      results = results.filter(s => s.difficulty === difficulty);
    }
    return results;
  },

  async getNextScenario(currentId) {
    const m = await this.getManifest();
    const idx = m.scenarios.findIndex(s => s.id === currentId);
    return idx >= 0 && idx < m.scenarios.length - 1 ? m.scenarios[idx + 1] : null;
  }
};
