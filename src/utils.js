export function translatedLink(url, lang = 'qu') {
  const base = 'https://translate.google.com/translate';
  const u = new URL(base);
  u.searchParams.set('hl', lang);
  u.searchParams.set('sl', 'auto');
  u.searchParams.set('u', url);
  return u.toString();
}

export function youtubeWithQuechua(url) {
  try {
    const u = new URL(url);
    u.searchParams.set('hl', 'qu');
    u.searchParams.set('cc_lang_pref', 'qu');
    u.searchParams.set('cc_load_policy', '1');
    return u.toString();
  } catch {
    return url;
  }
}

export function hostLabel(url) {
  try { return new URL(url).host.replace('www.', ''); }
  catch { return url; }
}
