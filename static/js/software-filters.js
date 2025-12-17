/**
 * Software Database Filters
 * Client-side filtering for the software list page
 */

(function() {
  'use strict';

  // Elements
  const searchInput = document.getElementById('software-search');
  const grid = document.getElementById('software-grid');
  const resultCount = document.getElementById('result-count');
  const noResults = document.getElementById('no-results');
  const useAreaFilter = document.getElementById('use-area-filter');

  // Filter buttons
  const riskButtons = document.querySelectorAll('.risk-filter');
  const countryButtons = document.querySelectorAll('.country-filter');

  // All cards
  const cards = grid ? Array.from(grid.querySelectorAll('.software-card')) : [];

  // Current filter state
  let filters = {
    search: '',
    risk: 'all',
    country: 'all',
    useArea: 'all'
  };

  // EU/EEA countries for filtering
  const euCountries = [
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
    'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
    'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
    // EEA additions
    'IS', 'LI', 'NO'
  ];

  /**
   * Apply all filters and update visibility
   */
  function applyFilters() {
    let visibleCount = 0;

    cards.forEach(card => {
      const name = card.dataset.name || '';
      const vendor = card.dataset.vendor || '';
      const risk = card.dataset.risk || '';
      const country = card.dataset.country || '';
      const useAreas = (card.dataset.useAreas || '').split(',');

      // Check search filter
      const searchMatch = filters.search === '' ||
        name.includes(filters.search.toLowerCase()) ||
        vendor.includes(filters.search.toLowerCase());

      // Check risk filter
      const riskMatch = filters.risk === 'all' || risk === filters.risk;

      // Check country filter
      let countryMatch = filters.country === 'all';
      if (filters.country === 'NO') {
        countryMatch = country === 'NO';
      } else if (filters.country === 'EU') {
        countryMatch = euCountries.includes(country) && country !== 'NO';
      } else if (filters.country === 'US') {
        countryMatch = country === 'US';
      }

      // Check use area filter
      const useAreaMatch = filters.useArea === 'all' || useAreas.includes(filters.useArea);

      // Show/hide card
      const visible = searchMatch && riskMatch && countryMatch && useAreaMatch;
      card.style.display = visible ? '' : 'none';

      if (visible) visibleCount++;
    });

    // Update count
    if (resultCount) {
      resultCount.textContent = visibleCount;
    }

    // Show/hide no results message
    if (noResults) {
      noResults.classList.toggle('hidden', visibleCount > 0);
    }
  }

  /**
   * Set active state on filter buttons
   */
  function setActiveButton(buttons, activeValue) {
    buttons.forEach(btn => {
      const value = btn.dataset.risk || btn.dataset.country;
      btn.classList.toggle('active', value === activeValue);
    });
  }

  // Event listeners
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filters.search = e.target.value;
      applyFilters();
    });
  }

  riskButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.risk = btn.dataset.risk;
      setActiveButton(riskButtons, filters.risk);
      applyFilters();
    });
  });

  countryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.country = btn.dataset.country;
      setActiveButton(countryButtons, filters.country);
      applyFilters();
    });
  });

  if (useAreaFilter) {
    useAreaFilter.addEventListener('change', (e) => {
      filters.useArea = e.target.value;
      applyFilters();
    });
  }

  // Initialize
  applyFilters();
})();
