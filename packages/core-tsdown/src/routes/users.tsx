'use client';

import { useParams } from 'wouter';

export default function UsersPage() {
  const params = useParams();

  console.log(params);

  return <div>UsersPage {params['name']}</div>;
}
