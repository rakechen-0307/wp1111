import { useQuery } from '@apollo/client';

import { GET_ITEMS_QUERY } from '../graphql/queries';

import Balance from './Balance';
import Category from './Category';

function Analytics() {
  // TODO 2.2 Use the useQuery hook to get items from backend

  const { data: itemData, error, loading } = useQuery(GET_ITEMS_QUERY)

  if (loading) return <p>Loading...</p>;
  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return (<p>Error :</p>);
  }

  const { items } = itemData

  // TODO 2.2 End

  return (
    <div className="grid grid-cols-12 gap-6"> 
      <div className="col-span-6">
        <Balance items={items} />
      </div>
      <div className="col-span-6">
        <Category items={items} />
      </div>
    </div>
  );
}

export default Analytics;
