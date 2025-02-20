import { useContext } from "react";
import { FormattedDate, FormattedMessage,
  FormattedNumber, FormattedTime } from "react-intl";
import { LanguageContext } from "./contexts/LanguageContext";
// // function App() {
// //   const language = navigator.language;
// //   const numero = 12345678.9;
// //   const precio = 23.56;
// //   const fecha = new Date().toLocaleString();
// //   return (
// //   <>
// //   <p>Idioma: {language}</p>
// //   <p>Número: {numero} </p>
// //   <p>Importe: {precio} € </p>
// //   <p>Fecha: {fecha}</p>
// //   </>
// //   )
// //  }

// // export default App
function App() {
  const { changeLanguage, locale } = useContext(LanguageContext);

  const language = navigator.language;
  const numero = 12345678.9;
  const precio = 23.56;
  const fecha = new Date();
  return (
  <>
  <div>
    <label htmlFor="language-select">
      <FormattedMessage id="app.languageSelector" defaultMessage="Select language:" />
    </label>{' '}
      <select id="language-select" onChange={(e) => changeLanguage(e.target.value)} value={locale} style={{ marginBottom: '20px' }}>
      <option value="en">English</option>
      <option value="es">Español</option>
      </select>
 </div>

  <p><FormattedMessage id="app.label.language"/>:{language}
  </p>
  <p>
  <FormattedMessage id="app.label.number"/>:
  <FormattedNumber value={numero} style="decimal" />
  </p>
  <p>
  <FormattedMessage id="app.label.amount"/>:
  <FormattedNumber value={precio} style="currency" currency="EUR" />
  </p>
  <p>
  <FormattedMessage id="app.label.date"/>:
  <FormattedDate value={fecha} year="numeric" month="long" day="2-digit" />,
  <FormattedTime value={fecha} />h
  </p>
  </>
  )
 }
 
 export default App
