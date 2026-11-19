const API_URL = import.meta.env.VITE_API_URL
const TIMEOUT_MS = 5000

export const wordExists = async (word) => {
  const url = `${API_URL}/api/validate?word=${encodeURIComponent(word)}`
  const response = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) })

  if (!response.ok) {
    throw new Error(`La API respondió ${response.status}`)
  }

  const data = await response.json()
  return data.exists
}