//react-icons
import { TbMailFilled, TbPhoneFilled } from "react-icons/tb";

//assets
import customerSupport from "./../assets/customer-support.jpg";

//styles
import "./../styles/Contact.css";

const Contact = () => {

    

  return (
    <div className="contact-container">
       <div className="contact-title-container">
            <section className="contact-title">
                <h1>Contact Us!</h1>
                <p>Have a question? We'd love to hear it!</p>
            </section>
            <div className="contact-title-img">
                <img src={customerSupport} alt="" />
            </div>
       </div>

        <div className="contact-options-container">
            <div className="contact-option">
                <a href="tel:xxxxxxxxxxx">
                    <h1><TbPhoneFilled /></h1>
                    <p>Interested to talk to us? Phone us!</p>
                    <p>+xxx x xxx xxxx</p>
                </a>
            </div>
            <div className="contact-option">
                <a href="mailto:invented@business-email.com">
                    <h1><TbMailFilled /></h1>
                    <p>You can get ahold of us with email!</p>
                    <p>invented@business-email.com</p>
                </a>
            </div>
        </div>
    </div>
  )
}

export default Contact