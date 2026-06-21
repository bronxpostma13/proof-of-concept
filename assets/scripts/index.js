function showFeedback(message) {
  const toast = document.createElement('div')
  toast.className = 'favourite-toast'
  toast.textContent = message
  document.body.appendChild(toast)

  requestAnimationFrame(() => toast.classList.add('is-visible'))
  setTimeout(() => {
    toast.classList.remove('is-visible')
    setTimeout(() => toast.remove(), 300)
  }, 2000)
}
////// hamburger menu 
document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.querySelector('.sidebar');
  const hamburger = document.querySelector('.hamburger-menu');

  if (hamburger && sidebar) {
    hamburger.addEventListener('click', function () {
      // Toggle de actieve status op de sidebar en de knop zelf
      sidebar.classList.toggle('is-active');
      hamburger.classList.toggle('is-active');
      
      // Update aria-expanded voor screenreaders
      const isActive = sidebar.classList.contains('is-active');
      hamburger.setAttribute('aria-expanded', isActive);
    });
  }
});

//////// Filter systeem
////// Filter systeem
////// Zoeken en regio filter (gecombineerd)
const searchInput = document.querySelector('input[type="search"]')

function applyFilters() {
  const activeRegionLink = document.querySelector('[data-region-filter][aria-current="page"]')
  const region = activeRegionLink ? activeRegionLink.dataset.regionFilter : 'all'
  const query = searchInput ? searchInput.value.trim().toLowerCase() : ''

  document.querySelectorAll('.pokemon-link').forEach(item => {
    const name = item.querySelector('h3').textContent.toLowerCase()
    const regionMatch = region === 'all' || item.dataset.region === region
    const searchMatch = name.includes(query)
    item.style.display = (regionMatch && searchMatch) ? '' : 'none'
  })
}

document.querySelectorAll('[data-region-filter]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelectorAll('[data-region-filter]').forEach(l => l.removeAttribute('aria-current'))
    link.setAttribute('aria-current', 'page')
    applyFilters()
  })
})

if (searchInput) {
  searchInput.addEventListener('input', applyFilters)
}

////// Tab systeem (detail pagina)
document.querySelectorAll('[data-tab]').forEach(tab => {
  tab.addEventListener('click', (e) => {
    e.preventDefault()
    const target = tab.dataset.tab

    document.querySelectorAll('[data-tab]').forEach(t => t.removeAttribute('aria-current'))
    tab.setAttribute('aria-current', 'page')

    document.querySelectorAll('[data-tab-panel]').forEach(panel => {
      panel.hidden = panel.dataset.tabPanel !== target
    })
  })
})


////// Favorite knop per card
document.querySelectorAll('.favourite-toggle[data-id]').forEach(button => {
  button.addEventListener('click', async (e) => {
    e.preventDefault()
    e.stopPropagation()

    const id = button.dataset.id
    const isActive = button.classList.contains('is-active')

    const response = await fetch(`/favorites/${id}`, {
      method: isActive ? 'DELETE' : 'POST'
    })

    if (!response.ok) {
      showFeedback('Er ging iets mis, probeer het opnieuw')
      return
    }

    button.classList.toggle('is-active')
    showFeedback(isActive ? 'Verwijderd uit favorieten' : 'Toegevoegd aan favorieten')

    if (document.querySelector('.app').dataset.page === 'favorites' && isActive) {
      button.closest('.pokemon-link').remove()
    }
  })
})