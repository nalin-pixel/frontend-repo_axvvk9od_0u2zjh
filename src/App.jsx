import Calculator from './components/Calculator'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <div className="relative min-h-screen flex items-center justify-center p-8">
        <div className="max-w-3xl w-full">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">Calorie Calculator</h1>
            <p className="text-blue-200">Add foods, set amounts, and calculate total calories.</p>
          </div>

          <Calculator />

          <div className="text-center mt-10">
            <p className="text-sm text-blue-300/60">Tip: Use either calories per 100g or per serving.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
