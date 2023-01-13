import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import {Layaout} from "../components/Layaout";

export default function App({ Component, pageProps }) {
  return (
    <Layaout>
      <Component {...pageProps} />
    </Layaout>
  );
}
