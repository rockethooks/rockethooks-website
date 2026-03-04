import type { APIRoute } from 'astro';

export const prerender = false;

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ValidationError {
  field: string;
  message: string;
}

const VALID_SUBJECTS = ['general', 'sales', 'enterprise', 'support', 'partnership'] as const;

function validateFormData(data: FormData): {
  valid: true;
  data: ContactFormData;
} | {
  valid: false;
  errors: ValidationError[];
} {
  const errors: ValidationError[] = [];

  const name = data.get('name')?.toString().trim() ?? '';
  const email = data.get('email')?.toString().trim() ?? '';
  const subject = data.get('subject')?.toString().trim() ?? '';
  const message = data.get('message')?.toString().trim() ?? '';

  if (!name || name.length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters.' });
  }
  if (name.length > 200) {
    errors.push({ field: 'name', message: 'Name must be under 200 characters.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push({ field: 'email', message: 'A valid email address is required.' });
  }

  if (!subject || !VALID_SUBJECTS.includes(subject as typeof VALID_SUBJECTS[number])) {
    errors.push({ field: 'subject', message: 'Please select a valid subject.' });
  }

  if (!message || message.length < 10) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters.' });
  }
  if (message.length > 5000) {
    errors.push({ field: 'message', message: 'Message must be under 5000 characters.' });
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return { valid: true, data: { name, email, subject, message } };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const result = validateFormData(formData);

    if (!result.valid) {
      return new Response(
        JSON.stringify({ success: false, errors: result.errors }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // MVP: Log the contact form submission.
    // TODO: Integrate with email service (SES, Resend, etc.) for production.
    console.log('[Contact Form]', {
      name: result.data.name,
      email: result.data.email,
      subject: result.data.subject,
      messageLength: result.data.message.length,
      timestamp: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Your message has been received.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch {
    return new Response(
      JSON.stringify({ success: false, message: 'An unexpected error occurred.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const ALL: APIRoute = () => {
  return new Response(
    JSON.stringify({ error: 'Method not allowed' }),
    { status: 405, headers: { 'Content-Type': 'application/json' } }
  );
};
