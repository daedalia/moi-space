import Link from 'next/link';
import styles from '../styles/Navigation.module.css';
import {Image} from "react-bootstrap";

export function Navigation() {
    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                <li>
                    <Image src="https://c.tenor.com/MRCIli40TYoAAAAj/under-construction90s-90s.gif" width="40px" height="40px"/>
                </li>
                <li>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                </li>
                <li className={styles.item}>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href="/photos">
                        <a>Photos</a>
                    </Link>
                </li>
                <li>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                </li>
                <li>
                    <Image src="https://c.tenor.com/MRCIli40TYoAAAAj/under-construction90s-90s.gif" width="40px" height="40px"/>
                </li>
            </ul>
        </nav>
    );
}
