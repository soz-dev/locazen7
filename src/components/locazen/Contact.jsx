import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Contact({ visitorType = "proprietaire" }) {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", subject: visitorType === "voyageur" ? "Demande de location" : "Demande de conciergerie", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/myriamboum34@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          Nom: form.name,
          Email: form.email,
          Sujet: form.subject,
          Message: form.message,
          _subject: `[Locazen] ${form.subject} — ${form.name}`,
          _replyto: form.email,
          _template: "table",
          _captcha: "false",
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: form.subject, message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const isVoyageur = visitorType === "voyageur";
  const sectionBg  = isVoyageur ? "bg-[#0C4A6E]" : "bg-[#1A2535]";
  const accentCls  = isVoyageur ? "text-[#38BDF8]" : "text-[#C4A96B]";
  const focusCls   = isVoyageur ? "focus:border-[#38BDF8]" : "focus:border-[#C4A96B]";
  const optBg      = isVoyageur ? "#0C4A6E" : "#1A2535";
  const btnCls     = isVoyageur ? "bg-[#0891B2] hover:bg-[#0369A1] text-white" : "bg-[#C4A96B] hover:bg-[#B8965A] text-[#1A2535]";
  const hoverLink  = isVoyageur ? "hover:text-[#38BDF8]" : "hover:text-[#C4A96B]";

  return (
      <section id="contact" className={`${sectionBg} border-t border-white/10 py-24 md:py-32`}>
      <div className="max-w-5xl mx-auto px-6 md:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14 md:mb-20 text-center"
        >
          <p className={`${accentCls} text-xs tracking-[0.3em] uppercase font-body mb-4`}>
            {t("contact.eyebrow")}
          </p>
          <h2 className="font-heading text-4xl md:text-6xl font-light text-[#F7F5F2] tracking-[0.05em]">
            {t("contact.title")}
          </h2>
          <p className="mt-4 text-[#F7F5F2]/50 text-sm font-body max-w-md mx-auto">
            {visitorType === "voyageur" ? t("contact.subtitleVoyageur") : t("contact.subtitleOwner")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.2em] uppercase text-[#F7F5F2]/40 font-body">{t("contact.name")}</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder={t("contact.namePlaceholder")}
                  className={`bg-[#F7F5F2]/5 border border-[#F7F5F2]/10 ${focusCls} outline-none px-4 py-3 text-sm text-[#F7F5F2] placeholder-[#F7F5F2]/25 font-body transition-colors`}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.2em] uppercase text-[#F7F5F2]/40 font-body">{t("contact.email")}</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="votre@email.com"
                  className={`bg-[#F7F5F2]/5 border border-[#F7F5F2]/10 ${focusCls} outline-none px-4 py-3 text-sm text-[#F7F5F2] placeholder-[#F7F5F2]/25 font-body transition-colors`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-[0.2em] uppercase text-[#F7F5F2]/40 font-body">{t("contact.subject")}</label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className={`bg-[#F7F5F2]/5 border border-[#F7F5F2]/10 ${focusCls} outline-none px-4 py-3 text-sm text-[#F7F5F2] font-body transition-colors appearance-none cursor-pointer`}
              >
                {visitorType === "voyageur" ? (
                  <>
                    <option value="Demande de location" style={{ backgroundColor: optBg }}>{t("contact.opt_rental")}</option>
                    <option value="Disponibilités" style={{ backgroundColor: optBg }}>{t("contact.opt_availability")}</option>
                    <option value="Tarifs et prestations" style={{ backgroundColor: optBg }}>{t("contact.opt_pricing")}</option>
                    <option value="Autre" style={{ backgroundColor: optBg }}>{t("contact.opt_other")}</option>
                  </>
                ) : (
                  <>
                    <option value="Demande de conciergerie" style={{ backgroundColor: optBg }}>{t("contact.opt_concierge")}</option>
                    <option value="Estimation de revenus" style={{ backgroundColor: optBg }}>{t("contact.opt_estimate")}</option>
                    <option value="Gestion de bien" style={{ backgroundColor: optBg }}>{t("contact.opt_management")}</option>
                    <option value="Autre" style={{ backgroundColor: optBg }}>{t("contact.opt_other")}</option>
                  </>
                )}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-[0.2em] uppercase text-[#F7F5F2]/40 font-body">{t("contact.message")}</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder={t("contact.messagePlaceholder")}
                className={`bg-[#F7F5F2]/5 border border-[#F7F5F2]/10 ${focusCls} outline-none px-4 py-3 text-sm text-[#F7F5F2] placeholder-[#F7F5F2]/25 font-body transition-colors resize-none`}
              />
            </div>

            {status === "success" && (
              <div className={`flex items-center gap-2 ${accentCls} text-sm font-body`}>
                <CheckCircle size={16} />
                {t("contact.success")}
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-2 text-red-400 text-sm font-body">
                <AlertCircle size={16} />
                {t("contact.error")}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className={`flex items-center justify-center gap-2 ${btnCls} disabled:opacity-50 py-4 text-xs tracking-[0.2em] uppercase font-body transition-colors duration-300 min-h-[44px]`}
            >
              <Send size={13} />
              {status === "sending" ? t("contact.sending") : t("contact.send")}
            </button>
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex flex-col gap-8 pt-2"
          >
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#F7F5F2]/30 font-body mb-2">{t("contact.phone")}</p>
              <a href="tel:0659769194" className={`text-[#F7F5F2]/80 ${hoverLink} transition-colors font-body text-sm`}>
                06.59.76.91.94
              </a>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#F7F5F2]/30 font-body mb-2">{t("contact.emailLabel")}</p>
              <a href="mailto:myriamboum34@gmail.com" className={`text-[#F7F5F2]/80 ${hoverLink} transition-colors font-body text-sm`}>
                myriamboum34@gmail.com
              </a>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#F7F5F2]/30 font-body mb-2">{t("contact.location")}</p>
              <p className="text-[#F7F5F2]/80 font-body text-sm">34, rue Lucien Salette — 34200 Sète</p>
            </div>
            <div className="mt-4 pt-8 border-t border-[#F7F5F2]/10">
              <p className="text-[#F7F5F2]/30 text-xs font-body leading-relaxed">
                {t("contact.availability")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
