export const succesMessage = 'Przedmiot został dodany'
export const errorMessage = 'Wystąpił błąd, spróbuj ponownie później'
export const removedMessage = 'Przedmiot został usunięty'
export const userExistsMess = 'Użytkownik o tej nazwie już istnieje'
export const badEmailMess = 'Niepoprawny adres email'
export const shortPassMess = 'Wprowadź dłuższe hasło (min 8 znaków)'
export const userDosentExistsMess = 'Użytkownik o tej nazwie nie istnieje'
export const invalidDataMess = 'Wprowadzono nieprawidłowe dane'
export const badLoginAgain = 'Ponownie podano błędne dane'
export const addedMessage = 'Pomyślnie dodano do koszyka'
export const orderStatusMess = 'Zamówienie w trakcie realizacji'
export const deliveryChargesMess = 'del czergs'
export const modePayment = 'modePayment'
export const emailNoExistsMess = 'taki mail nie istnieje :/'
export const passwordUpdatedMess = 'hasło pomyślnie zostało zmienione'
export const wrongTokenMess = 'błędny odnośnik do konta'

export const frontend_url = process.env.CLIENT_URL?process.env.CLIENT_URL:'http://localhost:5173'
export const verifyUrl = '/weryfikacja' //remember in frontend
export const oderSlug = 'zamowienia' //and name of new database
export const userOrdersUrl = '/zamowienia-klienta'

export const customErrors = {
    logout: 'wystąpił problem podczas wylogowania',
    loginin: 'wystąpił błąd przy logowaniu',
    signup: 'wystąpił problem przy rejestracji',
    verifyEmail: 'wystąpił problem przy weryfikacji e-maila',
    resetPass: 'wystąpił problem przy resetowaniu hasła',
    remindPassMail: 'wystąpił problem przy wysyłaniu e-maila',


    invalidCredentials: 'nieprawidłowe dane',
    userAlreadyExists: 'użytkownik o takim mailu już istnieje',
    inVeirfyEmail: 'problem z wieryfikacją emaila',
    serverError: 'błąd po stronie serwera',
    inLogin: 'błąd przy próbie zalogowania',
    userNotFound: 'nie udało sie znaleźć konta',
    forgotPassword: 'problem podczas resetowania hasła',
    inCheckAuth: 'błąd poczas autoryzacji'




}

export const customInfo = { 
    userCreatedSuccessfully: 'konto założne pomyslnie',
    emailSent: 'email wysłany: ',
    emailSentSuccessfully: 'mail wysłany pomyslnie',
    loggedSuccessfully: 'zalogowano pomyślnie',
    sentCodeToEmail: 'na podany adres email wysłano wiadomość z dalszymi wskazówkami w celu zresetowania hasła',
    resetSuccessfull: 'hasło zresetowane pomyślnie'

}
