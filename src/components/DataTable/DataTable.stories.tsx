import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Text } from 'grommet';
import { DataTable } from './DataTable';

export default {
  title: 'Components/DataTable',
  component: DataTable,
  argTypes: {
    color: { control: 'color' },
  },
} as ComponentMeta<typeof DataTable>;

const Template: ComponentStory<typeof DataTable> = (args) => {
  const [ orderBy, setOrderBy ] = useState<string>()
  const [ order, setOrder ] = useState<'asc' | 'desc'>('asc')

  return <DataTable 
          {...args}
          orderBy={orderBy}
          order={order}
          onSort={(property) => {
            if(orderBy === property) {
              setOrder(order === 'asc' ? 'desc' : 'asc')
            }else{
              setOrderBy(property)
              setOrder('desc')
            }
          }} />
};

export const Primary = Template.bind({});
Primary.args = {
  columns: [{property: 'name', header: "Name", sortable: true}],
  data: [{name: "Item"}]
};


