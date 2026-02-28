import { actions } from 'astro:actions';
import { useState } from 'react';

export default function EstimateForm() {
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { data, error } = await actions.getEstimate(formData);
    
    if (error) setStatus({ type: 'error', msg: error.message });
    else setStatus({ type: 'success', msg: data.message });
  };

  return (
    <div className="bg-zinc-900/90 backdrop-blur-md p-8 border border-zinc-800 rounded-sm shadow-2xl relative">
      <h2 className="text-3xl font-bold uppercase text-center mb-1 text-white font-display">Request Estimate</h2>
      <p className="text-[10px] text-center text-zinc-500 mb-8 tracking-widest uppercase">The No-Surprise Guarantee</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input name="fullName" type="text" placeholder="FULL NAME*" required className="bg-black border border-zinc-800 p-3 text-xs text-white focus:border-orange-600 outline-none" />
          <input name="phoneNumber" type="tel" placeholder="PHONE NUMBER*" required className="bg-black border border-zinc-800 p-3 text-xs text-white focus:border-orange-600 outline-none" />
        </div>
        <input name="email" type="email" placeholder="EMAIL ADDRESS*" required className="w-full bg-black border border-zinc-800 p-3 text-xs text-white focus:border-orange-600 outline-none" />
        <input name="address" type="text" placeholder="PROPERTY ADDRESS (START TYPING)*" required className="w-full bg-black border border-zinc-800 p-3 text-xs text-white focus:border-orange-600 outline-none" />

        <div className="space-y-3 pt-2">
          <label className="flex gap-3 text-[9px] leading-tight text-zinc-400 cursor-pointer">
            <input type="checkbox" required className="mt-1 accent-orange-600" />
            <span>I AGREE TO <span className="text-orange-600 underline">TERMS & PRIVACY POLICY</span> AND CONSENT TO SMS MESSAGES.</span>
          </label>
        </div>

        <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 transition-colors text-white font-black py-4 uppercase tracking-widest text-sm flex items-center justify-center gap-2 mt-4">
          Check Availability & Get Quote ➔
        </button>
        
        {status && (
          <p className={`text-center text-[10px] mt-4 font-bold ${status.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
            {status.msg}
          </p>
        )}
      </form>
    </div>
  );
}
