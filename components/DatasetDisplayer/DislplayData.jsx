import { BasicTable } from './Table';
import { Paginated } from './Paginated';
import data from './data';
import { COLUMNS, COLUMNS_DATASET_MODIFIED } from './column';

const DisplayData = (props) => {
  const { dataset, type } = props;
  return <Paginated data={dataset} columns={type === 'modified' ? COLUMNS_DATASET_MODIFIED : COLUMNS} />;
};

export default DisplayData;
