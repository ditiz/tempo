import { Button } from "ui";
import MainPanel from "../components/MainPanel";
import NavBar from "../components/NavBar";

export default function Web() {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <MainPanel />
      </main>
    </div>
  );
}
