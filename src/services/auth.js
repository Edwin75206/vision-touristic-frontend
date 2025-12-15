const KEY = 'vision_auth'

export function loadAuth() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : { token: null, user: null }
  } catch {
    return { token: null, user: null }
  }
}

export function saveAuth(state) {
  localStorage.setItem(KEY, JSON.stringify(state))
}

export function clearAuth() {
  localStorage.removeItem(KEY)
}
