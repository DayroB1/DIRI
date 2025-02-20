import { IntlProvider } from "react-intl";
import { LanguageContext } from "../contexts/LanguageContext";
import App from "../App";
import React from "react";


export const Root = () => {
    const { locale, messages } =
   React.useContext(LanguageContext);
    return (
    <IntlProvider locale={locale} messages={messages}>
    <App />
    </IntlProvider>
    );
};
