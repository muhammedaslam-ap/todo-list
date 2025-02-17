import styles from "./FruitsList.module.css";
import { useState } from "react";

interface Fruit {
  id: number;
  name: string;
}

export default function Todolist() {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [fruitName, setFruitName] = useState<string>("");

  const addFruit = () => {
    if (fruitName.trim() !== "") {
      setFruits([...fruits, { id: Date.now(), name: fruitName }]);
      setFruitName("");
    }
  };

  const removeFruit = (id: number) => {
    setFruits(fruits.filter((fruit) => fruit.id !== id));
  };

  const moveUp = (index: number) => {
    if (index > 0) {
      const newFruits = [...fruits];
      [newFruits[index + 1], newFruits[index]] = [newFruits[index], newFruits[index + 1]];
      setFruits(newFruits);
    }
  };

  const moveDown = (index: number) => {
    if (index < fruits.length - 1) {
      const newFruits = [...fruits];
      [newFruits[index - 1], newFruits[index]] = [newFruits[index], newFruits[index - 1]];
      setFruits(newFruits);
    }
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
          placeholder="Add a fruit..."
        />
        <button onClick={addFruit} className={styles.button}>
          Add
        </button>
      </div>
      <ul className={styles.list}>
        {fruits.map((fruit, index) => (
          <li key={fruit.id} className={styles.listItem}>
            <span className={styles.text}>{fruit.name}</span>
            <div className={styles.actions}>
              <button onClick={() => moveUp(index)} className={styles.actionButton}>
                ⬆️
              </button>
              <button onClick={() => moveDown(index)} className={styles.actionButton}>
                ⬇️
              </button>
              <button onClick={() => removeFruit(fruit.id)} className={`${styles.actionButton} ${styles.deleteButton}`}>
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
