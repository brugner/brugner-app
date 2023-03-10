/*!
 * Based on color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 */

(() => {
  'use strict'

  const storedTheme = localStorage.getItem('theme') || 'dark';

  const getPreferredTheme = () => {
    if (storedTheme) {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const setTheme = function (theme) {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }

  setTheme(getPreferredTheme())

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (storedTheme !== 'light' || storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#themeSwitcher').addEventListener('click', () => {
      const theme = localStorage.getItem('theme') === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', theme)
      setTheme(theme)
    })
  })
})()
