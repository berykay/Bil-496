import ChatgptAPI from "../components/ChatgptAPI";
import Xintake from "../components/Xintake";
import styles from "./Homepage.module.css";
import balancedDietImg from "../../images/balanced_diet.jpg";
import Image from "next/image";
import MenuButton from "../components/MenuButton";

export default function Homepage() {
  
  return (
    <div className={styles.zero}>
      <div className={styles.imageContainer}>
        <Image
          priority
          className={styles.img}
          src={balancedDietImg}
          alt="Balanced Diet"
        />
        <div className={styles.textOverImage}>Greetings</div>
      </div>
      <div style={{display:"flex", justifyContent:"space-around"}}>
      <MenuButton className={styles.menuButon} name={"Diyet Programı Oluştur"} />
      <MenuButton className={styles.menuButon} name={"  Profili Düzenle"} />
      <MenuButton className={styles.menuButon} name={"Kişisel Yemek Oluştur"} />
      </div>
    </div>
  );

  
}
