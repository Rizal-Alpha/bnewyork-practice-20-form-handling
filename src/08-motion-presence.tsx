import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export default function MotionPresence() {
  const [showToast, setShowToast] = useState(false);
  const [items, setItems] = useState<{ id: number; text: string }[]>([
    { id: 1, text: 'beli kopi' },
    { id: 2, text: 'belajar React' },
  ]);
  const [nextId, setNextId] = useState(3);
  function addItem() {
    setItems((curr) => [...curr, { id: nextId, text: `Task #${nextId}` }]);
    setNextId((n) => n + 1);
  }
  function removeItem(id) {
    setItems((curr) => curr.filter((it) => it.id !== id));
  }

  return (
    <div>
      <div>
        <p>Contoh toast notification, menggunakan exit animation</p>
      </div>
      <Button className='mb-4' onClick={() => setShowToast((v) => !v)}>
        {/* jangan lupa buat state lagi di atas */}
        {showToast ? 'Sembunyikan toast' : 'Tampilkan Toast'}
      </Button>
      {/* untuk fitur hilangkan komponen, maka harus pakai AnimatePresence, agar ada fitur exit.. hilangkan/memunculkan html terkait, krna klo versi selainnya, html masih ada walau UI hilang, tanpa ini motion akan makin lemot */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            key='toast'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className='rounded-md bg-green-600 px-4 py-2 text-white inline-block shadow-lg'
          >
            Berhasil disimpan
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

//==============Hnery's===================
// export default function MotionPresence() {
//   const [showToast, setShowToast] = useState(false);

//   const [items, setItems] = useState<{ id: number; text: string }[]>([
//     { id: 1, text: "Beli kopi" },
//     { id: 2, text: "Belajar React" },
//   ]);
//   const [nextId, setNextId] = useState(3);

//   function addItem() {
//     setItems((curr) => [...curr, { id: nextId, text: `Task #${nextId}` }]);
//     setNextId((n) => n + 1);
//   }

//   function removeItem(id: number) {
//     setItems((curr) => curr.filter((it) => it.id !== id));
//   }

//   return (
//     <div className="space-y-8">
//       <div>
//         <p className="text-sm text-slate-400 mb-2">
//           Demo 1: Toast notification (exit animation)
//         </p>

//         <Button onClick={() => setShowToast((v) => !v)} className="mb-4">
//           {showToast ? "Sembunyikan toast" : "Tampilkan toast"}
//         </Button>

//         <AnimatePresence>
//           {showToast && (
//             <motion.div
//               key="toast"
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.25 }}
//               className="rounded-md bg-green-600 px-4 py-2 text-white inline-block shadow-lg"
//             >
//               ✅ Berhasil disimpan!
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       <div>
//         <p className="text-sm text-slate-400 mb-2">
//           Demo 2: List dengan staggered animation
//         </p>

//         <Button onClick={addItem} className="mb-4">
//           + Tambah task
//         </Button>

//         <ul className="space-y-2 max-w-sm">
//           <AnimatePresence>
//             {items.map((item) => (
//               <motion.li
//                 key={item.id}
//                 layout
//                 initial={{ opacity: 0, x: -30 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: 30 }}
//                 transition={{ duration: 0.25 }}
//                 className="flex items-center justify-between rounded-md bg-slate-800 px-3 py-2"
//               >
//                 <span>{item.text}</span>
//                 <button
//                   type="button"
//                   onClick={() => removeItem(item.id)}
//                   className="text-red-400 hover:text-red-300 text-sm"
//                 >
//                   Hapus
//                 </button>
//               </motion.li>
//             ))}
//           </AnimatePresence>
//         </ul>
//       </div>
//     </div>
//   );
// }
