import {
  Globe,
  Github,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitch,
  Reddit,
  Slack,
  Discord,
  Gitlab,
  Dribbble,
  Figma,
  Codepen,
  Mail,
  Amazon,
  Apple,
  Google,
  Microsoft,
  Netflix,
  Spotify,
} from 'lucide-react';
import React from 'react';

const iconMap: { [key: string]: React.ElementType } = {
  github: Github,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  twitch: Twitch,
  reddit: Reddit,
  slack: Slack,
  discord: Discord,
  gitlab: Gitlab,
  dribbble: Dribbble,
  figma: Figma,
  codepen: Codepen,
  mail: Mail,
  email: Mail,
  gmail: Google,
  outlook: Microsoft,
  amazon: Amazon,
  apple: Apple,
  google: Google,
  microsoft: Microsoft,
  netflix: Netflix,
  spotify: Spotify,
};

export const getIconForWebsite = (website: string): React.ElementType => {
  if (typeof website !== 'string' || !website) {
    return Globe;
  }
  const lowerCaseWebsite = website.toLowerCase();
  for (const key in iconMap) {
    if (lowerCaseWebsite.includes(key)) {
      return iconMap[key];
    }
  }
  return Globe; // Default icon for unmatched websites
};