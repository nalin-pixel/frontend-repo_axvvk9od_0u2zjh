export default function Results({ results, onClear }) {
  if (!results) return null

  const total = results.total_calories ?? 0
  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-slate-100 font-semibold">Results</h3>
        <button onClick={onClear} className="text-sm text-slate-300 hover:text-white">Clear</button>
      </div>

      <div className="space-y-2">
        {results.items?.length ? results.items.map((it, idx) => (
          <div key={idx} className="flex items-center justify-between bg-slate-900/50 rounded-md px-3 py-2 border border-slate-700">
            <div>
              <p className="text-slate-100 font-medium">{it.name}</p>
              <p className="text-slate-400 text-sm">{it.amount_g} g • {it.method.replace('_', ' ')}</p>
              {it.note && <p className="text-amber-300 text-xs mt-1">{it.note}</p>}
            </div>
            <div className="text-right">
              <p className="text-white font-semibold">{it.calories} kcal</p>
            </div>
          </div>
        )) : (
          <p className="text-slate-400">No items calculated yet.</p>
        )}
      </div>

      <div className="pt-3 border-t border-slate-700 flex items-center justify-between">
        <span className="text-slate-300">Total</span>
        <span className="text-white font-bold text-lg">{total} kcal</span>
      </div>
    </div>
  )
}
