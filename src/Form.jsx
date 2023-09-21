import './fontStyles.css'
import React, { useEffect, useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const Form = () => {
    const [formData, setFormData] = useState(
        {
            name: "",
            email: "",
            budget: "",
            message: ""
        }
    )

    const [isHover, setIsHover] = useState(false)
    const [formErrors, setFormErrors] = useState({
            name: false,
            email: false,
            budget: false,
            message: false
    })
    const [isSubmit, setIsSubmit] = useState(false)
    const [isClicked, setIsClicked] = useState(false);

    
    const form = useRef();

    const containerStyle = {
        width: "100%",
        height: "100vh",
        background: "#111111",
        display: "block",
        alignItems: "center",
        justifyContent: "center",
        padding: "2vw 4vw",
        fontFamily: "satoshiRegular",
    }
    
    const formStyle = {
        display: "flex",
        flexDirection: "column",
        width: "90%",
        maxWidth: 600,
        borderRadius: 10,
    }
    
    const headerStyle = {
        fontFamily: "visby",
        fontSize: "48px",
        marginBottom: 0,
        color: "white"
    }
    
    const descrStyle = {
        fontSize: "16px",
        marginBottom: "32px",
        marginTop: 0,
        color: "#CFCFCF",
    }
    
    const inputStyle = {
        fontFamily: "satoshiRegular",
        fontSize: "16px",
        border: "1px solid transparent",
        borderRadius: "80px",
        margin: "12px 0",
        padding: "26px 24px",
        background: "#282828",
        color: "white"
    }
    
    const txtAreaStyle = {
        fontFamily: "satoshiRegular",
        fontSize: "16px",
        border: formErrors.message ? "1px solid #FF5555" : "1px solid transparent",
        borderRadius: "32px",
        margin: "12px 0",
        padding: "26px 24px",
        background: "#282828",
        color: "white",
        resize: "none",
        overflow: "hidden"
    }
    
    const btnStyle = {
        fontFamily: "satoshiRegular",
        fontSize: "16px",
        marginTop: "12px",
        padding: "26px 62px",
        color: "white",
        border: 0,
        borderRadius: "200px",
        outline: "none",
        cursor: "pointer",
        transition: "0.2s ease-in",
        background: isHover ? "#282828" : "#2E898D",
        transform: isClicked ? 'scale(0.9)' : 'scale(1)', // Scale the button on click

    }

    const handleMouseEnter = () => {
        setIsHover(true)
    }

    const handleMouseLeave = () => {
        setIsHover(false)
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true)

        // Set the button to the clicked state
        setIsClicked(true);

        // Reset the button to its original state after a short delay (e.g., 300 milliseconds)
        setTimeout(() => {
            setIsClicked(false);
        }, 100);
    
        const errors = Object.keys(formData).reduce((acc, fieldName) => {
          return {
            ...acc,
            ...validate[fieldName](formData[fieldName]),
          };
        }, {});
    
        setFormErrors(errors);
    
        if (Object.values(errors).every((error) => !error)) {
          console.log('Form submitted successfully');
          // Perform form submission logic here
          emailjs
            .sendForm(
                'service_jbl85xs', 
                'template_vbntieg', 
                form.current, 
                '97jMgRU9uAuzx_eSn'
                )
            .then(
                (result) => {
                console.log(result.text);
                console.log("Message Sent");
            }, 
            (error) => {
                console.log(error.text);
                console.log("Message Failed");
            });
        }
      };

    useEffect(() => {
        if (isSubmit) {
            const errors = Object.keys(formData).reduce((acc, fieldName) => {
                return {
                  ...acc,
                  ...validate[fieldName](formData[fieldName]),
                };
              }, {});

              setFormErrors(errors);
        }
        
    }, [formData])

    const validate = {
        name: (value) => ({
          name: !value.trim() ? 'Name is required' : /^[a-z ,.'-]+$/i.test(value) ? '' : 'Name must contain only letters',
        }),
        email: (value) => ({
          email: !value.trim() ? 'Email is required' : /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(value) ? '' : 'Invalid email format',
        }),
        budget: (value) => ({
          budget: !value.trim() ? 'budget is required' : '',
        }),
        message: (value) => ({
          message: !value.trim() ? 'message is required' : '',
        }),
      };

    return (
        
        <div style={containerStyle}>

            

            <h1 style={headerStyle}>Reach out</h1>
            <p style={descrStyle}>Tell us a little bit about what we want to create</p>
            <form 
                style={formStyle}
                onSubmit={handleSubmit}
                ref={form}
            >
                <input 
                    type="text"
                    placeholder='Full Name'
                    name='name'
                    id='name' 
                    value={formData.name}
                    onChange={handleChange}
                    style={{...inputStyle, border: formErrors.name ? "1px solid #FF5555" : "1px solid transparent"}}
                />
                <input 
                    type="email"
                    placeholder='Email'
                    name='email'
                    id='email' 
                    value={formData.email}
                    onChange={handleChange}
                    style={{...inputStyle, border: formErrors.email ? "1px solid #FF5555" : "1px solid transparent"}}
                />
                <input 
                    type="text"
                    placeholder='$ Expected Budget'
                    name='budget'
                    id='budget' 
                    value={formData.budget}
                    onChange={handleChange}
                    style={{...inputStyle, border: formErrors.budget ? "1px solid #FF5555" : "1px solid transparent"}}
                />
                <textarea
                    placeholder='Describe Project'
                    name='message'
                    id='message'
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    style={txtAreaStyle}
                />
                <button
                    type='submit'
                    value="Send"
                    style={btnStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    Send Message
                </button>
            </form>

            <style>
                {`
                @media (max-width: 767px) {
                        h1 {
                        font-size: 24px !important; // Font size for mobile
                        }

                        p {
                            font-size: 14px !important; // Font size for mobile
                        }

                        input {
                            font-size: 14px !important; // Font size for mobile
                        }

                        button {
                            font-size: 14px !important; // Font size for mobile
                        }
                    }
                }
                `}
            </style>

            {/* Media query for tablets */}
            <style>
                {`
                @media (min-width: 768px) and (max-width: 1023px) {
                        h1 {
                        font-size: 32px !important; // Font size for tablet
                        }

                        p {
                        font-size: 14px !important; // Font size for tablet
                        }

                        input {
                            font-size: 14px !important; // Font size for mobile
                        }

                        button {
                            font-size: 14px !important; // Font size for mobile
                        }
                }
                `}
            </style>            

        </div>
    );
};

export default Form;