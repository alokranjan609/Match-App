import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { getMatches } from "../neo4j.action";
import styles from './MatchPage.module.css'; // Import the CSS module

export default async function MatchPage() {
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

  const matches = await getMatches(user.id);

  return (
    <main className={styles.container}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        {matches.length > 0 ? (
          matches.map((match) => (
            <div 
              key={match.applicationId} 
              className={`${styles.card} ${matches.length === 1 ? styles.oneMatch : ''} ${matches.length === 2 ? styles.twoMatches : ''}`}
            >
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>{match.firstName} {match.lastName}</h2>
                <p className={styles.cardDescription}>{match.email}</p>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noMatches}>You have no matches.</p>
        )}
      </div>
    </main>
  );
}
