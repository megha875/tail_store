(function () {
  const KEY = 'tailstoreAdmin';

  function isAdmin() {
    try { return localStorage.getItem(KEY) === 'true'; } catch (e) { return false; }
  }
  function setAdmin(on) {
    try { on ? localStorage.setItem(KEY, 'true') : localStorage.removeItem(KEY); } catch (e) {}
  }
  function editUrl(id) {
    return 'edit-product.html?id=' + encodeURIComponent(id || '');
  }
  function createEditButton(id, positionClasses) {
    if (!isAdmin() || !id) return null;
    const link = document.createElement('a');
    link.href = editUrl(id);
    link.title = 'Edit product';
    link.className = (positionClasses || 'absolute left-3 top-3') +
      ' z-10 flex items-center gap-1 rounded-full bg-[#050B14] px-3 py-1.5 text-xs font-semibold text-white shadow transition hover:bg-[#ff0055]';
    link.innerHTML = '<i class="fa-solid fa-pen text-[10px]"></i> Edit';
    return link;
  }

  window.TailStoreAdmin = { isAdmin, setAdmin, editUrl, createEditButton };
})();