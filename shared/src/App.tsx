import { Button, ButtonVariants } from "./components/atoms/Button";

function App() {
  return (
    <>
      <h1>OBOX UI</h1>
      <Button text="submit" onClick={() => {alert("hi")}} variant={ButtonVariants.DANGER}/>
    </>
  );
}

export default App;
