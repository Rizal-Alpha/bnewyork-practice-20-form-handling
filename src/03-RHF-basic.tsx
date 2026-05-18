import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';

type FormValues = {
  fullName: string;
  email: string;
};

export default function RHFBasics() {
  //di useForm ini kita harus pakai 'generic type' agar TS tau 'strukur' formnya
  //yg dalam tanda {} tu adalah fungsi yg diperlukan dari useForm
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      fullName: '',
      email: '',
    },
  });
  //ini bukan dari RHF, ni cuma bantu biar
  const [submitted, setSubmitted] = useState<FormValues | null>(null);
  //============================
  function onValid(data: FormValues) {
    //agar bisa berjalan fungsi berikut
    setSubmitted(data);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onValid)} className='space-y-4 max-w-sm'>
      {/* full name */}
      <div className='space-y-2'>
        <Label htmlFor='rhf-name'>Full name</Label>
        {/* register ni fungsi bawaan */}
        <Input id='rhf-name' {...register('fullName')} placeholder='Jhon Doe' />
      </div>

      {/* email */}
      <div className='space-y-2'>
        <Label htmlFor='rhf-email'>Email</Label>
        <Input
          id='rhf-email'
          {...register('email')}
          placeholder='Jhon Doe@gamil.com'
        />
      </div>

      <Button type='submit'>Submit dengan RHF</Button>
      {submitted && (
        <div>
          <p>Submitted</p>
          <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      )}
    </form>
  );
}

//=================coach henry's=================
// type FormValues = {
//   fullName: string;
//   email: string;
// };

// export default function RHFBasic() {
//   const { register, handleSubmit, reset } = useForm<FormValues>({
//     defaultValues: {
//       fullName: "",
//       email: "",
//     },
//   });

//   const [submitted, setSubmitted] = useState<FormValues | null>(null);

//   function onValid(data: FormValues) {
//     setSubmitted(data);
//     reset();
//   }

//   return (
//     <form onSubmit={handleSubmit(onValid)} className="space-y-4 max-w-sm">
//       {/* full name */}
//       <div className="space-y-2">
//         <Label htmlFor="rhf-name">Full Name</Label>
//         <Input id="rhf-name" {...register("fullName")} placeholder="John Doe" />
//       </div>

//       {/* email */}
//       <div className="space-y-2">
//         <Label htmlFor="rhf-email">Email</Label>
//         <Input
//           id="rhf-email"
//           type="email"
//           {...register("email")}
//           placeholder="John@email.com"
//         />

//         <Button type="submit">Submit dengan React Hook Form</Button>

//         {submitted && (
//           <div className="rounded-md border border-green-700 bg-green-900 p-3 text-sm">
//             <p className="text-green-300 font-semibold mb-1">Submitted</p>
//             <pre className="text-green-200">
//               {JSON.stringify(submitted, null, 2)}
//             </pre>
//           </div>
//         )}
//       </div>
//     </form>
//   );
// }
