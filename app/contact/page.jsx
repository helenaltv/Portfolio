"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (response.ok) {
        alert("E-post skickad!");
      } else {
        console.error("API error response:", responseData);
        alert(`Något gick fel: ${responseData.message}`);
      }
    } catch (error) {
      console.error("Fel vid skickande av e-post:", error);
      alert(`Något gick fel: ${error.message}`);
    }
  };

  return (
    <div>
      <Link className="text-xl" href="/">
        <span>Home</span>
      </Link>
      <p className="min-mail">Kontakta gärna mig på helenaltv@gmail.com</p>

      <section className="Kontakt">
        <h1>You can write to me here</h1>
        <form className="Form" onSubmit={handleSubmit}>
          <p>
            <label>
              Name:
              <input
                className="Namn"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
          </p>
          <p>
            <label>
              E-Mail:
              <input
                className="E-post"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
          </p>
          <p>
            <label>
              Message:
              <textarea
                className="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </label>
          </p>
          <button type="submit">Skicka</button>
        </form>
      </section>
      <Link className="text-xl ml-52 s " href="/">
        <span>Home</span>
      </Link>
    </div>
  );
}
