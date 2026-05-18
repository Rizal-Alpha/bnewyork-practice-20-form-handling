import { zodResolver } from '@hookform/resolvers/zod'; //kita minta untuk validasi dilakukan oleh zod, RHF hanya untuk management state
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';


//================================
const loginSchema = z.object({
  email: z.string().min(1, 'Email wajib diisi').email('Format email salah'),
  password: z
    .string()
    .min(5, 'Password minimal 5 karakter') // Diubah jadi 5 sesuai schema
    .regex(/[A-Z]/, 'Harus ada minimal 1 huruf besar')
    .regex(/[0-9]/, 'Harus ada minimal 1 angka'),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function ZodPlusRHF() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
  });

  // 1. Fungsi handle submit dimasukkan ke dalam komponen agar bisa akses 'reset'
  async function onValid(data: LoginValues) {
    await new Promise((res) => setTimeout(res, 800));
    alert('Login ok!\n' + JSON.stringify(data, null, 2));
    reset(); // Sekarang reset() bisa dipanggil dengan aman
  }

  // 2. Komponen utama yang mengembalikan (return) HTML/JSX Form
  return (
    <form onSubmit={handleSubmit(onValid)} className='space-y-4 max-w-sm'>
      {/* Email */}
      <div className='space-y-2'>
        <Label htmlFor='zr-email'>Email</Label>
        <Input
          id='zr-email'
          {...register('email')}
          placeholder='your@gmail.com'
        />
        {errors.email && (
          <p className='text-sm text-red-400'>{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className='space-y-2'>
        <Label htmlFor='zr-password'>Password</Label>
        <Input
          id='zr-password'
          type='password'
          {...register('password')}
          placeholder='minimal 5 karakter, 1 huruf besar, 1 angka' // Disamakan jadi 5 karakter
        />

        {errors.password && (
          <p className='text-sm text-red-400'>{errors.password.message}</p>
        )}
      </div>

      <Button type='submit' disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'login'}
      </Button>
    </form>
  );
}
