export default function validate(values) {
  const { from, name, phone, message } = values;

  return {
    from: !from && 'Email is required',
    name: !name && 'Name is required',
    phone: !phone && 'Phone is required',
    message: !message && 'Message is required',
  };
}
