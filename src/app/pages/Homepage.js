import ChatgptAPI from "../components/ChatgptAPI";
import Xintake from "../components/Xintake";
import styles from "./Homepage.module.css";
import balancedDietImg from "../../images/balanced_diet.jpg";
import Image from "next/image";
import MenuButon from "../components/MenuButon";
import { useEffect } from "react";

export default function Homepage() {
  useEffect(() => {
    fetch('/api/sqlservice')
      .then(response => response.json())
      .then(data => console.log(data.message))
      .catch(error => console.error('Hata:', error));
  }, []);

  return (
    <div className={styles.zero}>
      <div className={styles.imageContainer}>
        <Image
          priority
          className={styles.img}
          src={balancedDietImg}
          alt="Balanced Diet"
        />
        <div className={styles.textOverImage}>Greetings, Berkay</div>
      </div>
      <div style={{display:"flex", justifyContent:"space-around"}}>
      <MenuButon className={styles.menuButon} />
      <MenuButon className={styles.menuButon} />
      <MenuButon className={styles.menuButon} />
      </div>
      <div className={styles.intakes}>
        <Xintake name={"protein"} qty={"60"} min={"0"} max={"350"} />
        <Xintake name={"protein"} qty={"60"} min={"0"} max={"350"} />
        <Xintake name={"protein"} qty={"60"} min={"0"} max={"350"} />
        <Xintake name={"protein"} qty={"60"} min={"0"} max={"350"} />
        <Xintake name={"protein"} qty={"60"} min={"0"} max={"350"} />
      </div>
    </div>
  );

  
}
