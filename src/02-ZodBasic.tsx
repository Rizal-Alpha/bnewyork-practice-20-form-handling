import { useState } from 'react';
import { z } from 'zod';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
//======== Me learning no excuses ========
const userSchema = z.object({
  //ada perbaikan versi zod terbaru => using   message:
  email: z.email({ error: 'Emailnya gak valid' }),
  age: z
    .number({ error: 'Age harus angka' })
    .min(17, 'minimal 17 tahun')
    .max(100, 'maksimal 100 tahun'),
  username: z.string().min(3, 'username minimal 3 huruf'),
});

type User = z.infer<typeof userSchema>;

export default function ZodBasic() {
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(''); //age di sini nda apa string dulu, kan bisa diubah ke number,
  const [userName, setUserName] = useState('');

  //schema: resep; parse: cek data; z.parse kalau gagal langsung throw error (crash); klo z.safeParse klo gagal (dalam object)
  const result = userSchema.safeParse({
    email,
    age: age === '' ? undefined : Number(age),
    userName,
  });

  return (
    <div className='space-y-4 max-w-md'>
      {/* email */}
      <div className='space-y-2'>
        <Label htmlFor='zod-email'>Your email address</Label>
        <Input
          id='zod-email'
          type='email'
          value={email}
          placeholder='youemail@gmail.com'
          onChange={(e) => setEmail(e.target.value)} //Tanpa adanya onChange, kamu tidak akan bisa mengetik apa pun di kotak input tersebut.
        />
        {/* nah ini karna udah pakai zod, nda penting lagi */}
        {/* {emailError && <p className='text-sm text-red-400'>{emailError}</p>} */}
      </div>

      {/*age  */}
      <div className='space-y-2'>
        <Label htmlFor='zod-age'>Age</Label>
        <Input
          id='zod-age'
          type='number'
          value={age}
          placeholder='your age'
          onChange={(e) => setAge(e.target.value)} //Tanpa adanya onChange, kamu tidak akan bisa mengetik apa pun di kotak input tersebut.
        />
        {/* nah ini karna udah pakai zod, nda penting lagi */}
      </div>

      {/*username  */}
      <div className='space-y-2'>
        <Label htmlFor='zod-username'>Username</Label>
        <Input
          id='zod-username'
          type='text'
          value={userName}
          placeholder='your username'
          onChange={(e) => setUserName(e.target.value)} //Tanpa adanya onChange, kamu tidak akan bisa mengetik apa pun di kotak input tersebut.
        />
        {/* nah ini karna udah pakai zod, nda penting lagi */}
      </div>

      <div>
        {/* kondisi klo sukses */}
        {result.success ? (
          <div>
            <p>Valid</p>
            <pre>{JSON.stringify(result.data satisfies User, null, 2)}</pre>
          </div> // satisfies untuk mengatasi agar tidak melebar
        ) : (
          // kondisi klo nda sukses
          <div>
            <p>Tidak Valid</p>
            <ul>
              {result.error.issues.map((issue, i) => (
                <li key={i}>
                  <span>{issue.path.join(',') || 'root'}</span> :{''}
                  {issue.message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// kita nda mau aplikasi langsung crash tanpa info ke user, tapi pesan error harus diketahui oleh user
//==========Coach Henry's==========
// const userSchema = z.object({
//   email: z.string().email("Email-nya ga valid"),
//   age: z
//     .number({ invalid_type_error: "Age harus angka" })
//     .min(17, "Minimal 17 tahun"),
//   username: z
//     .string()
//     .min(3, "Username minimal 3 huruf")
//     .max(10, "melebihi karakter"),
// });

// type User = z.infer<typeof userSchema>;

// export default function ZodBasic() {
//   const [email, setEmail] = useState("");
//   const [age, setAge] = useState("");
//   const [username, setUsername] = useState("");

//   const result = userSchema.safeParse({
//     email,
//     age: age === "" ? undefined : Number(age),
//     username,
//   });

//   return (
//     <div className="space-y-4 max-w-md">
//       {/* email */}
//       <div className="space-y-2">
//         <Label htmlFor="zod-email">Email</Label>
//         <Input
//           id="zod-email"
//           type="email"
//           placeholder="contoh@gmail.com"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>

//       {/* age */}

//       <div className="space-y-2">
//         <Label htmlFor="zod-age">Age</Label>
//         <Input
//           id="zod-age"
//           type="number"
//           placeholder="your age"
//           value={age}
//           onChange={(e) => setAge(e.target.value)}
//         />
//       </div>

//       {/* username */}
//       <div className="space-y-2">
//         <Label htmlFor="zod-username">Username</Label>
//         <Input
//           id="zod-username"
//           placeholder="username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </div>

//       <div className="rounded-md border border-slate-700 bg-slate-800 p-4 text-sm">
//         {result.success ? (
//           <div className="space-y-1">
//             <p className="text-green-400 font-semibold">Valid</p>
//             <pre className="text-slate-300">
//               {JSON.stringify(result.data satisfies User, null, 2)}
//             </pre>
//           </div>
//         ) : (
//           <div className="space-y-1">
//             <p className="text-red-400 font-semibold">Tidak valid</p>

//             <ul className="list-disc list-inside text-red-600">
//               {result.error.issues.map((issue, idx) => (
//                 <li key={idx}>
//                   <span className="text-red-200 font-mono">
//                     {issue.path.join(".") || "root"}
//                   </span>{" "}
//                   : {issue.message}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
