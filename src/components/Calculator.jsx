import { useState } from 'react'
import FoodInput from './FoodInput'
import Results from './Results'

export default function Calculator() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState('')

  const addItem = (item) => {
    setItems((prev) => [...prev, item])
  }

  const removeItem = (idx) => {
    setItems((prev) => prev.filter((_, i) => i !== idx))
  }

  const clearAll = () => {
    setItems([])
    setResults(null)
    setError('')
  }

  const calculate = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const data = await res.json()
      setResults(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <FoodInput onAdd={addItem} />

      <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-5">
        <h3 className="text-slate-100 font-semibold mb-3">Your items</h3>
        {items.length ? (
          <div className="space-y-2">
            {items.map((it, idx) => (
              <div key={idx} className="flex items-center justify-between bg-slate-900/50 rounded-md px-3 py-2 border border-slate-700">
                <div>
                  <p className="text-slate-100 font-medium">{it.name}</p>
                  <p className="text-slate-400 text-sm">{it.amount_g} g</p>
                </div>
                <button className="text-slate-300 hover:text-white" onClick={() => removeItem(idx)}>Remove</button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400">Add items to calculate calories.</p>
        )}

        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={calculate}
            disabled={!items.length || loading}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold px-4 py-2 rounded-md"
          >
            {loading ? 'Calculating...' : 'Calculate'}
          </button>
          <button
            onClick={clearAll}
            className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-4 py-2 rounded-md"
          >
            Clear
          </button>
        </div>

        {error && (
          <p className="text-red-300 mt-3">{error}</p>
        )}
      </div>

      <Results results={results} onClear={() => setResults(null)} />
    </div>
  )
}
