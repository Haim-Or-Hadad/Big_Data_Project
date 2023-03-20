import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import { SvgIcon } from '@mui/material';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import ClipboardIcon from '@heroicons/react/24/solid/ClipboardIcon';

export const items = [
  {
    title: 'Overview',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Search',
    path: '/search',
    icon: (
      <SvgIcon fontSize="small">
        <MagnifyingGlassIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Analyze',
    path: '/analyze',
    icon: (
      <SvgIcon fontSize="small">
        <ClipboardIcon/>
      </SvgIcon>
    )
  },
];
