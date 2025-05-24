
import { useState, useRef } from 'react';
import axios from 'axios';

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [lang, setLang] = useState<'th' | 'en'>('th');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const text = {
    th: {
      title: 'ThurianX App',
      subtitle: 'ระบบตรวจสอบระดับการสุกของทุเรียนด้วย AI',
      support: 'สนับสนุนโดย Super AI Innovator IT KMITL และ Bangkok Airways',
      camera: '📷 ถ่ายภาพด้วยกล้อง',
      upload: '📁 เลือกรูปจากคลัง',
      analyze: '🔍 วิเคราะห์ความสุก',
      processing: 'กำลังประมวลผล กรุณารอสักครู่...',
      result: '📊 ผลลัพธ์',
      history: 'ประวัติผลลัพธ์ล่าสุด'
    },
    en: {
      title: 'ThurianX App',
      subtitle: 'Durian Ripeness Detection Powered by AI',
      support: 'Supported by Super AI Innovator IT KMITL & Bangkok Airways',
      camera: '📷 Take Photo',
      upload: '📁 Upload from Gallery',
      analyze: '🔍 Analyze Ripeness',
      processing: 'Processing... please wait',
      result: '📊 Result',
      history: 'Latest Results'
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleSubmit = async () => {
    if (!image) return;
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const demoResults = ['ดิบ', 'พร้อมตัด', 'สุก', 'ไม่สามารถระบุได้ กรุณาดำเนินการใหม่'];
    const randomIndex = Math.floor(Math.random() * demoResults.length);
    const selectedResult = demoResults[randomIndex];
    setResult(selectedResult);
    setHistory(prev => [selectedResult, ...prev.slice(0, 4)]);
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-screen p-6 pt-10 bg-gradient-to-b from-zinc-50 to-neutral-100 dark:from-zinc-900 dark:to-zinc-800 text-center font-sans text-zinc-900 dark:text-white transition-colors">
      <div className="flex justify-between items-center w-full max-w-md mb-4">
        <h1 className="text-3xl font-semibold tracking-tight">{text[lang].title}</h1>
        <button onClick={() => setLang(lang === 'th' ? 'en' : 'th')} className="text-sm text-blue-600 underline">
          {lang === 'th' ? 'EN' : 'TH'}
        </button>
      </div>
      <p className="mb-1 text-base">{text[lang].subtitle}</p>
      <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-300 italic">{text[lang].support}</p>

      <input ref={fileInputRef} type="file" accept="image/*" capture="environment" onChange={handleImageChange} className="hidden" />

      <div className="flex flex-col gap-3 w-full max-w-xs mb-6">
        <button onClick={() => fileInputRef.current?.click()} className="w-full bg-black text-white text-base py-3 rounded-xl shadow-sm hover:bg-neutral-800 transition">
          📷 ถ่ายภาพด้วยกล้อง
        </button>
        <label className="w-full bg-white dark:bg-zinc-700 text-black dark:text-white border border-gray-300 dark:border-zinc-600 py-3 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-zinc-600 cursor-pointer transition">
          📁 เลือกรูปจากคลัง
          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
        </label>
      </div>

      {preview && <img src={preview} alt="preview" className="w-72 h-72 object-cover rounded-2xl shadow-md mb-6 border border-gray-200 dark:border-zinc-700" />}

      <button onClick={handleSubmit} disabled={loading || !image} className="w-full max-w-xs bg-green-600 hover:bg-green-700 text-white py-3 text-lg rounded-full font-medium shadow-md disabled:opacity-50">
        {loading ? text[lang].processing : text[lang].analyze}
      </button>

      {loading && (
        <div className="mt-6 flex flex-col items-center animate-pulse">
          <div className="w-10 h-10 border-[5px] border-green-500 border-dashed rounded-full animate-spin"></div>
          <p className="mt-3 text-base font-medium">{text[lang].processing}</p>
        </div>
      )}

      {result && !loading && (
        <p className="mt-8 text-xl font-semibold">
          {text[lang].result}: <span className="text-orange-600 dark:text-yellow-400">{result}</span>
        </p>
      )}

      {history.length > 0 && (
        <div className="mt-8 w-full max-w-xs">
          <h3 className="text-lg font-medium mb-2">{text[lang].history}</h3>
          <ul className="space-y-1 text-sm text-left">
            {history.map((item, index) => (
              <li key={index} className="px-4 py-2 rounded bg-white dark:bg-zinc-700 shadow">
                {index + 1}. {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <footer className="mt-12 flex flex-col items-center gap-3 opacity-90">
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center">
            <img src="/it-kmitl.webp" alt="IT KMITL" className="h-10 rounded shadow-md grayscale hover:grayscale-0 transition duration-300" />
            <span className="text-xs mt-1 text-zinc-500 dark:text-zinc-400">IT KMITL</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/bangkok.webp" alt="Bangkok Airways" className="h-10 rounded shadow-md grayscale hover:grayscale-0 transition duration-300" />
            <span className="text-xs mt-1 text-zinc-500 dark:text-zinc-400">Bangkok Airways</span>
          </div>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">© 2025 ThurianX Team. Designed with precision and respect for simplicity.</p>
      </footer>
    </main>
  );
}
