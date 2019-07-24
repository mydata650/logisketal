import React from 'react';
import CookieConsent, { Cookies } from "react-cookie-consent";

class CookieMsg extends React.Component { 
    render() {
        return (
            <div className="App">
               

                <CookieConsent
                    onAccept={() => { alert("yay!") }}
                    debug={true}
                    enableDeclineButton
                    declineButtonText="Decline (optional)"
                    onDecline={() => { alert("nay!") }}
                >
                    This website uses cookies to enhance the user experience.{" "}
                    
                </CookieConsent>
            </div>

        );
    }    
}
export default CookieMsg;