import { useState, useEffect } from 'react'

function App() {
  const [values, setValues] = useState({
    investment: '',
    entryPrice: '',
    entryMC: '',
    targetMC: ''
  });
  const [res, setRes] = useState(null);

  useEffect(() => {
    const { investment, entryPrice, entryMC, targetMC } = values;
    if (investment && entryPrice && entryMC && targetMC) {
      const multiplier = targetMC / entryMC;
      const targetPrice = entryPrice * multiplier;
      const totalValue = investment * multiplier;
      const netProfit = totalValue - investment;

      setRes({
        targetPrice: targetPrice < 0.000001 ? targetPrice.toFixed(10) : targetPrice.toLocaleString(undefined, { maximumFractionDigits: 8 }),
        totalValue: totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 }),
        netProfit: netProfit.toLocaleString(undefined, { maximumFractionDigits: 2 }),
        multiplier: multiplier.toFixed(2),
        roi: ((multiplier - 1) * 100).toLocaleString(undefined, { maximumFractionDigits: 0 })
      });
    } else {
      setRes(null);
    }
  }, [values]);

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center p-4">
      {/* Background Glow - เพิ่มมิติให้พื้นหลัง */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="w-full max-w-md">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            🚀 MOON CALCULATOR
          </h1>
          <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest">Memecoin PnL Tracker</p>
        </header>

        <main className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
          <div className="space-y-6">
            {/* Input: Investment */}
            <div>
              <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider ml-1">Investment (USD)</label>
              <input
                type="number"
                value={values.investment}
                onChange={(e) => setValues({ ...values, investment: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-4 mt-1 outline-none focus:border-emerald-500/50 text-xl font-medium transition-all"
                placeholder="0.00"
              />
            </div>

            {/* Entry Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Entry Price</label>
                <input
                  type="number"
                  value={values.entryPrice}
                  onChange={(e) => setValues({ ...values, entryPrice: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 mt-1 outline-none focus:border-blue-500/50 transition-all"
                  placeholder="0.000..."
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Entry MC ($)</label>
                <input
                  type="number"
                  value={values.entryMC}
                  onChange={(e) => setValues({ ...values, entryMC: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 mt-1 outline-none focus:border-blue-500/50 transition-all"
                  placeholder="Marketcap"
                />
              </div>
            </div>

            {/* Target MC */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Target Market Cap (USD)</label>
              <input
                type="number"
                value={values.targetMC}
                onChange={(e) => setValues({ ...values, targetMC: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 mt-1 outline-none focus:border-emerald-500/50 transition-all text-lg"
                placeholder="Target MC"
              />

              {/* Quick Select Buttons - แก้ไขบัคสีและสถานะปุ่ม */}
              <div className="flex flex-wrap gap-2 mt-3">
                {[1000000, 10000000, 50000000, 100000000].map(v => {
                  // เช็คว่าค่าปัจจุบันตรงกับปุ่มนี้หรือไม่
                  const isActive = Number(values.targetMC) === v;

                  return (
                    <button
                      key={v}
                      onClick={() => setValues({ ...values, targetMC: v })}
                      className={`flex-1 py-2 rounded-xl text-[10px] font-black transition-all duration-200 border ${isActive
                        ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 scale-105'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/20'
                        }`}
                    >
                      {(v / 1000000)}M
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Result Display */}
            <div className={`transition-all duration-500 ${res ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 h-0 overflow-hidden'}`}>
              {res && (
                <div className="mt-4 p-6 rounded-[2rem] bg-gradient-to-br from-emerald-500 to-blue-600 text-slate-950 shadow-xl shadow-emerald-500/20">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-black uppercase opacity-60">Portfolio Value</p>
                      <h3 className="text-3xl font-black">${res.totalValue}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase opacity-60">Multiplier</p>
                      <h3 className="text-xl font-black">{res.multiplier}x</h3>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between items-end border-t border-black/10 pt-4">
                    <div>
                      <p className="text-[10px] font-black uppercase opacity-60">Net Profit</p>
                      <p className="text-xl font-bold">+${res.netProfit}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-bold opacity-60 uppercase tracking-tighter">Target Price</p>
                      <p className="text-[10px] font-mono font-bold">{res.targetPrice}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App