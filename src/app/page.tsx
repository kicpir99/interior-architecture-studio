import React from 'react';
import { HomeClient } from '@/components/home-client';
import { clampArea } from '@/lib/calculator';

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ area?: string }>;
}) {
  const params = await searchParams;
  const rawArea = params?.area ? Number(params.area) : undefined;
  const initialArea =
    rawArea !== undefined && !Number.isNaN(rawArea) ? clampArea(rawArea) : undefined;

  return <HomeClient initialArea={initialArea} />;
}
