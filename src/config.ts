// =============================================================================
// AMEREY SHOP - Site Configuration
// Luxury Fashion Boutique - Premium Ready-to-Wear
// =============================================================================

// -- Site-wide settings -------------------------------------------------------
export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "AMEREY SHOP | Mode Prêt-à-Porter de Luxe",
  description: "Votre destination pour une mode prêt-à-porter élégante. Shopping et vente au détail de vêtements homme et femme.",
  language: "fr",
};

// -- Hero Section -------------------------------------------------------------
export interface HeroConfig {
  backgroundImage: string;
  brandName: string;
  mainTitle: string;
  subtitle: string;
  description: string;
  scrollHint: string;
  navItems: { label: string; sectionId: string }[];
}

export const heroConfig: HeroConfig = {
  backgroundImage: "/hero-bg.jpg",
  brandName: "AMEREY SHOP",
  mainTitle: "AMEREY SHOP",
  subtitle: "Shopping et vente au détail",
  description: "Prêt-à-porter homme & femme",
  scrollHint: "Découvrir",
  navItems: [
    { label: "Accueil", sectionId: "hero" },
    { label: "Bienvenue", sectionId: "welcome" },
    { label: "Collections", sectionId: "collections" },
    { label: "Contact", sectionId: "footer" },
  ],
};

// -- Welcome Section ----------------------------------------------------------
export interface WelcomeConfig {
  sectionLabel: string;
  title: string;
  subtitle: string;
  description: string;
  features: { title: string; description: string }[];
}

export const welcomeConfig: WelcomeConfig = {
  sectionLabel: "Bienvenue",
  title: "Bienvenue à AMEREY SHOP",
  subtitle: "Votre destination pour une mode prêt à porter élégante",
  description: "Dans un univers où le luxe rencontre l'accessibilité, AMEREY SHOP vous invite à découvrir une sélection curée de pièces prêt-à-porter pour homme et femme. Chaque vêtement est choisi avec soin pour son excellence, son style intemporel et son artisanat d'exception. Notre passion pour la mode se traduit par une expérience shopping unique, alliant conseil personnalisé et collections soigneusement sélectionnées.",
  features: [
    {
      title: "Qualité Premium",
      description: "Des matériaux nobles et une finition impeccable"
    },
    {
      title: "Style Intemporel",
      description: "Des pièces qui traversent les saisons avec élégance"
    },
    {
      title: "Service Personnalisé",
      description: "Un accompagnement sur-mesure pour chaque client"
    }
  ],
};

// -- Collections Section ------------------------------------------------------
export interface Collection {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonText: string;
}

export interface CollectionsConfig {
  sectionLabel: string;
  title: string;
  description: string;
  collections: Collection[];
}

export const collectionsConfig: CollectionsConfig = {
  sectionLabel: "Nos Services",
  title: "Nos Collections",
  description: "Découvrez nos services exclusifs conçus pour sublimer votre style et répondre à toutes vos envies mode.",
  collections: [
    {
      id: 1,
      title: "Style Consultation",
      description: "Bénéficiez de l'expertise de nos stylistes pour révéler votre personnalité à travers votre garde-robe. Une session personnalisée pour définir votre style unique.",
      image: "/collection-1.jpg",
      buttonText: "Réserver",
    },
    {
      id: 2,
      title: "Custom Outfit Design",
      description: "Créez des tenues sur-mesure qui vous ressemblent. De la sélection des tissus à la coupe finale, nous donnons vie à vos aspirations mode.",
      image: "/collection-2.jpg",
      buttonText: "Réserver",
    },
    {
      id: 3,
      title: "Custom Outfit Design",
      description: "Exprimez votre unicité grâce à nos conseils mode sur-mesure. Nos experts vous accompagnent pour créer des looks qui reflètent parfaitement votre personnalité et votre élégance naturelle.",
      image: "/collection-3.jpg",
      buttonText: "Réserver",
    },
    {
      id: 4,
      title: "Custom Outfit Design",
      description: "Transformez votre garde-robe en véritable signature de style. Nos stylistes vous guident dans le choix de pièces qui allient tendance, confort et sophistication.",
      image: "/collection-4.jpg",
      buttonText: "Réserver",
    },
    {
      id: 5,
      title: "Custom Outfit Design",
      description: "Vivez une expérience mode exclusive et raffinée. Nos services sur-mesure vous permettent de composer des ensembles qui vous ressemblent et qui font forte impression.",
      image: "/collection-5.jpg",
      buttonText: "Réserver",
      
    },
    {
      id: 6,
      title: "Custom Outfit Design",
      description: "Sublimez votre allure avec nos conseils personnalisés. Nos stylistes vous accompagnent pas à pas pour composer une garde-robe qui reflète votre personnalité et votre élégance, à chaque occasion.",
      image: "/collection-6.jpg",
      buttonText: "Réserver",
    },
  ],
};


// -- Footer Section -----------------------------------------------------------
export interface FooterConfig {
  brandName: string;
  brandDescription: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  socialLinks: { icon: string; label: string; href: string }[];
  quickLinks: string[];
  newsletter: {
    title: string;
    description: string;
    buttonText: string;
  };
  copyright: string;
  whatsappNumber: string;
}

export const footerConfig: FooterConfig = {
  brandName: "AMEREY SHOP",
  brandDescription: "Votre destination privilégiée pour une mode prêt-à-porter élégante et intemporelle. Qualité, style et service personnalisé depuis 2015.",
  contact: {
    email: "amereyshop@gmail.com",
    phone: "+229 01 66 39 34 59",
    address: "Cadjehoun, face au supermaché Mont Sinai",
  },
  socialLinks: [
    { icon: "instagram", label: "Instagram", href: "https://www.instagram.com/amerey_shop/" },
    ],
  quickLinks: ["Nouveautés", "Collections", "Lookbook", "À propos", "Contact"],
  newsletter: {
    title: "Newsletter",
    description: "Inscrivez-vous pour recevoir nos dernières nouveautés et offres exclusives.",
    buttonText: "S'inscrire",
  },
  copyright: "© 2026 AMEREY SHOP. Tous droits réservés.",
  whatsappNumber: "+2290166393459",
};
