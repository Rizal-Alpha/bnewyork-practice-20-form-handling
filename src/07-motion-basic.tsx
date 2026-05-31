import { motion } from 'motion/react';
import { useState } from 'react';
import { Button } from './components/ui/button';

export default function MotionScale() {
  const [isRight, setIsRight] = useState(false);
  return (
    <div className='space-y-6'>
      <div>
        <div>
          <p className='text-sm text-slate-400 mb-2'>
            Demo: Fade in saat pertama kali muncul
          </p>
        </div>
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className='rounded-md bg-blue-600 px-4 py-3 text-white inline-block'
          >
            Hallo, saya animasi fade in
          </motion.div>
        </div>
      </div>
      <div>
        <p>Demo 2: Geser ke kiri/kanan (pakai state)</p>
        <div className='rounded-md border border-dashed border-slate-700 p-3 mb-3'>
          <motion.div
            animate={{ x: isRight ? 200 : 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 12 }}
            className='h-12 w-12 rounded-md bg-pink-500'
          ></motion.div>
          <Button
            onClick={() => setIsRight((v) => !v)}
            className='mt-5 border border-1 rounded-sm px-2 py-2'
          >
            {isRight ? 'Geser ke kiri' : 'Geser ke kanan'}
          </Button>
          {/* then, ayo buat useState nya, di atas */}
        </div>
      </div>
      <div>
        <p>Demo 3: Hover & Tap</p>
        <motion.div
          whileHover={{ scale: 1.5 }}
          whileTap={{ scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className='inline-block cursor-pointer rounded-md bg-purple-600 px-3 py-3 text-white font-semibold select-none'
        >
          Hover me/Tap Me
        </motion.div>
      </div>
    </div>
  );
}

//===================Henry's====================
// export default function MotionScale() {
//   const [isRight, setIsRight] = useState(false);
//   return (
//     <div className="space-y-6">
//       <div>
//         <div>
//           <p className="text-sm text-slate-400 mb-2">
//             Demo: Fade in saat pertama kali muncul
//           </p>
//         </div>

//         <div>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//             className="rounded-md bg-blue-600 px-4 py-3 text-white inline-block"
//           >
//             Hallo, saya animasi fade in
//           </motion.div>
//         </div>
//       </div>

//       {/* demo 2 */}
//       <div>
//         <p>Demo 2: Geser ke kiri/kanan (pakai state)</p>
//       </div>
//       <div className="rounded-md border border-dashed border-slate-700 p-3 mb-3">
//         <motion.div
//           animate={{ x: isRight ? 200 : 0 }}
//           transition={{ type: "spring", stiffness: 120, damping: 12 }}
//           className="h-12 w-12 rounded-md bg-pink-500"
//         />
//         <Button onClick={() => setIsRight((v) => !v)} className="mt-5">
//           {isRight ? "Geser ke kiri" : "Geser ke kanan"}
//         </Button>
//       </div>

//       <div>
//         <p>Demo 3: Hover & Tap</p>

//         <motion.div
//           whileHover={{ scale: 1.5 }}
//           whileTap={{ scale: 0.8 }}
//           transition={{ type: "spring", stiffness: 300 }}
//           className="inline-block cursor-pointer rounded-md bg-purple-600 px-3 py-3 text-white font-semibold select-none"
//         >
//           Hover me / Tap Me
//         </motion.div>
//       </div>
//     </div>
//   );
// }
