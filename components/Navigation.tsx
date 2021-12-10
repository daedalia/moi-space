import Link from 'next/link';
import styles from '../styles/Navigation.module.css';

export function Navigation() {
    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>
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
            </ul>
        </nav>
    );
}
