import React from 'react';
import Item from './Item';
import { StyledButtonSmall } from './styles';
import { sortBy } from 'lodash';

const SORTS: { [list: string]: any } = {
  NONE: (list: any) => list,
  TITLE: (list: any) => sortBy(list, 'title'),
  AUTHOR: (list: any) => sortBy(list, 'author'),
  COMMENT: (list: any) => sortBy(list, 'num_comments').reverse(),
  POINT: (list: any) => sortBy(list, 'points').reverse(),
};

type ListProps = {
  list: Stories;
  onRemoveItem: (item: Story) => void;
};

const List = ({ list, onRemoveItem }: ListProps) => {
  const [sort, setSort] = React.useState({
    sortKey: 'NONE',
    isReverse: false,
  });

  const handleSort = (sortKey: any) => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse;

    setSort({ sortKey, isReverse });
  };

  const sortFunction = SORTS[sort.sortKey];
  const sortedList = sort.isReverse
    ? sortFunction(list).reverse()
    : sortFunction(list);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <span style={{ width: '40%' }}>
          <StyledButtonSmall type="button" onClick={() => handleSort('TITLE')}>
            Title
          </StyledButtonSmall>
        </span>
        <span style={{ width: '30%' }}>
          {' '}
          <StyledButtonSmall type="button" onClick={() => handleSort('AUTHOR')}>
            Author
          </StyledButtonSmall>
        </span>
        <span style={{ width: '10%' }}>
          {' '}
          <StyledButtonSmall
            type="button"
            onClick={() => handleSort('COMMENT')}
          >
            Comments
          </StyledButtonSmall>
        </span>
        <span style={{ width: '10%' }}>
          <StyledButtonSmall type="button" onClick={() => handleSort('POINT')}>
            Points
          </StyledButtonSmall>
        </span>
        <span style={{ width: '10%' }}>Actions</span>
      </div>
      {sortedList.map((item: any) => (
        <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
      ))}
    </div>
  );
};

export default List;
