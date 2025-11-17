import { useState } from 'react'

function Radio({ checked, onChange, label, name, value }) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
      <input
        type="radio"
        className="accent-blue-500"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className="text-sm text-slate-200">{label}</span>
    </label>
  )
}

export default function FoodInput({ onAdd }) {
  const [name, setName] = useState('')
  const [amountG, setAmountG] = useState('')
  const [mode, setMode] = useState('per100')
  const [cal100, setCal100] = useState('')
  const [calServing, setCalServing] = useState('')
  const [servingG, setServingG] = useState('')
  const [error, setError] = useState('')

  const reset = () => {
    setName('')
    setAmountG('')
    setCal100('')
    setCalServing('')
    setServingG('')
    setError('')
  }

  const handleAdd = (e) => {
    e.preventDefault()
    setError('')

    const amt = parseFloat(amountG)
    if (!name.trim()) return setError('Please enter a food name')
    if (isNaN(amt) || amt <= 0) return setError('Enter a valid amount in grams')

    let item = {
      name: name.trim(),
      amount_g: amt,
    }

    if (mode === 'per100') {
      const c100 = parseFloat(cal100)
      if (isNaN(c100) || c100 < 0) return setError('Enter calories per 100g')
      item.calories_per_100g = c100
    } else {
      const cs = parseFloat(calServing)
      const sg = parseFloat(servingG)
      if (isNaN(cs) || cs < 0 || isNaN(sg) || sg <= 0) {
        return setError('Enter calories per serving and serving size (g)')
      }
      item.calories_per_serving = cs
      item.serving_size_g = sg
    }

    onAdd(item)
    reset()
  }

  return (
    <form onSubmit={handleAdd} className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-5 space-y-4">
      {error && (
        <div className="text-red-300 bg-red-900/20 border border-red-500/30 px-3 py-2 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <div className="md:col-span-2">
          <label className="block text-slate-300 text-sm mb-1">Food name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Chicken breast"
            className="w-full bg-slate-900/60 text-white rounded-md border border-slate-700 px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 text-sm mb-1">Amount (g)</label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={amountG}
            onChange={(e) => setAmountG(e.target.value)}
            placeholder="150"
            className="w-full bg-slate-900/60 text-white rounded-md border border-slate-700 px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        <div className="md:col-span-2 flex items-end gap-4">
          <Radio
            name="mode"
            value="per100"
            checked={mode === 'per100'}
            onChange={() => setMode('per100')}
            label="Use calories per 100g"
          />
          <Radio
            name="mode"
            value="perserving"
            checked={mode === 'perserving'}
            onChange={() => setMode('perserving')}
            label="Use per serving"
          />
        </div>
      </div>

      {mode === 'per100' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-1">
            <label className="block text-slate-300 text-sm mb-1">Calories per 100g</label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={cal100}
              onChange={(e) => setCal100(e.target.value)}
              placeholder="165"
              className="w-full bg-slate-900/60 text-white rounded-md border border-slate-700 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-slate-300 text-sm mb-1">Calories per serving</label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={calServing}
              onChange={(e) => setCalServing(e.target.value)}
              placeholder="200"
              className="w-full bg-slate-900/60 text-white rounded-md border border-slate-700 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-sm mb-1">Serving size (g)</label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={servingG}
              onChange={(e) => setServingG(e.target.value)}
              placeholder="50"
              className="w-full bg-slate-900/60 text-white rounded-md border border-slate-700 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-md transition-colors"
        >
          Add item
        </button>
      </div>
    </form>
  )
}
