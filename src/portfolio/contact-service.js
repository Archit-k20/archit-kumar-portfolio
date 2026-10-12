export function validateContact({ name = '', email = '', message = '' }) {
  if (!name.trim() || name.trim().length > 100) return 'Please enter your name (up to 100 characters).';
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Please enter a valid email address.';
  if (message.trim().length < 10 || message.trim().length > 4000) return 'Please write a message between 10 and 4,000 characters.';
  return null;
}
export function createContactSender(client, { serviceId, templateId, publicKey }) {
  let pending = false;
  return async values => {
    const error = validateContact(values); if (error) throw new Error(error);
    if (!serviceId || !templateId || !publicKey) throw new Error('Contact service is not configured.');
    if (pending) throw new Error('A message is already being sent.');
    pending = true;
    try { return await client.send(serviceId, templateId, { from_name: values.name.trim(), email: values.email.trim(), message: values.message.trim() }, publicKey); }
    finally { pending = false; }
  };
}
