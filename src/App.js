import "./App.css";
import Main from "./components/views/Main";

/**
 * The entrypoint to the application.
 *
 * @returns the react app
 */
function App() {
  return (
    <div className="app">
      <div className="header">ISEA: International Student Event Aggregator</div>
      <div>
        <Main />
      </div>
    </div>
  );
}

export default App;
