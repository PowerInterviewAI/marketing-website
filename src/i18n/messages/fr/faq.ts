import type { Faq } from '../en/faq';

export const faq: Faq = {
  eyebrow: 'FAQ',
  title: 'Questions fréquentes',
  description: 'Tout ce qu’il faut savoir avant d’installer.',
  categories: {
    gettingStarted: 'Premiers pas',
    product: 'Produit',
    privacy: 'Confidentialité et données',
    billing: 'Formules et facturation',
  },
  stillQuestions: 'D’autres questions ?',
  contact: 'Nous contacter',
  items: [
    {
      question: 'Est-il légal d’utiliser Power Interview AI ?',
      category: 'gettingStarted',
      answer:
        'Power Interview AI est conçu pour un usage légitime de formation et de préparation aux entretiens. Vous restez toutefois responsable de vous assurer que votre utilisation respecte les lois applicables et les conditions d’utilisation des plateformes que vous utilisez. Utilisez-le toujours de manière éthique et légale.',
    },
    {
      question: 'Puis-je m’entraîner avec un entretien d’entraînement ?',
      category: 'product',
      answer:
        'Oui, et il se déroule dans l’application, sans vous renvoyer vers un autre outil. Choisissez un niveau, une difficulté et une durée de 3, 5, 8 ou 12 questions : un recruteur IA pose ses questions à voix haute dans votre langue d’entretien, relance jusqu’à deux fois quand une réponse laisse un point ouvert, et écoute pendant que vous répondez dans votre micro. Les questions comme la notation s’appuient sur le CV et l’offre d’emploi déjà enregistrés sur votre compte. À la fin, vous recevez une note globale avec points forts et lacunes, puis chaque question notée séparément avec une justification et une version plus solide de votre réponse, exportable en DOCX ou Markdown.',
    },
    {
      question: 'Comment fonctionne la protection de la vie privée ?',
      category: 'privacy',
      answer:
        'La configuration de votre entretien (nom complet, profil/CV et contexte) est enregistrée sur votre compte pour vous suivre d’un appareil à l’autre. Les transcriptions et captures sont envoyées à nos services d’IA quand vous demandez une suggestion, et les transcriptions ne sont jamais conservées sur nos serveurs : elles n’existent que le temps de votre séance. Votre jeton de session et les réglages de l’appareil restent sur votre machine. Nous ne vendons ni ne partageons jamais vos informations personnelles.',
    },
    {
      question: 'Quel modèle d’IA génère les suggestions ?',
      category: 'product',
      answer:
        'Le modèle est fourni pour vous : rien à connecter ni à configurer. Les nouveaux comptes utilisent notre modèle gratuit pendant leur heure offerte, et un abonnement vous fait passer à notre modèle SOTA, sans limite d’usage en pratique.',
    },
    {
      question: 'Quelles plateformes sont prises en charge ?',
      category: 'gettingStarted',
      answer:
        'Power Interview AI fonctionne aujourd’hui sur Windows. La prise en charge de macOS est en développement.',
    },
    {
      question: 'Dans quelles langues puis-je passer un entretien ?',
      category: 'product',
      answer:
        'Quatre-vingt-dix-sept, de l’anglais, l’espagnol, le chinois et l’hindi au cantonais, au swahili, au persan et au tamoul. La liste complète figure dans la section Langues de la page d’accueil, et le sélecteur de langue de l’application dispose d’une recherche. Le recruteur d’entraînement parle à voix haute dans 44 d’entre elles et écrit ses questions dans les autres. Un seul réglage détermine le modèle vocal qui transcrit l’appel, la langue de vos suggestions et celle de votre rapport exporté. Vous pouvez le changer en plein entretien : la transcription se reconnecte dans la nouvelle langue tandis que les suggestions suivent immédiatement. L’arabe, l’hébreu, le persan, l’ourdou et les autres écritures de droite à gauche s’affichent de droite à gauche partout.',
    },
    {
      question: 'Faut-il un matériel particulier pour utiliser Power Interview AI ?',
      category: 'gettingStarted',
      answer:
        'Power Interview AI fonctionne sur la plupart des ordinateurs Windows récents sans matériel particulier. Une connexion stable améliore la qualité du streaming.',
    },
    {
      question: 'Quelle est la précision de la transcription IA ?',
      category: 'product',
      answer:
        'Notre transcription en temps réel utilise une reconnaissance automatique de la parole (ASR) avancée, sur deux canaux et avec détection de l’interlocuteur. La précision dépend de la qualité audio, mais elle est excellente dans les situations d’entretien habituelles avec un son clair.',
    },
    {
      question: 'Puis-je l’utiliser pour des entretiens de code ?',
      category: 'product',
      answer:
        'Oui. Capturez jusqu’à quatre écrans d’un problème de code pour obtenir une approche suggérée et du code coloré. Utilisez-le pour vous entraîner à expliquer vos solutions et lors d’entretiens autorisant les outils d’IA.',
    },
    {
      question: 'Puis-je l’utiliser pendant un véritable entretien ?',
      category: 'privacy',
      answer:
        'L’aide en direct peut fonctionner à côté de Zoom, Google Meet ou Teams, mais certains employeurs et plateformes d’évaluation n’autorisent pas l’assistance par IA. Vérifiez les règles de chaque entretien et utilisez-la uniquement lorsqu’elle est permise. La fenêtre de l’application est exclue par défaut des captures d’écran afin de protéger les données personnelles affichées.',
    },
    {
      question: 'Combien coûte un entretien d’entraînement ?',
      category: 'billing',
      answer:
        'Rien en plus de votre formule. Avec un abonnement, les entretiens d’entraînement sont illimités. Pendant l’heure offerte, un entraînement la consomme à la minute, comme l’assistant en direct : une séance de 5 questions dure en général environ 13 minutes et une de 8 environ 20, l’heure suffit donc pour deux séances complètes. Si votre temps gratuit s’épuise en plein entretien, il s’arrête là et vous recevez quand même votre rapport.',
    },
    {
      question: 'Comment fonctionne l’abonnement ?',
      category: 'billing',
      answer:
        'Chaque compte commence avec une heure offerte avec le modèle gratuit. Ensuite, un abonnement vous donne des entretiens en direct et d’entraînement illimités avec le modèle SOTA : 25 $ pour un mois, 60 $ pour un trimestre (20 $ par mois) ou 180 $ pour un an (15 $ par mois). C’est un pass prépayé, pas un prélèvement récurrent : rien ne se renouvelle tout seul, et l’achat d’un autre pass pendant qu’un premier est actif ajoute sa durée après la date de fin actuelle.',
    },
    {
      question: 'Quels moyens de paiement acceptez-vous ?',
      category: 'billing',
      answer:
        'Nous acceptons uniquement les cryptomonnaies. Aucune carte bancaire, aucun PayPal ni aucun virement classique n’est nécessaire. Cela garantit une confidentialité et une sécurité maximales pour vos transactions. Achetez simplement des cryptomonnaies et utilisez-les pour payer un pass mensuel, trimestriel ou annuel dans l’application.',
    },
    {
      question: 'Existe-t-il un essai gratuit ?',
      category: 'billing',
      answer:
        'Oui ! Les nouveaux utilisateurs disposent d’une heure complète offerte avec notre modèle gratuit, sans limite d’usage en pratique et sans interruption. Elle inclut toutes les fonctionnalités : suggestions en direct, suggestions à la demande et entretiens d’entraînement. Un abonnement vous fait passer au modèle SOTA avec un temps d’entretien illimité.',
    },
    {
      question: 'Puis-je utiliser mon compte sur plusieurs ordinateurs ?',
      category: 'billing',
      answer:
        'Oui. Votre profil vous suit sur tous les ordinateurs où vous vous connectez. Un compte ne mène toutefois qu’un entretien à la fois : en lancer un sur un second ordinateur met fin à celui en cours sur le premier.',
    },
    {
      question: 'Puis-je être remboursé ?',
      category: 'billing',
      answer:
        'Les remboursements sont gérés par notre équipe d’assistance. Écrivez à team@vectorleappulse.xyz dans les 14 jours suivant l’achat, avec votre numéro de commande. Si le remboursement est accepté, nous mettons fin au temps d’abonnement correspondant et vous renvoyons l’argent.',
    },
  ],
};
