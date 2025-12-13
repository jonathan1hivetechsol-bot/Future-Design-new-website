import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page",
  description: "Get in touch with Future Designz for inquiries about our premium tiles and fixtures.",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Us"
        description="Get in touch with Future Designz for inquiries about our premium bathroom tiles and fixtures. We're here to help transform your space."
      />

      <Contact />
    </>
  );
};

export default ContactPage;
