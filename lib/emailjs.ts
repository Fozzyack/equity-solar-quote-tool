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
        note: message,
    };

    (emailjs
        .send("service_7qmz2mm", "template_qg03z8u", templateParams, {
            publicKey: emailJsPublicKey,
        })
        .then((res) => {
            console.log("Success", res.status, res.text);
        }),
        (error: any) => {
            console.log("FAILED... ", error);
        });
};
