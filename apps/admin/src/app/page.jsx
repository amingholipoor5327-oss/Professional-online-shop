import UserProfile from "./component/UserProfile/UserProfile";

 
export const metadata = {
  title: "Amin Shop | Home",
  description: "Welcome to Amin Shop",
};

export default function Home() {
  return (
    <main>
      <UserProfile />
    </main>
  );
}