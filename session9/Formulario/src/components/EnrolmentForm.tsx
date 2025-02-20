import { FormEvent, useState } from 'react';
import { FormattedMessage } from 'react-intl';

interface EnrolmentFormProps {
  chosenProgram: string;
  currentEnrolments: number;
  onChangeEnrolments: (updateEnrolments: number) => void;
}

function EnrolmentForm(props: EnrolmentFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    //Fix
    setWelcomeMessage(`Hola a ${firstName} ${lastName}`);
    props.onChangeEnrolments(props.currentEnrolments + 1);
    event.preventDefault();
  };

  return (
    <div>
      <form className='enrolForm' onSubmit={handleSubmit}>
        <h2>
          <FormattedMessage id="app.label.enrolmentForm" values={{ program: props.chosenProgram }} />
        </h2>
        <label>
          <FormattedMessage id="app.label.firstName" />
        </label>
        <input className='outline' type="text" name='fname' onBlur={(event) => setFirstName(event.target.value)}></input>
        <br />
        <label>
          <FormattedMessage id="app.label.lastName" />
        </label>
        <input className='outline' name='lname' onBlur={(event) => setLastName(event.target.value)}></input>
        <br />
        <br />
        <button type="submit" className="bg-green-500 text-white p-2 rounded-md hover:bg-green-900"
          >
            <FormattedMessage id="app.label.submit" />
          </button>
        <label id="studentMsg" className='message'>{welcomeMessage}</label>
      </form>
    </div>
  );
}

export default EnrolmentForm;