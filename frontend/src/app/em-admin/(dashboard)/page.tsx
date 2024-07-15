import { redirect } from 'next/navigation';

export default function Dashboard() {
  redirect('/em-admin/dashboard');

  return null;
}
