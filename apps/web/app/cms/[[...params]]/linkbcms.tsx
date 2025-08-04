'use client';

import { LinkbApp } from '@linkbcms/core/app';
import cmsConfig from '@/cms.config';
import '@linkbcms/core/styles';
import type { JSX } from 'react';

export function CMSPage(): JSX.Element {
  return <LinkbApp config={cmsConfig} />;
}
