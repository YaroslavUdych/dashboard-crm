const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
})

/**
 * sending email through nodemailer
 * @param {string} email - Recipient's email address
 * @param {string} subject - Email subject
 * @param {string} htmlContent - Email content in HTML format
 * @returns {Promise<void>} - The function works asynchronously, does not return a value
 */

const sendEmail = async (email, subject, htmlContent) => {
	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: email,
		subject: subject,
		text: '',
		html: htmlContent,
	}

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error('Email not sent!', error)
		} else {
			console.log('Email sent successfully')
		}
	})
}

/**
 * Sends an email to confirm registration
 * @param {string} email - Recipient's email address
 * @param {string} firstName - User's first name
 * @param {string} lastName - User's last name
 * @param {string} otp - One-time code to confirm registration
 * @returns {Promise<void>} - The function works asynchronously, does not return a value
 */
const sendRegistrationEmail = async (email, firstName, lastName, otp) => {
	const activationLink = `http://localhost:5173/verify-otp`

	const htmlContent = `
        <h3>Dear ${firstName} ${lastName},</h3>
        <h5>You have been registered on Momentum. We are happy to have you on board!</h5>
        <h5>To confirm your registration, please enter the following code on <a href="${activationLink}">this page</a>:</h5>
        <h3>${otp}</h3>
        <h5>The code is valid for 1 hour.</h5>
        <br>
        <h4>Best regards, Momentum team</h4>
    `

	await sendEmail(email, 'Confirmation of registration on Momentum', htmlContent)
}

/**
 * Sends an email to reset the password
 * @param {string} email - Recipient's email address
 * @param {string} firstName - User's first name
 * @param {string} lastName - User's last name
 * @param {string} otp - One-time code to reset the password
 * @returns {Promise<void>} - The function works asynchronously, does not return a value
 */
const sendForgotPasswordEmail = async (email, firstName, lastName, otp) => {
	const resetLink = `http://localhost:5173/verify-otp`

	const htmlContent = `
        <h3>Dear ${firstName} ${lastName},</h3>
        <h4>You have requested a password reset on Momentum. We are happy to help you!</h4>
        <h4>To reset your password, please enter the following code on <a href="${resetLink}">this page</a>:</h4>
        <h1>${otp}</h1>
        <h4>The code is valid for 5 minutes.</h4>
        <br>
        <h3>Best regards, Momentum team</h3>
    `

	await sendEmail(email, 'Password reset on Momentum', htmlContent)
}

module.exports = { sendRegistrationEmail, sendForgotPasswordEmail }
