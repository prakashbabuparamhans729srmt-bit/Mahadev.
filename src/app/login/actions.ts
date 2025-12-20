'use server';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth/web-extension';
import { z } from 'zod';

const LoginSchema = z.object({
  email: z.string().email('एक मान्य ईमेल पता दर्ज करें।'),
  password: z.string().min(6, 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।'),
});

type State = {
  message: string;
  success: boolean;
};

export async function handleLogin(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = LoginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((e) => e.message).join(', '),
      success: false,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password);
    return {
      message: 'लॉगिन सफल!',
      success: true,
    };
  } catch (error: any) {
    let message = 'लॉगिन विफल। कृपया पुनः प्रयास करें।';
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
      message = 'अमान्य ईमेल या पासवर्ड।';
    }
    return {
      message,
      success: false,
    };
  }
}
