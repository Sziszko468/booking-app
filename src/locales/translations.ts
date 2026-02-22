// Multi-language translations
// Supported: EN, HU, NL, DE, FR, ES, IT

type TranslationKey = 
  | "nav.dashboard"
  | "nav.appointments"
  | "nav.calendar"
  | "nav.clients"
  | "nav.settings"
  | "nav.newBooking"
  | "dashboard.greeting"
  | "dashboard.totalBookings"
  | "dashboard.today"
  | "dashboard.thisWeek"
  | "dashboard.uniqueClients"
  | "dashboard.upcomingAppointments"
  | "dashboard.viewAll"
  | "dashboard.serviceBreakdown"
  | "dashboard.todaySummary"
  | "dashboard.scheduled"
  | "dashboard.completed"
  | "dashboard.cancelled"
  | "dashboard.topService"
  | "common.email"
  | "common.name"
  | "common.date"
  | "common.time"
  | "common.service"
  | "common.status"
  | "common.notes"
  | "common.save"
  | "common.cancel"
  | "common.delete"
  | "common.edit"
  | "common.create"
  | "common.back"
  | "common.loading"
  | "common.search"
  | "login.title"
  | "login.subtitle"
  | "login.email"
  | "login.password"
  | "login.signIn"
  | "booking.title"
  | "booking.subtitle"
  | "booking.fullName"
  | "booking.bookAppointment"
  | "booking.success";

type Translations = {
  [key in "en" | "hu" | "nl" | "de" | "fr" | "es" | "it"]: Record<TranslationKey, string>;
};

