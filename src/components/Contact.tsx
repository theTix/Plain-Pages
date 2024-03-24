//react-icons
import { TbMailFilled, TbPhoneFilled } from "react-icons/tb";

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
                <img src={"https://firebasestorage.googleapis.com/v0/b/plain-pages.appspot.com/o/OtherImages%2Fcustomer-support.jpg?alt=media&token=f451055d-24f2-4ddd-a6fa-f41897bfebda"} alt="Woman with headset in customer support." />
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