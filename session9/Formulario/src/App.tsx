import { ChangeEvent, useState } from "react";
import EnrolmentForm from "./components/EnrolmentForm";
import { FormattedMessage } from "react-intl";
import { useContext } from "react";
import { LanguageContext } from "./contexts/LanguageContext";

function App() {
  const { changeLanguage, locale } = useContext(LanguageContext);

  const [program, setProgram] = useState("UG");
  const [enrolments, setEnrolments] = useState(0);

  const handleChangeProgram = (event: ChangeEvent<HTMLSelectElement>) => {
    setProgram(event.target.value);
  };

  const handleChangeEnrolments = (updateEnrolments: number) => {
    setEnrolments(updateEnrolments);
  };

  return (
    <div className="bg-gray-100 p-6">

      <div className="mb-6">
        <label className="block font-medium text-orange-700">
          <FormattedMessage id="app.label.language" defaultMessage="Select language:" />
        </label>
        <select
          value={locale}
          onChange={(e) => changeLanguage(e.target.value)}
          className="p-3 border border-green-700 rounded-md shadow-xl  focus:ring-2 focus:ring-indigo-500"
        
        >
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </div>

      <div className="">
        <label className="block font-medium text-orange-700">
          <FormattedMessage id="app.label.program" />
        </label>
        <select className="mb-6 p-3 border border-green-700 rounded-md shadow-xl  focus:ring-2 focus:ring-indigo-500" onChange={handleChangeProgram} value={program}>
          <option value={"UG"}>Grado</option>
          <option value={"PG"}>Postgrado</option>
        </select>
        <div>
          <FormattedMessage id="app.label.enrolments" /> {enrolments}
        </div>
        <h1 className="font-bold text-gray-900 mb-6">Aplicación de Matriculación</h1>
        <EnrolmentForm
          chosenProgram={program}
          onChangeEnrolments={handleChangeEnrolments}
          currentEnrolments={enrolments}
        />
      </div>
    </div>
  );
}

export default App;