export const translations: Translations = {
  en: {
    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.appointments": "Appointments",
    "nav.calendar": "Calendar",
    "nav.clients": "Clients",
    "nav.settings": "Settings",
    "nav.newBooking": "New Booking",
    
    // Dashboard
    "dashboard.greeting": "Good day 👋",
    "dashboard.totalBookings": "Total bookings",
    "dashboard.today": "Today",
    "dashboard.thisWeek": "This week",
    "dashboard.uniqueClients": "Unique clients",
    "dashboard.upcomingAppointments": "Upcoming appointments",
    "dashboard.viewAll": "View all",
    "dashboard.serviceBreakdown": "Service breakdown",
    "dashboard.todaySummary": "Today's summary",
    "dashboard.scheduled": "Scheduled",
    "dashboard.completed": "Completed",
    "dashboard.cancelled": "Cancelled",
    "dashboard.topService": "Top service",
    
    // Common
    "common.email": "Email",
    "common.name": "Name",
    "common.date": "Date",
    "common.time": "Time",
    "common.service": "Service",
    "common.status": "Status",
    "common.notes": "Notes",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.create": "Create",
    "common.back": "Back",
    "common.loading": "Loading...",
    "common.search": "Search",
    
    // Login
    "login.title": "Welcome back",
    "login.subtitle": "Sign in to your account",
    "login.email": "Email address",
    "login.password": "Password",
    "login.signIn": "Sign in",
    
    // Booking
    "booking.title": "Book an Appointment",
    "booking.subtitle": "Choose your preferred date, time, and service",
    "booking.fullName": "Full Name",
    "booking.bookAppointment": "Book Appointment",
    "booking.success": "Booking Confirmed!",
  },
  
  hu: {
    "nav.dashboard": "Áttekintés",
    "nav.appointments": "Időpontok",
    "nav.calendar": "Naptár",
    "nav.clients": "Ügyfelek",
    "nav.settings": "Beállítások",
    "nav.newBooking": "Új foglalás",
    
    "dashboard.greeting": "Szép napot 👋",
    "dashboard.totalBookings": "Összes foglalás",
    "dashboard.today": "Ma",
    "dashboard.thisWeek": "Ezen a héten",
    "dashboard.uniqueClients": "Egyedi ügyfelek",
    "dashboard.upcomingAppointments": "Közelgő időpontok",
    "dashboard.viewAll": "Összes megtekintése",
    "dashboard.serviceBreakdown": "Szolgáltatások",
    "dashboard.todaySummary": "Mai összefoglaló",
    "dashboard.scheduled": "Ütemezett",
    "dashboard.completed": "Teljesítve",
    "dashboard.cancelled": "Törölve",
    "dashboard.topService": "Legnépszerűbb",
    
    "common.email": "Email",
    "common.name": "Név",
    "common.date": "Dátum",
    "common.time": "Időpont",
    "common.service": "Szolgáltatás",
    "common.status": "Státusz",
    "common.notes": "Jegyzetek",
    "common.save": "Mentés",
    "common.cancel": "Mégse",
    "common.delete": "Törlés",
    "common.edit": "Szerkesztés",
    "common.create": "Létrehozás",
    "common.back": "Vissza",
    "common.loading": "Betöltés...",
    "common.search": "Keresés",
    
    "login.title": "Üdvözlünk újra",
    "login.subtitle": "Jelentkezz be",
    "login.email": "Email cím",
    "login.password": "Jelszó",
    "login.signIn": "Bejelentkezés",
    
    "booking.title": "Időpontfoglalás",
    "booking.subtitle": "Válaszd ki a neked megfelelő időpontot",
    "booking.fullName": "Teljes név",
    "booking.bookAppointment": "Foglalás",
    "booking.success": "Foglalás megerősítve!",
  },
  
  nl: {
    "nav.dashboard": "Dashboard",
    "nav.appointments": "Afspraken",
    "nav.calendar": "Agenda",
    "nav.clients": "Klanten",
    "nav.settings": "Instellingen",
    "nav.newBooking": "Nieuwe Boeking",
    
    "dashboard.greeting": "Goedendag 👋",
    "dashboard.totalBookings": "Totaal boekingen",
    "dashboard.today": "Vandaag",
    "dashboard.thisWeek": "Deze week",
    "dashboard.uniqueClients": "Unieke klanten",
    "dashboard.upcomingAppointments": "Komende afspraken",
    "dashboard.viewAll": "Alles bekijken",
    "dashboard.serviceBreakdown": "Service overzicht",
    "dashboard.todaySummary": "Overzicht vandaag",
    "dashboard.scheduled": "Gepland",
    "dashboard.completed": "Voltooid",
    "dashboard.cancelled": "Geannuleerd",
    "dashboard.topService": "Populairste dienst",
    
    "common.email": "E-mail",
    "common.name": "Naam",
    "common.date": "Datum",
    "common.time": "Tijd",
    "common.service": "Dienst",
    "common.status": "Status",
    "common.notes": "Notities",
    "common.save": "Opslaan",
    "common.cancel": "Annuleren",
    "common.delete": "Verwijderen",
    "common.edit": "Bewerken",
    "common.create": "Aanmaken",
    "common.back": "Terug",
    "common.loading": "Laden...",
    "common.search": "Zoeken",
    
    "login.title": "Welkom terug",
    "login.subtitle": "Inloggen op uw account",
    "login.email": "E-mailadres",
    "login.password": "Wachtwoord",
    "login.signIn": "Inloggen",
    
    "booking.title": "Afspraak Maken",
    "booking.subtitle": "Kies uw gewenste datum, tijd en dienst",
    "booking.fullName": "Volledige naam",
    "booking.bookAppointment": "Afspraak Boeken",
    "booking.success": "Boeking Bevestigd!",
  },
  
  de: {
    "nav.dashboard": "Dashboard",
    "nav.appointments": "Termine",
    "nav.calendar": "Kalender",
    "nav.clients": "Kunden",
    "nav.settings": "Einstellungen",
    "nav.newBooking": "Neue Buchung",
    
    "dashboard.greeting": "Guten Tag 👋",
    "dashboard.totalBookings": "Gesamte Buchungen",
    "dashboard.today": "Heute",
    "dashboard.thisWeek": "Diese Woche",
    "dashboard.uniqueClients": "Einzelne Kunden",
    "dashboard.upcomingAppointments": "Kommende Termine",
    "dashboard.viewAll": "Alle anzeigen",
    "dashboard.serviceBreakdown": "Service-Übersicht",
    "dashboard.todaySummary": "Heutige Zusammenfassung",
    "dashboard.scheduled": "Geplant",
    "dashboard.completed": "Abgeschlossen",
    "dashboard.cancelled": "Storniert",
    "dashboard.topService": "Top-Service",
    
    "common.email": "E-Mail",
    "common.name": "Name",
    "common.date": "Datum",
    "common.time": "Zeit",
    "common.service": "Dienstleistung",
    "common.status": "Status",
    "common.notes": "Notizen",
    "common.save": "Speichern",
    "common.cancel": "Abbrechen",
    "common.delete": "Löschen",
    "common.edit": "Bearbeiten",
    "common.create": "Erstellen",
    "common.back": "Zurück",
    "common.loading": "Laden...",
    "common.search": "Suchen",
    
    "login.title": "Willkommen zurück",
    "login.subtitle": "Melden Sie sich an",
    "login.email": "E-Mail-Adresse",
    "login.password": "Passwort",
    "login.signIn": "Anmelden",
    
    "booking.title": "Termin Buchen",
    "booking.subtitle": "Wählen Sie Datum, Zeit und Service",
    "booking.fullName": "Vollständiger Name",
    "booking.bookAppointment": "Termin Buchen",
    "booking.success": "Buchung Bestätigt!",
  },
  
  fr: {
    "nav.dashboard": "Tableau de bord",
    "nav.appointments": "Rendez-vous",
    "nav.calendar": "Calendrier",
    "nav.clients": "Clients",
    "nav.settings": "Paramètres",
    "nav.newBooking": "Nouvelle Réservation",
    
    "dashboard.greeting": "Bonjour 👋",
    "dashboard.totalBookings": "Réservations totales",
    "dashboard.today": "Aujourd'hui",
    "dashboard.thisWeek": "Cette semaine",
    "dashboard.uniqueClients": "Clients uniques",
    "dashboard.upcomingAppointments": "Rendez-vous à venir",
    "dashboard.viewAll": "Voir tout",
    "dashboard.serviceBreakdown": "Répartition des services",
    "dashboard.todaySummary": "Résumé d'aujourd'hui",
    "dashboard.scheduled": "Planifié",
    "dashboard.completed": "Terminé",
    "dashboard.cancelled": "Annulé",
    "dashboard.topService": "Service principal",
    
    "common.email": "E-mail",
    "common.name": "Nom",
    "common.date": "Date",
    "common.time": "Heure",
    "common.service": "Service",
    "common.status": "Statut",
    "common.notes": "Notes",
    "common.save": "Enregistrer",
    "common.cancel": "Annuler",
    "common.delete": "Supprimer",
    "common.edit": "Modifier",
    "common.create": "Créer",
    "common.back": "Retour",
    "common.loading": "Chargement...",
    "common.search": "Rechercher",
    
    "login.title": "Bon retour",
    "login.subtitle": "Connectez-vous",
    "login.email": "Adresse e-mail",
    "login.password": "Mot de passe",
    "login.signIn": "Se connecter",
    
    "booking.title": "Prendre Rendez-vous",
    "booking.subtitle": "Choisissez votre date, heure et service",
    "booking.fullName": "Nom complet",
    "booking.bookAppointment": "Réserver",
    "booking.success": "Réservation Confirmée!",
  },
  
  es: {
    "nav.dashboard": "Panel",
    "nav.appointments": "Citas",
    "nav.calendar": "Calendario",
    "nav.clients": "Clientes",
    "nav.settings": "Configuración",
    "nav.newBooking": "Nueva Reserva",
    
    "dashboard.greeting": "Buen día 👋",
    "dashboard.totalBookings": "Reservas totales",
    "dashboard.today": "Hoy",
    "dashboard.thisWeek": "Esta semana",
    "dashboard.uniqueClients": "Clientes únicos",
    "dashboard.upcomingAppointments": "Próximas citas",
    "dashboard.viewAll": "Ver todo",
    "dashboard.serviceBreakdown": "Desglose de servicios",
    "dashboard.todaySummary": "Resumen de hoy",
    "dashboard.scheduled": "Programado",
    "dashboard.completed": "Completado",
    "dashboard.cancelled": "Cancelado",
    "dashboard.topService": "Servicio principal",
    
    "common.email": "Correo",
    "common.name": "Nombre",
    "common.date": "Fecha",
    "common.time": "Hora",
    "common.service": "Servicio",
    "common.status": "Estado",
    "common.notes": "Notas",
    "common.save": "Guardar",
    "common.cancel": "Cancelar",
    "common.delete": "Eliminar",
    "common.edit": "Editar",
    "common.create": "Crear",
    "common.back": "Volver",
    "common.loading": "Cargando...",
    "common.search": "Buscar",
    
    "login.title": "Bienvenido",
    "login.subtitle": "Iniciar sesión",
    "login.email": "Correo electrónico",
    "login.password": "Contraseña",
    "login.signIn": "Iniciar sesión",
    
    "booking.title": "Reservar Cita",
    "booking.subtitle": "Elija su fecha, hora y servicio",
    "booking.fullName": "Nombre completo",
    "booking.bookAppointment": "Reservar Cita",
    "booking.success": "¡Reserva Confirmada!",
  },
  
  it: {
    "nav.dashboard": "Dashboard",
    "nav.appointments": "Appuntamenti",
    "nav.calendar": "Calendario",
    "nav.clients": "Clienti",
    "nav.settings": "Impostazioni",
    "nav.newBooking": "Nuova Prenotazione",
    
    "dashboard.greeting": "Buongiorno 👋",
    "dashboard.totalBookings": "Prenotazioni totali",
    "dashboard.today": "Oggi",
    "dashboard.thisWeek": "Questa settimana",
    "dashboard.uniqueClients": "Clienti unici",
    "dashboard.upcomingAppointments": "Prossimi appuntamenti",
    "dashboard.viewAll": "Vedi tutto",
    "dashboard.serviceBreakdown": "Ripartizione servizi",
    "dashboard.todaySummary": "Riepilogo di oggi",
    "dashboard.scheduled": "Programmato",
    "dashboard.completed": "Completato",
    "dashboard.cancelled": "Annullato",
    "dashboard.topService": "Servizio principale",
    
    "common.email": "Email",
    "common.name": "Nome",
    "common.date": "Data",
    "common.time": "Ora",
    "common.service": "Servizio",
    "common.status": "Stato",
    "common.notes": "Note",
    "common.save": "Salva",
    "common.cancel": "Annulla",
    "common.delete": "Elimina",
    "common.edit": "Modifica",
    "common.create": "Crea",
    "common.back": "Indietro",
    "common.loading": "Caricamento...",
    "common.search": "Cerca",
    
    "login.title": "Bentornato",
    "login.subtitle": "Accedi al tuo account",
    "login.email": "Indirizzo email",
    "login.password": "Password",
    "login.signIn": "Accedi",
    
    "booking.title": "Prenota Appuntamento",
    "booking.subtitle": "Scegli data, ora e servizio",
    "booking.fullName": "Nome completo",
    "booking.bookAppointment": "Prenota",
    "booking.success": "Prenotazione Confermata!",
  },
};
