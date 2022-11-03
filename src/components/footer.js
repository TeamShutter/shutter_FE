import { Image } from "@mui/icons-material";
import styles from '../styles/Home.module.css';

export default function Footer() {

    return (
        <footer className={styles.footer}>
          &copy; Shutter 
          {/* <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span> */}
      </footer>
    )
}