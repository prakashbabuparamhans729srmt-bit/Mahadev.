'use server';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth/web-extension';
import { z } from 'zod';

const SignupSchema = z.object({
  email: z.string().email('एक मान्य ईमेल पता दर्ज करें।'),
  password: z.string().min(6, 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।'),
});

type State = {
  message: string;
  success: boolean;
};

export async function handleSignup(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = SignupSchema.safeParse(
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
    await createUserWithEmailAndPassword(auth, email, password);
    return {
      message: 'साइनअप सफल!',
      success: true,
    };
  } catch (error: any) {
    let message = 'साइनअप विफल। कृपया पुनः प्रयास करें।';
    if (error.code === 'auth/email-already-in-use') {
      message = 'यह ईमेल पहले से ही उपयोग में है।';
    }
    return {
      message,
      success: false,
    };
  }
}
