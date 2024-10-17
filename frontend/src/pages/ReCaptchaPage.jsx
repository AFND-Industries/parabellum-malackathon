import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function ReCaptchaPage() {
    const [captchaResponse, setCaptchaResponse] = useState('');
    const navigate = useNavigate();

    const handleCaptchaChange = (value) => {
        setCaptchaResponse(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!captchaResponse) {
            alert("Por favor, completa el CAPTCHA.");
            return;
        }

        try {

            const res = await axios.post('http://malackathon.yellowbeavers.com:6998/submit', { 'g-recaptcha-response': captchaResponse });
            console.log(res.status)
            if (res.status === 200) {
                localStorage.setItem('refreshCount', 0);
                // Redirige al HomePage después de la verificación exitosa
                navigate('/');
            } else {
                alert("Falló la verificación del CAPTCHA.");
            }
        } catch (error) {
            console.error(error);
            alert('Error al verificar el CAPTCHA.' + error);
        }
    };

    return (
        <div className="captcha-page d-flex justify-content-center align-items-center flex-column">
            <h1 className='mb-3 mt-5'>Verifica el CAPTCHA</h1>
            <ReCAPTCHA
                sitekey="6LfoSWQqAAAAACE_fH2gZk6lrGlaO2RxHkdV_8Mg" // Reemplaza con tu clave pública
                onChange={handleCaptchaChange}
            />
            <button onClick={handleSubmit} className='btn btn-primary mt-3'>Verificar</button>
        </div>
    );
}
