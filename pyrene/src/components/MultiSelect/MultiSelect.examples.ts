import colorConstants from '../../styles/colorConstants';
import { MultiSelectProps } from './MultiSelect';
import { Example, StateProvider } from '../../examples/Example';
import { Option } from './types';
import { IconNames } from '../types';

export interface State {
  value: ReadonlyArray<Option>;
}

const testOptions: MultiSelectProps['options'] = [
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

const icons: Array<keyof IconNames> = ['place', 'layers', 'clock'];
const colors = [colorConstants.blue600, colorConstants.red600, colorConstants.orange600, undefined];
const testOptionsWithIcons = testOptions.map((option, i) => ({ ...option, iconProps: { name: icons[i % 3], color: colors[i % 4] } }));

const makeExample = (options: ReadonlyArray<Option>) => ({
  title: 'Multi-Select',
  placeholder: 'Choose your favorite ice cream',
  helperLabel: 'Ice cream is delicious',
  options,
  onChange: (stateProvider: StateProvider<State>) => (value: ReadonlyArray<Option>) => stateProvider.setState({ value }),
  value: (stateProvider: StateProvider<State>) => stateProvider.state.value,
  creatable: true,
  invalid: (stateProvider: StateProvider<State>) => stateProvider.state.value && stateProvider.state.value.filter((o) => o.value === 'bacon' || o.value === 'chickenliver').length > 0,
  invalidLabel: 'Please no bacon or chicken liver',
});

const examples: Example<MultiSelectProps, State> = {
  props: makeExample(testOptions),
  examples: [
    {
      props: makeExample(testOptions),
      description: 'Multi Select',
    },
    {
      props: makeExample(testOptionsWithIcons),
      description: 'Multi Select with Icons',
    },
  ],
  category: 'Form',
};

export default examples;
