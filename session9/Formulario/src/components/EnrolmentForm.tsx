import { FormEvent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { StyledWrapper } from './universe.io/Input';
import { StyledWrapper1 } from './universe.io/Button';

interface EnrolmentFormProps {
  chosenProgram: string;
  currentEnrolments: number;
  onChangeEnrolments: (updateEnrolments: number) => void;
}

function EnrolmentForm(props: EnrolmentFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const intl = useIntl();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    //Fixed
    const welcomeMessageTranslated = intl.formatMessage(
      { id: 'app.label.welcomeMessage' },
      { firstName, lastName }
    );
    setWelcomeMessage(welcomeMessageTranslated);
    props.onChangeEnrolments(props.currentEnrolments + 1);
    event.preventDefault();
  };

  return (
    <div>
      <form className='enrolForm' onSubmit={handleSubmit}>
        <h2>
          <FormattedMessage id="app.label.enrolmentForm" values={{ program: props.chosenProgram }} />
        </h2><br/>
        <label>
          <FormattedMessage id="app.label.firstName" />
        </label>

        {/* Se ha importado el contenido del componente Input que se ha añadido desde Universe.io */}
        <br/><br/><br/><StyledWrapper>
          <div className="input-container">
          <input className="input" type="text" name='fname' onBlur={(event) => setFirstName(event.target.value)}/>
          </div>
        </StyledWrapper>
        {/* <input className='outline' type="text" name='fname' onBlur={(event) => setFirstName(event.target.value)}></input> */}
        <br />
        <label>
          <FormattedMessage id="app.label.lastName" />
        </label><br/><br/><br/>
        <StyledWrapper>
          <div className="input-container">
          <input className="input" name='lname' onBlur={(event) => setLastName(event.target.value)}/>
          </div>
        </StyledWrapper>
        {/* <input className='outline' name='lname' onBlur={(event) => setLastName(event.target.value)}></input> */}
        <br />
        <br />
        <StyledWrapper1>
            <button className="button" type="submit">
              <svg fill="currentColor" viewBox="0 0 24 24" className="icon">
              <path clipRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fillRule="evenodd" />
              </svg>
              <FormattedMessage id="app.label.submit" />
            </button>
        </StyledWrapper1>
        {/* <button type="submit" className="bg-green-500 text-white p-2 rounded-md hover:bg-green-900"
          >
            <FormattedMessage id="app.label.submit" />
          </button> */}
        <br />
        <br />
        <label id="studentMsg" className='message'>{welcomeMessage}</label>
      </form>
    </div>
  );
}

export default EnrolmentForm;