import ReactImage from "../../assets/react-core-concepts.png";
import config from "../../assets/config.png";
import jsx from "../../assets/jsx-ui.png";
import compoImage from "../../assets/react-core-concepts.png";

import "./Header.css";

const images = [ReactImage, config, jsx];
const naming = ["Fundamental", "Crucial", "Fantastic"];

function getRandom(count){
  return Math.floor(Math.random() * (count));
}

export default function Header() {
  const description = naming[getRandom(3)];
  const randImg = images[getRandom(3)];
  return (
    <header>
      <img src={randImg} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {description} React concepts you will need for almost any app you are
        going to build!
      </p>
      <main>
        <h2>Time to get started!</h2>
      </main>
    </header>
    
  );
}