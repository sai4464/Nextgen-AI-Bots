"use client";

import { FlipBook } from './FlipBook';
import { MANUAL_LEAVES } from './manualPages';

export function ManualBook() {
  return <FlipBook leaves={MANUAL_LEAVES} />;
}
