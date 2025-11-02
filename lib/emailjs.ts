import emailjs from "@emailjs/browser";

const emailJsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_API_KEY;

export const sendEmail = (
    email: string,
    message: string,
    lookingAt: string,
) => {
    if (!emailJsPublicKey) {
        throw new Error("NEXT_PUBLIC_EMAILJS_API_KEY has not been set");
    }

    const templateParams = {
        senderEmail: email,
        lookingAt: lookingAt,
        note: message || "No additional message provided",
        to_email: email,
    };

    emailjs
        .send("service_2ne33wk", "template_qg03z8u", templateParams, {
            publicKey: emailJsPublicKey,
        })
        .then((res) => {
            console.log("Email sent successfully:", res.status, res.text);
        })
        .catch((error: any) => {
            console.error("Email sending failed:", error);
        });
};
