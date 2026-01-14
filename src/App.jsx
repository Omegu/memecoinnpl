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
      });
    } else {
      setRes(null);
    }
  }, [values]);

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 flex items-center justify-center p-4 font-sans">

      {/* Background Decor - วงกลมสีจางๆ ด้านหลังช่วยให้เว็บไม่ดูโล่งเกินไป */}
      <div className="fixed inset-0 overflow-hidden -z-10 flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-emerald-500/5 blur-[100px] rounded-full"></div>
      </div>

      <div className="w-full max-w-md">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent italic">
            🚀 MOON CALC
          </h1>
          <p className="text-slate-400 text-[10px] mt-1 font-bold uppercase tracking-[0.4em]">Memecoin PnL Tracker</p>
        </header>

        <main className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all">
          <div className="space-y-6">

            {/* Investment Input */}
            <div>
              <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">Investment (USD)</label>
              <input
                type="number"
                value={values.investment}
                onChange={(e) => setValues({ ...values, investment: e.target.value })}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 mt-1 outline-none focus:ring-2 focus:ring-emerald-500/20 text-2xl font-bold transition-all placeholder:text-slate-300"
                placeholder="0.00"
              />
            </div>

            {/* Entry Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Entry Price</label>
                <input
                  type="number"
                  value={values.entryPrice}
                  onChange={(e) => setValues({ ...values, entryPrice: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 mt-1 outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="0.000..."
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Entry MC ($)</label>
                <input
                  type="number"
                  value={values.entryMC}
                  onChange={(e) => setValues({ ...values, entryMC: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 mt-1 outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Marketcap"
                />
              </div>
            </div>

            {/* Target MC Section */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Target Market Cap (USD)</label>
              <input
                type="number"
                value={values.targetMC}
                onChange={(e) => setValues({ ...values, targetMC: e.target.value })}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 mt-1 outline-none focus:ring-2 focus:ring-emerald-500/20 text-xl font-bold"
                placeholder="Target MC"
              />

              {/* Quick Buttons - ปรับสีให้เข้ากับ Light Mode */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                {[1000000, 10000000, 50000000, 100000000].map(v => {
                  const isActive = Number(values.targetMC) === v;
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setValues({ ...values, targetMC: v })}
                      className={`py-2.5 rounded-xl text-[11px] font-black transition-all border ${isActive
                          ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-500/20 scale-105'
                          : 'bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200 hover:border-slate-300'
                        }`}
                    >
                      {(v / 1000000)}M
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Result Area */}
            <div className={`transition-all duration-700 ease-out ${res ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 h-0 overflow-hidden'}`}>
              {res && (
                <div className="mt-4 p-6 rounded-[2.5rem] bg-gradient-to-br from-emerald-600 via-emerald-500 to-cyan-600 text-white shadow-xl shadow-emerald-500/20">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-black uppercase opacity-70 tracking-widest">Total Value</p>
                      <h3 className="text-3xl font-black italic">${res.totalValue}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase opacity-70 tracking-widest">ROI</p>
                      <h3 className="text-xl font-black bg-white/20 px-2 py-0.5 rounded-lg">{res.multiplier}x</h3>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-4 flex justify-between items-end">
                    <div className="text-left">
                      <p className="text-[10px] font-black uppercase opacity-70">Net Profit</p>
                      <p className="text-2xl font-black">+${res.netProfit}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] font-bold opacity-70 uppercase">Target Price</p>
                      <p className="text-[10px] font-mono font-bold truncate max-w-[120px]">{res.targetPrice}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        <footer className="mt-8 text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-300">Simple & Precise Calculator</p>
        </footer>
      </div>
    </div>
  )
}

export default App