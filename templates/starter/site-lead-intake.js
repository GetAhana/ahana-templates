/**
 * Ahana — website contact form → Supabase site-lead-intake → My Leads tab.
 * Per-client tokens are resolved at launch (see docs/LAUNCH-SITE-LEADS.md).
 */
(function () {
  var PLACEHOLDER = /\{\{/

  function readConfig() {
    var form = document.getElementById('contact-form')
    if (form) {
      var url = (form.getAttribute('data-intake-url') || '').trim()
      var token = (form.getAttribute('data-client-token') || '').trim()
      if (url && token && !PLACEHOLDER.test(url) && !PLACEHOLDER.test(token)) {
        return { intakeUrl: url, clientToken: token }
      }
    }
    var cfg = document.getElementById('site-lead-config')
    if (cfg && cfg.textContent) {
      try {
        var j = JSON.parse(cfg.textContent)
        if (j.intakeUrl && j.clientToken && !PLACEHOLDER.test(j.intakeUrl) && !PLACEHOLDER.test(j.clientToken)) {
          return j
        }
      } catch (err) {
        /* ignore */
      }
    }
    return null
  }

  function submitSiteLead(payload) {
    var cfg = readConfig()
    if (!cfg) return Promise.reject(new Error('Site lead routing is not configured'))
    return fetch(cfg.intakeUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.assign({ client_token: cfg.clientToken }, payload)),
    }).then(function (res) {
      if (!res.ok) throw new Error('submit failed')
      return res.json().catch(function () {
        return {}
      })
    })
  }

  /** Enhanced / Premium contact page — inline quote form (#n, #ph, …). */
  window.ahanaSubmitContactLead = function (e) {
    if (e && e.preventDefault) e.preventDefault()
    var name = (document.getElementById('n')?.value || '').trim()
    var phone = (document.getElementById('ph')?.value || '').trim()
    var email = (document.getElementById('em')?.value || '').trim()
    var service = (document.getElementById('sv')?.value || '').trim()
    var zip = (document.getElementById('z')?.value || '').trim()
    var timing = (document.getElementById('t')?.value || '').trim()
    var message = (document.getElementById('d')?.value || '').trim()
    var address = (document.getElementById('addr')?.value || '').trim()

    if (!name || !phone || !service || !zip) {
      alert('Please fill in all required fields.')
      return
    }

    var btn = document.querySelector('#form button[type="button"], #form button[type="submit"]')
    if (btn) btn.disabled = true

    submitSiteLead({
      name: name,
      phone: phone,
      email: email || null,
      address: address || null,
      zip: zip,
      service: service,
      timing: timing || null,
      message: message || null,
    })
      .then(function () {
        var form = document.getElementById('form')
        var ok = document.getElementById('ok')
        if (form) form.style.display = 'none'
        if (ok) ok.style.display = 'block'
      })
      .catch(function () {
        if (btn) btn.disabled = false
        alert('Something went wrong sending your request. Please call us instead.')
      })
  }

  function bindStarterForm() {
    var form = document.getElementById('contact-form')
    var success = document.getElementById('form-success')
    if (!form) return

    form.addEventListener('submit', function (e) {
      if (!form.checkValidity()) {
        form.reportValidity()
        return
      }

      var cfg = readConfig()
      if (cfg) {
        e.preventDefault()
        var fd = new FormData(form)
        var btn = form.querySelector('button[type="submit"]')
        if (btn) btn.disabled = true
        submitSiteLead({
          name: fd.get('name'),
          phone: fd.get('phone'),
          email: fd.get('email'),
          address: fd.get('address'),
          zip: fd.get('zip'),
          service: fd.get('service'),
          timing: fd.get('timing'),
          message: fd.get('message'),
        })
          .then(function () {
            form.style.display = 'none'
            if (success) success.style.display = 'block'
          })
          .catch(function () {
            if (btn) btn.disabled = false
            alert('Something went wrong sending your request. Please call us instead.')
          })
        return
      }

      if (form.getAttribute('data-netlify') === 'true') return
      var action = (form.getAttribute('action') || '').trim()
      if (action && action !== '#' && !/^javascript:/i.test(action)) {
        try {
          var u = new URL(action, window.location.href)
          if (u.origin !== window.location.origin) return
        } catch (err) {
          return
        }
      }
      e.preventDefault()
      form.style.display = 'none'
      if (success) success.style.display = 'block'
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindStarterForm)
  } else {
    bindStarterForm()
  }
})()
