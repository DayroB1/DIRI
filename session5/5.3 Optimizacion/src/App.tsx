import { FC, memo, useState } from "react";

interface ItemListProps{
  items:string[]
}

const ItemList: FC<ItemListProps> = ({ items }) => {
  return (
  <div>
  {items.map((item, index) => (
  <div key={index}>{item}</div>
  ))}
  </div>
  );
 };

 const MemoizedItemList = memo(ItemList)

 const App: FC = () => {
  const [count, setCount] = useState<number>(0);
  const [items, y] = useState<string[]>(
  Array.from({ length: 1000 }, (_, i) => `Item ${i}`)
  );
  return (
  <div>
  <h1>Profiling en React</h1>
  <button onClick={() => setCount(count + 1)}>Incrementar ({count})</button>
  <MemoizedItemList items={items}/>
  </div>
  );
 };
 

 export default App