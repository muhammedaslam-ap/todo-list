import styles from './FruitsList.module.css';
import { FaArrowUp, FaArrowDown, FaEdit, FaTrash } from "react-icons/fa"; 

import { useState , useEffect} from "react";

interface Fruit {
  id: number;
  name: string;
}

export default function FruitList() {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [fruitName, setFruitName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);


  
  useEffect(() => {
    const savedFruits = localStorage.getItem("fruits");
    if (savedFruits) {
      setFruits(JSON.parse(savedFruits));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fruits", JSON.stringify(fruits));
  }, [fruits]);


  const addOrUpdateFruit = () => {
    if (fruitName.trim()) {
      if (editingId !== null) {
        setFruits(fruits.map(fruit => (fruit.id === editingId ? { ...fruit, name: fruitName } : fruit)));
        setEditingId(null);
      } else {
        setFruits([...fruits, { id: Date.now(), name: fruitName }]);
      }
      setFruitName("");
    }
  };

  const removeFruit = (id: number) => {
    setFruits(fruits.filter(fruit => fruit.id !== id));
    if (editingId === id) {
      setFruitName("");
      setEditingId(null);
    }
  };

  const move = (index: number, direction: number) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= fruits.length) return;
    const newFruits = [...fruits];
    [newFruits[index], newFruits[newIndex]] = [newFruits[newIndex], newFruits[index]];
    setFruits(newFruits);
  };

  const startEditing = (fruit: Fruit) => {
    setFruitName(fruit.name);
    setEditingId(fruit.id);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Fruit List</h2>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.inputField}
          value={fruitName}
          onChange={(e) => setFruitName(e.target.value)}
          placeholder="Add or edit a fruit..."
        />
        <button onClick={addOrUpdateFruit} className={styles.button}>
          {editingId !== null ? "Update" : "Add"}
        </button>
      </div>
      <ul className={styles.list}>
        {fruits.map((fruit, index) => (
          <li key={fruit.id} className={styles.listItem}>
            <span className={styles.text}>{fruit.name}</span>
            <div className={styles.actions}>
              <button onClick={() => move(index, -1)} ><FaArrowUp/></button>
              <button onClick={() => move(index, 1)} ><FaArrowDown/></button>
              <button onClick={() => startEditing(fruit)} ><FaEdit/></button>
              <button onClick={() => removeFruit(fruit.id)} ><FaTrash/></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
