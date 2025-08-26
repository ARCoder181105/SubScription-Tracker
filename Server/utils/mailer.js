import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MY_EMAIL,    // Your Gmail address
        pass: process.env.EMIAL_APP_PASSWORD    // The App Password you generated
    }
});

const sendReminderEmail = async (userEmail, platformName) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: `Reminder: Your ${platformName} subscription is renewing soon!`,
        html: `
            <h1>Heads Up!</h1>
            <p>Just a friendly reminder that your **${platformName}** subscription is due for renewal in a few days.</p>
            <p>Make sure you're ready or take action if you need to cancel!</p>
            <br>
            <p>-- The SubScribe Team</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${userEmail} for ${platformName}`);
    } catch (error) {
        console.error(`Error sending email to ${userEmail}:`, error);
    }
};


const sendWelcomeMail = async (userEmail, username) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Welcome to SubScribe!',
        html: `
            <h1>Welcome, ${username}!</h1>
            <p>Thank you for signing up for SubScribe. We're excited to help you manage your subscriptions with ease.</p>
            <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
            <br>
            <p>-- The SubScribe Team</p>
            `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Welcome mail sent to ${username} on mail: ${userEmail}`);
    } catch (error) {
        console.error(`Error sending email to ${userEmail}:`, error);
    }
}

const sendReminder1Day = async (userEmail, username, platformName) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: `Reminder: Your ${platformName} subscription ends in 1 day`,
        html: `
            <h1>Subscription Ending Tomorrow</h1>
            <p>Hi ${username},</p>
            <p>This is a reminder that your <strong>${platformName}</strong> subscription will end in <strong>1 day</strong>.</p>
            <p>Please take any necessary action if you wish to renew or cancel your subscription.</p>
            <br>
            <p>-- The SubScribe Team</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`1-day reminder mail sent to ${username} on mail: ${userEmail}`);
    } catch (error) {
        console.error(`Error sending 1-day reminder email to ${userEmail}:`, error);
    }
};

const sendReminderToday = async (userEmail, username, platformName) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: `Alert: Your ${platformName} subscription expires today!`,
        html: `
            <h1>Subscription Expires Today</h1>
            <p>Hi ${username},</p>
            <p>Your <strong>${platformName}</strong> subscription is expiring <strong>today</strong>.</p>
            <p>If you wish to renew, please do so as soon as possible to avoid interruption.</p>
            <br>
            <p>-- The SubScribe Team</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Expiration-today mail sent to ${username} on mail: ${userEmail}`);
    } catch (error) {
        console.error(`Error sending expiration-today email to ${userEmail}:`, error);
    }
};

export { sendReminderEmail, sendWelcomeMail, sendReminder1Day, sendReminderToday };