import { useEffect, useState } from "react";

const useIncrement = (init, fact) => {
  const [count, setCount] = useState(init);
  const increment = () => setCount((count) => count + fact);

  return [count, increment];
};

const useAutoIncrement = (init, fact) => {
  const [count, increment] = useIncrement(init, fact);

  useEffect(() => {
    const interval = setInterval(() => {
      increment();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return [count];
};

const useToggle = () => {
  const [visible, setVisible] = useState(true);
  const toggle = () => setVisible((visible) => !visible);

  return [visible, toggle];
};

const Compteur = () => {
  const [count] = useAutoIncrement(0, 2);
  return <button>Incrémenter {count}</button>;
};

const Test = () => {
  const [compteurVisible, toggleCompteur] = useToggle();
  return (
    <div>
      <input type="checkbox" onChange={toggleCompteur} checked={compteurVisible} />
      {compteurVisible && <Compteur />}
    </div>
  );
};

export default Test;
