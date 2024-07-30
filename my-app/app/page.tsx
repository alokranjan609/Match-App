import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { getUserByID, getUsersWithNoConnection } from "./neo4j.action";
import HomePageClientComponent from "./components/Home";
import Link from 'next/link';
import styles from './Home.module.css'; // Import the CSS module

export default async function Home() {
  const { isAuthenticated, getUser } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    return redirect(
      "/api/auth/login?post_login_redirect_url=http://localhost:3000/callback"
    );
  }

  const user = await getUser();

  if (!user) {
    return redirect(
      "/api/auth/login?post_login_redirect_url=http://localhost:3000/callback"
    );
  }

  const userWithNoConnection = await getUsersWithNoConnection(user.id);
  const currentUser = await getUserByID(user.id);

  return (
    <main className={styles.container}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <div className={styles.buttonContainer}>
        <Link href="/match" passHref>
            <button className={styles.button}>Matches</button>
          </Link>
          <Link href="/logout" passHref>
            <button className={styles.button}>Logout</button>
          </Link>
          
        </div>
        {currentUser && (
          <HomePageClientComponent currentUser={currentUser} users={userWithNoConnection} />
        )}
      </div>
    </main>
  );
}
