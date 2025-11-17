const emailJsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_API_KEY;

export const sendEmail = async (
    email: string,
    phone: string,
    message: string,
    lookingAt: string,
) => {
    if (!emailJsPublicKey) {
        throw new Error("NEXT_PUBLIC_EMAILJS_API_KEY has not been set");
    }

    // Having Issues running emailjs even on client
    // Only import emailjs on the client side
    if (typeof window === "undefined") {
        console.error("sendEmail should only be called on the client side");
        return;
    }

    const emailjs = (await import("@emailjs/browser")).default;

    const templateParams = {
        senderEmail: email,
        senderPhone: phone,
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
