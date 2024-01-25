import ChatgptAPI from "../components/ChatgptAPI";
import Xintake from "../components/Xintake";
import styles from "./Homepage.module.css";
import balancedDietImg from "../../images/balanced_diet.jpg";
import Image from "next/image";
import menuButon from "../components/menuButon";

export default function Homepage() {
  return (
    <div className={styles.zero}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.img}
          src={balancedDietImg}
          alt="Balanced Diet"
        />
        <div className={styles.textOverImage}>Greetings, Berkay</div>
      </div>
      <menuButon />
      {menuButon()}
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
