import { Example } from '../../examples/Example';
import { TreeTableProps } from './TreeTable';
import { Column, RowData } from './types';

import treeTableData from './data.json';

interface TableRow {
  id: string;
  name: string;
  phone: string;
  children: Array<{
    id: string;
    name: string;
    phone: string;
  }>;
}

const testOptions = [
  { value: 'chocolate', label: 'Chocolate', invalid: false },
  { value: 'strawberry', label: 'Strawberry', invalid: false },
  { value: 'vanilla', label: 'Vanilla', invalid: false },
  { value: 'bacon', label: 'Bacon', invalid: true },
  { value: 'cookiedough', label: 'Cookie Dough', invalid: false },
  { value: 'beer', label: 'Beer', invalid: false },
  { value: 'cottoncandy', label: 'Cotton Candy', invalid: false },
  { value: 'crab', label: 'Crab', invalid: false },
  { value: 'greentea', label: 'Green Tea', invalid: false },
  { value: 'mango', label: 'Mango', invalid: false },
  { value: 'tuttifrutti', label: 'Tutti Frutti', invalid: false },
  { value: 'grape', label: 'Grape', invalid: false },
  { value: 'coconutmilk', label: 'Coconut Milk', invalid: false },
  { value: 'dulce', label: 'Dulce de Leche', invalid: false },
  { value: 'caramel', label: 'Caramel', invalid: false },
  { value: 'banana', label: 'Banana', invalid: false },
  { value: 'garlic', label: 'Garlic', invalid: true },
  { value: 'twix', label: 'Twix', invalid: false },
  { value: 'mintchocolatechip', label: 'Mint Chocolate Chip', invalid: false },
  { value: 'spearmint', label: 'Spearmint', invalid: false },
  { value: 'oyster', label: 'Oyster', invalid: false },
  { value: 'pistachio', label: 'Pistachio', invalid: false },
  { value: 'rice', label: 'Rice', invalid: false },
  { value: 'chickenliver', label: 'Chicken Liver', invalid: true },
  { value: 'superman', label: 'Superman', invalid: false },
  { value: 'lucuma', label: 'Lucuma', invalid: false },
  { value: 'bluemoon', label: 'Blue Moon', invalid: false },
  { value: 'charcoal', label: 'Charcoal', invalid: false },
  { value: 'cheesecake', label: 'Cheesecake', invalid: false },
  { value: 'rumandraisin', label: 'Rum and Raisin', invalid: false },
  { value: 'moosetracks', label: 'Moose Tracks', invalid: false },
];

const treeTableColumns: Array<Column<TableRow>> = [
  {
    id: 'name',
    headerName: 'Name',
    headerStyle: { justifyContent: 'flexEnd' },
    cellStyle: {},
    accessor: 'name',
    initiallyHidden: false,
    width: 300,
  },
  {
    id: 'width',
    headerName: 'Width',
    accessor: 'phone',
  },
  {
    id: 'height',
    headerName: 'Height',
    accessor: 'phone',
    width: 100,
    initiallyHidden: true,
  },
];

const examples: Example<TreeTableProps<TableRow>> = {
  props: {
    columns: treeTableColumns,
    data: treeTableData,
    title: 'Tree Table',
    onRowDoubleClick: (row?: RowData<TableRow>) => console.log(row), // eslint-disable-line no-console
    filters: [{
      label: 'First Column', type: 'singleSelect', id: 'testKey', options: testOptions,
    }, {
      label: 'Second Column', type: 'multiSelect', id: 'testKey2', options: testOptions,
    }],
    setUniqueRowKey: (row: RowData<TableRow>) => row.id,
    filterValues: {},
  },
  category: 'Data',
};

export default examples;
