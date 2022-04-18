import { format } from 'date-fns';

export const COLUMNS = [
  {
    Header: 'No',
    Footer: 'No',
    accessor: 'no',
    disableFilters: true,
    sticky: 'left',
  },
  {
    Header: 'Tweet',
    Footer: 'Tweet',
    accessor: 'tweet',
    sticky: 'left',
  },
  {
    Header: 'Ujaran Kebencian',
    Footer: 'Ujaran Kebencian',
    accessor: 'hs',
    sticky: 'left',
  },
  {
    Header: 'Ucapan Kasar',
    Footer: 'Ucapan Kasar',
    accessor: 'abusive',
    sticky: 'left',
  },
];

export const COLUMNS_DATASET_MODIFIED = [
  {
    Header: 'No',
    Footer: 'No',
    accessor: 'no',
    disableFilters: true,
    sticky: 'left',
  },
  {
    Header: 'Tweet',
    Footer: 'Tweet',
    accessor: 'tweet',
    sticky: 'left',
  },
  {
    Header: 'Label Diperbarui',
    Footer: 'Label Diperbarui',
    accessor: 'label',
    sticky: 'left',
  },
  {
    Header: 'Keterangan',
    Footer: 'Keterangan',
    accessor: 'keterangan',
    sticky: 'left',
  },
];
