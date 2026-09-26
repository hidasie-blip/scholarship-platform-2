import { redirect } from 'next/navigation';

export default function Home() {
  // Automatically sends the preview window to your test candidate's dashboard
  redirect('/dashboard/27e8db8d-e5ba-484d-9c89-f55cf2b2a424');
}