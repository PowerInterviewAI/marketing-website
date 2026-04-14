import React from 'react';

import { SiDiscord, SiGithub, SiProtonmail, SiTelegram, SiX } from '@icons-pack/react-simple-icons';

import Container from '@/components/Container';
import { Card, CardContent } from '@/components/ui/card';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="bg-muted/30 py-16 md:py-24" aria-labelledby="contact-heading">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2
              id="contact-heading"
              className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            >
              Get In Touch
            </h2>
            <p className="text-lg text-muted-foreground">
              Have questions or need support? We're here to help!
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Email Card */}
            <a
              href="mailto:team@vectorleappulse.xyz"
              className="group block transition-transform hover:scale-105"
            >
              <Card className="h-full border-2 transition-colors hover:border-primary hover:shadow-lg">
                <CardContent className="flex flex-col items-center p-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <SiProtonmail className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Email</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-primary">
                    team@vectorleappulse.xyz
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Send us an email for detailed inquiries
                  </p>
                </CardContent>
              </Card>
            </a>

            {/* GitHub Card */}
            <a
              href="https://github.com/PowerInterviewAI/client-app"
              target="_blank"
              rel="noopener noreferrer"
              className="group block transition-transform hover:scale-105"
            >
              <Card className="h-full border-2 transition-colors hover:border-primary hover:shadow-lg">
                <CardContent className="flex flex-col items-center p-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <SiGithub className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">GitHub</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-primary">
                    PowerInterviewAI/client-app
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    View source code, report issues, and contribute
                  </p>
                </CardContent>
              </Card>
            </a>

            {/* Telegram Card */}
            <a
              href="https://t.me/power_interview_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="group block transition-transform hover:scale-105"
            >
              <Card className="h-full border-2 transition-colors hover:border-primary hover:shadow-lg">
                <CardContent className="flex flex-col items-center p-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <SiTelegram className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Telegram</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-primary">
                    @power_interview_ai
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Join our Telegram community for updates
                  </p>
                </CardContent>
              </Card>
            </a>

            {/* X Card */}
            <a
              href="https://x.com/power_interview"
              target="_blank"
              rel="noopener noreferrer"
              className="group block transition-transform hover:scale-105"
            >
              <Card className="h-full border-2 transition-colors hover:border-primary hover:shadow-lg">
                <CardContent className="flex flex-col items-center p-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <SiX className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">X</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-primary">
                    @power_interview
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Follow us on X (formerly Twitter)
                  </p>
                </CardContent>
              </Card>
            </a>

            {/* Discord Card */}
            <a
              href="https://discord.gg/TJJp5azK7Z"
              target="_blank"
              rel="noopener noreferrer"
              className="group block transition-transform hover:scale-105"
            >
              <Card className="h-full border-2 transition-colors hover:border-primary hover:shadow-lg">
                <CardContent className="flex flex-col items-center p-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <SiDiscord className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Discord</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-primary">
                    Power Interview AI
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Chat with us and other users on Discord
                  </p>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactSection;
