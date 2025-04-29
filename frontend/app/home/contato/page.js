'use client';

import React, { useState } from 'react';
import { MailIcon, PhoneCallIcon, MapPinIcon, SendIcon } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './Contato.css';

emailjs.init({ publicKey: 'zbGQQXUtp3SZV-Ta8' });

function Contato() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const formatPhoneNumber = value => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 11) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      return setValidationErrors({ ...validationErrors, email: 'Email inválido' });
    }

    const phoneNumbers = formData.phone.replace(/\D/g, '');
    if (phoneNumbers.length < 10 || phoneNumbers.length > 11) {
      return setValidationErrors({ ...validationErrors, phone: 'Telefone inválido' });
    }

    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      await emailjs.send('service_hwl9vll', 'template_eqztfpk', {
        to_email: 'dumedhospitalar@hotmail.com',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });

      setSubmitStatus('Mensagem enviada com sucesso!');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setValidationErrors({});
    } catch (error) {
      console.error('Erro:', error);
      setSubmitStatus('Erro ao enviar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    const updatedValue = id === 'phone' ? formatPhoneNumber(value) : value;

    setFormData(prev => ({ ...prev, [id]: updatedValue }));
    if (validationErrors[id]) {
      setValidationErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Fale Conosco</h1>
        <p>Preencha o formulário ou entre em contato pelos canais abaixo.</p>
      </div>

      <div className="grid">
        <div className="contact-list">
          {[
            {
              icon: <MapPinIcon className="w-6 h-6 text-blue-600" />,
              title: 'Endereço',
              text: 'Rua Emílio Trevisan, 400\nPresidente Prudente - SP, 19013-200',
            },
            {
              icon: <PhoneCallIcon className="w-6 h-6 text-blue-600" />,
              title: 'Telefone',
              text: '(18) 3222-0827',
            },
            {
              icon: <MailIcon className="w-6 h-6 text-blue-600" />,
              title: 'E-mail',
              text: 'dumed@dumedhospitalar.com.br',
            },
          ].map(({ icon, title, text }, index) => (
            <div key={index} className="contact-card">
              <div className="icon-wrapper">{icon}</div>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            {[
              { id: 'name', label: 'Nome' },
              { id: 'email', label: 'Email' },
              { id: 'phone', label: 'Telefone' },
              { id: 'subject', label: 'Assunto' },
            ].map(({ id, label }) => (
              <div key={id} className="form-group">
                <label htmlFor={id}>{label}</label>
                <input
                  id={id}
                  type={id === 'email' ? 'email' : 'text'}
                  value={formData[id]}
                  onChange={handleChange}
                  placeholder={label}
                  maxLength={id === 'phone' ? 15 : undefined}
                  disabled={isSubmitting}
                  required
                  className={validationErrors[id] ? 'error-input' : ''}
                />
                {validationErrors[id] && (
                  <p className="error">{validationErrors[id]}</p>
                )}
              </div>
            ))}

            <div className="form-group">
              <label htmlFor="message">Mensagem</label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            {submitStatus && (
              <div className={`status ${submitStatus.includes('sucesso') ? 'success' : 'error'}`}>
                {submitStatus}
              </div>
            )}

            <button type="submit" disabled={isSubmitting}>
              <SendIcon className="w-4 h-4" />
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contato;
