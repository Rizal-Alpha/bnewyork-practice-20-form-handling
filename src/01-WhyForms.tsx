import { SyntheticEvent, useState } from 'react';
import { Button } from './components/ui/button';
import { Label } from './components/ui/label';
import { Input } from './components/ui/input';

//====== Me -- Learning by doing!! ===========
//CARA MANUAL FORM: harus handle beragam kemungkinan validasi
export default function WhyForms() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // ini materi type generic, dia terima data bisa string bisa juga null, tapi default nya masih null, krn klo tanpa ini (cuma null) maka klo ada string bisa masalah
  const [submitted, setSubmitted] = useState<string | null>(null);

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    // ni posisi defaultnya, yg nanti akan berubah ketika terpenuhi kondisi.
    //untuk mengosongkan semua pesan error yang ada dari percobaan submit sebelumnya, sebelum fungsi melakukan pengecekan ulang.
    setEmailError('');
    setPasswordError('');

    //asumsi awal bendera hijau: Oke, kita anggap form yang di-submit user ini aman dan benar ya."
    let valid = true;
    if (!email.includes('@')) {
      setEmailError('Email harus mengandung @');
      valid = false; //krna sudah ada error terdeteksi, bendera valid yang tadinya true langsung diturunkan dan diganti menjadi false.
    }

    if (password.length < 6) {
      setPasswordError('Password minimal 6 karakter');
      valid = false;
    }

    if (!valid) return; //kalau bendera tidak hijau, maka JANGAN LANJUTKAN KE setSubmitted dibawah

    setSubmitted(`Submint ok => ${email}`);
  }

  return (
    //biasakan di <form> selalu tulis onSubmit
    <form onSubmit={handleSubmit} className='space-y-4 max-w-sm'>
      <div className='space-y-2'>
        <Label htmlFor='email'>Your email address</Label>
        <Input
          id='email-manual'
          type='email'
          value={email}
          placeholder='youemail@gmail.com'
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className='text-sm text-red-400'>{emailError}</p>}
        {/* && itu jika true (ada error di input email)sebelumnya maka setelah tanda itu hasilnya akan diambil apapun itu, dalam hal ini pembuatan <p>, 
        Tapi jika false (email input no error) sebelum tanda && maka false akan diambil lebih dulu */}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='password-manual'>Password</Label>
        <Input
          id='password-manual'
          type='password'
          value={password} //ini mirip seperti di DOM .value buat ambil nilai yg diinput
          placeholder='***********'
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && (
          <p className='text-sm text-red-400'>{passwordError}</p>
        )}
      </div>
      {/* button */}
      <Button type='submit'>Submit</Button>
      {submitted && <p className='text-sm text-green-400'>{submitted}</p>}
    </form>
  );
}

//CARA AUTO => PAKAI ZHOD

//======== Coach Henry's=============
// export default function WhyForms() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   const [submitted, setSubmitted] = useState<string | null>(null);

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     setEmailError("");
//     setPasswordError("");

//     let valid = true;
//     if (!email.includes("@")) {
//       setEmailError("Email harus mengandung @");
//       valid = false;
//     }

//     if (password.length < 6) {
//       setPasswordError("Password minimal 6 karakter");
//       valid = false;
//     }

//     if (!valid) return;

//     setSubmitted(`Submit ok -> ${email}`);
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
//       {/* email */}
//       <div className="space-y-2">
//         <Label htmlFor="email-manual">Email</Label>
//         <Input
//           id="email-manual"
//           type="email"
//           placeholder="youremail@gmail.com"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         {emailError && <p className="text-sm text-red-400">{emailError}</p>}
//       </div>

//       {/* password */}
//       <div className="space-y-2">
//         <Label htmlFor="password-manual">Password</Label>
//         <Input
//           id="password-manual"
//           type="password"
//           value={password}
//           placeholder="your password"
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         {passwordError && (
//           <p className="text-sm text-red-400">{passwordError}</p>
//         )}
//       </div>

//       {/* button */}
//       <Button type="submit">Submit</Button>
//       {submitted && <p className="text-sm text-green-400">{submitted}</p>}
//     </form>
//   );
// }
